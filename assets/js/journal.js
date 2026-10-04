/* ============================================================
   G TRADERS — demo journal (a web taste of GTM Journal for MT5)
   Free here: Calendar, Dashboard, Open trades.
   The other pages show what the full GTM Journal does, with a link to get it.
   new GTJournal(host, { start }) ; journal.update(account, prices)
   ============================================================ */
(function () {
  const NAV = [
    ['calendar', 'Calendar', '📅', 'Track your daily performance'],
    ['dashboard', 'Dashboard', '▦', 'Overview of your trading performance'],
    ['open', 'Open', '◉', 'Live. Nothing here is journalled until it closes.'],
    ['trades', 'Trades', '☰', 'All your trades in one place', 'The trade log'],
    ['detail', 'Trade detail', '⌕', 'Anatomy of a single trade', 'Trade detail'],
    ['analytics', 'Analytics', '◔', 'Where the edge really comes from', 'Analytics'],
    ['setups', 'Trade Setups', '🏷', 'Manage setups and tag your trades', 'Trade Setups'],
    ['shots', 'Screenshots', '🖼', 'Every chart you captured', 'Screenshots'],
    ['reports', 'Reports', '📄', 'Close the period and review it', 'Reports'],
    ['coach', 'AI Coach', '💬', 'What to fix next, from your own numbers', 'The AI Coach']
  ];
  const FREE = ['calendar', 'dashboard', 'open'];
  const M = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const esc = s => GT.esc(s), money = (v, d) => GT.money(v, d);

  function stats(list) {
    const w = list.filter(t => t.pl > 0), l = list.filter(t => t.pl <= 0);
    const gp = w.reduce((a, t) => a + t.pl, 0), gl = -l.reduce((a, t) => a + t.pl, 0), net = gp - gl;
    return { n: list.length, net, wr: list.length ? w.length / list.length * 100 : 0, pf: gl ? gp / gl : (gp ? Infinity : 0),
      exp: list.length ? net / list.length : 0, avgW: w.length ? gp / w.length : 0, avgL: l.length ? gl / l.length : 0, wins: w.length, losses: l.length };
  }
  const pfTxt = v => isFinite(v) ? v.toFixed(2) : (v ? '∞' : '—');
  const dayKey = ms => { const d = new Date(ms); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };

  class GTJournal {
    constructor(host, o) {
      this.host = host; this.o = o || {}; this.page = GT.store.get('gt_j_page', 'calendar');
      const n = new Date(); this.y = n.getFullYear(); this.m = n.getMonth(); this.sel = null; this.sig = '';
      host.classList.add('jr');
      host.innerHTML = `<aside class="jr-side"><div class="jr-brand"><span class="jr-logo">J</span><div><b>GTM JOURNAL</b><small>web · demo account</small></div></div>
        <nav>${NAV.map(([k, t, ic]) => `<button type="button" data-p="${k}"><span class="ic">${ic}</span>${t}${FREE.includes(k) ? '' : '<span class="lk">🔒</span>'}</button>`).join('')}</nav>
        <a class="jr-pro" href="product-journal.html"><b>Full GTM Journal for MT5</b><span>All 10 pages, on your real account →</span></a></aside>
        <section class="jr-main"><div class="jr-head"><div><h3 id="jr-t"></h3><p id="jr-s"></p></div><div id="jr-tools"></div></div><div id="jr-body"></div></section>`;
      host.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { this.page = b.dataset.p; GT.store.set('gt_j_page', this.page); this.sig = ''; this.render(); });
    }
    update(acc, prices) { const bs = this.host.querySelector('.jr-brand small'); if (bs) bs.textContent = (acc.name || 'demo account') + ' · web'; this.acc = acc; this.prices = prices || {}; const s = acc.history.length + '|' + acc.balance.toFixed(2) + '|' + acc.positions.length; if (this.page === 'open' || s !== this.sig) { this.sig = s; this.render(); } }
    render() {
      if (!this.acc) return;
      const nav = NAV.find(x => x[0] === this.page) || NAV[0];
      this.host.querySelectorAll('[data-p]').forEach(b => b.classList.toggle('on', b.dataset.p === nav[0]));
      this.host.querySelector('#jr-t').textContent = nav[1]; this.host.querySelector('#jr-s').textContent = nav[3];
      this.host.querySelector('#jr-tools').innerHTML = '';
      const body = this.host.querySelector('#jr-body');
      if (!FREE.includes(nav[0])) return this.locked(body, nav);
      if (nav[0] === 'calendar') this.calendar(body); else if (nav[0] === 'dashboard') this.dashboard(body); else this.open(body);
    }
    kpis(s, extra) {
      return `<div class="jr-kpis">
        <div class="jk"><span>NET P&amp;L</span><b class="${s.net >= 0 ? 'up' : 'dn'}">${money(s.net)}</b><small>${s.n} trades</small></div>
        <div class="jk"><span>WIN RATE</span><b>${s.wr.toFixed(1)}%</b><small>${s.wins} win · ${s.losses} loss</small></div>
        <div class="jk"><span>PROFIT FACTOR</span><b>${pfTxt(s.pf)}</b><small>avg win ${money(s.avgW)} · loss ${money(s.avgL)}</small></div>
        <div class="jk"><span>EXPECTANCY</span><b class="${s.exp >= 0 ? 'up' : 'dn'}">${money(s.exp)}</b><small> / trade</small></div>
        ${extra || ''}</div>`;
    }

    /* ---------------- Calendar ---------------- */
    calendar(body) {
      const H = this.acc.history, y = this.y, m = this.m;
      const inMonth = H.filter(t => { const d = new Date(t.time); return d.getFullYear() === y && d.getMonth() === m; });
      const byDay = {}; inMonth.forEach(t => { const k = new Date(t.time).getDate(); (byDay[k] = byDay[k] || []).push(t); });
      const first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate();
      const maxAbs = Math.max(1, ...Object.values(byDay).map(l => Math.abs(l.reduce((a, t) => a + t.pl, 0))));
      const today = new Date(); let cells = '', wk = [], weeks = [];
      for (let i = 0; i < first; i++) wk.push('<div class="cd empty"></div>');
      let wsum = 0, wn = 0;
      for (let d = 1; d <= days; d++) {
        const l = byDay[d] || [], pl = l.reduce((a, t) => a + t.pl, 0), a = Math.min(1, Math.abs(pl) / maxAbs);
        const bg = l.length ? (pl >= 0 ? `rgba(45,206,137,${.12 + a * .35})` : `rgba(240,90,110,${.12 + a * .35})`) : '';
        const isT = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
        wk.push(`<button type="button" class="cd ${isT ? 'today' : ''} ${this.sel === d ? 'sel' : ''}" data-d="${d}" style="${bg ? 'background:' + bg : ''}"><i>${d}</i>${l.length ? `<b class="${pl >= 0 ? 'up' : 'dn'}">${money(pl, 0)}</b><small>${l.length} tr · ${Math.round(l.filter(t => t.pl > 0).length / l.length * 100)}% win</small>` : ''}</button>`);
        wsum += pl; wn += l.length;
        if (wk.length === 7 || d === days) { while (wk.length < 7) wk.push('<div class="cd empty"></div>'); weeks.push(wk.join('') + `<div class="cd wkc"><span>WEEKLY</span><b class="${wsum >= 0 ? 'up' : 'dn'}">${wn ? money(wsum, 0) : '—'}</b><small>${wn} tr</small></div>`); wk = []; wsum = 0; wn = 0; }
      }
      cells = weeks.join('');
      const s = stats(inMonth);
      const selList = this.sel ? (byDay[this.sel] || []) : [];
      body.innerHTML = this.kpis(s, `<div class="jk"><span>TRADES</span><b>${s.n}</b><small>${M[m]} ${y}</small></div>`) + `
        <div class="jr-card"><div class="jr-mnav"><button type="button" data-mv="-1">‹</button><b>${M[m]} ${y}</b><button type="button" data-mv="1">›</button><button type="button" data-mv="0" class="tdy">Today</button></div>
          <div class="cal"><div class="dh">Sun</div><div class="dh">Mon</div><div class="dh">Tue</div><div class="dh">Wed</div><div class="dh">Thu</div><div class="dh">Fri</div><div class="dh">Sat</div><div class="dh">Week</div>${cells}</div></div>
        ${this.sel ? `<div class="jr-card"><div class="jr-ct">Selected day — ${this.sel} ${M[m]}</div>${selList.length ? this.tradeTable(selList) : '<p class="muted small">No closed trades on this day.</p>'}</div>` : ''}
        ${!H.length ? '<div class="jr-empty">Close a few demo trades — every closed trade lands here by day, with its P&amp;L and win rate.</div>' : ''}`;
      body.querySelectorAll('[data-mv]').forEach(b => b.onclick = () => { const v = +b.dataset.mv; if (!v) { const n = new Date(); this.y = n.getFullYear(); this.m = n.getMonth(); } else { this.m += v; if (this.m < 0) { this.m = 11; this.y--; } if (this.m > 11) { this.m = 0; this.y++; } } this.sel = null; this.render(); });
      body.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { this.sel = +b.dataset.d === this.sel ? null : +b.dataset.d; this.render(); });
    }
    tradeTable(list) {
      return `<div style="overflow:auto"><table class="t jt"><tr><th>Time</th><th>Symbol</th><th>Side</th><th>Lots</th><th>Entry</th><th>Exit</th><th>R</th><th>P&amp;L</th><th>Closed by</th></tr>${list.map(t => {
        const R = t.risk ? t.pl / t.risk : null;
        return `<tr><td>${new Date(t.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td><td>${esc(t.name)}</td><td class="${t.dir === 'BUY' ? 'up' : 'dn'}">${t.dir}</td><td>${t.lots}</td>
          <td>${(+t.entry).toFixed(t.digits)}</td><td>${(+t.exit).toFixed(t.digits)}</td><td>${R == null ? '<span class="muted">no SL</span>' : (R >= 0 ? '+' : '') + R.toFixed(2)}</td>
          <td class="${t.pl >= 0 ? 'up' : 'dn'}"><b>${money(t.pl)}</b></td><td class="muted">${esc(t.why)}</td></tr>`; }).join('')}</table></div>`;
    }

    /* ---------------- Dashboard ---------------- */
    dashboard(body) {
      const H = this.acc.history.slice().sort((a, b) => a.time - b.time), s = stats(H);
      const dep = (this.acc.deposits || []).reduce((a, d) => a + d.amount, 0);
      // sessions by the hour the trade opened (UTC)
      const SES = [['Asia', 0, 7], ['London', 7, 13], ['New York', 13, 21], ['Late', 21, 24]];
      const ses = SES.map(([n, a, b]) => { const l = H.filter(t => { const h = new Date(t.open || t.time).getUTCHours(); return h >= a && h < b; }); return { n, net: l.reduce((x, t) => x + t.pl, 0), c: l.length }; });
      const mx = Math.max(1, ...ses.map(x => Math.abs(x.net)));
      const bins = H.map(t => t.pl), bmax = Math.max(1, ...bins.map(Math.abs));
      const fl = this.acc.positions.reduce((a, p) => { const px = this.prices[p.sym]; return a + (px != null ? (px - p.entry) * p.lots * p.contract * (p.conv || 1) * (p.dir === 'BUY' ? 1 : -1) : 0); }, 0);
      body.innerHTML = this.kpis(s, `<div class="jk"><span>TOTAL TRADES</span><b>${s.n}</b><small>${H.filter(t => t.risk).length} with SL</small></div>`) + `
        <div class="jr-grid">
          <div class="jr-card span2"><div class="jr-ct">Balance <span class="muted small">start of period ${money(dep, 0)} · now ${money(this.acc.balance)}</span></div><div class="jr-eq" id="jr-eq"></div></div>
          <div class="jr-card"><div class="jr-ct">Open now</div>
            <div class="jo"><b>${this.acc.positions.length}</b><span>${this.acc.positions.length ? 'open' : 'nothing running'}</span></div>
            <div class="jo"><b class="${fl >= 0 ? 'up' : 'dn'}">${money(fl)}</b><span>floating</span></div>
            <button type="button" class="jr-link" data-go="open">Open page →</button></div>
          <div class="jr-card"><div class="jr-ct">By session <span class="muted small">(UTC open time)</span></div>${ses.map(x => `<div class="bs"><span>${x.n}</span><div class="bt"><i class="${x.net >= 0 ? 'up' : 'dn'}" style="width:${Math.abs(x.net) / mx * 100}%"></i></div><b class="${x.net >= 0 ? 'up' : 'dn'}">${x.c ? money(x.net, 0) : '—'}</b></div>`).join('')}</div>
          <div class="jr-card span2"><div class="jr-ct">P&amp;L distribution <span class="muted small">every closed trade, oldest to newest</span></div>
            <div class="dist">${bins.slice(-80).map(v => `<i class="${v >= 0 ? 'up' : 'dn'}" style="height:${Math.max(3, Math.abs(v) / bmax * 100)}%" title="${money(v)}"></i>`).join('') || '<p class="muted small">No closed trades in this period</p>'}</div></div>
        </div>`;
      body.querySelector('[data-go]').onclick = () => { this.page = 'open'; this.render(); };
      const el = body.querySelector('#jr-eq');
      if (H.length && window.LightweightCharts) {
        const ch = LightweightCharts.createChart(el, { width: el.clientWidth, height: 190, layout: { background: { color: 'transparent' }, textColor: '#8b99aa', fontSize: 10 },
          grid: { vertLines: { visible: false }, horzLines: { color: '#1a222c' } }, timeScale: { borderColor: '#212b37', timeVisible: true }, rightPriceScale: { borderColor: '#212b37' }, handleScroll: false, handleScale: false });
        const ser = ch.addAreaSeries({ lineColor: '#2dd4a7', topColor: 'rgba(45,212,167,.35)', bottomColor: 'rgba(45,212,167,0)', lineWidth: 2 });
        // rebuild the balance from deposits + closed trades
        const ev = (this.acc.deposits || []).map(d => ({ t: d.time, v: d.amount })).concat(H.map(t => ({ t: t.time, v: t.pl }))).sort((a, b) => a.t - b.t);
        let b = 0, last = 0; const pts = [];
        ev.forEach(e => { b += e.v; let t = Math.floor(e.t / 1000); if (t <= last) t = last + 1; last = t; pts.push({ time: t, value: +b.toFixed(2) }); });
        ser.setData(pts); ch.timeScale().fitContent();
      } else el.innerHTML = '<div class="jr-empty" style="margin:30px 0">No closed trades in this period</div>';
    }

    /* ---------------- Open ---------------- */
    open(body) {
      const P = this.acc.positions, pr = this.prices;
      let fl = 0, risk = 0, noStop = 0;
      const rows = P.map(p => {
        const px = pr[p.sym], pl = px != null ? (px - p.entry) * p.lots * p.contract * (p.conv || 1) * (p.dir === 'BUY' ? 1 : -1) : null;
        if (pl != null) fl += pl;
        const r = p.sl ? (p.dir === 'BUY' ? p.entry - p.sl : p.sl - p.entry) * p.lots * p.contract * (p.conv || 1) : null;   // > 0 = money lost if the stop is hit
        if (r != null) risk += r; else noStop++;
        const mins = Math.round((Date.now() - (p.open || p.time)) / 60000);
        return `<tr><td>${esc(p.name)}</td><td class="${p.dir === 'BUY' ? 'up' : 'dn'}">${p.dir}</td><td>${p.lots}</td><td>${(+p.entry).toFixed(p.digits)}</td>
          <td>${p.sl ? (+p.sl).toFixed(p.digits) : '<span class="warn">none</span>'}</td><td>${px != null ? (+px).toFixed(p.digits) : '…'}</td>
          <td class="${pl >= 0 ? 'up' : 'dn'}"><b>${pl != null ? money(pl) : '…'}</b></td><td>${mins < 60 ? mins + ' min' : Math.floor(mins / 60) + ' h ' + (mins % 60) + ' m'}</td>
          <td>${r == null ? '<span class="warn">no stop</span>' : money(-r)}</td></tr>`;
      }).join('');
      const eq = this.acc.balance + fl;
      body.innerHTML = `<div class="jr-kpis">
          <div class="jk"><span>OPEN POSITIONS</span><b>${P.length}</b><small>${noStop ? noStop + ' with no stop' : (P.length ? 'all have a stop' : 'nothing running')}</small></div>
          <div class="jk"><span>FLOATING P&amp;L</span><b class="${fl >= 0 ? 'up' : 'dn'}">${money(fl)}</b><small>equity ${money(eq)}</small></div>
          <div class="jk"><span>AT RISK NOW</span><b class="dn">${money(-risk)}</b><small>if every stop is hit</small></div>
          <div class="jk"><span>RISK OF EQUITY</span><b>${eq > 0 ? (risk / eq * 100).toFixed(2) : '0.00'}%</b><small>${noStop ? 'no limit — some trades have no stop' : 'of the account'}</small></div></div>
        <div class="jr-card">${P.length ? `<div style="overflow:auto"><table class="t jt"><tr><th>Symbol</th><th>Side</th><th>Lots</th><th>Entry</th><th>Stop</th><th>Now</th><th>P&amp;L</th><th>Open for</th><th>Risk</th></tr>${rows}</table></div>` : '<div class="jr-empty">Nothing is open right now</div>'}
        <p class="muted small" style="margin:10px 0 0">Closed trades are journalled on the Calendar and the Dashboard.</p></div>`;
    }

    /* ---------------- locked pages ---------------- */
    locked(body, nav) {
      const p = (GT_CONFIG.products || []).find(x => x.key === 'journal') || {};
      body.innerHTML = `<div class="jr-lock">
        <div class="jr-ghost">${'<i></i>'.repeat(18)}</div>
        <div class="jr-lockcard">
          <div class="pad">🔒</div>
          <h3>${esc(nav[4])} is part of the full GTM Journal</h3>
          <p class="muted small">This free web journal covers the Calendar, the Dashboard and Open trades of your demo account.</p>
          <ul>
            <li>Full trade log with filters and CSV export</li>
            <li>Trade detail — chart, MFE / MAE, notes and tags</li>
            <li>Analytics — setups, sessions, day and hour heat map</li>
            <li>Daily, weekly and monthly reports, screenshots gallery</li>
            <li>AI Coach that finds your leaks — on your real MT5 account</li></ul>
          <div class="row"><a class="btn primary" href="${p.url || 'products.html'}" target="_blank" rel="noopener">Get GTM Journal — ${esc(p.price || '')} on MQL5</a>
            <a class="btn ghost" href="product-journal.html">See what it does</a></div>
          <p class="muted small" style="margin:10px 0 0">Works inside MetaTrader 5 on any broker. Try the free demo in the MT5 Strategy Tester first.</p>
        </div></div>`;
    }
  }
  window.GTJournal = GTJournal;
})();
