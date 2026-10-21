/* ============================================================
   GTM AI web - live market data for the EA (real prices)
   Uses the site's feed (GTFeed: Deriv public prices + Binance crypto).
   Symbols get MetaTrader-style names: XAUUSD, EURUSD, Volatility 75 Index, BTCUSD ...
   ============================================================ */
(function (G) {
'use strict';
const RT = G.GTMRT;
const TFSEC = { 1: 60, 2: 120, 3: 180, 5: 300, 10: 600, 15: 900, 30: 1800, 16385: 3600, 16386: 7200, 16388: 14400, 16392: 28800, 16408: 86400 };
const KEEP = 1500;

const M = RT.market = {
  list: [],            // catalog: {name, path, desc, meta, spec}
  byName: new Map(),
  sel: new Map(),      // selected symbols: name -> state {bid, ask, t, series:Map(tf->{bars, loading, ok})}
  ready: false
};

/* ---------- names and contract specs ---------- */
function mtName(s) {
  if (s.src === 'binance') return s.symbol.replace(/USDT$/, 'USD');
  if (/^frx/.test(s.symbol)) return s.symbol.slice(3);
  if (/^cry/.test(s.symbol)) return s.symbol.slice(3);
  return s.display_name;
}
function spec(name, s) {
  const pip = s.pip || 0.0001;
  const digits = Math.max(0, Math.min(8, Math.round(-Math.log10(pip))));
  const cat = s.cat || '';
  let contract = 1, min = 0.01, step = 0.01, spread = 2;
  if (/^frx/.test(s.symbol) && /^(XAU|XAG|XPT|XPD)/.test(name)) { contract = /^XAU/.test(name) ? 100 : (/^XAG/.test(name) ? 5000 : 100); spread = 20; }
  else if (/^frx/.test(s.symbol)) { contract = 100000; spread = 8; }
  else if (s.src === 'binance' || /^cry/.test(s.symbol)) { contract = 1; min = 0.001; step = 0.001; spread = 0; }
  else if (/Volatility/.test(name)) { contract = 1; min = /75/.test(name) ? 0.001 : 0.01; step = min; spread = 0; }
  else { contract = 1; min = 0.1; step = 0.1; spread = 2; }
  return { digits, point: Math.pow(10, -digits), contract, min, step, spread, base: name.slice(0, 3), quote: name.slice(3, 6), cat };
}

/* ---------- catalog ---------- */
M.init = async function () {
  const F = G.GTFeed;
  let res;
  try { res = await F.symbols(); } catch (e) { res = { list: [] }; }
  const seen = new Set();
  (res.list || []).forEach(s => {
    const name = mtName(s); if (!name || seen.has(name)) return; seen.add(name);
    if (s.src === 'binance' && !(s.group === 'Top by 24h volume')) return;   // keep the list short: top crypto only
    const sp = spec(name, s);
    const o = { name, path: (s.group || 'Other').replace(/\\/g, '/') + '\\' + name, desc: s.display_name, meta: s, spec: sp };
    M.list.push(o); M.byName.set(name, o);
  });
  M.ready = true;
};

/* ---------- live prices ---------- */
function st(name) { return M.sel.get(name); }
M.select = function (name) {
  if (!M.byName.has(name)) return false;
  if (M.sel.has(name)) return true;
  const o = M.byName.get(name);
  const s = { o, bid: 0, ask: 0, t: 0, series: new Map(), stop: null };
  M.sel.set(name, s);
  G.GTFeed.ticks(o.meta, (px, epoch) => tick(s, +px, +epoch)).then(stop => { s.stop = stop; }).catch(() => { });
  // a first price from M1 history (markets that are closed still show their last price)
  loadSeries(s, 1);
  return true;
};
function tick(s, px, epoch) {
  if (!(px > 0)) return;
  const sp = s.o.spec;
  s.bid = px; s.ask = px + sp.spread * sp.point; s.t = epoch;
  if (epoch > RT.lastServer) RT.lastServer = epoch;
  s.series.forEach((ser, tf) => {
    if (!ser.ok) return;
    const sec = TFSEC[tf] || 60, bt = Math.floor(epoch / sec) * sec, b = ser.bars;
    const last = b[b.length - 1];
    if (last && bt === last.time) { if (px > last.high) last.high = px; if (px < last.low) last.low = px; last.close = px; last.tick_volume++; }
    else if (!last || bt > last.time) {
      b.push(mk(bt, last ? last.close : px, px));
      if (b.length > KEEP) b.splice(0, b.length - KEEP);
      ser.ver++;
    }
    ser.tick++;
  });
}
function mk(t, o, c) { const r = new G.MqlRates(); r.time = t; r.open = o; r.high = Math.max(o, c); r.low = Math.min(o, c); r.close = c; r.tick_volume = 1; return r; }
/* history requests go out a few at a time (the price services limit how fast we may ask) */
const Q = []; let qRun = 0;
function queue(fn) { return new Promise((res, rej) => { Q.push({ fn, res, rej }); pump(); }); }
function pump() {
  while (qRun < 3 && Q.length) {
    const j = Q.shift(); qRun++;
    Promise.resolve().then(j.fn).then(j.res, j.rej).finally(() => { setTimeout(() => { qRun--; pump(); }, 250); });
  }
}
function loadSeries(s, tf) {
  let ser = s.series.get(tf);
  if (ser) return ser;
  ser = { bars: [], ok: false, loading: true, ver: 0, tick: 0 };
  s.series.set(tf, ser);
  const gran = TFSEC[tf] || 60;
  queue(() => G.GTFeed.history(s.o.meta, gran, 1000)).then(c => {
    ser.bars = (c || []).map(x => { const r = new G.MqlRates(); r.time = +x.time; r.open = +x.open; r.high = +x.high; r.low = +x.low; r.close = +x.close; r.tick_volume = +(x.vol || 1); return r; });
    ser.ok = ser.bars.length > 0; ser.loading = false; ser.ver++;
    const l = ser.bars[ser.bars.length - 1];
    if (l && !s.bid) { s.bid = l.close; s.ask = l.close + s.o.spec.spread * s.o.spec.point; s.t = l.time; }
    if (l && l.time > RT.lastServer && tf === 1) RT.lastServer = l.time + 59;
  }).catch(() => { ser.loading = false; setTimeout(() => { if (s.series.get(tf) === ser && !ser.ok) s.series.delete(tf); }, 15000); });
  return ser;
}
function bars(sym, tf) {
  if (!tf) tf = 1;
  const s = st(sym); if (!s) { if (!M.select(sym)) return null; return null; }
  const ser = loadSeries(s, tf);
  return ser.ok ? ser : null;
}
RT.bars = bars;

/* ---------- MT5 symbol functions ---------- */
Object.assign(G, {
  SymbolsTotal: sel => sel ? M.sel.size : M.list.length,
  SymbolName: (i, sel) => sel ? ([...M.sel.keys()][i] || '') : (M.list[i] ? M.list[i].name : ''),
  SymbolSelect: (name, on) => on ? M.select(name) : true,
  SymbolExist: name => M.byName.has(name),
  SymbolInfoString: (name, p) => { const o = M.byName.get(name); if (!o) return ''; if (p === G.SYMBOL_PATH) return o.path; if (p === G.SYMBOL_DESCRIPTION) return o.desc; return ''; },
  SymbolInfoInteger: (name, p) => {
    const o = M.byName.get(name); if (!o) return 0;
    switch (p) {
      case G.SYMBOL_DIGITS: return o.spec.digits;
      case G.SYMBOL_SELECT: return M.sel.has(name) ? 1 : 0;
      case G.SYMBOL_TRADE_MODE: { const b = RT.broker && RT.broker.ready ? RT.broker : null; return b ? b.tradeMode(name) : G.SYMBOL_TRADE_MODE_FULL; }
      case G.SYMBOL_SPREAD: return o.spec.spread;
      default: return 0;     // stops level / freeze level 0
    }
  },
  SymbolInfoDouble: (name, p) => {
    const o = M.byName.get(name); if (!o) return 0;
    const s = st(name) || (M.select(name), st(name));
    const sp = o.spec;
    switch (p) {
      case G.SYMBOL_BID: return s ? s.bid : 0;
      case G.SYMBOL_ASK: return s ? s.ask : 0;
      case G.SYMBOL_POINT: return sp.point;
      case G.SYMBOL_TRADE_TICK_SIZE: return sp.point;
      case G.SYMBOL_TRADE_TICK_VALUE: {
        let v = sp.point * sp.contract;
        if (/^frx/.test(o.meta.symbol) && sp.quote !== 'USD') { const px = s && s.bid > 0 ? s.bid : 1; v = sp.base === 'USD' ? v / px : v / (sp.quote === 'JPY' ? 150 : 1); }
        return v;
      }
      case G.SYMBOL_VOLUME_MIN: { const b = RT.broker && RT.broker.ready ? RT.broker : null; return (b && b.volMin(name)) || sp.min; }      // Binance: lot size + minimum order value
      case G.SYMBOL_VOLUME_STEP: { const b = RT.broker && RT.broker.ready ? RT.broker : null; return (b && b.volStep(name)) || sp.step; }
      case G.SYMBOL_VOLUME_MAX: { const b = RT.broker && RT.broker.ready ? RT.broker : null; return (b && b.volMax(name)) || 100; }
      case G.SYMBOL_VOLUME_LIMIT: return 0;
      case G.SYMBOL_TRADE_CONTRACT_SIZE: return sp.contract;
      default: return 0;
    }
  }
});

Object.assign(G, {
  OrderCalcProfit: (type, name, lot, po, pc) => {
    const tv = G.SymbolInfoDouble(name, G.SYMBOL_TRADE_TICK_VALUE), ts = G.SymbolInfoDouble(name, G.SYMBOL_TRADE_TICK_SIZE);
    if (!(tv > 0) || !(ts > 0)) { G._R = [0]; return false; }
    const sgn = (type === G.ORDER_TYPE_SELL) ? -1 : 1;
    G._R = [sgn * (pc - po) / ts * tv * lot]; return true;
  }
});

/* ---------- MT5 series functions ---------- */
function at(ser, shift) { const b = ser.bars; const i = b.length - 1 - shift; return (i >= 0 && i < b.length) ? b[i] : null; }
Object.assign(G, {
  Bars: (sym, tf) => { const s = bars(sym, tf); return s ? s.bars.length : 0; },
  iBars: (sym, tf) => { const s = bars(sym, tf); return s ? s.bars.length : 0; },
  iTime: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.time : 0; },
  iOpen: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.open : 0; },
  iHigh: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.high : 0; },
  iLow: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.low : 0; },
  iClose: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.close : 0; },
  iVolume: (sym, tf, sh) => { const s = bars(sym, tf); const r = s && at(s, sh); return r ? r.tick_volume : 0; },
  iBarShift: (sym, tf, t, exact = false) => {
    const s = bars(sym, tf); if (!s) return -1;
    const b = s.bars, sec = TFSEC[tf] || 60;
    for (let i = b.length - 1; i >= 0; i--) {
      if (b[i].time <= t) { if (exact && b[i].time + sec <= t) return -1; return b.length - 1 - i; }
    }
    return exact ? -1 : b.length - 1;
  },
  iHighest: (sym, tf, mode, cnt, start) => { const s = bars(sym, tf); if (!s) return -1; let best = -1, bv = -Infinity; for (let k = start; k < start + cnt; k++) { const r = at(s, k); if (!r) break; const v = mode === G.MODE_LOW ? r.low : (mode === G.MODE_CLOSE ? r.close : (mode === G.MODE_OPEN ? r.open : r.high)); if (v > bv) { bv = v; best = k; } } return best; },
  iLowest: (sym, tf, mode, cnt, start) => { const s = bars(sym, tf); if (!s) return -1; let best = -1, bv = Infinity; for (let k = start; k < start + cnt; k++) { const r = at(s, k); if (!r) break; const v = mode === G.MODE_HIGH ? r.high : (mode === G.MODE_CLOSE ? r.close : (mode === G.MODE_OPEN ? r.open : r.low)); if (v < bv) { bv = v; best = k; } } return best; },
  CopyRates: (sym, tf, start, cnt, out) => {
    if (start > 100000000 && cnt > 100000000) return ratesRange(sym, tf, start, cnt, out);   // (from time, to time)
    const s = bars(sym, tf); if (!s) return -1;
    const b = s.bars; const end = b.length - start; const from = Math.max(0, end - cnt);
    if (end <= 0) return -1;
    const n = end - from; out.length = n;
    for (let i = 0; i < n; i++) { const r = b[from + i]; const c = new G.MqlRates(); c.time = r.time; c.open = r.open; c.high = r.high; c.low = r.low; c.close = r.close; c.tick_volume = r.tick_volume; out[out._series ? n - 1 - i : i] = c; }
    return n;
  },
  CopyClose: (sym, tf, start, cnt, out) => { const s = bars(sym, tf); if (!s) return -1; const b = s.bars, end = b.length - start, from = Math.max(0, end - cnt), n = Math.max(0, end - from); out.length = n; for (let i = 0; i < n; i++) out[out._series ? n - 1 - i : i] = b[from + i].close; return n; },
  CopyTime: (sym, tf, start, cnt, out) => { const s = bars(sym, tf); if (!s) return -1; const b = s.bars, end = b.length - start, from = Math.max(0, end - cnt), n = Math.max(0, end - from); out.length = n; for (let i = 0; i < n; i++) out[out._series ? n - 1 - i : i] = b[from + i].time; return n; },
  SeriesInfoInteger: () => 0
});

