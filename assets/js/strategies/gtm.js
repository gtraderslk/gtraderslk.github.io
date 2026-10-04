/* ============================================================
   GTM signal engine — trend break with confirmations
   BUY  : price above EMA 50, EMA 9 above EMA 21, the candle closes above
          the highest high of the last 10 candles, RSI 50-75, MACD histogram > 0
   SELL : the mirror image
   Stop 1.5 x ATR, targets 1R / 2R / 3R. One signal per direction per 6 candles.
   ============================================================ */
const GTMStrategy = {
  name: 'GTM signal (trend break + 4 confirmations)',
  short: 'GTM',
  defaults: { fast: 9, mid: 21, slow: 50, look: 10, cool: 6 },

  detect(c, opts = {}) {
    const cfg = { ...this.defaults, ...opts }, out = [];
    if (c.length < cfg.slow + 30) return out;
    const e9 = Indicators.ema(c, cfg.fast), e21 = Indicators.ema(c, cfg.mid), e50 = Indicators.ema(c, cfg.slow);
    const rsi = Indicators.rsi(c, 14), hist = GTMStrategy.macdHist(c);
    let lastB = -99, lastS = -99;
    for (let i = cfg.slow + 2; i < c.length; i++) {
      if (e50[i] == null || rsi[i] == null || hist[i] == null) continue;
      let hh = -Infinity, ll = Infinity;
      for (let j = i - cfg.look; j < i; j++) { hh = Math.max(hh, c[j].high); ll = Math.min(ll, c[j].low); }
      const x = c[i], atr = _avgRange(c, i, 14);
      const up = [x.close > e50[i], e9[i] > e21[i], x.close > hh, rsi[i] > 50 && rsi[i] < 75, hist[i] > 0];
      const dn = [x.close < e50[i], e9[i] < e21[i], x.close < ll, rsi[i] < 50 && rsi[i] > 25, hist[i] < 0];
      if (up.every(Boolean) && i - lastB > cfg.cool) {
        lastB = i; const sl = x.close - atr * 1.5;
        out.push({ index: i, time: x.time, signal: 'BUY', entry: x.close, sl, tp: x.close + (x.close - sl) * 2, strength: 5,
          reason: `Broke the ${cfg.look}-candle high above EMA 50, EMA 9 > 21, RSI ${rsi[i].toFixed(0)}, MACD up` });
      } else if (dn.every(Boolean) && i - lastS > cfg.cool) {
        lastS = i; const sl = x.close + atr * 1.5;
        out.push({ index: i, time: x.time, signal: 'SELL', entry: x.close, sl, tp: x.close - (sl - x.close) * 2, strength: 5,
          reason: `Broke the ${cfg.look}-candle low below EMA 50, EMA 9 < 21, RSI ${rsi[i].toFixed(0)}, MACD down` });
      }
    }
    return out;
  },
  lines(c) {
    return [
      { name: 'EMA 9', color: '#ff7ad9', values: Indicators.ema(c, 9) },
      { name: 'EMA 21', color: '#ff9f43', values: Indicators.ema(c, 21) },
      { name: 'EMA 50', color: '#22c55e', values: Indicators.ema(c, 50) }
    ];
  },
  macdHist(c) {
    const f = Indicators.ema(c, 12), s = Indicators.ema(c, 26);
    const m = c.map((_, i) => f[i] != null && s[i] != null ? f[i] - s[i] : null);
    const k = 2 / 10; let e = null; const out = new Array(c.length).fill(null); let cnt = 0;
    for (let i = 0; i < c.length; i++) { if (m[i] == null) continue; e = e == null ? m[i] : m[i] * k + e * (1 - k); if (++cnt >= 9) out[i] = m[i] - e; }
    return out;
  }
};
window.GTMStrategy = GTMStrategy;
