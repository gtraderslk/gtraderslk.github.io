/* G TRADERS — Charts page: TradingView widgets with a market picker */
(function () {
  const $ = id => document.getElementById(id);
  if (!GT.feature('charts', GT.auth.current())) { $('tv-panel').innerHTML = '<div class="gate"><div class="lock">🛠</div><h2 style="font-size:24px">Charts are paused</h2><p class="muted">Please check back soon.</p></div>'; return; }
  const MARKETS = [
    ['Crypto', [['BINANCE:BTCUSDT', 'Bitcoin'], ['BINANCE:ETHUSDT', 'Ethereum'], ['BINANCE:SOLUSDT', 'Solana'], ['BINANCE:BNBUSDT', 'BNB'], ['BINANCE:XRPUSDT', 'XRP'],
      ['BINANCE:DOGEUSDT', 'Dogecoin'], ['BINANCE:ADAUSDT', 'Cardano'], ['BINANCE:AVAXUSDT', 'Avalanche'], ['BINANCE:LINKUSDT', 'Chainlink'], ['BINANCE:TRXUSDT', 'TRON'],
      ['BINANCE:TONUSDT', 'Toncoin'], ['BINANCE:DOTUSDT', 'Polkadot'], ['BINANCE:LTCUSDT', 'Litecoin'], ['BINANCE:SUIUSDT', 'Sui'], ['BINANCE:PEPEUSDT', 'Pepe'],
      ['CRYPTOCAP:TOTAL', 'Total crypto market cap'], ['CRYPTOCAP:BTC.D', 'Bitcoin dominance']]],
    ['Forex', [['FX:EURUSD', 'EUR/USD'], ['FX:GBPUSD', 'GBP/USD'], ['FX:USDJPY', 'USD/JPY'], ['FX:AUDUSD', 'AUD/USD'], ['FX:USDCAD', 'USD/CAD'],
      ['FX:USDCHF', 'USD/CHF'], ['FX:NZDUSD', 'NZD/USD'], ['FX:EURJPY', 'EUR/JPY'], ['FX:GBPJPY', 'GBP/JPY'], ['FX:EURGBP', 'EUR/GBP'],
      ['FX:AUDJPY', 'AUD/JPY'], ['FX:EURAUD', 'EUR/AUD'], ['FX:GBPAUD', 'GBP/AUD'], ['FX:EURCAD', 'EUR/CAD'], ['FX:CHFJPY', 'CHF/JPY'], ['FX:USDZAR', 'USD/ZAR']]],
    ['Metals & energy', [['OANDA:XAUUSD', 'Gold'], ['OANDA:XAGUSD', 'Silver'], ['OANDA:XPTUSD', 'Platinum'], ['TVC:USOIL', 'US Oil (WTI)'], ['TVC:UKOIL', 'Brent Oil'], ['NYMEX:NG1!', 'Natural gas']]],
    ['Indices', [['FOREXCOM:SPXUSD', 'S&P 500'], ['FOREXCOM:NSXUSD', 'US 100'], ['FOREXCOM:DJI', 'Dow 30'], ['TVC:DXY', 'US Dollar Index'], ['XETR:DAX', 'Germany 40'],
      ['TVC:UKX', 'UK 100'], ['TVC:NI225', 'Japan 225'], ['TVC:HSI', 'Hang Seng'], ['TVC:VIX', 'Volatility (VIX)']]],
    ['Stocks', [['NASDAQ:AAPL', 'Apple'], ['NASDAQ:NVDA', 'NVIDIA'], ['NASDAQ:TSLA', 'Tesla'], ['NASDAQ:MSFT', 'Microsoft'], ['NASDAQ:AMZN', 'Amazon'],
      ['NASDAQ:META', 'Meta'], ['NASDAQ:GOOGL', 'Alphabet'], ['NYSE:JPM', 'JPMorgan'], ['NASDAQ:NFLX', 'Netflix'], ['NASDAQ:AMD', 'AMD']]]
  ];
  const TFS = [['1', '1m'], ['5', '5m'], ['15', '15m'], ['60', '1h'], ['240', '4h'], ['D', '1D'], ['W', '1W']];
  let sym = GT.qs('tv') || GT.store.get('gt_tv_sym', 'BINANCE:BTCUSDT');
  let tf = GT.store.get('gt_tv_tf', '60');

  function widget(host, file, cfg) {
    host.innerHTML = '';
    const box = document.createElement('div'); box.className = 'tradingview-widget-container'; box.style.height = '100%';
    const w = document.createElement('div'); w.className = 'tradingview-widget-container__widget'; w.style.height = '100%';
    const s = document.createElement('script'); s.src = 'https://s3.tradingview.com/external-embedding/' + file; s.async = true;
    s.textContent = JSON.stringify(cfg);
    box.appendChild(w); box.appendChild(s); host.appendChild(box);
  }
  function nameOf(s) { for (const [, l] of MARKETS) for (const [k, n] of l) if (k === s) return n; return s; }

  function draw() {
    $('tv-cur').textContent = nameOf(sym) + '  ▾'; $('ta-name').textContent = nameOf(sym);
    $('tv-open').href = 'https://www.tradingview.com/chart/?symbol=' + encodeURIComponent(sym);
    widget($('tv-adv'), 'embed-widget-advanced-chart.js', {
      autosize: true, symbol: sym, interval: tf, timezone: 'Etc/UTC', theme: 'dark', style: '1', locale: 'en',
      backgroundColor: '#05080f', gridColor: 'rgba(30,40,60,0.4)', allow_symbol_change: true, calendar: false,
      hide_side_toolbar: false, withdateranges: true, details: true, studies: ['STD;EMA', 'STD;RSI'], support_host: 'https://www.tradingview.com'
    });
    widget($('tv-ta'), 'embed-widget-technical-analysis.js', {
      interval: tf === 'D' ? '1D' : tf === 'W' ? '1W' : tf + 'm', width: '100%', height: '100%', isTransparent: true, symbol: sym,
      showIntervalTabs: true, displayMode: 'single', locale: 'en', colorTheme: 'dark'
    });
  }

  // category quick tabs
  let cat = null;
  $('tv-cats').innerHTML = MARKETS.map(([g]) => `<button type="button" data-g="${g}">${g}</button>`).join('') + '<a href="signals.html" class="dv" title="Deriv synthetic indices are not on TradingView — they are on our Signal Engine">Deriv synthetics →</a>';
  $('tv-cats').querySelectorAll('button').forEach(b => b.onclick = e => { e.stopPropagation(); cat = b.dataset.g; host.classList.add('open'); q.value = ''; list(); q.focus(); });
  // size and full screen
  const SZ = { s: 460, m: 680, l: 900 }; let size = GT.store.get('gt_tv_size', 'm');
  const setSize = k => { size = k; GT.store.set('gt_tv_size', k); $('tv-adv').style.height = SZ[k] + 'px'; $('tv-sz').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.z === k)); };
  $('tv-sz').querySelectorAll('button').forEach(b => b.onclick = () => setSize(b.dataset.z)); setSize(size);
  $('tv-full').onclick = () => { const el = $('tv-panel'); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => el.classList.toggle('fake-full')); else el.classList.toggle('fake-full'); };
  document.addEventListener('fullscreenchange', () => { $('tv-full').textContent = document.fullscreenElement ? '✕ Exit full screen' : '⛶ Full screen'; });

  // market picker
  const host = $('tvpick'), q = $('tv-q'), items = $('tv-items');
  function list() {
    const f = q.value.trim().toLowerCase();
    items.innerHTML = MARKETS.filter(([g]) => f || !cat || g === cat).map(([g, l]) => {
      const m = l.filter(([k, n]) => !f || n.toLowerCase().includes(f) || k.toLowerCase().includes(f));
      return m.length ? `<div class="grp">${g}</div>` + m.map(([k, n]) => `<div class="it ${k === sym ? 'on' : ''}" data-s="${k}"><span>${n}</span><small>${k.split(':')[1]}</small></div>`).join('') : '';
    }).join('') + (f ? `<div class="it" data-s="${GT.esc(q.value.trim().toUpperCase())}"><span>Open "${GT.esc(q.value.trim().toUpperCase())}"</span><small>any TradingView symbol</small></div>` : '');
    items.querySelectorAll('.it').forEach(el => el.onclick = () => { sym = el.dataset.s; GT.store.set('gt_tv_sym', sym); host.classList.remove('open'); draw(); });
  }
  $('tv-cur').onclick = () => { cat = null; host.classList.toggle('open'); q.value = ''; list(); q.focus(); };
  q.oninput = list;
  q.onkeydown = e => { if (e.key === 'Enter') { const f = items.querySelector('.it'); if (f) f.click(); } };
  document.addEventListener('click', e => { if (!host.contains(e.target)) host.classList.remove('open'); });

  $('tv-tf').innerHTML = TFS.map(([v, l]) => `<button data-v="${v}" class="${v === tf ? 'on' : ''}">${l}</button>`).join('');
  $('tv-tf').querySelectorAll('button').forEach(b => b.onclick = () => {
    tf = b.dataset.v; GT.store.set('gt_tv_tf', tf); $('tv-tf').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); draw();
  });

  widget($('tv-cal'), 'embed-widget-events.js', { colorTheme: 'dark', isTransparent: true, width: '100%', height: '100%', locale: 'en',
    importanceFilter: '0,1', countryFilter: 'us,eu,gb,jp,au,ca,ch,cn' });
  draw();
})();
