/* ============================================================
   GTM AI - Binance relay (Cloudflare Worker, free plan)
   Binance does not let a web page send orders directly (CORS), so
   the GTM AI page sends its SIGNED orders through this tiny relay.
   - It only passes requests on to Binance Futures; it stores nothing.
   - It never sees your secret key (orders are signed in your browser).
   - Only the pages listed in ORIGINS may use it.
   Deploy: dash.cloudflare.com > Workers & Pages > Create > Worker >
           paste this file > Deploy. Copy the https://....workers.dev
           address into "Relay URL" on the GTM AI page.
   ============================================================ */
const HOSTS = new Set(['testnet.binancefuture.com', 'demo-fapi.binance.com', 'fapi.binance.com']);
const ORIGINS = [/^https:\/\/gtraderslk\.github\.io$/, /^https:\/\/(www\.)?gtraders\.lk$/, /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/];
const PATH = /^\/fapi\/v[1-3]\/[A-Za-z\/]+$/;

export default {
  async fetch(req) {
    const origin = req.headers.get('Origin') || '';
    const ok = ORIGINS.some(r => r.test(origin));
    const cors = {
      'Access-Control-Allow-Origin': ok ? origin : 'null',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'X-MBX-APIKEY, Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: ok ? 204 : 403, headers: cors });
    const out = (code, msg) => new Response(JSON.stringify({ code: -1, msg }), { status: code, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (!ok) return out(403, 'this page may not use the relay: ' + origin);
    const u = new URL(req.url);
    const parts = u.pathname.split('/');
    const host = parts[1] || '';
    const path = '/' + parts.slice(2).join('/');
    if (!HOSTS.has(host)) return out(400, 'only Binance Futures hosts are allowed');
    if (!PATH.test(path)) return out(400, 'path not allowed');
    const h = new Headers();
    const key = req.headers.get('X-MBX-APIKEY');
    if (key) h.set('X-MBX-APIKEY', key);
    let r;
    try { r = await fetch('https://' + host + path + u.search, { method: req.method, headers: h }); }
    catch (e) { return out(502, 'Binance not reachable from the relay'); }
    return new Response(await r.text(), { status: r.status, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
};
