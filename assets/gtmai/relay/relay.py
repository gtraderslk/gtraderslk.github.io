#!/usr/bin/env python3
"""
GTM AI - Binance relay on your own computer (free, no account needed)

Binance does not let a web page send orders directly (CORS), so the
GTM AI page sends its SIGNED orders through this small relay.
 - It only passes requests on to Binance Futures; it stores nothing.
 - It never sees your secret key (orders are signed in your browser).
 - It listens only on this computer (127.0.0.1).

Run:   python relay.py          (Python 3.8+, nothing to install)
Then put  http://127.0.0.1:8787  in "Relay URL" on the GTM AI page.
Chrome may ask "allow this site to use devices on your local network" - press Allow.
Keep this window open while the panel trades.
"""
import json, re, sys, urllib.request, urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = 8787
HOSTS = {"testnet.binancefuture.com", "demo-fapi.binance.com", "fapi.binance.com"}
ORIGINS = [re.compile(r"^https://gtraderslk\.github\.io$"), re.compile(r"^https://(www\.)?gtraders\.lk$"),
           re.compile(r"^http://(localhost|127\.0\.0\.1)(:\d+)?$")]
PATH = re.compile(r"^/fapi/v[1-3]/[A-Za-z/]+$")


class Relay(BaseHTTPRequestHandler):
    def cors(self):
        origin = self.headers.get("Origin", "")
        ok = any(r.match(origin) for r in ORIGINS)
        self.send_header("Access-Control-Allow-Origin", origin if ok else "null")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "X-MBX-APIKEY, Content-Type")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Access-Control-Max-Age", "86400")
        self.send_header("Vary", "Origin")
        return ok

    def reply(self, code, body):
        self.send_response(code)
        self.cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def forward(self):
        origin = self.headers.get("Origin", "")
        if not any(r.match(origin) for r in ORIGINS):
            return self.reply(403, b'{"code":-1,"msg":"this page may not use the relay"}')
        path, _, query = self.path.partition("?")
        parts = path.split("/")
        host = parts[1] if len(parts) > 1 else ""
        rest = "/" + "/".join(parts[2:])
        if host not in HOSTS or not PATH.match(rest):
            return self.reply(400, b'{"code":-1,"msg":"only Binance Futures paths are allowed"}')
        url = "https://" + host + rest + ("?" + query if query else "")
        req = urllib.request.Request(url, method=self.command, data=b"" if self.command != "GET" else None)
        key = self.headers.get("X-MBX-APIKEY")
        if key:
            req.add_header("X-MBX-APIKEY", key)
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                self.reply(r.status, r.read())
        except urllib.error.HTTPError as e:
            self.reply(e.code, e.read())
        except Exception as e:
            self.reply(502, json.dumps({"code": -1, "msg": "Binance not reachable: " + str(e)}).encode())
        print(self.command, rest)

    do_GET = do_POST = do_PUT = do_DELETE = forward

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print("GTM AI Binance relay on http://127.0.0.1:%d  (Ctrl+C to stop)" % PORT)
    try:
        ThreadingHTTPServer(("127.0.0.1", PORT), Relay).serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)
