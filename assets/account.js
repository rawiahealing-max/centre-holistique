(function () {
  'use strict';
  const A = {
    ar: {
      auth_title: 'مساحتك الخاصة 🌙', auth_sub: 'ملجأ هادئ تعود فيه إلى ذاتك: دوراتك وتأملاتك ومواعيدك مع راوية… كلّها في مكان واحد، وبخصوصية تامة.',
      perk1: '🌿 مساحة آمنة وسرّية، بعيداً عن الأحكام', perk2: '📞 استشارة عن بُعد مع راوية: مكالمة صوتية أو فيديو أو محادثة خاصة', perk3: '🧘 تأملات وطقوس ترافقك كل يوم', perk4: '🎓 دوراتك ومقاطعها المصوّرة متاحة لك في أي وقت',
      login: 'تسجيل الدخول', signup: 'إنشاء حساب', email: 'البريد الإلكتروني', password: 'كلمة السر', login_btn: 'دخول', forgot: 'نسيت كلمة السر؟',
      full_name: 'الاسم واللقب', phone: 'الهاتف / واتساب', country: 'البلد', password_new: 'كلمة السر (8 أحرف على الأقل)', signup_btn: 'إنشاء حسابي',
      forgot_text: 'اكتب بريدك وسنرسل لك رابطاً لتغيير كلمة السر.', send_link: 'أرسل الرابط', back_login: '← رجوع لتسجيل الدخول', reset_text: 'اختر كلمة سر جديدة.', save: 'حفظ',
      hello: 'مرحباً', admin_link: '🎛️ لوحة التحكم', tab_courses: '🎓 دوراتي', tab_member: '✨ اشتراكي', tab_chat: '💬 المحادثة', tab_orders: '🧾 طلباتي', tab_profile: '👤 ملفي',
      back: '← رجوع', send: 'إرسال', password_change: 'كلمة سر جديدة (اتركها فارغة إن لم ترد تغييرها)', logout: 'خروج',
      not_ready: 'نظام الحسابات قيد التفعيل. عد قريباً 🌿',
      err_fields: 'الرجاء ملء كل الخانات.', err_short: 'كلمة السر قصيرة (8 أحرف على الأقل).',
      signup_ok: '✓ تم إنشاء حسابك! افتح بريدك واضغط على رابط التأكيد، ثم سجّل الدخول.', forgot_ok: '✓ إذا كان البريد مسجلاً، ستصلك رسالة خلال دقائق.', reset_ok: '✓ تم تغيير كلمة السر.', saved: '✓ تم الحفظ.',
      bad_login: 'البريد أو كلمة السر غير صحيحة، أو لم تؤكد بريدك بعد.',
      no_courses: 'لا توجد دورات في حسابك بعد.', see_courses: 'اكتشف الدورات', open: 'افتح', lessons_n: 'دروس', no_lessons: 'المحتوى سيُضاف قريباً.', download: '⬇️ تحميل', open_link: 'فتح الرابط ↗',
      member_yes: 'أنت عضو في', until: 'حتى', no_expiry: 'بدون تاريخ انتهاء', member_no: 'لست مشتركاً بعد في الدائرة الشهرية.', member_cta: 'اكتشف الاشتراك ✨',
      member_perks: 'مزاياك:', go_medit: '🧘 التأملات الخاصة', go_chat: '💬 محادثة الدائرة', go_events: '📅 أحداث الشهر',
      room_cercle: '✨ محادثة الدائرة', room_dm: '💌 رسائل خاصة مع المعالِجة', chat_locked: 'محادثة الدائرة متاحة للأعضاء فقط.', chat_empty: 'لا توجد رسائل بعد. ابدأ المحادثة 🌿', you: 'أنت', admin_badge: 'المعالِجة',
      no_orders: 'لا توجد طلبات بعد.', st_pending: '⏳ في الانتظار', st_paid: '✓ مؤكد', st_cancelled: '✕ ملغى', order: 'طلب',
      member_line_yes: '✨ عضو في الدائرة', member_line_no: 'حساب عميل'
    },
    fr: {
      auth_title: 'Votre espace à vous 🌙', auth_sub: 'Un refuge doux pour revenir à vous : vos formations, vos méditations et vos rendez-vous avec Rawia… tout au même endroit, en toute confidentialité.',
      perk1: '🌿 Un espace sûr, confidentiel et sans jugement', perk2: '📞 Consultation en ligne avec Rawia : appel, vidéo ou chat privé', perk3: '🧘 Des méditations et rituels pour vous accompagner chaque jour', perk4: '🎓 Vos formations et vidéos disponibles à tout moment',
      login: 'Connexion', signup: 'Créer un compte', email: 'E-mail', password: 'Mot de passe', login_btn: 'Se connecter', forgot: 'Mot de passe oublié ?',
      full_name: 'Nom complet', phone: 'Téléphone / WhatsApp', country: 'Pays', password_new: 'Mot de passe (8 caractères min.)', signup_btn: 'Créer mon compte',
      forgot_text: 'Indiquez votre e-mail, nous vous enverrons un lien pour changer votre mot de passe.', send_link: 'Envoyer le lien', back_login: '← Retour à la connexion', reset_text: 'Choisissez un nouveau mot de passe.', save: 'Enregistrer',
      hello: 'Bonjour', admin_link: '🎛️ Tableau de bord', tab_courses: '🎓 Mes formations', tab_member: '✨ Mon abonnement', tab_chat: '💬 Chat', tab_orders: '🧾 Mes commandes', tab_profile: '👤 Mon profil',
      back: '← Retour', send: 'Envoyer', password_change: 'Nouveau mot de passe (laisser vide pour ne pas changer)', logout: 'Déconnexion',
      not_ready: "L'espace membre est en cours d'activation. Revenez bientôt 🌿",
      err_fields: 'Merci de remplir tous les champs.', err_short: 'Mot de passe trop court (8 caractères min.).',
      signup_ok: '✓ Compte créé ! Ouvrez votre e-mail et cliquez sur le lien de confirmation, puis connectez-vous.', forgot_ok: '✓ Si cet e-mail existe, vous recevrez un message dans quelques minutes.', reset_ok: '✓ Mot de passe modifié.', saved: '✓ Enregistré.',
      bad_login: "E-mail ou mot de passe incorrect, ou e-mail pas encore confirmé.",
      no_courses: "Aucune formation dans votre compte pour l'instant.", see_courses: 'Découvrir les formations', open: 'Ouvrir', lessons_n: 'leçons', no_lessons: 'Le contenu arrive bientôt.', download: '⬇️ Télécharger', open_link: 'Ouvrir le lien ↗',
      member_yes: 'Vous êtes membre du', until: "jusqu'au", no_expiry: 'sans date de fin', member_no: "Vous n'êtes pas encore membre du Cercle.", member_cta: "Découvrir l'abonnement ✨",
      member_perks: 'Vos avantages :', go_medit: '🧘 Méditations membres', go_chat: '💬 Chat du Cercle', go_events: '📅 Événements du mois',
      room_cercle: '✨ Chat du Cercle', room_dm: '💌 Messages privés avec la thérapeute', chat_locked: 'Le chat du Cercle est réservé aux membres.', chat_empty: 'Aucun message pour le moment. Lancez la conversation 🌿', you: 'Vous', admin_badge: 'Thérapeute',
      no_orders: 'Aucune commande pour le moment.', st_pending: '⏳ En attente', st_paid: '✓ Confirmée', st_cancelled: '✕ Annulée', order: 'Commande',
      member_line_yes: '✨ Membre du Cercle', member_line_no: 'Compte client'
    },
    en: {
      auth_title: 'Your own space 🌙', auth_sub: 'A gentle refuge to come back to yourself: your trainings, meditations and sessions with Rawia… all in one place, in complete privacy.',
      perk1: '🌿 A safe, confidential, judgment-free space', perk2: '📞 Online consultation with Rawia: call, video or private chat', perk3: '🧘 Meditations and rituals to support you every day', perk4: '🎓 Your trainings and videos, available anytime',
      login: 'Sign in', signup: 'Create account', email: 'Email', password: 'Password', login_btn: 'Sign in', forgot: 'Forgot password?',
      full_name: 'Full name', phone: 'Phone / WhatsApp', country: 'Country', password_new: 'Password (min. 8 characters)', signup_btn: 'Create my account',
      forgot_text: "Enter your email and we'll send you a link to reset your password.", send_link: 'Send link', back_login: '← Back to sign in', reset_text: 'Choose a new password.', save: 'Save',
      hello: 'Hello', admin_link: '🎛️ Dashboard', tab_courses: '🎓 My trainings', tab_member: '✨ Membership', tab_chat: '💬 Chat', tab_orders: '🧾 My orders', tab_profile: '👤 Profile',
      back: '← Back', send: 'Send', password_change: 'New password (leave empty to keep current)', logout: 'Sign out',
      not_ready: 'The member area is being activated. Come back soon 🌿',
      err_fields: 'Please fill in all fields.', err_short: 'Password too short (min. 8 characters).',
      signup_ok: '✓ Account created! Open your email and click the confirmation link, then sign in.', forgot_ok: "✓ If this email exists, you'll receive a message within minutes.", reset_ok: '✓ Password changed.', saved: '✓ Saved.',
      bad_login: 'Wrong email or password, or email not confirmed yet.',
      no_courses: 'No trainings in your account yet.', see_courses: 'Explore trainings', open: 'Open', lessons_n: 'lessons', no_lessons: 'Content coming soon.', download: '⬇️ Download', open_link: 'Open link ↗',
      member_yes: 'You are a member of', until: 'until', no_expiry: 'no end date', member_no: "You're not a Circle member yet.", member_cta: 'Discover membership ✨',
      member_perks: 'Your benefits:', go_medit: '🧘 Members meditations', go_chat: '💬 Circle chat', go_events: "📅 This month's events",
      room_cercle: '✨ Circle chat', room_dm: '💌 Private messages with the therapist', chat_locked: 'The Circle chat is for members only.', chat_empty: 'No messages yet. Start the conversation 🌿', you: 'You', admin_badge: 'Therapist',
      no_orders: 'No orders yet.', st_pending: '⏳ Pending', st_paid: '✓ Confirmed', st_cancelled: '✕ Cancelled', order: 'Order',
      member_line_yes: '✨ Circle member', member_line_no: 'Client account'
    }
  };
  const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
  const lg = () => (window.CH ? window.CH.getLang() : 'ar');
  const a = k => (A[lg()] && A[lg()][k]) || A.ar[k] || k;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = v => window.CH ? window.CH.L(v) : (v && v.ar) || v || '';
  const sb = window.sb;
  let user = null, profile = null, enrolls = [], isMember = false, isAdmin = false, room = null, channel = null;

  function applyText() { $$('[data-a]').forEach(el => el.textContent = a(el.dataset.a)); }
  // sign-up / password errors from Supabase come in English: show them in the visitor's language
  function authErr(error) {
    const m = String(error && error.message || ''), l = lg();
    const T = {
      wait: { ar: 'يُرجى الانتظار بضع ثوانٍ ثم إعادة المحاولة.', fr: 'Merci de patienter quelques secondes avant de réessayer.', en: 'Please wait a few seconds and try again.' },
      exists: { ar: 'يوجد حساب مسجّل بهذا البريد الإلكتروني. سجّل الدخول، أو استعمل «نسيت كلمة السر؟».', fr: 'Un compte existe déjà avec cet e-mail. Connectez-vous ou utilisez « Mot de passe oublié ? ».', en: 'An account already exists with this email. Log in or use “Forgot password?”.' },
      email: { ar: 'البريد الإلكتروني غير صحيح، يُرجى التحقق منه.', fr: 'L’adresse e-mail n’est pas valide.', en: 'This email address is not valid.' },
      weak: { ar: 'كلمة السر ضعيفة: اختر كلمة أطول تحتوي على أرقام وحروف.', fr: 'Mot de passe trop faible : choisissez-en un plus long avec chiffres et lettres.', en: 'Password too weak: choose a longer one with numbers and letters.' },
      same: { ar: 'يجب أن تكون كلمة السر الجديدة مختلفة عن القديمة.', fr: 'Le nouveau mot de passe doit être différent de l’ancien.', en: 'The new password must be different from the old one.' },
      other: { ar: 'حدث خطأ، يُرجى المحاولة بعد قليل.', fr: 'Une erreur est survenue, réessayez dans un instant.', en: 'Something went wrong, please try again shortly.' }
    };
    const k = /security purposes|seconds|rate limit|too many/i.test(m) ? 'wait' : /already (registered|exists)/i.test(m) ? 'exists'
      : /invalid.*email|email.*invalid/i.test(m) ? 'email' : /weak|password should/i.test(m) ? 'weak' : /different from the old/i.test(m) ? 'same' : 'other';
    return T[k][l] || T[k].fr;
  }
  function msg(el, text, ok) { const m = $(el); m.textContent = text; m.className = 'auth-msg ' + (ok ? 'ok' : 'err'); m.hidden = false; }
  (window.CH_HOOKS = window.CH_HOOKS || []).push(() => { applyText(); if (user) renderAll(); });
  applyText();

  if (!sb) { $('#acc-loading').textContent = a('not_ready'); return; }

  // ---------- AUTH ----------
  function setMode(m) {
    ['login', 'signup', 'forgot', 'reset'].forEach(x => $('#f-' + x).hidden = x !== m);
    $$('.auth-tabs button').forEach(b => b.classList.toggle('active', b.dataset.mode === m));
    $('.auth-tabs').hidden = m === 'reset'; $('#auth-msg').hidden = true;
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-mode]'); if (b) setMode(b.dataset.mode); });
  if (new URLSearchParams(location.search).get('mode') === 'signup') setMode('signup');

  $('#f-login').addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target;
    if (!f.email.value || !f.password.value) return msg('#auth-msg', a('err_fields'));
    const { error } = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value });
    if (error) return msg('#auth-msg', a('bad_login'));
  });
  $('#f-signup').addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target;
    if (!f.full_name.value.trim() || !f.email.value.trim() || !f.password.value) return msg('#auth-msg', a('err_fields'));
    if (f.password.value.length < 8) return msg('#auth-msg', a('err_short'));
    const { data, error } = await sb.auth.signUp({ email: f.email.value.trim(), password: f.password.value, options: {
      data: { full_name: f.full_name.value.trim() },
      emailRedirectTo: location.origin + location.pathname } });
    if (error) return msg('#auth-msg', authErr(error));
    if (!data.session) { msg('#auth-msg', a('signup_ok'), true); f.reset(); }
  });
  $('#f-forgot').addEventListener('submit', async e => {
    e.preventDefault(); const em = e.target.email.value.trim(); if (!em) return msg('#auth-msg', a('err_fields'));
    await sb.auth.resetPasswordForEmail(em, { redirectTo: location.origin + location.pathname });
    msg('#auth-msg', a('forgot_ok'), true);
  });
  $('#f-reset').addEventListener('submit', async e => {
    e.preventDefault(); const p = e.target.password.value; if (p.length < 8) return msg('#auth-msg', a('err_short'));
    const { error } = await sb.auth.updateUser({ password: p });
    if (error) return msg('#auth-msg', authErr(error));
    msg('#auth-msg', a('reset_ok'), true); setTimeout(() => location.replace(location.pathname), 1200);
  });

  sb.auth.onAuthStateChange((ev, session) => {
    if (ev === 'PASSWORD_RECOVERY') { show('auth'); setMode('reset'); return; }
    const u = session?.user || null;
    if ((u && u.id) !== (user && user.id)) { user = u; boot(); }
  });
  (async () => { const { data } = await sb.auth.getSession(); user = data.session?.user || null; boot(); })();

  function show(which) { $('#acc-loading').hidden = true; $('#auth').hidden = which !== 'auth'; $('#space').hidden = which !== 'space'; }

  async function boot() {
    if (!user) { if (!$('#f-reset').hidden) return; show('auth'); return; }
    const [p, en] = await Promise.all([
      sb.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      sb.from('enrollments').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    ]);
    profile = p.data || { full_name: '', email: user.email };
    enrolls = (en.data || []).filter(x => x.status === 'active' && (!x.expires_at || new Date(x.expires_at) > new Date()));
    isAdmin = profile.role === 'admin';
    isMember = isAdmin || enrolls.some(x => x.item_type === 'abonnements');
    show('space'); renderAll();
  }

  // ---------- SPACE ----------
  let tab = new URLSearchParams(location.search).get('tab') || 'courses';
  $('#space-tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { tab = b.dataset.tab; renderTabs(); } });
  function renderTabs() {
    $$('#space-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    $$('.space-panel').forEach(p => p.hidden = p.dataset.panel !== tab);
    if (tab === 'chat') openChat(room || (isMember ? 'cercle' : 'dm:' + user.id));
    if (tab === 'orders') loadOrders();
  }
  function renderAll() {
    const name = profile.full_name || user.email.split('@')[0];
    $('#hello-name').textContent = name.split(' ')[0];
    $('#avatar').textContent = name.charAt(0).toUpperCase();
    $('#member-line').textContent = isMember ? a('member_line_yes') : a('member_line_no');
    $('#admin-link').hidden = !isAdmin;
    renderCourses(); renderMember(); renderProfile(); renderRooms(); renderTabs(); loadSessions();
  }

  // ---------- online sessions & lives ----------
  const VT = {
    ar: { title: '🎥 جلساتك واللايفات', private: '🎥 جلستك الخاصة', live: '🔴 لايف', join: '▶ ادخل الآن', soon: 'يُفعَّل الزر قبل الموعد بـ 15 دقيقة', your_time: 'بتوقيتك', no_link: 'سيصلك الرابط قريباً', members: '✨ للأعضاء فقط', join_circle: 'انضم إلى الدائرة', close: '✕ إغلاق', now: '🔴 الآن', min: 'دقيقة', tip: 'بالكاميرا أو بالصوت فقط، كما تفضّل. استعمل سماعات واختر مكاناً هادئاً 🌿', open_chat: '💬 افتح المحادثة', wa_help: 'مشكلة في الاتصال؟ راسلنا عبر واتساب', m_audio: '📞 مكالمة صوتية', m_video: '🎥 مكالمة فيديو', m_chat: '💬 محادثة' },
    fr: { title: '🎥 Vos séances et lives', private: '🎥 Votre séance privée', live: '🔴 Live', join: '▶ Rejoindre', soon: 'Le bouton s’active 15 min avant', your_time: 'votre heure', no_link: 'Le lien arrive bientôt', members: '✨ Réservé aux membres', join_circle: 'Rejoindre le Cercle', close: '✕ Fermer', now: '🔴 En cours', min: 'min', tip: 'Caméra ou audio seul, comme vous préférez. Prenez des écouteurs et un endroit calme 🌿', open_chat: '💬 Ouvrir le chat', wa_help: 'Un souci de connexion ? Écrivez-nous sur WhatsApp', m_audio: '📞 Appel vocal', m_video: '🎥 Appel vidéo', m_chat: '💬 Chat' },
    en: { title: '🎥 Your sessions & lives', private: '🎥 Your private session', live: '🔴 Live', join: '▶ Join now', soon: 'The button opens 15 min before', your_time: 'your time', no_link: 'The link is coming soon', members: '✨ Members only', join_circle: 'Join the Circle', close: '✕ Close', now: '🔴 Now', min: 'min', tip: 'Camera or audio only, as you like. Use headphones and a quiet place 🌿', open_chat: '💬 Open chat', wa_help: 'Connection problem? Message us on WhatsApp', m_audio: '📞 Voice call', m_video: '🎥 Video call', m_chat: '💬 Chat' }
  };
  const vt = k => (VT[lg()] || VT.ar)[k];
  let sessions = [], sessTimer = null;
  async function loadSessions() {
    const [o, l] = await Promise.all([
      sb.from('orders').select('id,items,meeting_url,session_at,status').eq('user_id', user.id).not('meeting_url', 'is', null),
      sb.rpc('list_lives')
    ]);
    const now = Date.now();
    const mine = (o.error ? [] : o.data || []).filter(x => x.status !== 'cancelled' && (!x.session_at || new Date(x.session_at).getTime() + 3 * 3600e3 > now))
      .map(x => ({ kind: 'private', mode: x.meeting_url === 'chat' ? 'chat' : ((x.items || []).map(i => i.format).find(f => ['audio', 'video', 'chat'].includes(f)) || ''), title: (x.items || []).map(i => i.title).filter(Boolean).join(' + '), at: x.session_at, dur: 90, url: x.meeting_url }));
    const lives = (l.error ? [] : l.data || []).map(x => ({ kind: 'live', title: L(x.title), desc: L(x.description), at: x.starts_at, dur: x.duration_min || 60, url: x.url, locked: x.locked }));
    sessions = [...mine, ...lives].sort((a1, b1) => String(a1.at || '').localeCompare(String(b1.at || '')));
    renderSessions();
    clearInterval(sessTimer); if (sessions.length) sessTimer = setInterval(renderSessions, 30000);
  }
  function renderSessions() {
    const box = $('#live-box'); if (!box) return;
    box.hidden = !sessions.length; if (!sessions.length) return;
    const now = Date.now(), loc = window.CH.LOCALE[lg()];
    box.innerHTML = `<h3>${esc(vt('title'))}</h3><div class="live-list">${sessions.map((s, i) => {
      const t = s.at ? new Date(s.at).getTime() : 0;
      const open = !t || (now >= t - 15 * 6e4 && now <= t + (s.dur + 60) * 6e4), live = t && now >= t && now <= t + s.dur * 6e4;
      const when = t ? new Date(t).toLocaleString(loc, { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + ` (${vt('your_time')})` : '';
      let btn;
      if (s.locked) btn = `<a class="btn btn-soft" href="index.html#cercle">${esc(vt('members'))} · ${esc(vt('join_circle'))}</a>`;
      else if (!s.url) btn = `<span class="muted-s">${esc(vt('no_link'))}</span>`;
      else if (open) btn = `<button class="btn btn-primary live-join" data-sjoin="${i}">${esc(vt(s.url === 'chat' ? 'open_chat' : 'join'))}</button>`;
      else btn = `<button class="btn btn-soft" disabled>${esc(vt('soon'))}</button>`;
      return `<div class="live-card ${live ? 'is-live' : ''}"><span class="live-tag">${esc(live ? vt('now') : (s.mode ? vt('m_' + s.mode) : vt(s.kind)))}</span>
        <b>${esc(s.title || vt(s.kind))}</b>${when ? `<small>🕒 ${esc(when)}${s.kind === 'live' ? ` · ${s.dur} ${esc(vt('min'))}` : ''}</small>` : ''}${s.desc ? `<p>${esc(s.desc)}</p>` : ''}
        <div class="live-act">${btn}</div>${s.kind === 'private' ? `<a class="live-wa" href="https://wa.me/${esc(String((data().settings || {}).whatsapp || '21626660344').replace(/\D/g, ''))}" target="_blank" rel="noopener">${esc(vt('wa_help'))}</a>` : ''}</div>`;
    }).join('')}</div><p class="muted-s live-tip">${esc(vt('tip'))}</p>`;
  }
  function openDmChat() { room = 'dm:' + user.id; tab = 'chat'; renderTabs(); $('#space-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-sjoin]');
    if (b) {
      const s = sessions[+b.dataset.sjoin]; if (!s || !s.url) return;
      if (s.url === 'chat') { openDmChat(); return; }
      const emb = /youtu/.test(s.url) && window.embedUrl(s.url);
      if (emb) {
        const p = $('#live-player'); p.hidden = false;
        p.innerHTML = `<div class="row-b"><b>${esc(s.title)}</b><button class="btn btn-soft" data-live-close>${esc(vt('close'))}</button></div><div class="ratio"><iframe src="${esc(emb)}&autoplay=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
        p.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else window.open(s.url, '_blank', 'noopener');
    }
    if (e.target.closest('[data-dmchat]')) { openDmChat(); return; }
    if (e.target.closest('[data-live-close]')) { const p = $('#live-player'); p.innerHTML = ''; p.hidden = true; }
  });

  // courses
  function data() { return window.CH ? window.CH.getData() || {} : {}; }
  function renderCourses() {
    const list = enrolls.filter(x => x.item_type === 'formations');
    const D = data();
    $('#courses-list').innerHTML = list.length ? list.map(x => {
      const f = (D.formations || []).find(y => y.id === x.item_id) || {};
      return `<button class="my-card" data-course="${esc(x.item_id)}">
        <span class="my-art t-${esc(f.theme || 'violet')}">${window.CH ? window.CH.svg(f.icone || 'book') : ''}</span>
        <span class="my-body"><b>${esc(L(f.titre) || x.title || x.item_id)}</b><small>${esc(L(f.duree) || '')}</small><span class="btn btn-soft add">${esc(a('open'))}</span></span></button>`;
    }).join('') : `<div class="empty-box"><p>${esc(a('no_courses'))}</p><a class="btn btn-primary" href="index.html#formations">${esc(a('see_courses'))}</a></div>`;
  }
  $('#courses-list').addEventListener('click', e => { const b = e.target.closest('[data-course]'); if (b) openCourse(b.dataset.course); });
  $('#course-back').addEventListener('click', () => { $('#course-view').hidden = true; $('#courses-list').hidden = false; $('#player').innerHTML = ''; });
  let lessons = [];
  async function openCourse(cid) {
    const f = (data().formations || []).find(y => y.id === cid) || {};
    $('#course-title').textContent = L(f.titre) || cid;
    $('#courses-list').hidden = true; $('#course-view').hidden = false;
    const { data: ls } = await sb.from('lessons').select('*').eq('course_id', cid).order('position').order('id');
    lessons = ls || [];
    $('#lessons').innerHTML = lessons.length ? lessons.map((l, i) => `<li><button data-lesson="${i}"><span class="l-ico">${{ video: '🎬', audio: '🎧', pdf: '📄', image: '🖼️', text: '📝', link: '🔗' }[l.kind] || '•'}</span>${esc(L(l.title))}</button></li>`).join('')
      : `<li class="muted-s">${esc(a('no_lessons'))}</li>`;
    if (lessons.length) playLesson(0); else $('#player').innerHTML = '';
  }
  $('#lessons').addEventListener('click', e => { const b = e.target.closest('[data-lesson]'); if (b) playLesson(+b.dataset.lesson); });
  async function playLesson(i) {
    const l = lessons[i]; if (!l) return;
    $$('#lessons button').forEach((b, j) => b.classList.toggle('on', j === i));
    const src = l.storage_path ? await window.fileUrl(l.storage_path) : (l.url || '');
    const emb = window.embedUrl(l.url || '');
    let h = `<h3>${esc(L(l.title))}</h3>`;
    if (l.kind === 'video') h += emb ? `<div class="ratio"><iframe src="${esc(emb)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>` : `<video src="${esc(src)}" controls playsinline controlslist="nodownload"></video>`;
    else if (l.kind === 'audio') h += `<audio src="${esc(src)}" controls controlslist="nodownload"></audio>`;
    else if (l.kind === 'pdf') h += `<iframe class="pdf" src="${esc(src)}"></iframe><a class="btn btn-soft" href="${esc(src)}" target="_blank" rel="noopener">${esc(a('download'))}</a>`;
    else if (l.kind === 'image') h += `<img src="${esc(src)}" alt="">`;
    else if (l.kind === 'link') h += `<a class="btn btn-primary" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(a('open_link'))}</a>`;
    if (L(l.body)) h += `<div class="lesson-text">${esc(L(l.body)).replace(/\n/g, '<br>')}</div>`;
    $('#player').innerHTML = h;
  }

  // membership
  function renderMember() {
    const m = enrolls.find(x => x.item_type === 'abonnements');
    const D = data();
    if (m || isAdmin) {
      const ab = m ? (D.abonnements || []).find(y => y.id === m.item_id) : null;
      const until = m && m.expires_at ? `${a('until')} ${new Date(m.expires_at).toLocaleDateString(window.CH.LOCALE[lg()])}` : a('no_expiry');
      $('#member-box').innerHTML = `<div class="member-card">
        <span class="eyebrow light">✨</span><h2>${esc(a('member_yes'))} «${esc(ab ? L(ab.titre) : 'Cercle')}»</h2><p>${esc(until)}</p>
        ${ab ? `<p class="mp">${esc(a('member_perks'))}</p><ul>${L(ab.avantages).split('\n').filter(Boolean).map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
        <div class="form-actions"><a class="btn btn-gold" href="meditations.html">${esc(a('go_medit'))}</a><button class="btn btn-white" data-goto="chat">${esc(a('go_chat'))}</button><a class="btn btn-outline-light" href="index.html#evenements">${esc(a('go_events'))}</a></div></div>`;
    } else {
      $('#member-box').innerHTML = `<div class="empty-box"><p>${esc(a('member_no'))}</p><a class="btn btn-primary" href="index.html#cercle">${esc(a('member_cta'))}</a></div>`;
    }
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-goto]'); if (b) { tab = b.dataset.goto; renderTabs(); } });

  // chat
  function renderRooms() {
    $('#chat-rooms').innerHTML = `<button data-room="cercle" ${isMember ? '' : 'class="locked"'}>${esc(a('room_cercle'))}${isMember ? '' : ' 🔒'}</button>
      <button data-room="dm:${esc(user.id)}">${esc(a('room_dm'))}</button>`;
  }
  $('#chat-rooms').addEventListener('click', e => { const b = e.target.closest('[data-room]'); if (b) openChat(b.dataset.room); });
  async function openChat(r) {
    room = r;
    $$('#chat-rooms button').forEach(b => b.classList.toggle('active', b.dataset.room === r));
    const box = $('#chat-msgs');
    if (r === 'cercle' && !isMember) { box.innerHTML = `<div class="empty-box"><p>${esc(a('chat_locked'))}</p><a class="btn btn-primary" href="index.html#cercle">${esc(a('member_cta'))}</a></div>`; $('#chat-form').hidden = true; return; }
    $('#chat-form').hidden = false;
    const { data: ms } = await sb.from('messages').select('*').eq('room', r).order('created_at', { ascending: true }).limit(200);
    box.innerHTML = (ms || []).length ? '' : `<p class="chat-empty">${esc(a('chat_empty'))}</p>`;
    (ms || []).forEach(addMsg);
    renderSafe(r, !(ms || []).length);
    if (channel) sb.removeChannel(channel);
    channel = sb.channel('room-' + r).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room=eq.${r}` }, p => {
      if (!box.querySelector(`[data-mid="${p.new.id}"]`)) { box.querySelector('.chat-empty')?.remove(); addMsg(p.new); hideTyping(); }
    }).on('broadcast', { event: 'typing' }, p => { if (p.payload && p.payload.u !== user.id) showTyping(); }).subscribe();
  }

  // ---------- safe space (private chat with Rawia) ----------
  const SAFE = {
    ar: { t: '🌿 مساحتك الآمنة', l1: 'هذه المحادثة سرّية: لا يراها أحد غيرك وغير راوية.', l2: 'دون أحكام: عبّر عمّا تشعر به بكلماتك وعلى راحتك.', l3: 'تجيبك راوية في أوقات الجلسات، وفي موعد جلستك تكون حاضرة معك بالكامل.', l4: 'يمكنك أن تطلب حذف محادثتك في أي وقت.',
      sos: 'هذه مرافقة للرفاه، وليست خدمة طوارئ. إذا كنت في خطر أو تفكّر في إيذاء نفسك، اتصل فوراً بالإسعاف: في تونس 190 (الإسعاف) أو 197 (الشرطة)، أو برقم الطوارئ في بلدك.',
      del: '🗑 اطلب حذف المحادثة', del_ok: 'أرسلنا طلب الحذف. ستُحذف المحادثة قريباً 🤍', del_confirm: 'هل تريد أن تطلب حذف كل هذه المحادثة؟', del_msg: '🗑 أطلب حذف هذه المحادثة من فضلك.',
      exit: '🚪 خروج سريع', exit_t: 'يغلق الصفحة فوراً ويفتح صفحة عادية', typing: 'راوية تكتب…', typing_client: 'يكتب…', ph: 'اكتب بهدوء وبراحتك…' },
    fr: { t: '🌿 Votre espace sûr', l1: 'Cette conversation est confidentielle : seules vous et Rawia la voyez.', l2: 'Sans jugement : exprimez ce que vous ressentez, avec vos mots, à votre rythme.', l3: 'Rawia vous répond pendant les heures de séance, et elle est pleinement présente à l’heure de votre rendez-vous.', l4: 'Vous pouvez demander la suppression de votre conversation à tout moment.',
      sos: 'Ceci est un accompagnement de bien-être, pas un service d’urgence. Si vous êtes en danger ou pensez à vous faire du mal, appelez immédiatement les secours : en Tunisie le 190 (SAMU) ou le 197 (police), ou le numéro d’urgence de votre pays.',
      del: '🗑 Demander la suppression', del_ok: 'Demande envoyée. La conversation sera bientôt supprimée 🤍', del_confirm: 'Voulez-vous demander la suppression de toute cette conversation ?', del_msg: '🗑 Je demande la suppression de cette conversation, s’il vous plaît.',
      exit: '🚪 Sortie rapide', exit_t: 'Ferme la page tout de suite et ouvre une page neutre', typing: 'Rawia écrit…', typing_client: 'écrit…', ph: 'Écrivez calmement, à votre rythme…' },
    en: { t: '🌿 Your safe space', l1: 'This conversation is confidential: only you and Rawia can see it.', l2: 'No judgment: share what you feel, in your own words and at your own pace.', l3: 'Rawia replies during session hours, and is fully present with you at your appointment time.', l4: 'You can ask for your conversation to be deleted at any time.',
      sos: 'This is wellbeing support, not an emergency service. If you are in danger or thinking of harming yourself, call emergency services now: in Tunisia 190 (ambulance) or 197 (police), or your local emergency number.',
      del: '🗑 Ask to delete', del_ok: 'Request sent. The conversation will be deleted soon 🤍', del_confirm: 'Do you want to ask for this whole conversation to be deleted?', del_msg: '🗑 Please delete this conversation.',
      exit: '🚪 Quick exit', exit_t: 'Closes this page right away and opens a neutral page', typing: 'Rawia is typing…', typing_client: 'typing…', ph: 'Write calmly, at your own pace…' }
  };
  const sf = k => (SAFE[lg()] || SAFE.ar)[k];
  function renderSafe(r, open) {
    const el = $('#chat-safe'), dm = r && r.startsWith('dm:');
    $('#chatbox').classList.toggle('calm', !!dm);
    el.hidden = !dm; if (!dm) return;
    $('#chat-form').body.placeholder = sf('ph');
    el.innerHTML = `<details ${open ? 'open' : ''}><summary>${esc(sf('t'))}</summary>
      <ul><li>🔒 ${esc(sf('l1'))}</li><li>🤍 ${esc(sf('l2'))}</li><li>🕊️ ${esc(sf('l3'))}</li><li>🗑 ${esc(sf('l4'))}</li></ul>
      <p class="chat-sos">⚠️ ${esc(sf('sos'))}</p></details>
      <div class="chat-safe-act"><button type="button" class="btn btn-soft btn-sm" data-chat-del>${esc(sf('del'))}</button>
      <button type="button" class="btn btn-sm chat-exit" data-chat-exit title="${esc(sf('exit_t'))}">${esc(sf('exit'))}</button></div>`;
  }
  let typingTimer = null, lastTyping = 0;
  function showTyping() { const t = $('#chat-typing'); if (!room || !room.startsWith('dm:')) return; t.textContent = isAdmin ? sf('typing_client') : sf('typing'); t.hidden = false; clearTimeout(typingTimer); typingTimer = setTimeout(hideTyping, 4000); }
  function hideTyping() { const t = $('#chat-typing'); if (t) t.hidden = true; }
  $('#chat-form').body.addEventListener('input', () => {
    if (!channel || !room || !room.startsWith('dm:') || Date.now() - lastTyping < 2500) return;
    lastTyping = Date.now(); channel.send({ type: 'broadcast', event: 'typing', payload: { u: user.id } });
  });
  document.addEventListener('click', async e => {
    if (e.target.closest('[data-chat-exit]')) {
      $('#chat-msgs').innerHTML = ''; document.title = 'Google';
      location.replace('https://www.google.com/search?q=m%C3%A9t%C3%A9o');
      return;
    }
    if (e.target.closest('[data-chat-del]')) {
      if (!room || !room.startsWith('dm:') || !confirm(sf('del_confirm'))) return;
      const { error } = await sb.from('messages').insert({ room, user_id: user.id, author_name: (profile.full_name || user.email.split('@')[0]), is_admin: false, body: sf('del_msg') });
      window.CH.toast(error ? error.message : sf('del_ok'));
    }
  });
  function addMsg(m) {
    const box = $('#chat-msgs'), mine = m.user_id === user.id;
    const time = new Date(m.created_at).toLocaleString(window.CH.LOCALE[lg()], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    box.insertAdjacentHTML('beforeend', `<div class="msg ${mine ? 'mine' : ''} ${m.is_admin ? 'adm' : ''}" data-mid="${m.id}">
      <span class="who">${esc(mine ? a('you') : (m.author_name || ''))}${m.is_admin ? ` · ${esc(a('admin_badge'))}` : ''}</span>
      <p>${esc(m.body).replace(/\n/g, '<br>')}</p><time>${esc(time)}</time></div>`);
    box.scrollTop = box.scrollHeight;
  }
  $('#chat-form').addEventListener('submit', async e => {
    e.preventDefault(); const i = e.target.body, body = i.value.trim(); if (!body || !room) return;
    i.value = '';
    const { data: m, error } = await sb.from('messages').insert({ room, user_id: user.id, author_name: (profile.full_name || user.email.split('@')[0]), is_admin: isAdmin, body }).select().single();
    if (error) { i.value = body; window.CH.toast(error.message); return; }
    if (m && !$('#chat-msgs').querySelector(`[data-mid="${m.id}"]`)) { $('#chat-msgs .chat-empty')?.remove(); addMsg(m); }
  });

  // orders
  async function loadOrders() {
    const { data: os } = await sb.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
    $('#orders-list').innerHTML = (os || []).length ? os.map(o => `<div class="order-card">
      <div class="row-b"><b>${esc(a('order'))} #${o.id}</b><span class="st st-${esc(o.status)}">${esc(a('st_' + o.status))}</span></div>
      <small>${esc(new Date(o.created_at).toLocaleString(window.CH.LOCALE[lg()]))}</small>
      <ul>${(o.items || []).map(it => `<li>${esc(it.title)}${it.option ? ' · ' + esc(it.option) : ''} <b>${esc(it.price || '')}</b></li>`).join('')}</ul>
      ${o.total ? `<div class="row-b"><span></span><b>${esc(o.total)}</b></div>` : ''}
      ${o.meeting_url ? `<div class="row-b"><small>${o.session_at ? '🕒 ' + esc(new Date(o.session_at).toLocaleString(window.CH.LOCALE[lg()], { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })) : ''}</small>${o.meeting_url === 'chat' ? `<button class="btn btn-primary" data-dmchat>${esc(vt('open_chat'))}</button>` : `<a class="btn btn-primary" href="${esc(o.meeting_url)}" target="_blank" rel="noopener">${esc(vt('join'))}</a>`}</div>` : ''}</div>`).join('')
      : `<div class="empty-box"><p>${esc(a('no_orders'))}</p></div>`;
  }

  // profile
  function renderProfile() {
    const f = $('#f-profile');
    f.full_name.value = profile.full_name || ''; f.phone.value = profile.phone || ''; f.country.value = profile.country || ''; f.email.value = user.email || '';
  }
  $('#f-profile').addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target;
    const { error } = await sb.from('profiles').update({ full_name: f.full_name.value.trim(), phone: f.phone.value.trim(), country: f.country.value.trim() }).eq('id', user.id);
    if (error) return msg('#profile-msg', error.message);
    if (f.password.value) {
      if (f.password.value.length < 8) return msg('#profile-msg', a('err_short'));
      const r = await sb.auth.updateUser({ password: f.password.value }); if (r.error) return msg('#profile-msg', r.error.message);
      f.password.value = '';
    }
    profile.full_name = f.full_name.value.trim(); renderAll(); tab = 'profile'; renderTabs();
    msg('#profile-msg', a('saved'), true);
  });
  $('#logout').addEventListener('click', async () => { await sb.auth.signOut(); location.replace('index.html'); });
})();
