/* ============================================================
   GTM AI Trade Core - web runtime
   The MetaTrader 5 functions the EA uses, made for the browser.
   The EA itself (ea.js) is the same code as the MT5 version.
   Runs in the page (PANEL) and in a Web Worker (BRIDGE).
   ============================================================ */
(function (G) {
'use strict';
const IS_WORKER = typeof window === 'undefined';
const RT = G.GTMRT = G.GTMRT || {};

/* ---------------- constants ---------------- */
const K = {
  INVALID_HANDLE: -1, WHOLE_ARRAY: -1, EMPTY_VALUE: 1.7976931348623157e308, DBL_MAX: 1.7976931348623157e308, DBL_MIN: 2.2250738585072014e-308,
  DBL_EPSILON: 2.220446049250313e-16, INT_MAX: 2147483647, INT_MIN: -2147483648, UINT_MAX: 4294967295, LONG_MAX: 9007199254740991,
  M_PI: Math.PI, M_PI_2: Math.PI / 2, M_E: Math.E, CP_ACP: 0, CP_UTF8: 65001,
  INIT_SUCCEEDED: 0, INIT_FAILED: 1, INIT_PARAMETERS_INCORRECT: 32767,
  PERIOD_CURRENT: 0, PERIOD_M1: 1, PERIOD_M2: 2, PERIOD_M3: 3, PERIOD_M5: 5, PERIOD_M10: 10, PERIOD_M15: 15, PERIOD_M30: 30,
  PERIOD_H1: 16385, PERIOD_H2: 16386, PERIOD_H4: 16388, PERIOD_H6: 16390, PERIOD_H8: 16392, PERIOD_H12: 16396, PERIOD_D1: 16408, PERIOD_W1: 32769, PERIOD_MN1: 49153,
  MODE_SMA: 0, MODE_EMA: 1, MODE_SMMA: 2, MODE_LWMA: 3, MODE_MAIN: 0, MODE_SIGNAL: 1, MODE_UPPER: 1, MODE_LOWER: 2,
  MODE_OPEN: 0, MODE_LOW: 1, MODE_HIGH: 2, MODE_CLOSE: 3, MODE_VOLUME: 4, MODE_REAL_VOLUME: 5,
  PRICE_CLOSE: 1, PRICE_OPEN: 2, PRICE_HIGH: 3, PRICE_LOW: 4, PRICE_MEDIAN: 5, PRICE_TYPICAL: 6, PRICE_WEIGHTED: 7,
  STO_LOWHIGH: 0, STO_CLOSECLOSE: 1, IND_CUSTOM: 99, TYPE_BOOL: 1, TYPE_INT: 7, TYPE_DOUBLE: 13, TYPE_STRING: 14,
  TA_LEFT: 0, TA_RIGHT: 2, TA_CENTER: 6, TA_TOP: 0, TA_BOTTOM: 8, TA_VCENTER: 24, FW_NORMAL: 400, FW_BOLD: 700, FW_DONTCARE: 0,
  COLOR_FORMAT_XRGB_NOALPHA: 0, COLOR_FORMAT_ARGB_RAW: 1, COLOR_FORMAT_ARGB_NORMALIZE: 2,
  CHARTEVENT_KEYDOWN: 0, CHARTEVENT_OBJECT_CLICK: 1, CHARTEVENT_OBJECT_DRAG: 2, CHARTEVENT_OBJECT_ENDEDIT: 3, CHARTEVENT_CLICK: 4,
  CHARTEVENT_OBJECT_DELETE: 6, CHARTEVENT_OBJECT_CREATE: 7, CHARTEVENT_OBJECT_CHANGE: 8, CHARTEVENT_CHART_CHANGE: 9,
  CHARTEVENT_MOUSE_MOVE: 10, CHARTEVENT_MOUSE_WHEEL: 11, CHARTEVENT_CUSTOM: 1000,
  CHART_SHOW: 1, CHART_MOUSE_SCROLL: 2, CHART_EVENT_MOUSE_MOVE: 3, CHART_EVENT_MOUSE_WHEEL: 4, CHART_WIDTH_IN_PIXELS: 5, CHART_HEIGHT_IN_PIXELS: 6,
  CHART_FOREGROUND: 7, CHART_SHOW_GRID: 8,
  OBJ_EDIT: 1, OBJ_LABEL: 2, OBJPROP_XDISTANCE: 1, OBJPROP_YDISTANCE: 2, OBJPROP_XSIZE: 3, OBJPROP_YSIZE: 4, OBJPROP_TEXT: 5,
  OBJPROP_FONT: 6, OBJPROP_FONTSIZE: 7, OBJPROP_COLOR: 8, OBJPROP_BGCOLOR: 9, OBJPROP_BORDER_COLOR: 10, OBJPROP_SELECTABLE: 11,
  OBJPROP_HIDDEN: 12, OBJPROP_ZORDER: 13, OBJPROP_READONLY: 14, OBJPROP_ALIGN: 15, OBJPROP_CORNER: 16, OBJPROP_BACK: 17, ALIGN_LEFT: 0, ALIGN_CENTER: 2, ALIGN_RIGHT: 1,
  FILE_READ: 1, FILE_WRITE: 2, FILE_BIN: 4, FILE_CSV: 8, FILE_TXT: 16, FILE_ANSI: 32, FILE_UNICODE: 64, FILE_SHARE_READ: 128, FILE_SHARE_WRITE: 256,
  FILE_REWRITE: 512, FILE_COMMON: 4096, SEEK_SET: 0, SEEK_CUR: 1, SEEK_END: 2, FILE_MODIFY_DATE: 1, FILE_CREATE_DATE: 2, FILE_SIZE: 3,
  TIME_DATE: 1, TIME_MINUTES: 2, TIME_SECONDS: 4,
  MQL_TESTER: 1, MQL_VISUAL_MODE: 2, MQL_TRADE_ALLOWED: 3, MQL_OPTIMIZATION: 4, MQL_DLLS_ALLOWED: 5,
  TERMINAL_TRADE_ALLOWED: 1, TERMINAL_DATA_PATH: 2, TERMINAL_CONNECTED: 3, TERMINAL_LANGUAGE: 4,
  ACCOUNT_BALANCE: 1, ACCOUNT_EQUITY: 2, ACCOUNT_MARGIN_FREE: 3, ACCOUNT_LOGIN: 4, ACCOUNT_SERVER: 5, ACCOUNT_TRADE_MODE: 6, ACCOUNT_CURRENCY: 7,
  ACCOUNT_TRADE_MODE_DEMO: 0, ACCOUNT_TRADE_MODE_CONTEST: 1, ACCOUNT_TRADE_MODE_REAL: 2,
  SYMBOL_BID: 1, SYMBOL_ASK: 2, SYMBOL_POINT: 3, SYMBOL_DIGITS: 4, SYMBOL_TRADE_TICK_VALUE: 5, SYMBOL_TRADE_TICK_SIZE: 6, SYMBOL_VOLUME_MIN: 7,
  SYMBOL_VOLUME_MAX: 8, SYMBOL_VOLUME_STEP: 9, SYMBOL_VOLUME_LIMIT: 10, SYMBOL_TRADE_STOPS_LEVEL: 11, SYMBOL_TRADE_FREEZE_LEVEL: 12,
  SYMBOL_TRADE_MODE: 13, SYMBOL_SELECT: 14, SYMBOL_PATH: 15, SYMBOL_DESCRIPTION: 16, SYMBOL_SPREAD: 17, SYMBOL_TRADE_CONTRACT_SIZE: 18,
  SYMBOL_TRADE_MODE_DISABLED: 0, SYMBOL_TRADE_MODE_LONGONLY: 1, SYMBOL_TRADE_MODE_SHORTONLY: 2, SYMBOL_TRADE_MODE_CLOSEONLY: 3, SYMBOL_TRADE_MODE_FULL: 4,
  ORDER_TYPE_BUY: 0, ORDER_TYPE_SELL: 1, POSITION_TYPE_BUY: 0, POSITION_TYPE_SELL: 1,
  POSITION_MAGIC: 1, POSITION_SYMBOL: 2, POSITION_TYPE: 3, POSITION_VOLUME: 4, POSITION_PRICE_OPEN: 5, POSITION_SL: 6, POSITION_TP: 7,
  POSITION_PROFIT: 8, POSITION_SWAP: 9, POSITION_TIME: 10, POSITION_TICKET: 11, POSITION_IDENTIFIER: 12,
  DEAL_ENTRY: 1, DEAL_ENTRY_IN: 0, DEAL_ENTRY_OUT: 1, DEAL_ENTRY_INOUT: 2, DEAL_ENTRY_OUT_BY: 3, DEAL_PROFIT: 2, DEAL_SWAP: 3, DEAL_COMMISSION: 4,
  DEAL_PRICE: 5, DEAL_POSITION_ID: 6, DEAL_MAGIC: 7, DEAL_SYMBOL: 8, DEAL_TIME: 9, DEAL_TYPE: 10,
  TRADE_RETCODE_DONE: 10009, TRADE_RETCODE_PLACED: 10008, TRADE_RETCODE_REJECT: 10006,
  ERR_WEBREQUEST_TIMEOUT: 5203, CRYPT_BASE64: 0, CRYPT_HASH_SHA256: 6,
  clrNONE: 0xFFFFFFFF, clrWhite: 0xFFFFFF, clrBlack: 0
};
Object.assign(G, K);

/* ---------------- arrays / structs ---------------- */
G._A = (n, f) => { n = Math.max(0, n | 0); const a = new Array(n); for (let i = 0; i < n; i++) a[i] = f(); return a; };
G._AFILL = (items, n, def) => { while (items.length < n) items.push(def); return items; };
G._cp = o => (o && o._cp) ? o._cp() : o;
G._R = [];
class MqlRates { constructor() { this.time = 0; this.open = 0; this.high = 0; this.low = 0; this.close = 0; this.tick_volume = 0; this.spread = 0; this.real_volume = 0; } _cp() { return Object.assign(new MqlRates(), this); } }
class MqlDateTime { constructor() { this.year = 0; this.mon = 0; this.day = 0; this.hour = 0; this.min = 0; this.sec = 0; this.day_of_week = 0; this.day_of_year = 0; } _cp() { return Object.assign(new MqlDateTime(), this); } _zm() { Object.assign(this, new MqlDateTime()); } }
class MqlTick { constructor() { this.time = 0; this.bid = 0; this.ask = 0; this.last = 0; this.volume = 0; } }
class MqlParam { constructor() { this.type = 0; this.integer_value = 0; this.double_value = 0; this.string_value = ''; } _cp() { return Object.assign(new MqlParam(), this); } }
Object.assign(G, { MqlRates, MqlDateTime, MqlTick, MqlParam });

G.ArraySize = a => a ? a.length : 0;
G.ArrayResize = (a, n, def) => {
  n = Math.max(0, n | 0);
  if (a.length > n) a.length = n;
  else { const f = typeof def === 'function' ? def : () => 0; for (let i = a.length; i < n; i++) a.push(f()); }
  return n;
};
G.ArrayFree = a => { a.length = 0; };
G.ArraySetAsSeries = (a, s) => { a._series = !!s; return true; };
G.ArrayCopy = (dst, src, ds = 0, ss = 0, cnt = -1) => {
  if (cnt < 0 || cnt === K.WHOLE_ARRAY) cnt = src.length - ss;
  cnt = Math.max(0, Math.min(cnt, src.length - ss));
  for (let i = 0; i < cnt; i++) { const v = src[ss + i]; dst[ds + i] = (v && v._cp) ? v._cp() : v; }
  return cnt;
};
G.ArrayInitialize = (a, v) => { for (let i = 0; i < a.length; i++) a[i] = v; return a.length; };
G.ArrayFill = (a, s, c, v) => { for (let i = s; i < s + c; i++) a[i] = v; };
G.ZeroMemory = a => { if (Array.isArray(a)) a.fill(0); else if (a && a._zm) a._zm(); };

/* ---------------- math ---------------- */
Object.assign(G, {
  MathAbs: Math.abs, MathMax: Math.max, MathMin: Math.min, MathSqrt: v => Math.sqrt(Math.max(0, v)), MathPow: Math.pow, MathExp: Math.exp,
  MathLog: Math.log, MathLog10: Math.log10, MathSin: Math.sin, MathCos: Math.cos, MathTan: Math.tan, MathArctan: Math.atan, MathArctan2: Math.atan2,
  MathArcsin: Math.asin, MathArccos: Math.acos, MathFloor: Math.floor, MathCeil: Math.ceil, MathMod: (a, b) => a % b,
  MathRound: v => (v < 0 ? -Math.round(-v) : Math.round(v)), MathIsValidNumber: v => Number.isFinite(v),
  MathRand: () => Math.floor(Math.random() * 32768), MathSrand: () => { },
  NormalizeDouble: (v, d) => { const p = Math.pow(10, Math.max(0, Math.min(8, d | 0))); return Math.round(v * p) / p; }
});

/* ---------------- strings ---------------- */
function fmtNum(v, d) { if (!Number.isFinite(v)) return v > 0 ? 'inf' : (v < 0 ? '-inf' : 'nan'); return v.toFixed(Math.max(0, Math.min(16, d))); }
Object.assign(G, {
  IntegerToString: (v, len = 0, fill = 32) => { let s = String(Math.trunc(v)); if (len > s.length) s = String.fromCharCode(fill).repeat(len - s.length) + s; return s; },
  DoubleToString: (v, d = 8) => fmtNum(+v, d),
  StringLen: s => s ? s.length : 0,
  StringFind: (s, f, st = 0) => (s == null ? -1 : String(s).indexOf(f, st)),
  StringSubstr: (s, st, len = -1) => { s = s == null ? '' : String(s); if (st < 0) st = 0; return len < 0 ? s.substr(st) : s.substr(st, len); },
  StringToInteger: s => { const v = parseInt(String(s).trim(), 10); return Number.isFinite(v) ? v : 0; },
  StringToDouble: s => { const v = parseFloat(String(s).trim()); return Number.isFinite(v) ? v : 0; },
  StringGetCharacter: (s, i) => (s && i >= 0 && i < s.length) ? s.charCodeAt(i) : 0,
  ShortToString: c => String.fromCharCode(c),
  CharToString: c => String.fromCharCode(c),
  StringCompare: (a, b, cs = true) => { if (!cs) { a = a.toLowerCase(); b = b.toLowerCase(); } return a < b ? -1 : (a > b ? 1 : 0); },
  StringSplit: (s, sep, out) => { out.length = 0; if (s == null || s === '') return 0; String(s).split(String.fromCharCode(sep)).forEach(x => out.push(x)); return out.length; },
  StringToLower: s => { G._R = [String(s).toLowerCase()]; return true; },
  StringToUpper: s => { G._R = [String(s).toUpperCase()]; return true; },
  StringTrimLeft: s => { const r = String(s).replace(/^[\s]+/, ''); G._R = [r]; return s.length - r.length; },
  StringTrimRight: s => { const r = String(s).replace(/[\s]+$/, ''); G._R = [r]; return s.length - r.length; },
  StringReplace: (s, a, b) => { s = String(s); if (a === '') { G._R = [s]; return 0; } const parts = s.split(a); G._R = [parts.join(b)]; return parts.length - 1; },
  StringFormat: (f, ...a) => { let i = 0; return String(f).replace(/%(0?)(\d*)(?:\.(\d+))?([dixXfsg%])/g, (m, z, w, p, t) => {
      if (t === '%') return '%'; let v = a[i++]; let r;
      if (t === 'x' || t === 'X') { r = (Number(v) >>> 0).toString(16); if (t === 'X') r = r.toUpperCase(); }
      else if (t === 'd' || t === 'i') r = String(Math.trunc(v));
      else if (t === 'f') r = (+v).toFixed(p === undefined ? 6 : +p);
      else if (t === 'g') r = String(+v);
      else r = String(v);
      if (w && r.length < +w) r = (z ? '0' : ' ').repeat(+w - r.length) + r;
      return r; }); },
  StringToCharArray: (s, arr, start = 0, count = -1, cp = 0) => {
    s = String(s == null ? '' : s); let bytes;
    if (cp === K.CP_UTF8) bytes = new TextEncoder().encode(s); else { bytes = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i) & 255; }
    const n = (count < 0) ? bytes.length + 1 : Math.min(count, bytes.length + 1);
    if (arr.length < start + n) arr.length = start + n;
    for (let i = 0; i < n; i++) arr[start + i] = i < bytes.length ? bytes[i] : 0;
    return n;
  },
  CharArrayToString: (arr, start = 0, count = -1, cp = 0) => {
    let end = (count < 0) ? arr.length : Math.min(arr.length, start + count);
    let z = start; while (z < end && arr[z] !== 0) z++; end = z;
    const u = new Uint8Array(Math.max(0, end - start)); for (let i = start; i < end; i++) u[i - start] = arr[i] & 255;
    if (cp === K.CP_UTF8) return new TextDecoder('utf-8').decode(u);
    let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return s;
  },
  CryptEncode: (method, data, key, out) => {   // base64 only
    let bin = ''; for (let i = 0; i < data.length; i++) bin += String.fromCharCode(data[i] & 255);
    const b = btoa(bin); out.length = 0; for (let i = 0; i < b.length; i++) out.push(b.charCodeAt(i)); return out.length;
  },
  CryptDecode: (method, data, key, out) => {
    let s = ''; for (let i = 0; i < data.length; i++) s += String.fromCharCode(data[i] & 255);
    let bin = ''; try { bin = atob(s); } catch (e) { out.length = 0; return 0; }
    out.length = 0; for (let i = 0; i < bin.length; i++) out.push(bin.charCodeAt(i)); return out.length;
  },
  ColorToARGB: (c, a = 255) => (((a & 255) << 24) | ((c & 255) << 16) | (c & 0xFF00) | ((c >> 16) & 255)) >>> 0
});

/* ---------------- time ---------------- */
const T0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
RT.lastServer = 0;     // newest tick time seen (seconds, UTC)
G.GetTickCount = () => Math.floor((typeof performance !== 'undefined' ? performance.now() : Date.now()) - T0) + 1000;
G.GetMicrosecondCount = () => Math.floor(((typeof performance !== 'undefined' ? performance.now() : Date.now()) - T0) * 1000);
G.TimeLocal = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 1000);
G.TimeGMT = () => Math.floor(Date.now() / 1000);
G.TimeCurrent = () => Math.max(RT.lastServer, 0) || Math.floor(Date.now() / 1000);
G.TimeTradeServer = () => Math.floor(Date.now() / 1000);
G.TimeToStruct = (t, dt) => {
  const d = new Date(t * 1000);
  dt.year = d.getUTCFullYear(); dt.mon = d.getUTCMonth() + 1; dt.day = d.getUTCDate(); dt.hour = d.getUTCHours(); dt.min = d.getUTCMinutes(); dt.sec = d.getUTCSeconds();
  dt.day_of_week = d.getUTCDay(); dt.day_of_year = Math.floor((Date.UTC(dt.year, dt.mon - 1, dt.day) - Date.UTC(dt.year, 0, 1)) / 86400000);
  return true;
};
G.StructToTime = dt => Math.floor(Date.UTC(dt.year, dt.mon - 1, dt.day, dt.hour, dt.min, dt.sec) / 1000);
const p2 = v => (v < 10 ? '0' : '') + v;
G.TimeToString = (t, f = 3) => {
  const d = new Date(t * 1000); let s = '';
  if (f & 1) s = d.getUTCFullYear() + '.' + p2(d.getUTCMonth() + 1) + '.' + p2(d.getUTCDate());
  if (f & 6) { s += (s ? ' ' : '') + p2(d.getUTCHours()) + ':' + p2(d.getUTCMinutes()); if (f & 4) s += ':' + p2(d.getUTCSeconds()); }
  return s;
};
G.StringToTime = s => { const m = String(s).match(/(\d{4})[.\-](\d{1,2})[.\-](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/); if (!m) return 0; return Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0)) / 1000); };
G.PeriodSeconds = tf => { const m = { 1: 60, 2: 120, 3: 180, 5: 300, 10: 600, 15: 900, 30: 1800, 16385: 3600, 16386: 7200, 16388: 14400, 16390: 21600, 16392: 28800, 16396: 43200, 16408: 86400, 32769: 604800, 49153: 2592000 }; return m[tf] || 60; };
G.Sleep = ms => { const end = Date.now() + Math.min(ms, 3000); if (IS_WORKER) { while (Date.now() < end) { } } };

