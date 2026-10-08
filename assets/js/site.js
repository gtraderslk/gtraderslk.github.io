/* ============================================================
   G TRADERS — shared page code: header, footer, accounts, helpers
   Every page loads config.js then this file.
   ============================================================ */
(function () {
  const C = window.GT_CONFIG;

  /* ---------- small helpers ---------- */
  const GT = window.GT = {};
  GT.$ = (sel, root) => (root || document).querySelector(sel);
  GT.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  GT.esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  GT.money = (v, d = 2) => (v < 0 ? '-' : '') + '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  GT.store = {
    get(k, def) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } }
  };
  GT.toast = (msg, ms = 2600) => {
    let t = GT.$('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), ms);
  };
  GT.qs = (k) => new URLSearchParams(location.search).get(k);

  /* ---------- accounts ----------
     One small interface so the storage can change (local test mode now,
     Firebase when GT_CONFIG.firebase is filled in) without touching the pages.
       GT.auth.current()                       -> user or null (sync)
       GT.auth.signup({name,email,password,country,whatsapp})
       GT.auth.login(email,password)            (3 wrong tries = 15 min lock)
       GT.auth.logout() / update(fields) / changePassword(old,new)
       GT.auth.resetPassword(email)             (Firebase: e-mails a reset link)
       GT.auth.track(event[, n])                activity counters per day
       GT.auth.inbox() / markRead(id)           messages from the admin
       GT.admin.*                               control panel (admins only)
  */
  const DAY = 864e5;
  const dkey = d => { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  GT.dkey = dkey;
  async function hash(s) {
    try {
      if (window.crypto && crypto.subtle) {
        const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
        return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) { }
    let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return 'f' + (h >>> 0).toString(16);
  }
  GT.hash = hash;

  // wrong-password lock (per e-mail, in this browser; Firebase adds its own server-side throttling)
  const LOCK_N = C.lockAttempts || 3, LOCK_MIN = C.lockMinutes || 15;
  GT.lock = {
    check(email) { const l = GT.store.get('gt_lock_' + email, null); if (l && l.until > Date.now()) throw new Error(`Too many wrong passwords. Try again in ${Math.ceil((l.until - Date.now()) / 60000)} minute(s) or reset your password.`); },
    fail(email) {
      const l = GT.store.get('gt_lock_' + email, null) || { n: 0, until: 0 };
      if (l.until && l.until < Date.now()) { l.n = 0; l.until = 0; }
      l.n++; let left = LOCK_N - l.n;
      if (left <= 0) { l.until = Date.now() + LOCK_MIN * 60000; l.n = 0; left = 0; }
      GT.store.set('gt_lock_' + email, l); return left;
    },
    ok(email) { GT.store.del('gt_lock_' + email); },
    msg(left) { return left > 0 ? `Wrong e-mail or password. ${left} ${left === 1 ? 'try' : 'tries'} left before a ${LOCK_MIN}-minute lock.` : `Too many wrong passwords — login is locked for ${LOCK_MIN} minutes. You can reset your password.`; }
  };

  // activity counters: stats = { total: {event: n}, days: {'YYYY-MM-DD': {event: n}} }
  GT.bump = (stats, ev, n) => {
    stats = stats || { total: {}, days: {} }; stats.total = stats.total || {}; stats.days = stats.days || {};
    n = n || 1; stats.total[ev] = (stats.total[ev] || 0) + n;
    const k = dkey(); stats.days[k] = stats.days[k] || {}; stats.days[k][ev] = (stats.days[k][ev] || 0) + n;
    const keys = Object.keys(stats.days).sort(); while (keys.length > 120) delete stats.days[keys.shift()];
    return stats;
  };
  // how many times `ev` happened in the last `days` days (today included)
  GT.usage = (u, ev, days) => {
    if (!u || !u.stats || !u.stats.days) return 0;
    let s = 0; for (let i = 0; i < days; i++) { const v = u.stats.days[dkey(new Date(Date.now() - i * DAY))]; if (v && v[ev]) s += v[ev]; }
    return s;
  };
  const cleanUser = u => u ? Object.assign({}, u, { pass: undefined }) : null;
  const checkFields = ({ name, email, password, whatsapp }) => {
    if (!name || !email || !password) throw new Error('Please fill in every field.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('That e-mail address does not look right.');
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Za-z]/.test(password)) throw new Error('Use a password of at least 8 characters with letters and numbers.');
    if (whatsapp && !/^\+?[0-9][0-9 \-]{6,17}$/.test(whatsapp)) throw new Error('Write the WhatsApp number with the country code, e.g. +94 77 123 4567.');
  };
  GT.checkFields = checkFields;
  const EDITABLE = ['name', 'country', 'whatsapp', 'photo'];

  const LocalAuth = {
    mode: 'local',
    _users() { return GT.store.get('gt_users', {}); },
    _save(u) { GT.store.set('gt_users', u); },
    _me() { const em = GT.store.get('gt_session', null); if (!em) return null; const users = this._users(); return users[em] ? { users, u: users[em] } : null; },
    current() { const m = this._me(); return m ? cleanUser(m.u) : null; },
    async signup({ name, email, password, country, whatsapp }) {
      email = String(email || '').trim().toLowerCase(); name = String(name || '').trim().slice(0, 60);
      checkFields({ name, email, password, whatsapp });
      if (!GT.feature('signup')) throw new Error('New sign-ups are paused for a short while. Please try again later.');
      const users = this._users();
      if (users[email]) throw new Error('An account with this e-mail already exists — log in instead.');
      const now = Date.now();
      users[email] = {
        name, email, country: country || '', whatsapp: (whatsapp || '').trim(), photo: '', pass: await hash(email + '|' + password),
        created: now, lastLogin: now, trialEnds: now + GT.site().limits.trialDays * DAY, plan: 'trial', status: 'active', downloads: 0,
        stats: GT.bump(null, 'logins'), inbox: []
      };
      this._save(users); GT.store.set('gt_session', email);
      return this.current();
    },
    async login(email, password) {
      email = String(email || '').trim().toLowerCase();
      GT.lock.check(email);
      const users = this._users(), u = users[email];
      if (!u || u.pass !== await hash(email + '|' + password)) throw new Error(GT.lock.msg(GT.lock.fail(email)));
      if (u.status === 'disabled' || u.status === 'removed') throw new Error('This account has been switched off. Contact ' + C.email + '.');
      GT.lock.ok(email);
      u.lastLogin = Date.now(); u.stats = GT.bump(u.stats, 'logins'); this._save(users);
      GT.store.set('gt_session', email);
      return this.current();
    },
    logout() { GT.store.del('gt_session'); },
    update(fields) {
      const m = this._me(); if (!m) return null;
      Object.keys(fields).forEach(k => { if (EDITABLE.includes(k) || k === 'downloads') m.u[k] = fields[k]; });
      this._save(m.users); return this.current();
    },
    async changePassword(oldPw, newPw) {
      const m = this._me(); if (!m) throw new Error('Log in first.');
      if (m.u.pass !== await hash(m.u.email + '|' + oldPw)) throw new Error('The current password is wrong.');
      checkFields({ name: 'x', email: m.u.email, password: newPw });
      m.u.pass = await hash(m.u.email + '|' + newPw); this._save(m.users);
    },
    async resetPassword(email) {
      // test mode has no mail server: the link e-mail works once Firebase is connected (README)
      return { local: true };
    },
    track(ev, n) { const m = this._me(); if (!m) return; m.u.stats = GT.bump(m.u.stats, ev, n); this._save(m.users); },
    inbox() { const m = this._me(); return m ? (m.u.inbox || []).filter(x => !x.read) : []; },
    markRead(id) { const m = this._me(); if (!m) return; (m.u.inbox || []).forEach(x => { if (x.id === id) x.read = Date.now(); }); this._save(m.users); },
    async deleteAccount(pw) {
      const m = this._me(); if (!m) return;
      if (m.u.pass !== await hash(m.u.email + '|' + pw)) throw new Error('The password is wrong.');
      delete m.users[m.u.email]; this._save(m.users); this.logout();
    }
  };
  // control panel data in test mode: the accounts created in this browser
  const LocalAdmin = {
    mode: 'local',
    async list() { return Object.values(LocalAuth._users()).map(u => Object.assign(cleanUser(u), { id: u.email })); },
    async update(id, f) { const us = LocalAuth._users(); if (!us[id]) return; ['status', 'plan', 'trialEnds', 'note', 'limits', 'features'].forEach(k => { if (k in f) us[id][k] = f[k]; }); LocalAuth._save(us); },
    async message(id, text, kind) { const us = LocalAuth._users(); if (!us[id]) return; (us[id].inbox = us[id].inbox || []).push({ id: Date.now() + '' + Math.random().toString(36).slice(2, 6), text, kind: kind || 'info', created: Date.now(), read: 0 }); LocalAuth._save(us); },
    async broadcast(text, kind) { const st = GT.store.get('gt_site', {}) || {}; st.announcement = text ? { id: Date.now(), text, kind: kind || 'info' } : null; GT.store.set('gt_site', st); },
    async getSite() { return GT.site(); },
    async saveSite(st) { const cur = GT.store.get('gt_site', {}) || {}; GT.store.set('gt_site', Object.assign(cur, st)); },
    async remove(id) { const us = LocalAuth._users(); delete us[id]; LocalAuth._save(us); }
  };
  GT.auth = LocalAuth;   // replaced by the Firebase version in fb.js when it is configured
  GT.admin = LocalAdmin;
  GT.auth.trialLeft = (u) => u ? Math.max(0, Math.ceil((u.trialEnds - Date.now()) / DAY)) : 0;
  GT.auth.active = (u) => !!u && u.status !== 'disabled' && u.status !== 'removed' && (u.plan === 'pro' || GT.auth.trialLeft(u) > 0);
  GT.isAdmin = (u) => !!u && (C.adminEmails || []).map(e => e.toLowerCase()).includes(String(u.email).toLowerCase());
  // Firebase (real accounts on every device): load its scripts before the page scripts run
  const VQ = '?v=' + encodeURIComponent(C.build || '');
  if (C.firebase && C.firebase.apiKey) {
    const v = '10.12.5';
    ['app', 'auth', 'firestore'].forEach(m => document.write(`<script src="https://www.gstatic.com/firebasejs/${v}/firebase-${m}-compat.js"><\/script>`));
    document.write('<script src="assets/js/fb.js' + VQ + '"><\/script>');
  }
  // products, PDF files and Updates posts managed from the control panel
  document.write('<script src="assets/js/content.js' + VQ + '"><\/script>');

  /* ---------- products: config.js + the changes saved in the control panel ---------- */
  const BASE_PRODUCTS = JSON.parse(JSON.stringify(C.products || []));
  const PRODUCT_FIELDS = ['name', 'full', 'type', 'badge', 'price', 'text', 'features', 'img', 'id', 'order', 'hidden', 'deleted', 'mql5Url', 'more'];
  GT.baseProducts = () => JSON.parse(JSON.stringify(BASE_PRODUCTS));
  GT.applyProducts = (ov) => {
    const list = GT.baseProducts();
    (ov || []).forEach(o => {
      if (!o || !o.key) return;
      let p = list.find(x => x.key === o.key);
      if (!p) { p = { key: o.key, features: [], docs: [], page: 'product.html?p=' + o.key, isNew: true }; list.push(p); }
      PRODUCT_FIELDS.forEach(f => { if (o[f] !== undefined && o[f] !== null && o[f] !== '') p[f] = o[f]; });
      if (o.badge === '') p.badge = '';
    });
    const out = list.filter(p => !p.deleted && !p.hidden).map((p, i) => Object.assign(p, { order: p.order != null ? +p.order : i }))
      .sort((a, b) => a.order - b.order);
    out.forEach(p => {
      p.url = p.mql5Url || ('https://www.mql5.com/en/market/product/' + p.id);
      p.reviews = p.url + '#!tab=reviews';
      p.widget = 'https://www.mql5.com/en/market/widget/' + p.id + '/mid?f=1&fw=html';
      if (!p.page) p.page = 'product.html?p=' + p.key;
      p.full = p.full || p.name; p.features = Array.isArray(p.features) ? p.features : [];
    });
    C.products.length = 0; out.forEach(p => C.products.push(p));
    GT.allProducts = list;   // including hidden ones (control panel)
  };
  GT.applyProducts(GT.store.get('gt_products_ov', []));

  /* ---------- header & footer ---------- */
  const NAV = [
    ['index.html', 'Home'], ['products.html', 'Products'],
    ['editor.html', 'EA Bot Studio'], ['charts.html', 'Charts'], ['signals.html', 'Signals'],
    ['demo.html', 'Demo $10k'], ['updates.html', 'Updates'], ['partner.html', 'Deriv']
  ];
  function page() { const p = location.pathname.split('/').pop(); return p || 'index.html'; }

  GT.avatar = (u, size) => {
    size = size || 32;
    if (u && u.photo) return `<img class="av" src="${GT.esc(u.photo)}" alt="" style="width:${size}px;height:${size}px">`;
    const ini = String(u && u.name || '?').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
    return `<span class="av" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .4)}px">${GT.esc(ini)}</span>`;
  };
  function header() {
    const el = document.getElementById('site-header'); if (!el) return;
    const u = GT.auth.current(), cur = page();
    el.outerHTML = `
<header class="site-head"><div class="wrap">
  <a class="brand" href="index.html"><span class="mark"></span><span>G <b>TRADERS</b></span></a>
  <nav class="nav" id="gt-nav">${NAV.map(([h, t]) => `<a href="${h}" class="${h === cur ? 'on' : ''}">${t}</a>`).join('')}</nav>
  <div class="head-right">
    ${u ? `${GT.isAdmin(u) ? '<a class="btn ghost small" href="admin.html" title="Control panel">⚙ Admin</a>' : ''}<a class="me" href="account.html" title="My profile">${GT.avatar(u, 30)}<span>${GT.esc(u.name.split(' ')[0])}</span></a>`
        : `<a class="btn ghost small" href="account.html?tab=login">Log in</a><a class="btn primary small" href="account.html?tab=signup">Sign up free</a>`}
    <button class="menu-btn" aria-label="Menu" onclick="document.getElementById('gt-nav').classList.toggle('open')">☰</button>
  </div>
</div></header>`;
  }

  function footer() {
    const el = document.getElementById('site-footer'); if (!el) return;
    el.outerHTML = `
<footer class="site-foot"><div class="wrap">
  <div class="cols">
    <div><a class="brand" href="index.html"><span class="mark"></span><span>G <b>TRADERS</b></span></a>
      <p class="muted small" style="margin-top:12px">${GT.esc(C.tagline)}</p>
      <p class="small"><a href="mailto:${C.email}">${C.email}</a></p></div>
    <div><h4>Products</h4><a href="studio.html">EA Bot Studio</a><a href="products.html">All MT5 products</a>
      <a href="${C.mql5Seller}" target="_blank" rel="noopener">MQL5 seller page</a><a href="${C.studioGuide}" target="_blank" rel="noopener">Studio user guide</a></div>
    <div><h4>Tools</h4><a href="editor.html">EA Bot Studio (web)</a><a href="charts.html">Live charts</a><a href="signals.html">Free signals</a><a href="demo.html">$10k demo</a></div>
    <div><h4>Account</h4><a href="account.html?tab=signup">Create account</a><a href="account.html?tab=login">Log in</a>
      <a href="partner.html">Open a Deriv account</a><a href="legal.html">Risk &amp; terms</a></div>
  </div>
  <div class="risk"><b class="gold">⚠ Risk warning.</b> Trading forex, CFDs and synthetic indices on leverage carries a high risk of loss and is not suitable for everyone.
    You could lose all of your money. G TRADERS sells trading software and education only — we are not a broker, we do not hold client funds,
    and nothing here is financial advice. Demo and test results are simulated and do not guarantee future results. <a href="legal.html">Read the full risk disclosure</a>.</div>
  <div class="bottom"><span>© ${C.year} ${C.siteName}. All rights reserved.</span>
    <span>Deriv links are partner links — we may earn a commission at no extra cost to you. · build ${C.build}</span></div>
</div></footer>`;
  }

  /* ---------- motion: reveal on scroll ---------- */
  function reveal() {
    const els = GT.$$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- animated candles behind a hero ---------- */
  GT.heroCanvas = function (cv) {
    const ctx = cv.getContext('2d'); let W, H, cs = [], t = 0;
    const fit = () => { W = cv.width = cv.clientWidth * devicePixelRatio; H = cv.height = cv.clientHeight * devicePixelRatio; };
    fit(); addEventListener('resize', fit);
    let p = 0.5; const step = 14 * devicePixelRatio;
    const add = () => { const o = p; p = Math.min(.85, Math.max(.15, p + (Math.random() - .47) * .05)); cs.push({ o, c: p, h: Math.max(o, p) + Math.random() * .02, l: Math.min(o, p) - Math.random() * .02 }); };
    for (let i = 0; i < 200; i++) add();
    let off = 0, last = performance.now();
    function frame(now) {
      const dt = Math.min(50, now - last); last = now; off += dt * 0.02 * devicePixelRatio;
      if (off >= step) { off -= step; cs.shift(); add(); }
      ctx.clearRect(0, 0, W, H);
      const n = Math.ceil(W / step) + 2, start = Math.max(0, cs.length - n);
      const y = v => H * (1 - v);
      ctx.lineWidth = 2 * devicePixelRatio; ctx.strokeStyle = 'rgba(240,200,105,.55)'; ctx.beginPath();
      for (let i = start; i < cs.length; i++) {
        const x = (i - start) * step - off, k = cs[i], up = k.c >= k.o;
        ctx.fillStyle = up ? 'rgba(34,197,94,.55)' : 'rgba(244,63,94,.5)';
        ctx.fillRect(x + step * .3, y(k.h), 1 * devicePixelRatio, y(k.l) - y(k.h));
        ctx.fillRect(x + step * .1, y(Math.max(k.o, k.c)), step * .45, Math.max(1, Math.abs(y(k.o) - y(k.c))));
        const m = cs.slice(Math.max(0, i - 12), i + 1).reduce((a, b) => a + b.c, 0) / Math.min(13, i + 1);
        i === start ? ctx.moveTo(x, y(m)) : ctx.lineTo(x, y(m));
      }
      ctx.stroke();
      if (!document.hidden) requestAnimationFrame(frame); else setTimeout(() => requestAnimationFrame(frame), 500);
    }
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(frame);
  };

  document.addEventListener('DOMContentLoaded', () => {
    header(); footer(); reveal();
    GT.$$('canvas[data-hero]').forEach(GT.heroCanvas);
    if (!GT.$('link[rel=icon][sizes]')) { const l = document.createElement('link'); l.rel = 'icon'; l.sizes = '32x32'; l.href = 'favicon-32.png'; document.head.appendChild(l); }
    afterLoad();
  });

  /* ---------- demo accounts (several per user, each with its own journal) ----------
     stored as gt_demos_<email> = { active: id, list: { id: { name, created, balance, positions, history, deposits } } } */
  GT.demos = {
    key: u => 'gt_demos_' + u.email,
    all(u) {
      let d = GT.store.get(this.key(u), null);
      if (!d || !d.list || !Object.keys(d.list).length) {
        const old = GT.store.get('gt_demo_' + u.email, null), id = 'a' + Date.now().toString(36), start = C.demoStartBalance;
        d = { active: id, list: {} };
        d.list[id] = Object.assign({ name: 'Main account', created: Date.now(), balance: start, positions: [], history: [], deposits: [{ time: Date.now(), amount: start }] }, old || {});
        GT.store.set(this.key(u), d);
      }
      if (!d.list[d.active]) d.active = Object.keys(d.list)[0];
      return d;
    },
    active(u) { const d = this.all(u); return { id: d.active, acc: d.list[d.active] }; },
    save(u, id, acc) { const d = this.all(u); if (!d.list[id]) return; d.list[id] = acc; GT.store.set(this.key(u), d); },
    create(u, name, deposit) {
      const d = this.all(u), id = 'a' + Date.now().toString(36);
      d.list[id] = { name: String(name || 'Demo account').slice(0, 30), created: Date.now(), balance: deposit, positions: [], history: [], deposits: [{ time: Date.now(), amount: deposit }] };
      d.active = id; GT.store.set(this.key(u), d); return id;
    },
    remove(u, id) { const d = this.all(u); delete d.list[id]; if (d.active === id) d.active = Object.keys(d.list)[0]; GT.store.set(this.key(u), d); return this.all(u); },
    setActive(u, id) { const d = this.all(u); if (d.list[id]) { d.active = id; GT.store.set(this.key(u), d); } },
    rename(u, id, name) { const d = this.all(u); if (d.list[id]) { d.list[id].name = String(name).slice(0, 30); GT.store.set(this.key(u), d); } }
  };

  /* ---------- site settings (changed from the control panel) ----------
     GT.site()            -> features on / off, limits, maintenance message, announcement
     GT.limit(user, key)  -> the user's own limit if the admin set one, else the site limit
     GT.feature(key, u)   -> false when the admin switched it off for everyone or for this user */
  const DEF_SITE = {
    features: { signals: true, scanner: true, charts: true, demo: true, journal: true, editor: true, downloads: true, signup: true },
    limits: { dlDay: C.dlDay || 1, dlWeek: C.dlWeek || 7, dlMonth: C.dlMonth || 30, trialDays: C.trialDays || 30, demoAccounts: 5, demoMaxDeposit: 1000000, bots: 0 },
    maintenance: '', maintStyle: 'gold', announcement: null, engines: {}
  };
  GT.FEATURES = { signals: 'Signal engine', scanner: 'Signal scanner', charts: 'TradingView charts', demo: '$10k demo', journal: 'Demo journal', editor: 'EA Bot Studio (web)', downloads: 'Bot downloads', signup: 'New sign-ups' };
  GT.LIMITS = { dlDay: 'Downloads per day', dlWeek: 'Downloads per week', dlMonth: 'Downloads per month', trialDays: 'Free trial days (new accounts)', demoAccounts: 'Demo accounts per user', demoMaxDeposit: 'Largest demo deposit ($)', bots: 'Saved bots (0 = no limit)' };
  GT.site = () => {
    const s = GT.store.get('gt_site', {}) || {};
    return { features: Object.assign({}, DEF_SITE.features, s.features), limits: Object.assign({}, DEF_SITE.limits, s.limits), maintenance: s.maintenance || '',
      maintStyle: s.maintStyle || 'gold', announcement: s.announcement || null, engines: s.engines || {} };
  };
  // PDF guides of a product: the control panel's list replaces the one in config.js
  GT.docs = p => { const o = (GT.store.get('gt_site', {}) || {}).productDocs; return (o && o[p.key]) ? o[p.key] : (p.docs || []); };
  GT.docsHtml = p => {
    const d = GT.docs(p).filter(x => x && (x.url || x.file)); if (!d.length) return '';
    return `<div class="docs">${d.map(x => `<div class="doc"><span class="pdf">PDF</span><b>${GT.esc(x.title)}</b>${x.file
      ? `<button class="btn ghost small" type="button" onclick="GT.content.openFile('${GT.esc(x.file)}',false,this)">View</button><button class="btn ghost small" type="button" onclick="GT.content.openFile('${GT.esc(x.file)}',true,this)">Download</button>`
      : `<a class="btn ghost small" href="${GT.esc(x.url)}" target="_blank" rel="noopener">View</a><a class="btn ghost small" href="${GT.esc(x.url)}" download>Download</a>`}</div>`).join('')}</div>`;
  };
  GT.limit = (u, k) => (u && u.limits && u.limits[k] != null && u.limits[k] !== '') ? +u.limits[k] : +GT.site().limits[k];
  GT.feature = (k, u) => { const me = GT.auth.current(); if (me && GT.isAdmin(me)) return true; return GT.site().features[k] !== false && !(u && u.features && u.features[k] === false); };

  /* ---------- popups: admin messages, announcements, switched-off accounts ---------- */
  GT.modal = (title, html, kind, onOk) => {
    const m = document.createElement('div'); m.className = 'gt-modal';
    m.innerHTML = `<div class="box ${kind || 'info'}"><div class="ico">${kind === 'warning' ? '⚠️' : kind === 'danger' ? '⛔' : '📣'}</div><h3>${GT.esc(title)}</h3><div class="txt">${html}</div><button class="btn primary" type="button">OK</button></div>`;
    document.body.appendChild(m);
    m.querySelector('button').onclick = () => { m.remove(); onOk && onOk(); };
  };
  function afterLoad() {
    const s = GT.site(), u = GT.auth.current();
    if (s.maintenance && !(u && GT.isAdmin(u)) && !document.querySelector('.gt-maint')) {
      const b = document.createElement('div'); b.className = 'gt-maint ' + (['gold', 'teal', 'red'].includes(s.maintStyle) ? s.maintStyle : 'gold');
      b.innerHTML = `<div class="wrap"><span class="mi">${s.maintStyle === 'red' ? '⚠' : s.maintStyle === 'teal' ? 'ℹ' : '🛠'}</span><span class="mt">${GT.esc(s.maintenance)}</span><button type="button" class="mx" aria-label="Hide">×</button></div>`;
      b.querySelector('.mx').onclick = () => b.remove();
      document.body.prepend(b);
    }
    if (!u) return;
    if (u.status === 'disabled' || u.status === 'removed') {
      GT.auth.logout();
      GT.modal('Account switched off', 'Your G TRADERS account has been switched off. Contact <a href="mailto:' + C.email + '">' + C.email + '</a> if you think this is a mistake.', 'danger', () => location.href = 'index.html');
      return;
    }
    // one visit per day for the activity log
    const vk = 'gt_visit_' + u.email; if (GT.store.get(vk, '') !== dkey()) { GT.store.set(vk, dkey()); GT.auth.track('visits'); }
    const queue = [];
    const ann = s.announcement; if (ann && ann.text && GT.store.get('gt_ann_seen', 0) !== ann.id) queue.push({ title: 'G TRADERS', text: ann.text, kind: ann.kind, done: () => GT.store.set('gt_ann_seen', ann.id) });
    (GT.auth.inbox() || []).forEach(x => queue.push({ title: x.kind === 'warning' ? 'Warning from G TRADERS' : 'Message from G TRADERS', text: x.text, kind: x.kind, done: () => GT.auth.markRead(x.id) }));
    const next = () => { const q = queue.shift(); if (q) GT.modal(q.title, GT.esc(q.text).replace(/\n/g, '<br>'), q.kind, () => { q.done(); next(); }); };
    next();
  }
  GT.afterLoad = afterLoad;

  /* ---------- members gate ----------
     GT.gate(el, what, feature) shows a "free for members" card when nobody is logged in,
     and a notice when the feature is switched off. Returns true when the page may run. */
  GT.gate = function (host, what, feature) {
    const u = GT.auth.current();
    if (feature && !GT.feature(feature, u)) {
      host.innerHTML = `<div class="gate"><div class="lock">🛠</div><h2 style="font-size:24px">${what} is paused</h2>
        <p class="muted">${GT.site().features[feature] === false ? 'It is switched off for a short while. Please check back soon.' : 'It is not available on your account. Contact ' + C.email + ' for help.'}</p>
        <div class="row"><a class="btn ghost" href="index.html">Home</a></div></div>`;
      return false;
    }
    if (u && GT.auth.active(u)) return true;
    const next = encodeURIComponent(location.pathname.split('/').pop() + location.search);
    host.innerHTML = u ? `<div class="gate"><div class="lock">⏳</div><h2 style="font-size:24px">Your free trial has ended</h2>
        <p class="muted">${what} is part of the free trial. Keep building inside MetaTrader 5 with GTM EA Bot Studio.</p>
        <div class="row"><a class="btn primary" href="studio.html">See EA Bot Studio</a><a class="btn ghost" href="account.html">My account</a></div></div>`
      : `<div class="gate"><div class="lock">🔒</div><h2 style="font-size:24px">${what} is for members</h2>
        <p class="muted">Create a free G TRADERS account and it unlocks straight away.</p>
        <div class="free"><b>Free for members</b><div class="small muted">${GT.site().limits.trialDays}-day free trial — no payment, no card needed.</div></div>
        <div class="row"><a class="btn primary" href="account.html?tab=signup&next=${next}">Create free account</a><a class="btn ghost" href="account.html?tab=login&next=${next}">Log in</a></div></div>`;
    return false;
  };
})();
