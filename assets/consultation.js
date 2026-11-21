// Online consultation: choose voice / video / chat, duration, date → order saved + WhatsApp + payment methods.
(function () {
  'use strict';
  const M = {
    ar: { chip: '🌍 من أي مكان في العالم', h1: 'استشارة أونلاين', intro: 'تحدّث مع راوية غربال بالطريقة التي تريحك: مكالمة صوتية، مكالمة فيديو، أو محادثة كتابية. الإصغاء نفسه والمرافقة نفسها، وأنت في بيتك.',
      s1: '1. اختر طريقة الاستشارة', s2: '2. المدة', s3: '3. الموضوع والموعد', s4: '4. معلوماتك',
      audio: '📞 مكالمة صوتية', audio_d: 'بالصوت فقط، دون كاميرا. مريحة وبسيطة.', video: '🎥 مكالمة فيديو', video_d: 'وجهاً لوجه بالكاميرا، كأنك في المركز.', chat: '💬 محادثة كتابية', chat_d: 'تكتب على راحتك، ويأتيك الرد مباشرة.',
      min: 'دقيقة', topic: 'الموضوع', topics: ['سؤال عام / توجيه', 'استشارة نفسية أو كوتشينغ', 'طاقة وريكي', 'ثيتا هيلينغ / معتقدات', 'تاروت وإرشاد', 'علاقات وعائلة', 'أخرى'],
      date: 'اليوم المفضّل', time: 'الساعة (بتوقيتك)', tz: 'توقيتك', q: 'اكتب سؤالك أو ما تمرّ به في جملتين (اختياري)', name: 'الاسم', phone: 'الهاتف / واتساب', email: 'البريد الإلكتروني (اختياري)',
      total: 'المجموع', book: 'احجز الاستشارة', note_acc: '💡 إن كان لديك حساب في الموقع، ستجد الرابط وزر الدخول في «حسابي»، أو أنشئ حساباً مجانياً قبل الحجز.', acc: 'حسابي',
      how: 'كيف تجري؟', how1: 'تحجز وتدفع بالطريقة التي تناسبك.', how2: 'نؤكّد معك الموعد عبر واتساب.', how3: 'قبل الموعد يُفعَّل زر «ادخل الآن» في «حسابي»، أو يصلك الرابط عبر واتساب.', how4: 'تتم المكالمة عبر Google Meet من الهاتف أو الحاسوب، والمحادثة داخل الموقع.',
      err: 'يُرجى إكمال: ', note: 'الاستشارة مرافقة للرفاه والتطوّر الشخصي، تكمّل المتابعة الطبية والنفسية ولا تعوّضها. في حالة طارئة اتصل بالطبيب أو بالإسعاف.',
      m_head: '🌐 طلب استشارة أونلاين', w_mode: 'الطريقة', w_dur: 'المدة', w_topic: 'الموضوع', w_when: 'الموعد المفضّل', w_q: 'السؤال', w_name: 'الاسم', w_phone: 'الهاتف' },
    fr: { chip: '🌍 Partout dans le monde', h1: 'Consultation en ligne', intro: 'Parlez avec Rawia Ghorbel comme vous préférez : appel vocal, appel vidéo ou chat écrit. La même écoute, le même accompagnement, depuis chez vous.',
      s1: '1. Choisissez le mode', s2: '2. Durée', s3: '3. Sujet et rendez-vous', s4: '4. Vos coordonnées',
      audio: '📞 Appel vocal', audio_d: 'Audio seulement, sans caméra. Simple et confortable.', video: '🎥 Appel vidéo', video_d: 'Face à face par caméra, comme au centre.', chat: '💬 Chat écrit', chat_d: 'Vous écrivez à votre rythme, réponses en direct.',
      min: 'min', topic: 'Sujet', topics: ['Question générale / orientation', 'Consultation psychologique ou coaching', 'Énergie et Reiki', 'ThetaHealing® / croyances', 'Tarot et guidance', 'Relations et famille', 'Autre'],
      date: 'Jour souhaité', time: 'Heure (votre heure)', tz: 'Votre fuseau', q: 'Décrivez votre question en deux phrases (facultatif)', name: 'Nom', phone: 'Téléphone / WhatsApp', email: 'E-mail (facultatif)',
      total: 'Total', book: 'Réserver la consultation', note_acc: '💡 Avec un compte sur le site, vous retrouvez le lien et le bouton « Rejoindre » dans « Mon espace ». Créez-en un gratuitement avant de réserver.', acc: 'Mon espace',
      how: 'Comment ça marche ?', how1: 'Vous réservez et payez avec le moyen qui vous convient.', how2: 'Nous confirmons le rendez-vous sur WhatsApp.', how3: 'Avant l’heure, le bouton « Rejoindre » s’active dans « Mon espace », ou le lien vous est envoyé sur WhatsApp.', how4: 'Appels sur Google Meet (téléphone ou ordinateur), chat directement sur le site.',
      err: 'Complétez : ', note: 'La consultation est un accompagnement de bien-être, complémentaire à tout suivi médical ou psychologique. En cas d’urgence, contactez un médecin ou les secours.',
      m_head: '🌐 Demande de consultation en ligne', w_mode: 'Mode', w_dur: 'Durée', w_topic: 'Sujet', w_when: 'Rendez-vous souhaité', w_q: 'Question', w_name: 'Nom', w_phone: 'Téléphone' },
    en: { chip: '🌍 From anywhere in the world', h1: 'Online consultation', intro: 'Talk with Rawia Ghorbel the way that suits you: voice call, video call or written chat. The same listening and support, from home.',
      s1: '1. Choose how', s2: '2. Duration', s3: '3. Topic and time', s4: '4. Your details',
      audio: '📞 Voice call', audio_d: 'Audio only, no camera. Simple and comfortable.', video: '🎥 Video call', video_d: 'Face to face on camera, like at the centre.', chat: '💬 Written chat', chat_d: 'Write at your own pace, with live replies.',
      min: 'min', topic: 'Topic', topics: ['General question / guidance', 'Psychological consultation or coaching', 'Energy and Reiki', 'ThetaHealing® / beliefs', 'Tarot and guidance', 'Relationships and family', 'Other'],
      date: 'Preferred day', time: 'Time (your time)', tz: 'Your time zone', q: 'Describe your question in two sentences (optional)', name: 'Name', phone: 'Phone / WhatsApp', email: 'Email (optional)',
      total: 'Total', book: 'Book the consultation', note_acc: '💡 With an account on the site, you find the link and the “Join” button in “My space”. Create one for free before booking.', acc: 'My space',
      how: 'How does it work?', how1: 'Book and pay with the method that suits you.', how2: 'We confirm the time with you on WhatsApp.', how3: 'Before the time, the “Join” button opens in “My space”, or you get the link on WhatsApp.', how4: 'Calls on Google Meet (phone or computer), chat right on the site.',
      err: 'Please fill: ', note: 'Consultations are wellbeing support, complementary to any medical or psychological care. In an emergency, contact a doctor or emergency services.',
      m_head: '🌐 Online consultation request', w_mode: 'Mode', w_dur: 'Duration', w_topic: 'Topic', w_when: 'Preferred time', w_q: 'Question', w_name: 'Name', w_phone: 'Phone' }
  };
  const $ = s => document.querySelector(s);
  const lg = () => (window.CH ? window.CH.getLang() : 'ar');
  const m = k => (M[lg()] || M.ar)[k] ?? M.ar[k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TZ = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return ''; } })();
  const DEF = [['audio', 30, 45, 18, 20], ['audio', 60, 90, 35, 40], ['video', 30, 50, 20, 22], ['video', 60, 100, 40, 45], ['chat', 30, 40, 15, 17], ['chat', 60, 75, 30, 33]]
    .map(([mode, d, tnd, eur, usd]) => ({ id: `${mode}-${d}`, mode, duree: String(d), prix: { tnd: String(tnd), eur: String(eur), usd: String(usd) }, actif: true }));
  let sel = { mode: 'video', duree: '' };

  const tarifs = () => { const D = window.CH && window.CH.getData(); const t = (D && D.consult_tarifs && D.consult_tarifs.length ? D.consult_tarifs : DEF).filter(x => x.actif !== false); return t; };
  const current = () => tarifs().find(x => x.mode === sel.mode && x.duree === sel.duree);
  const priceTxt = x => x ? (window.CH.money ? window.CH.money(x.prix) : '') : '';

  function render() {
    if (!window.CH || !window.CH.getData()) return;
    document.querySelectorAll('[data-c]').forEach(el => { el.textContent = m(el.dataset.c); });
    document.querySelectorAll('[data-cp]').forEach(el => { el.placeholder = m(el.dataset.cp); });
    const ts = tarifs(), modes = ['audio', 'video', 'chat'].filter(mo => ts.some(x => x.mode === mo));
    if (!modes.includes(sel.mode)) sel.mode = modes[0];
    $('#c-modes').innerHTML = modes.map(mo => {
      const from = ts.filter(x => x.mode === mo).sort((a, b) => +a.duree - +b.duree)[0];
      return `<button type="button" class="c-mode ${sel.mode === mo ? 'sel' : ''}" data-mode="${mo}"><b>${esc(m(mo))}</b><span>${esc(m(mo + '_d'))}</span><i>${from ? esc(priceTxt(from)) : ''}</i></button>`;
    }).join('');
    const durs = ts.filter(x => x.mode === sel.mode).sort((a, b) => +a.duree - +b.duree);
    if (!durs.some(x => x.duree === sel.duree)) sel.duree = durs[0] ? durs[0].duree : '';
    $('#c-durs').innerHTML = durs.map(x => `<button type="button" class="c-dur ${sel.duree === x.duree ? 'sel' : ''}" data-dur="${esc(x.duree)}"><b>${esc(x.duree)} ${esc(m('min'))}</b><span>${esc(priceTxt(x))}</span></button>`).join('');
    const f = $('#c-form'), prev = f.topic.value;
    f.topic.innerHTML = m('topics').map(t => `<option>${esc(t)}</option>`).join(''); if (prev) f.topic.value = prev;
    $('#c-tz').textContent = TZ || '—';
    $('#c-total').textContent = priceTxt(current());
    $('#c-acc').hidden = !!(window.CH.getUser && window.CH.getUser());
  }
  document.addEventListener('click', e => {
    const mo = e.target.closest('[data-mode]'); if (mo) { sel.mode = mo.dataset.mode; render(); return; }
    const du = e.target.closest('[data-dur]'); if (du) { sel.duree = du.dataset.dur; render(); }
  });
  $('#c-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, v = n => (f.elements[n].value || '').trim(), x = current(), err = $('#c-err');
    const miss = []; if (!x) miss.push(m('s1')); if (!v('nom')) miss.push(m('name')); if (!v('tel')) miss.push(m('phone'));
    if (miss.length) { err.textContent = m('err') + miss.join('، '); err.hidden = false; return; }
    err.hidden = true;
    const when = v('date') ? `${v('date')}${v('heure') ? ' ' + v('heure') : ''} (${TZ})` : '';
    const title = `${M.ar.h1} · ${M.ar[x.mode]} · ${x.duree} ${M.ar.min}`;
    const lines = [m('m_head'), `${m('w_mode')}: ${m(x.mode)}`, `${m('w_dur')}: ${x.duree} ${m('min')} — ${priceTxt(x)}`, `${m('w_topic')}: ${v('topic')}`];
    if (when) lines.push(`${m('w_when')}: ${when}`);
    if (v('question')) lines.push(`${m('w_q')}: ${v('question')}`);
    lines.push(`${m('w_name')}: ${v('nom')}`, `${m('w_phone')}: ${v('tel')}`);
    window.CH.saveOrder({ name: v('nom'), phone: v('tel'), email: v('email'), total: priceTxt(x),
      note: [`${M.ar.w_mode}: ${M.ar[x.mode]}`, `${M.ar.w_topic}: ${v('topic')}`, when && `${M.ar.w_when}: ${when}`, v('question') && `${M.ar.w_q}: ${v('question')}`].filter(Boolean).join('\n'),
      items: [{ type: 'consultation', id: x.id, format: x.mode, title, price: priceTxt(x), option: x.mode }] });
    window.CH.sendWA(lines);
    window.CH.showPay(priceTxt(x));
  });
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  render();
})();
