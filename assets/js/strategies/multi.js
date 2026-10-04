/* ============================================================
   Multi signal — fires only when at least 2 of 4 engines agree
   (EMA cross, Bollinger, SMC, GTM) within 3 candles of each other.
   ============================================================ */
const MultiConfirmStrategy = {
  name: 'Multi signal (2 of 4 engines agree)',
  short: 'Multi',
  defaults: {},
  detect(c) {
    const all = [
      ...EMACrossStrategy.detect(c).map(s => ({ ...s, src: 'EMA' })),
      ...BollingerStrategy.detect(c).map(s => ({ ...s, src: 'BB' })),
      ...SMCStrategy.detect(c).map(s => ({ ...s, src: 'SMC' })),
      ...GTMStrategy.detect(c).map(s => ({ ...s, src: 'GTM' }))
    ].sort((a, b) => a.index - b.index);
    const out = [], used = new Set();
    for (let i = 0; i < all.length; i++) {
      if (used.has(i)) continue;
      const grp = [all[i]];
      for (let j = i + 1; j < all.length && all[j].index - all[i].index <= 3; j++)
        if (!used.has(j) && all[j].signal === all[i].signal && !grp.some(g => g.src === all[j].src)) { grp.push(all[j]); used.add(j); }
      if (grp.length >= 2) {
        used.add(i);
        const last = grp.reduce((a, b) => b.index > a.index ? b : a);
        const sl = grp.map(g => g.sl), entry = last.entry;
        const stop = last.signal === 'BUY' ? Math.min(...sl) : Math.max(...sl);
        out.push({ ...last, sl: stop, tp: entry + (entry - stop) * 2, strength: grp.length,
          reason: `${grp.map(g => g.src).join(' + ')} agree (${grp.length}/4)` });
      }
    }
    return out;
  },
  lines(c) { return GTMStrategy.lines(c); }
};
window.MultiConfirmStrategy = MultiConfirmStrategy;