/* ---------- candles between two times (trade replay of older trades) ---------- */
const RANGE = new Map();
function copyOut(list, out) { const n = list.length; out.length = n; for (let i = 0; i < n; i++) { const r = list[i], c = new G.MqlRates(); Object.assign(c, { time: r.time, open: r.open, high: r.high, low: r.low, close: r.close, tick_volume: r.tick_volume || 1 }); out[out._series ? n - 1 - i : i] = c; } return n; }
function ratesRange(sym, tf, from, to, out) {
  const s = bars(sym, tf);
  if (s && s.bars.length && s.bars[0].time <= from) return copyOut(s.bars.filter(r => r.time >= from && r.time <= to), out);
  const sec = TFSEC[tf] || 60, key = sym + '|' + tf + '|' + Math.floor(from / sec) + '|' + Math.floor(to / sec);
  const c = RANGE.get(key);
  if (c && c.ok) { const live = s ? s.bars.filter(r => r.time > (c.list.length ? c.list[c.list.length - 1].time : 0) && r.time <= to) : []; return copyOut(c.list.concat(live), out); }
  if (!c) {
    const st = M.sel.get(sym) || (M.select(sym), M.sel.get(sym)); if (!st) return -1;
    const o = { ok: false, list: [] }; RANGE.set(key, o);
    const meta = st.o.meta, F = G.GTFeed;
    let p;
    try {
    if (meta.src === 'binance') p = F.Binance.get('/api/v3/klines?symbol=' + meta.symbol + '&interval=' + ({ 60: '1m', 300: '5m', 900: '15m', 1800: '30m', 3600: '1h', 14400: '4h', 86400: '1d' }[sec] || '1m') + '&startTime=' + from * 1000 + '&endTime=' + to * 1000 + '&limit=1000')
      .then(r => r.map(k => ({ time: Math.floor(k[0] / 1000), open: +k[1], high: +k[2], low: +k[3], close: +k[4] })));
    else p = F.deriv.connect().then(() => F.deriv.send({ ticks_history: meta.symbol, start: from, end: Math.min(to, Math.floor(Date.now() / 1000)), granularity: sec, style: 'candles', adjust_start_time: 1 }))
      .then(r => (r.candles || []).map(x => ({ time: +x.epoch, open: +x.open, high: +x.high, low: +x.low, close: +x.close })));
    } catch (e) { p = Promise.reject(e); }
    queue(() => p).then(l => { o.list = l; o.ok = true; }).catch(() => { setTimeout(() => RANGE.delete(key), 20000); });
  }
  return -1;
}

