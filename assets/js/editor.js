/* G TRADERS — EA Bot Studio web editor
   Three ways to edit one bot: drag-and-drop blocks, a Bot Maker style panel, a simple form.
   Quick test on live history, run on the $10,000 demo, download .gtmbot (EA Bot Studio) or .mq5 (any MT5). */
(function () {
  const $ = id => document.getElementById(id), BC = window.BotCore, C = GT_CONFIG;
  if (!GT.gate($('ed-area'), 'EA Bot Studio (web)', 'editor')) return;
  const user = GT.auth.current();
  const LIB = 'gt_bots_' + user.email, CUR = 'gt_bot_cur_' + user.email;
  let bot = GT.store.get(CUR, null) || BC.fromTemplate('macross');
  let mode = GT.store.get('gt_ed_mode', 'blocks');
  let zone = 'buy', selOp = null;           // where a clicked palette block goes / the operand being edited
  const save = () => GT.store.set(CUR, bot);
  const esc = GT.esc;

  /* ================= top bar ================= */
  $('ed-name').value = bot.name;
  $('ed-name').oninput = e => { bot.name = e.target.value.slice(0, 40) || 'My bot'; save(); summary(); };
  $('ed-tpl').innerHTML = '<option value="">Start from a template…</option>' + Object.entries(BC.TEMPLATES).map(([k, t]) => `<option value="${k}">${esc(t.name)}</option>`).join('');
  $('ed-tpl').onchange = e => {
    const k = e.target.value; e.target.value = ''; if (!k) return;
    if ((bot.buy.length || bot.sell.length) && !confirm('Replace the current bot with the "' + BC.TEMPLATES[k].name + '" template?')) return;
    bot = BC.fromTemplate(k); afterLoad(); GT.toast(BC.TEMPLATES[k].info, 4200);
  };
  $('ed-new').onclick = () => { if (!confirm('Start a new empty bot?')) return; bot = BC.newBot(); afterLoad(); };
  const lib = () => GT.store.get(LIB, {});
  $('ed-save').onclick = () => {
    const L = lib(), isNew = !L[bot.name], max = GT.limit(user, 'bots');
    if (isNew && max > 0 && Object.keys(L).length >= max) return GT.toast(`Your library is full (${max} bots). Delete one first.`, 4000);
    if (!isNew && !confirm('Replace the saved bot "' + bot.name + '"?')) return;
    L[bot.name] = Object.assign(BC.clone(bot), { saved: Date.now() }); GT.store.set(LIB, L);
    if (isNew) GT.auth.track('bots');
    GT.toast('Saved "' + bot.name + '" in My bots'); drawLib();
  };
  function drawLib() {
    const L = lib(), names = Object.keys(L).sort((a, b) => L[b].saved - L[a].saved), max = GT.limit(user, 'bots');
    $('lib-n').textContent = names.length + (max > 0 ? ' / ' + max : '') + ' saved';
    $('ed-lib').innerHTML = names.length ? names.map(n => { const b = L[n]; return `<div class="bcard ${n === bot.name ? 'on' : ''}">
        <div class="bt"><b>${esc(n)}</b><small>${new Date(b.saved).toLocaleString()}</small></div>
        <div class="small muted bs2">BUY: ${b.buy.length ? esc(b.buy.map(BC.condText).join(' · ')) : '—'}</div>
        <div class="row"><button type="button" class="btn ghost small" data-open="${esc(n)}">Open</button><button type="button" class="btn ghost small" data-copy="${esc(n)}">Copy</button><button type="button" class="btn ghost small" data-del="${esc(n)}">Delete</button></div></div>`; }).join('')
      : '<p class="muted small" style="padding:4px 2px">Press <b>Save</b> to keep a bot here. You can save as many as you like.</p>';
    $('ed-lib').querySelectorAll('[data-open]').forEach(b => b.onclick = () => { bot = BC.clone(lib()[b.dataset.open]); delete bot.saved; afterLoad(); drawLib(); scrollTo({ top: $('ed-area').offsetTop - 70, behavior: 'smooth' }); });
    $('ed-lib').querySelectorAll('[data-copy]').forEach(b => b.onclick = () => { const L2 = lib(); let nm = b.dataset.copy + ' copy', i = 2; while (L2[nm]) nm = b.dataset.copy + ' copy ' + i++; bot = BC.clone(L2[b.dataset.copy]); delete bot.saved; bot.name = nm; afterLoad(); GT.toast('Copy opened — press Save to keep it.'); });
    $('ed-lib').querySelectorAll('[data-del]').forEach(b => b.onclick = () => { if (!confirm('Delete "' + b.dataset.del + '"?')) return; const L2 = lib(); delete L2[b.dataset.del]; GT.store.set(LIB, L2); drawLib(); });
  }
  $('ed-libbtn').onclick = () => { drawLib(); $('lib-panel').scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  drawLib();
  $('ed-modes').querySelectorAll('button').forEach(b => b.onclick = () => setMode(b.dataset.m));
  function setMode(m) {
    mode = m; GT.store.set('gt_ed_mode', m);
    $('ed-modes').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.m === m));
    ['blocks', 'panel', 'form'].forEach(k => $('m-' + k).style.display = k === m ? '' : 'none');
    draw();
  }
  function afterLoad() { $('ed-name').value = bot.name; save(); stopLive(); draw(); }

  /* ================= plain-English summary ================= */
  function summary() {
    const t = bot.trade, f = bot.filters;
    const lot = t.lotMode ? `risk ${t.risk}% of the balance` : `${t.lot} lots`;
    const sl = ['no stop loss', `stop ${t.sl} pips`, `stop ${t.sl} × ATR`][t.slMode];
    const tp = ['no target', `target ${t.tp} pips`, `target ${t.tp} R`, `target ${t.tp} × ATR`][t.tpMode];
    const fl = [f.spread > 0 && `spread ≤ ${f.spread} pips`, f.session.on && `only ${pad(f.session.h1)}:${pad(f.session.m1)}–${pad(f.session.h2)}:${pad(f.session.m2)}`,
      f.days >= 0 && ['Mon–Fri', 'Mon–Thu', 'Tue–Thu', 'Mon–Sat', 'every day'][f.days], f.gap > 0 && `${f.gap} candles between trades`].filter(Boolean);
    $('ed-sum').innerHTML = `<b>${esc(bot.name)}</b> checks every new <b>${BC.TF_LIST[bot.tf] === 'chart' ? 'chart' : BC.TF_LIST[bot.tf]}</b> candle${fl.length ? ' (' + fl.join(', ') + ')' : ''}.<br>
      <span class="green">BUY</span> when ${bot.buy.length ? bot.buy.map(c => '<i>' + esc(BC.condText(c)) + '</i>').join(' and ') : '<span class="muted">— no BUY rule yet</span>'}.<br>
      <span class="red">SELL</span> when ${bot.sell.length ? bot.sell.map(c => '<i>' + esc(BC.condText(c)) + '</i>').join(' and ') : '<span class="muted">— no SELL rule yet</span>'}.<br>
      Each trade: ${lot}, ${sl}, ${tp}${bot.closeOpposite ? ', an opposite signal closes it' : ''}.
      ${bot.manage.be > 0 ? `Breakeven at ${bot.manage.be} R. ` : ''}${bot.manage.trail > 0 ? `Trailing ${bot.manage.trail} × ATR. ` : ''}${bot.safety.dayLoss > 0 ? `Stops the day at −${bot.safety.dayLoss}%. ` : ''}${bot.safety.maxDay > 0 ? `At most ${bot.safety.maxDay} trades a day.` : ''}`;
  }
  const pad = n => String(n).padStart(2, '0');

  /* ================= small form helpers ================= */
  const sel = (opts, v, attr) => `<select ${attr}>${opts.map((o, i) => `<option value="${i}" ${+v === i ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
  const numIn = (v, attr, step) => `<input type="number" value="${v}" step="${step || 'any'}" ${attr}>`;

  /* ================= BLOCKS mode ================= */
  const PAL = [
    ['Conditions', 'logic', Object.entries(BC.CONDS).map(([k, v]) => ({ type: 'cond', k, label: v.label }))],
    ['Indicators', 'ind', ['ma', 'rsi', 'macd', 'stoch', 'bb', 'atr', 'cci', 'adx'].map(k => ({ type: 'val', k, label: BC.VALS[k].label }))],
    ['Price & numbers', 'val', ['price', 'hl', 'num'].map(k => ({ type: 'val', k, label: BC.VALS[k].label }))],
    ['Filters', 'flt', [['spread', 'Max spread'], ['session', 'Trading hours'], ['days', 'Trading days'], ['gap', 'Pause between trades'], ['maxOpen', 'Most open trades']].map(([k, l]) => ({ type: 'filter', k, label: l }))],
    ['Manage & safety', 'mng', [['be', 'Breakeven'], ['trail', 'Trailing stop'], ['dayLoss', 'Daily loss stop'], ['maxDay', 'Max trades a day']].map(([k, l]) => ({ type: 'manage', k, label: l }))]
  ];
  function drawPalette() {
    const q = ($('pal-q').value || '').toLowerCase();
    $('pal').innerHTML = PAL.map(([g, cls, items]) => {
      const f = items.filter(i => !q || i.label.toLowerCase().includes(q));
      return f.length ? `<div class="pg">${g}</div>` + f.map(i => `<div class="pb ${cls}" draggable="true" data-j='${JSON.stringify({ type: i.type, k: i.k })}'>${esc(i.label)}</div>`).join('') : '';
    }).join('');
    $('pal').querySelectorAll('.pb').forEach(el => {
      el.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', el.dataset.j); e.dataTransfer.effectAllowed = 'copy'; document.body.classList.add('dragging'); });
      el.addEventListener('dragend', () => document.body.classList.remove('dragging'));
      el.onclick = () => dropItem(JSON.parse(el.dataset.j), null);
    });
  }
  $('pal-q').oninput = drawPalette;

  // something from the palette lands somewhere
  function dropItem(it, target) {
    if (it.type === 'cond') {
      const z = target && target.zone ? target.zone : zone;
      bot[z].push(BC.CONDS[it.k].d()); zone = z;
    } else if (it.type === 'val') {
      const op = target && target.op ? target.op : selOp;
      if (!op) { GT.toast('Drop it on a value slot (the purple or blue pills) — or click a slot first, then the value.'); return; }
      const c = bot[op.z][op.i]; if (!c) return;
      c[op.s] = BC.val(it.k); selOp = op;
    } else if (it.type === 'filter') {
      const f = bot.filters;
      if (it.k === 'spread') f.spread = f.spread || 3; if (it.k === 'session') f.session.on = true; if (it.k === 'days') f.days = f.days < 0 ? 0 : f.days;
      if (it.k === 'gap') f.gap = f.gap || 5; if (it.k === 'maxOpen') { f.maxOpen = Math.max(1, f.maxOpen); if (bot.closeOpposite) GT.toast('"Most open trades" works when "opposite signal closes the trade" is off.'); }
    } else if (it.type === 'manage') {
      if (it.k === 'be') bot.manage.be = bot.manage.be || 1; if (it.k === 'trail') bot.manage.trail = bot.manage.trail || 1.5;
      if (it.k === 'dayLoss') bot.safety.dayLoss = bot.safety.dayLoss || 3; if (it.k === 'maxDay') bot.safety.maxDay = bot.safety.maxDay || 6;
    }
    bot.src = 'blocks'; save(); draw();
  }

  function opChip(v, z, i, s) {
    const cls = ['price', 'hl', 'num'].includes(v.k) ? 'val' : 'ind', on = selOp && selOp.z === z && selOp.i === i && selOp.s === s;
    return `<span class="op ${cls} ${on ? 'on' : ''}" data-op='${JSON.stringify({ z, i, s })}' title="Click to change · drop an indicator here">${esc(BC.valText(v))} ▾</span>`;
  }
  function condRow(c, z, i) {
    let inner = '';
    if (c.t === 'cross') inner = `${opChip(c.a, z, i, 'a')} crosses ${sel(['above', 'below'], c.dir, `data-f="dir"`)} ${opChip(c.b, z, i, 'b')}`;
    else if (c.t === 'cmp') inner = `${opChip(c.a, z, i, 'a')} ${sel(BC.OPS, c.op, `data-f="op"`)} ${opChip(c.b, z, i, 'b')}`;
    else if (c.t === 'candle') inner = `candle [${numIn(c.sh, 'data-f="sh" min="0" max="50" class="n2"', 1)}] is ${sel(BC.CANDLE, c.kind, 'data-f="kind"')}`;
    else if (c.t === 'pattern') inner = `${sel(BC.PATTERN, c.kind, 'data-f="kind"')} at [${numIn(c.sh, 'data-f="sh" min="0" max="50" class="n2"', 1)}]`;
    else if (c.t === 'trend') inner = `${opChip(c.a, z, i, 'a')} is ${sel(['rising', 'falling'], c.dir, 'data-f="dir"')} for ${numIn(c.n, 'data-f="n" min="1" max="20" class="n2"', 1)} candles`;
    return `<div class="cb" data-z="${z}" data-i="${i}"><div class="ci">${inner}</div>
      <div class="ca"><button type="button" data-a="up" title="Move up">↑</button><button type="button" data-a="dup" title="Duplicate">⧉</button>
      <button type="button" data-a="mir" title="Copy the mirror rule to the ${z === 'buy' ? 'SELL' : 'BUY'} side">⇄</button><button type="button" data-a="del" title="Remove">×</button></div></div>`;
  }
  function tradeRow(buy) {
    const t = bot.trade;
    return `<div class="blk trd ${buy ? '' : 'sell'}"><b>${buy ? 'BUY' : 'SELL'}</b>
      ${sel(['lots', 'risk %'], t.lotMode, 'data-t="lotMode"')} ${numIn(t.lotMode ? t.risk : t.lot, 'data-t="size" min="0.01" class="n3"', t.lotMode ? 0.1 : 0.01)}
      SL ${sel(['none', 'pips', '× ATR'], t.slMode, 'data-t="slMode"')} ${t.slMode ? numIn(t.sl, 'data-t="sl" min="0" class="n3"', 0.1) : ''}
      TP ${sel(['none', 'pips', '× R', '× ATR'], t.tpMode, 'data-t="tpMode"')} ${t.tpMode ? numIn(t.tp, 'data-t="tp" min="0" class="n3"', 0.1) : ''}
      <span class="muted small">(same for both sides)</span></div>`;
  }
  function filterRows() {
    const f = bot.filters, r = [];
    if (f.spread > 0) r.push(['spread', `ONLY if spread ≤ ${numIn(f.spread, 'data-fl="spread" min="0" class="n3"', 0.5)} pips`]);
    if (f.session.on) r.push(['session', `ONLY between ${numIn(f.session.h1, 'data-fl="h1" min="0" max="23" class="n2"', 1)}:${numIn(f.session.m1, 'data-fl="m1" min="0" max="59" class="n2"', 1)} and ${numIn(f.session.h2, 'data-fl="h2" min="0" max="23" class="n2"', 1)}:${numIn(f.session.m2, 'data-fl="m2" min="0" max="59" class="n2"', 1)} <span class="muted small">server time</span>`]);
    if (f.days >= 0) r.push(['days', `ONLY on ${sel(['Mon–Fri', 'Mon–Thu', 'Tue–Thu', 'Mon–Sat', 'every day'], f.days, 'data-fl="days"')}`]);
    if (!bot.closeOpposite) r.push(['maxOpen', `ONLY if open trades < ${numIn(f.maxOpen, 'data-fl="maxOpen" min="1" max="20" class="n2"', 1)}`]);
    if (f.gap > 0) r.push(['gap', `ONLY if ${numIn(f.gap, 'data-fl="gap" min="1" class="n2"', 1)} candles passed since the last trade`]);
    return r.map(([k, h]) => `<div class="blk flt" data-k="${k}">${h}<button type="button" class="x" data-rmf="${k}" title="Remove">×</button></div>`).join('');
  }
  function manageRows() {
    const m = bot.manage, s = bot.safety, r = [];
    if (m.be > 0) r.push(['be', `BREAKEVEN at ${numIn(m.be, 'data-mg="be" min="0.1" class="n3"', 0.1)} R profit, lock 1 pip`]);
    if (m.trail > 0) r.push(['trail', `TRAIL the stop ${numIn(m.trail, 'data-mg="trail" min="0.1" class="n3"', 0.1)} × ATR behind, after 10 pips profit`]);
    if (s.dayLoss > 0) r.push(['dayLoss', `STOP the day at loss ${numIn(s.dayLoss, 'data-mg="dayLoss" min="0.1" class="n3"', 0.5)} %`, 'saf']);
    if (s.maxDay > 0) r.push(['maxDay', `MAX ${numIn(s.maxDay, 'data-mg="maxDay" min="1" class="n2"', 1)} trades per day`, 'saf']);
    return r.map(([k, h, c]) => `<div class="blk ${c || 'mng'}">${h}<button type="button" class="x" data-rmm="${k}" title="Remove">×</button></div>`).join('') || '<div class="hint">Drop Breakeven, Trailing, Daily loss or Max trades here.</div>';
  }
  function drawBlocks() {
    drawPalette();
    $('canvas').innerHTML = `
      <div class="blk hat"><b>WHEN</b> a new ${sel(BC.TF_LIST, bot.tf, 'id="b-tf"')} candle opens</div>
      <div class="body">
        <div class="dz fz" data-dz="filters">${filterRows() || '<div class="hint">Filters (optional): drop Max spread, Trading hours, Trading days… here.</div>'}</div>
        <div class="blk cif"><b>IF</b> all of these are true <span class="muted small">(click a palette block to add it here)</span></div>
        <div class="dz cz ${zone === 'buy' ? 'act' : ''}" data-dz="buy">${bot.buy.map((c, i) => condRow(c, 'buy', i)).join('') || '<div class="hint">Drop BUY conditions here — Crosses, Compare, Candle…</div>'}</div>
        <div class="then">${bot.closeOpposite ? '<div class="blk trd mini">CLOSE SELL trades</div>' : ''}${tradeRow(true)}</div>
        <div class="blk cif sell"><b>IF</b> all of these are true <button type="button" class="btn ghost small" id="b-mirror" style="margin-left:8px">Copy mirrored BUY rules</button></div>
        <div class="dz cz ${zone === 'sell' ? 'act' : ''}" data-dz="sell">${bot.sell.map((c, i) => condRow(c, 'sell', i)).join('') || '<div class="hint">Drop SELL conditions here — or press “Copy mirrored BUY rules”.</div>'}</div>
        <div class="then">${bot.closeOpposite ? '<div class="blk trd mini">CLOSE BUY trades</div>' : ''}${tradeRow(false)}</div>
        <label class="chk" style="margin:8px 0 0"><input type="checkbox" id="b-opp" ${bot.closeOpposite ? 'checked' : ''}> An opposite signal closes the open trade (one trade at a time)</label>
      </div>
      <div class="blk hat tick"><b>ON</b> every price tick</div>
      <div class="body"><div class="dz mz" data-dz="manage">${manageRows()}</div></div>`;
    wireBlocks();
  }
  function wireBlocks() {
    const cv = $('canvas');
    // drop zones
    cv.querySelectorAll('.dz').forEach(dz => {
      dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); });
      dz.addEventListener('dragleave', () => dz.classList.remove('over'));
      dz.addEventListener('drop', e => {
        e.preventDefault(); dz.classList.remove('over');
        let it; try { it = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (x) { return; }
        const k = dz.dataset.dz;
        if (it.type === 'cond' && (k === 'buy' || k === 'sell')) dropItem(it, { zone: k });
        else if (it.type === 'filter' && k === 'filters') dropItem(it);
        else if (it.type === 'manage' && k === 'manage') dropItem(it);
        else if (it.type === 'val') GT.toast('Drop indicators and numbers on a value slot inside a condition.');
        else GT.toast('That block belongs in another place.');
      });
      dz.addEventListener('click', e => { if (dz.dataset.dz === 'buy' || dz.dataset.dz === 'sell') { if (zone !== dz.dataset.dz) { zone = dz.dataset.dz; cv.querySelectorAll('.cz').forEach(z => z.classList.toggle('act', z.dataset.dz === zone)); } } });
    });
    // operand chips: click to edit, drop a value on them
    cv.querySelectorAll('.op').forEach(el => {
      const op = JSON.parse(el.dataset.op);
      el.onclick = e => { e.stopPropagation(); selOp = op; zone = op.z; openOp(el, op); };
      el.addEventListener('dragover', e => { e.preventDefault(); e.stopPropagation(); el.classList.add('over'); });
      el.addEventListener('dragleave', () => el.classList.remove('over'));
      el.addEventListener('drop', e => {
        e.preventDefault(); e.stopPropagation(); el.classList.remove('over');
        let it; try { it = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (x) { return; }
        if (it.type === 'val') dropItem(it, { op }); else GT.toast('Only indicators, prices and numbers fit in a value slot.');
      });
    });
    // condition fields + actions
    cv.querySelectorAll('.cb').forEach(row => {
      const z = row.dataset.z, i = +row.dataset.i, c = bot[z][i];
      row.querySelectorAll('[data-f]').forEach(inp => inp.onchange = () => { c[inp.dataset.f] = +inp.value; bot.src = 'blocks'; save(); draw(); });
      row.querySelectorAll('[data-a]').forEach(b => b.onclick = e => {
        e.stopPropagation(); const a = b.dataset.a, other = z === 'buy' ? 'sell' : 'buy';
        if (a === 'del') bot[z].splice(i, 1);
        if (a === 'dup') bot[z].splice(i + 1, 0, BC.clone(c));
        if (a === 'mir') { bot[other].push(BC.mirror(c)); GT.toast('Mirror rule added to the ' + other.toUpperCase() + ' side'); }
        if (a === 'up' && i > 0) { const x = bot[z][i - 1]; bot[z][i - 1] = c; bot[z][i] = x; }
        selOp = null; bot.src = 'blocks'; save(); draw();
      });
    });
    const tf = $('b-tf'); if (tf) tf.onchange = () => { bot.tf = +tf.value; save(); draw(); };
    $('b-mirror').onclick = () => { if (!bot.buy.length) return GT.toast('Add BUY rules first.'); if (bot.sell.length && !confirm('Replace the SELL rules with the mirror of the BUY rules?')) return; bot.sell = bot.buy.map(BC.mirror); save(); draw(); };
    $('b-opp').onchange = e => { bot.closeOpposite = e.target.checked; save(); draw(); };
    cv.querySelectorAll('[data-t]').forEach(inp => inp.onchange = () => {
      const k = inp.dataset.t, v = +inp.value, t = bot.trade;
      if (k === 'size') { if (t.lotMode) t.risk = Math.max(0.1, Math.min(10, v)); else t.lot = Math.max(0.01, v); } else t[k] = v;
      save(); draw();
    });
    cv.querySelectorAll('[data-fl]').forEach(inp => inp.onchange = () => {
      const k = inp.dataset.fl, v = +inp.value, f = bot.filters;
      if (['h1', 'm1', 'h2', 'm2'].includes(k)) f.session[k] = v; else f[k] = v;
      save(); draw();
    });
    cv.querySelectorAll('[data-rmf]').forEach(b => b.onclick = () => { const k = b.dataset.rmf, f = bot.filters; if (k === 'spread') f.spread = 0; if (k === 'session') f.session.on = false; if (k === 'days') f.days = -1; if (k === 'gap') f.gap = 0; if (k === 'maxOpen') f.maxOpen = 1; save(); draw(); });
    cv.querySelectorAll('[data-mg]').forEach(inp => inp.onchange = () => { const k = inp.dataset.mg, v = +inp.value; if (k in bot.manage) bot.manage[k] = v; else bot.safety[k] = v; save(); draw(); });
    cv.querySelectorAll('[data-rmm]').forEach(b => b.onclick = () => { const k = b.dataset.rmm; if (k in bot.manage) bot.manage[k] = 0; else bot.safety[k] = 0; save(); draw(); });
  }

  // value editor popover
  const pop = $('op-pop');
  function openOp(anchor, op) {
    const c = bot[op.z][op.i], v = c[op.s];
    const kinds = Object.keys(BC.VALS);
    const F = (label, html) => `<label>${label}${html}</label>`;
    let fields = '';
    switch (v.k) {
      case 'ma': fields = F('Type', sel(BC.MA_M, v.m, 'data-v="m"')) + F('Period', numIn(v.n, 'data-v="n" min="1"', 1)) + F('Price', sel(BC.SRC, v.src, 'data-v="src"')); break;
      case 'rsi': case 'atr': case 'cci': fields = F('Period', numIn(v.n, 'data-v="n" min="1"', 1)); break;
      case 'macd': fields = F('Line', sel(BC.MACD_L, v.line, 'data-v="line"')) + F('Fast', numIn(v.f, 'data-v="f" min="1"', 1)) + F('Slow', numIn(v.s, 'data-v="s" min="1"', 1)) + F('Signal', numIn(v.g, 'data-v="g" min="1"', 1)); break;
      case 'stoch': fields = F('Line', sel(BC.STO_L, v.line, 'data-v="line"')) + F('%K', numIn(v.kp, 'data-v="kp" min="1"', 1)) + F('%D', numIn(v.d, 'data-v="d" min="1"', 1)) + F('Slowing', numIn(v.sl, 'data-v="sl" min="1"', 1)); break;
      case 'bb': fields = F('Band', sel(BC.BB_L, v.band, 'data-v="band"')) + F('Period', numIn(v.n, 'data-v="n" min="2"', 1)) + F('Deviation', numIn(v.dev, 'data-v="dev" min="0.1"', 0.1)); break;
      case 'adx': fields = F('Line', sel(BC.ADX_L, v.line, 'data-v="line"')) + F('Period', numIn(v.n, 'data-v="n" min="1"', 1)); break;
      case 'price': fields = F('Price', sel(BC.PRICE_W, v.w, 'data-v="w"')); break;
      case 'hl': fields = F('Which', sel(BC.HL_W, v.w, 'data-v="w"')) + F('Candles', numIn(v.n, 'data-v="n" min="2"', 1)); break;
      case 'num': fields = F('Number', numIn(v.v, 'data-v="v"')); break;
    }
    if (v.k !== 'num') fields += F('Candle [shift] <span class="muted">1 = last closed</span>', numIn(v.sh, 'data-v="sh" min="0" max="50"', 1));
    pop.innerHTML = `<div class="ph"><b>Value</b><button type="button" class="x" id="op-x">×</button></div>
      ${F('Kind', `<select id="op-k">${kinds.map(k => `<option value="${k}" ${k === v.k ? 'selected' : ''}>${BC.VALS[k].label}</option>`).join('')}</select>`)}${fields}
      <p class="muted small" style="margin:6px 0 0">Tip: drag an indicator from the palette onto any slot.</p>`;
    const r = anchor.getBoundingClientRect();
    pop.style.display = 'block';
    const holder = document.fullscreenElement || document.body; if (pop.parentElement !== holder) holder.appendChild(pop);
    pop.style.position = 'fixed';
    pop.style.left = Math.max(8, Math.min(innerWidth - 290, r.left)) + 'px';
    pop.style.top = Math.min(innerHeight - 320, r.bottom + 6) + 'px';
    $('op-x').onclick = () => { pop.style.display = 'none'; selOp = null; draw(); };
    $('op-k').onchange = e => { c[op.s] = BC.val(e.target.value); save(); draw(); openOp(document.querySelector(`.op[data-op='${JSON.stringify(op)}']`) || anchor, op); };
    pop.querySelectorAll('[data-v]').forEach(inp => inp.onchange = () => { v[inp.dataset.v] = +inp.value; save(); draw(); const a = document.querySelector(`.op[data-op='${JSON.stringify(op)}']`); if (a) openOp(a, op); });
  }
  document.addEventListener('click', e => { if (pop.style.display === 'block' && !pop.contains(e.target) && !e.target.classList.contains('op')) { pop.style.display = 'none'; } });

  /* ================= PANEL mode (GTM Bot Maker style) ================= */
  const ENTRY = {
    macross: { label: 'MA cross', f: { fast: 9, slow: 21, m: 1 } },
    rsi: { label: 'RSI levels', f: { n: 14, lo: 30, hi: 70 } },
    bb: { label: 'Bollinger bounce', f: { n: 20, dev: 2 } },
    macd: { label: 'MACD cross', f: {} },
    stoch: { label: 'Stochastic cross', f: { lo: 20, hi: 80 } },
    breakout: { label: 'Breakout', f: { n: 20 } },
    hhhl: { label: 'HH / HL structure', f: {} },
    engulf: { label: 'Engulfing candle', f: {} }
  };
  const defPanel = () => ({ entry: 'macross', p: BC.clone(ENTRY.macross.f), trend: { on: true, n: 200 }, rsiSide: { on: false }, adx: { on: false, v: 25 }, candle: { on: false } });
  function panelToBot() {
    const P = bot.panel, V = BC.val, b = [], p = P.p;
    switch (P.entry) {
      case 'macross': b.push({ t: 'cross', a: V('ma', { m: p.m, n: p.fast }), dir: 0, b: V('ma', { m: p.m, n: p.slow }) }); break;
      case 'rsi': b.push({ t: 'cross', a: V('rsi', { n: p.n }), dir: 0, b: V('num', { v: p.lo }) }); break;
      case 'bb': b.push({ t: 'cmp', a: V('price'), op: 1, b: V('bb', { band: 2, n: p.n, dev: p.dev }) }, { t: 'candle', kind: 0, sh: 1 }); break;
      case 'macd': b.push({ t: 'cross', a: V('macd', { line: 0 }), dir: 0, b: V('macd', { line: 1 }) }); break;
      case 'stoch': b.push({ t: 'cross', a: V('stoch', { line: 0 }), dir: 0, b: V('stoch', { line: 1 }) }, { t: 'cmp', a: V('stoch', { line: 0 }), op: 1, b: V('num', { v: p.lo + 10 }) }); break;
      case 'breakout': b.push({ t: 'cmp', a: V('price'), op: 0, b: V('hl', { w: 0, n: p.n, sh: 2 }) }); break;
      case 'hhhl': b.push({ t: 'cmp', a: V('price', { w: 2, sh: 1 }), op: 0, b: V('price', { w: 2, sh: 2 }) }, { t: 'cmp', a: V('price', { w: 3, sh: 1 }), op: 0, b: V('price', { w: 3, sh: 2 }) }); break;
      case 'engulf': b.push({ t: 'pattern', kind: 0, sh: 1 }); break;
    }
    if (P.trend.on) b.push({ t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: P.trend.n }) });
    if (P.rsiSide.on && P.entry !== 'rsi') b.push({ t: 'cmp', a: V('rsi'), op: 0, b: V('num', { v: 50 }) });
    if (P.adx.on) b.push({ t: 'cmp', a: V('adx'), op: 0, b: V('num', { v: P.adx.v }) });
    if (P.candle.on && P.entry !== 'bb' && P.entry !== 'engulf') b.push({ t: 'candle', kind: 0, sh: 1 });
    bot.buy = b; bot.sell = b.map(c => {
      const m = BC.mirror(c);
      // the ADX strength filter is the same for both sides
      if (c.t === 'cmp' && c.a.k === 'adx' && !c.a.line) return BC.clone(c);
      if (P.entry === 'rsi' && c.t === 'cross' && c.a.k === 'rsi') return { t: 'cross', a: V('rsi', { n: p.n }), dir: 1, b: V('num', { v: p.hi }) };
      if (P.entry === 'stoch' && c.t === 'cmp' && c.a.k === 'stoch') return { t: 'cmp', a: V('stoch', { line: 0 }), op: 0, b: V('num', { v: p.hi - 10 }) };
      return m;
    });
    bot.src = 'panel';
  }
  function drawPanel() {
    if (!bot.panel) bot.panel = defPanel();
    const P = bot.panel, t = bot.trade, f = bot.filters, E = ENTRY[P.entry];
    const pf = Object.keys(E.f).map(k => `<label>${{ fast: 'Fast MA', slow: 'Slow MA', m: 'MA type', n: 'Period', lo: 'Low level', hi: 'High level', dev: 'Deviation' }[k]}${k === 'm' ? sel(BC.MA_M, P.p.m, 'data-pp="m"') : numIn(P.p[k], `data-pp="${k}"`, k === 'dev' ? 0.1 : 1)}</label>`).join('');
    $('m-panel').innerHTML = `
      ${bot.src === 'blocks' ? '<div class="notice gold small" style="margin-bottom:10px">This bot was changed in the Blocks view. Changing the entry or filters here will replace its BUY / SELL rules.</div>' : ''}
      <div class="bmp">
        <div class="bmh"><span class="dot"></span>GTM BOT MAKER <span class="muted">· web</span></div>
        <div class="sec"><div class="st">1 · Entry type</div><div class="ents">${Object.entries(ENTRY).map(([k, v]) => `<button type="button" data-ent="${k}" class="${k === P.entry ? 'on' : ''}">${v.label}</button>`).join('')}</div>
          <div class="pr">${pf || '<span class="muted small">No settings — uses the standard values.</span>'}</div></div>
        <div class="sec"><div class="st">2 · Filters</div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="trend" ${P.trend.on ? 'checked' : ''}> Trend: BUY only above EMA</label>${numIn(P.trend.n, 'data-pv="trend.n" class="n3"', 1)}</div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="rsiSide" ${P.rsiSide.on ? 'checked' : ''}> RSI side: BUY only when RSI &gt; 50</label></div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="adx" ${P.adx.on ? 'checked' : ''}> ADX strength above</label>${numIn(P.adx.v, 'data-pv="adx.v" class="n3"', 1)}</div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="candle" ${P.candle.on ? 'checked' : ''}> Candle close confirms the direction</label></div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="spread" ${f.spread > 0 ? 'checked' : ''}> Max spread (pips)</label>${numIn(f.spread || 3, 'data-pv="spread" class="n3"', 0.5)}</div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="session" ${f.session.on ? 'checked' : ''}> Trading hours</label>${numIn(f.session.h1, 'data-pv="h1" class="n2" min="0" max="23"', 1)} – ${numIn(f.session.h2, 'data-pv="h2" class="n2" min="0" max="23"', 1)}</div>
          <div class="fr"><label>Timeframe ${sel(BC.TF_LIST, bot.tf, 'data-pv="tf"')}</label></div></div>
        <div class="sec"><div class="st">3 · Risk</div>
          <div class="fr">${sel(['Fixed lots', 'Risk % of balance'], t.lotMode, 'data-pv="lotMode"')} ${numIn(t.lotMode ? t.risk : t.lot, 'data-pv="size" class="n3"', t.lotMode ? 0.1 : 0.01)}</div>
          <div class="fr">Stop loss ${sel(['none', 'pips', '× ATR'], t.slMode, 'data-pv="slMode"')} ${numIn(t.sl, 'data-pv="sl" class="n3"', 0.1)}</div>
          <div class="fr">Take profit ${sel(['none', 'pips', '× R', '× ATR'], t.tpMode, 'data-pv="tpMode"')} ${numIn(t.tp, 'data-pv="tp" class="n3"', 0.1)}</div>
          <div class="fr"><label class="chk"><input type="checkbox" data-pf="opp" ${bot.closeOpposite ? 'checked' : ''}> Opposite signal closes the trade</label></div></div>
        <div class="sec"><div class="st">4 · Trade care &amp; safety</div>
          <div class="fr">Breakeven at (R, 0 = off) ${numIn(bot.manage.be, 'data-pv="be" class="n3"', 0.1)}</div>
          <div class="fr">Trailing (× ATR, 0 = off) ${numIn(bot.manage.trail, 'data-pv="trail" class="n3"', 0.1)}</div>
          <div class="fr">Daily loss stop (%, 0 = off) ${numIn(bot.safety.dayLoss, 'data-pv="dayLoss" class="n3"', 0.5)}</div>
          <div class="fr">Max trades a day (0 = no limit) ${numIn(bot.safety.maxDay, 'data-pv="maxDay" class="n3"', 1)}</div></div>
      </div>`;
    const P2 = () => { panelToBot(); save(); draw(); };
    $('m-panel').querySelectorAll('[data-ent]').forEach(b => b.onclick = () => { P.entry = b.dataset.ent; P.p = BC.clone(ENTRY[P.entry].f); P2(); });
    $('m-panel').querySelectorAll('[data-pp]').forEach(i => i.onchange = () => { P.p[i.dataset.pp] = +i.value; P2(); });
    $('m-panel').querySelectorAll('[data-pf]').forEach(i => i.onchange = () => {
      const k = i.dataset.pf;
      if (k === 'spread') f.spread = i.checked ? 3 : 0; else if (k === 'session') f.session.on = i.checked; else if (k === 'opp') bot.closeOpposite = i.checked; else P[k].on = i.checked;
      P2();
    });
    $('m-panel').querySelectorAll('[data-pv]').forEach(i => i.onchange = () => {
      const k = i.dataset.pv, v = +i.value;
      if (k === 'trend.n') P.trend.n = v; else if (k === 'adx.v') P.adx.v = v; else if (k === 'spread') f.spread = v; else if (k === 'h1' || k === 'h2') f.session[k] = v;
      else if (k === 'tf') bot.tf = v; else if (k === 'size') { if (t.lotMode) t.risk = v; else t.lot = v; } else if (k in t) t[k] = v;
      else if (k in bot.manage) bot.manage[k] = v; else if (k in bot.safety) bot.safety[k] = v;
      if (['trend.n', 'adx.v'].includes(k)) panelToBot();
      save(); draw();
    });
  }

  /* ================= FORM mode ================= */
  const FORM = [
    ['style', 'How should it trade?', [['trend', 'Follow the trend', 'Buy when a fast average crosses up through a slow one'], ['reversal', 'Catch reversals', 'Buy when RSI turns up from oversold'], ['breakout', 'Trade breakouts', 'Buy when price breaks the recent high'], ['structure', 'Price action', 'Higher highs and higher lows (HH / HL)']]],
    ['speed', 'How fast?', [['fast', 'Fast', 'More trades, more noise'], ['normal', 'Normal', 'Balanced'], ['slow', 'Slow', 'Fewer, longer trades']]],
    ['risk', 'Risk per trade', [['0.5', '0.5%', 'Careful'], ['1', '1%', 'Standard'], ['2', '2%', 'Aggressive']]],
    ['exit', 'How should trades end?', [['2r', 'Target 2 × the risk', 'Stop 1.5 × ATR'], ['3r', 'Target 3 × the risk', 'Bigger wins, fewer hits'], ['trail', 'Trailing stop', 'Let winners run']]]
  ];
  let ans = GT.store.get('gt_ed_form', { style: 'trend', speed: 'normal', risk: '1', exit: '2r' });
  function drawForm() {
    $('m-form').innerHTML = FORM.map(([k, q, opts], n) => `<div class="fq"><div class="qn">${n + 1}</div><div style="flex:1"><b>${q}</b>
      <div class="fo">${opts.map(([v, l, d]) => `<button type="button" data-q="${k}" data-v="${v}" class="${ans[k] === v ? 'on' : ''}"><b>${l}</b><span>${d}</span></button>`).join('')}</div></div></div>`).join('')
      + `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn primary" type="button" id="f-build">Build my bot</button><span class="muted small" style="align-self:center">You can fine-tune it afterwards in Blocks or the panel.</span></div>`;
    $('m-form').querySelectorAll('[data-q]').forEach(b => b.onclick = () => { ans[b.dataset.q] = b.dataset.v; GT.store.set('gt_ed_form', ans); drawForm(); });
    $('f-build').onclick = () => {
      const sp = { fast: [9, 21, 50, 10], normal: [20, 50, 100, 20], slow: [50, 100, 200, 40] }[ans.speed], V = BC.val;
      const b = BC.newBot(); b.name = { trend: 'Trend follower', reversal: 'RSI reversal', breakout: 'Breakout', structure: 'HH-HL trend' }[ans.style] + ' (' + ans.speed + ')';
      if (ans.style === 'trend') b.buy = [{ t: 'cross', a: V('ma', { n: sp[0] }), dir: 0, b: V('ma', { n: sp[1] }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: sp[2] }) }];
      if (ans.style === 'reversal') b.buy = [{ t: 'cross', a: V('rsi', { n: ans.speed === 'fast' ? 7 : ans.speed === 'slow' ? 21 : 14 }), dir: 0, b: V('num', { v: 30 }) }];
      if (ans.style === 'breakout') b.buy = [{ t: 'cmp', a: V('price'), op: 0, b: V('hl', { w: 0, n: sp[3], sh: 2 }) }, { t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: sp[2] }) }];
      if (ans.style === 'structure') b.buy = BC.clone(BC.TEMPLATES.hhhl.buy).concat([{ t: 'cmp', a: V('price'), op: 0, b: V('ma', { n: sp[2] }) }]);
      b.sell = b.buy.map(BC.mirror);
      b.trade.risk = +ans.risk; b.trade.tp = ans.exit === '3r' ? 3 : 2; if (ans.exit === 'trail') { b.trade.tpMode = 0; b.manage.trail = 1.5; b.manage.be = 1; }
      bot = b; afterLoad(); GT.toast('Built "' + b.name + '" — press Quick test to see how it did.');
    };
  }

  /* ================= zoom (like the Studio in MT5) ================= */
  let zoom = GT.store.get('gt_ed_zoom', 1);
  const cvs = $('canvas');
  function setZoom(z) {
    zoom = Math.max(0.4, Math.min(2, Math.round(z * 100) / 100)); GT.store.set('gt_ed_zoom', zoom);
    cvs.style.zoom = zoom; $('z-val').textContent = Math.round(zoom * 100) + '%';
  }
  $('z-in').onclick = () => setZoom(zoom + 0.1);
  $('z-out').onclick = () => setZoom(zoom - 0.1);
  $('z-100').onclick = () => setZoom(1);
  $('z-fit').onclick = () => {
    const wrap = cvs.parentElement, h = cvs.scrollHeight, w = cvs.scrollWidth;
    const zh = (wrap.clientHeight - 40) / (h || 1) * zoom, zw = wrap.clientWidth / (w || 1) * zoom;
    setZoom(Math.min(zh, zw, 1.5));
  };
  cvs.addEventListener('wheel', e => { if (!e.ctrlKey) return; e.preventDefault(); setZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1)); }, { passive: false });
  $('z-full').onclick = () => {
    const el = $('m-blocks');
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => el.classList.toggle('fake-full')); else el.classList.toggle('fake-full');
  };
  setZoom(zoom);

  /* ================= draw all ================= */
  function draw() {
    if (mode === 'blocks') drawBlocks(); else if (mode === 'panel') drawPanel(); else drawForm();
    summary(); dlInfo();
  }

  /* ================= chart, test, live ================= */
  const msg = (t, kind) => { const m = $('msg'); m.style.display = t ? 'block' : 'none'; m.className = 'notice ' + (kind || ''); m.textContent = t || ''; };
  const lc = new GTMarket.LiveChart({
    key: 'ed', container: $('chart'), picker: $('pick'), tfBox: $('tf'), status: $('st'), gran: 900, onMessage: msg, symbol: 'BTCUSDT',
    onCandles: (c, isNew, first) => { if (first) { clearTest(); } if (isNew && !first) liveBar(); },
    onTick: p => liveTick(p)
  });
  const ec = $('eq'), eqc = LightweightCharts.createChart(ec, { width: ec.clientWidth, height: ec.clientHeight, layout: { background: { color: '#05080f' }, textColor: '#8b9bb4', fontSize: 10 },
    grid: { vertLines: { visible: false }, horzLines: { color: '#0f1726' } }, timeScale: { visible: false }, rightPriceScale: { borderColor: '#1f2b3f' }, handleScroll: false, handleScale: false, crosshair: { mode: 0 } });
  new ResizeObserver(() => eqc.applyOptions({ width: ec.clientWidth, height: ec.clientHeight })).observe(ec);
  const eqs = eqc.addAreaSeries({ lineColor: '#f0c869', topColor: 'rgba(240,200,105,.35)', bottomColor: 'rgba(240,200,105,0)', lineWidth: 2, priceLineVisible: false });
  let plines = [];
  function clearTest() { lc.series.setMarkers([]); plines.forEach(p => { try { lc.series.removePriceLine(p); } catch (e) { } }); plines = []; }

  $('b-test').onclick = () => {
    const c = lc.candles; if (c.length < 120) return GT.toast('Wait for the chart to load.');
    if (!bot.buy.length && !bot.sell.length) return GT.toast('Add at least one BUY or SELL rule first.');
    const r = BC.backtest(bot, c, { digits: lc.digits }); GT.auth.track('tests');
    const s = r.stats;
    $('res').innerHTML = `<div class="tiles">
      <div class="kpi"><div class="l">Trades</div><div class="v">${s.n}</div></div>
      <div class="kpi"><div class="l">Win rate</div><div class="v">${s.winRate.toFixed(0)}%</div></div>
      <div class="kpi"><div class="l">Result on $10k</div><div class="v ${s.net >= 0 ? 'green' : 'red'}">${GT.money(s.net, 0)}</div></div>
      <div class="kpi"><div class="l">Profit factor</div><div class="v">${isFinite(s.pf) ? s.pf.toFixed(2) : (s.n ? '∞' : '—')}</div></div>
      <div class="kpi"><div class="l">Max drawdown</div><div class="v">${s.maxDD.toFixed(1)}%</div></div>
      <div class="kpi"><div class="l">Average</div><div class="v">${s.avgR >= 0 ? '+' : ''}${s.avgR.toFixed(2)} R</div></div></div>
      <p class="small muted" style="margin:6px 12px 10px">${c.length} candles of ${GT.esc(lc.meta.display_name)} ${GTMarket.TF.find(x => x[1] === lc.gran)[0]} · risk ${s.riskPct}% per trade · no spread or commission · entries at the next candle's open.
        A quick guide only — test the downloaded bot in the MT5 Strategy Tester.</p>`;
    $('trades').innerHTML = r.trades.length ? r.trades.slice().reverse().slice(0, 60).map(t => `<div class="sig"><span class="tag ${t.dir === 'BUY' ? 'buy' : 'sell'}">${t.dir}</span>
      <span class="muted small">${new Date(t.t1 * 1000).toLocaleString()}</span><b class="${t.money >= 0 ? 'green' : 'red'}" style="float:right">${GT.money(t.money, 0)} · ${t.R >= 0 ? '+' : ''}${t.R.toFixed(2)}R</b>
      <div class="muted small">${lc.fmt(t.entry)} → ${lc.fmt(t.exit)} · ${t.why}</div></div>`).join('') : '<p class="muted small" style="padding:12px">No trades in this window. Try another market, timeframe or looser rules.</p>';
    eqs.setData(r.curve.filter((p, i, a) => !i || p.time > a[i - 1].time)); eqc.timeScale().fitContent();
    const mk = [];
    r.trades.forEach(t => {
      mk.push({ time: t.t1, position: t.dir === 'BUY' ? 'belowBar' : 'aboveBar', color: t.dir === 'BUY' ? '#22c55e' : '#ff4fd8', shape: t.dir === 'BUY' ? 'arrowUp' : 'arrowDown', text: t.dir });
      mk.push({ time: t.t2, position: 'inBar', color: t.money >= 0 ? '#22c55e' : '#f43f5e', shape: 'circle', text: (t.R >= 0 ? '+' : '') + t.R.toFixed(1) + 'R' });
    });
    mk.sort((a, b) => a.time - b.time);
    lc.series.setMarkers(mk);
    $('res-wrap').style.display = '';
  };

  /* live run on the $10,000 demo account (same account as the Demo page) */

  let live = false, liveLog = [];
  const demo = () => GT.demos.active(user).acc;
  const putDemo = acc => GT.demos.save(user, GT.demos.active(user).id, acc);
  $('b-live').onclick = () => live ? stopLive() : startLive();
  function startLive() {
    if (!bot.buy.length && !bot.sell.length) return GT.toast('Add at least one BUY or SELL rule first.');
    if (lc.meta && !lc.meta.exchange_is_open) return GT.toast('This market is closed — pick a crypto or synthetic market to run live now.');
    GT.auth.track('liveRuns'); live = true; $('b-live').textContent = '■ Stop the bot'; $('b-live').classList.add('sell'); $('live-st').innerHTML = `<span class="live-dot"></span> <b>${esc(bot.name)}</b> is running on ${esc(lc.meta.display_name)} — it acts when a candle closes. Trades go to your <a href="demo.html" target="_blank">$10k demo</a>.`;
    log('Started on ' + lc.meta.display_name + ' ' + GTMarket.TF.find(x => x[1] === lc.gran)[0]);
  }
  function stopLive() { if (!live) return; live = false; $('b-live').textContent = '● Run on the $10k demo'; $('b-live').classList.remove('sell'); $('live-st').textContent = 'Stopped. Open trades stay on the demo account.'; log('Stopped'); }
  function log(t) { liveLog.unshift(new Date().toLocaleTimeString() + ' — ' + t); liveLog = liveLog.slice(0, 40); $('live-log').innerHTML = liveLog.map(x => `<div>${esc(x)}</div>`).join(''); }
  function liveBar() {
    if (!live) return;
    const c = lc.candles, i = c.length - 1, ev = BC.evaluator(c);
    const b = ev.buy(bot, i), s = ev.sell(bot, i);
    if (!b && !s) return;
    const acc = demo(), sym = lc.sym, price = lc.price(), pip = BC.pipOf(price, lc.digits);
    const mine = acc.positions.filter(p => p.bot === bot.name && p.sym === sym);
    for (const [sig, dir] of [[b, 'BUY'], [s, 'SELL']]) {
      if (!sig) continue;
      if (bot.closeOpposite) mine.filter(p => p.dir !== dir).forEach(p => closePos(acc, p, price, 'Opposite signal'));
      const still = acc.positions.filter(p => p.bot === bot.name && p.sym === sym);
      if (still.some(p => p.dir === dir) || still.length >= (bot.closeOpposite ? 1 : bot.filters.maxOpen)) continue;
      const L = BC.levels(bot, dir, price, ev.atr(i), pip);
      const riskMoney = acc.balance * (bot.trade.lotMode ? bot.trade.risk : 1) / 100;
      const size = L.slD > 0 ? +(riskMoney / L.slD).toPrecision(4) : +(riskMoney / (price * 0.01)).toPrecision(4);
      acc.positions.push({ id: Date.now() + Math.random(), sym, name: lc.meta.display_name, dir, size, entry: price, sl: L.sl, tp: L.tp, time: Date.now(), digits: lc.digits, bot: bot.name, slD: L.slD });
      log(`${dir} ${lc.meta.display_name} @ ${lc.fmt(price)}${L.sl ? ' SL ' + lc.fmt(L.sl) : ''}${L.tp ? ' TP ' + lc.fmt(L.tp) : ''}`);
    }
    putDemo(acc); drawLive();
  }
  function closePos(acc, p, px, why) {
    const pl = (px - p.entry) * p.size * (p.dir === 'BUY' ? 1 : -1);
    acc.balance += pl; acc.positions = acc.positions.filter(x => x.id !== p.id);
    acc.history.unshift({ name: p.name, bot: p.bot, dir: p.dir, size: p.size, entry: p.entry, exit: px, pl, digits: p.digits, why, time: Date.now() });
    acc.history = acc.history.slice(0, 200);
    log(`${why}: ${p.dir} ${p.name} ${GT.money(pl)}`);
  }
  let lastTickSave = 0;
  function liveTick(px) {
    if (!live) return;
    const acc = demo(); let changed = false;
    acc.positions.filter(p => p.bot === bot.name && p.sym === lc.sym).forEach(p => {
      const buy = p.dir === 'BUY';
      if (p.sl && (buy ? px <= p.sl : px >= p.sl)) { closePos(acc, p, p.sl, p.be ? 'Breakeven' : 'Stop loss'); changed = true; return; }
      if (p.tp && (buy ? px >= p.tp : px <= p.tp)) { closePos(acc, p, p.tp, 'Take profit'); changed = true; return; }
      if (bot.manage.be > 0 && p.slD && !p.be && (buy ? px - p.entry : p.entry - px) >= bot.manage.be * p.slD) { p.sl = p.entry + (buy ? 1 : -1) * BC.pipOf(px, lc.digits); p.be = true; changed = true; log('Breakeven set on ' + p.name); }
    });
    if (changed) { putDemo(acc); lastTickSave = Date.now(); drawLive(); }
  }
  function drawLive() {
    const acc = demo(), mine = acc.positions.filter(p => p.bot === bot.name);
    $('live-pos').innerHTML = mine.length ? mine.map(p => `<div class="small"><span class="tag ${p.dir === 'BUY' ? 'buy' : 'sell'}">${p.dir}</span> ${esc(p.name)} @ ${Number(p.entry).toFixed(p.digits)}</div>`).join('') : '';
    $('live-bal').textContent = GT.demos.active(user).acc.name + ' · ' + GT.money(acc.balance);
  }

  /* ================= downloads ================= */
  function dlLeft() {
    const u = GT.auth.current();
    if (!GT.feature('downloads', u)) return { n: 0, why: 'Downloads are switched off for a short while.' };
    const per = [['day', 1, GT.limit(u, 'dlDay')], ['week', 7, GT.limit(u, 'dlWeek')], ['month', 30, GT.limit(u, 'dlMonth')]];
    let best = { n: Infinity };
    per.forEach(([nm, days, lim]) => { const left = Math.max(0, lim - GT.usage(u, 'downloads', days)); if (left < best.n) best = { n: left, per: nm, lim }; });
    return best;
  }
  function dlInfo() {
    const u = GT.auth.current(), l = dlLeft(), d = GT.auth.trialLeft(u);
    const used = [['today', 1, 'dlDay'], ['this week', 7, 'dlWeek'], ['this month', 30, 'dlMonth']].map(([t, dd, k]) => `${GT.usage(u, 'downloads', dd)}/${GT.limit(u, k)} ${t}`).join(' · ');
    $('dl-info').innerHTML = (l.why ? l.why : `<b>${l.n}</b> download${l.n === 1 ? '' : 's'} left now`) + ` <span class="muted">(${used})</span> · free trial: <b>${d}</b> day${d === 1 ? '' : 's'} left.`;
  }
  function download(name, text, type) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function useDownload(kind) {
    const l = dlLeft();
    if (l.n <= 0) {
      $('dl-msg').innerHTML = `<div class="notice gold">${l.why || `You have used your ${l.lim} free download${l.lim === 1 ? '' : 's'} for this ${l.per}.`} Keep building and running bots without limits inside MetaTrader 5 with <a href="studio.html"><b>GTM EA Bot Studio</b></a> — 68 blocks, quick test and live trading.</div>`;
      return false;
    }
    if (!bot.buy.length && !bot.sell.length) { GT.toast('Add at least one BUY or SELL rule first.'); return false; }
    GT.auth.track('downloads'); GT.auth.track('dl_' + kind); dlInfo(); return true;
  }
  const fileName = ext => (bot.name.replace(/[^\w\- ]/g, '').trim().replace(/\s+/g, '_') || 'GTM_bot') + ext;
  $('dl-gtm').onclick = () => { if (!useDownload('gtm')) return; download(fileName('.gtmbot'), BC.toGtmbot(bot), 'text/plain'); showHow('gtm'); };
  $('dl-mq5').onclick = () => { if (!useDownload('mq5')) return; download(fileName('.mq5'), BC.toMq5(bot), 'text/plain'); showHow('mq5'); };
  function showHow(k) {
    $('dl-msg').innerHTML = k === 'gtm' ? `<div class="notice teal small"><b>Open it in GTM EA Bot Studio:</b> in MetaTrader 5 press <b>File → Open Data Folder</b>, go up one level to <b>Terminal → Common → Files → GTM_Studio → bots</b> and put <b>${esc(fileName('.gtmbot'))}</b> there.
        Then open the Studio's <b>Library</b> — the bot is in the list. No Studio yet? <a href="studio.html">See EA Bot Studio</a>.</div>`
      : `<div class="notice teal small"><b>Run it in any MT5:</b> press <b>File → Open Data Folder → MQL5 → Experts</b>, put <b>${esc(fileName('.mq5'))}</b> there, open it in MetaEditor and press <b>Compile</b> (F7).
        Then drag it from the Navigator onto a chart. Try it in the <b>Strategy Tester</b> and on a <b>demo account</b> first.</div>`;
  }

  /* ================= start ================= */
  const _load = lc.load.bind(lc);
  lc.load = async s => { if (live) { stopLive(); GT.toast('The bot was stopped because the market changed.'); } await _load(s); };
  setMode(mode);
  drawLive();
  lc.start();
})();
