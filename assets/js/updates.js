/* G TRADERS — Updates page: posts from the control panel, likes and comments */
(function () {
  const $ = id => document.getElementById(id), esc = GT.esc, feed = $('feed');
  const fmt = t => { const d = (Date.now() - t) / 1000; if (d < 60) return 'just now'; if (d < 3600) return Math.floor(d / 60) + ' min ago'; if (d < 86400) return Math.floor(d / 3600) + ' h ago'; if (d < 7 * 86400) return Math.floor(d / 86400) + ' d ago'; return new Date(t).toLocaleDateString([], { dateStyle: 'medium' }); };
  let posts = [];
  const me = () => GT.auth.current(), uid = () => GT.content.myId();

  async function load() {
    try { posts = await GT.content.listPosts(false); }
    catch (e) { feed.innerHTML = `<div class="notice">The updates could not be loaded right now. Please try again later.</div>`; return; }
    if (!posts.length) { feed.innerHTML = '<div class="card center"><div style="font-size:34px">📰</div><h3>No updates yet</h3><p class="muted">News about new tools and versions will appear here.</p></div>'; return; }
    feed.innerHTML = posts.map(card).join('');
    posts.forEach(wire);
    const id = location.hash.slice(1); if (id && $('post-' + id)) $('post-' + id).scrollIntoView({ behavior: 'smooth' });
  }
  function card(p) {
    const likes = Object.keys(p.likes || {}).length, liked = !!(uid() && p.likes && p.likes[uid()]);
    const imgs = p.images || [], v = GT.videoEmbed(p.video);
    return `<article class="card post" id="post-${esc(p.id)}">
      <header class="post-h"><span class="mark"></span><div><b>G TRADERS</b><div class="muted small">${p.pinned ? '📌 Pinned · ' : ''}<a href="#${esc(p.id)}" class="muted">${fmt(p.publishAt)}</a></div></div></header>
      ${p.title ? `<h2 class="post-t">${esc(p.title)}</h2>` : ''}
      ${p.html ? `<div class="post-body">${GT.cleanHtml(p.html)}</div>` : ''}
      ${v ? `<div class="vid"><iframe src="${esc(v)}" title="Video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : ''}
      ${imgs.length ? `<div class="post-imgs n${Math.min(imgs.length, 4)}">${imgs.map((s, i) => `<img src="${esc(s)}" alt="" loading="lazy" data-i="${i}">`).join('')}</div>` : ''}
      <div class="post-stats muted small"><span data-lc>${likes ? '❤ ' + likes : ''}</span><span data-cc>${p.commentCount ? p.commentCount + ' comment' + (p.commentCount > 1 ? 's' : '') : ''}</span></div>
      <div class="post-act"><button type="button" class="${liked ? 'on' : ''}" data-like>${liked ? '❤ Liked' : '♡ Like'}</button><button type="button" data-cm>💬 Comment</button><button type="button" data-share>↗ Share</button></div>
      <div class="post-cms" data-cms style="display:none"></div>
    </article>`;
  }
  function wire(p) {
    const el = $('post-' + p.id), q = s => el.querySelector(s);
    q('[data-like]').onclick = async () => {
      if (!me()) return askLogin();
      try {
        const on = await GT.content.toggleLike(p), n = Object.keys(p.likes || {}).length;
        q('[data-like]').classList.toggle('on', on); q('[data-like]').textContent = on ? '❤ Liked' : '♡ Like'; q('[data-lc]').textContent = n ? '❤ ' + n : '';
      } catch (e) { GT.toast(e.message, 4000); }
    };
    q('[data-cm]').onclick = () => openComments(p, el);
    q('[data-cc]').onclick = () => openComments(p, el);
    q('[data-share]').onclick = async () => {
      const url = location.origin + location.pathname + '#' + p.id;
      try { if (navigator.share) await navigator.share({ title: p.title || 'G TRADERS', url }); else { await navigator.clipboard.writeText(url); GT.toast('Link copied'); } } catch (e) { }
    };
    el.querySelectorAll('.post-imgs img').forEach(img => img.onclick = () => {
      const m = document.createElement('div'); m.className = 'lightbox'; m.innerHTML = `<img src="${esc(img.src)}" alt="">`; m.onclick = () => m.remove(); document.body.appendChild(m);
    });
  }
  async function openComments(p, el) {
    const box = el.querySelector('[data-cms]');
    if (box.style.display !== 'none' && box.dataset.loaded) { box.style.display = 'none'; return; }
    box.style.display = ''; box.innerHTML = '<p class="muted small">Loading comments…</p>';
    let list = [];
    try { list = await GT.content.listComments(p.id); } catch (e) { box.innerHTML = '<p class="muted small">Comments could not be loaded.</p>'; return; }
    box.dataset.loaded = '1';
    const u = me(), admin = u && GT.isAdmin(u);
    const draw = () => {
      box.innerHTML = list.map(c => `<div class="cm"><div class="cm-h">${GT.avatar(c, 28)}<b>${esc(c.name)}</b><span class="muted small">${fmt(c.created)}</span>
          ${u && (c.uid === uid() || admin) ? `<button type="button" class="cm-x" data-d="${esc(c.id)}" title="Delete">×</button>` : ''}</div><p>${esc(c.text).replace(/\n/g, '<br>')}</p></div>`).join('')
        + (u ? `<form class="cm-f">${GT.avatar(u, 30)}<textarea rows="1" maxlength="1000" placeholder="Write a comment…" required></textarea><button class="btn primary small">Send</button></form>`
          : `<p class="small"><a href="account.html?tab=login&next=updates.html">Log in</a> or <a href="account.html?tab=signup&next=updates.html">create a free account</a> to comment.</p>`);
      box.querySelectorAll('[data-d]').forEach(b => b.onclick = async () => {
        if (!confirm('Delete this comment?')) return;
        try { await GT.content.deleteComment(p, b.dataset.d); list = list.filter(c => c.id !== b.dataset.d); draw(); count(); } catch (e) { GT.toast(e.message, 4000); }
      });
      const f = box.querySelector('.cm-f');
      if (f) {
        const ta = f.querySelector('textarea'); ta.oninput = () => { ta.style.height = 'auto'; ta.style.height = Math.min(160, ta.scrollHeight) + 'px'; };
        f.onsubmit = async e => {
          e.preventDefault(); const t = ta.value.trim(); if (!t) return;
          f.querySelector('button').disabled = true;
          try { list.push(await GT.content.addComment(p, t)); draw(); count(); box.querySelector('.cm-f textarea').focus(); }
          catch (x) { GT.toast(x.message, 4000); f.querySelector('button').disabled = false; }
        };
      }
    };
    const count = () => { const n = p.commentCount || 0; el.querySelector('[data-cc]').textContent = n ? n + ' comment' + (n > 1 ? 's' : '') : ''; };
    draw();
  }
  function askLogin() { GT.modal('Log in to like', 'Create a free G TRADERS account or log in to like and comment.<br><br><a class="btn primary small" href="account.html?tab=signup&next=updates.html">Create free account</a> <a class="btn ghost small" href="account.html?tab=login&next=updates.html">Log in</a>', 'info'); }
  load();
})();
