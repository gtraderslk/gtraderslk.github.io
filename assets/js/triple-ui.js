/* G TRADERS — the 3 signal methods, each on its own chart (follows the market + timeframe chosen above) */
(function () {
  const $ = id => document.getElementById(id), root = $('tri'); if (!root || !window.GTSigLC || !window.GTTriple) return;
  const lc = window.GTSigLC, T = window.GTTriple;
  const M = [
    { k: 'advanced', name: '⚡ Advanced signal', fn: (c, h) => T.advanced(c, h), about: 'Higher-timeframe trend + ADX 25+ + Supertrend + pullback to EMA 21. SL 3 × ATR, TP 1 : 3 (about 3 wins in 10 is normal for 1 : 3). The score only counts how many extra checks passed (MACD, RSI, volatility, structure) - it is not a probability. Skipped when the stop is under 0.3% of the price.' },
    { k: 'bollinger', name: 'Bollinger Bands signal', fn: c => T.bollinger(c), about: 'Reversion back inside the band in a ranging market, and squeeze breakouts when the bands were tight.' },
    { k: 'ma', name: 'Moving Average signal', fn: c => T.ma(c), about: 'EMA 9 / 21 cross, only with the EMA 200 trend, a sloping EMA 21 and a market that is not flat. SL 1.5 × ATR, TP 1 : 2.' }
  ];
  const HTF = { 60: 300, 120: 600, 180: 900, 300: 900, 600: 3600, 900: 3600, 1800: 14400, 3600: 14400, 14400: 86400 };
  let mode = 'stack', cur = 'advanced', htf = null, htfKey = '', htfAt = 0, view = {};
  try { mode = localStorage.getItem('gt_tri_mode') || 'stack'; } catch (e) { }
  const fmt = v => v == null ? '—' : lc.fmt(v);

  function build() {
    $('tri-list').innerHTML = M.map(m => `<div class="tri-one" data-k="${m.k}"><div class="th"><b>${m.name}</b><span class="small muted">${m.about}</span></div><div class="tc" id="tc-${m.k}"></div><div class="tf" id="tf-${m.k}"></div></div>`).join('');
    M.forEach(m => {
      const el = $('tc-' + m.k);
      const ch = LightweightCharts.createChart(el, { width: el.clientWidth || 600, height: 340,
        layout: { background: { color: '#05080f' }, textColor: '#cfd8e6', fontSize: 11 }, grid: { vertLines: { color: '#0f1726' }, horzLines: { color: '#0f1726' } },
        timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#1f2b3f', rightOffset: 8 }, rightPriceScale: { borderColor: '#1f2b3f', minimumWidth: 86 }, crosshair: { mode: 0 } });
      const s = ch.addCandlestickSeries({ upColor: '#29d67c', downColor: '#ff5b6a', wickUpColor: '#29d67c', wickDownColor: '#ff5b6a', borderVisible: false });
      new ResizeObserver(() => { if (el.clientWidth) ch.applyOptions({ width: el.clientWidth, height: el.clientHeight }); }).observe(el);
      view[m.k] = { ch, s, lines: [], pl: [] };
    });
    applyMode();
  }
  function applyMode() {
    try { localStorage.setItem('gt_tri_mode', mode); } catch (e) { }
    $('tri-mode').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === mode));
    $('tri-tabs').style.display = mode === 'one' ? '' : 'none';
    $('tri-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === cur));
    M.forEach(m => { const el = root.querySelector(`.tri-one[data-k="${m.k}"]`); el.style.display = (mode === 'stack' || cur === m.k) ? '' : 'none'; });
    setTimeout(() => M.forEach(m => { const el = $('tc-' + m.k); if (el.clientWidth) view[m.k].ch.applyOptions({ width: el.clientWidth }); }), 30);
  }
  $('tri-mode').querySelectorAll('button').forEach(b => b.onclick = () => { mode = b.dataset.m; applyMode(); });
  $('tri-tabs').querySelectorAll('button').forEach(b => b.onclick = () => { cur = b.dataset.k; applyMode(); });
  $('tri-up').onclick = () => document.getElementById('sig-app').scrollIntoView({ behavior: 'smooth', block: 'start' });
  const go = $('go-adv'); if (go) go.onclick = e => { e.preventDefault(); mode = 'one'; cur = 'advanced'; applyMode(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  async function getHtf() {
    const g = HTF[lc.gran], meta = lc.meta; if (!g || !meta) { htf = null; return; }
    const key = meta.symbol + '|' + g;
    if (key === htfKey && Date.now() - htfAt < 90000) return;
    htfKey = key; htfAt = Date.now();
    try { const c = await GTFeed.history(meta, g, 300); htf = { c, g }; } catch (e) { htf = null; }
  }
  let busy = false, again = false;
  async function draw() {
    if (busy) { again = true; return; } busy = true;
    try {
      const c = lc.candles; if (!c.length) return;
      $('tri-sym').textContent = (lc.meta ? lc.meta.display_name : '') + ' · ' + ((window.GTMarket && GTMarket.TF.find(t => t[1] === lc.gran) || [''])[0]);
      await getHtf();
      M.forEach(m => {
        const v = view[m.k];
        v.s.applyOptions({ priceFormat: { type: 'price', precision: lc.digits, minMove: Math.pow(10, -lc.digits) } });
        v.s.setData(c);
        v.lines.forEach(l => { try { v.ch.removeSeries(l); } catch (e) { } }); v.lines = [];
        T.lines[m.k](c).forEach(l => { const ls = v.ch.addLineSeries({ color: l.color, lineWidth: 1, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false }); ls.setData(c.map((k, i) => l.values[i] != null ? { time: k.time, value: l.values[i] } : null).filter(Boolean)); v.lines.push(ls); });
        const sg = m.fn(c, htf) || [];
        v.s.setMarkers(sg.map(s => ({ time: s.time, position: s.signal === 'BUY' ? 'belowBar' : 'aboveBar', color: s.signal === 'BUY' ? '#22c55e' : '#ff4fd8', shape: s.signal === 'BUY' ? 'arrowUp' : 'arrowDown', text: s.signal + (s.conf ? ' ' + s.conf : '') })));
        v.pl.forEach(p => { try { v.s.removePriceLine(p); } catch (e) { } }); v.pl = [];
        const L = sg[sg.length - 1], age = L ? c.length - 1 - L.index : null;
        if (L && age <= 30) [[L.entry, '#38bdf8', 'Entry ' + L.signal, 0], [L.sl, '#f43f5e', 'SL', 2], [L.tp, '#22c55e', 'TP', 2]].forEach(([price, color, title, ls]) => v.pl.push(v.s.createPriceLine({ price, color, lineWidth: 1, lineStyle: ls, axisLabelVisible: true, title })));
        const st = T.stats(c, sg), cc = L && L.conf ? (L.conf >= 84 ? 'Strong' : L.conf >= 68 ? 'Good' : 'Basic') : '';
        $('tf-' + m.k).innerHTML = (L ? `<span>Latest: <b class="${L.signal === 'BUY' ? 'green' : 'red'}">${L.signal} @ ${fmt(L.entry)}</b> <span class="muted">(${age === 0 ? 'this candle' : age + ' candles ago'})</span></span>
          <span class="red">SL ${fmt(L.sl)}</span><span class="green">TP ${fmt(L.tp)}</span>${L.conf ? `<span class="tri-conf ${L.conf >= 84 ? 'green' : L.conf >= 68 ? 'gold' : 'muted'}">${cc} · score ${L.conf}</span>` : ''}
          <span class="muted small" style="flex-basis:100%">${GT.esc(L.reason)}</span>` : '<span class="muted">No signal on this chart yet — try another timeframe or market.</span>')
          + `<span class="muted small" style="flex-basis:100%">History on this chart: ${st.total} signals · ${st.win} reached TP · ${st.loss} hit SL · ${st.open} still open${st.rate != null ? ` · win rate ${st.rate.toFixed(0)}% · average ${st.avgR >= 0 ? '+' : ''}${st.avgR.toFixed(2)} R` : ''}</span>`;
      });
    } finally { busy = false; if (again) { again = false; draw(); } }
  }
  build();
  let tmr = null;
  window.GTTri = { update(isNew, first) { if (isNew || first) { clearTimeout(tmr); tmr = null; setTimeout(draw, first ? 50 : 100); } else if (!tmr) tmr = setTimeout(() => { tmr = null; draw(); }, 3000); } };
  if (lc.candles.length) draw();
})();
