/* ============================================================
   GTM AI web - the panel canvas (same pixel maths as the MT5 CJCanvas)
   Pixels are kept as ARGB like in MetaTrader; Update() shows them.
   ============================================================ */
(function (G) {
'use strict';
const RT = G.GTMRT;

class CJCanvas {
  constructor() { this.m_width = 0; this.m_height = 0; this.m_pixels = new Uint32Array(0); this.font = { name: 'Bahnschrift', px: 12, w: 400 }; this.cache = new Map(); }
  CreateBitmapLabel(name, x, y, w, h, fmt) { this.Resize(w, h); return true; }
  Resize(w, h) {
    this.m_width = w | 0; this.m_height = h | 0; this.m_pixels = new Uint32Array(this.m_width * this.m_height);
    if (RT.view) RT.view.resize(this.m_width, this.m_height);
    return true;
  }
  Destroy() { }
  W() { return this.m_width; } H() { return this.m_height; }
  Erase(c = 0) { this.m_pixels.fill((c | 0xFF000000) >>> 0); }
  Update() { if (RT.view) RT.view.show(this.m_pixels, this.m_width, this.m_height); }
  SaveTo(dst) { dst.length = 0; dst._px = this.m_pixels.slice(); dst.length = this.m_pixels.length; }
  LoadFrom(src) { if (!src._px || src._px.length !== this.m_pixels.length) return false; this.m_pixels.set(src._px); return true; }

  /* ---- the EA's own helpers (same maths) ---- */
  BlendPx(x, y, c, a) {
    if (x < 0 || y < 0 || x >= this.m_width || y >= this.m_height || a <= 0) return;
    if (a > 255) a = 255;
    a = a | 0;
    const i = y * this.m_width + x, d = this.m_pixels[i];
    const dr = (d >>> 16) & 255, dg = (d >>> 8) & 255, db = d & 255;
    const sr = (c >>> 16) & 255, sg = (c >>> 8) & 255, sb = c & 255;
    const r = ((sr * a + dr * (255 - a)) / 255) | 0, g = ((sg * a + dg * (255 - a)) / 255) | 0, b = ((sb * a + db * (255 - a)) / 255) | 0;
    this.m_pixels[i] = (0xFF000000 | (r << 16) | (g << 8) | b) >>> 0;
  }
  RectA(x1, y1, x2, y2, c, a) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0;
    if (x1 > x2) { const t = x1; x1 = x2; x2 = t; }
    if (y1 > y2) { const t = y1; y1 = y2; y2 = t; }
    if (x1 < 0) x1 = 0; if (y1 < 0) y1 = 0;
    if (x2 >= this.m_width) x2 = this.m_width - 1; if (y2 >= this.m_height) y2 = this.m_height - 1;
    if (a <= 0) return; if (a > 255) a = 255;
    const sr = (c >>> 16) & 255, sg = (c >>> 8) & 255, sb = c & 255, W = this.m_width, P = this.m_pixels, ia = 255 - a;
    for (let y = y1; y <= y2; y++) {
      let i = y * W + x1;
      for (let x = x1; x <= x2; x++, i++) {
        const d = P[i];
        P[i] = (0xFF000000 | ((((sr * a + ((d >>> 16) & 255) * ia) / 255) | 0) << 16) | ((((sg * a + ((d >>> 8) & 255) * ia) / 255) | 0) << 8) | (((sb * a + (d & 255) * ia) / 255) | 0)) >>> 0;
      }
    }
  }
  CircleA(cx, cy, r, c, a) {
    cx |= 0; cy |= 0; r |= 0; if (r <= 0) return;
    const rr = r * r;
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= rr) this.BlendPx(cx + x, cy + y, c, a);
  }
  Glow(cx, cy, r, c, amax) {
    cx |= 0; cy |= 0; r |= 0; if (r <= 0) return;
    const rr = r * r;
    for (let y = -r; y <= r; y++) {
      const yy = cy + y; if (yy < 0 || yy >= this.m_height) continue;
      for (let x = -r; x <= r; x++) {
        const d = (x * x + y * y) / rr;
        if (d < 1.0) this.BlendPx(cx + x, yy, c, (amax * (1.0 - d) * (1.0 - d)) | 0);
      }
    }
  }
  DotA(x, y, r, c, a) {
    const ir = Math.ceil(r) + 1, cx = Math.round(x), cy = Math.round(y);
    for (let yy = -ir; yy <= ir; yy++) for (let xx = -ir; xx <= ir; xx++) {
      const dx = cx + xx - x, dy = cy + yy - y, d = Math.sqrt(dx * dx + dy * dy), k = r + 0.5 - d;
      if (k > 0) this.BlendPx(cx + xx, cy + yy, c, (a * Math.min(1.0, k)) | 0);
    }
  }
  ArcA(cx, cy, r, a0, a1, th, c, a) {
    if (a1 < a0) { const t = a0; a0 = a1; a1 = t; }
    const len = (a1 - a0) * r, n = Math.trunc(Math.min(Math.max(2, len / 1.2), 20000));
    for (let i = 0; i <= n; i++) { const an = a0 + (a1 - a0) * i / n; this.DotA(cx + r * Math.cos(an), cy + r * Math.sin(an), th / 2.0, c, a); }
  }
  LineT(x1, y1, x2, y2, th, c, a) {
    const len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    const n = Math.trunc(Math.min(Math.max(1, len), 4.0 * (this.m_width + this.m_height)));
    for (let i = 0; i <= n; i++) this.DotA(x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n, th / 2.0, c, a);
  }
  RoundFill(x1, y1, x2, y2, r, c, a) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0;
    if (x1 > x2) { const t = x1; x1 = x2; x2 = t; }
    if (y1 > y2) { const t = y1; y1 = y2; y2 = t; }
    const ww = x2 - x1 + 1, hh = y2 - y1 + 1;
    if (r > ww / 2) r = ww / 2; if (r > hh / 2) r = hh / 2; if (r < 0) r = 0;
    const ya = y1 < 0 ? 0 : y1, yb = y2 >= this.m_height ? this.m_height - 1 : y2;
    for (let y = ya; y <= yb; y++) {
      const yc = y + 0.5, tp = y1 + r, bt = y2 + 1 - r; let ins = 0;
      if (yc < tp) { const d = tp - yc; ins = r - Math.sqrt(Math.max(0, r * r - d * d)); }
      else if (yc > bt) { const d = yc - bt; ins = r - Math.sqrt(Math.max(0, r * r - d * d)); }
      const xl = x1 + ins, xr = x2 + 1 - ins;
      if (xr <= xl) continue;
      let xa = Math.floor(xl), xb = Math.ceil(xr) - 1;
      if (xa < 0) xa = 0; if (xb >= this.m_width) xb = this.m_width - 1;
      if (xb - xa > 2) {
        // middle of the row is fully covered: one fast blend
        const c0 = Math.min(xa + 1.0, xr) - Math.max(xa, xl);
        if (c0 >= 1) this.BlendPx(xa, y, c, a); else if (c0 > 0) this.BlendPx(xa, y, c, (a * c0) | 0);
        if (xa + 1 <= xb - 1) this.RectA(xa + 1, y, xb - 1, y, c, a);
        const c1 = Math.min(xb + 1.0, xr) - Math.max(xb, xl);
        if (c1 >= 1) this.BlendPx(xb, y, c, a); else if (c1 > 0) this.BlendPx(xb, y, c, (a * c1) | 0);
        continue;
      }
      for (let x = xa; x <= xb; x++) {
        const cov = Math.min(x + 1.0, xr) - Math.max(x, xl);
        if (cov >= 1.0) this.BlendPx(x, y, c, a); else if (cov > 0) this.BlendPx(x, y, c, (a * cov) | 0);
      }
    }
  }
  RoundBorder(x1, y1, x2, y2, r, c, a, th) {
    const ww = x2 - x1, hh = y2 - y1;
    if (r > ww / 2) r = ww / 2; if (r > hh / 2) r = hh / 2; if (r < 1) r = 1;
    this.LineT(x1 + r, y1, x2 - r, y1, th, c, a);
    this.LineT(x1 + r, y2, x2 - r, y2, th, c, a);
    this.LineT(x1, y1 + r, x1, y2 - r, th, c, a);
    this.LineT(x2, y1 + r, x2, y2 - r, th, c, a);
    this.ArcA(Math.trunc(x1 + r), Math.trunc(y1 + r), r, Math.PI, Math.PI * 1.5, th, c, a);
    this.ArcA(Math.trunc(x2 - r), Math.trunc(y1 + r), r, Math.PI * 1.5, Math.PI * 2, th, c, a);
    this.ArcA(Math.trunc(x2 - r), Math.trunc(y2 - r), r, 0, Math.PI * 0.5, th, c, a);
    this.ArcA(Math.trunc(x1 + r), Math.trunc(y2 - r), r, Math.PI * 0.5, Math.PI, th, c, a);
  }

  /* ---- CCanvas basics (solid colour, no blending) ---- */
  PixelSet(x, y, c) { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= this.m_width || y >= this.m_height) return; this.m_pixels[y * this.m_width + x] = (c | 0xFF000000) >>> 0; }
  FillRectangle(x1, y1, x2, y2, c) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0;
    if (x1 > x2) { const t = x1; x1 = x2; x2 = t; } if (y1 > y2) { const t = y1; y1 = y2; y2 = t; }
    x1 = Math.max(0, x1); y1 = Math.max(0, y1); x2 = Math.min(this.m_width - 1, x2); y2 = Math.min(this.m_height - 1, y2);
    const v = (c | 0xFF000000) >>> 0;
    for (let y = y1; y <= y2; y++) this.m_pixels.fill(v, y * this.m_width + x1, y * this.m_width + x2 + 1);
  }
  Rectangle(x1, y1, x2, y2, c) { this.Line(x1, y1, x2, y1, c); this.Line(x2, y1, x2, y2, c); this.Line(x2, y2, x1, y2, c); this.Line(x1, y2, x1, y1, c); }
  Line(x1, y1, x2, y2, c) {
    x1 |= 0; y1 |= 0; x2 |= 0; y2 |= 0;
    const dx = Math.abs(x2 - x1), dy = -Math.abs(y2 - y1), sx = x1 < x2 ? 1 : -1, sy = y1 < y2 ? 1 : -1; let e = dx + dy, n = 0;
    while (n++ < 20000) { this.PixelSet(x1, y1, c); if (x1 === x2 && y1 === y2) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x1 += sx; } if (e2 <= dx) { e += dx; y1 += sy; } }
  }
  LineHorizontal(x1, x2, y, c) { this.Line(x1, y, x2, y, c); }
  LineVertical(x, y1, y2, c) { this.Line(x, y1, x, y2, c); }
  FillCircle(cx, cy, r, c) { cx |= 0; cy |= 0; r |= 0; const rr = r * r; for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= rr) this.PixelSet(cx + x, cy + y, c); }
  Circle(cx, cy, r, c) { const n = Math.max(8, Math.trunc(r * 6)); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; this.PixelSet(cx + Math.round(r * Math.cos(a)), cy + Math.round(r * Math.sin(a)), c); } }
  FillTriangle(x1, y1, x2, y2, x3, y3, c) {
    const minY = Math.max(0, Math.min(y1, y2, y3) | 0), maxY = Math.min(this.m_height - 1, Math.max(y1, y2, y3) | 0);
    const ed = [[x1, y1, x2, y2], [x2, y2, x3, y3], [x3, y3, x1, y1]];
    for (let y = minY; y <= maxY; y++) {
      const yc = y + 0.5, xs = [];
      for (const [ax, ay, bx, by] of ed) { if ((ay <= yc && by > yc) || (by <= yc && ay > yc)) xs.push(ax + (yc - ay) * (bx - ax) / (by - ay)); }
      if (xs.length < 2) continue;
      const a = Math.min(xs[0], xs[1]), b = Math.max(xs[0], xs[1]);
      const xa = Math.max(0, Math.round(a)), xb = Math.min(this.m_width - 1, Math.round(b) - 1);
      if (xb >= xa) this.m_pixels.fill((c | 0xFF000000) >>> 0, y * this.m_width + xa, y * this.m_width + xb + 1);
    }
  }

  /* ---- text (GDI-like) ---- */
  FontSet(name, size, flags = 400, angle = 0) {
    // CCanvas: negative size = tenths of a point
    const px = size < 0 ? (-size / 10) * 96 / 72 : size;
    this.font = { name, px: Math.max(6, px), w: flags >= 700 ? 700 : 400 };
    return true;
  }
  _css() { const f = this.font; return f.w + ' ' + f.px.toFixed(1) + 'px ' + RT.fontStack(f.name); }
  TextWidth(s) { return Math.ceil(RT.measure(this._css(), String(s)).w); }
  TextHeight(s) { return Math.ceil(this.font.px * 1.2); }
  TextSize(s, w, h) { const m = RT.measure(this._css(), String(s)); G._R = [Math.ceil(m.w), Math.ceil(this.font.px * 1.2)]; }
  TextOut(x, y, s, c, al = 0) {
    s = String(s); if (s === '') return;
    const g = RT.glyphs(this._css(), s); if (!g) return;
    let ox = x | 0, oy = y | 0;
    const h = al & 0x7, v = al & 0x18;
    if (h === 6) ox -= Math.round(g.w / 2); else if (h === 2) ox -= g.w;
    if (v === 24) oy -= Math.round(g.h / 2); else if (v === 8) oy -= g.h;
    const A = g.a, gw = g.cw, gh = g.ch, x0 = ox - g.pad, y0 = oy;
    const ca = (c >>> 24) & 255 || 255;
    for (let yy = 0; yy < gh; yy++) {
      const py = y0 + yy; if (py < 0 || py >= this.m_height) continue;
      for (let xx = 0; xx < gw; xx++) {
        const al8 = A[yy * gw + xx]; if (!al8) continue;
        this.BlendPx(x0 + xx, py, c, ca === 255 ? al8 : (al8 * ca / 255) | 0);
      }
    }
  }
}
G.CJCanvas = CJCanvas;

