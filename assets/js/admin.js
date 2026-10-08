/* G TRADERS — control panel (admins only)
   Users and their activity, per-user limits and features, messages / warnings,
   site-wide switches and limits, announcements, product PDFs.
   Test mode shows the accounts made in this browser; with Firebase it shows every account
   and firestore.rules let only the admin e-mails read or change this data. */
(function () {
  const $ = id => document.getElementById(id), esc = GT.esc, C = GT_CONFIG, DAY = 864e5;
  const me = GT.auth.current();
  if (!me || !GT.isAdmin(me)) {
    $('adm').innerHTML = `<div class="gate"><div class="lock">⛔</div><h2 style="font-size:24px">No access</h2><p class="muted">This page is only for the site owner.</p>
      <div class="row"><a class="btn ghost" href="index.html">Home</a>${me ? '' : '<a class="btn primary" href="account.html?tab=login&next=admin.html">Log in</a>'}</div></div>`;
    return;
  }
  if (GT.auth.mode === 'firebase' && me.verified === false) { $('adm').innerHTML = '<div class="gate"><div class="lock">✉️</div><h2>Confirm your e-mail first</h2><p class="muted">The control panel opens only for a confirmed admin e-mail.</p><div class="row"><a class="btn primary" href="account.html">Send the link again</a></div></div>'; return; }
  $('adm-mode').innerHTML = GT.auth.mode === 'firebase' ? '<span class="pill teal">Live · Firebase</span>' : '<span class="pill">Test mode · accounts in this browser only</span>';
  let users = [], sel = null, tab = GT.store.get('gt_adm_tab', 'overview');
  const EV = [['visits', 'Visits'], ['logins', 'Logins'], ['bots', 'Bots saved'], ['tests', 'Tests'], ['liveRuns', 'Bot runs'], ['trades', 'Demo trades'], ['signals', 'Signal views'], ['scans', 'Scans'], ['downloads', 'Downloads']];
  const left = u => Math.max(0, Math.ceil((u.trialEnds - Date.now()) / DAY));
  const st = u => u.status === 'disabled' || u.status === 'removed' ? u.status : (u.plan === 'pro' ? 'pro' : left(u) > 0 ? 'trial' : 'expired');
  const tot = (u, k) => (u.stats && u.stats.total && u.stats.total[k]) || 0;
  const dayv = (u, d, k) => { const v = u.stats && u.stats.days && u.stats.days[d]; return (v && v[k]) || 0; };
  const fmtD = t => t ? new Date(t).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  $('adm-tabs').querySelectorAll('button').forEach(b => b.onclick = () => { tab = b.dataset.t; GT.store.set('gt_adm_tab', tab); draw(); });
  $('adm-reload').onclick = () => load();

  async function load() {
    $('adm-body').innerHTML = '<p class="muted">Loading…</p>';
    try { users = await GT.admin.list(); } catch (e) { $('adm-body').innerHTML = `<div class="notice red">Could not load the users: ${esc(e.message)}. Check that your e-mail is in firestore.rules.</div>`; return; }
    draw();
  }
  function draw() {
    $('adm-tabs').querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.t === tab));
    ({ overview, users: usersTab, site: siteTab, products: productsTab, updates: updatesTab, signals: signalsTab, security: securityTab }[tab] || overview)();
  }
  // Edge / Windows spell-check and "Editor" made typing in the boxes slow: switch them off in the control panel
  const noSpell = root => (root || document).querySelectorAll('input,textarea').forEach(x => { x.spellcheck = false; x.setAttribute('autocomplete', 'off'); x.setAttribute('data-gramm', 'false'); });
  ['adm-body', 'drawer'].forEach(id => new MutationObserver(() => noSpell($(id))).observe($(id), { childList: true, subtree: true }));
  const fmtSize = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
  const closeDrawer = () => $('drawer').classList.remove('open');

  /* ---------------- overview ---------------- */
  function overview() {
    const today = GT.dkey(), wk = Date.now() - 7 * DAY;
    const k = {
      users: users.length, today: users.filter(u => dayv(u, today, 'visits') || dayv(u, today, 'logins')).length,
      new7: users.filter(u => u.created > wk).length, trial: users.filter(u => st(u) === 'trial').length, expired: users.filter(u => st(u) === 'expired').length,
      pro: users.filter(u => st(u) === 'pro').length, off: users.filter(u => st(u) === 'disabled' || st(u) === 'removed').length,
      dl: users.reduce((a, u) => a + dayv(u, today, 'downloads'), 0), bots: users.reduce((a, u) => a + tot(u, 'bots'), 0)
    };
    // the last 14 days of sign-ups and active users
    const days = [...Array(14)].map((_, i) => GT.dkey(new Date(Date.now() - (13 - i) * DAY)));
    const act = days.map(d => users.filter(u => dayv(u, d, 'visits') || dayv(u, d, 'logins')).length), mx = Math.max(1, ...act);
    $('adm-body').innerHTML = `<div class="adm-kpis">
        ${[['Users', k.users], ['Active today', k.today], ['New in 7 days', k.new7], ['On free trial', k.trial], ['Trial ended', k.expired], ['Pro', k.pro], ['Switched off', k.off], ['Downloads today', k.dl], ['Bots saved (all)', k.bots]]
        .map(([l, v]) => `<div class="kpi"><div class="l">${l}</div><div class="v">${v}</div></div>`).join('')}</div>
      <div class="grid g2" style="margin-top:14px">
        <div class="card"><h3>Active users — last 14 days</h3><div class="abars">${act.map((v, i) => `<div title="${days[i]}: ${v}"><i style="height:${v / mx * 100}%"></i><small>${days[i].slice(8)}</small></div>`).join('')}</div></div>
        <div class="card"><h3>Newest accounts</h3>${users.slice().sort((a, b) => b.created - a.created).slice(0, 8).map(u => `<div class="urow" data-u="${esc(u.id)}">${GT.avatar(u, 28)}<div><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div><span class="tagst ${st(u)}">${st(u)}</span></div>`).join('') || '<p class="muted small">No accounts yet.</p>'}</div>
      </div>`;
    bindRows();
  }

  /* ---------------- users ---------------- */
  let q = '', filt = 'all';
  function usersTab() {
    const list = users.filter(u => (filt === 'all' || st(u) === filt) && (!q || (u.name + ' ' + u.email + ' ' + (u.whatsapp || '') + ' ' + (u.country || '')).toLowerCase().includes(q.toLowerCase())))
      .sort((a, b) => (b.lastLogin || 0) - (a.lastLogin || 0));
    $('adm-body').innerHTML = `<div class="adm-tools"><input id="u-q" placeholder="Search name, e-mail, WhatsApp, country…" value="${esc(q)}">
        <select id="u-f">${['all', 'trial', 'expired', 'pro', 'disabled', 'removed'].map(f => `<option ${f === filt ? 'selected' : ''}>${f}</option>`).join('')}</select>
        <button class="btn ghost small" id="u-csv" type="button">Export CSV</button><span class="muted small">${list.length} of ${users.length}</span></div>
      <div class="panel" style="overflow:auto"><table class="t adm-t"><tr><th></th><th>Name</th><th>WhatsApp</th><th>Country</th><th>Joined</th><th>Last login</th><th>Logins 7d</th><th>Bots</th><th>Downloads</th><th>Trades</th><th>Status</th></tr>
        ${list.map(u => `<tr data-u="${esc(u.id)}"><td>${GT.avatar(u, 28)}</td><td><b>${esc(u.name)}</b><div class="muted small">${esc(u.email)}</div></td><td>${esc(u.whatsapp || '—')}</td><td>${esc(u.country || '—')}</td>
          <td>${new Date(u.created).toLocaleDateString()}</td><td>${fmtD(u.lastLogin)}</td><td>${[...Array(7)].reduce((a, _, i) => a + dayv(u, GT.dkey(new Date(Date.now() - i * DAY)), 'logins'), 0)}</td>
          <td>${tot(u, 'bots')}</td><td>${tot(u, 'downloads')}</td><td>${tot(u, 'trades')}</td><td><span class="tagst ${st(u)}">${st(u)}</span></td></tr>`).join('') || '<tr><td colspan="11" class="muted">No users match.</td></tr>'}</table></div>`;
    $('u-q').oninput = e => { q = e.target.value; const p = e.target.selectionStart; usersTab(); $('u-q').focus(); $('u-q').setSelectionRange(p, p); };
    $('u-f').onchange = e => { filt = e.target.value; usersTab(); };
    $('u-csv').onclick = () => {
      const rows = [['name', 'email', 'whatsapp', 'country', 'joined', 'last_login', 'status', 'plan', 'trial_ends', ...EV.map(x => x[0])]].concat(list.map(u => [u.name, u.email, u.whatsapp || '', u.country || '', new Date(u.created).toISOString(), u.lastLogin ? new Date(u.lastLogin).toISOString() : '', st(u), u.plan, new Date(u.trialEnds).toISOString(), ...EV.map(x => tot(u, x[0]))]));
      const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'gtraders-users-' + GT.dkey() + '.csv'; a.click();
    };
    bindRows();
  }
  function bindRows() { $('adm-body').querySelectorAll('[data-u]').forEach(r => r.onclick = () => openUser(r.dataset.u)); }

  /* ---------------- one user ---------------- */
  function openUser(id) {
    const u = users.find(x => x.id === id); if (!u) return; sel = u;
    const days = [...Array(30)].map((_, i) => GT.dkey(new Date(Date.now() - i * DAY)));
    const L = u.limits || {}, F = u.features || {}, S = GT.site();
    const wa = (u.whatsapp || '').replace(/[^0-9]/g, '');
    $('drawer').innerHTML = `<div class="dr-in">
      <div class="dr-h">${GT.avatar(u, 54)}<div><h3 style="margin:0">${esc(u.name)}</h3><div class="muted small">${esc(u.email)}${u.whatsapp ? ' · ' + esc(u.whatsapp) : ''}${u.country ? ' · ' + esc(u.country) : ''}</div>
        <div class="small">Joined ${fmtD(u.created)} · last login ${fmtD(u.lastLogin)}</div></div><button class="x" id="dr-x" type="button">×</button></div>
      <div class="dr-act">${wa ? `<a class="btn ghost small" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}<a class="btn ghost small" href="mailto:${esc(u.email)}">E-mail</a>
        <span class="tagst ${st(u)}">${st(u)}</span> <span class="small muted">plan ${esc(u.plan)} · trial ${left(u)} day(s) left (ends ${new Date(u.trialEnds).toLocaleDateString()})</span></div>
      <div class="dr-sec"><h4>Account</h4><div class="dr-grid">
        <label>Status<select id="d-status">${['active', 'warned', 'disabled', 'removed'].map(s => `<option ${u.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
        <label>Plan<select id="d-plan">${['trial', 'pro'].map(s => `<option ${u.plan === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
        <label>Trial ends<input type="date" id="d-trial" value="${new Date(u.trialEnds).toISOString().slice(0, 10)}"></label>
        <label>Quick<div style="display:flex;gap:4px"><button type="button" class="btn ghost small" data-add="7">+7 d</button><button type="button" class="btn ghost small" data-add="30">+30 d</button><button type="button" class="btn ghost small" data-add="0">End now</button></div></label>
        <label style="grid-column:1/-1">Private note (only you see it)<input id="d-note" value="${esc(u.note || '')}" maxlength="200"></label></div></div>
      <div class="dr-sec"><h4>Limits for this user <span class="muted small">(empty = site default)</span></h4><div class="dr-grid">
        ${Object.entries(GT.LIMITS).filter(([k]) => k !== 'trialDays').map(([k, lab]) => `<label>${lab}<input type="number" min="0" data-lim="${k}" value="${L[k] ?? ''}" placeholder="${S.limits[k]}"></label>`).join('')}</div></div>
      <div class="dr-sec"><h4>Features for this user</h4><div class="feats">${Object.entries(GT.FEATURES).filter(([k]) => k !== 'signup').map(([k, lab]) => `<label class="chk"><input type="checkbox" data-feat="${k}" ${F[k] === false ? '' : 'checked'}> ${lab}</label>`).join('')}</div></div>
      <div class="dr-row"><button class="btn primary" id="d-save" type="button">Save changes</button><button class="btn sell small" id="d-remove" type="button">Remove account</button></div>
      <div class="dr-sec"><h4>Send a popup message</h4>
        <textarea id="d-msg" rows="3" placeholder="Shown as a popup the next time this user opens the site"></textarea>
        <div class="dr-row"><select id="d-kind"><option value="info">Message</option><option value="warning">Warning</option><option value="danger">Final warning</option></select><button class="btn ghost" id="d-send" type="button">Send</button></div></div>
      <div class="dr-sec"><h4>Activity</h4>
        <div class="adm-kpis small4">${EV.map(([k, l]) => `<div class="kpi"><div class="l">${l}</div><div class="v">${tot(u, k)}</div></div>`).join('')}</div>
        <div style="overflow:auto;margin-top:10px"><table class="t adm-t"><tr><th>Day</th>${EV.map(x => `<th>${x[1]}</th>`).join('')}</tr>
          ${days.filter(d => EV.some(([k]) => dayv(u, d, k))).map(d => `<tr><td>${d}</td>${EV.map(([k]) => `<td>${dayv(u, d, k) || ''}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${EV.length + 1}" class="muted">No activity in the last 30 days.</td></tr>`}</table></div></div>
    </div>`;
    $('drawer').classList.add('open');
    $('dr-x').onclick = () => $('drawer').classList.remove('open');
    $('drawer').querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
      const n = +b.dataset.add, base = Math.max(Date.now(), u.trialEnds);
      $('d-trial').value = new Date(n ? base + n * DAY : Date.now()).toISOString().slice(0, 10);
    });
    $('d-save').onclick = async () => {
      const limits = {}; $('drawer').querySelectorAll('[data-lim]').forEach(i => { if (i.value !== '') limits[i.dataset.lim] = +i.value; });
      const features = {}; $('drawer').querySelectorAll('[data-feat]').forEach(i => { if (!i.checked) features[i.dataset.feat] = false; });
      const f = { status: $('d-status').value, plan: $('d-plan').value, trialEnds: new Date($('d-trial').value + 'T23:59:59').getTime(), note: $('d-note').value, limits, features };
      try { await GT.admin.update(u.id, f); Object.assign(u, f); GT.toast('Saved ' + u.name); draw(); openUser(u.id); } catch (e) { GT.toast('Could not save: ' + e.message, 4000); }
    };
    $('d-send').onclick = async () => {
      const t = $('d-msg').value.trim(); if (!t) return GT.toast('Write the message first.');
      try { await GT.admin.message(u.id, t, $('d-kind').value); $('d-msg').value = ''; GT.toast('Sent — it pops up on their next visit.'); } catch (e) { GT.toast('Could not send: ' + e.message, 4000); }
    };
    $('d-remove').onclick = async () => {
      if (!confirm(`Remove ${u.name}'s account? They will not be able to log in any more.`)) return;
      try { await GT.admin.remove(u.id); GT.toast('Removed'); $('drawer').classList.remove('open'); load(); } catch (e) { GT.toast(e.message); }
    };
  }

  /* ---------------- site settings ---------------- */
  async function siteTab() {
    const s = await GT.admin.getSite();
    $('adm-body').innerHTML = `<div class="grid g2">
      <div class="card"><h3>Features on the site</h3><p class="muted small">Switch any part of the site off for everyone (you still see it as the admin).</p>
        <div class="feats col">${Object.entries(GT.FEATURES).map(([k, l]) => `<label class="chk sw"><input type="checkbox" data-sf="${k}" ${s.features[k] === false ? '' : 'checked'}> ${l}</label>`).join('')}</div></div>
      <div class="card"><h3>Limits for everyone</h3><p class="muted small">A limit set on one user (Users tab) wins over these.</p>
        <div class="dr-grid">${Object.entries(GT.LIMITS).map(([k, l]) => `<label>${l}<input type="number" min="0" data-sl="${k}" value="${s.limits[k]}"></label>`).join('')}</div></div>
      <div class="card"><h3>Maintenance banner</h3><p class="muted small">A line on top of every page (you, the admin, do not see it on the site). Empty = no banner.</p>
        <input id="s-maint" value="${esc(s.maintenance)}" placeholder="e.g. Signals are being updated — back in 30 minutes" maxlength="160">
        <div class="dr-row"><label class="small" style="flex:1">Colour <select id="s-mstyle">${[['gold', 'Gold — notice'], ['teal', 'Teal — information'], ['red', 'Red — important']].map(([v, l]) => `<option value="${v}" ${s.maintStyle === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>
        <div class="small muted" style="margin:6px 0 4px">Preview</div><div id="s-mprev"></div></div>
      <div class="card"><h3>Announcement to everyone</h3><p class="muted small">Pops up once for every logged-in user.</p>
        ${s.announcement ? `<div class="notice small">Now showing: “${esc(s.announcement.text)}” <button class="btn ghost small" id="s-clear" type="button">Stop it</button></div>` : ''}
        <textarea id="s-ann" rows="3" placeholder="Write an announcement…"></textarea>
        <div class="dr-row"><select id="s-kind"><option value="info">Message</option><option value="warning">Warning</option></select><button class="btn ghost" id="s-send" type="button">Send to everyone</button></div></div>
    </div>
    <div class="dr-row" style="margin-top:14px"><button class="btn primary" id="s-save" type="button">Save site settings</button></div>`;
    $('s-save').onclick = async () => {
      const features = {}; document.querySelectorAll('[data-sf]').forEach(i => features[i.dataset.sf] = i.checked);
      const limits = {}; document.querySelectorAll('[data-sl]').forEach(i => limits[i.dataset.sl] = Math.max(0, +i.value || 0));
      try { await GT.admin.saveSite({ features, limits, maintenance: $('s-maint').value.trim(), maintStyle: $('s-mstyle').value }); GT.toast('Site settings saved'); } catch (e) { GT.toast('Could not save: ' + e.message, 4000); }
    };
    const prev = () => { const t = $('s-maint').value.trim(), k = $('s-mstyle').value; $('s-mprev').innerHTML = t ? `<div class="gt-maint ${k}" style="position:static;border:1px solid var(--line2);border-radius:10px"><div class="wrap" style="padding:8px 10px"><span class="mi">${k === 'red' ? '⚠' : k === 'teal' ? 'ℹ' : '🛠'}</span><span class="mt">${esc(t)}</span></div></div>` : '<p class="muted small">No banner.</p>'; };
    $('s-maint').oninput = prev; $('s-mstyle').onchange = prev; prev();
    $('s-send').onclick = async () => { const t = $('s-ann').value.trim(); if (!t) return; await GT.admin.broadcast(t, $('s-kind').value); GT.toast('Announcement sent'); siteTab(); };
    if ($('s-clear')) $('s-clear').onclick = async () => { await GT.admin.broadcast('', 'info'); siteTab(); };
  }

  /* ---------------- products: every text, picture and PDF ---------------- */
  async function productsTab() {
    $('adm-body').innerHTML = '<p class="muted">Loading products…</p>';
    let ov = [];
    try { ov = await GT.content.listProductOverrides(); } catch (e) { $('adm-body').innerHTML = `<div class="notice red">Could not load the products: ${esc(e.message)}. Publish the newest firestore.rules in Firebase.</div>`; return; }
    GT.applyProducts(ov);
    const all = GT.allProducts.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    const baseKeys = GT.baseProducts().map(p => p.key);
    $('adm-body').innerHTML = `<div class="adm-tools"><span class="muted small">Click <b>Edit</b> to change any text, the picture or the PDF guides of a product. Changes show on the site straight away.</span>
        <button class="btn primary small" id="pr-add" type="button">+ Add a product</button></div>
      <div class="prod-adm">${all.map((p, i) => {
        const o = ov.find(x => x.key === p.key), changed = !!o, base = baseKeys.includes(p.key), docs = GT.docs(p).filter(d => d.url || d.file);
        return `<div class="card pa ${p.deleted ? 'off' : p.hidden ? 'off' : ''}" data-k="${esc(p.key)}">
          <img src="${esc(p.img || 'assets/img/gt-emblem.png')}" alt="">
          <div class="pa-b"><b>${esc(p.name || p.key)}</b> ${p.badge ? `<span class="pill">${esc(p.badge)}</span>` : ''} ${p.deleted ? '<span class="tagst removed">deleted</span>' : p.hidden ? '<span class="tagst disabled">hidden</span>' : ''} ${changed ? '<span class="tagst pro">edited</span>' : ''}
            <div class="muted small">${esc(p.type || '')} · ${esc(p.price || '')} · MQL5 #${esc(p.id || '—')} · ${docs.length} PDF</div>
            <div class="pa-a"><button class="btn ghost small" data-ed type="button">✎ Edit</button>
              <button class="btn ghost small" data-up type="button" ${i ? '' : 'disabled'}>↑</button><button class="btn ghost small" data-dn type="button" ${i < all.length - 1 ? '' : 'disabled'}>↓</button>
              <button class="btn ghost small" data-hide type="button">${p.hidden || p.deleted ? 'Show' : 'Hide'}</button>
              ${base ? (changed ? '<button class="btn ghost small" data-reset type="button">Back to original</button>' : '') : '<button class="btn sell small" data-del type="button">Delete</button>'}
              <a class="btn ghost small" href="${esc(p.page || ('product.html?p=' + p.key))}" target="_blank">Open page ↗</a></div></div></div>`;
      }).join('')}</div>`;
    const find = k => all.find(p => p.key === k), ovOf = k => Object.assign({ key: k }, ov.find(x => x.key === k) || {});
    const save = async (o, msg) => { try { await GT.content.saveProduct(o); GT.toast(msg || 'Saved'); productsTab(); } catch (e) { GT.toast('Could not save: ' + e.message, 5000); } };
    $('adm-body').querySelectorAll('.pa').forEach(card => {
      const k = card.dataset.k, p = find(k), q = sel => card.querySelector(sel);
      q('[data-ed]').onclick = () => editProduct(p, ov.find(x => x.key === k));
      q('[data-hide]').onclick = () => save(Object.assign(ovOf(k), { hidden: !(p.hidden || p.deleted), deleted: false }), p.hidden || p.deleted ? 'The product is shown again' : 'The product is hidden');
      const move = d => {   // swap the order with the neighbour
        const i = all.indexOf(p), j = i + d; if (j < 0 || j >= all.length) return;
        Promise.all([GT.content.saveProduct(Object.assign(ovOf(k), { order: j })), GT.content.saveProduct(Object.assign(ovOf(all[j].key), { order: i }))])
          .then(() => { all.forEach((x, n) => { if (x !== p && x !== all[j] && (ov.find(o => o.key === x.key) || {}).order == null) GT.content.saveProduct(Object.assign(ovOf(x.key), { order: n })); }); productsTab(); })
          .catch(e => GT.toast(e.message, 5000));
      };
      q('[data-up]').onclick = () => move(-1); q('[data-dn]').onclick = () => move(1);
      if (q('[data-reset]')) q('[data-reset]').onclick = async () => { if (!confirm('Use the original texts and picture of ' + p.name + ' again?')) return; await GT.content.resetProduct(k); GT.toast('Back to the original'); productsTab(); };
      if (q('[data-del]')) q('[data-del]').onclick = async () => { if (!confirm('Delete ' + p.name + '? Its page will stop working.')) return; await GT.content.resetProduct(k); GT.toast('Deleted'); productsTab(); };
    });
    $('pr-add').onclick = () => editProduct(null, null);
  }

  // the product editor (in the side drawer)
  async function editProduct(p, o) {
    const isNew = !p; p = p || { key: '', name: '', full: '', type: 'Utility · MT5', badge: 'New', price: '', text: '', features: [], img: '', id: '' };
    const site = await GT.admin.getSite();
    let docs = (GT.docs(p) || []).map(d => Object.assign({}, d)), img = p.img || '';
    const removedFiles = [];
    $('drawer').innerHTML = `<div class="dr-in">
      <div class="dr-h"><div><h3 style="margin:0">${isNew ? 'New product' : 'Edit ' + esc(p.name)}</h3><div class="muted small">Everything here shows on the product page, the product list and the home page.</div></div><button class="x" id="dr-x" type="button">×</button></div>
      <div class="dr-sec"><h4>Picture</h4>
        <div class="pe-img"><img id="pe-pic" src="${esc(img || 'assets/img/gt-emblem.png')}" alt="">
          <div><label class="drop" id="pe-drop"><input type="file" id="pe-file" accept="image/*" hidden><b>Choose a picture</b><span class="muted small">or drag it here · JPG / PNG / WEBP · it is made smaller automatically</span></label>
          <input id="pe-imgurl" placeholder="…or a picture address (assets/img/… or https://…)" value="${/^data:/.test(img) ? '' : esc(img)}"></div></div></div>
      <div class="dr-sec"><h4>Texts</h4><div class="dr-grid">
        <label>Short key (in the page address)<input id="pe-key" value="${esc(p.key)}" ${isNew ? '' : 'disabled'} placeholder="e.g. smcbot" maxlength="24"></label>
        <label>MQL5 product number<input id="pe-id" value="${esc(p.id || '')}" placeholder="e.g. 198085" inputmode="numeric"></label>
        <label>Short name<input id="pe-name" value="${esc(p.name)}" maxlength="60"></label>
        <label>Badge (empty = none)<input id="pe-badge" value="${esc(p.badge || '')}" placeholder="New / Free / -30%" maxlength="20"></label>
        <label style="grid-column:1/-1">Full name (big title)<input id="pe-full" value="${esc(p.full || '')}" maxlength="140"></label>
        <label>Type<input id="pe-type" value="${esc(p.type || '')}" placeholder="Expert Advisor · MT5" maxlength="60"></label>
        <label>Price text<input id="pe-price" value="${esc(p.price || '')}" placeholder="$49 · rent $30 / month" maxlength="80"></label>
        <label style="grid-column:1/-1">Short description<textarea id="pe-text" rows="3" maxlength="600">${esc(p.text || '')}</textarea></label>
        <label style="grid-column:1/-1">Features — one per line<textarea id="pe-feat" rows="8" maxlength="6000">${esc((p.features || []).join('\n'))}</textarea></label>
        <label style="grid-column:1/-1">Other MQL5 link (optional — empty = the normal product page)<input id="pe-url" value="${esc(p.mql5Url || '')}" placeholder="https://www.mql5.com/en/market/product/…"></label></div></div>
      <div class="dr-sec"><h4>PDF guides</h4><p class="muted small" style="margin-top:0">Upload a PDF from your computer (up to 10 MB). Choosing a new file for a guide replaces the old one.</p>
        <div id="pe-docs"></div><button class="btn ghost small" id="pe-adddoc" type="button">+ Add a guide</button></div>
      <div class="dr-row"><button class="btn primary" id="pe-save" type="button">Save the product</button><span class="small" id="pe-msg"></span></div></div>`;
    $('drawer').classList.add('open'); $('dr-x').onclick = closeDrawer;
    // picture
    const setPic = async f => { try { img = await GT.imgToData(f, 1000, .82); $('pe-pic').src = img; $('pe-imgurl').value = ''; } catch (e) { GT.toast(e.message, 4000); } };
    $('pe-file').onchange = e => e.target.files[0] && setPic(e.target.files[0]);
    dropZone($('pe-drop'), f => setPic(f));
    $('pe-imgurl').onchange = e => { const v = e.target.value.trim(); if (v) { img = v; $('pe-pic').src = v; } };
    // guides
    const drawDocs = () => {
      $('pe-docs').innerHTML = docs.map((d, i) => `<div class="pe-doc" data-i="${i}">
        <input data-k="title" value="${esc(d.title || '')}" placeholder="Title, e.g. User guide (English)">
        <label class="drop small" data-drop><input type="file" accept="application/pdf,.pdf" hidden data-f>
          <b>${d.pending ? '📄 ' + esc(d.pending.name) + ' · ' + fmtSize(d.pending.size) + ' (not uploaded yet)' : d.file ? '📄 ' + esc(d.name || 'uploaded PDF') + (d.size ? ' · ' + fmtSize(d.size) : '') : d.url ? '🔗 ' + esc(d.url) : 'Choose a PDF'}</b>
          <span class="muted small">${d.file || d.url || d.pending ? 'Click or drop a PDF to replace it' : 'Click or drag a PDF here'}</span></label>
        <button type="button" class="x" data-del title="Remove this guide">×</button></div>`).join('') || '<p class="muted small">No guides yet.</p>';
      $('pe-docs').querySelectorAll('.pe-doc').forEach(r => {
        const d = docs[+r.dataset.i];
        r.querySelector('[data-k=title]').oninput = e => d.title = e.target.value;
        const pick = f => { if (!/pdf$/i.test(f.type) && !/\.pdf$/i.test(f.name)) return GT.toast('Only PDF files.'); if (f.size > 10485760) return GT.toast('The PDF is bigger than 10 MB.', 4000); d.pending = f; if (!d.title) d.title = f.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' '); drawDocs(); };
        r.querySelector('[data-f]').onchange = e => e.target.files[0] && pick(e.target.files[0]);
        dropZone(r.querySelector('[data-drop]'), pick);
        r.querySelector('[data-del]').onclick = () => { if (d.file) removedFiles.push(d.file); docs.splice(+r.dataset.i, 1); drawDocs(); };
      });
    };
    $('pe-adddoc').onclick = () => { docs.push({ title: '' }); drawDocs(); };
    drawDocs();
    $('pe-save').onclick = async () => {
      const key = isNew ? $('pe-key').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '') : p.key;
      if (!key) return GT.toast('Write a short key (letters and numbers).');
      if (isNew && GT.allProducts.some(x => x.key === key)) return GT.toast('That key is used already.');
      if (!$('pe-name').value.trim()) return GT.toast('Write the product name.');
      const btn = $('pe-save'), msg = t => $('pe-msg').textContent = t; btn.disabled = true;
      try {
        // 1. upload the new PDFs (and remember the old files they replace)
        for (const d of docs) if (d.pending) {
          const f = d.pending; msg('Uploading ' + f.name + '…');
          const id = await GT.content.uploadFile(f, { product: key, title: d.title }, x => msg('Uploading ' + f.name + ' — ' + Math.round(x * 100) + '%'));
          if (d.file) removedFiles.push(d.file);
          Object.assign(d, { file: id, name: f.name, size: f.size, url: '' }); delete d.pending;
        }
        // 2. the product texts and picture
        msg('Saving…');
        const out = Object.assign({}, o || {}, {
          key, name: $('pe-name').value.trim(), full: $('pe-full').value.trim() || $('pe-name').value.trim(), type: $('pe-type').value.trim(), badge: $('pe-badge').value.trim(),
          price: $('pe-price').value.trim(), text: $('pe-text').value.trim(), features: $('pe-feat').value.split('\n').map(x => x.trim()).filter(Boolean),
          id: $('pe-id').value.replace(/[^0-9]/g, ''), mql5Url: /^https:\/\//.test($('pe-url').value.trim()) ? $('pe-url').value.trim() : '', img: img || '', deleted: false
        });
        if (out.img.length > 800000) throw new Error('The picture is too big — choose a smaller one.');
        await GT.content.saveProduct(out);
        // 3. the guide list
        const pd = Object.assign({}, site.productDocs || (GT.store.get('gt_site', {}) || {}).productDocs || {});
        pd[key] = docs.filter(d => d.title && (d.file || d.url)).map(d => d.file ? { title: d.title.trim(), file: d.file, name: d.name || '', size: d.size || 0 } : { title: d.title.trim(), url: d.url });
        await GT.admin.saveSite({ productDocs: pd });
        for (const id of removedFiles) await GT.content.deleteFile(id).catch(() => { });
        GT.toast('Product saved'); closeDrawer(); productsTab();
      } catch (e) { msg(''); GT.toast('Could not save: ' + e.message, 6000); }
      btn.disabled = false;
    };
  }
  function dropZone(el, onFile) {
    ['dragenter', 'dragover'].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.add('over'); }));
    ['dragleave', 'drop'].forEach(ev => el.addEventListener(ev, e => { e.preventDefault(); el.classList.remove('over'); }));
    el.addEventListener('drop', e => { const f = e.dataTransfer && e.dataTransfer.files[0]; if (f) onFile(f); });
  }

  /* ---------------- Updates page: posts ---------------- */
  async function updatesTab() {
    $('adm-body').innerHTML = '<p class="muted">Loading posts…</p>';
    let posts = [];
    try { posts = await GT.content.listPosts(true); } catch (e) { $('adm-body').innerHTML = `<div class="notice red">Could not load the posts: ${esc(e.message)}. Publish the newest firestore.rules in Firebase.</div>`; return; }
    const now = Date.now();
    $('adm-body').innerHTML = `<div class="adm-tools"><span class="muted small">Posts on the <a href="updates.html" target="_blank">Updates page</a>. Users can like and comment.</span><button class="btn primary small" id="po-new" type="button">+ New post</button></div>
      ${posts.map(p => `<div class="card po-row" data-id="${esc(p.id)}">${p.images && p.images[0] ? `<img src="${esc(p.images[0])}" alt="">` : `<div class="po-ph">${p.video ? '▶' : '📝'}</div>`}
        <div style="flex:1;min-width:0"><b>${p.pinned ? '📌 ' : ''}${esc(p.title || '(no title)')}</b>
          <div class="muted small">${p.publishAt > now ? '<span class="tagst trial">scheduled</span> ' + fmtD(p.publishAt) : 'published ' + fmtD(p.publishAt)} · ❤ ${Object.keys(p.likes || {}).length} · 💬 ${p.commentCount || 0}</div></div>
        <div class="pa-a"><button class="btn ghost small" data-ed type="button">✎ Edit</button><button class="btn ghost small" data-cm type="button">Comments</button><button class="btn sell small" data-del type="button">Delete</button></div></div>`).join('') || '<div class="card"><p class="muted">No posts yet. Press <b>+ New post</b>.</p></div>'}`;
    $('po-new').onclick = () => editPost(null);
    $('adm-body').querySelectorAll('.po-row').forEach(r => {
      const p = posts.find(x => x.id === r.dataset.id);
      r.querySelector('[data-ed]').onclick = () => editPost(p);
      r.querySelector('[data-cm]').onclick = () => postComments(p);
      r.querySelector('[data-del]').onclick = async () => { if (!confirm('Delete this post and its comments?')) return; await GT.content.deletePost(p.id); GT.toast('Deleted'); updatesTab(); };
    });
  }
  function editPost(p) {
    p = p || { title: '', html: '', images: [], video: '', publishAt: Date.now(), pinned: false };
    let images = (p.images || []).slice(), mode = 'write';
    const local = t => { const d = new Date(t - new Date(t).getTimezoneOffset() * 60000); return d.toISOString().slice(0, 16); };
    $('drawer').innerHTML = `<div class="dr-in">
      <div class="dr-h"><div><h3 style="margin:0">${p.id ? 'Edit post' : 'New post'}</h3><div class="muted small">Like a Facebook post: text, pictures and a video.</div></div><button class="x" id="dr-x" type="button">×</button></div>
      <div class="dr-sec"><label>Title<input id="ps-title" value="${esc(p.title)}" maxlength="140" placeholder="e.g. GTM Bot Maker v4 is out"></label>
        <div class="seg" style="margin:12px 0 6px" id="ps-mode"><button type="button" data-m="write" class="on">Write</button><button type="button" data-m="html">HTML</button><button type="button" data-m="prev">Preview</button></div>
        <div id="ps-tools" class="ps-tools">${[['b', '<b>B</b>'], ['i', '<i>I</i>'], ['h3', 'Heading'], ['ul', '• List'], ['a', '🔗 Link'], ['hr', '— Line']].map(([c, l]) => `<button type="button" data-c="${c}">${l}</button>`).join('')}</div>
        <div id="ps-edit" class="ps-edit" contenteditable="true">${GT.cleanHtml(p.html)}</div>
        <textarea id="ps-html" rows="12" style="display:none;font-family:ui-monospace,Consolas,monospace;font-size:13px" placeholder="Paste HTML here (like an MQL5 Market description)"></textarea>
        <div id="ps-prev" class="post-body card" style="display:none"></div></div>
      <div class="dr-sec"><h4>Pictures (up to 4)</h4><div id="ps-imgs" class="ps-imgs"></div>
        <label class="drop" id="ps-drop"><input type="file" id="ps-file" accept="image/*" multiple hidden><b>Add pictures</b><span class="muted small">or drag them here · made smaller automatically</span></label></div>
      <div class="dr-sec"><h4>Video</h4><input id="ps-video" value="${esc(p.video || '')}" placeholder="YouTube or Facebook video link"><div id="ps-vprev" style="margin-top:8px"></div></div>
      <div class="dr-sec"><h4>When</h4><div class="dr-grid">
        <label>Publish at<input type="datetime-local" id="ps-when" value="${local(p.publishAt || Date.now())}"></label>
        <label class="chk" style="align-self:end"><input type="checkbox" id="ps-pin" ${p.pinned ? 'checked' : ''}> Pin to the top</label></div>
        <p class="muted small">A time in the future = the post appears by itself at that time.</p></div>
      <div class="dr-row"><button class="btn primary" id="ps-save" type="button">${p.id ? 'Save the post' : 'Publish'}</button><span class="small" id="ps-msg"></span></div></div>`;
    $('drawer').classList.add('open'); $('dr-x').onclick = closeDrawer;
    const ed = $('ps-edit'), ta = $('ps-html');
    const html = () => mode === 'html' ? ta.value : ed.innerHTML;
    $('ps-mode').querySelectorAll('button').forEach(b => b.onclick = () => {
      const cur = html(); mode = b.dataset.m;
      $('ps-mode').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      ed.style.display = mode === 'write' ? '' : 'none'; $('ps-tools').style.display = mode === 'write' ? '' : 'none';
      ta.style.display = mode === 'html' ? '' : 'none'; $('ps-prev').style.display = mode === 'prev' ? '' : 'none';
      if (mode === 'html') ta.value = cur; if (mode === 'write') ed.innerHTML = GT.cleanHtml(cur);
      if (mode === 'prev') { $('ps-prev').innerHTML = GT.cleanHtml(cur); ed.innerHTML = GT.cleanHtml(cur); }
    });
    $('ps-tools').querySelectorAll('button').forEach(b => b.onmousedown = e => {
      e.preventDefault(); const c = b.dataset.c; ed.focus();
      if (c === 'b') document.execCommand('bold'); else if (c === 'i') document.execCommand('italic');
      else if (c === 'h3') document.execCommand('formatBlock', false, 'h3'); else if (c === 'ul') document.execCommand('insertUnorderedList');
      else if (c === 'hr') document.execCommand('insertHorizontalRule');
      else if (c === 'a') { const u = prompt('Link address (https://…)'); if (u && /^https?:\/\//.test(u)) document.execCommand('createLink', false, u); }
    });
    const drawImgs = () => {
      $('ps-imgs').innerHTML = images.map((s, i) => `<div><img src="${esc(s)}" alt=""><button type="button" data-i="${i}" title="Remove">×</button></div>`).join('');
      $('ps-imgs').querySelectorAll('button').forEach(b => b.onclick = () => { images.splice(+b.dataset.i, 1); drawImgs(); });
    };
    const addImgs = async files => {
      for (const f of files) { if (images.length >= 4) { GT.toast('Up to 4 pictures.'); break; } try { images.push(await GT.imgToData(f, 1280, .8)); } catch (e) { GT.toast(e.message); } }
      drawImgs();
    };
    $('ps-file').onchange = e => addImgs([...e.target.files]);
    dropZone($('ps-drop'), () => { });
    $('ps-drop').addEventListener('drop', e => addImgs([...(e.dataTransfer ? e.dataTransfer.files : [])]));
    drawImgs();
    const vprev = () => { const u = GT.videoEmbed($('ps-video').value); $('ps-vprev').innerHTML = $('ps-video').value.trim() ? (u ? `<div class="vid"><iframe src="${esc(u)}" allowfullscreen loading="lazy"></iframe></div>` : '<p class="small red">Use a YouTube or Facebook video link.</p>') : ''; };
    $('ps-video').onchange = vprev; vprev();
    $('ps-save').onclick = async () => {
      const body = html().trim(), title = $('ps-title').value.trim();
      if (!title && !body && !images.length && !$('ps-video').value.trim()) return GT.toast('The post is empty.');
      if ($('ps-video').value.trim() && !GT.videoEmbed($('ps-video').value)) return GT.toast('Use a YouTube or Facebook video link.');
      $('ps-save').disabled = true; $('ps-msg').textContent = 'Saving…';
      try {
        await GT.content.savePost({ id: p.id, created: p.created, title, html: body, images, video: $('ps-video').value.trim(), pinned: $('ps-pin').checked, publishAt: new Date($('ps-when').value).getTime() || Date.now() });
        GT.toast(p.id ? 'Post saved' : 'Post published'); closeDrawer(); updatesTab();
      } catch (e) { GT.toast('Could not save: ' + e.message, 6000); $('ps-msg').textContent = ''; }
      $('ps-save').disabled = false;
    };
  }
  async function postComments(p) {
    $('drawer').innerHTML = `<div class="dr-in"><div class="dr-h"><div><h3 style="margin:0">Comments</h3><div class="muted small">${esc(p.title || '')}</div></div><button class="x" id="dr-x" type="button">×</button></div><div id="pc-list"><p class="muted">Loading…</p></div></div>`;
    $('drawer').classList.add('open'); $('dr-x').onclick = closeDrawer;
    const list = await GT.content.listComments(p.id).catch(() => []);
    const draw = () => {
      $('pc-list').innerHTML = list.map(c => `<div class="cm"><div class="cm-h">${GT.avatar(c, 26)}<b>${esc(c.name)}</b><span class="muted small">${fmtD(c.created)}</span><button class="btn sell small" data-d="${esc(c.id)}" type="button" style="margin-left:auto">Delete</button></div><p>${esc(c.text).replace(/\n/g, '<br>')}</p></div>`).join('') || '<p class="muted">No comments yet.</p>';
      $('pc-list').querySelectorAll('[data-d]').forEach(b => b.onclick = async () => { await GT.content.deleteComment(p, b.dataset.d); list.splice(list.findIndex(c => c.id === b.dataset.d), 1); draw(); });
    };
    draw();
  }

  /* ---------------- signal engines ---------------- */
  async function signalsTab() {
    const s = await GT.admin.getSite(), E = Object.assign({}, s.engines || {});
    const BUILT = GT.SIGNAL_ENGINES || {};
    const custom = (E.custom || []).slice();
    const prm = (k, def) => Object.entries(def || {}).map(([n, v]) => `<label>${esc(n)}<input type="number" step="any" data-eng="${k}" data-p="${esc(n)}" value="${(E[k] && E[k].params && E[k].params[n] != null) ? E[k].params[n] : v}" placeholder="${v}"></label>`).join('') || '<p class="muted small">This engine has no settings — it uses the other engines.</p>';
    $('adm-body').innerHTML = `<p class="muted small">Change the settings of the engines on the <a href="signals.html" target="_blank">Signals page</a>, hide an engine, or add your own engine with code. Empty box = the original value.</p>
      <div class="grid g2">${Object.entries(BUILT).map(([k, b]) => `<div class="card eng-c" data-k="${k}"><h3>${esc((E[k] && E[k].label) || b.label)} <span class="muted small">${esc(k)}</span></h3>
        <p class="muted small">${esc(b.about || '')}</p>
        <div class="dr-grid"><label>Button name<input data-lab="${k}" value="${esc((E[k] && E[k].label) || '')}" placeholder="${esc(b.label)}"></label><label class="chk" style="align-self:end"><input type="checkbox" data-hid="${k}" ${E[k] && E[k].hidden ? '' : 'checked'}> Shown on the Signals page</label>
        ${prm(k, b.defaults)}</div></div>`).join('')}</div>
      <div class="card" style="margin-top:14px"><div class="adm-tools" style="margin:0"><h3 style="margin:0">Your own engines</h3><button class="btn ghost small" id="ce-add" type="button">+ New engine</button></div><div id="ce-list"></div></div>
      <div class="dr-row" style="margin-top:14px"><button class="btn primary" id="eng-save" type="button">Save the engines</button><button class="btn ghost" id="eng-reset" type="button">All engines back to original</button></div>`;
    const drawCustom = () => {
      $('ce-list').innerHTML = custom.map((c, i) => `<div class="ce" data-i="${i}"><div class="dr-grid">
          <label>Name<input data-c="name" value="${esc(c.name || '')}" placeholder="My breakout engine" maxlength="60"></label>
          <label>Button text<input data-c="short" value="${esc(c.short || '')}" placeholder="BRK" maxlength="12"></label>
          <label class="chk" style="align-self:end"><input type="checkbox" data-c="on" ${c.on === false ? '' : 'checked'}> Shown on the Signals page</label>
          <label class="chk" style="align-self:end"><input type="checkbox" data-c="main" ${c.main ? 'checked' : ''}> Big button (next to SMC / GTM / Multi)</label></div>
        <label class="small">Code — <span class="muted">function body of <code>detect(c, I, P)</code>: <code>c</code> = candles {time, open, high, low, close}, <code>I</code> = indicators (ema, sma, rsi, atr…), <code>P</code> = settings. Return a list of signals.</span></label>
        <textarea data-c="code" rows="14" class="code">${esc(c.code || '')}</textarea>
        <label class="small">Settings (JSON)<input data-c="params" value="${esc(JSON.stringify(c.params || {}))}" placeholder='{"period": 20}'></label>
        <div class="dr-row"><button class="btn ghost small" data-test type="button">▶ Test the code</button><button class="btn sell small" data-del type="button">Delete</button><span class="small" data-out></span></div></div>`).join('') || '<p class="muted small">No engines of your own yet.</p>';
      $('ce-list').querySelectorAll('.ce').forEach(el => {
        const c = custom[+el.dataset.i];
        el.querySelectorAll('[data-c]').forEach(inp => inp.oninput = inp.onchange = () => {
          const k = inp.dataset.c;
          if (k === 'on' || k === 'main') c[k] = inp.checked;
          else if (k === 'params') { try { c.params = JSON.parse(inp.value || '{}'); inp.style.borderColor = ''; } catch (e) { inp.style.borderColor = 'var(--red)'; } }
          else c[k] = inp.value;
        });
        el.querySelector('[data-del]').onclick = () => { if (confirm('Delete this engine?')) { custom.splice(+el.dataset.i, 1); drawCustom(); } };
        el.querySelector('[data-test]').onclick = () => {
          const out = el.querySelector('[data-out]');
          const r = GT.testEngine ? GT.testEngine(c) : { error: 'Open the Signals page once, then try again.' };
          out.className = 'small ' + (r.error ? 'red' : 'green');
          out.textContent = r.error ? '✕ ' + r.error : `✓ The code works: ${r.count} signal(s) on 600 test candles (${r.buy} buy / ${r.sell} sell) in ${r.ms} ms.`;
        };
      });
    };
    $('ce-add').onclick = () => { custom.push({ key: 'c' + Date.now().toString(36), name: 'My engine', short: 'MINE', on: true, main: false, params: { fast: 9, slow: 21 }, code: GT.ENGINE_TEMPLATE || '' }); drawCustom(); };
    drawCustom();
    $('eng-save').onclick = async () => {
      const out = { custom: [] };
      Object.keys(BUILT).forEach(k => {
        const params = {}; document.querySelectorAll(`[data-eng="${k}"]`).forEach(i => { if (i.value !== '' && +i.value !== +i.placeholder) params[i.dataset.p] = +i.value; });
        out[k] = { label: (document.querySelector(`[data-lab="${k}"]`) || {}).value || '', hidden: !document.querySelector(`[data-hid="${k}"]`).checked, params };
      });
      for (const c of custom) {
        if (!c.name || !c.code) return GT.toast('Every engine needs a name and code.');
        const r = GT.testEngine ? GT.testEngine(c) : {};
        if (r.error) return GT.toast(c.name + ': ' + r.error, 6000);
        out.custom.push({ key: c.key, name: c.name.slice(0, 60), short: (c.short || c.name).slice(0, 12), on: c.on !== false, main: !!c.main, params: c.params || {}, code: String(c.code).slice(0, 40000) });
      }
      try { await GT.admin.saveSite({ engines: out }); GT.toast('Engines saved — the Signals page uses them now'); } catch (e) { GT.toast('Could not save: ' + e.message, 5000); }
    };
    $('eng-reset').onclick = async () => { if (!confirm('Put every engine back to the original settings? Your own engines are kept.')) return; await GT.admin.saveSite({ engines: { custom } }); signalsTab(); };
  }

  /* ---------------- security ---------------- */
  function securityTab() {
    const fb = GT.auth.mode === 'firebase';
    const item = (ok, t, d) => `<div class="sec-i ${ok ? 'ok' : 'todo'}"><b>${ok ? '✓' : '•'} ${t}</b><div class="muted small">${d}</div></div>`;
    $('adm-body').innerHTML = `<div class="card">
      ${item(fb, 'Real accounts (Firebase)', fb ? 'On. Passwords are kept by Google, never by this site.' : 'Off — test mode. Fill in <code>firebase</code> in config.js (README, “Real accounts”).')}
      ${item(fb, 'Database rules', 'Upload <code>firestore.rules</code> in the Firebase console. Only these e-mails can read users or change settings: ' + esc((C.adminEmails || []).join(', ')))}
      ${item(true, 'Login lock', `${C.lockAttempts} wrong passwords = ${C.lockMinutes}-minute lock (plus Firebase's own protection when it is on).`)}
      ${item(fb, 'Password reset e-mails', fb ? 'On — Firebase sends the link.' : 'Switches on with Firebase.')}
      ${item(location.protocol === 'https:', 'HTTPS / SSL', location.protocol === 'https:' ? 'This page is on HTTPS.' : 'You are on a local test address. On the real domain HTTPS comes free from Cloudflare / Firebase Hosting.')}
      ${item(false, 'Firewall (WAF)', 'Put www.gtraders.lk behind Cloudflare (free): DNS proxied (orange cloud), SSL “Full (strict)”, “Always use HTTPS”, Bot Fight Mode on, and a rate-limit rule for /account.html.')}
      ${item(false, 'Your own accounts', 'Use 2-step verification on Google (Firebase), Cloudflare, GitHub and the domain registrar. Never share the admin password.')}
    </div>`;
  }

  load();
})();
