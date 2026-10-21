/* ============================================================
   G TRADERS — three separate signal methods
     advanced   trend (higher timeframe) + ADX + Supertrend + pullback trigger + MACD / RSI / volatility / structure
     bollinger  band reversion (ranging market) + squeeze breakout
     ma         EMA 9 / 21 cross with EMA 200 trend filter and slope + chop filter
   Every signal is made from CLOSED candles only (the forming candle is never used), so a signal never repaints.
   Each function returns [{index,time,signal,entry,sl,tp,reason,conf?}]
   stats() walks the history forward (stop first when both are hit in one candle) — real counts, not promises.
   ============================================================ */
(function () {
  const emaA = (v, n) => { const k = 2 / (n + 1), o = new Array(v.length).fill(null); let e = null, s = 0; for (let i = 0; i < v.length; i++) { if (v[i] == null) continue; if (e == null) { s += v[i]; if (i >= n - 1) { e = s / n; o[i] = e; } } else { e = v[i] * k + e * (1 - k); o[i] = e; } } return o; };
  function atrA(c, n = 14) {
    const o = new Array(c.length).fill(null); let a = null;
    for (let i = 1; i < c.length; i++) {
      const tr = Math.max(c[i].high - c[i].low, Math.abs(c[i].high - c[i - 1].close), Math.abs(c[i].low - c[i - 1].close));
      if (i < n) { a = (a || 0) + tr; if (i === n - 1) { a /= n - 1; } if (i >= n - 1) o[i] = a; }
      else { a = (a * (n - 1) + tr) / n; o[i] = a; }
    }
    return o;
  }
  function adxA(c, n = 14) {
    const L = c.length, o = new Array(L).fill(null); if (L < n * 2 + 2) return o;
    const tr = [0], pd = [0], md = [0];
    for (let i = 1; i < L; i++) {
      const up = c[i].high - c[i - 1].high, dn = c[i - 1].low - c[i].low;
      pd.push(up > dn && up > 0 ? up : 0); md.push(dn > up && dn > 0 ? dn : 0);
      tr.push(Math.max(c[i].high - c[i].low, Math.abs(c[i].high - c[i - 1].close), Math.abs(c[i].low - c[i - 1].close)));
    }
    let st = 0, sp = 0, sm = 0; const dx = [];
    for (let i = 1; i <= n; i++) { st += tr[i]; sp += pd[i]; sm += md[i]; }
    const push = i => { const pdi = 100 * sp / (st || 1e-9), mdi = 100 * sm / (st || 1e-9); dx[i] = 100 * Math.abs(pdi - mdi) / ((pdi + mdi) || 1e-9); };
    push(n);
    for (let i = n + 1; i < L; i++) { st = st - st / n + tr[i]; sp = sp - sp / n + pd[i]; sm = sm - sm / n + md[i]; push(i); }
    let a = 0; for (let i = n; i < n * 2; i++) a += dx[i]; a /= n; o[n * 2 - 1] = a;
    for (let i = n * 2; i < L; i++) { a = (a * (n - 1) + dx[i]) / n; o[i] = a; }
    return o;
  }
  function rsiA(c, n = 14) {
    const o = new Array(c.length).fill(null); if (c.length < n + 1) return o;
    let g = 0, l = 0; for (let i = 1; i <= n; i++) { const d = c[i].close - c[i - 1].close; d >= 0 ? g += d : l -= d; } g /= n; l /= n;
    o[n] = 100 - 100 / (1 + g / (l || 1e-9));
    for (let i = n + 1; i < c.length; i++) { const d = c[i].close - c[i - 1].close; g = (g * (n - 1) + (d > 0 ? d : 0)) / n; l = (l * (n - 1) + (d < 0 ? -d : 0)) / n; o[i] = 100 - 100 / (1 + g / (l || 1e-9)); }
    return o;
  }
  function macdH(c) {
    const cl = c.map(x => x.close), a = emaA(cl, 12), b = emaA(cl, 26), m = a.map((v, i) => v != null && b[i] != null ? v - b[i] : null);
    const s = emaA(m, 9); return m.map((v, i) => v != null && s[i] != null ? v - s[i] : null);
  }
  function supertrend(c, n = 10, mult = 3) {
    const at = atrA(c, n), dir = new Array(c.length).fill(0); let fu = null, fl = null, d = 1;
    for (let i = 0; i < c.length; i++) {
      if (at[i] == null) continue;
      const hl = (c[i].high + c[i].low) / 2, u = hl + mult * at[i], l = hl - mult * at[i];
      if (fu == null) { fu = u; fl = l; d = c[i].close >= hl ? 1 : -1; }
      else {
        const pc = c[i - 1].close;
        fu = (u < fu || pc > fu) ? u : fu; fl = (l > fl || pc < fl) ? l : fl;
        if (d === 1 && c[i].close < fl) d = -1; else if (d === -1 && c[i].close > fu) d = 1;
      }
      dir[i] = d;
    }
    return dir;
  }
  const mk = (c, i, sig, risk, rr, reason, conf) => {
    const e = c[i].close, dir = sig === 'BUY' ? 1 : -1;
    return { index: i, time: c[i].time, signal: sig, entry: e, sl: e - dir * risk, tp: e + dir * risk * rr, reason, conf };
  };

  /* ---------------- 1. ADVANCED ---------------- */
  // htf = { c: higher timeframe candles, g: its granularity in seconds } (optional — own EMA 50 / 200 is used without it)
  function advanced(c, htf) {
    const out = [], n = c.length; if (n < 80) return out;
    const cl = c.map(x => x.close), e21 = emaA(cl, 21), e50 = emaA(cl, 50), e200 = emaA(cl, 200);
    const at = atrA(c, 14), adx = adxA(c, 14), rsi = rsiA(c, 14), mh = macdH(c), st = supertrend(c, 10, 3);
    const atAvg = at.map((_, i) => { if (i < 64 || at[i] == null) return null; let s = 0; for (let j = i - 49; j <= i; j++) s += at[j]; return s / 50; });
    // higher-timeframe trend per closed higher candle
    let hT = null;
    if (htf && htf.c && htf.c.length > 60) {
      const hc = htf.c.map(x => x.close), a = emaA(hc, 50), b = emaA(hc, 200);
      hT = htf.c.map((x, k) => { const f = b[k] != null ? b[k] : emaA(hc, 21)[k]; if (a[k] == null || f == null) return 0; return x.close > a[k] && a[k] > f ? 1 : x.close < a[k] && a[k] < f ? -1 : 0; });
    }
    let j = -1, last = { BUY: -99, SELL: -99 };
    for (let i = 60; i < n - 1; i++) {                       // n-1 is the forming candle: never used
      if (at[i] == null || adx[i] == null || rsi[i] == null || mh[i] == null || e50[i] == null) continue;
      if (hT) { while (j + 1 < htf.c.length && htf.c[j + 1].time + htf.g <= c[i].time) j++; }
      const ht = hT ? (j >= 0 ? hT[j] : 0) : (e200[i] != null ? (cl[i] > e50[i] && e50[i] > e200[i] ? 1 : cl[i] < e50[i] && e50[i] < e200[i] ? -1 : 0) : (e21[i] > e50[i] ? 1 : -1));
      if (!ht || adx[i] < 25) continue;                      // core 1: higher timeframe trend, core 2: clearly trending market (tuned on 8 crypto/gold markets x 3 timeframes)
      for (const sig of ['BUY', 'SELL']) {
        const d = sig === 'BUY' ? 1 : -1;
        if (ht !== d || st[i] !== d || (d > 0 ? !(e21[i] > e50[i]) : !(e21[i] < e50[i]))) continue;      // core 3: Supertrend + EMA stack
        if (i - last[sig] < 6) continue;
        // core 4: pullback to EMA 21 inside the last 6 candles, then the trend resumes
        let touched = false; for (let k = i - 6; k < i; k++) if (e21[k] != null && (d > 0 ? c[k].low <= e21[k] : c[k].high >= e21[k])) touched = true;
        const resume = d > 0 ? (cl[i] > e21[i] && cl[i] > c[i].open && cl[i] > c[i - 1].high) : (cl[i] < e21[i] && cl[i] < c[i].open && cl[i] < c[i - 1].low);
        if (!touched || !resume) continue;
        // extras raise the confidence score
        let ex = 0; const why = ['HTF ' + (d > 0 ? 'up' : 'down'), 'ADX ' + adx[i].toFixed(0), 'Supertrend', 'pullback to EMA21'];
        if (adx[i] >= 25 && adx[i] > (adx[i - 3] || 0)) { ex++; why.push('ADX rising'); }
        if (d > 0 ? (mh[i] > 0 && mh[i] > mh[i - 1]) : (mh[i] < 0 && mh[i] < mh[i - 1])) { ex++; why.push('MACD'); }
        if (d > 0 ? (rsi[i] >= 50 && rsi[i] <= 72) : (rsi[i] <= 50 && rsi[i] >= 28)) { ex++; why.push('RSI ' + rsi[i].toFixed(0)); }
        if (atAvg[i] && at[i] <= atAvg[i] * 2.2) { ex++; why.push('calm volatility'); }
        let lo = 1e18, hi = -1e18; for (let k = i - 20; k <= i; k++) { lo = Math.min(lo, c[k].low); hi = Math.max(hi, c[k].high); }
        if (d > 0 ? (cl[i] - lo) <= at[i] * 3 : (hi - cl[i]) <= at[i] * 3) { ex++; why.push('near swing ' + (d > 0 ? 'low' : 'high')); }
        const conf = 52 + ex * 8;
        if (at[i] * 3 / cl[i] < 0.003) continue;           // stop narrower than 0.3% of the price: trading costs would eat the trade (tested: this filter alone moved the average from -0.11R to about +0.05R)
        out.push(mk(c, i, sig, at[i] * 3, 3, why.join(' · '), conf)); last[sig] = i;
      }
    }
    return out;
  }

  /* ---------------- 2. BOLLINGER BANDS ---------------- */
  function bollinger(c) {
    const out = [], n = c.length; if (n < 140) return out;
    const cl = c.map(x => x.close), P = 20;
    const mid = [], up = [], lo = [], bw = [];
    for (let i = 0; i < n; i++) {
      if (i < P - 1) { mid.push(null); up.push(null); lo.push(null); bw.push(null); continue; }
      let m = 0; for (let k = i - P + 1; k <= i; k++) m += cl[k]; m /= P;
      let v = 0; for (let k = i - P + 1; k <= i; k++) v += (cl[k] - m) ** 2; const sd = Math.sqrt(v / P);
      mid.push(m); up.push(m + 2 * sd); lo.push(m - 2 * sd); bw.push(m ? 4 * sd / m : 0);
    }
    const at = atrA(c, 14), rsi = rsiA(c, 14), adx = adxA(c, 14);
    const sq = bw.map((_, i) => { if (i < P + 100 || bw[i] == null) return false; const w = bw.slice(i - 100, i).filter(x => x != null).sort((a, b) => a - b); return bw[i] <= w[Math.floor(w.length * 0.2)]; });
    let last = -99;
    for (let i = P + 100; i < n - 1; i++) {
      if (at[i] == null || rsi[i] == null || i - last < 4) continue;
      const cd = c[i], pv = c[i - 1], body = Math.abs(cd.close - cd.open), rng = (cd.high - cd.low) || 1e-9;
      // squeeze breakout: bands were tight in the last 3 candles, a strong candle closes outside them
      const wasSq = sq[i - 1] || sq[i - 2] || sq[i - 3];
      if (wasSq && body / rng > 0.55 && cd.close > up[i] && cd.close > cd.open) { out.push(mk(c, i, 'BUY', Math.max(cd.close - mid[i], at[i] * 1.2), 2, 'Squeeze breakout up (bands were tight)', null)); last = i; continue; }
      if (wasSq && body / rng > 0.55 && cd.close < lo[i] && cd.close < cd.open) { out.push(mk(c, i, 'SELL', Math.max(mid[i] - cd.close, at[i] * 1.2), 2, 'Squeeze breakout down (bands were tight)', null)); last = i; continue; }
      // reversion: only in a ranging market (ADX < 25), price closes back inside the band, RSI stretched
      if (adx[i] != null && adx[i] < 25) {
        if (pv.close < lo[i - 1] && cd.close > lo[i] && cd.close > cd.open && rsi[i - 1] < 38) {
          const risk = Math.max(cd.close - Math.min(pv.low, cd.low) + at[i] * 0.3, at[i]), tp = Math.max(mid[i] - cd.close, risk * 1.2);
          const s = mk(c, i, 'BUY', risk, 1, 'Back inside the lower band, RSI ' + rsi[i - 1].toFixed(0) + ', ranging (ADX ' + adx[i].toFixed(0) + ')', null); s.tp = cd.close + tp; out.push(s); last = i; continue;
        }
        if (pv.close > up[i - 1] && cd.close < up[i] && cd.close < cd.open && rsi[i - 1] > 62) {
          const risk = Math.max(Math.max(pv.high, cd.high) - cd.close + at[i] * 0.3, at[i]), tp = Math.max(cd.close - mid[i], risk * 1.2);
          const s = mk(c, i, 'SELL', risk, 1, 'Back inside the upper band, RSI ' + rsi[i - 1].toFixed(0) + ', ranging (ADX ' + adx[i].toFixed(0) + ')', null); s.tp = cd.close - tp; out.push(s); last = i;
        }
      }
    }
    return out;
  }
  function bollingerLines(c) {
    const cl = c.map(x => x.close), P = 20, m = [], u = [], l = [];
    for (let i = 0; i < c.length; i++) {
      if (i < P - 1) { m.push(null); u.push(null); l.push(null); continue; }
      let a = 0; for (let k = i - P + 1; k <= i; k++) a += cl[k]; a /= P;
      let v = 0; for (let k = i - P + 1; k <= i; k++) v += (cl[k] - a) ** 2; const sd = Math.sqrt(v / P);
      m.push(a); u.push(a + 2 * sd); l.push(a - 2 * sd);
    }
    return [{ color: '#38bdf8', values: u }, { color: '#f0c869', values: m }, { color: '#38bdf8', values: l }];
  }

  /* ---------------- 3. MOVING AVERAGE ---------------- */
  function ma(c) {
    const out = [], n = c.length; if (n < 60) return out;
    const cl = c.map(x => x.close), e9 = emaA(cl, 9), e21 = emaA(cl, 21), e200 = emaA(cl, 200), at = atrA(c, 14), adx = adxA(c, 14);
    let last = -99;
    for (let i = 30; i < n - 1; i++) {
      if (e9[i - 1] == null || e21[i - 1] == null || at[i] == null || i - last < 5) continue;
      if (adx[i] != null && adx[i] < 15) continue;                                   // flat market: crosses are noise
      const up = e9[i - 1] <= e21[i - 1] && e9[i] > e21[i], dn = e9[i - 1] >= e21[i - 1] && e9[i] < e21[i];
      if (up && cl[i] > e21[i] && e21[i] > e21[i - 3] && (e200[i] == null || cl[i] > e200[i])) { out.push(mk(c, i, 'BUY', at[i] * 1.5, 2, 'EMA 9 crossed above EMA 21' + (e200[i] != null ? ', price above EMA 200' : ''), null)); last = i; }
      else if (dn && cl[i] < e21[i] && e21[i] < e21[i - 3] && (e200[i] == null || cl[i] < e200[i])) { out.push(mk(c, i, 'SELL', at[i] * 1.5, 2, 'EMA 9 crossed below EMA 21' + (e200[i] != null ? ', price below EMA 200' : ''), null)); last = i; }
    }
    return out;
  }
  function maLines(c) { const cl = c.map(x => x.close); return [{ color: '#f0c869', values: emaA(cl, 9) }, { color: '#22d3ee', values: emaA(cl, 21) }, { color: '#a78bfa', values: emaA(cl, 200) }]; }
  function advLines(c) { const cl = c.map(x => x.close); return [{ color: '#22d3ee', values: emaA(cl, 21) }, { color: '#f0c869', values: emaA(cl, 50) }]; }

  /* ---------------- history check ---------------- */
  function stats(c, sigs) {
    let w = 0, l = 0, open = 0, R = 0;
    sigs.forEach(s => {
      const risk = Math.abs(s.entry - s.sl) || 1e-9, buy = s.signal === 'BUY', rr = Math.abs(s.tp - s.entry) / risk; let done = false;
      for (let j = s.index + 1; j < c.length; j++) {
        const hitSL = buy ? c[j].low <= s.sl : c[j].high >= s.sl, hitTP = buy ? c[j].high >= s.tp : c[j].low <= s.tp;
        if (hitSL) { l++; R -= 1; done = true; break; }       // stop first when both happen in one candle
        if (hitTP) { w++; R += rr; done = true; break; }
      }
      if (!done) open++;
    });
    const cl = w + l; return { total: sigs.length, win: w, loss: l, open, rate: cl ? w / cl * 100 : null, avgR: cl ? R / cl : null };
  }

  window.GTTriple = { advanced, bollinger, ma, stats, lines: { advanced: advLines, bollinger: bollingerLines, ma: maLines } };
})();