/* ---------------- terminal / log ---------------- */
let lastErr = 0;
Object.assign(G, {
  GetLastError: () => lastErr, ResetLastError: () => { lastErr = 0; }, SetUserError: () => { },
  Print: (...a) => { if (RT.debug) console.log('[EA]', a.join('')); },
  PrintFormat: (...a) => { }, Comment: (...a) => { RT.onComment && RT.onComment(a.join('')); },
  Alert: (...a) => { RT.onAlert ? RT.onAlert(a.join('')) : console.warn(a.join('')); },
  IsStopped: () => false, ExpertRemove: () => { },
  MQLInfoInteger: p => p === K.MQL_TRADE_ALLOWED ? 1 : 0,
  MQLInfoString: () => 'GTM_AI_TradeCore',
  TerminalInfoInteger: p => p === K.TERMINAL_TRADE_ALLOWED ? 1 : (p === K.TERMINAL_CONNECTED ? 1 : 0),
  TerminalInfoString: p => p === K.TERMINAL_DATA_PATH ? 'WEB' : '',
  AccountInfoDouble: p => 0, AccountInfoInteger: p => p === K.ACCOUNT_LOGIN ? 0 : (p === K.ACCOUNT_TRADE_MODE ? K.ACCOUNT_TRADE_MODE_DEMO : 0),
  AccountInfoString: p => 'G TRADERS web simulator',
  EventSetMillisecondTimer: ms => { RT.timerMs = Math.max(16, ms | 0); RT.onTimerSet && RT.onTimerSet(RT.timerMs); return true; },
  EventSetTimer: s => G.EventSetMillisecondTimer(s * 1000), EventKillTimer: () => { RT.onTimerSet && RT.onTimerSet(0); },
  ChartID: () => 1, ChartRedraw: () => { }, ChartSetInteger: () => true,
  ChartGetInteger: (c, p) => p === K.CHART_WIDTH_IN_PIXELS ? RT.W : (p === K.CHART_HEIGHT_IN_PIXELS ? RT.H : (p === K.CHART_SHOW ? 1 : 0)),
  ChartScreenShot: () => false, ChartSymbol: () => RT.symbols[0] ? RT.symbols[0].name : '', Symbol: () => '', Period: () => 1
});

