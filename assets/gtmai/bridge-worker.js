/* ============================================================
   GTM AI web - the BRIDGE (2nd chart in MT5) running in a Web Worker.
   Same EA code with Role = BRIDGE. It talks to the panel through files.
   Demo AI (no key) answers here too; with your own key it calls the AI
   service from your browser (the key stays in your browser).
   ============================================================ */
const V = (self.location.search.match(/v=([\w.]+)/) || [])[1] || '1';
importScripts('rt.js?v=' + V, 'canvas.js?v=' + V, 'demo-ai.js?v=' + V, 'ea.js?v=' + V);
const RT = self.GTMRT;
let EA = null, timer = null, cfg = null;

/* files: what the panel writes for the bridge arrives here, what the bridge writes goes back */
const TO_PANEL = /\\bridge\\(b2p_[^\\]*\.json|bridge\.json|tg_owner\.txt)$|\\voice\\[^\\]+\.wav$|\\voice\\today\.txt$/i;
RT.onFileWrite = (name, data) => {
  if (!TO_PANEL.test(name)) return;
  if (cfg && cfg.demo && /bridge\.json$/i.test(name)) {      // show "Demo AI" on the panel
    try { const j = JSON.parse(new TextDecoder().decode(data)); j.prov = 'Demo AI'; j.model = 'no key needed'; j.tts = false; data = new TextEncoder().encode(JSON.stringify(j)); } catch (e) { }
  }
  postMessage({ t: 'fs', name, data });
};
RT.onFileDelete = name => { if (/\\bridge\\p2b_/i.test(name)) postMessage({ t: 'del', name }); };
RT.onComment = s => postMessage({ t: 'comment', text: s });

/* WebRequest: demo brain or the real AI service (synchronous here: the worker is the 2nd chart) */
RT.webRequest = (method, url, headers, timeout, data, result) => {
  const body = data && data.length ? new TextDecoder().decode(Uint8Array.from(data.map(x => x & 255))) : '';
  if (cfg.demo) {
    const r = self.DemoAI.handle(method, url, body);
    const u = new TextEncoder().encode(r.body); result.length = 0; for (let i = 0; i < u.length; i++) result.push(u[i]);
    return r.code;
  }
  try {
    const x = new XMLHttpRequest();
    x.open(method, url, false);
    x.responseType = 'arraybuffer';
    String(headers || '').split(/\r?\n/).forEach(h => { const i = h.indexOf(':'); if (i > 0) { const k = h.slice(0, i).trim(), v = h.slice(i + 1).trim(); if (k && !/^(content-length|host)$/i.test(k)) x.setRequestHeader(k, v); } });
    if (/api\.anthropic\.com/.test(url)) x.setRequestHeader('anthropic-dangerous-direct-browser-access', 'true');
    x.send(method === 'GET' ? null : Uint8Array.from(data.slice(0, data.length)));
    const u = new Uint8Array(x.response || new ArrayBuffer(0));
    result.length = 0; for (let i = 0; i < u.length; i++) result.push(u[i]);
    return x.status || 0;
  } catch (e) {
    postMessage({ t: 'neterr', url: url.replace(/key=[^&]+/, 'key=***'), msg: String(e && e.message || e) });
    return -1;   // EA reads it as "service not reachable"
  }
};

onmessage = ev => {
  const m = ev.data;
  if (m.t === 'fs') { RT.fsPut(m.name, m.data, true); return; }
  if (m.t === 'del') { RT.fsDel(m.name, true); return; }
  if (m.t === 'start') {
    cfg = m.cfg;
    if (timer) { clearInterval(timer); timer = null; }
    try { if (EA) EA.OnDeinit(0); } catch (e) { }
    EA = GTMAI_EA({ InpRole: 1, InpAiKey: cfg.demo ? 'AIzaSyDEMO-web-simulator-no-key-needed' : cfg.key, InpAiModel: 'auto',
      InpTgToken: '', InpAIName: 'GTM AI', InpSpeakReplies: !cfg.demo, InpVoicePerDay: cfg.demo ? 0 : 20, InpTtsKey: '' });
    RT.onTimerSet = ms => { if (timer) clearInterval(timer); timer = ms ? setInterval(tick, ms) : null; };
    try { EA.OnInit(); } catch (e) { postMessage({ t: 'error', msg: 'bridge init: ' + (e && e.stack || e) }); }
    return;
  }
};
let busy = false;
function tick() {
  if (busy || !EA) return; busy = true;
  try { EA.OnTimer(); } catch (e) { postMessage({ t: 'error', msg: 'bridge: ' + (e && e.stack || e) }); }
  busy = false;
}
