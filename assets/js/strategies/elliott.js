/* ============================================================
   G TRADERS — Elliott Wave counter (rules-based, from CLOSED candles only)
   This is NOT a trade-signal engine.  It draws the wave count that obeys the hard rules, and it
   removes / re-counts it when price breaks the count's invalidation level.  Every failed count is kept
   in a log (never hidden).  Tested: counts are identical when the history is cut at any earlier candle
   (no repainting of confirmed waves).

   Hard rules used (from Prechter / Frost, Elliott Wave Principle):
     impulse  : wave 2 never retraces more than 100% of wave 1
                wave 3 is never the shortest of waves 1, 3 and 5
                wave 4 never enters the price territory of wave 1   (no diagonals: they are not counted)
                wave 3 ends beyond the end of wave 1
     zigzag   : B never passes the start of A, C ends beyond the end of A
     flat     : B retraces at least 90% of A (up to 161.8% = expanded flat); C reaches about the end of A
                (a C that falls short is flagged "running flat", which is rare)
   Not decided by rules (so NOT guessed): triangles, combinations, diagonals, wave degree labels.
   Guidelines (Fibonacci depth of 2/4, wave 3 extension, alternation, wave 5 = wave 1 ...) only give a score.
   ============================================================ */
(function () {
  const EPS = 1e-12;
  function atr(c, n = 14) {
    const o = new Array(c.length).fill(null); let a = null;
    for (let i = 1; i < c.length; i++) {
      const tr = Math.max(c[i].high - c[i].low, Math.abs(c[i].high - c[i - 1].close), Math.abs(c[i].low - c[i - 1].close));
      if (i < n) { a = (a || 0) + tr; if (i === n - 1) { a /= n - 1; } if (i >= n - 1) o[i] = a; }
      else { a = (a * (n - 1) + tr) / n; o[i] = a; }
    }
    return o;
  }

  // confirmed pivots: a pivot is only reported after price has reversed k x ATR from it ("conf" = candle that confirmed it)
  function pivots(c, at, k) {
    const P = []; let dir = 0, hi = c[0].high, hiI = 0, lo = c[0].low, loI = 0;
    for (let i = 1; i < c.length; i++) {
      const a = at[i];
      if (a == null) { if (c[i].high > hi) { hi = c[i].high; hiI = i; } if (c[i].low < lo) { lo = c[i].low; loI = i; } continue; }
      const th = k * a;
      if (dir === 0) {
        if (c[i].high > hi) { hi = c[i].high; hiI = i; } if (c[i].low < lo) { lo = c[i].low; loI = i; }
        if (hi - lo >= th) { if (hiI > loI) { P.push({ i: loI, p: lo, t: 'L', conf: i }); dir = 1; hi = c[i].high; hiI = i; } else { P.push({ i: hiI, p: hi, t: 'H', conf: i }); dir = -1; lo = c[i].low; loI = i; } }
      } else if (dir === 1) {
        if (c[i].high > hi) { hi = c[i].high; hiI = i; } else if (hi - c[i].low >= th) { P.push({ i: hiI, p: hi, t: 'H', conf: i }); dir = -1; lo = c[i].low; loI = i; }
      } else {
        if (c[i].low < lo) { lo = c[i].low; loI = i; } else if (c[i].high - lo >= th) { P.push({ i: loI, p: lo, t: 'L', conf: i }); dir = 1; hi = c[i].high; hiI = i; }
      }
    }
    return P;
  }

  /* ---------- impulse check (m = 3..6 pivots p0..p5; d = +1 up / -1 down) ---------- */
  // returns { ok, why } and, when ok, { inval:[{p,dir,txt}], targets:[{p,txt}], score, notes:[] }
  function impulse(p, d) {
    const m = p.length, L = (a, b) => (b - a) * d;           // signed length in the impulse direction
    if (m < 3 || m > 6) return { ok: false, why: 'size' };
    const w1 = L(p[0], p[1]); if (w1 <= EPS) return { ok: false, why: 'wave 1 has no length' };
    if (L(p[2], p[1]) <= EPS) return { ok: false, why: 'wave 2 does not go back' };
    if (L(p[0], p[2]) <= EPS) return { ok: false, why: 'RULE: wave 2 retraced more than 100% of wave 1' };
    const w2 = L(p[2], p[1]);
    let w3, w4, w5;
    if (m >= 4) { w3 = L(p[2], p[3]); if (w3 <= EPS) return { ok: false, why: 'wave 3 has no length' }; if (L(p[1], p[3]) <= EPS) return { ok: false, why: 'RULE: wave 3 does not end beyond wave 1' }; }
    if (m >= 5) { w4 = L(p[4], p[3]); if (w4 <= EPS) return { ok: false, why: 'wave 4 does not go back' }; if (L(p[1], p[4]) <= EPS) return { ok: false, why: 'RULE: wave 4 entered the territory of wave 1' }; }
    if (m === 6) {
      w5 = L(p[4], p[5]); if (w5 <= EPS) return { ok: false, why: 'wave 5 has no length' };
      if (w3 < w1 - EPS && w3 < w5 - EPS) return { ok: false, why: 'RULE: wave 3 is the shortest wave' };
    }
    if (m === 5 && w3 < w1 - EPS) { /* allowed only if wave 5 stays shorter than wave 3 */ }
    // ---- guideline score (never rejects) ----
    let sc = 0, tot = 0; const notes = [];
    const chk = (cond, label) => { tot++; if (cond) { sc++; notes.push('✓ ' + label); } else notes.push('~ ' + label); };
    const r2 = w2 / w1; chk(r2 >= 0.382 && r2 <= 0.786, 'wave 2 retraced ' + (r2 * 100).toFixed(0) + '% of wave 1 (usual 38–79%)');
    if (m >= 4) chk(w3 >= 1.618 * w1 || (m === 6 && w3 >= w1 && w3 >= w5), 'wave 3 is long (' + (w3 / w1).toFixed(2) + ' × wave 1)');
    if (m >= 5) { const r4 = w4 / w3; chk(r4 >= 0.236 && r4 <= 0.5, 'wave 4 retraced ' + (r4 * 100).toFixed(0) + '% of wave 3 (usual 24–50%)'); chk(Math.abs(r2 - r4) > 0.15, 'waves 2 and 4 differ in depth (alternation)'); }
    if (m === 6) { const q = w5 / w1; chk((q >= 0.8 && q <= 1.25) || Math.abs(w5 / L(p[0], p[3]) - 0.618) < 0.12, 'wave 5 is ' + q.toFixed(2) + ' × wave 1'); if (L(p[3], p[5]) <= 0) notes.push('~ wave 5 is truncated (ends short of wave 3)'); }
    const inval = [], targets = [], f = (a, k) => a + d * k;
    if (m === 3) { inval.push({ p: p[0], dir: -d, txt: 'close beyond the start of wave 1: wave 2 would retrace more than 100%' }); [1, 1.618, 2.618].forEach(k => targets.push({ p: f(p[2], k * w1), txt: 'wave 3 = ' + k + ' × wave 1' })); }
    if (m === 4) { inval.push({ p: p[1], dir: -d, txt: 'close back beyond the end of wave 1: wave 4 would enter wave 1 territory' }); [0.236, 0.382, 0.5].forEach(k => targets.push({ p: p[3] - d * k * w3, txt: 'wave 4 = ' + k + ' of wave 3' })); }
    if (m === 5) { inval.push({ p: p[1], dir: -d, txt: 'close back beyond the end of wave 1: wave 4 entered wave 1 territory' }); [0.618, 1].forEach(k => targets.push({ p: f(p[4], k * w1), txt: 'wave 5 = ' + k + ' × wave 1' })); targets.push({ p: f(p[4], 0.618 * L(p[0], p[3])), txt: 'wave 5 = 0.618 × waves 1–3' }); if (w3 < w1 - EPS) notes.push('~ wave 3 is shorter than wave 1: wave 5 must stay shorter than wave 3'); }
    if (m === 6) { inval.push({ p: p[5], dir: d, txt: 'close beyond the end of wave 5: wave 5 is extending' }); [0.382, 0.5, 0.618].forEach(k => targets.push({ p: p[5] - d * k * L(p[0], p[5]), txt: 'correction = ' + k + ' of waves 1–5' })); }
    return { ok: true, score: tot ? sc / tot : 0, notes, inval, targets };
  }

  /* ---------- corrective check (q0 = end of the impulse; q1 = A, q2 = B, q3 = C) ---------- */
  function corrective(q, dA) {
    const m = q.length, L = (a, b) => (b - a) * dA;
    if (m < 2 || m > 4) return { ok: false, why: 'size' };
    const A = L(q[0], q[1]); if (A <= EPS) return { ok: false, why: 'wave A has no length' };
    const notes = []; let kind = 'A-B-C', sc = 0, tot = 0; const chk = (cond, label) => { tot++; if (cond) { sc++; notes.push('✓ ' + label); } else notes.push('~ ' + label); };
    const inval = [], targets = [];
    if (m === 2) { inval.push({ p: q[1], dir: dA, txt: 'close beyond the end of wave A: wave A is extending' }); return { ok: true, kind, score: 0, notes: ['wave A is in place, wave B is developing'], inval, targets }; }
    const Bl = L(q[2], q[1]); if (Bl <= EPS) return { ok: false, why: 'wave B does not go back' };
    const bR = Bl / A;
    if (bR > 1.618) return { ok: false, why: 'RULE: wave B retraced more than 161.8% of wave A' };
    kind = bR < 0.9 ? 'zigzag' : (bR <= 1.05 ? 'flat' : 'expanded flat');
    chk(bR >= 0.382 && bR <= 0.886 || (bR >= 0.9 && bR <= 1.382), 'wave B = ' + (bR * 100).toFixed(0) + '% of wave A');
    if (m === 3) {
      inval.push({ p: q[2], dir: -dA, txt: 'close beyond the end of wave B: wave B is extending' });
      [1, 1.618].forEach(k => targets.push({ p: q[2] + dA * k * A, txt: 'wave C = ' + k + ' × wave A' }));
      return { ok: true, kind, score: tot ? sc / tot : 0, notes: notes.concat(['wave C is developing']), inval, targets };
    }
    const Cl = L(q[2], q[3]); if (Cl <= EPS) return { ok: false, why: 'wave C has no length' };
    const beyondA = L(q[1], q[3]) > 0;
    if (kind === 'zigzag' && !beyondA) return { ok: false, why: 'RULE: in a zigzag wave C must end beyond the end of wave A' };
    if (kind === 'expanded flat' && !beyondA) { kind = 'running flat'; notes.push('~ running flat: C fell short of A (rare)'); }
    if (kind === 'flat' && Cl < 0.9 * A) { kind = 'running flat'; notes.push('~ running flat: C fell short of A (rare)'); }
    chk(Cl / A >= 1 && Cl / A <= 1.618, 'wave C = ' + (Cl / A).toFixed(2) + ' × wave A');
    inval.push({ p: q[3], dir: dA, txt: 'close beyond the end of wave C: wave C is extending' });
    return { ok: true, kind, score: tot ? sc / tot : 0, notes, inval, targets };
  }

  /* ---------- best count from the confirmed pivots ---------- */
  // pivot prices come from P (alternating H/L).  Returns the best structure + the alternates (ranked)
  function analyze(P) {
    const n = P.length, cands = [];
    const dirOf = (a, b) => (b.p > a.p ? 1 : -1);
    // A) impulse (in progress or complete) ending at the latest pivot
    for (let m = 3; m <= 6; m++) {
      if (n < m) break; const sl = P.slice(n - m), d = dirOf(sl[0], sl[1]); const r = impulse(sl.map(x => x.p), d);
      if (r.ok) cands.push({ type: 'impulse', m, d, piv: sl, imp: r, cor: null, score: r.score, wavesDone: m - 1 });
    }
    // B) a complete impulse followed by a correction A / A-B / A-B-C
    for (let tail = 1; tail <= 3; tail++) {
      const e = n - 1 - tail; if (e < 5) continue;
      const sl = P.slice(e - 5, e + 1), d = dirOf(sl[0], sl[1]); const r = impulse(sl.map(x => x.p), d); if (!r.ok) continue;
      const q = P.slice(e, n); if (dirOf(q[0], q[1]) !== -d) continue;
      const cr = corrective(q.map(x => x.p), -d); if (!cr.ok) continue;
      cands.push({ type: 'impulse+correction', m: 6, d, piv: sl.concat(q.slice(1)), imp: r, cor: { kind: cr.kind, piv: q, res: cr }, score: (r.score + cr.score) / 2, wavesDone: 5 + tail });
    }
    // rank: more confirmed waves first, then guideline score, then the more recent start
    cands.sort((a, b) => (b.wavesDone - a.wavesDone) || (b.score - a.score));
    return cands;
  }

  /* ---------- walk-forward replay: the count as it would have been drawn live, candle by candle ---------- */
  // returns { active, history, pivots }.  Only closed candles in c are used.
  function replay(c, k) {
    const at = atr(c, 14), P = pivots(c, at, k), hist = []; let cur = null, pi = 0, conf = [], dead = new Set(), cands = [];
    const sig = cd => cd.piv.map(x => x.i).join('-');
    const levelsOf = cd => (cd.cor ? cd.cor.res.inval : cd.imp.inval);
    const broken = (cd, t) => levelsOf(cd).find(v => (v.dir > 0 ? c[t].close > v.p : c[t].close < v.p));
    const close = (reason, t, how) => { if (!cur) return; hist.push({ born: cur.born, died: t, sig: cur.sig, type: cur.cand.type, m: cur.cand.m, d: cur.cand.d, how, reason, piv: cur.cand.piv, cor: cur.cand.cor ? cur.cand.cor.kind : null }); cur = null; };
    const pick = t => { for (const cd of cands) { const s = sig(cd); if (dead.has(s)) continue; if (broken(cd, t)) continue; return cd; } return null; };
    for (let t = 0; t < c.length; t++) {
      // 1) price-based invalidation (on the close of candle t)
      if (cur) { const v = broken(cur.cand, t); if (v) { dead.add(cur.sig); close(v.txt, t, 'invalidated'); } }
      // 2) a new confirmed pivot -> recount
      let added = false; while (pi < P.length && P[pi].conf <= t) { conf.push(P[pi]); pi++; added = true; }
      if (added) { cands = analyze(conf); dead = new Set(); }
      // 3) choose / keep the best count that is still alive
      if (added || !cur) {
        const best = pick(t);
        if (best) {
          const s = sig(best);
          if (!cur || cur.sig !== s) {
            if (cur) { const prevFirst = cur.cand.piv[0].i; const same = best.piv.some(x => x.i === prevFirst); close(same ? 'the count moved on to the next wave' : 'a different count now fits the rules better', t, same ? 'progressed' : 'replaced'); }
            cur = { born: t, sig: s, cand: best, alts: cands.filter(x => sig(x) !== s) };
          }
        } else if (cur && added) { close('no count fits the rules any more', t, 'replaced'); }
      }
    }
    return { active: cur, history: hist, pivots: conf, atr: at };
  }

  window.GTElliott = { atr, pivots, impulse, corrective, analyze, replay, K: { large: 6, medium: 4, small: 2.5 } };
})();