/* ---------------- files (kept in the browser) ---------------- */
const FS = RT.FS = new Map();          // name (lower case) -> {name, data:Uint8Array, mtime}
const LS_KEY = 'gtmai_fs_';
const PERSIST = n => !/\\bridge\\/i.test(n) && !/\\voice\\/i.test(n) && !IS_WORKER;
function fkey(n) { return String(n).replace(/\//g, '\\').toLowerCase(); }
function b64(u8) { let s = ''; for (let i = 0; i < u8.length; i += 8192) s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return btoa(s); }
function unb64(s) { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }
RT.fsLoad = () => {
  if (IS_WORKER) return;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i); if (!k || !k.startsWith(LS_KEY)) continue;
      const o = JSON.parse(localStorage.getItem(k)); FS.set(fkey(o.n), { name: o.n, data: unb64(o.d), mtime: o.t });
    }
  } catch (e) { }
};
function persist(f) {
  if (!PERSIST(f.name)) return;
  try { localStorage.setItem(LS_KEY + fkey(f.name), JSON.stringify({ n: f.name, d: b64(f.data), t: f.mtime })); } catch (e) { }
}
function unpersist(name) { try { localStorage.removeItem(LS_KEY + fkey(name)); } catch (e) { } }
RT.fsPut = (name, data, quiet) => { const f = { name, data, mtime: G.TimeLocal() }; FS.set(fkey(name), f); persist(f); if (!quiet) RT.onFileWrite && RT.onFileWrite(name, data); };
RT.fsDel = (name, quiet) => { FS.delete(fkey(name)); unpersist(name); if (!quiet) RT.onFileDelete && RT.onFileDelete(name); };
const handles = []; let hseq = 0;
G.FileOpen = (name, flags) => {
  const k = fkey(name); let f = FS.get(k);
  if (flags & K.FILE_WRITE) {
    if (!f || !(flags & K.FILE_READ)) { f = { name, data: new Uint8Array(0), mtime: G.TimeLocal() }; FS.set(k, f); }
  } else if (!f) { lastErr = 5004; return -1; }
  const h = ++hseq; handles[h] = { f, pos: 0, flags, dirty: !!(flags & K.FILE_WRITE) && !(flags & K.FILE_READ), buf: Array.from(f.data) };
  return h;
};
function H(h) { return handles[h]; }
G.FileClose = h => { const o = H(h); if (!o) return; if (o.dirty) { o.f.data = Uint8Array.from(o.buf); o.f.mtime = G.TimeLocal(); persist(o.f); RT.onFileWrite && RT.onFileWrite(o.f.name, o.f.data); } delete handles[h]; };
G.FileSize = h => { const o = H(h); return o ? o.buf.length : 0; };
G.FileTell = h => { const o = H(h); return o ? o.pos : 0; };
G.FileSeek = (h, off, org) => { const o = H(h); if (!o) return false; o.pos = org === K.SEEK_END ? o.buf.length + off : (org === K.SEEK_CUR ? o.pos + off : off); return true; };
G.FileIsEnding = h => { const o = H(h); return !o || o.pos >= o.buf.length; };
G.FileFlush = () => { };
G.FileReadString = (h, len = -1) => {
  const o = H(h); if (!o) return '';
  let e = o.pos; while (e < o.buf.length && o.buf[e] !== 10) e++;
  let end = e; if (end > o.pos && o.buf[end - 1] === 13) end--;
  const u = Uint8Array.from(o.buf.slice(o.pos, end)); o.pos = Math.min(o.buf.length, e + 1);
  return new TextDecoder('utf-8').decode(u);
};
G.FileWriteString = (h, s) => {
  const o = H(h); if (!o) return 0; const u = new TextEncoder().encode(String(s));
  for (let i = 0; i < u.length; i++) o.buf[o.pos + i] = u[i]; o.pos += u.length; o.dirty = true; return u.length;
};
G.FileReadArray = (h, arr, start = 0, cnt = -1) => {
  const o = H(h); if (!o) return 0; const n = cnt < 0 ? o.buf.length - o.pos : Math.min(cnt, o.buf.length - o.pos);
  if (arr.length < start + n) arr.length = start + n;
  for (let i = 0; i < n; i++) arr[start + i] = o.buf[o.pos + i]; o.pos += n; return n;
};
G.FileWriteArray = (h, arr, start = 0, cnt = -1) => {
  const o = H(h); if (!o) return 0; const n = cnt < 0 ? arr.length - start : Math.min(cnt, arr.length - start);
  for (let i = 0; i < n; i++) o.buf[o.pos + i] = arr[start + i] & 255; o.pos += n; o.dirty = true; return n;
};
G.FileIsExist = n => FS.has(fkey(n));
G.FileDelete = n => { if (!FS.has(fkey(n))) return false; RT.fsDel(n); return true; };
G.FileMove = (a, c, b, flags) => { const f = FS.get(fkey(a)); if (!f) return false; FS.delete(fkey(a)); unpersist(a); const g = { name: b, data: f.data, mtime: G.TimeLocal() }; FS.set(fkey(b), g); persist(g); RT.onFileWrite && RT.onFileWrite(b, g.data, a); return true; };
G.FileCopy = (a, c, b) => { const f = FS.get(fkey(a)); if (!f) return false; RT.fsPut(b, f.data.slice()); return true; };
G.FileGetInteger = (n, p) => { const f = FS.get(fkey(n)); if (!f) return 0; return p === K.FILE_MODIFY_DATE || p === K.FILE_CREATE_DATE ? f.mtime : f.data.length; };
G.FolderCreate = () => true; G.FolderDelete = () => true;
const finds = []; let fseq = 0;
G.FileFindFirst = (pattern, fn) => {
  const p = fkey(pattern); const dir = p.slice(0, p.lastIndexOf('\\') + 1); const mask = p.slice(dir.length);
  const re = new RegExp('^' + mask.replace(/[.+^${}()|[\]]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
  const list = [...FS.values()].map(f => f.name).filter(n => { const k = fkey(n); return k.startsWith(dir) && !k.slice(dir.length).includes('\\') && re.test(k.slice(dir.length)); })
    .map(n => n.slice(n.replace(/\//g, '\\').lastIndexOf('\\') + 1)).sort();
  if (!list.length) { G._R = ['']; return -1; }
  const h = ++fseq; finds[h] = { list, i: 1 }; G._R = [list[0]]; return h;
};
G.FileFindNext = (h, fn) => { const o = finds[h]; if (!o || o.i >= o.list.length) { G._R = [fn]; return false; } G._R = [o.list[o.i++]]; return true; };
G.FileFindClose = h => { delete finds[h]; };

/* ---------------- hash map ---------------- */
class CHashMap {
  constructor() { this.m = new Map(); }
  Add(k, v) { if (this.m.has(k)) return false; this.m.set(k, v); return true; }
  TrySetValue(k, v) { this.m.set(k, v); return true; }
  TryGetValue(k, v) { if (this.m.has(k)) { G._R = [this.m.get(k)]; return true; } G._R = [v]; return false; }
  ContainsKey(k) { return this.m.has(k); }
  Remove(k) { return this.m.delete(k); }
  Clear() { this.m.clear(); }
  Count() { return this.m.size; }
  CopyTo(keys, vals) { keys.length = 0; if (vals) vals.length = 0; this.m.forEach((v, k) => { keys.push(k); if (vals) vals.push(v); }); return this.m.size; }
}
G.CHashMap = CHashMap;

/* ---------------- chart objects (only edit boxes are used: shown as real inputs) ---------------- */
RT.objs = new Map();
G.ObjectCreate = (c, name, type) => { if (!RT.objs.has(name)) RT.objs.set(name, { name, type, i: {}, s: {} }); RT.onObj && RT.onObj(name, 'create'); return true; };
G.ObjectFind = (c, name) => RT.objs.has(name) ? 0 : -1;
G.ObjectDelete = (c, name) => { RT.objs.delete(name); RT.onObj && RT.onObj(name, 'delete'); return true; };
G.ObjectSetInteger = (c, name, p, v) => { const o = RT.objs.get(name); if (!o) return false; o.i[p] = v; RT.onObj && RT.onObj(name, 'set'); return true; };
G.ObjectSetString = (c, name, p, v) => { const o = RT.objs.get(name); if (!o) return false; o.s[p] = v; RT.onObj && RT.onObj(name, 'set', p); return true; };
G.ObjectGetString = (c, name, p) => { const o = RT.objs.get(name); return o ? (o.s[p] || '') : ''; };
G.ObjectGetInteger = (c, name, p) => { const o = RT.objs.get(name); return o ? (o.i[p] || 0) : 0; };
G.ObjectsDeleteAll = () => { RT.objs.clear(); };

/* ---------------- sound ---------------- */
RT.sound = { play: () => false, stop: () => { } };
G.PlaySound = f => { if (f == null) { RT.sound.stop(); return true; } return RT.sound.play(String(f)); };

/* ---------------- trading: the web version is SIMULATOR only ---------------- */
class CTrade {
  SetExpertMagicNumber() { } SetDeviationInPoints() { } SetTypeFillingBySymbol() { return true; } SetTypeFilling() { }
  Buy() { return false; } Sell() { return false; } PositionClose() { return false; } PositionModify() { return false; }
  ResultRetcode() { return K.TRADE_RETCODE_REJECT; } ResultRetcodeDescription() { return 'LIVE trading is only in MetaTrader 5'; }
  ResultOrder() { return 0; } ResultDeal() { return 0; } ResultPrice() { return 0; }
}
G.CTrade = CTrade;
Object.assign(G, {
  PositionsTotal: () => 0, PositionGetTicket: () => 0, PositionSelectByTicket: () => false, PositionSelect: () => false,
  PositionGetInteger: () => 0, PositionGetDouble: () => 0, PositionGetString: () => '',
  HistorySelect: () => false, HistorySelectByPosition: () => false, HistoryDealsTotal: () => 0, HistoryDealGetTicket: () => 0,
  HistoryDealSelect: () => false, HistoryDealGetInteger: () => 0, HistoryDealGetDouble: () => 0, HistoryDealGetString: () => '',
  OrderCalcMargin: (t, s, lot, px) => { G._R = [0]; return true; }
});

/* ---------------- network (BRIDGE only, in the worker) ---------------- */
G.WebRequest = (method, url, headers, timeout, data, result, rhdr) => {
  if (RT.webRequest) return RT.webRequest(method, url, headers, timeout, data, result);
  lastErr = 4014; return -1;
};
})(typeof self !== 'undefined' ? self : this);
