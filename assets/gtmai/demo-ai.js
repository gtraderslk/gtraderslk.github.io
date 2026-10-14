/* ============================================================
   GTM AI web - Demo AI (no key needed)
   A small rule-based assistant that answers like the real AI:
   it returns the same JSON (reply + actions) the panel understands,
   so every action runs through the real panel code (APPLY included).
   Paste your own AI key on the page for the full AI.
   ============================================================ */
(function (G) {
'use strict';
const TFS = ['M1', 'M5', 'M15', 'M30', 'H1', 'H4'];
const lc = s => String(s || '').toLowerCase();
const norm = s => lc(s).replace(/[\s._\-()/]/g, '');
const money = v => (v < 0 ? '-$' : '$') + Math.abs(+v || 0).toFixed(2);

function findSyms(text, st) {
  const t = norm(text), out = [];
  const alias = { gold: 'XAUUSD', xau: 'XAUUSD', silver: 'XAGUSD', bitcoin: 'BTCUSD', btc: 'BTCUSD', ethereum: 'ETHUSD', eth: 'ETHUSD', euro: 'EURUSD', pound: 'GBPUSD', yen: 'USDJPY' };
  (st.symbols || []).forEach(s => {
    const a = norm(s.short), b = norm(s.name);
    if ((a.length >= 3 && t.includes(a)) || (b.length >= 4 && t.includes(b))) out.push(s.short);
  });
  Object.keys(alias).forEach(k => { if (new RegExp('\\b' + k + '\\b', 'i').test(text)) { const s = (st.symbols || []).find(x => norm(x.name).startsWith(norm(alias[k]))); if (s && !out.includes(s.short)) out.push(s.short); } });
  // V75 style
  const m = lc(text).match(/\bv\s?(10|25|50|75|100)(\s?\(?1s\)?)?\b/);
  if (m) { const want = 'V' + m[1] + (m[2] ? '.1s' : ''); const s = (st.symbols || []).find(x => x.short === want); if (s && !out.includes(s.short)) out.push(s.short); }
  return out;
}
const R = (reply, actions) => JSON.stringify({ reply, reply_en: reply, lang: 'en', actions: actions || [] });

function brain(user, st) {
  const t = lc(user).trim();
  const syms = findSyms(user, st);
  const sym = syms[0] || 'all';
  const has = re => re.test(t);
  const open = st.open_trades || [], closed = st.last_closed || [];
  const tfAll = (user.match(/\b(M1|M5|M15|M30|H1|H4)\b/gi) || []).map(x => x.toUpperCase());
  const htfWord = /(H1|H4)[^,.;]*(trend|ema\s*50|50\s*\/\s*200)|(trend|ema\s*50|50\s*\/\s*200)[^,.;]*(H1|H4)/i.exec(user);
  const htfTf = htfWord ? (htfWord[1] || htfWord[4]).toUpperCase() : null;
  const tf = (tfAll.filter(x => x !== htfTf).pop()) || (htfTf ? null : tfAll[0]) || null;

  if (!t || has(/^(hi|hello|hey|helo|ayubowan|kohomada|help|what can you do|\/help)\b/))
    return R('Hi, I am the GTM AI demo. You can say: "report today", "close all in profit", "move V75 to break even", "trailing on", ' +
      '"make a V25 setup: H1 EMA 50/200 trend, M5 RSI 30/70, test it first", "stop gold for today if it loses 10 dollars", "replay the last trade", "market brief". ' +
      'Paste your own AI key above the panel for the full AI. Signals are predictions, not promises.');

  // ---- open a trade now
  if (has(/\b(buy|sell)\b/) && has(/\b(open|now|enter|place|ganna|danna)\b/) && syms.length && !has(/setup|rule|entry model/)) {
    const side = has(/\bsell\b/) ? 'sell' : 'buy'; const lm = t.match(/(\d+(?:\.\d+)?)\s*lot/);
    return R('Opening a ' + side.toUpperCase() + ' on ' + sym + ' needs your APPLY on the panel. It is a simulator trade, no real money.',
      [Object.assign({ type: 'open', symbol: sym, side }, lm ? { lot: +lm[1] } : {})]);
  }
  // ---- close
  if (has(/\bclose\b|wahanna|wahala|close karanna/)) {
    const only = has(/profit|labha|win/) ? 'profit' : (has(/loss|parad/) ? 'loss' : 'any');
    const side = has(/\bbuy/) ? 'buy' : (has(/\bsell/) ? 'sell' : 'all');
    if (!open.length) return R('There is no open trade to close right now.');
    return R('Closing ' + (side === 'all' ? '' : side + ' ') + 'trades on ' + (sym === 'all' ? 'all symbols' : sym) + (only === 'any' ? '' : ' that are in ' + only) + '.',
      [{ type: 'close', symbol: sym, side, only }]);
  }
  // ---- break-even / trailing
  if (has(/break ?even|\bbe\b|breakeven/)) {
    if (!open.length) return R('No open trade yet - break-even is used on open trades. Your setups already move the stop to break-even when they are set to.');
    return R('Moving the stop to break-even plus a little on ' + (sym === 'all' ? 'all open trades' : sym) + '.', [{ type: 'breakeven', symbol: sym, offset_points: 20 }]);
  }
  if (has(/trail/)) {
    const on = !has(/\b(off|stop|nawattanna)\b/);
    return R('Trailing stop ' + (on ? 'on' : 'off') + ' for ' + (sym === 'all' ? 'all symbols' : sym) + '.', [{ type: 'trailing', symbol: sym, on, start_pct: 60, dist_pct: 50 }]);
  }
  // ---- pause / run / live
  if (has(/\b(pause|stop trading|nawattanna|natara)\b/)) return R('Paused. No new trades; open trades are still managed.', [{ type: 'pause' }]);
  if (has(/\b(run|resume|start trading|start)\b/)) return R('Starting the scan - RUN asks for your APPLY first.', [{ type: 'run' }]);
  if (has(/\blive\b/) && has(/mode|switch|real/)) return R('The web version is a simulator only. LIVE trading is done in MetaTrader 5 with the full product.');
  // ---- account guard
  const num = (t.match(/(\d+(?:\.\d+)?)/) || [])[1];
  if (has(/daily loss|loss limit|lose.*day|day.*loss/) && num && !syms.length) return R('Daily loss limit set to ' + num + (has(/%|percent/) ? '%' : ' dollars') + '. A looser rule asks for your APPLY.', [{ type: 'risk', scope: 'global', dayLossOn: true, dayLoss: +num, dayLossUnit: has(/%|percent/) ? 'pct' : 'usd' }]);
  if (has(/profit target|target.*day|day.*target/) && num) return R('Daily profit target set to ' + num + (has(/%|percent/) ? '%' : ' dollars') + '.', [{ type: 'risk', scope: 'global', dayProfitOn: true, dayProfit: +num, dayProfitUnit: has(/%|percent/) ? 'pct' : 'usd' }]);
  if (has(/drawdown|\bdd\b/) && num) return R('Max drawdown set to ' + num + '% from the top.', [{ type: 'risk', scope: 'global', ddOn: true, ddPct: +num }]);
  if (has(/max.*trades|trades a day|trades per day/) && num) return syms.length ? R('Max ' + num + ' trades a day on ' + sym + '.', [{ type: 'risk', scope: sym, symMax: +num }]) : R('Max ' + num + ' trades a day for the account.', [{ type: 'risk', scope: 'global', maxDayOn: true, maxDay: +num }]);
  if (syms.length && has(/stop|lose|loses|loss|parad/) && num && has(/today|day|dawas/)) return R('OK - ' + sym + ' stops for the day when it loses ' + money(+num) + '.', [{ type: 'risk', scope: sym, symLoss: +num }]);
  if (has(/guard|risk rules|limits/)) return R('Here is the Account Guard.', [{ type: 'show_tab', tab: 'guard' }, { type: 'report', kind: 'guard' }]);
  // ---- setups (entry model) - always tested first
  const ent = has(/smc|bos|choch|fvg|order block|\bob\b|sweep|structure/) ? 'smc' : has(/rsi/) ? 'rsi' : has(/macd/) ? 'macd' : has(/bollinger|\bbb\b/) ? (has(/break/) ? 'bb_break' : 'bb_bounce') : has(/stoch/) ? 'stoch' : has(/\bcci\b/) ? 'cci' : has(/\bsar\b|parabolic/) ? 'sar' : has(/\badx\b|dmi/) ? 'adx' : has(/breakout/) ? 'breakout' : has(/\b(ema|sma|ma)\b|moving average|cross/) ? 'ma' : null;
  if (ent && has(/setup|entry|model|strategy|make|build|hadanna|set |use |test|rule/)) {
    const nums = (t.match(/\d+(?:\.\d+)?/g) || []).map(Number).filter(n => ![1, 5, 15, 30, 4].includes(n) || n > 4);
    const ch = { on: true, tf: tf || 'M5' };
    const atr = t.match(/sl\s*(\d+(?:\.\d+)?)\s*atr/), atr2 = t.match(/tp\s*(\d+(?:\.\d+)?)\s*atr/);
    ch.slMode = 'atr'; ch.sl = atr ? +atr[1] : 1.5; ch.tp = atr2 ? +atr2[1] : 3; ch.be = true; ch.beAt = 50; ch.trail = has(/trail/); if (ch.trail) { ch.trStart = 60; ch.trDist = 50; }
    if (htfTf) { ch.htfOn = true; ch.htf = htfTf; ch.htfType = 'ma'; ch.hp1 = 50; ch.hp2 = 200; ch.hma = 'EMA'; }
    let what = '';
    switch (ent) {
      case 'rsi': { const lv = t.match(/rsi[^\d]*(?:\d+\s+)?(\d{1,2})\s*\/\s*(\d{1,2})\b/) || t.match(/\b([1-4]\d)\s*\/\s*([6-9]\d)\b/); ch.entry = 'rsi'; ch.p1 = 14; ch.lv1 = lv ? +lv[1] : 30; ch.lv2 = lv ? +lv[2] : 70; what = 'RSI 14 ' + ch.lv1 + '/' + ch.lv2; break; }
      case 'macd': ch.entry = 'macd'; ch.p1 = 12; ch.p2 = 26; ch.p3 = 9; what = 'MACD 12/26/9 cross'; break;
      case 'bb_bounce': case 'bb_break': ch.entry = ent; ch.p1 = 20; ch.lv1 = 2; what = 'Bollinger 20/2 ' + (ent === 'bb_break' ? 'break' : 'bounce'); break;
      case 'stoch': ch.entry = 'stoch'; ch.p1 = 14; ch.p2 = 3; ch.p3 = 3; ch.lv1 = 20; ch.lv2 = 80; what = 'Stochastic 14/3/3 20/80'; break;
      case 'cci': ch.entry = 'cci'; ch.p1 = 20; ch.lv1 = 100; what = 'CCI 20 level 100'; break;
      case 'sar': ch.entry = 'sar'; ch.lv1 = 0.02; ch.lv2 = 0.2; what = 'Parabolic SAR flip'; break;
      case 'adx': ch.entry = 'adx'; ch.p1 = 14; ch.lv1 = 20; what = 'ADX 14 +DI/-DI cross'; break;
      case 'breakout': ch.entry = 'breakout'; ch.p1 = 20; what = '20-candle breakout'; break;
      case 'smc': ch.entry = 'rule'; ch.buyRule = 'STRUCT(3,H1) == 1 AND (BOS(3) == 1 OR FVG(3) == 1)'; ch.sellRule = 'STRUCT(3,H1) == -1 AND (BOS(3) == -1 OR FVG(3) == -1)'; what = 'SMC rule: H1 structure + M5 BOS or FVG'; break;
      default: { const a = nums.find(n => n >= 3 && n < 100) || 9, b = nums.find(n => n > a) || 21; ch.entry = 'ma'; ch.p1 = a; ch.p2 = b; ch.ma = 'EMA'; what = 'EMA ' + a + '/' + b + ' cross'; }
    }
    const targets = syms.length ? syms : (st.symbols || []).slice(0, 1).map(s => s.short);
    if (!targets.length) return R('Add a symbol first (SETTINGS > + ADD / REMOVE SYMBOLS).');
    return R('New ' + ch.tf + ' setup for ' + targets.join(', ') + ': ' + what + (ch.htfOn ? ', only with the ' + ch.htf + ' EMA 50/200 trend' : '') +
      ', SL ' + ch.sl + ' ATR, TP ' + ch.tp + ' ATR, break-even at 50%. I tested it on the past candles - check the result and press APPLY if you like it. A test is a prediction, not a promise.',
      [{ type: 'setup', symbols: targets, changes: ch }, { type: 'test', symbols: targets, bars: 1000 }]);
  }
  // ---- reports
  if (has(/report|today|ada|how much|kiyada|profit|balance|equity|week|month/)) {
    const kind = has(/week|sathiye/) ? 'week' : has(/month|masaye/) ? 'month' : has(/open/) ? 'open' : 'today';
    return R('Balance ' + money(st.balance) + ', equity ' + money(st.equity) + ', today ' + money(st.day_pl) + '. ' + open.length + ' open trade' + (open.length === 1 ? '' : 's') + '.',
      [{ type: 'report', kind }, { type: 'show_tab', tab: 'analyzer', view: 'dashboard', period: kind === 'today' ? 'day' : (kind === 'open' ? 'day' : kind) }]);
  }
  // ---- why / explain
  if (has(/\bwhy\b|explain|reason|hethuwa/)) {
    const c = closed.find(x => !syms.length || syms.includes(x.symbol)) || open.find(x => !syms.length || syms.includes(x.symbol));
    if (!c) return R('There is no trade to explain yet.');
    return R(c.symbol + ' ' + c.side + (c.pl !== undefined ? ' (' + money(c.pl) + ')' : '') + ' was taken because: ' + (c.why || 'its entry setup gave a signal') + '. Results are never certain.',
      [{ type: c.time ? 'replay' : 'watch', symbol: c.symbol }]);
  }
  // ---- history / replay / tabs
  if (has(/replay|history|ithihasaya/)) return closed.length ? R('Replaying the last ' + (syms[0] || closed[0].symbol) + ' trade on HISTORY.', [{ type: 'replay', symbol: syms[0] || closed[0].symbol }]) : R('No closed trade yet. It shows here after the first trade closes.', [{ type: 'show_tab', tab: 'history' }]);
  if (has(/live trade|open trade|watch|show .*trade/)) return R(open.length ? 'Here is the open trade.' : 'No open trade right now - this is the LIVE TRADES tab.', open.length ? [{ type: 'watch', symbol: syms[0] || open[0].symbol }] : [{ type: 'show_tab', tab: 'live' }]);
  if (has(/calendar/)) return R('The calendar.', [{ type: 'show_tab', tab: 'calendar' }]);
  if (has(/analy[sz]er|statistic|stats/)) return R('The Data Analyzer.', [{ type: 'show_tab', tab: 'analyzer', view: 'dashboard', period: 'month' }]);
  if (has(/dashboard|home/)) return R('Dashboard.', [{ type: 'show_tab', tab: 'dashboard' }]);
  if (has(/setting/)) return R('Settings.', [{ type: 'show_tab', tab: 'settings' }]);
  // ---- market brief
  if (has(/brief|market|bias|trend|signal|what.*now/)) {
    const ss = (st.symbols || []).filter(s => s.ok).slice(0, 8).map(s => s.short + ' ' + (s.bias > 0 ? 'up' : (s.bias < 0 ? 'down' : 'flat')) + ' (' + Math.round((s.conf || 0) * 100) + '%)');
    return R(ss.length ? 'Market brief: ' + ss.join(', ') + '. This is a reading of the charts, not a promise.' : 'The prices are still loading.');
  }
  // ---- symbols
  if (has(/\badd\b/) && has(/symbol|pair|market/)) return R('Open SETTINGS > + ADD / REMOVE SYMBOLS and pick it from the list.', [{ type: 'show_tab', tab: 'settings' }]);
  if (has(/sinhala|tamil|language|bhasha/)) return R('The panel can show any language with your own AI key (it translates the labels). The demo AI speaks English.');
  return R('I am the demo AI, so I understand a set of commands: reports, close, break-even, trailing, pause / run, setups (MA, RSI, MACD, Bollinger, Stochastic, CCI, SAR, ADX, SMC), Account Guard limits, replay and market brief. Paste your own AI key above the panel to talk freely.');
}

function handle(method, url, body) {
  if (method === 'GET' && /\/models/.test(url))
    return { code: 200, body: JSON.stringify({ models: [{ name: 'models/gemini-flash-latest', supportedGenerationMethods: ['generateContent'] }] }) };
  if (/tts|audio|speech/i.test(url)) return { code: 400, body: '{"error":{"message":"demo: no voice files"}}' };
  let user = '', st = {};
  try {
    const j = JSON.parse(body);
    const c = j.contents || [];
    const last = c[c.length - 1];
    (last && last.parts || []).forEach(p => {
      const tx = String(p.text || '');
      if (/^USER: /.test(tx)) user = tx.slice(6);
      else if (/^SOURCE: /.test(tx)) { const i = tx.indexOf('STATE: '); if (i >= 0) { try { st = JSON.parse(tx.slice(i + 7)); } catch (e) { st = {}; } } }
    });
  } catch (e) { }
  // translation jobs (panel language) cannot be done by the demo
  if (/translate the user interface|Translate the user's sentence/i.test(body)) return { code: 400, body: '{"error":{"message":"demo AI cannot translate"}}' };
  user = user.trim();
  const out = brain(user, st);
  return { code: 200, body: JSON.stringify({ candidates: [{ content: { parts: [{ text: out }] }, finishReason: 'STOP' }] }) };
}
G.DemoAI = { handle, brain };
})(typeof self !== 'undefined' ? self : this);