/* ---- text rasteriser with a cache ---- */
const FONT_MAP = { 'bahnschrift': "'Bahnschrift','Barlow Semi Condensed','Barlow','Segoe UI',sans-serif" };
RT.fontStack = n => FONT_MAP[String(n).toLowerCase()] || ("'" + n + "','Barlow Semi Condensed','Segoe UI',sans-serif");
let mctx = null;
function ctx() {
  if (mctx) return mctx;
  const c = (typeof OffscreenCanvas !== 'undefined') ? new OffscreenCanvas(8, 8) : document.createElement('canvas');
  mctx = c.getContext('2d', { willReadFrequently: true });
  return mctx;
}
const mcache = new Map();
RT.measure = (css, s) => {
  const k = css + '|' + s; let m = mcache.get(k);
  if (m) return m;
  const c = ctx(); c.font = css; const t = c.measureText(s);
  m = { w: t.width, asc: t.fontBoundingBoxAscent || t.actualBoundingBoxAscent || 10, desc: t.fontBoundingBoxDescent || 3 };
  if (mcache.size > 6000) mcache.clear();
  mcache.set(k, m); return m;
};
const gcache = new Map();
RT.glyphs = (css, s) => {
  const k = css + '|' + s; let g = gcache.get(k);
  if (g) { gcache.delete(k); gcache.set(k, g); return g; }
  const m = RT.measure(css, s);
  const pad = 2, w = Math.ceil(m.w), h = Math.ceil(m.asc + m.desc);
  const cw = w + pad * 2, ch = h + 1;
  if (cw <= 0 || ch <= 0 || cw > 4000) return null;
  const c = ctx();
  if (c.canvas.width < cw || c.canvas.height < ch) { c.canvas.width = Math.max(c.canvas.width, cw); c.canvas.height = Math.max(c.canvas.height, ch); }
  c.clearRect(0, 0, cw, ch);
  c.font = css; c.fillStyle = '#fff'; c.textBaseline = 'alphabetic';
  c.fillText(s, pad, Math.round(m.asc));
  const d = c.getImageData(0, 0, cw, ch).data, a = new Uint8Array(cw * ch);
  for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
  g = { a, cw, ch, w, h, pad };
  if (gcache.size > 2500) { const it = gcache.keys(); for (let i = 0; i < 500; i++) gcache.delete(it.next().value); }
  gcache.set(k, g);
  return g;
};
})(typeof self !== 'undefined' ? self : this);
