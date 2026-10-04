/* ============================================================
   Bollinger Band Breakout Strategy
   BUY  when a candle closes above the upper band and next opens above.
   SELL when a candle closes below the lower band and next opens below.
   Uses RSI as a confirmation to filter out weak signals.
   ============================================================ */

const BollingerStrategy = {
    name: 'Bollinger breakout',
    short: 'BB',
    defaults: { period: 20, mult: 2, rsiPeriod: 14, rsiBuyMin: 50, rsiSellMax: 50 },

    detect(candles, opts = {}) {
        const cfg = { ...this.defaults, ...opts };
        const out = [];
        if (candles.length < cfg.period + 5) return out;

        const bb  = Indicators.bollinger(candles, cfg.period, cfg.mult);
        const rsi = Indicators.rsi(candles, cfg.rsiPeriod);

        for (let i = cfg.period + 2; i < candles.length; i++) {
            const c = candles[i], p = candles[i - 1];
            if (bb.upper[i] === null || bb.lower[i] === null) continue;

            const atr = _avgRange(candles, i, 14);

            // Bullish breakout - previous candle broke above upper band
            const brokeUp   = p.close > bb.upper[i - 1] && p.close > p.open;
            const brokeDown = p.close < bb.lower[i - 1] && p.close < p.open;

            if (brokeUp && c.close > p.close && rsi[i] !== null && rsi[i] > cfg.rsiBuyMin) {
                out.push({
                    index: i, time: c.time,
                    signal: 'BUY',
                    entry: c.close,
                    sl:    +(bb.middle[i] - atr * 0.5).toPrecision(10),
                    tp:    +(c.close + atr * 2.0).toPrecision(10),
                    reason: `Break above upper BB, RSI=${rsi[i].toFixed(1)}`,
                });
            } else if (brokeDown && c.close < p.close && rsi[i] !== null && rsi[i] < cfg.rsiSellMax) {
                out.push({
                    index: i, time: c.time,
                    signal: 'SELL',
                    entry: c.close,
                    sl:    +(bb.middle[i] + atr * 0.5).toPrecision(10),
                    tp:    +(c.close - atr * 2.0).toPrecision(10),
                    reason: `Break below lower BB, RSI=${rsi[i].toFixed(1)}`,
                });
            }
        }
        return out;
    },

    lines(candles, opts = {}) {
        const cfg = { ...this.defaults, ...opts };
        const bb  = Indicators.bollinger(candles, cfg.period, cfg.mult);
        return [
            { name: 'BB Upper',  color: '#ff5b6a', values: bb.upper  },
            { name: 'BB Middle', color: '#a97bff', values: bb.middle },
            { name: 'BB Lower',  color: '#29d67c', values: bb.lower  },
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

window.BollingerStrategy = BollingerStrategy;
