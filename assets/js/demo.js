/* G TRADERS — $10,000 demo trading account
   Lots, contract sizes, leverage, margin, spread and P/L in USD worked out like an MT5 account,
   live TP / SL boxes and analysis tools on the chart, a TradingView tab and a free journal. */
(function () {
  const $ = id => document.getElementById(id);
  if (!GT.gate($('demo-area'), 'The $10,000 demo', 'demo')) return;
  const START = GT_CONFIG.demoStartBalance, STOP_OUT = 50;   // margin level % where the worst trade is closed
  const user = GT.auth.current();
  const KEY = GT.demos.key(user);
  let accId = null, acc = load();
  function load() {
    const r = GT.demos.active(user), a = r.acc; accId = r.id;
    a.deposits = a.deposits || [{ time: a.created || Date.now(), amount: START }];
    // trades from the first version (size = units) keep working
    a.positions.forEach(p => { if (p.lots == null) { p.lots = p.size; p.contract = 1; p.conv = 1; p.open = p.time; } });
    a.history.forEach(h => { if (h.lots == null) { h.lots = h.size; } if (!h.open) h.open = h.time; });
    return a;
  }
  const save = () => GT.demos.save(user, accId, acc);
  const prices = {}, tickSubs = {};
  let plines = [];
  const msg = (t, kind) => { const m = $('msg'); m.style.display = t ? 'block' : 'none'; m.className = 'notice ' + (kind || ''); m.textContent = t || ''; };

  /* ---------- contract specification (like the MT5 symbol specification) ---------- */
  const FX_USD = { USD: 1, EUR: 1.08, GBP: 1.27, AUD: 0.66, NZD: 0.6, CAD: 0.73, CHF: 1.12, JPY: 0.0067, MXN: 0.055, PLN: 0.25, ZAR: 0.055, SGD: 0.74, HKD: 0.128, NOK: 0.094, SEK: 0.095 };
  const stepFor = (price, target) => { const v = Math.pow(10, Math.floor(Math.log10(target / Math.max(price, 1e-12)))); return Math.min(1000000, Math.max(1e-6, v)); };
  function spec(meta, price) {
    const s = meta.symbol, p = price || 1;
    if (meta.src === 'binance' || meta.cat === 'crypto') { const st = p >= 1000 ? 0.01 : stepFor(p, 10); return { contract: 1, lev: 20, step: st, min: st, spread: p * 0.0002, unit: '1 ' + meta.display_name.split('/')[0] + ' per lot', quote: 'USD' }; }
    if (/^frx/.test(s)) {
      const base = s.slice(3, 6), quote = s.slice(6, 9);
      if (base === 'XAU') return { contract: 100, lev: 100, step: 0.01, min: 0.01, spread: 0.3, unit: '100 oz per lot', quote };
      if (base === 'XAG') return { contract: 5000, lev: 100, step: 0.01, min: 0.01, spread: 0.03, unit: '5,000 oz per lot', quote };
      if (base === 'XPT' || base === 'XPD') return { contract: 100, lev: 50, step: 0.01, min: 0.01, spread: 2, unit: '100 oz per lot', quote };
      const pip = quote === 'JPY' ? 0.01 : 0.0001;
      return { contract: 100000, lev: 100, step: 0.01, min: 0.01, spread: pip * 1.2, unit: '100,000 ' + base + ' per lot', quote, base };
    }
    if (meta.cat === 'indices') return { contract: 1, lev: 100, step: 0.1, min: 0.1, spread: p * 0.0001, unit: '1 index unit per lot', quote: 'USD' };
    // Deriv synthetic indices: 1 unit per lot, high leverage, minimum lots close to Deriv MT5 (approximate)
    const MIN = { R_10: 0.5, R_25: 0.5, R_50: 4, R_75: 0.001, R_100: 0.5, '1HZ10V': 0.5, '1HZ15V': 0.2, '1HZ25V': 0.005, '1HZ30V': 0.2, '1HZ50V': 0.005, '1HZ75V': 0.05, '1HZ90V': 0.05, '1HZ100V': 0.2 };
    let mn = MIN[s] || (/^(BOOM|CRASH)/.test(s) ? 0.2 : /^JD/.test(s) ? 0.01 : stepFor(p, 5));
    return { contract: 1, lev: 500, step: mn >= 1 ? 0.01 : Math.min(mn, 0.001) || 0.001, min: mn, spread: 0, unit: '1 index unit per lot', quote: 'USD' };
  }
  // quote currency -> USD; a USD-based pair uses its own live price
  function convOf(sp, meta, price) {
    if (!sp.quote || sp.quote === 'USD') return 1;
    if (sp.base === 'USD') return 1 / price;
    return FX_USD[sp.quote] || 1;
  }
  const plOf = (p, px) => (px - p.entry) * p.lots * p.contract * (p.conv || 1) * (p.dir === 'BUY' ? 1 : -1);
  const marginOf = p => p.lots * p.contract * p.entry * (p.conv || 1) / p.lev;
  const dec = (v, n) => Number(v).toFixed(n);
  const lotDigits = st => Math.max(0, Math.min(6, -Math.floor(Math.log10(st) + 1e-9)));

  /* ---------- chart, analysis tools, TradingView tab ---------- */
  const lc = new GTMarket.LiveChart({
    key: 'demo', container: $('chart'), picker: $('pick'), tfBox: $('tf'), status: $('st'), gran: 60, onMessage: msg, symbol: 'BTCUSDT',
    onTick: p => { prices[lc.sym] = p; tick(); },
    onCandles: (c, isNew, first) => { const p = lc.price(); if (p != null) prices[lc.sym] = p; if (first) { orderInfo(true); drawLines(); } tick(); }
  });
  const dr = new GTDraw(lc, { key: 'demo', toolbar: $('draw') });
  lc.chart.applyOptions({ timeScale: { rightOffset: 12 } });
  const TVMAP = s => {
    if (/USDT$/.test(s)) return 'BINANCE:' + s;
    const m = s.match(/^frx([A-Z]{3})([A-Z]{3})$/);
    if (m) return (m[1] === 'XAU' || m[1] === 'XAG' || m[1] === 'XPT' || m[1] === 'XPD') ? 'OANDA:' + m[1] + m[2] : 'FX:' + m[1] + m[2];
    return { OTC_NDX: 'NASDAQ:NDX', OTC_SPC: 'SP:SPX', OTC_DJI: 'DJ:DJI', OTC_GDAXI: 'XETR:DAX', OTC_FTSE: 'TVC:UKX', OTC_N225: 'TVC:NI225', OTC_HSI: 'TVC:HSI', OTC_AS51: 'ASX:XJO', OTC_FCHI: 'EURONEXT:PX1', OTC_AEX: 'EURONEXT:AEX', OTC_SSMI: 'SIX:SMI', OTC_SX5E: 'TVC:SX5E', cryBTCUSD: 'BITSTAMP:BTCUSD', cryETHUSD: 'BITSTAMP:ETHUSD' }[s] || null;
  };
  let view = 'live';
  $('cv-tabs').querySelectorAll('button').forEach(b => b.onclick = () => setView(b.dataset.v));
  function setView(v) {
    view = v; $('cv-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
    $('live-view').style.display = v === 'live' ? '' : 'none'; $('tv-view').style.display = v === 'tv' ? '' : 'none';
    if (v === 'tv') drawTV();
  }
  function drawTV() {
    const host = $('tv-view'), sym = TVMAP(lc.sym || '');
    if (!sym) { host.innerHTML = `<div class="tv-none"><b>${GT.esc(lc.meta ? lc.meta.display_name : '')}</b> is a Deriv synthetic index — it is not on TradingView.<br>Use the drawing tools on the live chart (left toolbar): lines, zones, Fibonacci, long / short boxes and the measure tool.</div>`; return; }
    if (host.dataset.sym === sym) return;
    host.dataset.sym = sym; host.innerHTML = '';
    const box = document.createElement('div'); box.className = 'tradingview-widget-container'; box.style.height = '100%';
    const w = document.createElement('div'); w.className = 'tradingview-widget-container__widget'; w.style.height = '100%';
    const s = document.createElement('script'); s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'; s.async = true;
    s.textContent = JSON.stringify({ autosize: true, symbol: sym, interval: String(Math.max(1, lc.gran / 60)).replace('1440', 'D'), timezone: 'Etc/UTC', theme: 'dark', style: '1', locale: 'en',
      backgroundColor: '#05080f', allow_symbol_change: false, hide_side_toolbar: false, withdateranges: true, details: true, support_host: 'https://www.tradingview.com' });
    box.appendChild(w); box.appendChild(s); host.appendChild(box);
  }

  /* ---------- order ticket ---------- */
  let sp = null;
  function orderInfo(reset) {
    const p = lc.price(); if (p == null || !lc.meta) return;
    sp = spec(lc.meta, p);
    const lots = $('o-lots');
    lots.step = sp.step; lots.min = sp.min;
    if (reset || !(+lots.value >= sp.min)) lots.value = dec(sp.min, lotDigits(Math.min(sp.step, sp.min)));
    $('o-spec').innerHTML = `${GT.esc(sp.unit)} · leverage 1:${sp.lev} · min ${dec(sp.min, lotDigits(Math.min(sp.step, sp.min)))} lot · spread ${sp.spread ? lc.fmt(sp.spread) : '0'}`;
    calc();
  }
  function calc() {
    const p = lc.price(); if (p == null || !sp) return;
    const lots = +$('o-lots').value || 0, conv = convOf(sp, lc.meta, p), ask = p + sp.spread / 2, bid = p - sp.spread / 2;
    $('o-bid').textContent = lc.fmt(bid); $('o-ask').textContent = lc.fmt(ask);
    const point = Math.pow(10, -lc.digits), pv = lots * sp.contract * point * conv;
    const margin = lots * sp.contract * p * conv / sp.lev;
    const sl = +$('o-sl').value || 0, tp = +$('o-tp').value || 0;
    let risk = '';
    if (sl) risk += `If SL: <b class="red">${GT.money(-Math.abs(p - sl) * lots * sp.contract * conv)}</b> `;
    if (tp) risk += `If TP: <b class="green">${GT.money(Math.abs(tp - p) * lots * sp.contract * conv)}</b>`;
    $('o-calc').innerHTML = `Margin <b>${GT.money(margin)}</b> · 1 point (${lc.fmt(point)}) = <b>${GT.money(pv, pv < 0.01 ? 4 : 2)}</b>${risk ? '<br>' + risk : ''}`;
  }
  ['o-lots', 'o-sl', 'o-tp'].forEach(id => $(id).addEventListener('input', calc));
  $('o-minus').onclick = () => { if (!sp) return; $('o-lots').value = dec(Math.max(sp.min, (+$('o-lots').value || 0) - sp.step), lotDigits(sp.step)); calc(); };
  $('o-plus').onclick = () => { if (!sp) return; $('o-lots').value = dec((+$('o-lots').value || 0) + sp.step, lotDigits(sp.step)); calc(); };
  document.querySelectorAll('[data-quick]').forEach(b => b.onclick = () => {
    const p = lc.price(); if (p == null) return;
    const [k, side] = b.dataset.quick.split(':'), pct = +side / 100, dir = $('o-dir').value === 'SELL' ? -1 : 1;
    if (k === 'sl') $('o-sl').value = lc.fmt(p * (1 - dir * pct)); else $('o-tp').value = lc.fmt(p * (1 + dir * pct));
    calc();
  });
  $('o-dir').onchange = calc;
  $('o-clr').onclick = () => { $('o-sl').value = ''; $('o-tp').value = ''; calc(); };

  function usedMargin() { return acc.positions.reduce((a, p) => a + marginOf(p), 0); }
  function floating() { let f = 0; acc.positions.forEach(p => { const px = prices[p.sym]; if (px != null) f += plOf(p, px); }); return f; }
  function open(dir) {
    const p = lc.price();
    if (p == null || !sp) return GT.toast('No price yet — wait for the chart to load.');
    if (lc.meta && !lc.meta.exchange_is_open) return GT.toast('This market is closed right now.');
    const lots = +$('o-lots').value;
    if (!(lots >= sp.min - 1e-12)) return GT.toast('The smallest size here is ' + sp.min + ' lot.');
    const entry = dir === 'BUY' ? p + sp.spread / 2 : p - sp.spread / 2, conv = convOf(sp, lc.meta, p);
    const sl = +$('o-sl').value || 0, tp = +$('o-tp').value || 0;
    if (sl && (dir === 'BUY' ? sl >= entry : sl <= entry)) return GT.toast('The stop loss must be ' + (dir === 'BUY' ? 'below' : 'above') + ' the price for a ' + dir + '.');
    if (tp && (dir === 'BUY' ? tp <= entry : tp >= entry)) return GT.toast('The take profit must be ' + (dir === 'BUY' ? 'above' : 'below') + ' the price for a ' + dir + '.');
    const pos = { id: Date.now(), sym: lc.sym, name: lc.meta.display_name, dir, lots, contract: sp.contract, conv, lev: sp.lev, spread: sp.spread,
      entry, sl, tp, sl0: sl, open: Date.now(), t1: lc.candles.length ? lc.candles[lc.candles.length - 1].time : Math.floor(Date.now() / 1000), digits: lc.digits };
    const need = marginOf(pos), free = acc.balance + floating() - usedMargin();
    if (need > free) return GT.toast(`Not enough free margin: this trade needs ${GT.money(need)}, you have ${GT.money(free)}. Use fewer lots or top up.`, 4500);
    acc.positions.push(pos); save(); GT.auth.track('trades'); watch(pos.sym); drawLines(); tick();
    GT.toast(`${dir} ${lots} lot ${pos.name} @ ${dec(entry, lc.digits)}`);
  }
  function close(id, why, price) {
    const i = acc.positions.findIndex(p => p.id === id); if (i < 0) return;
    const p = acc.positions[i]; const mid = price != null ? price : prices[p.sym];
    if (mid == null) return GT.toast('No price for this market yet.');
    // a market close happens at the other side of the spread
    const px = price != null ? price : (p.dir === 'BUY' ? mid - (p.spread || 0) / 2 : mid + (p.spread || 0) / 2);
    const pl = plOf(p, px);
    acc.balance += pl; acc.positions.splice(i, 1);
    acc.history.unshift({ name: p.name, sym: p.sym, bot: p.bot, dir: p.dir, lots: p.lots, contract: p.contract, entry: p.entry, exit: px, sl: p.sl0 || p.sl, tp: p.tp,
      pl, digits: p.digits, why: why || 'Closed', open: p.open || p.time, time: Date.now(), risk: (p.sl0 || p.sl) ? Math.abs(p.entry - (p.sl0 || p.sl)) * p.lots * p.contract * (p.conv || 1) : 0 });
    acc.history = acc.history.slice(0, 500); save(); drawLines(); tick();
    if (why && why !== 'Closed') GT.toast(`${p.name}: ${why} ${GT.money(pl)}`);
  }
  function watch(sym) {
    if (tickSubs[sym] || sym === lc.sym) return;
    const meta = (lc.symbols || []).find(s => s.symbol === sym); if (!meta) return;
    tickSubs[sym] = true;
    GTFeed.ticks(meta, q => { prices[sym] = q; tick(); }).then(stop => tickSubs[sym] = stop).catch(() => { delete tickSubs[sym]; });
  }
  let lastJ = 0;
  function tick() {
    acc.positions.slice().forEach(p => {
      const px = prices[p.sym]; if (px == null) return;
      const buy = p.dir === 'BUY', bid = px - (p.spread || 0) / 2, ask = px + (p.spread || 0) / 2, exitPx = buy ? bid : ask;
      if (p.sl && (buy ? exitPx <= p.sl : exitPx >= p.sl)) close(p.id, 'Stop loss', p.sl);
      else if (p.tp && (buy ? exitPx >= p.tp : exitPx <= p.tp)) close(p.id, 'Take profit', p.tp);
    });
    // stop out
    const used = usedMargin();
    if (used > 0) {
      const eq = acc.balance + floating();
      if (eq / used * 100 <= STOP_OUT) {
        const worst = acc.positions.filter(p => prices[p.sym] != null).sort((a, b) => plOf(a, prices[a.sym]) - plOf(b, prices[b.sym]))[0];
        if (worst) { close(worst.id, 'Stop out (margin level ' + STOP_OUT + '%)'); GT.toast('Stop out: margin level fell to ' + STOP_OUT + '%', 4000); }
      }
    }
    const fl = floating(), eq = acc.balance + fl, um = usedMargin();
    $('a-bal').textContent = GT.money(acc.balance);
    $('a-eq').textContent = GT.money(eq);
    $('a-pl').textContent = GT.money(fl); $('a-pl').className = 'v ' + (fl >= 0 ? 'green' : 'red');
    $('a-mg').textContent = GT.money(um);
    $('a-free').textContent = GT.money(eq - um);
    $('a-lvl').textContent = um > 0 ? (eq / um * 100).toFixed(0) + '%' : '—';
    $('a-low').style.display = eq < 100 ? '' : 'none';
    calc();
    $('open-n').textContent = acc.positions.length ? acc.positions.length + ' open' : '';
    $('pos').innerHTML = acc.positions.length ? '<tr><th>Market</th><th>Type</th><th>Lots</th><th>Entry</th><th>SL</th><th>TP</th><th>Price</th><th>P/L</th><th></th></tr>' +
      acc.positions.map(p => { const px = prices[p.sym], pl = px != null ? plOf(p, p.dir === 'BUY' ? px - (p.spread || 0) / 2 : px + (p.spread || 0) / 2) : null; return `<tr>
        <td>${GT.esc(p.name)}${p.bot ? ' <span class="pill" style="font-size:10px;padding:1px 6px">bot</span>' : ''}</td><td class="${p.dir === 'BUY' ? 'green' : 'red'}"><b>${p.dir}</b></td><td>${p.lots}</td>
        <td>${dec(p.entry, p.digits)}</td><td><button class="lnk" data-edit="sl:${p.id}">${p.sl ? dec(p.sl, p.digits) : 'add'}</button></td><td><button class="lnk" data-edit="tp:${p.id}">${p.tp ? dec(p.tp, p.digits) : 'add'}</button></td>
        <td>${px != null ? dec(px, p.digits) : '…'}</td><td class="${pl >= 0 ? 'green' : 'red'}"><b>${pl != null ? GT.money(pl) : '…'}</b></td>
        <td><button class="btn ghost small" data-close="${p.id}">Close</button></td></tr>`; }).join('')
      : '<tr><td class="muted" style="padding:14px">No open trades. Choose the lots and press BUY or SELL.</td></tr>';
    $('pos').querySelectorAll('[data-close]').forEach(b => b.onclick = () => close(+b.dataset.close));
    $('pos').querySelectorAll('[data-edit]').forEach(b => b.onclick = () => {
      const [k, id] = b.dataset.edit.split(':'), p = acc.positions.find(x => x.id === +id); if (!p) return;
      const v = prompt((k === 'sl' ? 'Stop loss' : 'Take profit') + ' price for ' + p.name + ' (empty = remove):', p[k] ? dec(p[k], p.digits) : '');
      if (v === null) return; const n = +v;
      if (v.trim() === '') p[k] = 0;
      else if (!(n > 0)) return GT.toast('That is not a price.');
      else {
        const px = prices[p.sym] ?? p.entry, buy = p.dir === 'BUY';
        if (k === 'sl' && (buy ? n >= px : n <= px)) return GT.toast('The stop must be on the losing side of the current price.');
        if (k === 'tp' && (buy ? n <= px : n >= px)) return GT.toast('The target must be on the winning side of the current price.');
        p[k] = n; if (k === 'sl' && !p.sl0) p.sl0 = n;
      }
      save(); drawLines(); tick();
    });
    // the TP / SL boxes on the chart follow every open trade of this market
    dr.setBoxes(acc.positions.filter(p => p.sym === lc.sym).map(p => {
      const px = prices[p.sym]; return { dir: p.dir, t1: p.t1 || Math.floor((p.open || Date.now()) / 1000), entry: p.entry, sl: p.sl, tp: p.tp, label: p.dir + ' ' + p.lots, pl: px != null ? plOf(p, px) : null };
    }));
    $('hist').innerHTML = acc.history.length ? acc.history.slice(0, 40).map(h => `<div class="sig">
      <span class="tag ${h.dir === 'BUY' ? 'buy' : 'sell'}">${h.dir}</span>${GT.esc(h.name)} <span class="muted small">${h.lots} lot</span>${h.bot ? ' <span class="pill" style="font-size:10px;padding:1px 6px">bot: ' + GT.esc(h.bot) + '</span>' : ''} <b class="${h.pl >= 0 ? 'green' : 'red'}" style="float:right">${GT.money(h.pl)}</b>
      <div class="muted small">${dec(h.entry, h.digits)} → ${dec(h.exit, h.digits)} · ${GT.esc(h.why)} · ${new Date(h.time).toLocaleString()}</div></div>`).join('')
      : '<p class="muted small" style="padding:12px">Closed trades appear here.</p>';
    if (Date.now() - lastJ > 2000 || !journal.sig) { lastJ = Date.now(); journal.update(acc, prices); }
  }
  function drawLines() {
    plines.forEach(l => { try { lc.series.removePriceLine(l); } catch (e) { } }); plines = [];
    acc.positions.filter(p => p.sym === lc.sym).forEach(p => {
      const add = (price, color, title) => plines.push(lc.series.createPriceLine({ price, color, lineWidth: 1, lineVisible: false, axisLabelVisible: true, title }));
      add(p.entry, p.dir === 'BUY' ? '#38bdf8' : '#ff9bd2', `${p.dir} ${p.lots}`);
      if (p.sl) add(p.sl, '#ff5b6a', 'SL'); if (p.tp) add(p.tp, '#29d67c', 'TP');
    });
  }
  $('b-buy').onclick = () => open('BUY');
  $('b-sell').onclick = () => open('SELL');
  const topUp = () => {
    const max = GT.limit(user, 'demoMaxDeposit');
    const v = prompt(`How much demo money to add to "${acc.name}"? (up to ${GT.money(max, 0)})`, String(START)); if (v === null) return;
    const n = Math.round(+v); if (!(n > 0) || n > max) return GT.toast('Enter an amount between 1 and ' + GT.money(max, 0) + '.');
    acc.balance += n; acc.deposits.push({ time: Date.now(), amount: n }); save(); tick();
    GT.toast('Added ' + GT.money(n, 0) + ' of demo money to ' + acc.name + '.');
  };
  $('b-top').onclick = topUp; $('b-top2').onclick = topUp;
  $('b-reset').onclick = () => {
    const first = (acc.deposits && acc.deposits[0] && acc.deposits[0].amount) || START;
    if (!confirm(`Close every trade of "${acc.name}", clear its history and journal, and start again with ${GT.money(first, 0)}?`)) return;
    acc = Object.assign({}, acc, { balance: first, positions: [], history: [], deposits: [{ time: Date.now(), amount: first }] }); save(); drawLines(); tick(); journal.sig = '';
  };
  /* ---------- several demo accounts ---------- */
  function drawAccs() {
    const d = GT.demos.all(user);
    $('acc-sel').innerHTML = Object.entries(d.list).sort((a, b) => a[1].created - b[1].created).map(([id, a]) => `<option value="${id}" ${id === accId ? 'selected' : ''}>${GT.esc(a.name)} · ${GT.money(a.balance, 0)}</option>`).join('');
  }
  function switchTo(id) { GT.demos.setActive(user, id); acc = load(); acc.positions.forEach(p => watch(p.sym)); drawAccs(); drawLines(); journal.sig = ''; tick(); }
  $('acc-sel').onchange = e => switchTo(e.target.value);
  $('acc-new').onclick = () => {
    const d = GT.demos.all(user), max = GT.limit(user, 'demoAccounts');
    if (Object.keys(d.list).length >= max) return GT.toast(`You can have ${max} demo accounts. Delete one first.`, 3500);
    const name = prompt('Name for the new demo account:', 'Account ' + (Object.keys(d.list).length + 1)); if (name === null) return;
    const maxDep = GT.limit(user, 'demoMaxDeposit'), v = prompt(`Starting balance in $ (up to ${GT.money(maxDep, 0)}):`, String(START)); if (v === null) return;
    const dep = Math.round(+v); if (!(dep > 0) || dep > maxDep) return GT.toast('Enter a balance between 1 and ' + GT.money(maxDep, 0) + '.');
    GT.demos.create(user, name.trim() || 'Demo account', dep); switchTo(GT.demos.active(user).id);
    GT.toast('Created "' + (name.trim() || 'Demo account') + '" with ' + GT.money(dep, 0));
  };
  $('acc-ren').onclick = () => { const n = prompt('New name for this account:', acc.name); if (n && n.trim()) { acc.name = n.trim().slice(0, 30); save(); drawAccs(); } };
  $('acc-del').onclick = () => {
    const d = GT.demos.all(user);
    if (Object.keys(d.list).length <= 1) return GT.toast('This is your only demo account — use Reset instead.');
    if (!confirm(`Delete the demo account "${acc.name}" with all its trades and journal? This cannot be undone.`)) return;
    GT.demos.remove(user, accId); switchTo(GT.demos.active(user).id);
  };
  drawAccs();
  addEventListener('storage', e => { if (e.key === KEY) { acc = load(); acc.positions.forEach(p => watch(p.sym)); drawAccs(); drawLines(); tick(); } });

  /* ---------- journal ---------- */
  const journal = GT.feature('journal', user) ? new GTJournal($('journal'), { start: START }) : { update() { }, sig: '' };
  if (!GT.feature('journal', user)) $('jr-wrap').style.display = 'none';

  const origLoad = lc.load.bind(lc);
  lc.load = async s => { await origLoad(s); dr.load(); orderInfo(true); drawLines(); acc.positions.forEach(p => watch(p.sym)); if (view === 'tv') drawTV(); };
  tick();
  lc.start();
})();
