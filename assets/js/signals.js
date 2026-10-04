/* G TRADERS — Signal engine page
   live chart (Binance crypto + Deriv forex / synthetics), three engines (SMC, GTM, Multi),
   signal + trend on six timeframes, market pressure, advisor, scanner, resizable / full-screen chart */
(function () {
  const ENG = {
    smc: window.SMCStrategy, gtm: window.GTMStrategy, multi: window.MultiConfirmStrategy,
    ema: window.EMACrossStrategy, bb: window.BollingerStrategy
  };
  const $ = id => document.getElementById(id);
  const me = GT.auth.current();
  if (!GT.feature('signals', me)) { $('sig-app').innerHTML = '<div class="gate" style="grid-column:1/-1"><div class="lock">🛠</div><h2 style="font-size:24px">The signal engine is paused</h2><p class="muted">It is switched off for a short while. Please check back soon.</p></div>'; $('scanner').style.display = 'none'; return; }
  if (me) GT.auth.track('signals');
  if (!GT.feature('scanner', me)) $('scanner').style.display = 'none';
  let eng = GT.store.get('gt_sig_eng', 'gtm'); if (!ENG[eng]) eng = 'gtm';
  let lower = GT.store.get('gt_sig_lower', 'macd');
  const show = Object.assign({ lines: true, sr: true, zones: true, trade: true, struct: true }, GT.store.get('gt_sig_show', {}));
  let lines = [], plines = [], signals = [], smcInfo = null, mtf = {}, mtfTimer = null, mtfSeq = 0;
  const MTF = [['4H', 14400], ['1H', 3600], ['30m', 1800], ['15m', 900], ['5m', 300], ['1m', 60]];

  /* ---------- toolbar ---------- */
  $('eng').innerHTML = [['smc', 'SMC'], ['gtm', 'GTM'], ['multi', 'Multi']].map(([k, n]) => `<button type="button" data-e="${k}" title="${ENG[k].name}">${n} signal</button>`).join('')
    + `<select id="eng-more" title="More engines"><option value="">More…</option><option value="ema">EMA cross</option><option value="bb">Bollinger</option></select>`;
  const paintEng = () => { $('eng').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.e === eng)); $('eng-more').value = ENG[eng] && ['ema', 'bb'].includes(eng) ? eng : ''; $('eng-name').textContent = ENG[eng].name; };
  $('eng').querySelectorAll('button').forEach(b => b.onclick = () => setEng(b.dataset.e));
  $('eng-more').onchange = e => e.target.value && setEng(e.target.value);
  function setEng(k) { eng = k; GT.store.set('gt_sig_eng', k); paintEng(); render(); runMTF(); }
  paintEng();

  $('show').innerHTML = [['lines', 'Lines'], ['sr', 'S / R'], ['zones', 'Zones'], ['struct', 'BOS / CHoCH'], ['trade', 'Entry · SL · TP']]
    .map(([k, n]) => `<label class="chk"><input type="checkbox" data-k="${k}" ${show[k] ? 'checked' : ''}> ${n}</label>`).join('');
  $('show').querySelectorAll('input').forEach(i => i.onchange = () => { show[i.dataset.k] = i.checked; GT.store.set('gt_sig_show', show); render(); });
  $('lower').value = lower;
  $('lower').onchange = e => { lower = e.target.value; GT.store.set('gt_sig_lower', lower); $('osc-wrap').style.display = lower === 'off' ? 'none' : ''; drawLower(); };
  $('osc-wrap').style.display = lower === 'off' ? 'none' : '';

  const msg = (t, kind) => { const m = $('msg'); m.style.display = t ? 'block' : 'none'; m.className = 'notice ' + (kind || ''); m.textContent = t || ''; };

  /* ---------- chart ---------- */
  const lc = new GTMarket.LiveChart({
    key: 'sig', container: $('chart'), picker: $('pick'), tfBox: $('tf'), status: $('st'), gran: 300, onMessage: msg, symbol: 'BTCUSDT',
    onCandles: (c, isNew, first) => { if (isNew) render(); else info(); if (first) runMTF(); }
  });

  // drawing tools + live TP / SL box
  const dr = new GTDraw(lc, { key: 'sig', toolbar: $('draw') });

  // lower pane
  const oc = $('osc');
  const osc = LightweightCharts.createChart(oc, {
    width: oc.clientWidth, height: oc.clientHeight,
    layout: { background: { color: '#05080f' }, textColor: '#8b9bb4', fontSize: 10 },
    grid: { vertLines: { color: '#0f1726' }, horzLines: { color: '#0f1726' } },
    timeScale: { visible: false }, rightPriceScale: { borderColor: '#1f2b3f' }, crosshair: { mode: 0 }, handleScroll: false, handleScale: false
  });
  new ResizeObserver(() => osc.applyOptions({ width: oc.clientWidth, height: oc.clientHeight })).observe(oc);
  const hist = osc.addHistogramSeries({ priceFormat: { type: 'price', precision: 5, minMove: 0.00001 }, priceLineVisible: false });
  const oline = osc.addLineSeries({ color: '#38bdf8', lineWidth: 1, priceLineVisible: false, lastValueVisible: true });
  // both charts get the same price-scale width, the same bars and the same visible range, so every
  // bar of the lower pane sits exactly under its candle
  lc.chart.applyOptions({ rightPriceScale: { minimumWidth: 86 }, timeScale: { rightOffset: 12 } });
  osc.applyOptions({ rightPriceScale: { minimumWidth: 86 }, timeScale: { rightOffset: 12 } });
  const syncOsc = () => { const r = lc.chart.timeScale().getVisibleLogicalRange(); if (r) osc.timeScale().setVisibleLogicalRange(r); };
  lc.chart.timeScale().subscribeVisibleLogicalRangeChange(syncOsc);

  /* size, full screen, auto, log */
  const box = $('chart').parentElement, app = $('sig-app');
  const SIZES = { s: 380, m: 520, l: 720 };
  let size = GT.store.get('gt_sig_size', 'm');
  const setSize = k => { size = k; GT.store.set('gt_sig_size', k); box.style.height = SIZES[k] + 'px'; $('sz').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.z === k)); };
  $('sz').querySelectorAll('button').forEach(b => b.onclick = () => setSize(b.dataset.z)); setSize(size);
  $('b-fit').onclick = () => lc.fit();
  let log = false; $('b-log').onclick = () => { log = !log; lc.setLog(log); $('b-log').classList.toggle('on', log); };
  $('b-full').onclick = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (app.requestFullscreen) app.requestFullscreen().catch(() => app.classList.toggle('fake-full'));
    else app.classList.toggle('fake-full');
  };
  document.addEventListener('fullscreenchange', () => { $('b-full').textContent = document.fullscreenElement ? '✕ Exit full screen' : '⛶ Full screen'; });

  /* ---------- maths ---------- */
  const emaArr = (vals, n) => { const k = 2 / (n + 1), o = []; let e = null; vals.forEach((v, i) => { e = e == null ? v : v * k + e * (1 - k); o.push(i >= n - 1 ? e : null); }); return o; };
  function atrAt(c, i, n = 14) { let s = 0, k = 0; for (let j = Math.max(1, i - n + 1); j <= i; j++) { s += Math.max(c[j].high - c[j].low, Math.abs(c[j].high - c[j - 1].close), Math.abs(c[j].low - c[j - 1].close)); k++; } return k ? s / k : 0; }
  function levels(c) {
    const lb = 5, hi = [], lo = [], n = c.length, from = Math.max(lb, n - 200);
    for (let i = from; i < n - lb; i++) {
      let H = true, L = true;
      for (let j = 1; j <= lb; j++) { if (c[i].high <= c[i - j].high || c[i].high < c[i + j].high) H = false; if (c[i].low >= c[i - j].low || c[i].low > c[i + j].low) L = false; }
      if (H) hi.push(c[i].high); if (L) lo.push(c[i].low);
    }
    const p = c[n - 1].close;
    return { res: hi.filter(v => v > p).sort((a, b) => a - b)[0], sup: lo.filter(v => v < p).sort((a, b) => b - a)[0] };
  }
  // strength of the trend on a candle list
  function trendOf(c) {
    if (c.length < 60) return { dir: 'NONE', word: 'no data' };
    const cl = c.map(x => x.close), e21 = emaArr(cl, 21), e50 = emaArr(cl, 50), i = cl.length - 1, p = cl[i], a = atrAt(c, i) || 1e-9;
    const slope = (e21[i] - e21[i - 5]) / a;
    const up = (p > e21[i]) + (e21[i] > e50[i]) + (slope > 0.15), dn = (p < e21[i]) + (e21[i] < e50[i]) + (slope < -0.15);
    const dir = up === 3 ? 'UP' : dn === 3 ? 'DOWN' : up >= 2 ? 'UP' : dn >= 2 ? 'DOWN' : 'SIDE';
    const strong = Math.abs(slope) > 0.6 && (up === 3 || dn === 3);
    const word = dir === 'SIDE' ? 'WEAK SIDEWAYS' : (strong ? 'STRONG ' : (up === 3 || dn === 3) ? 'MEDIUM ' : 'WEAK ') + dir;
    const col = k => k ? (k.close >= k.open ? 'green' : 'red') : '—';
    return { dir, word, prev: col(c[c.length - 2]), now: col(c[c.length - 1]) };
  }
  function pressure(c) {
    let b = 0, s = 0;
    c.slice(-50).forEach(k => { const r = k.high - k.low; if (r <= 0) return; b += (k.close - k.low) / r; s += (k.high - k.close) / r; });
    const t = b + s || 1; return Math.round(b / t * 100);
  }

  /* ---------- draw ---------- */
  function render() {
    const c = lc.candles; if (!c.length) return;
    const S = ENG[eng];
    lines.forEach(s => { try { lc.chart.removeSeries(s); } catch (e) { } }); lines = [];
    if (show.lines) (S.lines(c) || []).forEach(l => {
      const s = lc.chart.addLineSeries({ color: l.color, lineWidth: 2, priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false });
      s.setData(c.map((k, i) => l.values[i] != null ? { time: k.time, value: l.values[i] } : null).filter(Boolean)); lines.push(s);
    });
    signals = S.detect(c) || [];
    smcInfo = (eng === 'smc' || eng === 'multi') ? SMCStrategy.analyze(c) : null;
    const marks = signals.map(s => ({ time: s.time, position: s.signal === 'BUY' ? 'belowBar' : 'aboveBar', color: s.signal === 'BUY' ? '#22c55e' : '#ff4fd8', shape: s.signal === 'BUY' ? 'arrowUp' : 'arrowDown', text: s.signal }));
    if (show.struct && smcInfo) smcInfo.marks.slice(-12).forEach(m => marks.push({ time: m.time, position: m.up ? 'aboveBar' : 'belowBar', color: m.text === 'CHoCH' ? '#f0c869' : '#38bdf8', shape: 'circle', text: m.text }));
    marks.sort((a, b) => a.time - b.time);
    lc.series.setMarkers(marks);

    plines.forEach(p => { try { lc.series.removePriceLine(p); } catch (e) { } }); plines = [];
    const add = (price, color, title, style, w, hide) => price != null && isFinite(price) && plines.push(lc.series.createPriceLine({ price, color, lineWidth: w || 1, lineStyle: style, lineVisible: !hide, axisLabelVisible: true, title }));
    if (show.sr) { const lv = levels(c); add(lv.res, '#f97316', 'Resistance', 0, 2); add(lv.sup, '#22c55e', 'Support', 0, 2); }
    dr.setZones(show.zones && smcInfo ? smcInfo.zones : []);
    const s = signals[signals.length - 1];
    if (show.trade && s) {
      const risk = Math.abs(s.entry - s.sl) || Math.abs(s.entry) * 0.0005, dir = s.signal === 'BUY' ? 1 : -1;
      const tps = [1, 2, 3].map(r => s.entry + dir * risk * r);
      add(s.entry, '#38bdf8', 'Entry ' + s.signal, 0, 1, true); add(s.sl, '#f43f5e', 'SL', 2, 1, true);
      tps.forEach((v, i) => add(v, '#22c55e', 'TP' + (i + 1), 2, 1, true));
      // the box stays live until price reaches the stop or the last target, then it ends on that candle
      let t2 = null; const i0 = c.findIndex(k => k.time === s.time), last = tps[2], buy = s.signal === 'BUY';
      for (let i = i0 + 1; i0 >= 0 && i < c.length; i++) { const k = c[i]; if ((buy ? k.low <= s.sl : k.high >= s.sl) || (buy ? k.high >= last : k.low <= last)) { t2 = k.time; break; } }
      dr.setBoxes([{ dir: s.signal, t1: s.time, t2, entry: s.entry, sl: s.sl, tps, label: 'Signal ' + s.signal }]);
    } else dr.setBoxes([]);
    drawLower();
    $('list').innerHTML = signals.length ? signals.slice(-25).reverse().map(s => `
      <div class="sig"><span class="tag ${s.signal === 'BUY' ? 'buy' : 'sell'}">${s.signal}</span>
        <span class="muted">${new Date(s.time * 1000).toLocaleString()}</span>
        <div style="font-family:var(--mono);font-size:12px;margin-top:3px">E ${lc.fmt(s.entry)} · <span class="red">SL ${lc.fmt(s.sl)}</span> · <span class="green">TP ${lc.fmt(s.tp)}</span></div>
        <div class="muted small">${GT.esc(s.reason || '')}</div></div>`).join('')
      : '<p class="muted small" style="padding:12px">No signals in this window — try another timeframe or engine, or run the scanner below.</p>';
    info();
  }
  function drawLower() {
    const c = lc.candles; if (!c.length || lower === 'off') return;
    if (lower === 'macd') {
      const h = GTMStrategy.macdHist(c);
      hist.setData(c.map((k, i) => h[i] != null ? { time: k.time, value: h[i], color: h[i] >= 0 ? 'rgba(34,197,94,.75)' : 'rgba(244,63,94,.75)' } : { time: k.time }));
      oline.setData(c.map(k => ({ time: k.time })));
    } else if (lower === 'ao') {
      const mid = c.map(k => (k.high + k.low) / 2), sma = n => mid.map((_, i) => i >= n - 1 ? mid.slice(i - n + 1, i + 1).reduce((a, b) => a + b, 0) / n : null);
      const a5 = sma(5), a34 = sma(34);
      const ao = c.map((k, i) => a34[i] != null ? a5[i] - a34[i] : null);
      hist.setData(c.map((k, i) => ao[i] != null ? { time: k.time, value: ao[i], color: i && ao[i - 1] != null && ao[i] >= ao[i - 1] ? 'rgba(34,197,94,.75)' : 'rgba(244,63,94,.75)' } : { time: k.time }));
      oline.setData(c.map(k => ({ time: k.time })));
    } else {
      const r = Indicators.rsi(c, 14);
      hist.setData(c.map(k => ({ time: k.time })));
      oline.setData(c.map((k, i) => r[i] != null ? { time: k.time, value: r[i] } : { time: k.time }));
    }
  }

  /* ---------- six timeframes ---------- */
  function runMTF() {
    clearInterval(mtfTimer); const my = ++mtfSeq; mtf = {}; drawMTF();
    const meta = lc.meta; if (!meta) return;
    const run = async () => {
      for (const [k, g] of MTF) {
        if (my !== mtfSeq) return;
        try {
          const c = await GTFeed.history(meta, g, 300);
          const t = trendOf(c), sg = ENG[eng].detect(c) || [], last = sg[sg.length - 1];
          mtf[k] = { t, sig: last ? last.signal : null, age: last ? c.length - 1 - last.index : null };
        } catch (e) { mtf[k] = { t: { dir: 'NONE', word: 'no data' }, sig: null }; }
        if (my === mtfSeq) drawMTF();
      }
      if (my === mtfSeq) info();
    };
    run(); mtfTimer = setInterval(run, 60000);
  }
  function drawMTF() {
    $('sgrid').innerHTML = MTF.map(([k]) => { const v = mtf[k], s = v ? (v.sig || 'NONE') : '…';
      return `<div class="tft ${s === 'BUY' ? 'up' : s === 'SELL' ? 'dn' : ''}" title="${v && v.age != null ? v.age + ' candles ago' : ''}"><span>${k}</span><span class="v">${s}</span></div>`; }).join('');
    $('tfgrid').innerHTML = MTF.map(([k]) => { const v = mtf[k], d = v ? v.t.dir : '…';
      return `<div class="tft ${d === 'UP' ? 'up' : d === 'DOWN' ? 'dn' : ''}"><span>${k}</span><span class="v">${d}</span></div>`; }).join('');
  }

  /* ---------- side panel ---------- */
  let lastLower = 0;
  function info() {
    if (Date.now() - lastLower > 700) { lastLower = Date.now(); drawLower(); syncOsc(); }
    const c = lc.candles[lc.candles.length - 1]; if (!c) return;
    $('t-price').textContent = lc.fmt(c.close);
    $('t-b').textContent = signals.filter(s => s.signal === 'BUY').length; $('t-s').textContent = signals.filter(s => s.signal === 'SELL').length;
    $('ohlc').innerHTML = `${GT.esc(lc.meta ? lc.meta.display_name : '')} &nbsp; O <b>${lc.fmt(c.open)}</b> H <b class="green">${lc.fmt(c.high)}</b> L <b class="red">${lc.fmt(c.low)}</b> C <b>${lc.fmt(c.close)}</b>`;
    const bp = pressure(lc.candles);
    $('press').innerHTML = `<div class="pbar"><i style="width:${bp}%"></i></div><div class="small" style="display:flex;justify-content:space-between;margin-top:4px"><b class="green">Buyers ${bp}%</b><b class="red">Sellers ${100 - bp}%</b></div>`;
    const s = signals[signals.length - 1];
    const age = s ? lc.candles.length - 1 - lc.candles.findIndex(k => k.time === s.time) : 99;
    const fresh = s && age <= 3;
    let action = '<b class="gold">Wait for a fresh signal</b>';
    if (fresh) {
      const t = mtf['15m'] && mtf['15m'].t.dir, h = mtf['1H'] && mtf['1H'].t.dir, want = s.signal === 'BUY' ? 'UP' : 'DOWN';
      const agree = [t, h].filter(x => x === want).length;
      const q = agree === 2 ? 'strong — 15m and 1H agree' : agree === 1 ? 'medium — one higher timeframe agrees' : 'weak — higher timeframes disagree, be careful';
      const wait = s.signal === 'BUY' ? (c.close < s.entry ? ` · wait above ${lc.fmt(s.entry)}` : '') : (c.close > s.entry ? ` · wait below ${lc.fmt(s.entry)}` : '');
      action = `<b class="${s.signal === 'BUY' ? 'green' : 'red'}">${s.signal} ${q}</b>${wait}`;
    }
    const rows = ['5m', '15m', '30m', '1H', '4H'].filter(k => mtf[k]).map(k => {
      const t = mtf[k].t, cls = t.dir === 'UP' ? 'green' : t.dir === 'DOWN' ? 'red' : 'gold';
      return `<div class="small">${k}: <b class="${cls}">${t.word}</b> <span class="muted">| previous ${t.prev || '—'} candle | forming ${t.now || '—'}</span></div>`;
    }).join('');
    $('adv').innerHTML = `<div>Latest signal: ${s ? `<b class="${s.signal === 'BUY' ? 'green' : 'red'}">${s.signal} @ ${lc.fmt(s.entry)}</b> <span class="muted">(${age} candle${age === 1 ? '' : 's'} ago)</span>` : '<b>none yet</b>'}</div>
      <div style="margin:4px 0 8px">${action}</div>${rows || '<div class="muted small">Reading the other timeframes…</div>'}`;
  }

  /* ---------- scanner ---------- */
  let scanning = false, scanRows = [], autoT = null;
  $('sc-run').onclick = () => scan();
  $('sc-auto').onchange = e => { clearInterval(autoT); if (e.target.checked) autoT = setInterval(() => !scanning && scan(), 5 * 60000); };
  $('sc-fresh').onchange = () => drawScan();
  async function scan() {
    if (scanning) return; scanning = true; if (me) GT.auth.track('scans');
    const r = await GTFeed.symbols();
    const cat = $('sc-cat').value, gran = lc.gran, S = ENG[eng];
    let list = r.list.filter(s => s.cat === cat && s.exchange_is_open);
    if (cat === 'crypto') list = list.filter(s => s.src === 'binance').sort((a, b) => (b.vol || 0) - (a.vol || 0)).slice(0, 40);
    list = list.slice(0, 60);
    scanRows = []; let done = 0;
    $('sc-run').disabled = true;
    $('sc-st').textContent = list.length ? `Scanning ${list.length} markets on ${GTMarket.TF.find(t => t[1] === gran)[0]} with the ${S.short} engine…` : 'No open markets in this group right now.';
    const work = list.slice();
    const worker = async () => {
      while (work.length) {
        const m = work.shift();
        try {
          const c = await GTFeed.history(m, gran, 300);
          const sg = S.detect(c) || [], last = sg[sg.length - 1], t = trendOf(c);
          scanRows.push({ m, last, age: last ? c.length - 1 - last.index : null, t, price: c.length ? c[c.length - 1].close : null });
        } catch (e) { }
        done++; $('sc-st').textContent = `Scanned ${done} / ${list.length}…`; drawScan();
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
    const fresh = scanRows.filter(x => x.age != null && x.age <= 5).length;
    $('sc-st').textContent = `Done: ${scanRows.length} markets · ${fresh} with a signal in the last 5 candles · ${new Date().toLocaleTimeString()}`;
    $('sc-run').disabled = false; scanning = false; drawScan();
  }
  function drawScan() {
    const fo = $('sc-fresh').checked;
    let rows = scanRows.slice().sort((a, b) => (a.age ?? 999) - (b.age ?? 999));
    if (fo) rows = rows.filter(x => x.age != null && x.age <= 5);
    $('sc-tbl').innerHTML = rows.length ? '<tr><th>Market</th><th>Signal</th><th>When</th><th>Entry</th><th>SL</th><th>TP</th><th>Trend</th><th></th></tr>' + rows.map(x => {
      const d = GTMarket.digitsOf(x.m.src === 'binance' ? { pip: GTMarket.pipFromPrice(x.price) } : x.m), f = v => v == null ? '—' : Number(v).toFixed(d);
      const s = x.last;
      return `<tr><td><b>${GT.esc(x.m.display_name)}</b></td>
        <td>${s ? `<span class="tag ${s.signal === 'BUY' ? 'buy' : 'sell'}">${s.signal}</span>` : '<span class="muted">—</span>'}</td>
        <td class="${x.age != null && x.age <= 5 ? 'gold' : 'muted'}">${x.age == null ? '—' : x.age === 0 ? 'this candle' : x.age + ' candles ago'}</td>
        <td>${s ? f(s.entry) : '—'}</td><td class="red">${s ? f(s.sl) : '—'}</td><td class="green">${s ? f(s.tp) : '—'}</td>
        <td class="${x.t.dir === 'UP' ? 'green' : x.t.dir === 'DOWN' ? 'red' : 'gold'}">${x.t.word}</td>
        <td><button class="btn ghost small" data-open="${GT.esc(x.m.symbol)}">Open chart</button></td></tr>`;
    }).join('') : `<tr><td class="muted" style="padding:14px">${scanning ? 'Working…' : fo && scanRows.length ? 'No fresh signals — untick “fresh only” to see every market.' : 'Choose a market group and press Scan.'}</td></tr>`;
    $('sc-tbl').querySelectorAll('[data-open]').forEach(b => b.onclick = () => {
      GT.store.set('gt_sym_sig', b.dataset.open); lc.load(b.dataset.open); app.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  drawScan();

  drawMTF();
  const _load = lc.load.bind(lc);
  lc.load = async s => { await _load(s); dr.load(); runMTF(); };
  lc.start();
})();
