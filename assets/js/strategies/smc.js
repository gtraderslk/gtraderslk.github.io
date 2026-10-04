/* ============================================================
   SMC signal engine (Smart Money Concepts)
   - swing highs / lows, confirmed only after they are complete (no repaint)
   - BOS  = price closes past the last swing in the trend's direction
   - CHoCH = the first close past a swing against the trend
   - after a break: the order block (last opposite candle before the move)
     and any fair value gap become zones
   - signal: price comes back into a zone and the candle closes the trend's way
   ============================================================ */
const SMCStrategy = {
  name: 'SMC signal (BOS · CHoCH · order blocks · FVG)',
  short: 'SMC',
  defaults: { lb: 3, maxZones: 6 },

  analyze(c, opts = {}) {
    const cfg = { ...this.defaults, ...opts }, lb = cfg.lb, n = c.length;
    const out = { signals: [], marks: [], zones: [], swings: [] };
    if (n < lb * 4 + 10) return out;
    let sh = null, sl = null, trend = 0, zones = [];
    for (let i = 0; i < n; i++) {
      // confirm the swing that finished lb candles ago
      const k = i - lb;
      if (k >= lb) {
        let hi = true, lo = true;
        for (let j = 1; j <= lb; j++) {
          if (c[k].high <= c[k - j].high || c[k].high < c[k + j].high) hi = false;
          if (c[k].low >= c[k - j].low || c[k].low > c[k + j].low) lo = false;
        }
        if (hi) { sh = { i: k, p: c[k].high, broken: false }; out.swings.push({ i: k, p: c[k].high, t: 'H' }); }
        if (lo) { sl = { i: k, p: c[k].low, broken: false }; out.swings.push({ i: k, p: c[k].low, t: 'L' }); }
      }
      const x = c[i], atr = _avgRange(c, i, 14);
      // zones first: a retest of an older zone
      for (const z of zones) {
        if (z.t2 || z.from >= i) continue;
        if (z.type === 'bull') {
          // filled / broken: the box ends here
          if ((z.kind === 'FVG' && x.low <= z.bottom) || x.close < z.bottom) { z.t2 = x.time; z.dead = true; continue; }
          if (!z.used && trend === 1 && x.low <= z.top && x.close > x.open && x.close > z.bottom) {
            const stop = z.bottom - atr * 0.3, risk = x.close - stop;
            if (risk > 0) out.signals.push({ index: i, time: x.time, signal: 'BUY', entry: x.close, sl: stop, tp: x.close + risk * 2, reason: `Retest of a bullish ${z.kind} after ${z.after}` });
            z.used = true;
          }
        } else {
          if ((z.kind === 'FVG' && x.high >= z.top) || x.close > z.top) { z.t2 = x.time; z.dead = true; continue; }
          if (!z.used && trend === -1 && x.high >= z.bottom && x.close < x.open && x.close < z.top) {
            const stop = z.top + atr * 0.3, risk = stop - x.close;
            if (risk > 0) out.signals.push({ index: i, time: x.time, signal: 'SELL', entry: x.close, sl: stop, tp: x.close - risk * 2, reason: `Retest of a bearish ${z.kind} after ${z.after}` });
            z.used = true;
          }
        }
      }
      // structure breaks
      if (sh && !sh.broken && x.close > sh.p) {
        sh.broken = true; const kind = trend === -1 ? 'CHoCH' : 'BOS'; trend = 1;
        out.marks.push({ time: x.time, up: true, text: kind });
        const from = sl ? sl.i : Math.max(0, i - 20);
        for (let j = i; j >= from; j--) if (c[j].close < c[j].open) { zones.push({ type: 'bull', kind: 'order block', after: kind, top: c[j].high, bottom: c[j].low, from: i, t: c[j].time }); break; }
        for (let j = Math.max(from + 2, 2); j <= i; j++) if (c[j - 2].high < c[j].low) zones.push({ type: 'bull', kind: 'FVG', after: kind, top: c[j].low, bottom: c[j - 2].high, from: i, t: c[j - 1].time });
      }
      if (sl && !sl.broken && x.close < sl.p) {
        sl.broken = true; const kind = trend === 1 ? 'CHoCH' : 'BOS'; trend = -1;
        out.marks.push({ time: x.time, up: false, text: kind });
        const from = sh ? sh.i : Math.max(0, i - 20);
        for (let j = i; j >= from; j--) if (c[j].close > c[j].open) { zones.push({ type: 'bear', kind: 'order block', after: kind, top: c[j].high, bottom: c[j].low, from: i, t: c[j].time }); break; }
        for (let j = Math.max(from + 2, 2); j <= i; j++) if (c[j - 2].low > c[j].high) zones.push({ type: 'bear', kind: 'FVG', after: kind, top: c[j - 2].low, bottom: c[j].high, from: i, t: c[j - 1].time });
      }
      if (zones.length > 60) zones = zones.slice(-40);
    }
    // live zones plus the most recently filled ones (drawn faded, ending where they were filled)
    const live = zones.filter(z => !z.t2).slice(-cfg.maxZones), done = zones.filter(z => z.t2).slice(-4);
    out.zones = done.concat(live).map(z => ({ type: z.type, kind: z.kind, top: z.top, bottom: z.bottom, t1: z.t, t2: z.t2 || null }));
    out.trend = trend;
    return out;
  },
  detect(c, o) { return this.analyze(c, o).signals; },
  lines(c) { return [{ name: 'EMA 50', color: '#8b9bb4', values: Indicators.ema(c, 50) }]; }
};

function _avgRange(candles, idx, period) {
  let sum = 0, n = 0;
  for (let j = Math.max(0, idx - period + 1); j <= idx; j++) { sum += (candles[j].high - candles[j].low); n++; }
  return n ? sum / n : 0;
}
window.SMCStrategy = SMCStrategy;
