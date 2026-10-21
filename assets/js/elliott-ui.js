/* G TRADERS — Elliott Wave counter on its own chart (follows the market + timeframe chosen above).
   Draws the rules-based count; removes it when it is invalidated and counts again; keeps a log of failed counts.
   Not a signal: no entry, no stop, no profit promise. */
(function () {
  const $ = id => document.getElementById(id), root = $('ew'); if (!root || !window.GTSigLC || !window.GTElliott) return;
  const lc = window.GTSigLC, E = window.GTElliott;
  const SET_KEY = 'gt_ew_set';
  let S = { deg: 'medium', tl: true, tt: true, cl: true, ct: true, inv: true, tgt: false, failed: false };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(SET_KEY) || '{}')); } catch (e) { }
  const save = () => { try { localStorage.setItem(SET_KEY, JSON.stringify(S)); } catch (e) { } };
  const fmt = v => v == null ? '—' : lc.fmt(v);
  const COL = { trend: '#38bdf8', counter: '#f59e0b', fail: '#94a3b8', inval: '#f43f5e', tgt: '#f0c869' };
  const NUM = ['0', '1', '2', '3', '4', '5'], ABC = ['', 'A', 'B', 'C'];

  const el = $('ew-chart');
  const ch = LightweightCharts.createChart(el, { width: el.clientWidth || 600, height: 440,
    layout: { background: { color: '#05080f' }, textColor: '#cfd8e6', fontSize: 11 }, grid: { vertLines: { color: '#0f1726' }, horzLines: { color: '#0f1726' } },
    timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#1f2b3f', rightOffset: 10 }, rightPriceScale: { borderColor: '#1f2b3f', minimumWidth: 86 }, crosshair: { mode: 0 } });
  const cs = ch.addCandlestickSeries({ upColor: '#29d67c', downColor: '#ff5b6a', wickUpColor: '#29d67c', wickDownColor: '#ff5b6a', borderVisible: false });
  new ResizeObserver(() => { if (el.clientWidth) ch.applyOptions({ width: el.clientWidth, height: el.clientHeight }); }).observe(el);
  let lines = [], plines = [], lastKey = '', timer = null;

  // ---- settings controls ----
  function ctl() {
    $('ew-deg').value = S.deg;
    [['tl', 'ew-tl'], ['tt', 'ew-tt'], ['cl', 'ew-cl'], ['ct', 'ew-ct'], ['inv', 'ew-inv'], ['tgt', 'ew-tgt'], ['failed', 'ew-failed']].forEach(([k, id]) => { const x = $(id); x.checked = !!S[k]; x.onchange = () => { S[k] = x.checked; save(); draw(true); }; });
    $('ew-deg').onchange = e => { S.deg = e.target.value; save(); draw(true); };
  }
  ctl();

  const line = (pts, color, style, width) => {
    const s = ch.addLineSeries({ color, lineWidth: width || 2, lineStyle: style || 0, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false });
    s.setData(pts); lines.push(s); return s;
  };
  const tm = (c, i) => c[Math.min(i, c.length - 1)].time;

  // draw one structure: pivots piv (array of {i,p,t}), labels, color; "live" leg to the latest candle
  function drawStruct(c, piv, labels, color, showL, showT, markers, live, last) {
    if (showL) for (let j = 0; j + 1 < piv.length; j++) line([{ time: tm(c, piv[j].i), value: piv[j].p }, { time: tm(c, piv[j + 1].i), value: piv[j + 1].p }], color, 0, 2);
    if (showL && live && last) line([{ time: tm(c, piv[piv.length - 1].i), value: piv[piv.length - 1].p }, { time: last.time, value: last.price }], color, 2, 1);
    if (showT) piv.forEach((x, j) => { if (labels[j] === '' || labels[j] == null) return; markers.push({ time: tm(c, x.i), position: x.t === 'H' ? 'aboveBar' : 'belowBar', color, shape: 'circle', size: 0.4, text: labels[j] }); });
  }

  function draw(force) {
    const all = lc.candles; if (!all || all.length < 80) { $('ew-info').innerHTML = '<span class="muted">Waiting for enough candles…</span>'; return; }
    const c = all.slice(0, -1), live = all[all.length - 1];     // the forming candle is never counted
    const key = (lc.meta ? lc.meta.symbol : '') + '|' + lc.gran + '|' + c.length + '|' + c[c.length - 1].time + '|' + S.deg;
    if (!force && key === lastKey) return; lastKey = key;
    $('ew-sym').textContent = (lc.meta ? lc.meta.display_name : '') + ' · ' + ((window.GTMarket && GTMarket.TF.find(t => t[1] === lc.gran) || [''])[0]);
    cs.applyOptions({ priceFormat: { type: 'price', precision: lc.digits, minMove: Math.pow(10, -lc.digits) } });
    cs.setData(all);
    lines.forEach(l => { try { ch.removeSeries(l); } catch (e) { } }); lines = [];
    plines.forEach(p => { try { cs.removePriceLine(p); } catch (e) { } }); plines = [];
    const R = E.replay(c, E.K[S.deg] || 4), A = R.active, markers = [];
    // failed counts (ghosts) — only the invalidated ones of the last stretch
    const failed = R.history.filter(h => h.how === 'invalidated');
    if (S.failed) failed.slice(-6).forEach(h => { const lab = h.piv.map(() => ''); line(h.piv.map(x => ({ time: tm(c, x.i), value: x.p })).filter((v, i, a) => i === 0 || v.time > a[i - 1].time), COL.fail, 1, 1); markers.push({ time: tm(c, h.piv[h.piv.length - 1].i), position: h.piv[h.piv.length - 1].t === 'H' ? 'aboveBar' : 'belowBar', color: COL.fail, shape: 'square', size: 0.4, text: '×' }); });
    let txt = '', last = { time: live.time, price: live.close };
    if (A) {
      const cd = A.cand, d = cd.d;
      if (cd.type === 'impulse') {
        const lab = cd.piv.map((x, j) => '(' + NUM[j] + ')'); lab[0] = '(0)';
        drawStruct(c, cd.piv, lab, COL.trend, S.tl, S.tt, markers, true, last);
      } else {
        const imp = cd.piv.slice(0, 6), cor = cd.piv.slice(5);
        drawStruct(c, imp, imp.map((x, j) => '(' + NUM[j] + ')'), COL.trend, S.tl, S.tt, markers, false);
        drawStruct(c, cor, cor.map((x, j) => j === 0 ? '' : '(' + ABC[j] + ')'), COL.counter, S.cl, S.ct, markers, true, last);
      }
      const lv = (cd.cor ? cd.cor.res.inval : cd.imp.inval), tg = (cd.cor ? cd.cor.res.targets : cd.imp.targets);
      if (S.inv) lv.forEach(v => plines.push(cs.createPriceLine({ price: v.p, color: COL.inval, lineWidth: 1, lineStyle: 2, axisLabelVisible: true, title: 'Invalid' })));
      if (S.tgt) tg.forEach(v => plines.push(cs.createPriceLine({ price: v.p, color: COL.tgt, lineWidth: 1, lineStyle: 3, axisLabelVisible: true, title: v.txt.replace('wave ', 'w') })));
      const nm = { 3: 'wave 3 is developing', 4: 'wave 4 is developing', 5: 'wave 5 is developing', 6: 'five waves are complete — a correction is expected' };
      const dirT = d > 0 ? 'up' : 'down';
      const waveNow = cd.type === 'impulse' ? nm[cd.m] : ({ 7: 'wave A is in place, wave B is developing', 8: 'wave A-B in place, wave C is developing', 9: 'wave A-B-C complete' }[cd.piv.length] || '');
      const notes = (cd.imp.notes || []).concat(cd.cor ? cd.cor.res.notes : []);
      txt += `<div class="ew-now"><b style="color:${COL.trend}">Trend count:</b> impulse ${dirT} — ${GT.esc(waveNow)}${cd.cor ? ` <b style="color:${COL.counter}">· Counter-trend:</b> ${GT.esc(cd.cor.kind)} correction` : ''}</div>`;
      txt += `<div class="ew-inv">Count is cancelled if: ${lv.map(v => GT.esc(v.txt) + ' (' + fmt(v.p) + ')').join(' · ')}</div>`;
      txt += `<div class="ew-notes small muted">${notes.map(n => GT.esc(n)).join(' &nbsp; ')}</div>`;
      if (A.alts && A.alts.length) txt += `<div class="small muted">Other valid readings of the same pivots: ${A.alts.slice(0, 3).map(a => a.type === 'impulse' ? 'impulse, ' + (a.m - 1) + ' wave' + (a.m > 2 ? 's' : '') : 'impulse + ' + a.cor.kind).join(' · ')}</div>`;
    } else txt += '<div class="muted">No count fits the hard rules on this chart right now. Nothing is drawn (we do not force a count).</div>';
    cs.setMarkers(markers.sort((a, b) => a.time - b.time));
    // log
    const inv = R.history.filter(h => h.how === 'invalidated'), rep = R.history.filter(h => h.how === 'replaced'), prog = R.history.filter(h => h.how === 'progressed');
    const when = i => { const t = c[Math.min(i, c.length - 1)].time; return new Date(t * 1000).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }); };
    txt += `<div class="ew-log"><b>History on this chart:</b> ${R.history.length + (A ? 1 : 0)} counts · <span class="red">${inv.length} cancelled by price</span> · ${rep.length} replaced by a better-fitting count · ${prog.length} moved on to the next wave. <span class="muted">A cancelled count is a count that was wrong.</span></div>`;
    if (inv.length) txt += '<div class="ew-fl small">' + inv.slice(-6).reverse().map(h => `<div><span class="muted">${when(h.died)}</span> ${h.d > 0 ? '↑' : '↓'} ${h.type === 'impulse' ? 'impulse (' + (h.m - 1) + ' waves)' : 'impulse + ' + h.cor}: ${GT.esc(h.reason)}</div>`).join('') + '</div>';
    $('ew-info').innerHTML = txt;
  }
  // follow the shared chart (new candle / market / timeframe)
  setInterval(() => { try { draw(false); } catch (e) { console.warn('elliott', e); } }, 2500);
  setTimeout(() => { try { draw(true); } catch (e) { console.warn('elliott', e); } }, 600);
  $('ew-up').onclick = () => document.getElementById('sig-app').scrollIntoView({ behavior: 'smooth', block: 'start' });
})();
