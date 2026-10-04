/* G TRADERS — home page live market board (Binance crypto + Deriv forex / synthetics) */
(function () {
  const BOARD = {
    Crypto: [['BTCUSDT', 'BTC/USDT'], ['ETHUSDT', 'ETH/USDT'], ['SOLUSDT', 'SOL/USDT'], ['BNBUSDT', 'BNB/USDT'], ['XRPUSDT', 'XRP/USDT'], ['DOGEUSDT', 'DOGE/USDT']],
    Forex: [['frxEURUSD', 'EUR/USD'], ['frxGBPUSD', 'GBP/USD'], ['frxUSDJPY', 'USD/JPY'], ['frxGBPJPY', 'GBP/JPY'], ['frxXAUUSD', 'XAU/USD'], ['frxUSDCAD', 'USD/CAD']],
    Synthetics: [['R_50', 'Volatility 50'], ['R_75', 'Volatility 75'], ['R_100', 'Volatility 100'], ['1HZ100V', 'Vol 100 (1s)'], ['BOOM1000', 'Boom 1000'], ['CRASH1000', 'Crash 1000']]
  };
  const host = document.getElementById('board'); if (!host) return;
  const tabs = host.querySelector('.tabs'), grid = host.querySelector('.tiles3'), note = host.querySelector('.note');
  let list = [], stops = [], cur = 'Crypto', seq = 0;
  const dec = (meta, v) => meta && meta.src === 'deriv' ? GTMarket.digitsOf(meta) : GTMarket.digitsOf({ pip: GTMarket.pipFromPrice(v) });

  tabs.innerHTML = Object.keys(BOARD).map(k => `<button data-k="${k}">${k}</button>`).join('');
  tabs.querySelectorAll('button').forEach(b => b.onclick = () => show(b.dataset.k));
  host.querySelectorAll('a[data-go]').forEach(a => a.addEventListener('click', () => { }));

  function show(k) {
    cur = k; const my = ++seq;
    tabs.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    stops.forEach(f => { try { f(); } catch (e) { } }); stops = [];
    const rows = BOARD[k].map(([s, n]) => [list.find(x => x.symbol === s) || null, s, n]).filter(r => !list.length || r[0]);
    grid.innerHTML = rows.map(([m, s, n]) => `<a class="qt" id="q-${s}" href="signals.html?symbol=${s}"><div class="n"><span>${n}</span><span class="cl">${m && !m.exchange_is_open ? 'closed' : ''}</span></div>
      <div class="p">—</div><div class="c muted">—</div></a>`).join('') || '<p class="muted small">No markets in this group right now.</p>';
    if (!list.length) return;
    rows.forEach(async ([meta, s]) => {
      const el = document.getElementById('q-' + s); if (!el || !meta) return;
      let open = null, last = null;
      const paint = q => {
        if (my !== seq) return;
        const p = el.querySelector('.p'), c = el.querySelector('.c');
        p.textContent = Number(q).toFixed(dec(meta, q));
        if (open) { const ch = (q - open) / open * 100; c.textContent = (ch >= 0 ? '+' : '') + ch.toFixed(2) + '%'; c.className = 'c ' + (ch >= 0 ? 'green' : 'red'); }
        if (last != null && q !== last) { el.classList.remove('up', 'dn'); void el.offsetWidth; el.classList.add(q > last ? 'up' : 'dn'); setTimeout(() => el.classList.remove('up', 'dn'), 450); }
        last = q;
      };
      try { open = await GTFeed.dayOpen(meta); } catch (e) { }
      if (!meta.exchange_is_open) {
        try { const h = await GTFeed.history(meta, 60, 1); if (h.length) paint(h[h.length - 1].close); } catch (e) { }
        return;
      }
      try { const stop = await GTFeed.ticks(meta, paint); if (my !== seq) stop(); else stops.push(stop); }
      catch (e) { try { const h = await GTFeed.history(meta, 60, 1); if (h.length) paint(h[h.length - 1].close); } catch (x) { } }
    });
  }

  show(cur);
  GTFeed.symbols().then(r => {
    list = r.list;
    if (!r.derivOk && !r.binanceOk) { note.textContent = 'Live prices could not load (network or ad-blocker). Open the Charts page for TradingView prices.'; return; }
    note.innerHTML = '<span class="live-dot"></span> Live prices — crypto from Binance, forex and synthetics from Deriv · change since today\'s open · click a market for its signals';
    show(cur);
  });
})();
