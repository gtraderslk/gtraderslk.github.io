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
    ({ overview, users: usersTab, site: siteTab, products: productsTab, security: securityTab }[tab] || overview)();
  }

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
      <div class="card"><h3>Maintenance banner</h3><p class="muted small">A yellow line on top of every page. Empty = no banner.</p>
        <input id="s-maint" value="${esc(s.maintenance)}" placeholder="e.g. Signals are being updated — back in 30 minutes" maxlength="160"></div>
      <div class="card"><h3>Announcement to everyone</h3><p class="muted small">Pops up once for every logged-in user.</p>
        ${s.announcement ? `<div class="notice small">Now showing: “${esc(s.announcement.text)}” <button class="btn ghost small" id="s-clear" type="button">Stop it</button></div>` : ''}
        <textarea id="s-ann" rows="3" placeholder="Write an announcement…"></textarea>
        <div class="dr-row"><select id="s-kind"><option value="info">Message</option><option value="warning">Warning</option></select><button class="btn ghost" id="s-send" type="button">Send to everyone</button></div></div>
    </div>
    <div class="dr-row" style="margin-top:14px"><button class="btn primary" id="s-save" type="button">Save site settings</button></div>`;
    $('s-save').onclick = async () => {
      const features = {}; document.querySelectorAll('[data-sf]').forEach(i => features[i.dataset.sf] = i.checked);
      const limits = {}; document.querySelectorAll('[data-sl]').forEach(i => limits[i.dataset.sl] = Math.max(0, +i.value || 0));
      try { await GT.admin.saveSite({ features, limits, maintenance: $('s-maint').value.trim() }); GT.toast('Site settings saved'); } catch (e) { GT.toast('Could not save: ' + e.message, 4000); }
    };
    $('s-send').onclick = async () => { const t = $('s-ann').value.trim(); if (!t) return; await GT.admin.broadcast(t, $('s-kind').value); GT.toast('Announcement sent'); siteTab(); };
    if ($('s-clear')) $('s-clear').onclick = async () => { await GT.admin.broadcast('', 'info'); siteTab(); };
  }

  /* ---------------- products: PDF guides ---------------- */
  async function productsTab() {
    const s = await GT.admin.getSite(), cur = (GT.store.get('gt_site', {}) || {}).productDocs || {};
    $('adm-body').innerHTML = `<p class="muted small">Guides shown on each product page with <b>View</b> and <b>Download</b> buttons. Put the PDF in the site's <code>docs</code> folder (then the link is <code>docs/file.pdf</code>)
      or paste any public link (Google Drive “anyone with the link”, your MQL5 blog…).</p>
      ${C.products.map(p => { const list = cur[p.key] || p.docs || []; return `<div class="card pdocs" data-p="${p.key}"><h3>${esc(p.name)}</h3>
        <div class="rows">${list.map(d => row(d)).join('')}</div>
        <button class="btn ghost small" type="button" data-addrow>+ Add a PDF</button></div>`; }).join('')}
      <div class="dr-row"><button class="btn primary" id="p-save" type="button">Save the guides</button><button class="btn ghost" id="p-reset" type="button">Back to the guides in config.js</button></div>`;
    function row(d) { return `<div class="prow"><input placeholder="Title, e.g. User guide (English)" value="${esc(d ? d.title : '')}" data-k="title"><input placeholder="docs/file.pdf or https://…" value="${esc(d ? d.url : '')}" data-k="url"><button type="button" class="x" data-del>×</button></div>`; }
    const wire = () => { document.querySelectorAll('[data-del]').forEach(b => b.onclick = () => b.parentElement.remove()); };
    document.querySelectorAll('[data-addrow]').forEach(b => b.onclick = () => { b.previousElementSibling.insertAdjacentHTML('beforeend', row()); wire(); });
    wire();
    $('p-save').onclick = async () => {
      const out = {};
      for (const c of document.querySelectorAll('.pdocs')) {
        out[c.dataset.p] = [...c.querySelectorAll('.prow')].map(r => ({ title: r.querySelector('[data-k=title]').value.trim(), url: r.querySelector('[data-k=url]').value.trim() }))
          .filter(d => d.title && d.url && (/^https:\/\//.test(d.url) || /^docs\/[\w\-. ]+\.pdf$/i.test(d.url)));
      }
      try { await GT.admin.saveSite({ productDocs: out }); GT.toast('Guides saved'); productsTab(); } catch (e) { GT.toast(e.message); }
    };
    $('p-reset').onclick = async () => { await GT.admin.saveSite({ productDocs: null }); GT.toast('Using the guides from config.js'); productsTab(); };
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
