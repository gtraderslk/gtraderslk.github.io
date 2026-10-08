# G TRADERS website — www.gtraders.lk (version 4)

Plain HTML, CSS and JavaScript. No build step. Edit a file, save, refresh the browser.
Real accounts (every device, password-reset e-mails, the control panel for all users) switch on
when you connect a free Firebase project — until then everything works in **test mode** (accounts in
your own browser only).

## Pages

| File | What it is |
|---|---|
| `index.html` | Home |
| `products.html`, `product-*.html` | MQL5 products — one page each, with MQL5 widget, reviews link and PDF guides |
| `studio.html` | GTM EA Bot Studio for MT5 (+ PDF guides) |
| `editor.html` | EA Bot Studio in the browser: blocks / Bot Maker panel / form, quick test, run on demo, download |
| `signals.html` | Signal engine: SMC / GTM / Multi, TP-SL boxes, SMC zones, drawing tools, scanner |
| `charts.html` | TradingView charts for any symbol |
| `demo.html` | Several demo accounts with real lots / margin, TP-SL boxes, drawing tools, journal |
| `account.html` | Sign up, log in, forgot password, profile (photo, WhatsApp), activity |
| `admin.html` | **Control panel** (only the e-mails in `adminEmails`) |
| `legal.html` | Risk disclosure, terms, privacy policy |
| `docs/` | PDF guides shown on the product pages |

## Settings — `assets/js/config.js`

* `products` — names, texts, pictures, MQL5 numbers, PDF guides
* `adminEmails` — who may open the control panel (**also change it in `firestore.rules`**)
* `firebase` — paste your Firebase web settings here to switch on real accounts
* `lockAttempts`, `lockMinutes` — wrong passwords before the login locks, and for how long
* `dlDay`, `dlWeek`, `dlMonth` — default bot download limits
* Most of these can also be changed live from the **control panel → Site settings** (features on / off,
  limits, maintenance banner, announcement) and per user (**Users** → click a user).

## Test on your PC

Double-click `Start-Website.bat` → the site opens at http://localhost:8000.
The black window shows which folder it serves ("Folder:") — it must be this folder.

## Real accounts (Firebase — free "Spark" plan)

1. https://console.firebase.google.com → **Add project** → name `gtraders` (Analytics optional).
2. **Build → Authentication → Get started → Email/Password → Enable**.
   Templates tab: set the sender name "G TRADERS" (password-reset and verify e-mails are sent automatically).
   Settings → **Authorized domains**: add `www.gtraders.lk` and `gtraders.lk`.
3. **Build → Firestore Database → Create database** → production mode → region near you (e.g. `asia-south1`).
   **Rules** tab → paste everything from `firestore.rules` → **Publish**.
4. Project settings (gear) → **Your apps → Web (</>)** → register → copy the `firebaseConfig` values into
   `config.js` → `firebase: { apiKey: '…', authDomain: '…', projectId: '…', appId: '…' }`.
   (A Firebase web apiKey is not a secret — the rules protect the data.)
5. Sign up on the site with the admin e-mail, confirm the e-mail link, then open `admin.html`.

Your users live in Firebase, not on the web host — you can move the website to any host later and every account stays.

## Publishing (recommended: Cloudflare Pages — free, SSL, firewall)

You do **not** need a public GitHub repository.

1. Buy `gtraders.lk` from the LK Domain Registry or an approved .lk reseller.
2. https://dash.cloudflare.com → **Add a site** → `gtraders.lk` (free plan) → put Cloudflare's two
   nameservers at your domain seller.
3. **Workers & Pages → Create → Pages → Upload assets** → drag this folder → project name `gtraders`.
   (Or connect a **private** GitHub repository so every upload publishes automatically.)
4. The Pages project → **Custom domains** → add `www.gtraders.lk` (and `gtraders.lk` → redirect to www).
5. Cloudflare → SSL/TLS: **Full (strict)**, **Always Use HTTPS** on. Security: **Bot Fight Mode** on,
   WAF → a rate-limiting rule for `/account.html`. The `_headers` file adds the security headers.
6. Google Search Console → add `https://www.gtraders.lk` → submit `sitemap.xml`.

Alternative: Firebase Hosting (`firebase.json` is ready: `firebase deploy`), or GitHub Pages (`CNAME` is ready).

## When the domain is ready

The pages now point search engines to `https://gtraderslk.github.io`. When www.gtraders.lk works, replace
`https://gtraderslk.github.io` with `https://www.gtraders.lk` in every `.html` file, `sitemap.xml` and `robots.txt`.

## Never upload

The old `api/` folder, `config.php`, database passwords, private API keys, licence secrets or the key generator.
Use 2-step verification on Google, Cloudflare, GitHub and the domain account.
