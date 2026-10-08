/* ============================================================
   G TRADERS — site content managed from the control panel
     products   : every text / picture of a product (overrides config.js), new products
     files      : PDF guides uploaded from the PC (kept in the database in pieces)
     posts      : the "Updates" page — posts with text / HTML, pictures, a video link,
                  likes and comments
   Firebase mode keeps them in Firestore (firestore.rules: everyone reads, only the admin writes;
   users may only like and write / delete their own comments). Test mode keeps them in this browser.
   ============================================================ */
(function () {
  const S = GT.store, FB = () => GT.auth.mode === 'firebase' && window.firebase, db = () => firebase.firestore();
  const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const me = () => GT.auth.current();
  const myId = () => { const u = me(); return u ? (u.id || u.email) : null; };
  const LS = { products: 'gt_products_ov', files: 'gt_c_files', posts: 'gt_c_posts', comments: 'gt_c_comments' };
  const CHUNK = 900000;           // characters of base64 per database document (limit is 1 MB)
  const MAX_PDF = 10 * 1024 * 1024;

  /* ---------- pictures: shrink in the browser before saving ---------- */
  GT.imgToData = (file, max, q) => new Promise((res, rej) => {
    if (!file || !/^image\//.test(file.type)) return rej(new Error('Choose a picture file (JPG, PNG or WEBP).'));
    max = max || 1200; q = q || 0.8;
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height)), w = Math.round(img.width * k), h = Math.round(img.height * k);
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const x = cv.getContext('2d'); x.drawImage(img, 0, 0, w, h); URL.revokeObjectURL(url);
      let d = cv.toDataURL('image/webp', q);
      if (!/^data:image\/webp/.test(d)) { x.globalCompositeOperation = 'destination-over'; x.fillStyle = '#060b16'; x.fillRect(0, 0, w, h); d = cv.toDataURL('image/jpeg', q); }
      if (d.length > 700000) { cv.width = Math.round(w * .7); cv.height = Math.round(h * .7); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); d = cv.toDataURL('image/jpeg', .72); }
      res(d);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('This picture could not be opened.')); };
    img.src = url;
  });
  const fileB64 = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] || ''); r.onerror = () => rej(new Error('Could not read the file.')); r.readAsDataURL(f); });

  /* ---------- safe HTML for posts (the admin writes it; scripts and event handlers are still removed) ---------- */
  GT.cleanHtml = html => {
    const doc = new DOMParser().parseFromString('<div>' + String(html || '') + '</div>', 'text/html');
    doc.querySelectorAll('script,style,object,embed,link,meta,base,form,input,button,textarea,select').forEach(n => n.remove());
    doc.querySelectorAll('iframe').forEach(n => { if (!/^https:\/\/(www\.)?(youtube(-nocookie)?\.com|facebook\.com|player\.vimeo\.com)\//.test(n.getAttribute('src') || '')) n.remove(); });
    doc.querySelectorAll('*').forEach(n => [...n.attributes].forEach(a => {
      const v = a.value.trim().toLowerCase();
      if (/^on/i.test(a.name) || ((a.name === 'href' || a.name === 'src' || a.name === 'xlink:href') && /^(javascript|vbscript|data:text)/.test(v))) n.removeAttribute(a.name);
    }));
    doc.querySelectorAll('a[href]').forEach(a => { a.target = '_blank'; a.rel = 'noopener nofollow'; });
    return doc.body.firstChild.innerHTML;
  };
  // YouTube / Facebook / Vimeo link -> player address
  GT.videoEmbed = url => {
    url = String(url || '').trim(); if (!url) return '';
    let m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1];
    if (/facebook\.com|fb\.watch/.test(url)) return 'https://www.facebook.com/plugins/video.php?show_text=false&href=' + encodeURIComponent(url);
    m = url.match(/vimeo\.com\/(\d+)/); if (m) return 'https://player.vimeo.com/video/' + m[1];
    return '';
  };

  /* ---------- products ---------- */
  // remember the overrides so the next page shows them straight away (site.js applies them before the page draws)
  function cacheProducts(list) {
    const before = JSON.stringify(S.get(LS.products, []));
    const now = JSON.stringify(list || []);
    if (before === now) return false;
    try { localStorage.setItem(LS.products, now); } catch (e) { return false; }
    return true;
  }

  /* ---------- the API used by the pages and the control panel ---------- */
  const API = {
    /* products */
    async listProductOverrides() {
      if (!FB()) return S.get(LS.products, []);
      const q = await db().collection('products').get();
      const list = q.docs.map(d => Object.assign({ key: d.id }, d.data()));
      cacheProducts(list); return list;
    },
    async saveProduct(p) {
      p = Object.assign({}, p, { key: String(p.key || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24), updated: Date.now() });
      if (!p.key) throw new Error('The product needs a short key (letters and numbers).');
      if (FB()) await db().collection('products').doc(p.key).set(p);
      else { const l = S.get(LS.products, []).filter(x => x.key !== p.key); l.push(p); cacheProducts(l); }
      await API.listProductOverrides(); GT.applyProducts(S.get(LS.products, []));
    },
    async resetProduct(key) {
      if (FB()) await db().collection('products').doc(key).delete();
      else cacheProducts(S.get(LS.products, []).filter(x => x.key !== key));
      await API.listProductOverrides(); GT.applyProducts(S.get(LS.products, []));
    },

    /* PDF files */
    async uploadFile(file, meta, onProgress) {
      if (!file) throw new Error('Choose a PDF file.');
      if (!/pdf$/i.test(file.type) && !/\.pdf$/i.test(file.name)) throw new Error('Only PDF files can be uploaded here.');
      if (file.size > MAX_PDF) throw new Error('The PDF is ' + (file.size / 1048576).toFixed(1) + ' MB. The largest is 10 MB — make it smaller (e.g. “Save as reduced size PDF”) and try again.');
      const b64 = await fileB64(file), n = Math.ceil(b64.length / CHUNK), id = 'f' + rid();
      const info = Object.assign({ name: file.name, size: file.size, type: 'application/pdf', chunks: n, created: Date.now() }, meta || {});
      if (FB()) {
        const ref = db().collection('files').doc(id);
        for (let i = 0; i < n; i++) { await ref.collection('chunks').doc(String(i)).set({ d: b64.slice(i * CHUNK, (i + 1) * CHUNK) }); onProgress && onProgress((i + 1) / n); }
        await ref.set(info);
      } else {
        const all = S.get(LS.files, {}); all[id] = Object.assign(info, { d: b64 });
        try { localStorage.setItem(LS.files, JSON.stringify(all)); } catch (e) { throw new Error('Test mode keeps files in this browser and it is full. With Firebase this works for PDFs up to 10 MB.'); }
        onProgress && onProgress(1);
      }
      return id;
    },
    async fileBlob(id) {
      let b64 = '', info;
      if (FB()) {
        const ref = db().collection('files').doc(id), s = await ref.get();
        if (!s.exists) throw new Error('This file was removed.');
        info = s.data();
        const parts = await Promise.all([...Array(info.chunks)].map((_, i) => ref.collection('chunks').doc(String(i)).get()));
        b64 = parts.map(p => (p.data() || {}).d || '').join('');
      } else { info = S.get(LS.files, {})[id]; if (!info) throw new Error('This file was removed.'); b64 = info.d; }
      const bin = atob(b64), arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return { blob: new Blob([arr], { type: 'application/pdf' }), name: info.name || 'guide.pdf' };
    },
    async deleteFile(id) {
      if (!id) return;
      if (FB()) {
        const ref = db().collection('files').doc(id), s = await ref.get().catch(() => null);
        const n = s && s.exists ? s.data().chunks : 30;
        for (let i = 0; i < n; i++) await ref.collection('chunks').doc(String(i)).delete().catch(() => { });
        await ref.delete().catch(() => { });
      } else { const all = S.get(LS.files, {}); delete all[id]; S.set(LS.files, all); }
    },
    // View / Download buttons of an uploaded PDF
    async openFile(id, download, btn) {
      const w = download ? null : window.open('', '_blank');
      const old = btn && btn.textContent; if (btn) { btn.disabled = true; btn.textContent = 'Loading…'; }
      try {
        const f = await API.fileBlob(id), url = URL.createObjectURL(f.blob);
        if (download) { const a = document.createElement('a'); a.href = url; a.download = f.name; document.body.appendChild(a); a.click(); a.remove(); }
        else if (w) w.location.href = url; else location.href = url;
        setTimeout(() => URL.revokeObjectURL(url), 120000);
      } catch (e) { if (w) w.close(); GT.toast(e.message, 4000); }
      if (btn) { btn.disabled = false; btn.textContent = old; }
    },

    /* posts (Updates page) */
    async listPosts(includeLater) {
      let list;
      if (FB()) { const q = await db().collection('posts').orderBy('publishAt', 'desc').limit(60).get(); list = q.docs.map(d => Object.assign({ id: d.id }, d.data())); }
      else list = Object.values(S.get(LS.posts, {})).sort((a, b) => b.publishAt - a.publishAt);
      const now = Date.now();
      return list.filter(p => includeLater || p.publishAt <= now).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.publishAt - a.publishAt);
    },
    async savePost(p) {
      const id = p.id || 'p' + rid();
      const data = { title: String(p.title || '').slice(0, 140), html: GT.cleanHtml(p.html), images: (p.images || []).slice(0, 4), video: p.video || '', pinned: !!p.pinned,
        publishAt: +p.publishAt || Date.now(), created: p.created || Date.now(), updated: Date.now(), author: (me() || {}).name || 'G TRADERS' };
      if (JSON.stringify(data).length > 1000000) throw new Error('The post is too big. Use fewer or smaller pictures.');
      if (FB()) {
        const ref = db().collection('posts').doc(id);
        if (p.id) await ref.set(data, { merge: true }); else await ref.set(Object.assign(data, { likes: {}, commentCount: 0 }));
      } else { const all = S.get(LS.posts, {}); all[id] = Object.assign({ likes: {}, commentCount: 0 }, all[id] || {}, data, { id }); S.set(LS.posts, all); }
      return id;
    },
    async deletePost(id) {
      if (FB()) {
        const cs = await db().collection('posts').doc(id).collection('comments').get();
        for (const d of cs.docs) await d.ref.delete();
        await db().collection('posts').doc(id).delete();
      } else { const all = S.get(LS.posts, {}); delete all[id]; S.set(LS.posts, all); const c = S.get(LS.comments, {}); delete c[id]; S.set(LS.comments, c); }
    },
    async toggleLike(post) {
      const uid = myId(); if (!uid) throw new Error('Log in to like posts.');
      const on = !(post.likes && post.likes[uid]);
      if (FB()) await db().collection('posts').doc(post.id).update({ ['likes.' + uid]: on ? true : firebase.firestore.FieldValue.delete() });
      else { const all = S.get(LS.posts, {}), p = all[post.id]; if (p) { p.likes = p.likes || {}; if (on) p.likes[uid] = true; else delete p.likes[uid]; S.set(LS.posts, all); } }
      post.likes = post.likes || {}; if (on) post.likes[uid] = true; else delete post.likes[uid];
      return on;
    },
    async listComments(postId) {
      if (FB()) { const q = await db().collection('posts').doc(postId).collection('comments').orderBy('created', 'asc').limit(200).get(); return q.docs.map(d => Object.assign({ id: d.id }, d.data())); }
      return (S.get(LS.comments, {})[postId] || []).slice();
    },
    async addComment(post, text) {
      const u = me(); if (!u) throw new Error('Log in to write a comment.');
      text = String(text || '').trim().slice(0, 1000); if (!text) throw new Error('Write something first.');
      const c = { uid: myId(), name: String(u.name || 'Member').slice(0, 60), photo: (u.photo && u.photo.length < 60000) ? u.photo : '', text, created: Date.now() };
      if (FB()) {
        const ref = await db().collection('posts').doc(post.id).collection('comments').add(c);
        await db().collection('posts').doc(post.id).update({ commentCount: firebase.firestore.FieldValue.increment(1) }).catch(() => { });
        c.id = ref.id;
      } else {
        c.id = 'c' + rid(); const all = S.get(LS.comments, {}); (all[post.id] = all[post.id] || []).push(c); S.set(LS.comments, all);
        const ps = S.get(LS.posts, {}); if (ps[post.id]) { ps[post.id].commentCount = (ps[post.id].commentCount || 0) + 1; S.set(LS.posts, ps); }
      }
      post.commentCount = (post.commentCount || 0) + 1;
      if (GT.auth.track) GT.auth.track('comments');
      return c;
    },
    async deleteComment(post, cid) {
      if (FB()) {
        await db().collection('posts').doc(post.id).collection('comments').doc(cid).delete();
        await db().collection('posts').doc(post.id).update({ commentCount: firebase.firestore.FieldValue.increment(-1) }).catch(() => { });
      } else {
        const all = S.get(LS.comments, {}); all[post.id] = (all[post.id] || []).filter(c => c.id !== cid); S.set(LS.comments, all);
        const ps = S.get(LS.posts, {}); if (ps[post.id]) { ps[post.id].commentCount = Math.max(0, (ps[post.id].commentCount || 1) - 1); S.set(LS.posts, ps); }
      }
      post.commentCount = Math.max(0, (post.commentCount || 1) - 1);
    },
    myId
  };
  GT.content = API;

  // Firebase: fetch the newest product overrides; when they changed, draw the page again once
  if (FB()) {
    const usesProducts = /^(index|products?|product-|studio|editor)/.test(location.pathname.split('/').pop() || 'index');
    db().collection('products').get().then(q => {
      const list = q.docs.map(d => Object.assign({ key: d.id }, d.data()));
      if (cacheProducts(list) && usesProducts) {
        try {
          const k = 'gt_prod_reload', sig = list.length + ':' + JSON.stringify(list).length;
          if (sessionStorage.getItem(k) !== sig) { sessionStorage.setItem(k, sig); location.reload(); }
        } catch (e) { }
      }
    }).catch(() => { });
  }
})();
