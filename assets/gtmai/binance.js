/* ============================================================
   GTM AI web - Binance USDⓈ-M Futures broker
   When it is connected, the panel's LIVE mode places real orders
   on Binance (Testnet / Demo trading / real account).
   - The API secret stays in this browser: it only signs requests.
   - Reads (prices, account, positions) go straight to Binance.
   - Orders (POST / DELETE) go through YOUR relay (Binance does not
     let a web page send them directly): a free Cloudflare Worker
     or relay.py on your own PC. The relay never sees the secret.
   - SL and TP are real Binance orders (closePosition), so they stay
     on the exchange even if this page is closed.
   ============================================================ */
(function (G) {
'use strict';
const RT = G.GTMRT;
const HOSTS = { testnet: 'https://testnet.binancefuture.com', demo: 'https://demo-fapi.binance.com', live: 'https://fapi.binance.com' };
const NAMES = { testnet: 'Binance Futures Testnet', demo: 'Binance Futures Demo trading', live: 'Binance Futures - REAL MONEY' };
const LS = 'gtmai_bn_';
const enc = new TextEncoder();
const OPENISH = { opening: 1, open: 1, closing: 1 };

function lget(k, d) { try { const v = localStorage.getItem(LS + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
function lset(k, v) { try { if (v == null) localStorage.removeItem(LS + k); else localStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) { } }
function sget(k) { try { const v = sessionStorage.getItem(LS + k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
function sset(k, v) { try { if (v == null) sessionStorage.removeItem(LS + k); else sessionStorage.setItem(LS + k, JSON.stringify(v)); } catch (e) { } }
function dp(step) { const s = String(step); if (/e-/.test(s)) return +s.split('e-')[1]; const i = s.indexOf('.'); return i < 0 ? 0 : s.replace(/0+$/, '').length - i - 1; }
function floorTo(v, step) { return Math.floor(v / step + 1e-9) * step; }
function roundTo(v, step) { return Math.round(v / step) * step; }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const now = () => Math.floor(Date.now() / 1000);

class Broker {
  constructor() {
    this.cfg = Object.assign({ mode: 'testnet', relay: '', lev: 5, hedge: true, remember: false }, lget('cfg', {}));
    this.ready = false; this.canTrade = false; this.dual = false; this.offset = 0;
    this.info = new Map(); this.acct = { bal: 0, eq: 0, free: 0 }; this.risk = new Map();
    this.book = []; this.deals = []; this.sel = []; this.cur = null;
    this.levDone = new Set(); this.polling = false; this.lastPoll = 0; this.log = []; this.err = '';
    this.listeners = new Set();
  }
  /* ---------- keys ---------- */
  creds(mode) { return sget('cred_' + mode) || lget('cred_' + mode, null); }
  saveCreds(mode, key, secret, remember) {
    const c = { key: String(key).trim(), secret: String(secret).trim() };
    sset('cred_' + mode, c);
    if (remember) lset('cred_' + mode, c); else lset('cred_' + mode, null);
  }
  forget(mode) { sset('cred_' + mode, null); lset('cred_' + mode, null); }
  note(s, bad) {
    this.log.unshift(new Date().toLocaleTimeString() + '  ' + s); this.log.length = Math.min(this.log.length, 40);
    if (bad) { this.err = s; RT.onAlert && RT.onAlert('Binance: ' + s); }
    this.emit();
  }
  emit() { this.listeners.forEach(f => { try { f(this); } catch (e) { } }); }
  get host() { return HOSTS[this.cfg.mode] || HOSTS.testnet; }
  get name() { return NAMES[this.cfg.mode] || NAMES.testnet; }
  get live() { return this.cfg.mode === 'live'; }

  /* ---------- REST ---------- */
  async sign(msg) {
    if (!this._k) this._k = await crypto.subtle.importKey('raw', enc.encode(this.c.secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const s = await crypto.subtle.sign('HMAC', this._k, enc.encode(msg));
    return Array.from(new Uint8Array(s), b => b.toString(16).padStart(2, '0')).join('');
  }
  async req(method, path, params, signed) {
    const p = new URLSearchParams();
    Object.entries(params || {}).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') p.append(k, String(v)); });
    if (signed) { p.append('recvWindow', '10000'); p.append('timestamp', String(Date.now() + this.offset)); p.append('signature', await this.sign(p.toString())); }
    const q = p.toString();
    let url;
    if (method === 'GET') url = this.host + path + (q ? '?' + q : '');
    else {
      if (!this.cfg.relay) throw Object.assign(new Error('orders need your relay (see "Relay URL")'), { norelay: true });
      url = this.cfg.relay.replace(/\/+$/, '') + '/' + this.host.replace(/^https?:\/\//, '') + path + (q ? '?' + q : '');
    }
    let r;
    try { r = await fetch(url, { method, headers: signed || (method !== 'GET' && this.c) ? { 'X-MBX-APIKEY': this.c.key } : {}, cache: 'no-store' }); }
    catch (e) { throw Object.assign(new Error(method === 'GET' ? 'Binance not reachable' : 'relay not reachable (' + this.cfg.relay + ')'), { net: true, relay: method !== 'GET' }); }
    const txt = await r.text(); let j;
    try { j = JSON.parse(txt); } catch (e) { j = { msg: txt.slice(0, 160) }; }
    if (!r.ok || (j && typeof j.code === 'number' && j.code < 0)) throw Object.assign(new Error((j && j.msg) || ('HTTP ' + r.status)), { code: j && j.code, http: r.status });
    return j;
  }

  /* ---------- connect ---------- */
  async connect(cfg) {
    if (cfg) { this.cfg = Object.assign(this.cfg, cfg); lset('cfg', { mode: this.cfg.mode, relay: this.cfg.relay, lev: this.cfg.lev, hedge: this.cfg.hedge, remember: this.cfg.remember }); }
    this.c = this.creds(this.cfg.mode); this._k = null; this.ready = false; this.canTrade = false; this.err = '';
    if (!this.c || !this.c.key || !this.c.secret) throw new Error('paste your API key and secret first');
    if (!(crypto && crypto.subtle)) throw new Error('this browser cannot sign requests (open the site with https)');
    this.emit();
    const t = await this.req('GET', '/fapi/v1/time');
    this.offset = (+t.serverTime || Date.now()) - Date.now();
    const ex = await this.req('GET', '/fapi/v1/exchangeInfo');
    this.info.clear();
    (ex.symbols || []).forEach(s => {
      if (s.quoteAsset !== 'USDT' || s.contractType !== 'PERPETUAL') return;
      const f = {}; (s.filters || []).forEach(x => f[x.filterType] = x);
      const lot = f.MARKET_LOT_SIZE && +f.MARKET_LOT_SIZE.stepSize > 0 ? f.MARKET_LOT_SIZE : f.LOT_SIZE;
      this.info.set(s.symbol, {
        symbol: s.symbol, ok: s.status === 'TRADING',
        step: +(lot ? lot.stepSize : 0.001), minQty: +(lot ? lot.minQty : 0.001), maxQty: +(lot ? lot.maxQty : 1e9),
        tick: +(f.PRICE_FILTER ? f.PRICE_FILTER.tickSize : 0.01), minNotional: +(f.MIN_NOTIONAL ? (f.MIN_NOTIONAL.notional || f.MIN_NOTIONAL.minNotional) : 5) || 5
      });
    });
    await this.pollAccount();                              // also checks the key
    const d = await this.req('GET', '/fapi/v1/positionSide/dual', {}, true);
    this.dual = !!d.dualSidePosition;
    // relay check: a harmless call that needs the relay (makes a user-stream key, nothing else)
    if (this.cfg.relay) {
      try { await this.req('POST', '/fapi/v1/listenKey', {}, false); this.canTrade = true; }
      catch (e) { this.note('relay test failed: ' + e.message, true); }
    } else this.note('read-only: add your relay URL to place orders', true);
    if (this.canTrade && this.cfg.hedge !== this.dual) {
      try { await this.req('POST', '/fapi/v1/positionSide/dual', { dualSidePosition: this.cfg.hedge ? 'true' : 'false' }, true); this.dual = !!this.cfg.hedge; this.note('position mode set to ' + (this.dual ? 'HEDGE (long + short together)' : 'ONE-WAY')); }
      catch (e) { this.note('could not change the position mode (close all positions / orders first): ' + e.message, true); }
    }
    this.loadBook();
    await this.pollPositions();
    this.ready = true; RT.broker = this;
    this.note('connected: ' + this.name + ' - balance ' + this.acct.bal.toFixed(2) + ' USDT, ' + (this.dual ? 'hedge' : 'one-way') + ' mode' + (this.canTrade ? '' : ' (read-only)'));
    this.emit();
    return true;
  }
  disconnect(forget) {
    this.ready = false; this.canTrade = false;
    if (RT.broker === this) RT.broker = null;
    if (forget) { this.forget(this.cfg.mode); lset('auto', null); }
    this.note('disconnected');
  }

  /* ---------- book (our positions) and deals, kept in this browser ---------- */
  bk() { return 'book_' + this.cfg.mode; }
  loadBook() {
    const o = lget(this.bk(), null) || {};
    this.book = (o.book || []).filter(e => OPENISH[e.state]).map(e => Object.assign(e, { state: 'open', miss: 0, _q: null, tries: 0 }));
    this.deals = o.deals || []; this.seq = o.seq || 100000;
  }
  saveBook() {
    const keep = this.book.filter(e => OPENISH[e.state]).map(e => { const o = Object.assign({}, e); delete o._q; return o; });
    lset(this.bk(), { book: keep, deals: this.deals.slice(-400), seq: this.seq });
  }
  find(t) { return this.book.find(e => e.ticket === t) || null; }
  queue(e, fn) { e._q = (e._q || Promise.resolve()).then(fn).catch(err => this.note(err.message, true)); return e._q; }
  addDeal(e, entry, price, profit, comm) {
    const d = { id: ++this.seq, pos: e.ticket, entry, price, profit: +profit || 0, comm: +comm || 0, time: now(), name: e.name, magic: e.magic, type: entry === 0 ? (e.dir > 0 ? 0 : 1) : (e.dir > 0 ? 1 : 0) };
    this.deals.push(d); this.saveBook(); return d;
  }

  /* ---------- polling ---------- */
  pump() {                                                  // called by the panel's timer
    if (!this.ready || this.polling || Date.now() - this.lastPoll < 2000) return;
    this.polling = true; this.lastPoll = Date.now();
    Promise.all([this.pollAccount(), this.pollPositions()]).then(() => this.checkBook()).catch(e => { if (!this._lastNet || Date.now() - this._lastNet > 60000) { this._lastNet = Date.now(); this.note(e.message, false); } })
      .finally(() => { this.polling = false; this.emit(); });
  }
  async pollAccount() {
    let a;
    try { a = await this.req('GET', '/fapi/v3/account', {}, true); } catch (e) { if (e.http === 404) a = await this.req('GET', '/fapi/v2/account', {}, true); else throw e; }
    this.acct = { bal: +a.totalWalletBalance || 0, eq: +a.totalMarginBalance || 0, free: +a.availableBalance || 0 };
  }
  async pollPositions() {
    let p;
    try { p = await this.req('GET', '/fapi/v3/positionRisk', {}, true); } catch (e) { if (e.http === 404) p = await this.req('GET', '/fapi/v2/positionRisk', {}, true); else throw e; }
    const m = new Map();
    (p || []).forEach(x => { const amt = +x.positionAmt; if (!amt) return; m.set(x.symbol + '|' + (x.positionSide || 'BOTH'), { amt, entry: +x.entryPrice, upnl: +x.unRealizedProfit, mark: +x.markPrice }); });
    this.risk = m;
  }
  posKey(e) { return e.symbol + '|' + (e.dual ? (e.dir > 0 ? 'LONG' : 'SHORT') : 'BOTH'); }
  checkBook() {
    const t = now();
    this.book.forEach(e => {
      if (e.state !== 'open') return;
      const r = this.risk.get(this.posKey(e));
      const same = r && (e.dual || Math.sign(r.amt) === e.dir);
      if (same) { e.miss = 0; e.profit = r.upnl; e.mark = r.mark; return; }
      if (t - e.time < 8) return;
      if (++e.miss >= 2) { e.state = 'closing'; this.queue(e, () => this.closedOnExchange(e)); }
    });
    this.book = this.book.filter(e => OPENISH[e.state] || t - (e.end || t) < 5);
  }

  /* ---------- symbols ---------- */
  symOf(name) {
    const o = RT.market && RT.market.byName.get(name);
    if (!o || !o.meta || o.meta.src !== 'binance') return null;
    return this.info.get(o.meta.symbol) || null;
  }
  volMin(name) {
    const m = this.symOf(name); if (!m) return 0;
    const px = G.SymbolInfoDouble(name, G.SYMBOL_BID) || 0;
    let v = m.minQty;
    if (px > 0) v = Math.max(v, Math.ceil(m.minNotional * 1.02 / px / m.step - 1e-9) * m.step);
    return +v.toFixed(dp(m.step));
  }
  volStep(name) { const m = this.symOf(name); return m ? m.step : 0; }
  volMax(name) { const m = this.symOf(name); return m ? m.maxQty : 0; }
  tradeMode(name) { const m = this.symOf(name); return m && m.ok ? G.SYMBOL_TRADE_MODE_FULL : G.SYMBOL_TRADE_MODE_DISABLED; }
  qtyS(m, q) { return floorTo(q, m.step).toFixed(dp(m.step)); }
  pxS(m, p) { return roundTo(p, m.tick).toFixed(dp(m.tick)); }

  /* ---------- MT5 trade functions (called by CTrade in rt.js) ---------- */
  open(tr, dir, lot, name, sl, tp, comment) {
    const R = tr.r = { code: G.TRADE_RETCODE_REJECT, desc: '', order: 0, price: 0 };
    if (!this.canTrade) { R.desc = 'Binance is read-only: add your relay URL'; return false; }
    const m = this.symOf(name);
    if (!m) { R.desc = name + ' is not on Binance USDT-M futures'; return false; }
    if (!m.ok) { R.desc = m.symbol + ' is not trading now'; return false; }
    const px = G.SymbolInfoDouble(name, dir > 0 ? G.SYMBOL_ASK : G.SYMBOL_BID);
    const qs = this.qtyS(m, lot), q = +qs;
    if (!(px > 0)) { R.desc = 'no price yet'; return false; }
    if (q < m.minQty) { R.desc = 'lot ' + lot + ' is below the minimum ' + m.minQty; return false; }
    if (q * px < m.minNotional) { R.desc = 'order too small: Binance needs at least ' + m.minNotional + ' USDT (lot ' + this.volMin(name) + ')'; return false; }
    const lev = Math.max(1, this.cfg.lev | 0);
    if (q * px / lev > this.acct.free) { R.desc = 'not enough free margin on Binance (' + this.acct.free.toFixed(2) + ' USDT)'; return false; }
    const e = { ticket: ++this.seq, name, symbol: m.symbol, dir, qty: q, qs, entry: px, sl: +sl || 0, tp: +tp || 0, time: now(), magic: tr.magic || 0,
      comment: comment || '', dual: this.dual, state: 'opening', profit: 0, openId: 0, openFee: 0, slId: '', tpId: '', miss: 0 };
    this.book.push(e); this.saveBook();
    R.code = G.TRADE_RETCODE_DONE; R.order = e.ticket; R.price = px; R.desc = 'sent to Binance';
    this.queue(e, () => this.doOpen(e));
    return true;
  }
  async doOpen(e) {
    const m = this.info.get(e.symbol);
    try {
      if (!this.levDone.has(e.symbol)) {
        try { await this.req('POST', '/fapi/v1/leverage', { symbol: e.symbol, leverage: Math.max(1, this.cfg.lev | 0) }, true); } catch (x) { this.note(e.symbol + ' leverage: ' + x.message); }
        this.levDone.add(e.symbol);
      }
      let o = await this.req('POST', '/fapi/v1/order', { symbol: e.symbol, side: e.dir > 0 ? 'BUY' : 'SELL', type: 'MARKET', quantity: e.qs,
        positionSide: e.dual ? (e.dir > 0 ? 'LONG' : 'SHORT') : undefined, newOrderRespType: 'RESULT' }, true);
      if (!(+o.executedQty > 0)) { await sleep(1500); o = await this.req('GET', '/fapi/v1/order', { symbol: e.symbol, orderId: o.orderId }, true); }
      if (!(+o.executedQty > 0)) throw new Error('the market order was not filled (' + (o.status || '?') + ')');
      e.openId = o.orderId; e.qty = +o.executedQty; e.qs = this.qtyS(m, e.qty); if (+o.avgPrice > 0) e.entry = +o.avgPrice;
      e.openFee = await this.fees(e.symbol, e.openId);
      e.state = 'open'; e.time = now();
      this.addDeal(e, 0, e.entry, 0, -e.openFee);
      this.note((e.dir > 0 ? 'BUY ' : 'SELL ') + e.symbol + ' ' + e.qs + ' @ ' + e.entry);
      if (e.sl > 0) await this.setStop(e, 'sl', e.sl);
      if (e.tp > 0) await this.setStop(e, 'tp', e.tp);
      this.saveBook();
    } catch (err) {
      e.state = 'failed'; e.end = now();
      this.addDeal(e, 1, e.entry, 0, 0);                  // lets the panel close the trade
      this.note('order refused for ' + e.symbol + ': ' + err.message, true);
    }
  }
  async fees(symbol, orderId) {
    try {
      const tr = await this.req('GET', '/fapi/v1/userTrades', { symbol, orderId }, true);
      return (tr || []).reduce((s, x) => s + (x.commissionAsset === 'USDT' ? +x.commission : 0), 0);
    } catch (e) { return 0; }
  }
  async setStop(e, kind, price) {
    const m = this.info.get(e.symbol), idK = kind + 'Id';
    if (e[idK]) { await this.cancelStop(e, e[idK]); e[idK] = ''; }
    if (!(price > 0) || !OPENISH[e.state]) return;
    const p = { symbol: e.symbol, side: e.dir > 0 ? 'SELL' : 'BUY', type: kind === 'sl' ? 'STOP_MARKET' : 'TAKE_PROFIT_MARKET', closePosition: 'true',
      workingType: 'MARK_PRICE', priceProtect: 'true', positionSide: e.dual ? (e.dir > 0 ? 'LONG' : 'SHORT') : undefined };
    try {
      const r = await this.req('POST', '/fapi/v1/algoOrder', Object.assign({ algoType: 'CONDITIONAL', triggerPrice: this.pxS(m, price) }, p), true);
      e[idK] = 'a' + r.algoId;
    } catch (err) {
      if (!(err.http === 404 || err.code === -1000 || err.code === -5000)) { this.note(e.symbol + ' ' + kind.toUpperCase() + ' order refused: ' + err.message, true); return; }
      const r = await this.req('POST', '/fapi/v1/order', Object.assign({ stopPrice: this.pxS(m, price) }, p), true);   // older API
      e[idK] = 'o' + r.orderId;
    }
    this.saveBook();
  }
  async cancelStop(e, id) {
    try {
      if (id[0] === 'a') await this.req('DELETE', '/fapi/v1/algoOrder', { algoId: id.slice(1) }, true);
      else await this.req('DELETE', '/fapi/v1/order', { symbol: e.symbol, orderId: id.slice(1) }, true);
    } catch (err) { }
  }
  modify(tr, ticket, sl, tp) {
    const R = tr.r = { code: G.TRADE_RETCODE_REJECT, desc: '', order: ticket, price: 0 };
    const e = this.find(ticket);
    if (!e || !OPENISH[e.state] || e.state === 'closing') { R.desc = 'position not found'; return false; }
    if (!this.canTrade) { R.desc = 'Binance is read-only'; return false; }
    sl = +sl || 0; tp = +tp || 0;
    const m = this.info.get(e.symbol);
    const chSl = Math.abs(sl - e.sl) >= m.tick / 2, chTp = Math.abs(tp - e.tp) >= m.tick / 2;
    e.sl = sl; e.tp = tp; this.saveBook();
    if (chSl) this.queue(e, () => this.setStop(e, 'sl', sl));
    if (chTp) this.queue(e, () => this.setStop(e, 'tp', tp));
    R.code = G.TRADE_RETCODE_DONE;
    return true;
  }
  close(tr, ticket) {
    const R = tr.r = { code: G.TRADE_RETCODE_REJECT, desc: '', order: ticket, price: 0 };
    const e = this.find(ticket);
    if (!e || !OPENISH[e.state]) { R.desc = 'position not found'; return false; }
    if (!this.canTrade) { R.desc = 'Binance is read-only'; return false; }
    if (e.state === 'closing') { R.code = G.TRADE_RETCODE_DONE; return true; }
    e.state = 'closing';
    this.queue(e, () => this.doClose(e));
    R.code = G.TRADE_RETCODE_DONE;
    return true;
  }
  async doClose(e) {
    if (e.slId) { await this.cancelStop(e, e.slId); e.slId = ''; }
    if (e.tpId) { await this.cancelStop(e, e.tpId); e.tpId = ''; }
    try {
      const o = await this.req('POST', '/fapi/v1/order', { symbol: e.symbol, side: e.dir > 0 ? 'SELL' : 'BUY', type: 'MARKET', quantity: e.qs,
        positionSide: e.dual ? (e.dir > 0 ? 'LONG' : 'SHORT') : undefined, reduceOnly: e.dual ? undefined : 'true', newOrderRespType: 'RESULT' }, true);
      const fill = await this.tradesOf(e.symbol, { orderId: o.orderId });
      const px = fill.qty > 0 ? fill.px : (+o.avgPrice || e.mark || e.entry);
      const pl = fill.qty > 0 ? fill.pnl : (px - e.entry) * e.dir * e.qty;
      this.finish(e, px, pl, fill.fee);
      this.note('closed ' + e.symbol + ' @ ' + px + '  P/L ' + (pl - fill.fee - e.openFee).toFixed(2) + ' USDT');
    } catch (err) {
      if (err.code === -2022 || /ReduceOnly|position side does not match|no position/i.test(err.message)) { await this.closedOnExchange(e); return; }
      e.state = 'open';
      this.note('close refused for ' + e.symbol + ': ' + err.message, true);
      if (e.sl > 0) await this.setStop(e, 'sl', e.sl);    // keep the trade protected
      if (e.tp > 0) await this.setStop(e, 'tp', e.tp);
    }
  }
  async tradesOf(symbol, q) {
    const tr = await this.req('GET', '/fapi/v1/userTrades', Object.assign({ symbol, limit: 200 }, q), true);
    let qty = 0, quote = 0, pnl = 0, fee = 0;
    (tr || []).forEach(x => { qty += +x.qty; quote += +x.quoteQty; pnl += +x.realizedPnl; if (x.commissionAsset === 'USDT') fee += +x.commission; });
    return { list: tr || [], qty, px: qty > 0 ? quote / qty : 0, pnl, fee };
  }
  /* SL / TP hit on Binance (or closed by hand there) */
  async closedOnExchange(e) {
    if (e.state === 'closed') return;
    for (const id of [e.slId, e.tpId]) if (id) await this.cancelStop(e, id);
    e.slId = ''; e.tpId = '';
    let px = e.mark || e.entry, pl = e.profit, fee = 0;
    try {
      const t = await this.tradesOf(e.symbol, { startTime: e.time * 1000 - 2000 });
      const side = e.dir > 0 ? 'SELL' : 'BUY', ps = e.dual ? (e.dir > 0 ? 'LONG' : 'SHORT') : 'BOTH';
      const out = t.list.filter(x => x.side === side && (x.positionSide || 'BOTH') === ps && x.orderId !== e.openId);
      if (out.length) {
        let q = 0, qq = 0; pl = 0;
        out.forEach(x => { q += +x.qty; qq += +x.quoteQty; pl += +x.realizedPnl; if (x.commissionAsset === 'USDT') fee += +x.commission; });
        px = qq / q;
      } else if ((e.tries = (e.tries || 0) + 1) < 5) { e.state = 'open'; e.miss = 1; return; }   // history not there yet: look again
    } catch (err) { if ((e.tries = (e.tries || 0) + 1) < 5) { e.state = 'open'; e.miss = 1; return; } }
    this.finish(e, px, pl, fee);
    this.note(e.symbol + ' closed on Binance @ ' + (+px).toFixed(dp(this.info.get(e.symbol).tick)) + '  P/L ' + (pl - fee - e.openFee).toFixed(2) + ' USDT');
  }
  finish(e, px, pl, fee) { e.state = 'closed'; e.end = now(); this.addDeal(e, 1, px, pl, -fee); }

  /* ---------- MT5 position / history functions ---------- */
  live_() { return this.book.filter(e => OPENISH[e.state]); }
  posTotal() { return this.live_().length; }
  posTicket(i) { const e = this.live_()[i]; this.cur = e || null; return e ? e.ticket : 0; }
  posSelect(t) { const e = this.find(t); this.cur = e && OPENISH[e.state] ? e : null; return !!this.cur; }
  posSelectSym(name) { const e = this.live_().find(x => x.name === name); this.cur = e || null; return !!e; }
  posInt(p) {
    const e = this.cur; if (!e) return 0;
    switch (p) { case G.POSITION_MAGIC: return e.magic; case G.POSITION_TYPE: return e.dir > 0 ? 0 : 1; case G.POSITION_TIME: return e.time;
      case G.POSITION_TICKET: case G.POSITION_IDENTIFIER: return e.ticket; default: return 0; }
  }
  posDbl(p) {
    const e = this.cur; if (!e) return 0;
    switch (p) { case G.POSITION_VOLUME: return e.qty; case G.POSITION_PRICE_OPEN: return e.entry; case G.POSITION_SL: return e.sl; case G.POSITION_TP: return e.tp;
      case G.POSITION_PROFIT: return e.state === 'opening' ? 0 : (+e.profit || 0) - (e.openFee || 0); default: return 0; }
  }
  posStr(p) { const e = this.cur; return e && p === G.POSITION_SYMBOL ? e.name : (e && p === 99 ? e.comment : ''); }
  histSelect(from, to) { this.sel = this.deals.filter(d => d.time >= from && d.time <= to); return true; }
  histSelectPos(t) { this.sel = this.deals.filter(d => d.pos === t); return true; }
  dealTotal() { return this.sel.length; }
  dealTicket(i) { const d = this.sel[i]; return d ? d.id : 0; }
  deal(id) { return this.deals.find(d => d.id === id) || null; }
  dealInt(id, p) {
    const d = this.deal(id); if (!d) return 0;
    switch (p) { case G.DEAL_ENTRY: return d.entry; case G.DEAL_POSITION_ID: return d.pos; case G.DEAL_MAGIC: return d.magic; case G.DEAL_TIME: return d.time; case G.DEAL_TYPE: return d.type; default: return 0; }
  }
  dealDbl(id, p) {
    const d = this.deal(id); if (!d) return 0;
    switch (p) { case G.DEAL_PROFIT: return d.profit; case G.DEAL_COMMISSION: return d.comm; case G.DEAL_PRICE: return d.price; default: return 0; }
  }
  dealStr(id, p) { const d = this.deal(id); return d && p === G.DEAL_SYMBOL ? d.name : ''; }
  margin(name, lot, px) { return lot * px / Math.max(1, this.cfg.lev | 0); }
}

/* ---------- the box above the panel ---------- */
const B = new Broker();
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function mount(el, opt) {
  opt = opt || {};
  const c = B.cfg, cr = B.creds(c.mode) || {};
  el.className = 'gtm-bn';
  el.innerHTML = `
  <details ${lget('open', false) ? 'open' : ''}>
    <summary><span class="bn-dot"></span><b>Binance Futures</b> <span class="bn-state">not connected - the panel trades with simulator money</span></summary>
    <div class="bn-body">
      <div class="bn-row">
        <label>Account<select data-k="mode">
          <option value="testnet">Testnet (practice money)</option>
          <option value="demo">Demo trading (practice money)</option>
          <option value="live">REAL account (real money)</option></select></label>
        <label>Leverage<input data-k="lev" type="number" min="1" max="125" step="1"></label>
        <label class="ck"><input data-k="hedge" type="checkbox"> Hedge mode (long and short on the same coin)</label>
      </div>
      <div class="bn-row">
        <label class="grow">API key<input data-k="key" type="password" autocomplete="off" spellcheck="false" placeholder="API key"></label>
        <label class="grow">Secret key<input data-k="secret" type="password" autocomplete="off" spellcheck="false" placeholder="Secret key (stays in this browser)"></label>
      </div>
      <div class="bn-row">
        <label class="grow">Relay URL (for orders)<input data-k="relay" type="text" autocomplete="off" spellcheck="false" placeholder="https://your-relay.workers.dev   or   http://127.0.0.1:8787"></label>
        <label class="ck"><input data-k="remember" type="checkbox"> Remember the keys on this computer</label>
      </div>
      <div class="bn-row">
        <button class="btn small primary" data-a="go" type="button">Connect</button>
        <button class="btn small ghost" data-a="off" type="button">Disconnect</button>
        <button class="btn small ghost" data-a="forget" type="button">Forget my keys</button>
        <span class="grow"></span>
        <a class="small" href="assets/gtmai/relay/README.html" target="_blank" rel="noopener">How to make your free relay and API key ↗</a>
      </div>
      <div class="bn-live-warn" hidden>REAL account: orders use real money. Practise on Testnet first. Never give the API key permission to withdraw.</div>
      <div class="bn-info small"></div>
      <pre class="bn-log"></pre>
      <p class="small muted" style="margin:6px 0 0">How it works: connect, press <b>START</b> on the panel, then switch the panel to <b>LIVE</b>. Your entry setups open USDT-M futures orders on Binance with real SL / TP orders.
      Only crypto symbols trade on Binance (BTCUSD = BTCUSDT). Keep this tab open: break-even, trailing and new entries run in this page. SL / TP stay on Binance even if you close it.
      The secret key never leaves this browser; the relay only passes on signed orders. Signals are predictions, not promises.</p>
    </div>
  </details>`;
  const q = s => el.querySelector(s), k = n => el.querySelector('[data-k="' + n + '"]');
  k('mode').value = c.mode; k('lev').value = c.lev; k('hedge').checked = !!c.hedge; k('relay').value = c.relay || ''; k('remember').checked = !!c.remember;
  k('key').value = cr.key || ''; k('secret').value = cr.secret ? '••••••••' : '';
  const det = q('details'); det.addEventListener('toggle', () => lset('open', det.open));
  const fill = () => { const r = B.creds(k('mode').value) || {}; k('key').value = r.key || ''; k('secret').value = r.secret ? '••••••••' : ''; q('.bn-live-warn').hidden = k('mode').value !== 'live'; };
  k('mode').onchange = fill; fill();
  const go = async () => {
    const mode = k('mode').value, sec = k('secret').value;
    if (mode === 'live' && !confirm('Connect your REAL Binance account? In LIVE mode the panel will place orders with real money.')) return;
    const old = B.creds(mode) || {};
    const secret = /^•+$/.test(sec) ? old.secret : sec;
    B.saveCreds(mode, k('key').value, secret || '', k('remember').checked);
    q('[data-a="go"]').disabled = true; q('.bn-state').textContent = 'connecting...';
    try {
      await B.connect({ mode, lev: Math.max(1, Math.min(125, +k('lev').value || 5)), hedge: k('hedge').checked, relay: k('relay').value.trim(), remember: k('remember').checked });
      lset('auto', true);
      if (opt.started && opt.started()) { RT.onAlert && RT.onAlert('Binance connected - the panel restarts once so LIVE can be used...'); setTimeout(() => location.reload(), 1500); }
    } catch (e) { B.err = e.message; B.note('connect failed: ' + e.message); }
    q('[data-a="go"]').disabled = false; paint();
  };
  q('[data-a="go"]').onclick = go;
  q('[data-a="off"]').onclick = () => { B.disconnect(false); lset('auto', null); if (opt.started && opt.started()) location.reload(); paint(); };
  q('[data-a="forget"]').onclick = () => { B.disconnect(true); k('key').value = ''; k('secret').value = ''; paint(); };
  function paint() {
    const st = q('.bn-state'), dot = q('.bn-dot');
    el.classList.toggle('on', B.ready); el.classList.toggle('real', B.ready && B.live);
    if (B.ready) {
      st.textContent = B.name + ' - ' + B.acct.bal.toFixed(2) + ' USDT' + (B.canTrade ? '' : ' (read-only: add the relay)');
      const open = B.posTotal();
      q('.bn-info').innerHTML = 'Wallet <b>' + B.acct.bal.toFixed(2) + '</b> · Equity <b>' + B.acct.eq.toFixed(2) + '</b> · Free <b>' + B.acct.free.toFixed(2) + '</b> USDT · ' +
        (B.dual ? 'Hedge' : 'One-way') + ' mode · ' + open + ' panel position(s) open · leverage ' + B.cfg.lev + 'x';
    } else { st.textContent = B.err ? 'not connected - ' + B.err : 'not connected - the panel trades with simulator money'; q('.bn-info').textContent = ''; }
    dot.className = 'bn-dot' + (B.ready ? (B.canTrade ? ' ok' : ' ro') : '');
    q('.bn-log').textContent = B.log.slice(0, 8).join('\n');
  }
  B.listeners.add(paint); paint();
}

/* reconnect after a reload when the user connected before */
async function auto() {
  if (!lget('auto', false) || !B.creds(B.cfg.mode)) return false;
  if (B.cfg.mode === 'live' && !sget('cred_live')) { B.note('REAL account: press Connect to start again'); return false; }   // real money: only in the same browser session
  try { await Promise.race([B.connect(), sleep(15000).then(() => { throw new Error('timeout'); })]); return true; }
  catch (e) { B.err = e.message; B.note('auto connect failed: ' + e.message); return false; }
}
G.GTMBinance = { broker: B, mount, auto };
})(typeof self !== 'undefined' ? self : this);