/* ---------- indicators (MT5 formulas) ---------- */
const IND = []; // handle -> {kind, sym, tf, p:[...], cache}
function newH(kind, sym, tf, p) { if (!sym) return -1; const h = IND.length; IND.push({ kind, sym, tf: tf || 1, p, cache: null }); bars(sym, tf || 1); return h; }
Object.assign(G, {
  iMA: (sym, tf, per, shift, method, price) => newH('ma', sym, tf, [per, shift, method, price]),
  iRSI: (sym, tf, per, price) => newH('rsi', sym, tf, [per, price]),
  iMACD: (sym, tf, f, s, sig, price) => newH('macd', sym, tf, [f, s, sig, price]),
  iBands: (sym, tf, per, shift, dev, price) => newH('bands', sym, tf, [per, shift, dev, price]),
  iStochastic: (sym, tf, k, d, slow, method, field) => newH('sto', sym, tf, [k, d, slow, method, field]),
  iCCI: (sym, tf, per, price) => newH('cci', sym, tf, [per, price]),
  iSAR: (sym, tf, step, max) => newH('sar', sym, tf, [step, max]),
  iADX: (sym, tf, per) => newH('adx', sym, tf, [per]),
  iATR: (sym, tf, per) => newH('atr', sym, tf, [per]),
  iWPR: (sym, tf, per) => newH('wpr', sym, tf, [per]),
  iMomentum: (sym, tf, per, price) => newH('mom', sym, tf, [per, price]),
  iCustom: () => -1, IndicatorCreate: () => -1,
  IndicatorRelease: h => { if (IND[h]) IND[h] = null; return true; },
  BarsCalculated: h => { const o = IND[h]; if (!o) return -1; const s = bars(o.sym, o.tf); return s ? s.bars.length : -1; }
});
function price(b, i, mode) {
  const r = b[i];
  switch (mode) { case G.PRICE_OPEN: return r.open; case G.PRICE_HIGH: return r.high; case G.PRICE_LOW: return r.low;
    case G.PRICE_MEDIAN: return (r.high + r.low) / 2; case G.PRICE_TYPICAL: return (r.high + r.low + r.close) / 3;
    case G.PRICE_WEIGHTED: return (r.high + r.low + 2 * r.close) / 4; default: return r.close; }
}
const EV = G.EMPTY_VALUE;
function maArr(src, per, method) {
  const n = src.length, out = new Array(n).fill(EV); per = Math.max(1, per | 0);
  if (n < per) return out;
  if (method === G.MODE_EMA) { const a = 2 / (per + 1); let v = src[0]; out[0] = v; for (let i = 1; i < n; i++) { v = src[i] * a + v * (1 - a); out[i] = v; } for (let i = 0; i < per - 1 && i < n; i++) out[i] = EV; return out; }
  if (method === G.MODE_SMMA) { let s = 0; for (let i = 0; i < per; i++) s += src[i]; let v = s / per; out[per - 1] = v; for (let i = per; i < n; i++) { v = (v * (per - 1) + src[i]) / per; out[i] = v; } return out; }
  if (method === G.MODE_LWMA) { const w = per * (per + 1) / 2; for (let i = per - 1; i < n; i++) { let s = 0; for (let k = 0; k < per; k++) s += src[i - k] * (per - k); out[i] = s / w; } return out; }
  let s = 0; for (let i = 0; i < n; i++) { s += src[i]; if (i >= per) s -= src[i - per]; if (i >= per - 1) out[i] = s / per; } return out;
}
function compute(o) {
  const ser = bars(o.sym, o.tf); if (!ser) return null;
  const b = ser.bars, n = b.length;
  const key = n + ':' + ser.ver + ':' + (n ? b[n - 1].close : 0) + ':' + (n ? b[n - 1].high + b[n - 1].low : 0);
  if (o.cache && o.cache.key === key) return o.cache.bufs;
  const p = o.p; let bufs;
  const cl = b.map(r => r.close), hi = b.map(r => r.high), lo = b.map(r => r.low);
  switch (o.kind) {
    case 'ma': { const src = b.map((r, i) => price(b, i, p[3])); bufs = [maArr(src, p[0], p[2])]; break; }
    case 'rsi': {
      const per = Math.max(2, p[0]), src = b.map((r, i) => price(b, i, p[1])), out = new Array(n).fill(EV);
      if (n > per) { let up = 0, dn = 0; for (let i = 1; i <= per; i++) { const d = src[i] - src[i - 1]; if (d > 0) up += d; else dn -= d; }
        up /= per; dn /= per; out[per] = dn === 0 ? (up === 0 ? 50 : 100) : 100 - 100 / (1 + up / dn);
        for (let i = per + 1; i < n; i++) { const d = src[i] - src[i - 1]; up = (up * (per - 1) + (d > 0 ? d : 0)) / per; dn = (dn * (per - 1) + (d < 0 ? -d : 0)) / per; out[i] = dn === 0 ? (up === 0 ? 50 : 100) : 100 - 100 / (1 + up / dn); } }
      bufs = [out]; break;
    }
    case 'macd': {
      const src = b.map((r, i) => price(b, i, p[3]));
      const f = maArr(src, p[0], G.MODE_EMA), s = maArr(src, p[1], G.MODE_EMA);
      const m = src.map((x, i) => (f[i] === EV || s[i] === EV) ? EV : f[i] - s[i]);
      const first = m.findIndex(x => x !== EV);
      const sig = new Array(n).fill(EV);
      if (first >= 0) { const part = maArr(m.slice(first), p[2], G.MODE_SMA); for (let i = 0; i < part.length; i++) sig[first + i] = part[i]; }
      bufs = [m, sig]; break;
    }
    case 'bands': {
      const per = Math.max(2, p[0]), dev = p[2], src = b.map((r, i) => price(b, i, p[3])), mid = maArr(src, per, G.MODE_SMA);
      const up = new Array(n).fill(EV), dnb = new Array(n).fill(EV);
      for (let i = per - 1; i < n; i++) { let s = 0; for (let k = 0; k < per; k++) { const d = src[i - k] - mid[i]; s += d * d; } const sd = Math.sqrt(s / per); up[i] = mid[i] + dev * sd; dnb[i] = mid[i] - dev * sd; }
      bufs = [mid, up, dnb]; break;
    }
    case 'sto': {
      const kp = Math.max(1, p[0]), dp = Math.max(1, p[1]), sl = Math.max(1, p[2]);
      const hh = new Array(n), ll = new Array(n);
      for (let i = 0; i < n; i++) { let h = -Infinity, l = Infinity; for (let k = Math.max(0, i - kp + 1); k <= i; k++) { if (hi[k] > h) h = hi[k]; if (lo[k] < l) l = lo[k]; } hh[i] = h; ll[i] = l; }
      const K = new Array(n).fill(EV);
      for (let i = kp + sl - 2; i < n; i++) { let a = 0, c = 0; for (let k = i - sl + 1; k <= i; k++) { a += cl[k] - ll[k]; c += hh[k] - ll[k]; } K[i] = c === 0 ? 100 : 100 * a / c; }
      const first = K.findIndex(x => x !== EV), D = new Array(n).fill(EV);
      if (first >= 0) { const part = maArr(K.slice(first), dp, G.MODE_SMA); for (let i = 0; i < part.length; i++) D[first + i] = part[i]; }
      bufs = [K, D]; break;
    }
    case 'cci': {
      const per = Math.max(2, p[0]), tp = b.map((r, i) => price(b, i, p[1] || G.PRICE_TYPICAL)), sma = maArr(tp, per, G.MODE_SMA), out = new Array(n).fill(EV);
      for (let i = per - 1; i < n; i++) { let md = 0; for (let k = 0; k < per; k++) md += Math.abs(tp[i - k] - sma[i]); md /= per; out[i] = md === 0 ? 0 : (tp[i] - sma[i]) / (0.015 * md); }
      bufs = [out]; break;
    }
    case 'sar': {
      const step = p[0], mx = p[1], out = new Array(n).fill(EV);
      if (n > 2) {
        let up = cl[1] >= cl[0], af = step, ep = up ? hi[0] : lo[0], sar = up ? lo[0] : hi[0];
        out[0] = sar;
        for (let i = 1; i < n; i++) {
          sar = sar + af * (ep - sar);
          if (up) { sar = Math.min(sar, lo[i - 1], i > 1 ? lo[i - 2] : lo[i - 1]); if (lo[i] < sar) { up = false; sar = ep; ep = lo[i]; af = step; } else if (hi[i] > ep) { ep = hi[i]; af = Math.min(mx, af + step); } }
          else { sar = Math.max(sar, hi[i - 1], i > 1 ? hi[i - 2] : hi[i - 1]); if (hi[i] > sar) { up = true; sar = ep; ep = hi[i]; af = step; } else if (lo[i] < ep) { ep = lo[i]; af = Math.min(mx, af + step); } }
          out[i] = sar;
        }
      }
      bufs = [out]; break;
    }
    case 'adx': {
      const per = Math.max(2, p[0]);
      const pr = new Array(n).fill(0), nr = new Array(n).fill(0);
      for (let i = 1; i < n; i++) {
        let pdm = hi[i] - hi[i - 1], ndm = lo[i - 1] - lo[i]; if (pdm < 0) pdm = 0; if (ndm < 0) ndm = 0;
        if (pdm > ndm) ndm = 0; else if (ndm > pdm) pdm = 0; else { pdm = 0; ndm = 0; }
        const tr = Math.max(hi[i] - lo[i], Math.abs(hi[i] - cl[i - 1]), Math.abs(lo[i] - cl[i - 1]));
        pr[i] = tr === 0 ? 0 : 100 * pdm / tr; nr[i] = tr === 0 ? 0 : 100 * ndm / tr;
      }
      const P = maArr(pr, per, G.MODE_EMA), N = maArr(nr, per, G.MODE_EMA);
      const dx = P.map((x, i) => (x === EV || N[i] === EV) ? 0 : ((x + N[i]) === 0 ? 0 : 100 * Math.abs(x - N[i]) / (x + N[i])));
      const A = maArr(dx, per, G.MODE_EMA);
      for (let i = 0; i < Math.min(n, per * 2); i++) A[i] = EV;
      bufs = [A, P, N]; break;
    }
    case 'atr': {
      const per = Math.max(1, p[0]), tr = new Array(n).fill(0);
      for (let i = 0; i < n; i++) tr[i] = i === 0 ? hi[i] - lo[i] : Math.max(hi[i] - lo[i], Math.abs(hi[i] - cl[i - 1]), Math.abs(lo[i] - cl[i - 1]));
      const a = maArr(tr, per, G.MODE_SMA); a[0] = EV; bufs = [a]; break;
    }
    case 'wpr': {
      const per = Math.max(1, p[0]), out = new Array(n).fill(EV);
      for (let i = per - 1; i < n; i++) { let h = -Infinity, l = Infinity; for (let k = i - per + 1; k <= i; k++) { if (hi[k] > h) h = hi[k]; if (lo[k] < l) l = lo[k]; } out[i] = h === l ? 0 : -100 * (h - cl[i]) / (h - l); }
      bufs = [out]; break;
    }
    case 'mom': {
      const per = Math.max(1, p[0]), src = b.map((r, i) => price(b, i, p[1])), out = new Array(n).fill(EV);
      for (let i = per; i < n; i++) out[i] = src[i - per] === 0 ? 100 : src[i] * 100 / src[i - per];
      bufs = [out]; break;
    }
    default: bufs = [new Array(n).fill(EV)];
  }
  if (o.kind === 'ma' && p[1]) { const sh = p[1]; bufs[0] = bufs[0].map((x, i) => i - sh >= 0 ? bufs[0][i - sh] : EV); }
  o.cache = { key, bufs };
  return bufs;
}
G.CopyBuffer = (h, buf, start, cnt, out) => {
  const o = IND[h]; if (!o) return -1;
  const bufs = compute(o); if (!bufs) return -1;
  const a = bufs[buf] || bufs[0]; const n0 = a.length; const end = n0 - start; const from = Math.max(0, end - cnt);
  if (end <= 0) return -1;
  const n = end - from; out.length = n;
  for (let i = 0; i < n; i++) out[out._series ? n - 1 - i : i] = a[from + i];
  return n;
};
})(typeof self !== 'undefined' ? self : this);
