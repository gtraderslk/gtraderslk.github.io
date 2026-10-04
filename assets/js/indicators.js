/* ============================================================
   AIG Bot Sup Analyzer - Technical indicators
   All functions are pure and take arrays of candle objects
   { time, open, high, low, close }.
   ============================================================ */

const Indicators = {

    // Simple Moving Average - returns array aligned with candles (leading nulls)
    sma(candles, period) {
        const out = new Array(candles.length).fill(null);
        let sum = 0;
        for (let i = 0; i < candles.length; i++) {
            sum += candles[i].close;
            if (i >= period) sum -= candles[i - period].close;
            if (i >= period - 1) out[i] = sum / period;
        }
        return out;
    },

    // Exponential Moving Average
    ema(candles, period) {
        const out = new Array(candles.length).fill(null);
        const k = 2 / (period + 1);
        let prev = null;
        for (let i = 0; i < candles.length; i++) {
            const c = candles[i].close;
            if (i < period - 1) continue;
            if (prev === null) {
                // seed with SMA
                let s = 0;
                for (let j = i - period + 1; j <= i; j++) s += candles[j].close;
                prev = s / period;
            } else {
                prev = c * k + prev * (1 - k);
            }
            out[i] = prev;
        }
        return out;
    },

    // Standard deviation (rolling)
    stddev(candles, period) {
        const out = new Array(candles.length).fill(null);
        for (let i = period - 1; i < candles.length; i++) {
            let mean = 0;
            for (let j = i - period + 1; j <= i; j++) mean += candles[j].close;
            mean /= period;
            let v = 0;
            for (let j = i - period + 1; j <= i; j++) v += (candles[j].close - mean) ** 2;
            out[i] = Math.sqrt(v / period);
        }
        return out;
    },

    // Bollinger Bands - returns { upper, middle, lower }
    bollinger(candles, period = 20, mult = 2) {
        const middle = this.sma(candles, period);
        const sd     = this.stddev(candles, period);
        const upper  = middle.map((m, i) => (m !== null && sd[i] !== null) ? m + mult * sd[i] : null);
        const lower  = middle.map((m, i) => (m !== null && sd[i] !== null) ? m - mult * sd[i] : null);
        return { upper, middle, lower };
    },

    // RSI (Wilder's)
    rsi(candles, period = 14) {
        const out = new Array(candles.length).fill(null);
        if (candles.length < period + 1) return out;
        let gain = 0, loss = 0;
        for (let i = 1; i <= period; i++) {
            const d = candles[i].close - candles[i - 1].close;
            if (d >= 0) gain += d; else loss -= d;
        }
        gain /= period; loss /= period;
        out[period] = 100 - 100 / (1 + gain / (loss || 1e-9));
        for (let i = period + 1; i < candles.length; i++) {
            const d = candles[i].close - candles[i - 1].close;
            const g = d > 0 ?  d : 0;
            const l = d < 0 ? -d : 0;
            gain = (gain * (period - 1) + g) / period;
            loss = (loss * (period - 1) + l) / period;
            out[i] = 100 - 100 / (1 + gain / (loss || 1e-9));
        }
        return out;
    },
};

window.Indicators = Indicators;
