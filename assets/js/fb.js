/* ============================================================
   G TRADERS — real accounts with Firebase (Authentication + Firestore)
   Loaded by site.js only when GT_CONFIG.firebase is filled in.
   Same functions as the test-mode accounts, so no page needs to change.
   Data:
     users/{uid}          profile, plan, trial, status, limits, features, activity stats
     users/{uid}/inbox    messages from the admin (popups)
     site/settings        features on / off, limits, maintenance, announcement
   Who can read / write what is enforced by firestore.rules (see README).
   ============================================================ */
(function () {
  const C = window.GT_CONFIG, DAY = 864e5;
  firebase.initializeApp(C.firebase);
  const auth = firebase.auth(), db = firebase.firestore(), FV = firebase.firestore.FieldValue;
  const EDITABLE = ['name', 'country', 'whatsapp', 'photo'];
  const CK = 'gt_fb_user', IK = 'gt_fb_inbox';
  const cache = () => GT.store.get(CK, null);
  const setCache = u => u ? GT.store.set(CK, u) : GT.store.del(CK);
  const userDoc = uid => db.collection('users').doc(uid);
  const errMsg = e => {
    const c = e && e.code || '';
    if (c.includes('email-already-in-use')) return 'An account with this e-mail already exists — log in instead.';
    if (c.includes('invalid-email')) return 'That e-mail address does not look right.';
    if (c.includes('weak-password')) return 'Use a stronger password (at least 8 characters with letters and numbers).';
    if (c.includes('too-many-requests')) return 'Too many tries from this device. Wait a few minutes or reset your password.';
    if (c.includes('network')) return 'No connection to the account server. Check your internet and try again.';
    return (e && e.message || 'Something went wrong').replace(/^Firebase: /, '').replace(/\(auth\/[^)]+\)\.?/, '').trim();
  };
  async function loadMe(fu) {
    const snap = await userDoc(fu.uid).get();
    if (!snap.exists) return null;
    const u = Object.assign({ id: fu.uid }, snap.data(), { email: fu.email, verified: fu.emailVerified });
    setCache(u); return u;
  }
  async function loadInbox(uid) {
    try {
      const q = await userDoc(uid).collection('inbox').where('read', '==', 0).limit(20).get();
      const list = q.docs.map(d => Object.assign({ id: d.id }, d.data()));
      GT.store.set(IK, list); return list;
    } catch (e) { return GT.store.get(IK, []); }
  }

  const FbAuth = {
    mode: 'firebase',
    current() { return cache(); },
    async signup({ name, email, password, country, whatsapp }) {
      email = String(email || '').trim().toLowerCase(); name = String(name || '').trim().slice(0, 60);
      GT.checkFields({ name, email, password, whatsapp });
      if (!GT.feature('signup')) throw new Error('New sign-ups are paused for a short while. Please try again later.');
      let cred;
      try { cred = await auth.createUserWithEmailAndPassword(email, password); } catch (e) { throw new Error(errMsg(e)); }
      const now = Date.now(), days = Math.min(400, GT.site().limits.trialDays || 30);
      const data = { name, email, country: country || '', whatsapp: (whatsapp || '').trim(), photo: '', created: now, lastLogin: now,
        trialEnds: now + days * DAY, plan: 'trial', status: 'active', downloads: 0, stats: GT.bump(null, 'logins') };
      await userDoc(cred.user.uid).set(data);
      try { await cred.user.updateProfile({ displayName: name }); await cred.user.sendEmailVerification(); } catch (e) { }
      const u = Object.assign({ id: cred.user.uid }, data, { verified: false }); setCache(u); return u;
    },
    async login(email, password) {
      email = String(email || '').trim().toLowerCase();
      GT.lock.check(email);
      let cred;
      try { cred = await auth.signInWithEmailAndPassword(email, password); }
      catch (e) {
        const c = e.code || '';
        if (/wrong-password|invalid-credential|user-not-found|invalid-login/.test(c)) throw new Error(GT.lock.msg(GT.lock.fail(email)));
        throw new Error(errMsg(e));
      }
      GT.lock.ok(email);
      const u = await loadMe(cred.user);
      if (!u) { await auth.signOut(); throw new Error('This account has no profile. Contact ' + C.email + '.'); }
      if (u.status === 'disabled' || u.status === 'removed') { await auth.signOut(); setCache(null); throw new Error('This account has been switched off. Contact ' + C.email + '.'); }
      const k = GT.dkey();
      await userDoc(cred.user.uid).update({ lastLogin: Date.now(), 'stats.total.logins': FV.increment(1), ['stats.days.' + k + '.logins']: FV.increment(1) }).catch(() => { });
      u.stats = GT.bump(u.stats, 'logins'); setCache(u);
      await loadInbox(cred.user.uid);
      return u;
    },
    logout() { setCache(null); GT.store.del(IK); auth.signOut(); },
    update(fields) {
      const u = cache(); if (!u) return null;
      const f = {}; Object.keys(fields).forEach(k => { if (EDITABLE.includes(k) || k === 'downloads') { f[k] = fields[k]; u[k] = fields[k]; } });
      setCache(u); userDoc(u.id).update(f).catch(e => GT.toast('Could not save: ' + errMsg(e)));
      return u;
    },
    async changePassword(oldPw, newPw) {
      const fu = auth.currentUser; if (!fu) throw new Error('Log in first.');
      GT.checkFields({ name: 'x', email: fu.email, password: newPw });
      try {
        await fu.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(fu.email, oldPw));
        await fu.updatePassword(newPw);
      } catch (e) { throw new Error(/wrong-password|invalid-credential/.test(e.code || '') ? 'The current password is wrong.' : errMsg(e)); }
    },
    async resetPassword(email) {
      try { await auth.sendPasswordResetEmail(String(email || '').trim().toLowerCase()); } catch (e) { if (!/user-not-found/.test(e.code || '')) throw new Error(errMsg(e)); }
      return { sent: true };   // the same answer whether or not the e-mail exists
    },
    track(ev, n) {
      const u = cache(); if (!u) return; n = n || 1;
      u.stats = GT.bump(u.stats, ev, n); setCache(u);
      userDoc(u.id).update({ ['stats.total.' + ev]: FV.increment(n), ['stats.days.' + GT.dkey() + '.' + ev]: FV.increment(n) }).catch(() => { });
    },
    inbox() { return GT.store.get(IK, []); },
    markRead(id) {
      const u = cache(); if (!u) return;
      GT.store.set(IK, GT.store.get(IK, []).filter(x => x.id !== id));
      userDoc(u.id).collection('inbox').doc(id).update({ read: Date.now() }).catch(() => { });
    },
    async deleteAccount(pw) {
      const fu = auth.currentUser; if (!fu) return;
      try { await fu.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(fu.email, pw)); }
      catch (e) { throw new Error('The password is wrong.'); }
      await userDoc(fu.uid).delete().catch(() => { });
      await fu.delete(); setCache(null);
    }
  };
  FbAuth.trialLeft = GT.auth.trialLeft; FbAuth.active = GT.auth.active;

  const ALLOWED = ['status', 'plan', 'trialEnds', 'note', 'limits', 'features'];
  const FbAdmin = {
    mode: 'firebase',
    async list() {
      const q = await db.collection('users').orderBy('created', 'desc').limit(1000).get();
      return q.docs.map(d => Object.assign({ id: d.id }, d.data()));
    },
    async update(id, f) { const x = {}; ALLOWED.forEach(k => { if (k in f) x[k] = f[k]; }); await userDoc(id).update(x); },
    async message(id, text, kind) { await userDoc(id).collection('inbox').add({ text, kind: kind || 'info', created: Date.now(), read: 0, from: 'admin' }); },
    async broadcast(text, kind) { await db.collection('site').doc('settings').set({ announcement: text ? { id: Date.now(), text, kind: kind || 'info' } : null }, { merge: true }); await refreshSite(); },
    async getSite() { await refreshSite(); return GT.site(); },
    async saveSite(st) { await db.collection('site').doc('settings').set(st, { merge: true }); await refreshSite(); },
    // the login itself can only be deleted in the Firebase console; "removed" blocks it everywhere
    async remove(id) { await userDoc(id).update({ status: 'removed' }); }
  };

  async function refreshSite() {
    try { const s = await db.collection('site').doc('settings').get(); GT.store.set('gt_site', s.exists ? s.data() : {}); } catch (e) { }
  }

  GT.auth = FbAuth; GT.admin = FbAdmin;

  // keep the cached profile honest: signed out elsewhere, switched off by the admin, new messages
  let first = true;
  auth.onAuthStateChanged(async fu => {
    const had = cache();
    if (!fu) { if (had) { setCache(null); GT.store.del(IK); location.reload(); } first = false; return; }
    try { if (fu.reload) { await fu.reload(); fu = auth.currentUser || fu; } } catch (e) { }   // fresh e-mail-verified flag
    const u = await loadMe(fu).catch(() => null);
    if (!u) return;
    if (had && had.verified === false && u.verified) { location.reload(); return; }
    const before = GT.store.get(IK, []).map(x => x.id).join();
    const inbox = await loadInbox(fu.uid);
    if (!had || u.status !== had.status || (first && inbox.map(x => x.id).join() !== before)) {
      if (document.readyState !== 'loading' && GT.afterLoad) { if (!had) location.reload(); else GT.afterLoad(); }
    }
    first = false;
  });
  refreshSite();
})();
