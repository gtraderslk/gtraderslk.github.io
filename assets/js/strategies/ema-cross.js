/* ============================================================
   EMA Cross Strategy
   Signal fires when fast EMA crosses slow EMA and RSI confirms.
   ============================================================ */

const EMACrossStrategy = {
    name: 'EMA cross (9/21) + RSI',
    short: 'EMA',
    defaults: { fast: 9, slow: 21, rsiPeriod: 14, rsiBuyMin: 45, rsiSellMax: 55 },

    /**
     * Detect signals across a full candle series.
     * Returns array of { index, time, signal: 'BUY'|'SELL', entry, sl, tp, reason }
     */
    detect(candles, opts = {}) {
        const cfg = { ...this.defaults, ...opts };
        const out = [];
        if (candles.length < cfg.slow + 5) return out;

        const fast = Indicators.ema(candles, cfg.fast);
        const slow = Indicators.ema(candles, cfg.slow);
        const rsi  = Indicators.rsi(candles, cfg.rsiPeriod);

        for (let i = cfg.slow + 2; i < candles.length; i++) {
            if (fast[i] === null || slow[i] === null || fast[i-1] === null || slow[i-1] === null) continue;

            const crossedUp   = fast[i-1] <= slow[i-1] && fast[i] > slow[i];
            const crossedDown = fast[i-1] >= slow[i-1] && fast[i] < slow[i];

            const c   = candles[i];
            const atr = _avgRange(candles, i, 14);

            if (crossedUp && rsi[i] !== null && rsi[i] > cfg.rsiBuyMin) {
                out.push({
                    index: i, time: c.time,
                    signal: 'BUY',
                    entry: c.close,
                    sl:    +(c.close - atr * 1.2).toPrecision(10),
                    tp:    +(c.close + atr * 2.0).toPrecision(10),
                    reason: `EMA${cfg.fast} crossed above EMA${cfg.slow}, RSI=${rsi[i].toFixed(1)}`,
                });
            } else if (crossedDown && rsi[i] !== null && rsi[i] < cfg.rsiSellMax) {
                out.push({
                    index: i, time: c.time,
                    signal: 'SELL',
                    entry: c.close,
                    sl:    +(c.close + atr * 1.2).toPrecision(10),
                    tp:    +(c.close - atr * 2.0).toPrecision(10),
                    reason: `EMA${cfg.fast} crossed below EMA${cfg.slow}, RSI=${rsi[i].toFixed(1)}`,
                });
            }
        }
        return out;
    },

    /** For rendering the EMA lines on the chart. */
    lines(candles, opts = {}) {
        const cfg = { ...this.defaults, ...opts };
        return [
            { name: `EMA${cfg.fast}`, color: '#6c8cff', values: Indicators.ema(candles, cfg.fast) },
            { name: `EMA${cfg.slow}`, color: '#ffc857', values: Indicators.ema(candles, cfg.slow) },
        ];
    }
};

function _avgRange(candles, idx, period) {
    let sum = 0, n = 0;
    for (let j = Math.max(0, idx - period + 1); j <= idx; j++) {
        sum += (candles[j].high - candles[j].low);
        n++;
    }
    return n ? sum / n : 0;
}

window.EMACrossStrategy = EMACrossStrategy;
