/* ============================================================
   G TRADERS — site settings
   Change things here; every page reads this file.
   ============================================================ */
window.GT_CONFIG = {
  siteName: 'G TRADERS',
  tagline: 'Trading tools for MetaTrader 5 — build, test and run your own robots.',
  email: 'supportgtraders@gmail.com',
  year: new Date().getFullYear(),
  build: 'v4.0',
 
  // Deriv: market data for charts, signals and the demo.
  // 1089 is Deriv's public test app id. Register your own free app id at
  // https://developers.deriv.com (Dashboard > Register application) and put it here.
  derivAppId: 1089,
  // Your Deriv partner link (a=9011 from your old site)
  derivPartnerUrl: 'https://partner-tracking.deriv.com/click?a=9011&o=1&c=4&link_id=1',
 
  // Accounts. Empty = test mode (accounts saved only in this browser).
  // Paste your Firebase web-app settings here to switch on real accounts (see README, "Real accounts"):
  //   firebase: { apiKey: '...', authDomain: '...', projectId: '...', appId: '...' },
  // The apiKey of a Firebase web app is not a secret — the security comes from firestore.rules.
  firebase: {
    apiKey: 'AIzaSyD_KKFkMIq_ITwReQQT0CnZJOjEsstOBPQ',
    authDomain: 'gtraders-47a0f.firebaseapp.com',
    projectId: 'gtraders-47a0f',
    storageBucket: 'gtraders-47a0f.firebasestorage.app',
    messagingSenderId: '373951258573',
    appId: '1:373951258573:web:10d18dd2e446bc3a112e84'
  },
 
  // Who may open the control panel (admin.html). Use the same list in firestore.rules.
  adminEmails: ['supportgtraders@gmail.com'],
 
  // Login protection: wrong passwords allowed, then a lock of this many minutes
  lockAttempts: 3,
  lockMinutes: 15,
 
  // Default bot download limits (the control panel can change them for everyone or one user)
  dlDay: 1, dlWeek: 7, dlMonth: 30,
 
  // Free plan rules
  trialDays: 30,            // sign-up trial length
  demoStartBalance: 10000,  // virtual money in the demo
 
  // MQL5 Market
  mql5Seller: 'https://www.mql5.com/en/users/gayanindika.rox/seller',
  studioGuide: 'https://www.mql5.com/en/blogs/post/776823',
 
  // id      = MQL5 product number (used for the live MQL5 widget and reviews)
  // page    = the Details page on this site
  products: [
    {
      key: 'studio', id: 199216, name: 'GTM EA Bot Studio', full: 'GTM EA Bot Studio — Drag and Drop EA Builder', type: 'Utility · MT5', badge: 'New',
      price: '$99 · rent from $30 / month', img: 'assets/img/studio-promo.jpg', page: 'studio.html',
      docs: [{ title: 'User guide (English)', url: 'docs/GTM_EA_Bot_Studio_Guide_English.pdf' }, { title: 'User guide (Sinhala)', url: 'docs/GTM_EA_Bot_Studio_Guide_Sinhala.pdf' }],
      text: 'A drag-and-drop robot builder inside MetaTrader 5. 68 blocks, a quick test on the chart, live trading with a live card and SL / TP boxes.',
      features: ['68 blocks in 9 groups: events, filters, logic, 11 indicators, price & math, orders, trade care, safety and tools',
        'Quick test on the chart: spread per candle, gaps, breakeven and trailing checked inside the candle, commission per lot',
        'Live card with a tick chart, B / S marks and the bot\'s own result; SL / TP boxes follow every trade',
        'Risk % sized from the stop loss, daily loss stop, most trades a day, equity stop and the biggest lot',
        'Library, 8 ready templates, open or locked sharing; any saved bot runs in the Strategy Tester',
        'Translate the interface with your own AI key and ask the built-in help chat']
    },
    {
      key: 'botmaker', id: 198085, name: 'GTM Bot Maker', full: 'GTM Bot Maker — No Code EA Builder', type: 'Expert Advisor · MT5',
      price: '$99 · rent from $30 / month', img: 'assets/img/smc-bot-banner.jpg', page: 'product-botmaker.html',
      docs: [{ title: 'User guide (English)', url: 'docs/GTM_Bot_Maker_Guide_English.pdf' }],
      text: 'Build an automated strategy by choosing entry types, filters and risk settings on the chart, preview the signals on past candles, then run it live.',
      features: ['No-code builder: ready-made blocks on the chart — nothing to code or compile',
        'Four entry types: MA cross, confirm only, breakout and grid',
        '15 filters: trend, RSI, Bollinger, MACD, Stochastic, ADX, CCI, Parabolic SAR, Ichimoku, Supertrend, candle close, pivots, custom indicator, time window and news',
        'Preview on history with SL / TP boxes, trade statistics, win rate and profit factor before going live',
        'Exits: take profit, stop loss, trailing, breakeven and partial closes, plus filter-based exits',
        'Risk: fixed lot or risk %, daily loss stop, daily target and capital per symbol',
        'Several bots for different symbols from one chart, each with its own settings',
        'Live guide robot that explains decisions in plain language (12 languages)',
        'Optional AI chat (your own API key) and Telegram alerts / remote commands',
        'Save bots as files and load them on another terminal; 8 ready templates']
    },
    {
      key: 'panelpro', id: 189009, name: 'GTM Panel Pro', full: 'GTM PANEL PRO — Manual Trade & Group Management', type: 'Utility · MT5',
      price: '$55', img: 'assets/img/gtm-panel-hero.jpg', page: 'product-panelpro.html',
      text: 'Manual execution and risk management: trade groups, drag-to-adjust prices, pending orders, breakeven and trailing, Telegram monitoring and remote control.',
      features: ['Four independent trade groups (A–D), each with its own magic number, lot, stop, target and statistics',
        'Limit desk with four pending-order slots — BUY / SELL LIMIT / STOP with OCO and auto-expiry',
        'Drag stops and targets on the chart with risk / reward blocks and a price preview',
        'Breakeven and trailing stop that respect the broker\'s minimum distance',
        'Live AI guide with 36+ alerts about account risk, trade status and the market',
        'Telegram: alerts, screenshots, reports and optional remote control',
        'Daily and monthly statistics per group and per slot, rebuilt from the deal history',
        'Six themes, three sizes and movable windows',
        'Manual tool — it does not trade automatically or generate signals; demo works in the Strategy Tester']
    },
    {
      key: 'trademgr', id: 191058, name: 'Trade Manager GTM', full: 'Trade Manager GTM', type: 'Utility · MT5',
      price: '$35', img: 'assets/img/gtm-panel-hero.jpg', page: 'product-trademgr.html',
      text: 'Five independent order slots — one market scope and four pending slots — to place, protect and close many positions from one panel.',
      features: ['Five scopes: MARKET plus four pending slots (L1–L4), colour-coded',
        'Buy / Sell Limit and Stop orders with expiry and OCO',
        'Drag entry, stop loss and take profit lines on the chart with live prices',
        'Floating target box tracking six profit / loss levels with progress %',
        'One-click breakeven, close all and selective close',
        'Stops and targets in account currency, lot size checks',
        'Twelve themes plus night mode, movable panel and an optional password lock',
        'Own magic numbers so it never touches other EAs on the chart',
        'Place several orders per press']
    },
    {
      key: 'journal', id: 196039, name: 'GTM Journal', full: 'Trading Journal and Analytics (GTM Journal)', type: 'Utility · MT5',
      price: '$49', img: 'assets/img/journal-icon.jpg', page: 'product-journal.html',
      text: 'Turns your closed trades into a journal with ten pages: calendar, dashboard, trade log and performance breakdowns, with R-multiples from the original stop.',
      features: ['Rebuilds every trade from the deal history: entry, exit, the original stop and moved stops — honest R-multiples',
        'Ten pages: calendar, dashboard with equity curve, trade log with filters, trade detail charts and analytics by setup, session and hour',
        'Tag trades by setup (SMC, ICT, Elliott Wave and more) or add your own',
        'Screenshot gallery linked to each trade, filtered by win / loss',
        'Daily, weekly and monthly reports by symbol and strategy',
        'Local AI coach that looks for leaks; optional Google / OpenAI / Anthropic analysis with your own key',
        '12 languages, light / dark themes, resizable panel that remembers its place',
        'Read-only: it never places, changes or closes trades']
    },
    {
      key: 'maspanel', id: 194257, name: 'MA Signal Panel', full: 'Multiple Moving Average Signal Panel', type: 'Indicator · MT5', badge: 'Free',
      price: 'Free', img: 'assets/img/smc-bot-square.jpg', page: 'product-maspanel.html',
      text: 'Eight moving averages on one chart with BUY / SELL signals when two chosen averages cross, all set from an on-chart panel.',
      features: ['Up to eight moving averages on one chart — SMA, EMA, SMMA or LWMA',
        'Arrows when the two lines you choose cross',
        'On-chart panel: change everything without opening the settings',
        'Confirmation bars: wait until price holds the cross',
        'Closed-bar mode (no repaint) or live-bar mode for early warnings',
        'Settings saved per symbol and timeframe',
        'Sound, push and popup alerts; custom arrow styles and colours',
        'No account access, no orders, no network use']
    },
    {
      key: 'background', id: 191593, name: 'Chart Image Pro', full: 'Background Image and Logo for MT5 chart', type: 'Utility · MT5',
      price: '$30', img: 'assets/img/chartimage-promo.jpg', page: 'product-background.html',
      text: 'Put your own picture and logo behind the MT5 chart.',
      features: ['Your own picture behind the candles of any MT5 chart',
        'Your logo on the chart — for streams, screenshots and branding',
        'Works with any symbol and timeframe',
        'Does not trade — a display tool only']
    }
  ]
};
// links made from the MQL5 product number
window.GT_CONFIG.products.forEach(p => {
  p.url = 'https://www.mql5.com/en/market/product/' + p.id;
  p.reviews = p.url + '#!tab=reviews';
  p.widget = 'https://www.mql5.com/en/market/widget/' + p.id + '/mid?f=1&fw=html';   // official MQL5 Market widget (live price + rating)
});
 