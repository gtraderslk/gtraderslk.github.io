/* ============================================================
   G TRADERS — market data for every live page
     Deriv   : forex, metals, stock indices and synthetic indices
               (public WebSocket, no login needed for prices)
     Binance : crypto (public REST + WebSocket, no login)
   One shared feed per page: GTFeed.symbols / history / stream / ticks
   ============================================================ */
(function () {
  const C = window.GT_CONFIG || {};

  /* ======================= Deriv WebSocket ======================= */
  // Deriv moved its public feed in 2026; the old address is kept as a fallback.
  const DERIV_URLS = [C.derivWs || 'wss://api.derivws.com/trading/v1/options/ws/public',
    'wss://ws.derivws.com/websockets/v3?app_id=' + (C.derivAppId || 1089)];

  class DerivAPI {
    constructor() {
      this.ws = null; this.reqId = 0; this.pending = new Map(); this.subs = new Map();
      this.onStatus = () => { }; this.status = 'disconnected'; this._delay = 1000; this._closing = false;
      this._resubs = new Set();   // functions that re-create subscriptions after a reconnect
      this._url = 0; this._listeners = new Set();
    }
    on(f) { this._listeners.add(f); }
    _set(s) { this.status = s; this.onStatus(s); this._listeners.forEach(f => f(s)); }
    connect() {
      if (this.status === 'connected') return Promise.resolve();
      if (this._connecting) return this._connecting;
      this._connecting = this._try(0).finally(() => { this._connecting = null; });
      return this._connecting;
    }
    _try(n) {
      return new Promise((resolve, reject) => {
        if (n >= DERIV_URLS.length) { reject(new Error('Deriv feed unreachable')); return; }
        const url = DERIV_URLS[(this._url + n) % DERIV_URLS.length];
        this._set('connecting');
        let ws; try { ws = new WebSocket(url); } catch (e) { this._try(n + 1).then(resolve, reject); return; }
        this.ws = ws; let opened = false;
        const to = setTimeout(() => { if (!opened) { try { ws.close(); } catch (e) { } } }, 9000);
        ws.onopen = () => { opened = true; clearTimeout(to); this._url = (this._url + n) % DERIV_URLS.length; this._set('connected'); this._delay = 1000; resolve(); this._ping(); };
        ws.onmessage = (ev) => {
          let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
          if (m.req_id && this.pending.has(m.req_id)) {
            const p = this.pending.get(m.req_id);
            if (m.error) p.reject(Object.assign(new Error(m.error.message), { code: m.error.code })); else p.resolve(m);
            if (!m.subscription || m.error) this.pending.delete(m.req_id);
          }
          if (m.subscription && this.subs.has(m.subscription.id)) this.subs.get(m.subscription.id)(m);
        };
        ws.onclose = () => {
          clearTimeout(to);
          this.pending.forEach(p => p.reject(new Error('connection closed'))); this.pending.clear(); this.subs.clear();
          if (!opened) { this._try(n + 1).then(resolve, reject); return; }
          this._set('disconnected');
          if (this._closing) return;
          setTimeout(() => this.connect().then(() => this._resubs.forEach(f => f())).catch(() => { }), this._delay);
          this._delay = Math.min(this._delay * 2, 30000);
        };
        ws.onerror = () => { };
      });
    }
    _ping() { clearInterval(this._pt); this._pt = setInterval(() => { if (this.ws && this.ws.readyState === 1) this.send({ ping: 1 }).catch(() => { }); }, 25000); }
    send(payload) {
      return new Promise((resolve, reject) => {
        if (!this.ws || this.ws.readyState !== 1) { reject(new Error('Not connected')); return; }
        const id = ++this.reqId; this.pending.set(id, { resolve, reject });
        this.ws.send(JSON.stringify(Object.assign({}, payload, { req_id: id })));
      });
    }
    forget(id) { if (!id) return; this.subs.delete(id); this.send({ forget: id }).catch(() => { }); }
  }

  /* ======================= Binance (crypto) ======================= */
  const BN_REST = ['https://api.binance.com', 'https://data-api.binance.vision'];
  const BN_WS = ['wss://stream.binance.com:9443/ws/', 'wss://data-stream.binance.vision/ws/'];
  const BN_IV = { 60: '1m', 300: '5m', 900: '15m', 1800: '30m', 3600: '1h', 14400: '4h', 86400: '1d' };
  const BN_TOP = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA', 'AVAX', 'LINK', 'TRX', 'TON', 'DOT', 'LTC', 'BCH', 'SHIB', 'PEPE', 'SUI', 'NEAR', 'APT', 'ARB'];
  const STABLE = /^(USDC|FDUSD|TUSD|BUSD|DAI|USDP|USDE|EUR|AEUR|PAXG|USD1|XUSD|BFUSD)USDT$/;
  let bnRest = 0, bnWs = 0;
  const Binance = {
    async get(path) {
      let err;
      for (let n = 0; n < BN_REST.length; n++) {
        const i = (bnRest + n) % BN_REST.length;
        try {
          const r = await fetch(BN_REST[i] + path);
          if (!r.ok) { const j = await r.json().catch(() => ({})); throw Object.assign(new Error(j.msg || ('HTTP ' + r.status)), { http: r.status }); }
          bnRest = i; return await r.json();
        } catch (e) { err = e; if (e.http === 400) break; }
      }
      throw err || new Error('Binance unreachable');
    },
    async symbols() {
      let rows = [];
      try { rows = await this.get('/api/v3/ticker/24hr?type=MINI'); } catch (e) { rows = []; }
      let list = rows.filter(r => /USDT$/.test(r.symbol) && !/(UP|DOWN|BULL|BEAR)USDT$/.test(r.symbol) && !STABLE.test(r.symbol) && +r.quoteVolume > 0)
        .map(r => ({ sym: r.symbol, vol: +r.quoteVolume, last: +r.lastPrice }));
      const live = list.length > 0;
      if (!live) list = BN_TOP.map((b, i) => ({ sym: b + 'USDT', vol: 1e9 - i, last: 0 }));
      list.sort((a, b) => b.vol - a.vol);
      const top = new Set(list.slice(0, 25).map(x => x.sym));
      return {
        live, list: list.map(x => ({
          symbol: x.sym, src: 'binance', cat: 'crypto', display_name: x.sym.replace(/USDT$/, '/USDT'),
          group: top.has(x.sym) ? 'Top by 24h volume' : 'All USDT pairs', pip: pipFromPrice(x.last), exchange_is_open: 1, vol: x.vol
        }))
      };
    },
    async klines(sym, gran, limit) {
      const r = await this.get(`/api/v3/klines?symbol=${encodeURIComponent(sym)}&interval=${BN_IV[gran] || '1m'}&limit=${Math.min(1000, limit || 500)}`);
      return r.map(k => ({ time: Math.floor(k[0] / 1000), open: +k[1], high: +k[2], low: +k[3], close: +k[4], vol: +k[5] }));
    },
    // a self-healing stream; returns a stop function
    stream(name, onMsg) {
      let ws, stop = false, delay = 1000, tries = 0;
      const open = () => {
        if (stop) return;
        const i = (bnWs + tries) % BN_WS.length;
        ws = new WebSocket(BN_WS[i] + name);
        let ok = false;
        ws.onopen = () => { ok = true; bnWs = i; delay = 1000; tries = 0; };
        ws.onmessage = e => { try { onMsg(JSON.parse(e.data)); } catch (x) { } };
        ws.onclose = () => { if (stop) return; if (!ok) tries++; setTimeout(open, delay); delay = Math.min(delay * 2, 20000); };
        ws.onerror = () => { };
      };
      open();
      return () => { stop = true; try { ws && ws.close(); } catch (e) { } };
    }
  };
  function pipFromPrice(p) { p = Math.abs(+p || 0); return p >= 1000 ? 0.01 : p >= 10 ? 0.001 : p >= 1 ? 0.0001 : p >= 0.01 ? 0.000001 : 0.00000001; }

  /* ======================= market list ======================= */
  const SUB = {
    random_index: 'Volatility indices', crash_index: 'Boom & Crash', jump_index: 'Jump indices', step_index: 'Step indices',
    range_index: 'Range Break', random_daily: 'Daily Reset', forex_basket: 'Forex baskets', commodity_basket: 'Gold basket',
    major_pairs: 'Major pairs', minor_pairs: 'Minor pairs', exotic_pairs: 'Exotic pairs', smart_fx: 'Smart FX', metals: 'Metals', energy: 'Energy',
    europe_OTC: 'Europe', asia_oceania_OTC: 'Asia & Oceania', americas_OTC: 'Americas', non_stable_coin: 'Crypto (Deriv)'
  };
  const title = s => String(s || 'Other').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  function normDeriv(x) {
    const sym = x.underlying_symbol || x.symbol, m = x.market || '';
    const cat = m === 'synthetic_index' ? 'deriv' : (m === 'forex' || m === 'commodities') ? 'forex' : m === 'indices' ? 'indices' : m === 'cryptocurrency' ? 'crypto' : 'deriv';
    return {
      symbol: sym, src: 'deriv', cat, group: SUB[x.submarket] || x.submarket_display_name || title(x.submarket),
      display_name: x.underlying_symbol_name || x.display_name || sym, pip: +(x.pip_size || x.pip || 0.01), exchange_is_open: x.exchange_is_open ? 1 : 0
    };
  }
  const FALLBACK = [
    ['R_10', 'Volatility 10 Index', 'random_index'], ['R_25', 'Volatility 25 Index', 'random_index'], ['R_50', 'Volatility 50 Index', 'random_index'],
    ['R_75', 'Volatility 75 Index', 'random_index'], ['R_100', 'Volatility 100 Index', 'random_index'], ['1HZ10V', 'Volatility 10 (1s) Index', 'random_index'],
    ['1HZ25V', 'Volatility 25 (1s) Index', 'random_index'], ['1HZ50V', 'Volatility 50 (1s) Index', 'random_index'], ['1HZ75V', 'Volatility 75 (1s) Index', 'random_index'],
    ['1HZ100V', 'Volatility 100 (1s) Index', 'random_index'], ['BOOM500', 'Boom 500 Index', 'crash_index'], ['BOOM1000', 'Boom 1000 Index', 'crash_index'],
    ['CRASH500', 'Crash 500 Index', 'crash_index'], ['CRASH1000', 'Crash 1000 Index', 'crash_index'], ['JD25', 'Jump 25 Index', 'jump_index'],
    ['frxEURUSD', 'EUR/USD', 'major_pairs', 'forex', 0.00001], ['frxGBPUSD', 'GBP/USD', 'major_pairs', 'forex', 0.00001], ['frxUSDJPY', 'USD/JPY', 'major_pairs', 'forex', 0.001],
    ['frxAUDUSD', 'AUD/USD', 'major_pairs', 'forex', 0.00001], ['frxUSDCAD', 'USD/CAD', 'major_pairs', 'forex', 0.00001], ['frxGBPJPY', 'GBP/JPY', 'major_pairs', 'forex', 0.001],
    ['frxXAUUSD', 'Gold/USD', 'metals', 'commodities', 0.01], ['frxXAGUSD', 'Silver/USD', 'metals', 'commodities', 0.0001],
    ['OTC_NDX', 'US Tech 100', 'americas_OTC', 'indices', 0.01], ['OTC_SPC', 'US 500', 'americas_OTC', 'indices', 0.01], ['OTC_GDAXI', 'Germany 40', 'europe_OTC', 'indices', 0.01]
  ].map(([s, n, sub, m, pip]) => normDeriv({ underlying_symbol: s, underlying_symbol_name: n, submarket: sub, market: m || 'synthetic_index', pip_size: pip || 0.01, exchange_is_open: 1 }));

  const CATS = [['crypto', 'Crypto'], ['forex', 'Forex & Metals'], ['deriv', 'Deriv Synthetics'], ['indices', 'Indices']];
  const GORDER = ['Top by 24h volume', 'Volatility indices', 'Boom & Crash', 'Jump indices', 'Step indices', 'Range Break', 'Daily Reset',
    'Major pairs', 'Minor pairs', 'Exotic pairs', 'Metals', 'Energy', 'Americas', 'Europe', 'Asia & Oceania', 'Forex baskets', 'Gold basket', 'All USDT pairs', 'Crypto (Deriv)'];
  function groupSymbols(list) {
    const g = {};
    list.forEach(s => { const k = s.group || 'Other'; (g[k] = g[k] || []).push(s); });
    const names = Object.keys(g).sort((a, b) => {
      const ia = GORDER.indexOf(a), ib = GORDER.indexOf(b);
      return (ia < 0 ? 50 : ia) - (ib < 0 ? 50 : ib) || a.localeCompare(b);
    });
    names.forEach(n => { if (n !== 'Top by 24h volume' && n !== 'All USDT pairs') g[n].sort((a, b) => a.display_name.localeCompare(b.display_name, undefined, { numeric: true })); });
    return names.map(n => ({ name: n, items: g[n] }));
  }
  const digitsOf = s => s && s.pip ? Math.max(0, Math.min(8, Math.round(-Math.log10(s.pip)))) : 4;

  /* ======================= one feed per page ======================= */
  // history candles carry their open time in 'epoch'; a live 'ohlc' update carries the tick time in
  // 'epoch' and the candle's open time in 'open_time' — the chart must use the open time
  const toCandle = c => ({ time: Number(c.epoch), open: +c.open, high: +c.high, low: +c.low, close: +c.close });
  const ohlcCandle = (o, g) => { const t = Number(o.open_time) || Math.floor(Number(o.epoch) / g) * g; return { time: t, open: +o.open, high: +o.high, low: +o.low, close: +o.close }; };
  const deriv = new DerivAPI();
  let symCache = null;
  const Feed = {
    deriv, Binance, CATS,
    // { list, derivOk, binanceOk }
    symbols() {
      if (symCache) return symCache;
      symCache = (async () => {
        const [d, b] = await Promise.all([
          (async () => {
            try {
              await deriv.connect();
              const r = await deriv.send({ active_symbols: 'brief' });
              const l = (r.active_symbols || []).map(normDeriv).filter(s => s.symbol);
              return l.length ? { ok: true, list: l } : { ok: true, list: FALLBACK };
            } catch (e) { return { ok: deriv.status === 'connected', list: FALLBACK }; }
          })(),
          Binance.symbols().catch(() => ({ live: false, list: [] }))
        ]);
        // crypto comes from Binance; Deriv's own crypto stays as a backup
        let list = b.list.concat(d.list.filter(s => !(s.cat === 'crypto' && b.live)));
        return { list, derivOk: d.ok, binanceOk: b.live };
      })();
      return symCache;
    },
    find(list, sym) { return list.find(s => s.symbol === sym); },
    async history(meta, gran, count) {
      if (meta.src === 'binance') return Binance.klines(meta.symbol, gran, count);
      await deriv.connect();
      const r = await deriv.send({ ticks_history: meta.symbol, adjust_start_time: 1, count: count || 500, end: 'latest', granularity: gran, style: 'candles' });
      return (r.candles || []).map(toCandle);
    },
    // history + live bars. onInit(candles) once, onBar(candle) on every update. Returns a stop function.
    async stream(meta, gran, count, onInit, onBar) {
      if (meta.src === 'binance') {
        const c = await Binance.klines(meta.symbol, gran, count);
        onInit(c);
        return Binance.stream(meta.symbol.toLowerCase() + '@kline_' + (BN_IV[gran] || '1m'), m => {
          const k = m.k; if (!k) return;
          onBar({ time: Math.floor(k.t / 1000), open: +k.o, high: +k.h, low: +k.l, close: +k.c, vol: +k.v }, Math.floor(m.E / 1000));
        });
      }
      await deriv.connect();
      let id = null, stopped = false;
      const sub = async (first) => {
        const r = await deriv.send({ ticks_history: meta.symbol, adjust_start_time: 1, count: count || 500, end: 'latest', granularity: gran, style: 'candles', subscribe: 1 });
        if (stopped) { if (r.subscription) deriv.forget(r.subscription.id); return; }
        onInit((r.candles || []).map(toCandle), !first);
        if (r.subscription) {
          id = r.subscription.id;
          deriv.subs.set(id, m => { if (m.ohlc) onBar(ohlcCandle(m.ohlc, gran), Number(m.ohlc.epoch)); });
        }
      };
      const resub = () => sub(false).catch(() => { });
      await sub(true);
      deriv._resubs.add(resub);
      return () => { stopped = true; deriv._resubs.delete(resub); if (id) deriv.forget(id); };
    },
    // live price only. Returns a stop function.
    async ticks(meta, onPrice) {
      if (meta.src === 'binance') return Binance.stream(meta.symbol.toLowerCase() + '@miniTicker', m => m.c && onPrice(+m.c, Math.floor(m.E / 1000)));
      await deriv.connect();
      let id = null, stopped = false;
      const sub = async () => {
        const r = await deriv.send({ ticks: meta.symbol, subscribe: 1 });
        if (stopped) { if (r.subscription) deriv.forget(r.subscription.id); return; }
        if (r.tick) onPrice(+(r.tick.quote ?? r.tick.bid), r.tick.epoch);
        if (r.subscription) { id = r.subscription.id; deriv.subs.set(id, m => m.tick && onPrice(+(m.tick.quote ?? m.tick.bid), m.tick.epoch)); }
      };
      const resub = () => sub().catch(() => { });
      await sub();
      deriv._resubs.add(resub);
      return () => { stopped = true; deriv._resubs.delete(resub); if (id) deriv.forget(id); };
    },
    async dayOpen(meta) {
      const c = await this.history(meta, 86400, 1);
      return c.length ? c[c.length - 1].open : null;
    }
  };

  /* ======================= searchable symbol picker ======================= */
  class SymbolPicker {
    constructor(host, onPick) {
      this.host = host; this.onPick = onPick; this.list = []; this.cur = null;
      this.cat = GT.store.get('gt_pick_cat', 'all');
      host.classList.add('sympick');
      host.innerHTML = `<button class="cur" type="button">Loading markets…</button>
        <div class="drop"><div class="cats"></div><input type="text" placeholder="Search any market — BTC, EURUSD, Volatility 75…"><div class="items"></div></div>`;
      this.btn = host.querySelector('.cur'); this.inp = host.querySelector('input'); this.box = host.querySelector('.items'); this.catBox = host.querySelector('.cats');
      this.btn.onclick = () => { host.classList.toggle('open'); if (host.classList.contains('open')) { this.inp.value = ''; this.render(); this.inp.focus(); } };
      this.inp.oninput = () => this.render();
      this.inp.onkeydown = e => { if (e.key === 'Enter') { const f = this.box.querySelector('.it'); if (f) f.click(); } if (e.key === 'Escape') host.classList.remove('open'); };
      document.addEventListener('click', e => { if (!host.contains(e.target)) host.classList.remove('open'); });
    }
    setList(list, cur) {
      this.list = list;
      const have = new Set(list.map(s => s.cat));
      this.catBox.innerHTML = [['all', 'All']].concat(CATS.filter(([k]) => have.has(k))).map(([k, n]) => `<button type="button" data-c="${k}" class="${k === this.cat ? 'on' : ''}">${n}</button>`).join('');
      this.catBox.querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); this.cat = b.dataset.c; GT.store.set('gt_pick_cat', this.cat); this.catBox.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); this.render(); this.inp.focus(); });
      this.set(cur);
    }
    set(sym) {
      this.cur = this.list.find(s => s.symbol === sym) || this.cur || this.list[0];
      if (this.cur) this.btn.innerHTML = `<span class="src ${this.cur.src}">${this.cur.src === 'binance' ? 'Binance' : 'Deriv'}</span>${GT.esc(this.cur.display_name)}${this.cur.exchange_is_open ? '' : ' <small>(closed)</small>'} ▾`;
    }
    render() {
      const q = this.inp.value.trim().toLowerCase(), words = q.split(/\s+/).filter(Boolean).map(w => w.replace(/\//g, ''));
      const hay = s => (s.display_name + ' ' + s.symbol + ' ' + s.display_name.replace(/[\s/]/g, '') + ' ' + s.group).toLowerCase();
      let f = this.list.filter(s => q ? words.every(w => hay(s).includes(w)) : (this.cat === 'all' || s.cat === this.cat));
      if (!q && this.cat === 'all') f = f.filter(s => s.group !== 'All USDT pairs');
      const MAX = 400; const more = f.length > MAX; f = f.slice(0, MAX);
      this.box.innerHTML = groupSymbols(f).map(g => `<div class="grp">${GT.esc(g.name)}</div>` + g.items.map(s =>
        `<div class="it ${s.exchange_is_open ? '' : 'closed'} ${this.cur && s.symbol === this.cur.symbol ? 'on' : ''}" data-s="${GT.esc(s.symbol)}">
          <span>${GT.esc(s.display_name)}</span><small>${s.exchange_is_open ? '' : 'closed'}</small></div>`).join('')).join('')
        + (more ? '<div class="grp">Type to search more…</div>' : '')
        || '<div class="grp">No market found</div>';
      this.box.querySelectorAll('.it').forEach(el => el.onclick = () => {
        this.host.classList.remove('open'); this.set(el.dataset.s); this.onPick(this.cur);
      });
    }
  }

  /* ======================= live candle chart =======================
     new LiveChart({key, container, picker, tfBox, status, gran, symbol, onMessage, onCandles, onTick})
       onCandles(candles, isNewBar, first) - after history and every update
       onTick(price, time)                 - every price update          */
  const TF = [['1m', 60], ['5m', 300], ['15m', 900], ['30m', 1800], ['1h', 3600], ['4h', 14400], ['1d', 86400]];
  class LiveChart {
    constructor(o) {
      this.o = o; this.candles = []; this.sym = null; this.meta = null; this.gran = o.gran || 60;
      this.stop = null; this.digits = 4; this.seq = 0; this.symbols = [];
      const c = o.container;
      this.chart = LightweightCharts.createChart(c, {
        width: c.clientWidth, height: c.clientHeight,
        layout: { background: { color: '#05080f' }, textColor: '#cfd8e6', fontSize: 11 },
        grid: { vertLines: { color: '#0f1726' }, horzLines: { color: '#0f1726' } },
        timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#1f2b3f', rightOffset: 6 },
        rightPriceScale: { borderColor: '#1f2b3f' }, crosshair: { mode: 0 }
      });
      this.series = this.chart.addCandlestickSeries({ upColor: '#29d67c', downColor: '#ff5b6a', wickUpColor: '#29d67c', wickDownColor: '#ff5b6a', borderVisible: false });
      new ResizeObserver(() => this.chart.applyOptions({ width: c.clientWidth, height: c.clientHeight })).observe(c);
      if (o.tfBox) {
        o.tfBox.classList.add('seg');
        o.tfBox.innerHTML = TF.map(([k, s]) => `<button type="button" data-s="${s}" class="${s === this.gran ? 'on' : ''}">${k}</button>`).join('');
        o.tfBox.querySelectorAll('button').forEach(b => b.onclick = () => this.setTf(+b.dataset.s));
      }
      this.picker = o.picker ? new SymbolPicker(o.picker, s => { GT.store.set('gt_sym_' + (o.key || ''), s.symbol); this.load(s.symbol); }) : null;
      deriv.on(() => this._status());
    }
    setTf(g) {
      this.gran = g; if (this.o.tfBox) this.o.tfBox.querySelectorAll('button').forEach(x => x.classList.toggle('on', +x.dataset.s === g));
      GT.store.set('gt_tf_' + (this.o.key || ''), g); this.load();
    }
    _status(live) {
      const el = this.o.status; if (!el) return;
      if (live !== undefined) this._live = live;
      const bn = this.meta && this.meta.src === 'binance';
      const s = bn ? (this._live === false ? 'bad' : this._live ? 'connected' : 'connecting') : deriv.status;
      el.className = 'status ' + (s === 'connected' ? 'ok' : s === 'connecting' ? '' : 'bad');
      el.innerHTML = '<span class="dot"></span>' + (s === 'connected' ? 'LIVE · ' + (bn ? 'Binance' : 'Deriv') : s === 'connecting' ? 'Connecting…' : 'Offline');
    }
    async start() {
      const saved = GT.store.get('gt_tf_' + (this.o.key || ''), null);
      if (saved && TF.some(t => t[1] === saved)) { this.gran = saved; this.o.tfBox && this.o.tfBox.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.s === saved)); }
      this._status();
      const r = await Feed.symbols();
      this.symbols = r.list;
      if (!r.derivOk && !r.binanceOk) { this._msg('Cannot reach the price feeds (Deriv and Binance). An ad-blocker, antivirus web shield or your network may be blocking them.', 'red'); }
      else if (!r.derivOk) this._msg('Deriv prices could not load right now — crypto from Binance still works. Retrying in the background.', 'gold');
      const want = GT.qs('symbol') || GT.store.get('gt_sym_' + (this.o.key || ''), null) || this.o.symbol;
      const pick = r.list.find(s => s.symbol === want) || r.list.find(s => s.symbol === (r.binanceOk ? 'BTCUSDT' : '1HZ100V')) || r.list.find(s => s.exchange_is_open) || r.list[0];
      if (!pick) return;
      if (this.picker) this.picker.setList(r.list, pick.symbol);
      await this.load(pick.symbol);
    }
    _msg(t, kind) { if (this.o.onMessage) this.o.onMessage(t, kind); }
    async load(sym) {
      if (sym) this.sym = sym;
      const seq = ++this.seq;
      if (this.stop) { try { this.stop(); } catch (e) { } this.stop = null; }
      const meta = this.symbols.find(s => s.symbol === this.sym) || { symbol: this.sym, src: /USDT$/.test(this.sym) ? 'binance' : 'deriv', display_name: this.sym, pip: 0.01, exchange_is_open: 1 };
      this.meta = meta; this.digits = digitsOf(meta);
      if (this.picker) this.picker.set(meta.symbol);
      this.series.applyOptions({ priceFormat: { type: 'price', precision: this.digits, minMove: Math.pow(10, -this.digits) } });
      if (!meta.exchange_is_open) this._msg(`${meta.display_name} is closed right now — showing its last session. Crypto and synthetic indices trade 24/7.`, 'gold');
      else this._msg('');
      this._status(meta.src === 'binance' ? undefined : undefined);
      try {
        const stop = await Feed.stream(meta, this.gran, 500, (candles) => {
          if (seq !== this.seq) return;
          if (meta.src === 'binance') this._status(true);
          this.candles = candles;
          if (candles.length && candles[candles.length - 1].close) {
            // re-check digits from the real price for crypto
            if (meta.src === 'binance') { meta.pip = pipFromPrice(candles[candles.length - 1].close); this.digits = digitsOf(meta); this.series.applyOptions({ priceFormat: { type: 'price', precision: this.digits, minMove: Math.pow(10, -this.digits) } }); }
          }
          this.series.setData(candles);
          this.chart.timeScale().scrollToRealTime();
          if (this.o.onCandles) this.o.onCandles(this.candles, true, true);
        }, (c, t) => {
          if (seq !== this.seq) return;
          const last = this.candles[this.candles.length - 1];
          let isNew = false;
          if (last && last.time === c.time) this.candles[this.candles.length - 1] = c;
          else if (!last || c.time > last.time) { this.candles.push(c); if (this.candles.length > 1500) this.candles.shift(); isNew = true; }
          else return;
          this.series.update(c);
          if (this.o.onTick) this.o.onTick(c.close, t);
          if (this.o.onCandles) this.o.onCandles(this.candles, isNew);
        });
        if (seq !== this.seq) { stop(); return; }
        this.stop = stop;
      } catch (e) {
        if (seq !== this.seq) return;
        if (meta.src === 'binance') this._status(false);
        this._msg((meta.src === 'binance' ? 'Binance' : 'Deriv') + ' did not send prices for ' + meta.display_name + ': ' + e.message, 'red');
      }
    }
    setLog(on) { this.chart.priceScale('right').applyOptions({ mode: on ? 1 : 0, autoScale: true }); }
    fit() { this.chart.priceScale('right').applyOptions({ autoScale: true }); this.chart.timeScale().fitContent(); this.chart.timeScale().scrollToRealTime(); }
    price() { const c = this.candles[this.candles.length - 1]; return c ? c.close : null; }
    fmt(v) { return v == null ? '—' : Number(v).toFixed(this.digits); }
  }

  window.DerivAPI = DerivAPI;
  window.GTFeed = Feed;
  window.GTMarket = { groupSymbols, digitsOf, SymbolPicker, LiveChart, TF, CATS, pipFromPrice };
})();
