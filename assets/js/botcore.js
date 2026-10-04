/* ============================================================
   G TRADERS — bot core for the Studio web editor
   One bot model, used by all three editing modes:
     - evaluated on candles (quick test + live run on the $10k demo)
     - saved as a .gtmbot file that GTM EA Bot Studio opens
     - written out as a stand-alone MetaTrader 5 Expert Advisor (.mq5)
   ============================================================ */
(function () {
  const BC = window.BotCore = {};

  /* ---------------- the model ---------------- */
  BC.TF_LIST = ['chart', 'M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'];
  BC.newBot = () => ({
    v: 1, name: 'My bot', tf: 0,
    buy: [], sell: [],
    filters: { spread: 3, session: { on: false, h1: 8, m1: 0, h2: 17, m2: 0 }, days: -1, maxOpen: 1, gap: 0 },
    closeOpposite: true,
    trade: { lotMode: 1, lot: 0.01, risk: 1, slMode: 2, sl: 1.5, tpMode: 2, tp: 2 },
    manage: { be: 1, trail: 0 },
    safety: { dayLoss: 3, maxDay: 6 }
  });

  // value kinds: name, fields, defaults
  BC.VALS = {
    ma: { label: 'Moving average', d: { m: 1, n: 20, src: 0, sh: 1 } },
    rsi: { label: 'RSI', d: { n: 14, sh: 1 } },
    macd: { label: 'MACD', d: { line: 0, f: 12, s: 26, g: 9, sh: 1 } },
    stoch: { label: 'Stochastic', d: { line: 0, kp: 5, d: 3, sl: 3, sh: 1 } },
    bb: { label: 'Bollinger band', d: { band: 0, n: 20, dev: 2, sh: 1 } },
    atr: { label: 'ATR', d: { n: 14, sh: 1 } },
    cci: { label: 'CCI', d: { n: 14, sh: 1 } },
    adx: { label: 'ADX', d: { line: 0, n: 14, sh: 1 } },
    price: { label: 'Candle price', d: { w: 0, sh: 1 } },
    hl: { label: 'Highest / lowest', d: { w: 0, n: 20, sh: 1 } },
    num: { label: 'Number', d: { v: 50 } }
  };
  BC.MA_M = ['SMA', 'EMA', 'SMMA', 'LWMA'];
  BC.SRC = ['close', 'open', 'high', 'low', 'median', 'typical'];
  BC.MACD_L = ['main', 'signal', 'histogram'];
  BC.STO_L = ['%K', '%D'];
  BC.BB_L = ['upper', 'middle', 'lower'];
  BC.ADX_L = ['ADX', '+DI', '-DI'];
  BC.PRICE_W = ['close', 'open', 'high', 'low'];
  BC.HL_W = ['highest high', 'lowest low'];
  BC.OPS = ['>', '<', '>=', '<=', '='];
  BC.CANDLE = ['bullish', 'bearish', 'a doji'];
  BC.PATTERN = ['bullish engulfing', 'bearish engulfing', 'hammer', 'shooting star', 'inside bar', 'outside bar'];
  BC.CONDS = {
    cross: { label: 'Crosses', d: () => ({ t: 'cross', a: BC.val('ma', { n: 9 }), dir: 0, b: BC.val('ma', { n: 21 }) }) },
    cmp: { label: 'Compare', d: () => ({ t: 'cmp', a: BC.val('rsi'), op: 0, b: BC.val('num', { v: 50 }) }) },
    candle: { label: 'Candle colour', d: () => ({ t: 'candle', kind: 0, sh: 1 }) },
    pattern: { label: 'Candle pattern', d: () => ({ t: 'pattern', kind: 0, sh: 1 }) },
    trend: { label: 'Rising / falling', d: () => ({ t: 'trend', a: BC.val('ma', { n: 50 }), dir: 0, n: 3 }) }
  };
  BC.val = (k, o) => Object.assign({ k }, BC.VALS[k].d, o || {});
  BC.clone = o => JSON.parse(JSON.stringify(o));

  BC.valText = v => {
    if (!v) return '?';
    const sh = v.sh != null && v.sh !== 1 ? ` [${v.sh}]` : '';
    switch (v.k) {
      case 'ma': return `${BC.MA_M[v.m]} ${v.n}${v.src ? ' ' + BC.SRC[v.src] : ''}${sh}`;
      case 'rsi': return `RSI ${v.n}${sh}`;
      case 'macd': return `MACD ${BC.MACD_L[v.line]}${v.f !== 12 || v.s !== 26 || v.g !== 9 ? ` ${v.f},${v.s},${v.g}` : ''}${sh}`;
      case 'stoch': return `Stoch ${BC.STO_L[v.line]} ${v.kp},${v.d},${v.sl}${sh}`;
      case 'bb': return `BB ${BC.BB_L[v.band]} ${v.n}${v.dev !== 2 ? ' dev ' + v.dev : ''}${sh}`;
      case 'atr': return `ATR ${v.n}${sh}`;
      case 'cci': return `CCI ${v.n}${sh}`;
      case 'adx': return `${BC.ADX_L[v.line]} ${v.n}${sh}`;
      case 'price': return `${BC.PRICE_W[v.w]} [${v.sh}]`;
      case 'hl': return `${BC.HL_W[v.w]} of ${v.n}${sh}`;
      case 'num': return String(v.v);
    }
    return v.k;
  };
  BC.condText = c => {
    switch (c.t) {
      case 'cross': return `${BC.valText(c.a)} crosses ${c.dir ? 'below' : 'above'} ${BC.valText(c.b)}`;
      case 'cmp': return `${BC.valText(c.a)} ${BC.OPS[c.op]} ${BC.valText(c.b)}`;
      case 'candle': return `candle [${c.sh}] is ${BC.CANDLE[c.kind]}`;
      case 'pattern': return `${BC.PATTERN[c.kind]} at [${c.sh}]`;
      case 'trend': return `${BC.valText(c.a)} is ${c.dir ? 'falling' : 'rising'} for ${c.n} candles`;
    }
    return c.t;
  };

  // BUY rule -> the matching SELL rule
  BC.mirrorVal = v => {
    v = BC.clone(v);
    if (v.k === 'bb') v.band = v.band === 0 ? 2 : v.band === 2 ? 0 : 1;
    if (v.k === 'hl') v.w = 1 - v.w;
    if (v.k === 'price') v.w = v.w === 2 ? 3 : v.w === 3 ? 2 : v.w;
    if (v.k === 'adx' && v.line) v.line = v.line === 1 ? 2 : 1;
    return v;
  };
  BC.mirrorNum = (num, other) => {
    // RSI / stochastic around 50, CCI / MACD around 0
    if (!other) return num;
    const k = other.k;
    if (k === 'rsi' || k === 'stoch') return { k: 'num', v: 100 - num.v };
    if (k === 'cci' || k === 'macd') return { k: 'num', v: -num.v };
    return num;
  };
  BC.mirror = c => {
    c = BC.clone(c);
    if (c.t === 'cross') { c.dir = 1 - c.dir; c.a = BC.mirrorVal(c.a); c.b = c.b.k === 'num' ? BC.mirrorNum(c.b, c.a) : BC.mirrorVal(c.b); }
    if (c.t === 'cmp') { c.op = [1, 0, 3, 2, 4][c.op]; c.a = BC.mirrorVal(c.a); c.b = c.b.k === 'num' ? BC.mirrorNum(c.b, c.a) : BC.mirrorVal(c.b); }
    if (c.t === 'candle' && c.kind < 2) c.kind = 1 - c.kind;
    if (c.t === 'pattern' && c.kind < 4) c.kind = c.kind ^ 1;
    if (c.t === 'trend') c.dir = 1 - c.dir;
    return c;
  };

  /* ---------------- ready templates (same ideas as the Studio) ---------------- */
  const V = BC.val;
  BC.TEMPLATES = {
    macross: { name: 'MA cross + RSI', info: 'Trend: EMA 9 crosses EMA 21, RSI agrees. Risk 1%, stop 1.5 x ATR, target 2 R.',
      buy: [{ t: 'cross', a: V('ma', { n: 9 }), dir: 0, b: V('ma', { n: 21 }) }, { t: 'cmp', a: V('rsi'), op: 0, b: V('num', { v: 50 }) }] },
    rsirev: { name: 'RSI reversal', info: 'Range: RSI turns back up from 30 or down from 70.',
      buy: [{ t: 'cross', a: V('rsi'), dir: 0, b: V('num', { v: 30 }) }], tp: 1.5 },
    bbounce: { name: 'Bollinger bounce', info: 'Range: price closes outside a band while RSI is stretched.',
      buy: [{ t: 'cmp', a: V('price'), op: 1, b: V('bb', { band: 2 }) }, { t: 'cmp', a: V('rsi'), op: 1, b: V('num', { v: 35 }) }], tp: 1.5 },
    macd: { name: 'MACD trend', info: 'Trend: MACD crosses its signal on the side of the 200 EMA.',
      buy: [{ t: 'cross', a: V('macd', { line: 0 }), dir: 0, b: V('macd', { line: 1 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: 200 }) }] },
    stoch: { name: 'Stochastic pullback', info: 'Trend: Stochastic turns from an extreme in the direction of the 100 EMA.',
      buy: [{ t: 'cross', a: V('stoch', { line: 0 }), dir: 0, b: V('stoch', { line: 1 }) }, { t: 'cmp', a: V('stoch', { line: 0 }), op: 1, b: V('num', { v: 30 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: 100 }) }] },
    hhhl: { name: 'HH / HL trend', info: 'Trend: a higher high and a higher low = BUY, a lower high and a lower low = SELL. Stop 1.5 x ATR, target 2 R.',
      buy: [{ t: 'cmp', a: V('price', { w: 2, sh: 1 }), op: 0, b: V('price', { w: 2, sh: 2 }) }, { t: 'cmp', a: V('price', { w: 3, sh: 1 }), op: 0, b: V('price', { w: 3, sh: 2 }) }],
      sell: [{ t: 'cmp', a: V('price', { w: 2, sh: 1 }), op: 1, b: V('price', { w: 2, sh: 2 }) }, { t: 'cmp', a: V('price', { w: 3, sh: 1 }), op: 1, b: V('price', { w: 3, sh: 2 }) }] },
    breakout: { name: '20-candle breakout', info: 'Breakout: the close breaks the highest high (or lowest low) of the 20 candles before, above the 50 EMA.',
      buy: [{ t: 'cmp', a: V('price'), op: 0, b: V('hl', { w: 0, n: 20, sh: 2 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: 50 }) }] },
    gtm: { name: 'GTM trend break', info: 'Our signal engine as a bot: EMA 9 > 21, above EMA 50, breaks the 10-candle high, RSI over 50.',
      buy: [{ t: 'cmp', a: V('ma', { n: 9 }), op: 0, b: V('ma', { n: 21 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: 50 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('hl', { w: 0, n: 10, sh: 2 }) }, { t: 'cmp', a: V('rsi'), op: 0, b: V('num', { v: 50 }) }] }
  };
  BC.fromTemplate = k => {
    const t = BC.TEMPLATES[k], b = BC.newBot();
    b.name = t.name; b.buy = BC.clone(t.buy); b.sell = t.sell ? BC.clone(t.sell) : t.buy.map(BC.mirror);
    if (t.tp) b.trade.tp = t.tp;
    return b;
  };

  /* ---------------- indicators on candles ---------------- */
  const srcOf = (c, s) => c.map(k => s === 1 ? k.open : s === 2 ? k.high : s === 3 ? k.low : s === 4 ? (k.high + k.low) / 2 : s === 5 ? (k.high + k.low + k.close) / 3 : k.close);
  function sma(x, n) { const o = new Array(x.length).fill(null); let s = 0; for (let i = 0; i < x.length; i++) { s += x[i]; if (i >= n) s -= x[i - n]; if (i >= n - 1) o[i] = s / n; } return o; }
  function ema(x, n) { const o = new Array(x.length).fill(null), k = 2 / (n + 1); let e = null; for (let i = 0; i < x.length; i++) { if (i < n - 1) continue; if (e == null) { let s = 0; for (let j = i - n + 1; j <= i; j++) s += x[j]; e = s / n; } else e = x[i] * k + e * (1 - k); o[i] = e; } return o; }
  function smma(x, n) { const o = new Array(x.length).fill(null); let e = null; for (let i = 0; i < x.length; i++) { if (i < n - 1) continue; if (e == null) { let s = 0; for (let j = i - n + 1; j <= i; j++) s += x[j]; e = s / n; } else e = (e * (n - 1) + x[i]) / n; o[i] = e; } return o; }
  function lwma(x, n) { const o = new Array(x.length).fill(null), w = n * (n + 1) / 2; for (let i = n - 1; i < x.length; i++) { let s = 0; for (let j = 0; j < n; j++) s += x[i - j] * (n - j); o[i] = s / w; } return o; }
  const MA = [sma, ema, smma, lwma];
  function wilder(x, n) { return smma(x, n); }
  function rsi(c, n) {
    const o = new Array(c.length).fill(null); if (c.length <= n) return o;
    let g = 0, l = 0;
    for (let i = 1; i <= n; i++) { const d = c[i].close - c[i - 1].close; d > 0 ? g += d : l -= d; }
    g /= n; l /= n; o[n] = l === 0 ? 100 : 100 - 100 / (1 + g / l);
    for (let i = n + 1; i < c.length; i++) { const d = c[i].close - c[i - 1].close; g = (g * (n - 1) + Math.max(d, 0)) / n; l = (l * (n - 1) + Math.max(-d, 0)) / n; o[i] = l === 0 ? 100 : 100 - 100 / (1 + g / l); }
    return o;
  }
  function tr(c) { return c.map((k, i) => i ? Math.max(k.high - k.low, Math.abs(k.high - c[i - 1].close), Math.abs(k.low - c[i - 1].close)) : k.high - k.low); }
  function stdev(x, n, m) { return x.map((_, i) => { if (m[i] == null) return null; let s = 0; for (let j = i - n + 1; j <= i; j++) s += (x[j] - m[i]) ** 2; return Math.sqrt(s / n); }); }
  function series(c, v) {
    const cl = c.map(k => k.close);
    switch (v.k) {
      case 'ma': return MA[v.m](srcOf(c, v.src), v.n);
      case 'rsi': return rsi(c, v.n);
      case 'macd': {
        const f = ema(cl, v.f), s = ema(cl, v.s), m = cl.map((_, i) => f[i] != null && s[i] != null ? f[i] - s[i] : null);
        const first = m.findIndex(x => x != null), sig = new Array(c.length).fill(null);
        if (first >= 0) { const tail = sma(m.slice(first), v.g); tail.forEach((x, i) => sig[first + i] = x); }   // MT5 uses an SMA of the MACD for the signal
        if (v.line === 0) return m; if (v.line === 1) return sig;
        return m.map((x, i) => x != null && sig[i] != null ? x - sig[i] : null);
      }
      case 'stoch': {
        const k = c.map((_, i) => { if (i < v.kp - 1) return null; let hh = -Infinity, ll = Infinity; for (let j = i - v.kp + 1; j <= i; j++) { hh = Math.max(hh, c[j].high); ll = Math.min(ll, c[j].low); } return [c[i].close - ll, hh - ll]; });
        const num = k.map(x => x ? x[0] : 0), den = k.map(x => x ? x[1] : 0), sn = sma(num, v.sl), sd = sma(den, v.sl);
        const K = c.map((_, i) => k[i] && sn[i] != null && i >= v.kp - 1 + v.sl - 1 ? (sd[i] ? sn[i] / sd[i] * 100 : 100) : null);
        if (v.line === 0) return K;
        const first = K.findIndex(x => x != null), D = new Array(c.length).fill(null);
        if (first >= 0) sma(K.slice(first), v.d).forEach((x, i) => D[first + i] = x);
        return D;
      }
      case 'bb': { const m = sma(cl, v.n), sd = stdev(cl, v.n, m); return m.map((x, i) => x == null ? null : v.band === 0 ? x + v.dev * sd[i] : v.band === 2 ? x - v.dev * sd[i] : x); }
      case 'atr': return sma(tr(c), v.n);
      case 'cci': {
        const tp = srcOf(c, 5), m = sma(tp, v.n);
        return tp.map((x, i) => { if (m[i] == null) return null; let d = 0; for (let j = i - v.n + 1; j <= i; j++) d += Math.abs(tp[j] - m[i]); d /= v.n; return d ? (x - m[i]) / (0.015 * d) : 0; });
      }
      case 'adx': {
        const pdm = c.map((k, i) => { if (!i) return 0; const u = k.high - c[i - 1].high, d = c[i - 1].low - k.low; return u > d && u > 0 ? u : 0; });
        const ndm = c.map((k, i) => { if (!i) return 0; const u = k.high - c[i - 1].high, d = c[i - 1].low - k.low; return d > u && d > 0 ? d : 0; });
        const t = wilder(tr(c), v.n), p = wilder(pdm, v.n), nn = wilder(ndm, v.n);
        const pdi = t.map((x, i) => x ? 100 * p[i] / x : null), ndi = t.map((x, i) => x ? 100 * nn[i] / x : null);
        if (v.line === 1) return pdi; if (v.line === 2) return ndi;
        const dx = pdi.map((x, i) => x != null && ndi[i] != null && (x + ndi[i]) ? 100 * Math.abs(x - ndi[i]) / (x + ndi[i]) : 0);
        const first = pdi.findIndex(x => x != null), A = new Array(c.length).fill(null);
        if (first >= 0) wilder(dx.slice(first), v.n).forEach((x, i) => A[first + i] = x);
        return A;
      }
      case 'price': return srcOf(c, [0, 1, 2, 3][v.w]);
      case 'hl': return c.map((_, i) => { if (i < v.n - 1) return null; let r = v.w ? Infinity : -Infinity; for (let j = i - v.n + 1; j <= i; j++) r = v.w ? Math.min(r, c[j].low) : Math.max(r, c[j].high); return r; });
      case 'num': return null;
    }
    return null;
  }

  /* evaluator: ev = BC.evaluator(candles); ev.buy(bot, i) where i is the bar that just OPENED
     (shift 1 = bar i-1, the last closed candle) */
  BC.evaluator = function (c) {
    const cache = new Map();
    const get = (v, i, extra) => {
      if (v.k === 'num') return v.v;
      const key = JSON.stringify(v); let s = cache.get(key);
      if (!s) { s = series(c, v); cache.set(key, s); }
      const idx = i - (v.sh != null ? v.sh : 1) - (extra || 0);
      return s && idx >= 0 && idx < s.length ? s[idx] : null;
    };
    const bar = (i, sh) => c[i - sh];
    const cond = (k, i) => {
      if (k.t === 'cross') {
        const a1 = get(k.a, i), b1 = get(k.b, i), a2 = get(k.a, i, 1), b2 = get(k.b, i, 1);
        if ([a1, b1, a2, b2].some(x => x == null)) return false;
        return k.dir ? (a1 < b1 && a2 >= b2) : (a1 > b1 && a2 <= b2);
      }
      if (k.t === 'cmp') {
        const a = get(k.a, i), b = get(k.b, i); if (a == null || b == null) return false;
        return [a > b, a < b, a >= b, a <= b, Math.abs(a - b) < 1e-12][k.op];
      }
      if (k.t === 'candle') {
        const x = bar(i, k.sh); if (!x) return false;
        return k.kind === 0 ? x.close > x.open : k.kind === 1 ? x.close < x.open : Math.abs(x.close - x.open) <= 0.1 * (x.high - x.low);
      }
      if (k.t === 'pattern') {
        const a = bar(i, k.sh), b = bar(i, k.sh + 1); if (!a || !b) return false;
        const body = Math.abs(a.close - a.open), up = a.high - Math.max(a.open, a.close), dn = Math.min(a.open, a.close) - a.low;
        switch (k.kind) {
          case 0: return a.close > a.open && b.close < b.open && a.close >= b.open && a.open <= b.close;
          case 1: return a.close < a.open && b.close > b.open && a.close <= b.open && a.open >= b.close;
          case 2: return body > 0 && dn >= 2 * body && up <= body;
          case 3: return body > 0 && up >= 2 * body && dn <= body;
          case 4: return a.high < b.high && a.low > b.low;
          case 5: return a.high > b.high && a.low < b.low;
        }
      }
      if (k.t === 'trend') {
        for (let j = 0; j < k.n; j++) { const x = get(k.a, i, j), y = get(k.a, i, j + 1); if (x == null || y == null) return false; if (k.dir ? !(x < y) : !(x > y)) return false; }
        return true;
      }
      return false;
    };
    return {
      buy: (bot, i) => bot.buy.length > 0 && bot.buy.every(k => cond(k, i)),
      sell: (bot, i) => bot.sell.length > 0 && bot.sell.every(k => cond(k, i)),
      atr: i => get({ k: 'atr', n: 14, sh: 1 }, i)
    };
  };

  // stop and target for an entry
  BC.levels = (bot, dir, entry, atr, pip) => {
    const t = bot.trade, s = dir === 'BUY' ? 1 : -1;
    let slD = t.slMode === 1 ? t.sl * pip : t.slMode === 2 ? t.sl * (atr || 0) : 0;
    let tpD = t.tpMode === 1 ? t.tp * pip : t.tpMode === 2 ? t.tp * slD : t.tpMode === 3 ? t.tp * (atr || 0) : 0;
    return { sl: slD > 0 ? entry - s * slD : 0, tp: tpD > 0 ? entry + s * tpD : 0, slD, tpD };
  };
  BC.pipOf = (price, digits) => {
    // forex style: 5/3 digits -> 10 points; otherwise one point
    const pt = Math.pow(10, -digits);
    return (digits === 5 || digits === 3) ? pt * 10 : pt;
  };

  /* ---------------- quick test ----------------
     candles: closed + forming bars. Entries at the open of the next bar, stops / targets
     inside the bar (stop first when both are hit), no spread. Returns trades + stats. */
  BC.backtest = function (bot, c, opt) {
    opt = Object.assign({ balance: 10000, digits: 5 }, opt || {});
    const ev = BC.evaluator(c), pip = BC.pipOf(c.length ? c[c.length - 1].close : 1, opt.digits);
    const riskPct = bot.trade.lotMode === 1 ? bot.trade.risk : 1;
    let bal = opt.balance, peak = bal, maxDD = 0, pos = [], trades = [], lastEntry = -999, curve = [];
    let day = null, dayStart = bal, dayTrades = 0, dayStop = false;
    const close = (p, px, i, why) => {
      const s = p.dir === 'BUY' ? 1 : -1, R = p.slD ? (px - p.entry) * s / p.slD : (px - p.entry) * s / (p.entry * 0.01);
      const money = R * p.riskMoney;
      bal += money; trades.push({ dir: p.dir, entry: p.entry, exit: px, t1: p.t, t2: c[i].time, R, money, why });
      pos = pos.filter(x => x !== p);
    };
    const inSession = t => {
      const f = bot.filters.session; if (!f.on) return true;
      const d = new Date(t * 1000), m = d.getUTCHours() * 60 + d.getUTCMinutes(), a = f.h1 * 60 + f.m1, b = f.h2 * 60 + f.m2;
      return a <= b ? (m >= a && m < b) : (m >= a || m < b);
    };
    const dayOk = t => {
      const dd = bot.filters.days; if (dd < 0) return true;
      const w = new Date(t * 1000).getUTCDay();
      return [[1, 2, 3, 4, 5], [1, 2, 3, 4], [2, 3, 4], [1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6]][dd].includes(w);
    };
    const warm = 60;
    for (let i = warm; i < c.length; i++) {
      const x = c[i];
      // a new day
      const dk = Math.floor(x.time / 86400);
      if (dk !== day) { day = dk; dayStart = bal; dayTrades = 0; dayStop = false; }
      // the bar opens: decisions on closed candles
      if (!dayStop && inSession(x.time) && dayOk(x.time)) {
        const b = ev.buy(bot, i), s = ev.sell(bot, i);
        for (const [sig, dir] of [[b, 'BUY'], [s, 'SELL']]) {
          if (!sig) continue;
          if (bot.closeOpposite) pos.filter(p => p.dir !== dir).forEach(p => close(p, x.open, i, 'Opposite signal'));
          if (pos.some(p => p.dir === dir)) continue;
          if (pos.length >= bot.filters.maxOpen) continue;
          if (bot.filters.gap && i - lastEntry < bot.filters.gap) continue;
          if (bot.safety.maxDay && dayTrades >= bot.safety.maxDay) continue;
          const atr = ev.atr(i), L = BC.levels(bot, dir, x.open, atr, pip);
          pos.push({ dir, entry: x.open, sl: L.sl, tp: L.tp, slD: L.slD, t: x.time, i, riskMoney: bal * riskPct / 100, be: false });
          lastEntry = i; dayTrades++;
        }
      }
      // inside the bar
      for (const p of pos.slice()) {
        const buy = p.dir === 'BUY';
        if (p.sl && (buy ? x.low <= p.sl : x.high >= p.sl)) { close(p, p.sl, i, p.be ? 'Breakeven' : 'Stop loss'); continue; }
        if (p.tp && (buy ? x.high >= p.tp : x.low <= p.tp)) { close(p, p.tp, i, 'Take profit'); continue; }
        // breakeven / trailing at the close of the bar
        if (bot.manage.be > 0 && p.slD && !p.be) {
          const fav = buy ? x.high - p.entry : p.entry - x.low;
          if (fav >= bot.manage.be * p.slD) { p.sl = p.entry + (buy ? 1 : -1) * pip; p.be = true; }
        }
        if (bot.manage.trail > 0) {
          const atr = ev.atr(i + 1) || 0, nsl = buy ? x.close - atr * bot.manage.trail : x.close + atr * bot.manage.trail;
          if (atr && (buy ? x.close - p.entry > 10 * pip && nsl > (p.sl || -Infinity) : p.entry - x.close > 10 * pip && nsl < (p.sl || Infinity))) p.sl = nsl;
        }
      }
      // daily loss stop
      if (bot.safety.dayLoss > 0 && !dayStop) {
        let open = 0; pos.forEach(p => open += ((x.close - p.entry) * (p.dir === 'BUY' ? 1 : -1) / (p.slD || p.entry * 0.01)) * p.riskMoney);
        if (bal + open - dayStart <= -dayStart * bot.safety.dayLoss / 100) { pos.slice().forEach(p => close(p, x.close, i, 'Daily loss stop')); dayStop = true; }
      }
      peak = Math.max(peak, bal); maxDD = Math.max(maxDD, (peak - bal) / peak * 100);
      curve.push({ time: x.time, value: bal });
    }
    const wins = trades.filter(t => t.money > 0), loss = trades.filter(t => t.money <= 0);
    const gp = wins.reduce((a, t) => a + t.money, 0), gl = -loss.reduce((a, t) => a + t.money, 0);
    return {
      trades, curve, open: pos,
      stats: { n: trades.length, wins: wins.length, winRate: trades.length ? wins.length / trades.length * 100 : 0, net: bal - opt.balance, bal,
        pf: gl ? gp / gl : (gp ? Infinity : 0), maxDD, avgR: trades.length ? trades.reduce((a, t) => a + t.R, 0) / trades.length : 0, riskPct }
    };
  };

  /* ---------------- .gtmbot for GTM EA Bot Studio ---------------- */
  // block defaults copied from the Studio's block list (p0..p5, c0..c2)
  const DEF = {
    ev_bar: [0, 0, 0, 0, 0, 0], ev_tick: [0, 0, 0, 0, 0, 0], f_spread: [2, 0, 0, 0, 0, 0], f_session: [8, 0, 17, 0, 0, 0], f_days: [0, 0, 0, 0, 0, 0],
    f_maxpos: [1, 0, 0, 0, 0, 0], f_gap: [5, 0, 0, 0, 0, 0], f_nopos: [2, 0, 0, 0, 0, 0], c_if: [0, 0, 0, 0, 0, 0], b_cmp: [0, 0, 0, 0, 0, 0], b_cross: [0, 0, 0, 0, 0, 0],
    b_and: [0, 0, 0, 0, 0, 0], b_candle: [0, 1, 0, 0, 0, 0], b_pattern: [0, 1, 0, 0, 0, 0], b_trend: [0, 0, 3, 0, 0, 0],
    v_ma: [20, 1, 1, 0, 0, 0], v_rsi: [14, 1, 0, 0, 0, 0], v_macd: [12, 1, 0, 26, 9, 0], v_stoch: [5, 1, 0, 3, 3, 0], v_bb: [20, 1, 0, 2, 0, 0],
    v_atr: [14, 1, 0, 0, 0, 0], v_cci: [14, 1, 0, 0, 0, 0], v_adx: [14, 1, 0, 0, 0, 0], v_price: [0, 1, 0, 0, 0, 0], v_hl: [20, 1, 0, 0, 0, 0], v_num: [50, 0, 0, 0, 0, 0],
    a_buy: [0, 0.01, 2, 1.5, 2, 2], a_sell: [0, 0.01, 2, 1.5, 2, 2], a_close: [0, 0, 0, 0, 0, 0], m_be: [1, 1, 1, 0, 0, 0], m_trail: [1, 1, 10, 0, 0, 0],
    s_day: [3, 0, 0, 0, 0, 0], s_maxday: [5, 0, 0, 0, 0, 0], t_note: [0, 0, 0, 0, 0, 0]
  };
  const CST = { b_cmp: [0, 50, 0] };
  const num = v => { v = +v || 0; if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v)); return v.toFixed(5).replace(/0+$/, '').replace(/\.$/, ''); };
  const esc = s => String(s).replace(/\//g, '//').replace(/\|/g, '/p').replace(/\r/g, '').replace(/\n/g, '/n');

  BC.toGtmbot = function (bot) {
    const B = [];
    const N = (id, x, y) => { const b = { id, next: -1, sub: -1, sub2: -1, inp: [-1, -1, -1], x: x || 0, y: y || 0, p: DEF[id].slice(), c: (CST[id] || [0, 0, 0]).slice(), t: id === 't_note' ? 'my idea' : '' }; B.push(b); return B.length - 1; };
    const chain = arr => { arr = arr.filter(i => i >= 0); for (let k = 0; k < arr.length - 1; k++) B[arr[k]].next = arr[k + 1]; return arr[0] ?? -1; };
    const val = v => {
      let i;
      switch (v.k) {
        case 'ma': i = N('v_ma'); B[i].p = [v.n, v.sh, v.m, v.src, 0, 0]; break;
        case 'rsi': i = N('v_rsi'); B[i].p = [v.n, v.sh, 0, 0, 0, 0]; break;
        case 'macd': i = N('v_macd'); B[i].p = [v.f, v.sh, v.line, v.s, v.g, 0]; break;
        case 'stoch': i = N('v_stoch'); B[i].p = [v.kp, v.sh, v.line, v.d, v.sl, 0]; break;
        case 'bb': i = N('v_bb'); B[i].p = [v.n, v.sh, v.band, v.dev, 0, 0]; break;
        case 'atr': i = N('v_atr'); B[i].p = [v.n, v.sh, 0, 0, 0, 0]; break;
        case 'cci': i = N('v_cci'); B[i].p = [v.n, v.sh, 0, 0, 0, 0]; break;
        case 'adx': i = N('v_adx'); B[i].p = [v.n, v.sh, v.line, 0, 0, 0]; break;
        case 'price': i = N('v_price'); B[i].p = [0, v.sh, v.w, 0, 0, 0]; break;
        case 'hl': i = N('v_hl'); B[i].p = [v.n, v.sh, v.w, 0, 0, 0]; break;
        default: i = N('v_num'); B[i].p[0] = v.v;
      }
      return i;
    };
    const two = (id, k) => { // a slot pair: value block or a typed number
      const i = N(id); B[i].inp[0] = val(k.a);
      if (k.b.k === 'num') { B[i].c[1] = k.b.v; } else B[i].inp[1] = val(k.b);
      return i;
    };
    const cond = k => {
      let i;
      if (k.t === 'cross') { i = two('b_cross', k); B[i].p[0] = k.dir; }
      else if (k.t === 'cmp') { i = two('b_cmp', k); B[i].p[0] = k.op; }
      else if (k.t === 'candle') { i = N('b_candle'); B[i].p[0] = k.kind; B[i].p[1] = k.sh; }
      else if (k.t === 'pattern') { i = N('b_pattern'); B[i].p[0] = k.kind; B[i].p[1] = k.sh; }
      else { i = N('b_trend'); B[i].inp[0] = val(k.a); B[i].p[0] = k.dir; B[i].p[2] = k.n; }
      return i;
    };
    const all = list => { // c1 AND (c2 AND (c3 ...))
      if (!list.length) return -1;
      if (list.length === 1) return cond(list[0]);
      const a = N('b_and'); B[a].inp[0] = cond(list[0]); B[a].inp[1] = all(list.slice(1)); return a;
    };
    const t = bot.trade;
    const trade = buy => { const i = N(buy ? 'a_buy' : 'a_sell'); B[i].p = [t.lotMode, t.lotMode ? t.risk : t.lot, t.slMode, t.sl, t.tpMode, t.tp]; return i; };
    const side = (list, buy) => {
      if (!list.length) return -1;
      const ib = N('c_if'); B[ib].inp[0] = all(list);
      const steps = [];
      if (bot.closeOpposite) { const cl = N('a_close'); B[cl].p[0] = buy ? 2 : 1; steps.push(cl); }
      const np = N('f_nopos'); B[np].p[0] = buy ? 0 : 1; steps.push(np);
      steps.push(trade(buy));
      B[ib].sub = chain(steps);
      return ib;
    };
    // entry part
    const h = N('ev_bar', 20, 20); B[h].p[0] = bot.tf;
    const f = bot.filters, steps = [];
    if (f.spread > 0) { const i = N('f_spread'); B[i].p[0] = f.spread; steps.push(i); }
    if (f.session.on) { const i = N('f_session'); B[i].p = [f.session.h1, f.session.m1, f.session.h2, f.session.m2, 0, 0]; steps.push(i); }
    if (f.days >= 0) { const i = N('f_days'); B[i].p[0] = f.days; steps.push(i); }
    if (!bot.closeOpposite && f.maxOpen > 0) { const i = N('f_maxpos'); B[i].p[0] = f.maxOpen; steps.push(i); }
    if (f.gap > 0) { const i = N('f_gap'); B[i].p[0] = f.gap; steps.push(i); }
    steps.push(side(bot.buy, true), side(bot.sell, false));
    B[h].sub = chain(steps);
    // manage + safety
    const ms = [];
    if (bot.manage.be > 0) { const i = N('m_be'); B[i].p = [bot.manage.be, 1, 1, 0, 0, 0]; ms.push(i); }
    if (bot.manage.trail > 0) { const i = N('m_trail'); B[i].p = [bot.manage.trail, 1, 10, 0, 0, 0]; ms.push(i); }
    if (bot.safety.dayLoss > 0) { const i = N('s_day'); B[i].p = [bot.safety.dayLoss, 0, 0, 0, 0, 0]; ms.push(i); }
    if (bot.safety.maxDay > 0) { const i = N('s_maxday'); B[i].p[0] = bot.safety.maxDay; ms.push(i); }
    if (ms.length) { const ht = N('ev_tick', 20, 420); B[ht].sub = chain(ms); }
    const magic = 72000 + (Math.abs(hashStr(bot.name)) % 9000);
    let s = 'GTMBOT|1\nname|' + esc(bot.name || 'bot') + '\nmagic|' + magic + '\n';
    B.forEach((b, i) => {
      s += ['b', i, b.id, b.next, b.sub, b.sub2, b.inp[0], b.inp[1], b.inp[2], b.x, b.y, i + 1].join('|') + '|' + b.p.map(num).join('|') + '|' + b.c.map(num).join('|') + '|' + esc(b.t) + '\n';
    });
    return s;
  };
  function hashStr(s) { let h = 0; for (let i = 0; i < String(s).length; i++) h = (h * 31 + String(s).charCodeAt(i)) | 0; return h; }
  BC.hashStr = hashStr;

  /* ---------------- stand-alone MT5 Expert Advisor ---------------- */
  BC.toMq5 = function (bot) {
    const TFS = ['PERIOD_CURRENT', 'PERIOD_M1', 'PERIOD_M5', 'PERIOD_M15', 'PERIOD_M30', 'PERIOD_H1', 'PERIOD_H4', 'PERIOD_D1', 'PERIOD_W1'];
    const tf = 'InpTF';
    const handles = [], hmap = new Map();
    const H = (key, create) => { if (!hmap.has(key)) { const n = 'h' + handles.length; hmap.set(key, n); handles.push([n, create]); } return hmap.get(key); };
    const MAM = ['MODE_SMA', 'MODE_EMA', 'MODE_SMMA', 'MODE_LWMA'], PR = ['PRICE_CLOSE', 'PRICE_OPEN', 'PRICE_HIGH', 'PRICE_LOW', 'PRICE_MEDIAN', 'PRICE_TYPICAL'];
    const V = (v, extra) => {
      const sh = '(' + ((v.sh != null ? v.sh : 1) + (extra || 0)) + ')';
      const s = (v.sh != null ? v.sh : 1) + (extra || 0);
      switch (v.k) {
        case 'num': return '(' + (+v.v) + ')';
        case 'ma': return `Buf(${H(`ma${v.m}_${v.n}_${v.src}`, `iMA(_Symbol, ${tf}, ${v.n}, 0, ${MAM[v.m]}, ${PR[v.src]})`)}, 0, ${s})`;
        case 'rsi': return `Buf(${H('rsi' + v.n, `iRSI(_Symbol, ${tf}, ${v.n}, PRICE_CLOSE)`)}, 0, ${s})`;
        case 'macd': { const h = H(`macd${v.f}_${v.s}_${v.g}`, `iMACD(_Symbol, ${tf}, ${v.f}, ${v.s}, ${v.g}, PRICE_CLOSE)`);
          return v.line === 2 ? `(Buf(${h}, 0, ${s}) - Buf(${h}, 1, ${s}))` : `Buf(${h}, ${v.line}, ${s})`; }
        case 'stoch': return `Buf(${H(`st${v.kp}_${v.d}_${v.sl}`, `iStochastic(_Symbol, ${tf}, ${v.kp}, ${v.d}, ${v.sl}, MODE_SMA, STO_LOWHIGH)`)}, ${v.line}, ${s})`;
        case 'bb': return `Buf(${H(`bb${v.n}_${v.dev}`, `iBands(_Symbol, ${tf}, ${v.n}, 0, ${+v.dev}, PRICE_CLOSE)`)}, ${[1, 0, 2][v.band]}, ${s})`;
        case 'atr': return `Buf(${H('atr' + v.n, `iATR(_Symbol, ${tf}, ${v.n})`)}, 0, ${s})`;
        case 'cci': return `Buf(${H('cci' + v.n, `iCCI(_Symbol, ${tf}, ${v.n}, PRICE_TYPICAL)`)}, 0, ${s})`;
        case 'adx': return `Buf(${H('adx' + v.n, `iADX(_Symbol, ${tf}, ${v.n})`)}, ${v.line}, ${s})`;
        case 'price': return `${['iClose', 'iOpen', 'iHigh', 'iLow'][v.w]}(_Symbol, ${tf}, ${s})`;
        case 'hl': return v.w ? `iLow(_Symbol, ${tf}, iLowest(_Symbol, ${tf}, MODE_LOW, ${v.n}, ${s}))` : `iHigh(_Symbol, ${tf}, iHighest(_Symbol, ${tf}, MODE_HIGH, ${v.n}, ${s}))`;
      }
      return '0';
    };
    const C = k => {
      if (k.t === 'cross') return k.dir ? `(${V(k.a)} < ${V(k.b)} && ${V(k.a, 1)} >= ${V(k.b, 1)})` : `(${V(k.a)} > ${V(k.b)} && ${V(k.a, 1)} <= ${V(k.b, 1)})`;
      if (k.t === 'cmp') return k.op === 4 ? `(MathAbs(${V(k.a)} - ${V(k.b)}) < 1e-10)` : `(${V(k.a)} ${BC.OPS[k.op]} ${V(k.b)})`;
      if (k.t === 'candle') return `CandleIs(${k.kind}, ${k.sh})`;
      if (k.t === 'pattern') return `PatternAt(${k.kind}, ${k.sh})`;
      if (k.t === 'trend') { const p = []; for (let j = 0; j < k.n; j++) p.push(`${V(k.a, j)} ${k.dir ? '<' : '>'} ${V(k.a, j + 1)}`); return '(' + p.join(' && ') + ')'; }
      return 'false';
    };
    const rule = l => (l.length ? l.map((k, i) => '      ' + C(k) + (i < l.length - 1 ? ' &&' : '') + '   // ' + BC.condText(k).replace(/[\r\n]/g, ' ')).join('\n') : '      false') + '\n      ;';
    const buyExpr = rule(bot.buy), sellExpr = rule(bot.sell);
    const t = bot.trade, f = bot.filters, safeName = String(bot.name || 'GTM bot').replace(/[^\w \-]/g, '').trim() || 'GTM bot';
    const magic = 72000 + (Math.abs(hashStr(bot.name)) % 9000);
    return `//+------------------------------------------------------------------+
//| ${safeName}.mq5
//| Built with the G TRADERS Studio web editor
//| Rules:
//|   BUY  when ${bot.buy.map(BC.condText).join(' AND ') || '(no rule)'}
//|   SELL when ${bot.sell.map(BC.condText).join(' AND ') || '(no rule)'}
//| Test it in the Strategy Tester and on a demo account first.
//| Trading carries risk; past results do not guarantee future results.
//+------------------------------------------------------------------+
#property copyright "G TRADERS"
#property version   "1.00"
#property description "Made with the G TRADERS Studio web editor. Try it in the Strategy Tester and on demo first."
#include <Trade\\Trade.mqh>

input ENUM_TIMEFRAMES InpTF       = ${TFS[bot.tf]};   // timeframe for the rules
input int      InpLotMode         = ${t.lotMode};       // 0 = fixed lots, 1 = risk % of balance
input double   InpLots            = ${num(t.lot)};      // fixed lots
input double   InpRiskPct         = ${num(t.risk)};     // risk % per trade (needs a stop loss)
input int      InpSLMode          = ${t.slMode};       // stop loss: 0 none, 1 pips, 2 x ATR(14)
input double   InpSL              = ${num(t.sl)};
input int      InpTPMode          = ${t.tpMode};       // take profit: 0 none, 1 pips, 2 x R, 3 x ATR(14)
input double   InpTP              = ${num(t.tp)};
input bool     InpCloseOpposite   = ${bot.closeOpposite ? 'true' : 'false'};
input int      InpMaxOpen         = ${f.maxOpen};       // most open trades of this EA
input double   InpMaxSpreadPips   = ${num(f.spread)};    // 0 = no spread filter
input bool     InpSession         = ${f.session.on ? 'true' : 'false'};
input int      InpSessFromH       = ${f.session.h1};
input int      InpSessFromM       = ${f.session.m1};
input int      InpSessToH         = ${f.session.h2};
input int      InpSessToM         = ${f.session.m2};
input int      InpDays            = ${f.days};       // -1 every day, 0 Mon-Fri, 1 Mon-Thu, 2 Tue-Thu, 3 Mon-Sat, 4 every day
input int      InpGapBars         = ${f.gap};       // candles to wait between entries
input double   InpBreakevenR      = ${num(bot.manage.be)};     // move SL to entry at this many R (0 = off)
input double   InpTrailATR        = ${num(bot.manage.trail)};     // trail x ATR(14) behind price (0 = off)
input double   InpDayLossPct      = ${num(bot.safety.dayLoss)};     // stop the day at this loss % (0 = off)
input int      InpMaxTradesDay    = ${bot.safety.maxDay};       // 0 = no limit
input long     InpMagic           = ${magic};

CTrade   trade;
${handles.map(([n]) => `int      ${n} = INVALID_HANDLE;`).join('\n')}
int      hATR = INVALID_HANDLE;
datetime g_lastBar = 0;
int      g_lastEntryBar = -100000;
int      g_barCount = 0;
datetime g_day = 0;
double   g_dayStart = 0;
bool     g_dayStop = false;

int OnInit()
{
   trade.SetExpertMagicNumber((ulong)InpMagic);
${handles.map(([n, c]) => `   ${n} = ${c};\n   if(${n} == INVALID_HANDLE) { Print("Indicator could not load"); return INIT_FAILED; }`).join('\n')}
   hATR = iATR(_Symbol, InpTF, 14);
   if(hATR == INVALID_HANDLE) return INIT_FAILED;
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
${handles.map(([n]) => `   if(${n} != INVALID_HANDLE) IndicatorRelease(${n});`).join('\n')}
   if(hATR != INVALID_HANDLE) IndicatorRelease(hATR);
}

double Buf(int h, int buffer, int shift)
{
   double v[1];
   if(CopyBuffer(h, buffer, shift, 1, v) != 1) return EMPTY_VALUE;
   return v[0];
}

double Pip()
{
   int d = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);
   return (d == 3 || d == 5) ? _Point * 10.0 : _Point;
}

bool CandleIs(int kind, int sh)
{
   double o = iOpen(_Symbol, InpTF, sh), c = iClose(_Symbol, InpTF, sh), hi = iHigh(_Symbol, InpTF, sh), lo = iLow(_Symbol, InpTF, sh);
   if(kind == 0) return c > o;
   if(kind == 1) return c < o;
   return MathAbs(c - o) <= 0.1 * (hi - lo);
}

bool PatternAt(int kind, int sh)
{
   double o1 = iOpen(_Symbol, InpTF, sh), c1 = iClose(_Symbol, InpTF, sh), hi1 = iHigh(_Symbol, InpTF, sh), lo1 = iLow(_Symbol, InpTF, sh);
   double o2 = iOpen(_Symbol, InpTF, sh + 1), c2 = iClose(_Symbol, InpTF, sh + 1), hi2 = iHigh(_Symbol, InpTF, sh + 1), lo2 = iLow(_Symbol, InpTF, sh + 1);
   double body = MathAbs(c1 - o1), up = hi1 - MathMax(o1, c1), dn = MathMin(o1, c1) - lo1;
   switch(kind)
   {
      case 0: return c1 > o1 && c2 < o2 && c1 >= o2 && o1 <= c2;
      case 1: return c1 < o1 && c2 > o2 && c1 <= o2 && o1 >= c2;
      case 2: return body > 0 && dn >= 2 * body && up <= body;
      case 3: return body > 0 && up >= 2 * body && dn <= body;
      case 4: return hi1 < hi2 && lo1 > lo2;
      case 5: return hi1 > hi2 && lo1 < lo2;
   }
   return false;
}

int CountPositions(int type)   // type -1 = all
{
   int n = 0;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong tk = PositionGetTicket(i);
      if(tk == 0 || !PositionSelectByTicket(tk)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != InpMagic || PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      if(type < 0 || PositionGetInteger(POSITION_TYPE) == type) n++;
   }
   return n;
}

void ClosePositions(int type)  // type -1 = all
{
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong tk = PositionGetTicket(i);
      if(tk == 0 || !PositionSelectByTicket(tk)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != InpMagic || PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      if(type < 0 || PositionGetInteger(POSITION_TYPE) == type) trade.PositionClose(tk);
   }
}

int TradesToday()
{
   MqlDateTime t; TimeToStruct(TimeCurrent(), t); t.hour = 0; t.min = 0; t.sec = 0;
   if(!HistorySelect(StructToTime(t), TimeCurrent() + 60)) return 0;
   int n = 0;
   for(int i = HistoryDealsTotal() - 1; i >= 0; i--)
   {
      ulong d = HistoryDealGetTicket(i);
      if(d == 0) continue;
      if(HistoryDealGetInteger(d, DEAL_MAGIC) == InpMagic && HistoryDealGetString(d, DEAL_SYMBOL) == _Symbol
         && HistoryDealGetInteger(d, DEAL_ENTRY) == DEAL_ENTRY_IN) n++;
   }
   return n;
}

double NormLots(double lots)
{
   double mn = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN), mx = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX), st = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
   if(st <= 0) st = mn;
   lots = MathFloor(lots / st) * st;
   if(lots < mn) lots = mn;
   if(lots > mx) lots = mx;
   return NormalizeDouble(lots, 8);
}

double LotsFor(double slDist)
{
   if(InpLotMode == 0 || slDist <= 0) return NormLots(InpLots);
   double tv = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE), ts = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tv <= 0 || ts <= 0) return NormLots(InpLots);
   double risk = AccountInfoDouble(ACCOUNT_BALANCE) * InpRiskPct / 100.0;
   return NormLots(risk / (slDist / ts * tv));
}

bool SessionOk()
{
   MqlDateTime t; TimeToStruct(TimeCurrent(), t);
   if(InpDays >= 0)
   {
      int w = t.day_of_week;
      bool ok = (InpDays == 0 && w >= 1 && w <= 5) || (InpDays == 1 && w >= 1 && w <= 4) || (InpDays == 2 && w >= 2 && w <= 4)
             || (InpDays == 3 && w >= 1 && w <= 6) || InpDays == 4;
      if(!ok) return false;
   }
   if(!InpSession) return true;
   int m = t.hour * 60 + t.min, a = InpSessFromH * 60 + InpSessFromM, b = InpSessToH * 60 + InpSessToM;
   return (a <= b) ? (m >= a && m < b) : (m >= a || m < b);
}

void Open(bool buy)
{
   double price = buy ? SymbolInfoDouble(_Symbol, SYMBOL_ASK) : SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double atr = Buf(hATR, 0, 1);
   if(atr == EMPTY_VALUE) atr = 0;
   double slD = (InpSLMode == 1) ? InpSL * Pip() : (InpSLMode == 2) ? InpSL * atr : 0;
   double tpD = (InpTPMode == 1) ? InpTP * Pip() : (InpTPMode == 2) ? InpTP * slD : (InpTPMode == 3) ? InpTP * atr : 0;
   int dg = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);
   double sl = 0, tp = 0;
   if(slD > 0) sl = NormalizeDouble(buy ? price - slD : price + slD, dg);
   if(tpD > 0) tp = NormalizeDouble(buy ? price + tpD : price - tpD, dg);
   double lots = LotsFor(slD);
   bool ok = buy ? trade.Buy(lots, _Symbol, 0, sl, tp, "GTM web bot") : trade.Sell(lots, _Symbol, 0, sl, tp, "GTM web bot");
   if(ok) g_lastEntryBar = g_barCount;
   else Print("Order failed: ", trade.ResultRetcodeDescription());
}

void Manage()
{
   double atr = Buf(hATR, 0, 1);
   int dg = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong tk = PositionGetTicket(i);
      if(tk == 0 || !PositionSelectByTicket(tk)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != InpMagic || PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      bool buy = PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY;
      double open = PositionGetDouble(POSITION_PRICE_OPEN), sl = PositionGetDouble(POSITION_SL), tp = PositionGetDouble(POSITION_TP);
      double px = buy ? SymbolInfoDouble(_Symbol, SYMBOL_BID) : SymbolInfoDouble(_Symbol, SYMBOL_ASK);
      double nsl = sl;
      // breakeven: the stop is still on the losing side and price has moved InpBreakevenR x the risk
      if(InpBreakevenR > 0 && sl > 0)
      {
         double risk = buy ? open - sl : sl - open;
         if(risk > 0 && (buy ? px - open : open - px) >= InpBreakevenR * risk)
            nsl = NormalizeDouble(buy ? open + Pip() : open - Pip(), dg);
      }
      if(InpTrailATR > 0 && atr != EMPTY_VALUE && atr > 0 && (buy ? px - open : open - px) > 10 * Pip())
      {
         double t = NormalizeDouble(buy ? px - atr * InpTrailATR : px + atr * InpTrailATR, dg);
         if(buy ? (t > nsl) : (nsl == 0 || t < nsl)) nsl = t;
      }
      if(nsl != sl && (buy ? nsl > sl : (sl == 0 || nsl < sl)))
      {
         double stopLvl = SymbolInfoInteger(_Symbol, SYMBOL_TRADE_STOPS_LEVEL) * _Point;
         if(buy ? (px - nsl > stopLvl) : (nsl - px > stopLvl)) trade.PositionModify(tk, nsl, tp);
      }
   }
}

void TryEntry(bool buy)
{
   if(InpCloseOpposite) ClosePositions(buy ? (int)POSITION_TYPE_SELL : (int)POSITION_TYPE_BUY);
   if(CountPositions(buy ? (int)POSITION_TYPE_BUY : (int)POSITION_TYPE_SELL) > 0) return;
   if(CountPositions(-1) >= InpMaxOpen) return;
   if(InpGapBars > 0 && g_barCount - g_lastEntryBar < InpGapBars) return;
   if(InpMaxTradesDay > 0 && TradesToday() >= InpMaxTradesDay) return;
   Open(buy);
}
void OnTick()
{
   // daily loss stop
   MqlDateTime t; TimeToStruct(TimeCurrent(), t); t.hour = 0; t.min = 0; t.sec = 0;
   datetime d = StructToTime(t);
   if(d != g_day) { g_day = d; g_dayStart = AccountInfoDouble(ACCOUNT_BALANCE); g_dayStop = false; }
   if(InpDayLossPct > 0 && !g_dayStop && AccountInfoDouble(ACCOUNT_EQUITY) - g_dayStart <= -g_dayStart * InpDayLossPct / 100.0)
   {
      ClosePositions(-1); g_dayStop = true; Print("Daily loss limit reached - no new trades today");
   }
   Manage();

   datetime bar = iTime(_Symbol, InpTF, 0);
   if(bar == 0 || bar == g_lastBar) return;
   g_lastBar = bar; g_barCount++;
   if(g_barCount < 3) return;   // let the indicators load first
   if(g_dayStop || !SessionOk()) return;
   if(InpMaxSpreadPips > 0 && SymbolInfoInteger(_Symbol, SYMBOL_SPREAD) * _Point > InpMaxSpreadPips * Pip()) return;

   bool buySignal =
${buyExpr}
   bool sellSignal =
${sellExpr}

   if(buySignal)  TryEntry(true);
   if(sellSignal) TryEntry(false);
}

//+------------------------------------------------------------------+
`;
  };
})();
