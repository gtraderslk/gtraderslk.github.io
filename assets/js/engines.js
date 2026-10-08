/* ============================================================
   G TRADERS — signal engines: settings from the control panel and engines written as code
   Loaded after indicators.js and the strategies on the Signals page and in the control panel.
   A custom engine is the body of   detect(c, I, P)
     c = candles [{ time, open, high, low, close }]  (oldest first)
     I = indicators: ema(c,n) sma(c,n) rsi(c,n) atr(c,n) bollinger(c,n,k) highest(c,i,n) lowest(c,i,n) macd(c)
     P = the engine's settings (JSON in the control panel)
   and returns signals: [{ index, signal: 'BUY' | 'SELL', entry, sl, tp, reason }]
   ============================================================ */
(function () {
  const ORIG = {};
  const BUILT = {
    smc: { obj: () => window.SMCStrategy, label: 'SMC', about: 'Break of structure / change of character, order blocks and fair value gaps.' },
    gtm: { obj: () => window.GTMStrategy, label: 'GTM', about: 'Trend break above / below the last candles with EMA, RSI and MACD confirmations.' },
    multi: { obj: () => window.MultiConfirmStrategy, label: 'Multi', about: 'Fires when 2 of the 4 engines agree (uses their settings).' },
    ema: { obj: () => window.EMACrossStrategy, label: 'EMA cross', about: 'Fast EMA crossing the slow EMA, filtered with RSI.' },
    bb: { obj: () => window.BollingerStrategy, label: 'Bollinger', about: 'Price leaving and coming back into the Bollinger bands, filtered with RSI.' }
  };
  Object.keys(BUILT).forEach(k => { const o = BUILT[k].obj(); if (o) { ORIG[k] = Object.assign({}, o.defaults || {}); BUILT[k].defaults = ORIG[k]; } });
  GT.SIGNAL_ENGINES = BUILT;

  // indicator helpers given to custom code
  const I = {
    ema: (c, n) => Indicators.ema(c, n), sma: (c, n) => Indicators.sma(c, n), rsi: (c, n) => Indicators.rsi(c, n || 14),
    bollinger: (c, n, k) => Indicators.bollinger(c, n || 20, k || 2),
    atr(c, n) { n = n || 14; const out = new Array(c.length).fill(null); let a = null;
      for (let i = 1; i < c.length; i++) { const tr = Math.max(c[i].high - c[i].low, Math.abs(c[i].high - c[i - 1].close), Math.abs(c[i].low - c[i - 1].close)); a = a == null ? tr : (a * (n - 1) + tr) / n; if (i >= n) out[i] = a; }
      return out; },
    highest: (c, i, n) => { let h = -Infinity; for (let j = Math.max(0, i - n); j < i; j++) h = Math.max(h, c[j].high); return h; },
    lowest: (c, i, n) => { let l = Infinity; for (let j = Math.max(0, i - n); j < i; j++) l = Math.min(l, c[j].low); return l; },
    macd(c, f, s, g) { f = f || 12; s = s || 26; g = g || 9; const a = Indicators.ema(c, f), b = Indicators.ema(c, s);
      const m = c.map((_, i) => a[i] != null && b[i] != null ? a[i] - b[i] : null), sig = new Array(c.length).fill(null), k = 2 / (g + 1); let e = null, n = 0;
      for (let i = 0; i < c.length; i++) { if (m[i] == null) continue; e = e == null ? m[i] : m[i] * k + e * (1 - k); if (++n >= g) sig[i] = e; }
      return { macd: m, signal: sig, hist: m.map((v, i) => v != null && sig[i] != null ? v - sig[i] : null) }; }
  };
  GT.ENGINE_INDICATORS = I;

  GT.ENGINE_TEMPLATE = `// Example: EMA cross with a 2 : 1 target. Change it as you like.
const fast = I.ema(c, P.fast || 9), slow = I.ema(c, P.slow || 21), atr = I.atr(c, 14);
const out = [];
for (let i = 2; i < c.length; i++) {
  if (fast[i] == null || slow[i] == null || atr[i] == null) continue;
  const x = c[i];
  if (fast[i - 1] <= slow[i - 1] && fast[i] > slow[i]) {
    const sl = x.close - atr[i] * 1.5;
    out.push({ index: i, signal: 'BUY', entry: x.close, sl, tp: x.close + (x.close - sl) * 2, reason: 'EMA ' + (P.fast || 9) + ' crossed up' });
  }
  if (fast[i - 1] >= slow[i - 1] && fast[i] < slow[i]) {
    const sl = x.close + atr[i] * 1.5;
    out.push({ index: i, signal: 'SELL', entry: x.close, sl, tp: x.close - (sl - x.close) * 2, reason: 'EMA ' + (P.fast || 9) + ' crossed down' });
  }
}
return out;`;

  // turn saved code into an engine the Signals page can use
  GT.compileEngine = (c) => {
    let fn;
    try { fn = new Function('c', 'I', 'P', '"use strict";\n' + String(c.code || '')); } catch (e) { throw new Error('The code has a mistake: ' + e.message); }
    const params = c.params || {};
    return {
      name: c.name || 'Custom engine', short: c.short || 'Custom', defaults: params, custom: true,
      detect(candles, opts) {
        let r;
        try { r = fn(candles, I, Object.assign({}, params, opts || {})); } catch (e) { if (!this._warned) { this._warned = true; console.warn('[G TRADERS] engine', c.name, e); } return []; }
        if (!Array.isArray(r)) return [];
        return r.filter(s => s && Number.isInteger(s.index) && s.index >= 0 && s.index < candles.length && (s.signal === 'BUY' || s.signal === 'SELL'))
          .map(s => {
            const x = candles[s.index], entry = +s.entry || x.close;
            let sl = +s.sl, tp = +s.tp; const r1 = Math.abs(entry - sl);
            if (!isFinite(sl) || !r1) sl = s.signal === 'BUY' ? entry * 0.995 : entry * 1.005;
            if (!isFinite(tp)) tp = s.signal === 'BUY' ? entry + Math.abs(entry - sl) * 2 : entry - Math.abs(entry - sl) * 2;
            return { index: s.index, time: x.time, signal: s.signal, entry, sl, tp, strength: +s.strength || 3, reason: String(s.reason || c.name).slice(0, 160) };
          });
      },
      lines() { return []; }
    };
  };
  // run the code on 600 made-up candles (control panel "Test" button)
  GT.testEngine = (c) => {
    try {
      const e = GT.compileEngine(c), cs = []; let p = 100, t = Math.floor(Date.now() / 1000) - 600 * 300;
      for (let i = 0; i < 600; i++) { const o = p; p = Math.max(1, p + (Math.sin(i / 25) * 0.4 + (Math.random() - .5) * 1.2)); cs.push({ time: t + i * 300, open: o, close: p, high: Math.max(o, p) + Math.random() * .4, low: Math.min(o, p) - Math.random() * .4 }); }
      const fn = new Function('c', 'I', 'P', '"use strict";\n' + String(c.code || ''));
      const t0 = performance.now(); const raw = fn(cs, I, c.params || {}); const ms = Math.round(performance.now() - t0);
      if (!Array.isArray(raw)) return { error: 'The code must return a list, e.g. return out;' };
      const s = e.detect(cs);
      if (raw.length && !s.length) return { error: 'The signals need index (candle number) and signal: "BUY" or "SELL".' };
      if (ms > 1500) return { error: 'The code is too slow (' + ms + ' ms). Make it simpler.' };
      return { count: s.length, buy: s.filter(x => x.signal === 'BUY').length, sell: s.filter(x => x.signal === 'SELL').length, ms };
    } catch (e) { return { error: e.message }; }
  };

  // settings from the control panel -> the engines on this page
  GT.signalEngines = () => {
    const E = (GT.site().engines) || {}, map = {}, order = [];
    Object.keys(BUILT).forEach(k => {
      const o = BUILT[k].obj(); if (!o) return;
      const set = E[k] || {};
      o.defaults = Object.assign({}, ORIG[k], set.params || {});
      map[k] = o;
      order.push({ key: k, label: set.label || BUILT[k].label, hidden: !!set.hidden, main: ['smc', 'gtm', 'multi'].includes(k) });
    });
    (E.custom || []).forEach(c => {
      if (c.on === false || !c.key) return;
      try { map[c.key] = GT.compileEngine(c); order.push({ key: c.key, label: c.short || c.name, hidden: false, main: !!c.main, custom: true }); } catch (e) { console.warn('[G TRADERS] engine', c.name, e.message); }
    });
    return { map, order };
  };
})();
