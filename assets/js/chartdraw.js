/* ============================================================
   G TRADERS — chart overlay for the live charts
   - live TP / SL boxes for signals and open trades: they start at the entry
     candle and stop a few candles in front of the newest one
   - SMC zones (order blocks, fair value gaps) as boxes that stop where
     price fills them
   - analysis tools: horizontal line, trend line, ray, rectangle, Fibonacci,
     long / short position, measure. Click a drawing to select it, drag its
     points to edit it, Delete (or the bin) removes it.
   Drawings are kept per market in this browser.
   new GTDraw(liveChart, { key, toolbar })
   ============================================================ */
(function () {
  const FIB = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  const AHEAD = 6;   // candles a live box reaches past the newest candle
  const TOOLS = [
    ['cursor', '⌖', 'Cursor — click a drawing to edit it'], ['hline', '—', 'Horizontal line'], ['trend', '╱', 'Trend line'], ['ray', '↗', 'Ray (extends to the right)'],
    ['rect', '▭', 'Rectangle / zone'], ['fib', 'Fib', 'Fibonacci retracement'], ['long', '⬆', 'Long position (risk / reward)'], ['short', '⬇', 'Short position (risk / reward)'],
    ['measure', '⇕', 'Measure price change'], ['undo', '↶', 'Remove the last drawing'], ['clear', '🗑', 'Remove all drawings on this market']
  ];

  class GTDraw {
    constructor(lc, o) {
      this.lc = lc; this.o = o || {}; this.key = this.o.key || 'x'; this.tool = 'cursor';
      this.items = []; this.boxes = []; this.zones = []; this.tmp = null; this.color = '#f0c869'; this.sel = -1; this.drag = null;
      const host = this.host = lc.o.container;
      this.cv = document.createElement('canvas');
      this.cv.className = 'gt-draw';
      Object.assign(this.cv.style, { position: 'absolute', left: 0, top: 0, zIndex: 3, pointerEvents: 'none' });
      host.appendChild(this.cv);
      this.ctx = this.cv.getContext('2d');
      // small bar shown next to a selected drawing
      this.mini = document.createElement('div'); this.mini.className = 'draw-mini';
      this.mini.innerHTML = '<input type="color" title="Colour"><button type="button" data-x="del" title="Delete (Del key)">🗑</button><button type="button" data-x="done" title="Done">✓</button>';
      host.appendChild(this.mini);
      this.mini.querySelector('input').oninput = e => { const it = this.items[this.sel]; if (it) { it.c = e.target.value; this.save(); } };
      this.mini.querySelector('[data-x=del]').onclick = () => this.remove(this.sel);
      this.mini.querySelector('[data-x=done]').onclick = () => this.select(-1);
      new ResizeObserver(() => this.fit()).observe(host); this.fit();
      if (this.o.toolbar) this.bar(this.o.toolbar);
      // drawing mode: the canvas takes the mouse
      this.cv.addEventListener('mousedown', e => this.down(e));
      this.cv.addEventListener('mousemove', e => this.move(e));
      this.cv.addEventListener('mouseup', e => this.up(e));
      this.cv.addEventListener('touchstart', e => { this.down(e.touches[0]); e.preventDefault(); }, { passive: false });
      this.cv.addEventListener('touchmove', e => { this.move(e.touches[0]); e.preventDefault(); }, { passive: false });
      this.cv.addEventListener('touchend', e => { this.up(this._last || {}); e.preventDefault(); }, { passive: false });
      // cursor mode: grab drawings before the chart sees the mouse
      host.addEventListener('mousedown', e => this.pick(e), true);
      host.addEventListener('mousemove', e => this.hover(e), true);
      addEventListener('mousemove', e => this.dragMove(e));
      addEventListener('mouseup', () => this.dragEnd());
      addEventListener('keydown', e => {
        if (e.key === 'Escape') { this.tmp = null; this.setTool('cursor'); this.select(-1); }
        if ((e.key === 'Delete' || e.key === 'Backspace') && this.sel >= 0 && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); this.remove(this.sel); }
      });
      const loop = () => { this.render(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
    fit() { const r = devicePixelRatio || 1; this.w = this.host.clientWidth; this.h = this.host.clientHeight; this.cv.width = this.w * r; this.cv.height = this.h * r; this.cv.style.width = this.w + 'px'; this.cv.style.height = this.h + 'px'; this.ctx.setTransform(r, 0, 0, r, 0, 0); }
    sk() { return 'gt_draw_' + this.key + '_' + (this.lc.sym || ''); }
    load() { this.items = GT.store.get(this.sk(), []); this.tmp = null; this.select(-1); }
    save() { GT.store.set(this.sk(), this.items.slice(-80)); }
    remove(i) { if (i < 0 || !this.items[i]) return; this.items.splice(i, 1); this.save(); this.select(-1); }
    bar(host) {
      host.classList.add('drawbar');
      host.innerHTML = TOOLS.map(([k, ic, t]) => `<button type="button" data-tool="${k}" title="${t}" class="${k === 'cursor' ? 'on' : ''}">${ic}</button>`).join('')
        + `<input type="color" value="${this.color}" title="Colour for new drawings">`;
      host.querySelectorAll('button').forEach(b => b.onclick = () => {
        const k = b.dataset.tool;
        if (k === 'undo') { this.items.pop(); this.save(); this.select(-1); return; }
        if (k === 'clear') { if (this.items.length && confirm('Remove every drawing on this market?')) { this.items = []; this.save(); this.select(-1); } return; }
        this.setTool(k);
      });
      host.querySelector('input').oninput = e => this.color = e.target.value;
      this.barEl = host;
    }
    setTool(k) {
      this.tool = k; this.tmp = null; if (k !== 'cursor') this.select(-1);
      this.cv.style.pointerEvents = k === 'cursor' ? 'none' : 'auto';
      this.cv.style.cursor = k === 'cursor' ? '' : 'crosshair';
      if (this.barEl) this.barEl.querySelectorAll('button[data-tool]').forEach(b => b.classList.toggle('on', b.dataset.tool === k));
    }

    /* ---------- coordinates ---------- */
    plotW() { try { return this.lc.chart.timeScale().width(); } catch (e) { return this.w - 70; } }
    idxOf(t) {
      const c = this.lc.candles, n = c.length; if (!n) return null;
      const g = this.lc.gran || 60;
      if (t >= c[n - 1].time) return n - 1 + (t - c[n - 1].time) / g;
      if (t <= c[0].time) return (t - c[0].time) / g;
      let lo = 0, hi = n - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (c[m].time <= t) lo = m; else hi = m; }
      return lo + (t - c[lo].time) / ((c[hi].time - c[lo].time) || g);
    }
    xi(i) { const v = this.lc.chart.timeScale().logicalToCoordinate(i); return v == null ? null : v; }
    x(t) { const i = this.idxOf(t); return i == null ? null : this.xi(i); }
    y(p) { const v = this.lc.series.priceToCoordinate(p); return v == null ? null : v; }
    xEnd() { return this.xi(this.lc.candles.length - 1 + AHEAD); }   // where live boxes stop
    rel(e) { const r = this.host.getBoundingClientRect(); return { px: e.clientX - r.left, py: e.clientY - r.top }; }
    pt(e) {
      const { px, py } = this.rel(e);
      const lg = this.lc.chart.timeScale().coordinateToLogical(px), price = this.lc.series.coordinateToPrice(py);
      const c = this.lc.candles, n = c.length, g = this.lc.gran || 60;
      if (lg == null || price == null || !n) return null;
      const i = Math.round(lg), t = i < 0 ? c[0].time + i * g : i < n ? c[i].time : c[n - 1].time + (i - n + 1) * g;
      return { t, p: price };
    }

    /* ---------- drawing new objects ---------- */
    down(e) {
      if (this.tool === 'cursor') return;
      const p = this.pt(e); if (!p) return; this._last = e;
      if (this.tool === 'hline') { this.items.push({ k: 'hline', p: p.p, c: this.color }); this.save(); this.setTool('cursor'); return; }
      if (this.tmp && this.tmp.wait) { this.tmp.b = p; this.tmp.wait = false; this.finish(); return; }   // second click
      this.tmp = { k: this.tool, a: p, b: p, c: this.color };
    }
    move(e) { this._last = e; if (!this.tmp) return; const p = this.pt(e); if (p) this.tmp.b = p; }
    up(e) {
      if (!this.tmp || this.tmp.wait) return;
      const a = this.tmp.a, b = this.tmp.b;
      if (a.t === b.t && Math.abs(a.p - b.p) < 1e-12) { this.tmp.wait = true; return; }   // a click: the next click sets the second point
      this.finish();
    }
    finish() {
      const a = this.tmp.a, b = this.tmp.b;
      if (this.tmp.k === 'measure') { this.tmp = null; this.setTool('cursor'); return; }
      if (this.tmp.k === 'long' || this.tmp.k === 'short') {
        const risk = Math.abs(a.p - b.p) || Math.abs(a.p) * 0.002, s = this.tmp.k === 'long' ? 1 : -1;
        this.items.push({ k: 'pos', dir: this.tmp.k === 'long' ? 'BUY' : 'SELL', t1: a.t, t2: Math.max(b.t, a.t + (this.lc.gran || 60) * 20), entry: a.p, sl: a.p - s * risk, tp: a.p + s * risk * 2, c: this.color });
      } else this.items.push(this.tmp);
      this.tmp = null; this.save(); this.setTool('cursor'); this.select(this.items.length - 1);
    }

    /* ---------- select / move / edit ---------- */
    handles(it) {
      // [name, x, y]
      if (it.k === 'hline') { const y = this.y(it.p); return y == null ? [] : [['p', this.plotW() - 40, y]]; }
      if (it.k === 'pos') return [['entry', this.x(it.t1), this.y(it.entry)], ['sl', this.x(it.t1), this.y(it.sl)], ['tp', this.x(it.t1), this.y(it.tp)], ['t2', this.x(it.t2), this.y(it.entry)]].filter(h => h[1] != null && h[2] != null);
      if (it.a) return [['a', this.x(it.a.t), this.y(it.a.p)], ['b', this.x(it.b.t), this.y(it.b.p)]].filter(h => h[1] != null && h[2] != null);
      return [];
    }
    hit(px, py) {
      const W = this.plotW();
      for (let i = this.items.length - 1; i >= 0; i--) {
        const it = this.items[i];
        for (const h of this.handles(it)) if (Math.hypot(h[1] - px, h[2] - py) < 8) return { i, h: h[0] };
        if (it.k === 'hline') { const y = this.y(it.p); if (y != null && Math.abs(y - py) < 6 && px < W) return { i, h: 'all' }; continue; }
        if (it.k === 'pos') {
          const x1 = this.x(it.t1), x2 = this.x(it.t2), y1 = this.y(it.sl), y2 = this.y(it.tp);
          if ([x1, x2, y1, y2].every(v => v != null) && px >= Math.min(x1, x2) && px <= Math.max(x1, x2) && py >= Math.min(y1, y2) && py <= Math.max(y1, y2)) return { i, h: 'all' };
          continue;
        }
        if (!it.a) continue;
        const ax = this.x(it.a.t), ay = this.y(it.a.p), bx = this.x(it.b.t), by = this.y(it.b.p);
        if ([ax, ay, bx, by].some(v => v == null)) continue;
        if (it.k === 'trend' || it.k === 'ray' || it.k === 'fib') {
          let ex = bx, ey = by; if (it.k === 'ray' && bx !== ax) { ex = W; ey = ay + (by - ay) * (W - ax) / (bx - ax); }
          if (segDist(px, py, ax, ay, ex, ey) < 6) return { i, h: 'all' };
          if (it.k === 'fib') for (const f of FIB) { const y = this.y(it.b.p + (it.a.p - it.b.p) * f); if (y != null && Math.abs(y - py) < 5 && px >= Math.min(ax, bx) && px <= W) return { i, h: 'all' }; }
        }
        if (it.k === 'rect' && px >= Math.min(ax, bx) - 4 && px <= Math.max(ax, bx) + 4 && py >= Math.min(ay, by) - 4 && py <= Math.max(ay, by) + 4) return { i, h: 'all' };
      }
      return null;
    }
    pick(e) {
      if (this.tool !== 'cursor' || e.button !== 0 || this.mini.contains(e.target)) return;
      const { px, py } = this.rel(e), h = this.hit(px, py);
      if (!h) { if (this.sel >= 0) this.select(-1); return; }
      e.stopPropagation(); e.preventDefault();          // the chart does not pan while a drawing moves
      this.select(h.i);
      this.drag = { i: h.i, h: h.h, start: this.pt(e), orig: JSON.parse(JSON.stringify(this.items[h.i])) };
    }
    hover(e) {
      if (this.tool !== 'cursor' || this.drag) return;
      const { px, py } = this.rel(e), h = this.hit(px, py);
      this.host.style.cursor = h ? (h.h === 'all' ? 'move' : 'grab') : '';
    }
    dragMove(e) {
      if (!this.drag) return;
      const p = this.pt(e); if (!p || !this.drag.start) return;
      const d = this.drag, it = this.items[d.i], o = d.orig, dt = p.t - d.start.t, dp = p.p - d.start.p;
      if (!it) return;
      if (it.k === 'hline') it.p = o.p + dp;
      else if (it.k === 'pos') {
        if (d.h === 'sl') it.sl = p.p; else if (d.h === 'tp') it.tp = p.p; else if (d.h === 't2') it.t2 = Math.max(o.t1 + (this.lc.gran || 60), p.t);
        else { it.entry = o.entry + dp; it.sl = o.sl + dp; it.tp = o.tp + dp; it.t1 = o.t1 + dt; it.t2 = o.t2 + dt; }
      } else if (it.a) {
        if (d.h === 'a') it.a = p; else if (d.h === 'b') it.b = p;
        else { it.a = { t: o.a.t + dt, p: o.a.p + dp }; it.b = { t: o.b.t + dt, p: o.b.p + dp }; }
      }
    }
    dragEnd() { if (this.drag) { this.drag = null; this.save(); } }
    select(i) {
      this.sel = i;
      const it = this.items[i];
      this.mini.style.display = it ? 'flex' : 'none';
      if (it) this.mini.querySelector('input').value = it.c || this.color;
    }

    /* ---------- data from the page ---------- */
    setBoxes(list) { this.boxes = list || []; }
    setZones(list) { this.zones = list || []; }

    /* ---------- painting ---------- */
    render() {
      const ctx = this.ctx; if (!ctx) return;
      ctx.clearRect(0, 0, this.w, this.h);
      if (!this.lc.candles.length) return;
      const W = this.plotW();
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, this.h); ctx.clip();
      this.zones.forEach(z => this.zone(z, W));
      this.boxes.forEach(b => this.posBox(b, W, !b.t2));
      this.items.forEach((it, i) => this.item(it, W, false, i === this.sel));
      if (this.tmp) this.item(this.tmp, W, true);
      ctx.restore();
      // keep the selection bar next to the selected drawing
      const it = this.items[this.sel];
      if (it) { const h = this.handles(it)[0]; if (h) { this.mini.style.left = Math.max(4, Math.min(W - 110, h[1] + 12)) + 'px'; this.mini.style.top = Math.max(4, Math.min(this.h - 34, h[2] - 40)) + 'px'; } }
    }
    fmt(v) { return this.lc.fmt ? this.lc.fmt(v) : (+v).toFixed(5); }
    tag(x, y, text, bg, fg) {
      const ctx = this.ctx; ctx.font = '700 10px Inter, Segoe UI, sans-serif';
      const w = ctx.measureText(text).width + 8, h = 15;
      ctx.fillStyle = bg; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y - h / 2, w, h, 3) : ctx.rect(x, y - h / 2, w, h); ctx.fill();
      ctx.fillStyle = fg; ctx.textBaseline = 'middle'; ctx.fillText(text, x + 4, y + 0.5);
      return w;
    }
    zone(z, W) {
      const ctx = this.ctx, x1 = this.x(z.t1); if (x1 == null) return;
      const x2 = z.t2 ? this.x(z.t2) : this.xEnd(), yt = this.y(z.top), yb = this.y(z.bottom);
      if (x2 == null || yt == null || yb == null) return;
      const bull = z.type === 'bull', done = !!z.t2;
      const fill = bull ? `rgba(34,197,94,${done ? .06 : .13})` : `rgba(244,63,94,${done ? .06 : .13})`;
      const line = bull ? `rgba(34,197,94,${done ? .3 : .7})` : `rgba(244,63,94,${done ? .3 : .7})`;
      const xa = Math.max(-5, x1), w = Math.max(3, x2 - xa), top = Math.min(yt, yb), h = Math.max(2, Math.abs(yb - yt));
      ctx.fillStyle = fill; ctx.fillRect(xa, top, w, h);
      ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.setLineDash(z.kind === 'FVG' ? [4, 3] : []); ctx.strokeRect(xa, top, w, h); ctx.setLineDash([]);
      if (!done && h > 9) { ctx.font = '700 9px Inter, Segoe UI, sans-serif'; ctx.fillStyle = line; ctx.textBaseline = 'top'; ctx.fillText((bull ? 'Bull ' : 'Bear ') + (z.kind === 'FVG' ? 'FVG' : 'OB'), Math.min(xa + w - 46, Math.max(xa + 3, this.xi(this.lc.candles.length - 1) + 6)), top + 2); }
    }
    posBox(b, W, live) {
      const ctx = this.ctx, x1 = this.x(b.t1); if (x1 == null) return;
      const x2 = live ? this.xEnd() : this.x(b.t2), ye = this.y(b.entry);
      if (ye == null || x2 == null) return;
      const xa = Math.max(-10, x1), w = Math.max(6, x2 - xa);
      const tps = b.tps || (b.tp ? [b.tp] : []), tpTop = tps[tps.length - 1];
      if (b.sl) { const ys = this.y(b.sl); if (ys != null) { ctx.fillStyle = 'rgba(244,63,94,.18)'; ctx.fillRect(xa, Math.min(ye, ys), w, Math.abs(ys - ye)); ctx.strokeStyle = 'rgba(244,63,94,.85)'; ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(xa, ys); ctx.lineTo(xa + w, ys); ctx.stroke(); } }
      if (tpTop) { const yt = this.y(tpTop); if (yt != null) { ctx.fillStyle = 'rgba(34,197,94,.15)'; ctx.fillRect(xa, Math.min(ye, yt), w, Math.abs(yt - ye)); } }
      tps.forEach(v => { const y = this.y(v); if (y == null) return; ctx.strokeStyle = 'rgba(34,197,94,.9)'; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(xa + w, y); ctx.stroke(); ctx.setLineDash([]); });
      ctx.strokeStyle = b.dir === 'BUY' ? '#38bdf8' : '#ff7ad9'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(xa, ye); ctx.lineTo(xa + w, ye); ctx.stroke(); ctx.lineWidth = 1;
      // short tags only in the empty space after the box, never on the candles
      const tx = xa + w + 4;
      if (tx < W - 70) {
        const last = this.lc.price();
        let txt = b.dir === 'BUY' ? '▲' : '▼';
        if (last != null && b.sl) { const r = (last - b.entry) * (b.dir === 'BUY' ? 1 : -1) / Math.abs(b.entry - b.sl); txt += ` ${r >= 0 ? '+' : ''}${r.toFixed(2)}R`; }
        if (b.pl != null) txt += ' ' + GT.money(b.pl);
        this.tag(tx, ye, txt, b.dir === 'BUY' ? 'rgba(14,116,144,.95)' : 'rgba(157,23,77,.95)', '#fff');
        tps.forEach((v, i) => { const y = this.y(v); if (y != null) this.tag(tx, y, b.tps ? 'TP' + (i + 1) : 'TP', 'rgba(22,101,52,.9)', '#eafff2'); });
        if (b.sl) { const ys = this.y(b.sl); if (ys != null) this.tag(tx, ys, 'SL', 'rgba(159,18,57,.92)', '#fff'); }
      }
    }
    item(it, W, preview, selected) {
      const ctx = this.ctx, col = it.c || this.color; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = selected ? 2.5 : 1.5; ctx.setLineDash([]);
      const knobs = () => { if (!selected) return; this.handles(it).forEach(h => { ctx.fillStyle = '#05080f'; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(h[1], h[2], 5, 0, 7); ctx.fill(); ctx.stroke(); }); };
      if (it.k === 'hline') { const y = this.y(it.p); if (y == null) return; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); this.tag(W - 70, y - 9, this.fmt(it.p), col, '#111'); knobs(); return; }
      if (it.k === 'pos') { this.posBox(it, W, false); knobs(); return; }
      const ax = this.x(it.a.t), ay = this.y(it.a.p), bx = this.x(it.b.t), by = this.y(it.b.p);
      if ([ax, ay, bx, by].some(v => v == null)) return;
      if (it.k === 'trend' || it.k === 'ray') {
        let ex = bx, ey = by;
        if (it.k === 'ray' && bx !== ax) { ex = W; ey = ay + (by - ay) * (W - ax) / (bx - ax); }
        ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke();
      } else if (it.k === 'rect') {
        ctx.globalAlpha = .14; ctx.fillRect(Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax), Math.abs(by - ay)); ctx.globalAlpha = 1;
        ctx.strokeRect(Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax), Math.abs(by - ay));
      } else if (it.k === 'fib') {
        const x1 = Math.min(ax, bx), x2 = W;
        FIB.forEach((f, i) => {
          const p = it.b.p + (it.a.p - it.b.p) * f, y = this.y(p); if (y == null) return;
          ctx.globalAlpha = f === 0.5 || f === 0.618 ? 1 : .75; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.globalAlpha = 1;
          ctx.font = '600 10px Inter, Segoe UI, sans-serif'; ctx.textBaseline = 'bottom'; ctx.fillText(`${(f * 100).toFixed(1)}%  ${this.fmt(p)}`, x1 + 4, y - 2);
          if (i < FIB.length - 1) { const y2 = this.y(it.b.p + (it.a.p - it.b.p) * FIB[i + 1]); if (y2 != null) { ctx.globalAlpha = .05 + .03 * (i % 2); ctx.fillRect(x1, Math.min(y, y2), x2 - x1, Math.abs(y2 - y)); ctx.globalAlpha = 1; } }
        });
        ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]);
      } else if (it.k === 'measure' || ((it.k === 'long' || it.k === 'short') && preview)) {
        const d = it.b.p - it.a.p, pct = d / it.a.p * 100, bars = Math.round((this.idxOf(it.b.t) - this.idxOf(it.a.t)));
        ctx.fillStyle = d >= 0 ? 'rgba(34,197,94,.18)' : 'rgba(244,63,94,.18)';
        ctx.fillRect(Math.min(ax, bx), Math.min(ay, by), Math.max(2, Math.abs(bx - ax)), Math.abs(by - ay));
        this.tag(bx + 6, by, `${d >= 0 ? '+' : ''}${this.fmt(d)} (${pct.toFixed(2)}%) · ${bars} bars`, d >= 0 ? 'rgba(22,101,52,.95)' : 'rgba(159,18,57,.95)', '#fff');
      }
      knobs();
    }
  }
  function segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy;
    let t = l ? ((px - ax) * dx + (py - ay) * dy) / l : 0; t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }
  window.GTDraw = GTDraw;
})();
