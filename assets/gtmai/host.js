/* ============================================================
   GTM AI web simulator - starts the EA in the page.
   new GTMAISim(hostElement, {base:'assets/gtmai/', v:'1'})
   ============================================================ */
(function () {
'use strict';
const RT = window.GTMRT;
const CHATED_KEYS = ['JARVIS_FIND', 'JARVIS_CHAT'];

class Sound {
  constructor(base) { this.base = base; this.ctx = null; this.buf = new Map(); this.cur = null; this.on = true; this.loading = new Map(); }
  unlock() {
    if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }
  idOf(f) { const m = f.match(/v(\d{3})\.wav$/i); return m && /^::/.test(f) ? +m[1] : -1; }
  load(id) {
    if (this.buf.has(id) || this.loading.has(id) || !this.ctx) return;
    const p = fetch(this.base + 'voice/v' + String(id).padStart(3, '0') + '.mp3').then(r => r.arrayBuffer()).then(a => this.ctx.decodeAudioData(a)).then(b => { this.buf.set(id, b); }).catch(() => { }).finally(() => this.loading.delete(id));
    this.loading.set(id, p);
  }
  preload(from, to) { for (let i = from; i <= to; i++) this.load(i); }
  stop() { if (this.cur) { try { this.cur.stop(); } catch (e) { } this.cur = null; } }
  start(b) {
    this.stop(); if (!this.on || !this.ctx) return;
    const s = this.ctx.createBufferSource(); s.buffer = b; s.connect(this.ctx.destination); s.start(); this.cur = s;
  }
  play(f) {
    if (!this.on || !this.ctx) return false;
    const id = this.idOf(f);
    if (id >= 0) { const b = this.buf.get(id); if (!b) { this.load(id); return false; } this.start(b); return true; }
    // a voice file the AI made (kept in the browser files)
    const name = f.replace(/^.*?MQL5\\Files\\/i, '');
    const fe = RT.FS.get(name.toLowerCase());
    if (!fe) return false;
    const key = 'f:' + name;
    if (this.buf.has(key)) { this.start(this.buf.get(key)); return true; }
    this.ctx.decodeAudioData(fe.data.slice().buffer).then(b => { this.buf.set(key, b); this.start(b); }).catch(() => { });
    return true;
  }
}

class GTMAISim {
  constructor(host, opt) {
    this.host = host; this.opt = Object.assign({ base: 'assets/gtmai/', v: '1' }, opt || {});
    this.EA = null; this.busy = false; this.timer = null; this.started = false; this.errors = [];
    host.classList.add('gtm-sim');
    host.innerHTML = '<div class="gtm-stage"><canvas class="gtm-cv"></canvas><div class="gtm-inputs"></div></div><div class="gtm-cover"><button type="button" class="gtm-go">▶ Start GTM AI <small>live prices · simulator · sound on</small></button><p class="gtm-load">Loading live prices…</p></div>';
    this.stage = host.querySelector('.gtm-stage'); this.cv = host.querySelector('.gtm-cv'); this.inputs = host.querySelector('.gtm-inputs');
    this.cover = host.querySelector('.gtm-cover'); this.loadTx = host.querySelector('.gtm-load');
    this.ctx = this.cv.getContext('2d');
    this.sound = new Sound(this.opt.base);
    RT.sound = { play: f => this.sound.play(f), stop: () => this.sound.stop() };
    RT.view = { resize: (w, h) => this.resizeCanvas(w, h), show: (px, w, h) => this.show(px, w, h) };
    RT.onAlert = s => this.toast(s);
    RT.onObj = (name, what, p) => this.syncObj(name, what, p);
    this.size();
    host.querySelector('.gtm-go').onclick = () => this.start();
    this.prepare();
  }
  /* logical size of the chart: wide screens get the real size, small screens are scaled down */
  size() {
    const fs = document.fullscreenElement === this.host;
    const r = this.host.getBoundingClientRect();
    const cw = Math.max(320, Math.round(fs ? window.innerWidth : r.width));
    let W, H;
    if (fs) { W = Math.max(1100, cw); H = Math.max(620, Math.round(window.innerHeight * W / cw)); }
    else { W = Math.max(1180, Math.min(1920, cw)); H = Math.round(W * 0.58); }
    this.scale = cw / W;
    RT.W = W; RT.H = H;
    this.stage.style.width = W + 'px'; this.stage.style.height = H + 'px';
    this.stage.style.transform = 'scale(' + this.scale + ')'; this.stage.style.transformOrigin = '0 0';
    this.host.style.height = Math.round(H * this.scale) + 'px';
  }
  resizeCanvas(w, h) { this.cv.width = w; this.cv.height = h; this.img = this.ctx.createImageData(w, h); this.u32 = new Uint32Array(this.img.data.buffer); }
  show(px, w, h) {
    if (!this.img || this.img.width !== w || this.img.height !== h) this.resizeCanvas(w, h);
    const o = this.u32, n = px.length;
    for (let i = 0; i < n; i++) { const c = px[i]; o[i] = 0xFF000000 | ((c & 255) << 16) | (c & 0xFF00) | ((c >>> 16) & 255); }
    this.ctx.putImageData(this.img, 0, 0);
  }
  async prepare() {
    RT.fsLoad();
    this.bnWait = window.GTMBinance ? window.GTMBinance.auto().catch(() => false) : null;   // reconnects Binance while the prices load
    try { await RT.market.init(); } catch (e) { }
    this.loadTx.textContent = RT.market.list.length ? 'Live prices ready - ' + RT.market.list.length + ' markets' : 'Live prices are not reachable right now - the panel still opens.';
    let auto = false; try { auto = sessionStorage.getItem('gtmai_autostart') === '1'; sessionStorage.removeItem('gtmai_autostart'); } catch (e) { }
    if (auto) this.start();                                // came back after connecting Binance
  }
  defaultsFor() {
    const want = ['XAUUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 'Volatility 75 Index', 'Volatility 25 (1s) Index', 'Volatility 100 Index', 'BTCUSD', 'ETHUSD'];
    return want.filter(n => RT.market.byName.has(n)).join(',') || want.join(',');
  }
  async start() {
    if (this.started) return; this.started = true;
    this.sound.unlock();
    if (this.bnWait) { this.loadTx.textContent = 'Connecting to Binance...'; await this.bnWait; }
    this.sound.unlock(); this.sound.preload(0, 142);
    this.cover.style.display = 'none';
    const self = this;
    // the timer runs in a small worker: a hidden tab still checks entries and moves stops (page timers get slowed down there)
    let tw = null;
    try { tw = new Worker(URL.createObjectURL(new Blob(['let t=0;onmessage=e=>{clearInterval(t);if(e.data>0)t=setInterval(()=>postMessage(0),e.data)}'], { type: 'text/javascript' }))); tw.onmessage = () => self.tick(); } catch (e) { tw = null; }
    RT.onTimerSet = ms => { if (tw) { tw.postMessage(ms || 0); return; } clearInterval(self.timer); self.timer = ms ? setInterval(() => self.tick(), ms) : null; };
    const BK = RT.broker && RT.broker.ready ? RT.broker : null, live = !!BK;
    if (BK) RT.market.addFutures(BK.info);
    window.addEventListener('beforeunload', e => { if (RT.broker && RT.broker.ready && !RT.broker.watch && RT.broker.ownOpen() > 0) { e.preventDefault(); e.returnValue = ''; } });
    this.EA = GTMAI_EA({ InpSymbols: this.defaultsFor(), InpAllowLive: live, InpSimBalance: 1000, InpFrameMs: 60, InpFont: 'Bahnschrift', InpAIName: 'GTM AI' });
    try { this.EA.OnInit(); } catch (e) { this.fail(e); }
    if (BK) this.binanceStart(BK);
    this.bindMouse();
    window.addEventListener('resize', () => this.onResize());
    document.addEventListener('fullscreenchange', () => setTimeout(() => this.onResize(), 50));
    this.startBridge();
  }
  /* ---------- Binance: show the account's positions and history on the panel ---------- */
  eaLog(msg, col) { try { this.EA.call('Log', [msg, this.EA.get(col || 'CL_CY')]); } catch (e) { } }
  addSym(name) {
    const EA = this.EA; if (!EA) return;
    try {
      if (EA.call('FindSym', [name]) >= 0) return;
      if (!EA.call('AddSymbol', [name])) return;
      const i = EA.call('FindSym', [name]);
      let done = []; try { done = JSON.parse(localStorage.getItem('gtmai_bn_added') || '[]'); } catch (e) { }
      if (i >= 0 && done.indexOf(name) < 0) {          // added for a Binance position: its own entries stay OFF
        EA.get('gSet[' + i + '].on=false'); EA.call('SaveAll');
        done.push(name); try { localStorage.setItem('gtmai_bn_added', JSON.stringify(done.slice(-60))); } catch (e) { }
      }
      this.eaLog(name + ' added for your Binance position (its own entries are OFF)');
    } catch (e) { this.fail(e); }
  }
  binanceStart(BK) {
    const EA = this.EA;
    BK.live_().forEach(e => this.addSym(e.name));
    RT.onBrokerSymbol = name => this.addSym(name);
    if (BK.watch) {
      try { EA.call('GoLive'); EA.get('gRun=false'); } catch (e) { this.fail(e); }
      this.eaLog('WATCH ONLY: your Binance trades show here. Agents are paused; the panel sends no orders.', 'CL_AU');
    } else this.eaLog('Binance connected: switch SIMULATOR -> LIVE to trade on ' + BK.name, 'CL_AU');
    const apply = list => { if (!Array.isArray(list)) return; try { this.applyHistory(BK, list); } catch (e) { this.fail(e); } };
    if (BK.hist) apply(BK.hist); else if (BK.histP) BK.histP.then(apply);
  }
  /* closed Binance trades -> the journal (Data Analyzer, calendar, profit curve) and the HISTORY tab (replay) */
  applyHistory(BK, list) {
    const EA = this.EA, JR = 'GTM_AI\\journal.csv';
    const f = RT.FS.get(JR.toLowerCase());
    const keep = f ? new TextDecoder().decode(f.data).split('\n').filter(l => /^S;/.test(l)) : [];
    const rows = list.map(t => ['L', t.name, t.dir, t.qty.toFixed(5), t.entry.toFixed(8), t.exit.toFixed(8), t.t0, t.t1, t.pl.toFixed(2), t.tag].join(';'));
    RT.fsPut(JR, new TextEncoder().encode(keep.concat(rows).join('\n') + (keep.length + rows.length ? '\n' : '')), true);
    EA.call('JLoad');
    let n = 0;
    list.slice(-60).forEach(t => {
      const si = EA.call('FindSym', [t.name]); if (si < 0) return;
      const j = EA.get('new JTrade()');
      Object.assign(j, { open: false, live: true, ticket: 0, si, dir: t.dir, tf: EA.get('gSet[' + si + '].tf'), lot: t.qty, entry: t.entry, sl: 0, tp: 0, sl0: 0,
        t0: t.t0, t1: t.t1, exitP: t.exit, pl: t.pl, win: t.tag !== 'BE' && t.pl > 0.005, id: EA.get('gNextId++') });
      if (EA.call('AddTrade', [j]) >= 0) n++;
    });
    this.eaLog('Binance history: ' + list.length + ' closed trade(s) in the journal / Data Analyzer' + (n ? ', ' + n + ' on HISTORY' : ''));
  }
  tick() {
    const t = performance.now(); if (t - (this._lt || 0) < (RT.timerMs || 60) * 0.6) return;   // never catch up a backlog
    if (this.busy) return; this.busy = true; this._lt = t;
    try { this.EA.OnTimer(); } catch (e) { this.fail(e); }
    if (RT.broker) RT.broker.pump();
    this.busy = false;
  }
  fail(e) {
    const m = String(e && e.stack || e);
    if (this.errors.length < 20) { this.errors.push(m); console.error('GTM AI:', e); }
    if (window.GTMAI_TEST) window.GTMAI_TEST.push(m);
  }
  ev(id, l, d, s) { if (!this.EA) return; try { this.EA.OnChartEvent(id, l, d, s); } catch (e) { this.fail(e); } }
  pos(e) { const r = this.cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) / this.scale), Math.round((e.clientY - r.top) / this.scale)]; }
  bindMouse() {
    const c = this.cv; let down = false;
    c.addEventListener('pointermove', e => { const [x, y] = this.pos(e); this.ev(CHARTEVENT_MOUSE_MOVE, x, y, down ? '1' : '0'); });
    c.addEventListener('pointerdown', e => {
      RT.userAt = Date.now();
      const ae = document.activeElement; if (ae && ae.classList && ae.classList.contains('gtm-edit')) ae.blur();   // like MT5: the edit box ends first
      this.sound.unlock(); c.setPointerCapture(e.pointerId); down = true;
      const [x, y] = this.pos(e); this.ev(CHARTEVENT_MOUSE_MOVE, x, y, '1'); this.ev(CHARTEVENT_CLICK, x, y, '');
    });
    const up = e => { if (!down) return; down = false; RT.userAt = Date.now(); const [x, y] = this.pos(e); this.ev(CHARTEVENT_MOUSE_MOVE, x, y, '0'); };
    c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    c.addEventListener('pointerleave', e => { if (!down) this.ev(CHARTEVENT_MOUSE_MOVE, -1, -1, '0'); });
    c.addEventListener('wheel', e => { const [x, y] = this.pos(e); e.preventDefault(); this.ev(CHARTEVENT_MOUSE_WHEEL, (x & 0xFFFF) | ((y & 0xFFFF) << 16), -e.deltaY, ''); }, { passive: false });
    c.addEventListener('contextmenu', e => e.preventDefault());
  }
  onResize() { this.size(); this.ev(CHARTEVENT_CHART_CHANGE, 0, 0, ''); this.placeObjs(); }
  fullscreen() { if (document.fullscreenElement) document.exitFullscreen(); else this.host.requestFullscreen && this.host.requestFullscreen(); }
  /* edit boxes of the EA (chat input, symbol search) become real inputs */
  syncObj(name, what, p) {
    let el = this.inputs.querySelector('[data-o="' + name + '"]');
    if (what === 'delete') { if (el) el.remove(); return; }
    const o = RT.objs.get(name); if (!o || o.type !== OBJ_EDIT) return;
    if (!el) {
      el = document.createElement('input'); el.type = 'text'; el.dataset.o = name; el.className = 'gtm-edit'; el.autocomplete = 'off'; el.spellcheck = false;
      el.addEventListener('keydown', e => { e.stopPropagation(); RT.userAt = Date.now(); if (e.key === 'Enter') { o.s[OBJPROP_TEXT] = el.value; this.ev(CHARTEVENT_OBJECT_ENDEDIT, 0, 0, name); el._sent = el.value; } });
      el.addEventListener('input', () => { o.s[OBJPROP_TEXT] = el.value; });
      el.addEventListener('blur', () => { if (el.value === (el._sent || '')) return; o.s[OBJPROP_TEXT] = el.value; el._sent = el.value; this.ev(CHARTEVENT_OBJECT_ENDEDIT, 0, 0, name); el._sent = el.value; });
      this.inputs.appendChild(el);
    }
    if (p === OBJPROP_TEXT) el.value = o.s[OBJPROP_TEXT] || '';
    if (what === 'create') el.value = o.s[OBJPROP_TEXT] || '';
    this.placeObj(el, o);
  }
  placeObj(el, o) {
    const i = o.i;
    el.style.left = (i[OBJPROP_XDISTANCE] || 0) + 'px'; el.style.top = (i[OBJPROP_YDISTANCE] || 0) + 'px';
    el.style.width = (i[OBJPROP_XSIZE] || 120) + 'px'; el.style.height = (i[OBJPROP_YSIZE] || 22) + 'px';
    el.style.fontSize = Math.round((i[OBJPROP_FONTSIZE] || 10) * 96 / 72) + 'px';
    const col = v => { v = v >>> 0; return 'rgb(' + (v & 255) + ',' + ((v >> 8) & 255) + ',' + ((v >> 16) & 255) + ')'; };
    if (i[OBJPROP_BGCOLOR] !== undefined) el.style.background = col(i[OBJPROP_BGCOLOR]);
    if (i[OBJPROP_COLOR] !== undefined) el.style.color = col(i[OBJPROP_COLOR]);
    if (i[OBJPROP_BORDER_COLOR] !== undefined) el.style.borderColor = col(i[OBJPROP_BORDER_COLOR]);
  }
  placeObjs() { this.inputs.querySelectorAll('.gtm-edit').forEach(el => { const o = RT.objs.get(el.dataset.o); if (o) this.placeObj(el, o); }); }
  toast(s) {
    let t = this.host.querySelector('.gtm-toast'); if (!t) { t = document.createElement('div'); t.className = 'gtm-toast'; this.host.appendChild(t); }
    t.textContent = s; t.classList.add('on'); clearTimeout(this._tt); this._tt = setTimeout(() => t.classList.remove('on'), 6000);
  }
  /* the BRIDGE (AI) in a worker, files are mirrored both ways */
  startBridge() {
    const W = this.worker = new Worker(this.opt.base + 'bridge-worker.js?v=' + this.opt.v);
    const TO_BRIDGE = /\\bridge\\(p2b_[^\\]*\.json|state\.json)$/i;
    RT.onFileWrite = (name, data) => { if (TO_BRIDGE.test(name)) W.postMessage({ t: 'fs', name, data }); };
    RT.onFileDelete = name => { if (/\\bridge\\b2p_/i.test(name)) W.postMessage({ t: 'del', name }); };
    W.onmessage = ev => {
      const m = ev.data;
      if (m.t === 'fs') { RT.fsPut(m.name, m.data, true); if (/b2p_/.test(m.name)) this.maybeSpeak(m.data); }
      else if (m.t === 'del') RT.fsDel(m.name, true);
      else if (m.t === 'error') this.fail(m.msg);
      else if (m.t === 'neterr') this.toast('AI service not reachable from the browser: ' + m.msg);
      else if (m.t === 'comment') this.bridgeText = m.text;
    };
    this.setAi(this.aiKey());
  }
  aiKey() { try { return localStorage.getItem('gtmai_key') || ''; } catch (e) { return ''; } }
  setAi(key) {
    key = String(key || '').trim();
    try { if (key) localStorage.setItem('gtmai_key', key); else localStorage.removeItem('gtmai_key'); } catch (e) { }
    this.demo = !key;
    if (this.worker) this.worker.postMessage({ t: 'start', cfg: { demo: this.demo, key } });
    this.host.dispatchEvent(new CustomEvent('gtm-ai', { detail: { demo: this.demo } }));
  }
  /* the demo AI's answers are read out by the browser voice */
  maybeSpeak(data) {
    if (!this.demo || !this.sound.on || !window.speechSynthesis) return;
    try {
      const m = JSON.parse(new TextDecoder().decode(data)); if (m.kind !== 'ai' || m.source !== 'panel') return;
      const j = JSON.parse(m.json); const t = j.reply_en || j.reply; if (!t) return;
      setTimeout(() => {
        const u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = 1.02; u.pitch = 0.85;
        const vs = speechSynthesis.getVoices(); const male = vs.find(v => /en/i.test(v.lang) && /male|daniel|george|david|guy|ryan|arthur/i.test(v.name) && !/female/i.test(v.name));
        if (male) u.voice = male;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
      }, 900);
    } catch (e) { }
  }
  setSound(on) { this.sound.on = !!on; if (!on) { this.sound.stop(); window.speechSynthesis && speechSynthesis.cancel(); } else this.sound.unlock(); }
  reset() {
    if (!confirm('Start the simulator again? Your simulator trades, journal and settings in this browser are removed.')) return;
    try { Object.keys(localStorage).filter(k => k.startsWith('gtmai_fs_')).forEach(k => localStorage.removeItem(k)); } catch (e) { }
    location.reload();
  }
}
window.GTMAISim = GTMAISim;
})();
