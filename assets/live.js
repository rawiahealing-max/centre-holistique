// Free live: "Harvest 2026 & your spiritual mission for 2027" — Thursday Dec 10, 2026, 20:00 Tunisia time.
// live-2027.html: landing + registration form.  live-merci.html: thank-you page (YouTube link, Google Calendar, Meta "Lead").
// Registrations are saved in Supabase (table live_registrations, insert-only) and copied to a Google Sheet
// through a Google Apps Script web app (SHEET_URL below, or settings.live_sheet_url in the dashboard data).
(function () {
  'use strict';
  const START = '2026-12-10T20:00:00+01:00', END = '2026-12-10T21:30:00+01:00', EVENT = 'live-2026-12-10';
  const SHEET_URL = ''; // Google Apps Script web-app URL (…/exec); can also come from settings.live_sheet_url
  const YT_URL = 'https://www.youtube.com/live/3zyCQ21mhRQ'; // YouTube live link; can also come from settings.live_youtube
  const page = document.body.dataset.live; // 'form' | 'merci'

  const M = {
    ar: {
      chip: '🎁 لايف مجاني · مباشر على YouTube', h1: 'لايف مجاني', h1b: 'حصاد 2026 ومهمتك الروحية لعام 2027',
      when: 'الخميس 10 ديسمبر 2026 · 20:00 بتوقيت تونس', local: 'بتوقيتك:', intro: 'ساعة من الصدق والنور مع راوية غربال، لتودّع 2026 بامتنان، وتفهم ما الذي يتكرّر في حياتك، وتلمس مهمتك الروحية للعام الجديد.',
      starts: 'يبدأ اللايف بعد', d: 'يوم', h: 'ساعة', m: 'دقيقة', live_now: 'اللايف جارٍ الآن ✨', ended: 'انتهى اللايف، شكراً لكل من حضر 🤍',
      cta: 'سجّل مجاناً', free: 'مجاني 100% · بدون بطاقة بنكية',
      what_t: 'ماذا سنعيش معاً في هذه الأمسية؟',
      pts: [['🌾', 'تمرين حصاد 2026', 'نراجع سنتك بعين رحيمة: ماذا تعلّمت، ماذا تشكر، وماذا حان الوقت لتتركه.'], ['🔁', 'علامات الأنماط المتكررة', 'كيف تتعرّف على النمط نفسه حين يعود في علاقاتك أو مالك أو صحتك، ولماذا يتكرّر.'], ['🕊️', 'تأمل تحرير قصير', 'تأمل موجّه نحرّر فيه معاً ما أثقلك، لتدخل 2027 بقلب أخفّ.']],
      form_t: 'احجز مكانك في اللايف', form_s: 'سجّل الآن، ونرسل لك رابط البث وتذكيراً قبل اللايف.',
      f_name: 'الاسم', f_phone: 'الهاتف / واتساب', f_code: 'رمز البلد', f_country: 'البلد', f_email: 'الإيميل (اختياري)', other: 'بلد آخر',
      send: 'سجّلني في اللايف', sending: 'جارٍ التسجيل…', err_name: 'اكتب اسمك من فضلك.', err_phone: 'اكتب رقم هاتف صحيح من فضلك.', err_email: 'الإيميل غير صحيح.', err_send: 'صار مشكل في التسجيل، عاود من فضلك ولا ابعثلنا على واتساب.',
      privacy: 'معلوماتك تُستعمل فقط لإرسال رابط اللايف والتذكير، ولا تُشارك مع أي جهة.',
      mc_t: 'وبعد اللايف؟', mc_s: 'من 18 إلى 20 ديسمبر: ماستركلاس 2027 «الوفرة والتجلّي الواعي»، 3 أمسيات مباشرة لتكمل الرحلة.', mc_cta: 'اكتشف الماستركلاس',
      thx_chip: '✅ تم تسجيلك', thx_t: 'شكراً {name}، مكانك محجوز 🤍', thx_s: 'نلتقي الخميس 10 ديسمبر 2026 على الساعة 20:00 بتوقيت تونس.',
      yt: '▶️ رابط البث على YouTube', yt_soon: 'رابط البث على YouTube يوصلك على واتساب قبل اللايف.', cal: '📅 أضف إلى Google Calendar',
      tips_t: 'لتستفيد أكثر', tips: ['حضّر ورقة وقلماً لتمرين الحصاد', 'اختر مكاناً هادئاً للتأمل في آخر اللايف', 'فكّر في سؤال تحب أن تطرحه على راوية'],
      cal_title: 'لايف مجاني: حصاد 2026 ومهمتك الروحية لعام 2027', cal_desc: 'لايف مجاني مع راوية غربال — Centre Holistique'
    },
    fr: {
      chip: '🎁 Live gratuit · en direct sur YouTube', h1: 'Live gratuit', h1b: 'La récolte de 2026 et votre mission spirituelle pour 2027',
      when: 'Jeudi 10 décembre 2026 · 20 h heure de Tunisie', local: 'Chez vous :', intro: 'Une heure de vérité et de lumière avec Rawia Ghorbel pour dire au revoir à 2026 avec gratitude, comprendre ce qui se répète dans votre vie et toucher votre mission spirituelle pour la nouvelle année.',
      starts: 'Le live commence dans', d: 'j', h: 'h', m: 'min', live_now: 'Le live est en cours ✨', ended: 'Le live est terminé, merci à tous 🤍',
      cta: 'Je m’inscris gratuitement', free: '100 % gratuit · sans carte bancaire',
      what_t: 'Ce que nous allons vivre ensemble',
      pts: [['🌾', 'L’exercice de la récolte 2026', 'Revisiter votre année avec bienveillance : ce que vous avez appris, ce que vous remerciez, ce qu’il est temps de laisser partir.'], ['🔁', 'Les signes des schémas répétitifs', 'Reconnaître le même schéma quand il revient dans vos relations, votre argent ou votre santé, et comprendre pourquoi il se répète.'], ['🕊️', 'Une courte méditation de libération', 'Une méditation guidée pour libérer ensemble ce qui vous pèse et entrer dans 2027 le cœur plus léger.']],
      form_t: 'Réservez votre place', form_s: 'Inscrivez-vous maintenant : vous recevrez le lien du live et un rappel.',
      f_name: 'Nom', f_phone: 'Téléphone / WhatsApp', f_code: 'Indicatif', f_country: 'Pays', f_email: 'E-mail (facultatif)', other: 'Autre pays',
      send: 'Je réserve ma place', sending: 'Inscription…', err_name: 'Merci d’indiquer votre nom.', err_phone: 'Merci d’indiquer un numéro valide.', err_email: 'E-mail invalide.', err_send: 'L’inscription n’a pas fonctionné, réessayez ou écrivez-nous sur WhatsApp.',
      privacy: 'Vos informations servent uniquement à vous envoyer le lien et le rappel du live. Elles ne sont jamais partagées.',
      mc_t: 'Et après le live ?', mc_s: 'Du 18 au 20 décembre : la Masterclass 2027 « Abondance & Manifestation consciente », 3 soirées en direct pour aller plus loin.', mc_cta: 'Découvrir la masterclass',
      thx_chip: '✅ Inscription confirmée', thx_t: 'Merci {name}, votre place est réservée 🤍', thx_s: 'Rendez-vous le jeudi 10 décembre 2026 à 20 h, heure de Tunisie.',
      yt: '▶️ Le lien du live sur YouTube', yt_soon: 'Le lien YouTube du live vous sera envoyé sur WhatsApp avant le live.', cal: '📅 Ajouter à Google Agenda',
      tips_t: 'Pour en profiter pleinement', tips: ['Préparez une feuille et un stylo pour l’exercice de la récolte', 'Choisissez un endroit calme pour la méditation finale', 'Pensez à une question à poser à Rawia'],
      cal_title: 'Live gratuit : la récolte de 2026 et votre mission spirituelle pour 2027', cal_desc: 'Live gratuit avec Rawia Ghorbel — Centre Holistique'
    },
    en: {
      chip: '🎁 Free live · on YouTube', h1: 'Free live', h1b: 'The harvest of 2026 and your spiritual mission for 2027',
      when: 'Thursday, December 10, 2026 · 8 pm Tunisia time', local: 'Your time:', intro: 'An hour of truth and light with Rawia Ghorbel to say goodbye to 2026 with gratitude, understand what keeps repeating in your life and touch your spiritual mission for the new year.',
      starts: 'The live starts in', d: 'd', h: 'h', m: 'min', live_now: 'The live is on now ✨', ended: 'The live has ended, thank you all 🤍',
      cta: 'Register for free', free: '100% free · no card needed',
      what_t: 'What we will live together',
      pts: [['🌾', 'The 2026 harvest exercise', 'Look back at your year with kindness: what you learned, what you are grateful for, and what it is time to let go.'], ['🔁', 'Signs of repeating patterns', 'Recognise the same pattern when it comes back in your relationships, money or health, and why it repeats.'], ['🕊️', 'A short release meditation', 'A guided meditation to release together what weighs on you and enter 2027 with a lighter heart.']],
      form_t: 'Save your seat', form_s: 'Register now and we will send you the live link and a reminder.',
      f_name: 'Name', f_phone: 'Phone / WhatsApp', f_code: 'Country code', f_country: 'Country', f_email: 'E-mail (optional)', other: 'Other country',
      send: 'Save my seat', sending: 'Registering…', err_name: 'Please enter your name.', err_phone: 'Please enter a valid phone number.', err_email: 'Invalid e-mail.', err_send: 'Registration failed, please try again or message us on WhatsApp.',
      privacy: 'Your details are only used to send you the live link and reminder. They are never shared.',
      mc_t: 'And after the live?', mc_s: 'December 18–20: Masterclass 2027 “Abundance & Conscious Manifestation”, 3 live evenings to go further.', mc_cta: 'Discover the masterclass',
      thx_chip: '✅ You are registered', thx_t: 'Thank you {name}, your seat is saved 🤍', thx_s: 'See you on Thursday, December 10, 2026 at 8 pm Tunisia time.',
      yt: '▶️ The YouTube live link', yt_soon: 'The YouTube link will be sent to you on WhatsApp before the live.', cal: '📅 Add to Google Calendar',
      tips_t: 'To get the most out of it', tips: ['Have a sheet of paper and a pen for the harvest exercise', 'Choose a quiet place for the final meditation', 'Think of a question you would like to ask Rawia'],
      cal_title: 'Free live: the harvest of 2026 and your spiritual mission for 2027', cal_desc: 'Free live with Rawia Ghorbel — Centre Holistique'
    }
  };
  // country, dial code, flag — Tunisia first; the visitor's country is preselected from the time zone
  const COUNTRIES = [
    ['TN', '216', '🇹🇳', 'تونس', 'Tunisie', 'Tunisia'], ['DZ', '213', '🇩🇿', 'الجزائر', 'Algérie', 'Algeria'], ['MA', '212', '🇲🇦', 'المغرب', 'Maroc', 'Morocco'],
    ['LY', '218', '🇱🇾', 'ليبيا', 'Libye', 'Libya'], ['EG', '20', '🇪🇬', 'مصر', 'Égypte', 'Egypt'], ['FR', '33', '🇫🇷', 'فرنسا', 'France', 'France'],
    ['BE', '32', '🇧🇪', 'بلجيكا', 'Belgique', 'Belgium'], ['CH', '41', '🇨🇭', 'سويسرا', 'Suisse', 'Switzerland'], ['DE', '49', '🇩🇪', 'ألمانيا', 'Allemagne', 'Germany'],
    ['IT', '39', '🇮🇹', 'إيطاليا', 'Italie', 'Italy'], ['NL', '31', '🇳🇱', 'هولندا', 'Pays-Bas', 'Netherlands'], ['ES', '34', '🇪🇸', 'إسبانيا', 'Espagne', 'Spain'],
    ['GB', '44', '🇬🇧', 'بريطانيا', 'Royaume-Uni', 'United Kingdom'], ['CA', '1', '🇨🇦', 'كندا', 'Canada', 'Canada'], ['US', '1', '🇺🇸', 'أمريكا', 'États-Unis', 'United States'],
    ['SA', '966', '🇸🇦', 'السعودية', 'Arabie saoudite', 'Saudi Arabia'], ['AE', '971', '🇦🇪', 'الإمارات', 'Émirats arabes unis', 'UAE'], ['QA', '974', '🇶🇦', 'قطر', 'Qatar', 'Qatar'],
    ['KW', '965', '🇰🇼', 'الكويت', 'Koweït', 'Kuwait'], ['BH', '973', '🇧🇭', 'البحرين', 'Bahreïn', 'Bahrain'], ['OM', '968', '🇴🇲', 'عُمان', 'Oman', 'Oman'],
    ['JO', '962', '🇯🇴', 'الأردن', 'Jordanie', 'Jordan'], ['LB', '961', '🇱🇧', 'لبنان', 'Liban', 'Lebanon'], ['IQ', '964', '🇮🇶', 'العراق', 'Irak', 'Iraq'],
    ['TR', '90', '🇹🇷', 'تركيا', 'Turquie', 'Turkey'], ['XX', '', '🌍', '', '', '']
  ];
  const TZ2C = { 'Africa/Tunis': 'TN', 'Africa/Algiers': 'DZ', 'Africa/Casablanca': 'MA', 'Africa/Tripoli': 'LY', 'Africa/Cairo': 'EG', 'Europe/Paris': 'FR', 'Europe/Brussels': 'BE', 'Europe/Zurich': 'CH', 'Europe/Berlin': 'DE', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL', 'Europe/Madrid': 'ES', 'Europe/London': 'GB', 'America/Toronto': 'CA', 'America/Montreal': 'CA', 'America/Vancouver': 'CA', 'America/New_York': 'US', 'America/Chicago': 'US', 'America/Los_Angeles': 'US', 'Asia/Riyadh': 'SA', 'Asia/Dubai': 'AE', 'Asia/Qatar': 'QA', 'Asia/Kuwait': 'KW', 'Asia/Bahrain': 'BH', 'Asia/Muscat': 'OM', 'Asia/Amman': 'JO', 'Asia/Beirut': 'LB', 'Asia/Baghdad': 'IQ', 'Europe/Istanbul': 'TR' };

  const $ = s => document.querySelector(s);
  const lg = () => { const l = window.CH ? window.CH.getLang() : 'ar'; return M[l] ? l : 'fr'; };
  const m = k => M[lg()][k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tz = () => (window.CH && window.CH.tz) || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const locale = () => lg() === 'ar' ? 'ar-TN' : lg() === 'fr' ? 'fr-FR' : 'en-GB';
  const fmt = (iso, z) => new Date(iso).toLocaleString(locale(), { timeZone: z, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
  const settings = () => (window.CH && window.CH.getData() && window.CH.getData().settings) || {};
  const ytUrl = () => settings().live_youtube || YT_URL;
  const sheetUrl = () => settings().live_sheet_url || SHEET_URL;
  const calUrl = () => {
    const z = s => new Date(s).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const details = m('cal_desc') + (ytUrl() ? '\n' + ytUrl() : '') + '\nhttps://www.centreholistique.net/live-2027.html';
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(m('cal_title')) + '&dates=' + z(START) + '/' + z(END) + '&details=' + encodeURIComponent(details) + '&location=' + encodeURIComponent(ytUrl() || 'YouTube Live') + '&ctz=Africa/Tunis';
  };

  function render() {
    document.querySelectorAll('[data-k]').forEach(el => { const v = m(el.dataset.k); if (typeof v === 'string') el.textContent = v; });
    const loc = $('#k-local');
    if (loc) { const a = fmt(START, tz()), b = fmt(START, 'Africa/Tunis'); loc.hidden = a === b; loc.innerHTML = `🌍 ${esc(m('local'))} <b>${esc(a)}</b> <small>(${esc(tz())})</small>`; }
    if (page === 'form') renderForm(); else renderThanks();
    tick();
  }
  function renderForm() {
    $('#k-pts').innerHTML = m('pts').map(([i, t, d]) => `<article class="lv-pt"><span class="lv-pt-i" aria-hidden="true">${i}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');
    const f = $('#live-form'); if (!f) return;
    const li = { ar: 3, fr: 4, en: 5 }[lg()];
    const cur = f.country.value || TZ2C[tz()] || 'TN', curCode = f.code.value;
    f.country.innerHTML = COUNTRIES.map(c => `<option value="${c[0]}">${c[2]} ${esc(c[0] === 'XX' ? m('other') : c[li])}</option>`).join('');
    f.code.innerHTML = COUNTRIES.filter(c => c[1]).map(c => `<option value="${c[1]}" data-c="${c[0]}">${c[2]} +${c[1]}</option>`).join('') + `<option value="">🌍 +…</option>`;
    f.country.value = cur;
    const c = COUNTRIES.find(x => x[0] === cur);
    f.code.value = curCode || (c && c[1]) || '216';
  }
  function renderThanks() {
    let name = ''; try { name = sessionStorage.getItem('ch_live_name') || ''; } catch (e) { /* */ }
    $('#k-thx').textContent = m('thx_t').replace(' {name}', name ? ' ' + name : '').replace('{name}', name);
    const yt = ytUrl();
    $('#k-yt').innerHTML = yt ? `<a class="btn btn-gold" href="${esc(yt)}" target="_blank" rel="noopener">${esc(m('yt'))}</a>` : `<p class="lv-yt-soon">${esc(m('yt_soon'))}</p>`;
    $('#k-cal').href = calUrl();
    $('#k-tips').innerHTML = m('tips').map(x => `<li>${esc(x)}</li>`).join('');
  }
  function tick() {
    const el = $('#k-count'); if (!el) return;
    const ms = new Date(START) - Date.now();
    if (Date.now() > new Date(END)) { el.innerHTML = `<b>${esc(m('ended'))}</b>`; return; }
    if (ms <= 0) { el.innerHTML = `<b>${esc(m('live_now'))}</b>`; return; }
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, mi = Math.floor(ms / 6e4) % 60;
    el.innerHTML = `<span class="mc-cd-l">${esc(m('starts'))}</span><span class="mc-cd"><b>${d}</b> ${esc(m('d'))}</span><span class="mc-cd"><b>${h}</b> ${esc(m('h'))}</span><span class="mc-cd"><b>${mi}</b> ${esc(m('m'))}</span>`;
  }
  setInterval(tick, 30000);
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  if (window.CH && window.CH.getData()) render(); else document.addEventListener('DOMContentLoaded', () => { if (!window.CH || !window.CH.getData()) render(); });

  if (page === 'merci') { try { window.chTrack && window.chTrack('Lead', { content_name: 'Live 2026-12-10' }); } catch (e) { /* */ } }

  // registration
  document.addEventListener('change', e => {
    const f = e.target.form; if (!f || f.id !== 'live-form') return;
    if (e.target.name === 'country') { const c = COUNTRIES.find(x => x[0] === e.target.value); if (c && c[1]) f.code.value = c[1]; }
  });
  document.addEventListener('submit', async e => {
    const f = e.target; if (f.id !== 'live-form') return;
    e.preventDefault();
    const err = $('#live-error'), btn = f.querySelector('button[type=submit]');
    const show = k => { err.textContent = m(k); err.hidden = false; };
    err.hidden = true;
    const name = f.fullname.value.trim(), digits = f.phone.value.replace(/[^\d]/g, '').replace(/^0+/, ''), code = f.code.value, email = f.email.value.trim();
    const cc = COUNTRIES.find(x => x[0] === f.country.value), country = cc ? (cc[0] === 'XX' ? 'Other' : cc[5]) : '';
    if (name.length < 2) return show('err_name');
    if (digits.length < 6 || digits.length > 15) return show('err_phone');
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return show('err_email');
    if (f.website && f.website.value) return; // spam trap
    const phone = (code ? '+' + code + ' ' : '+') + digits;
    const p = new URLSearchParams(location.search);
    const source = ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid'].filter(k => p.get(k)).map(k => k + '=' + p.get(k)).join('&').slice(0, 290) || document.referrer.slice(0, 290);
    const row = { event: EVENT, name: name.slice(0, 120), phone, country, email: email || null, lang: lg(), timezone: tz().slice(0, 80), source };
    btn.disabled = true; const label = btn.textContent; btn.textContent = m('sending');
    let ok = false;
    try { if (window.sb) { const { error } = await window.sb.from('live_registrations').insert(row); ok = !error; } } catch (x) { /* try the sheet */ }
    const sh = sheetUrl();
    if (sh) {
      try {
        const body = new URLSearchParams(Object.assign({}, row, { email: email || '', date: new Date().toISOString() }));
        await fetch(sh, { method: 'POST', mode: 'no-cors', body });
        ok = true;
      } catch (x) { /* */ }
    }
    if (!ok) { btn.disabled = false; btn.textContent = label; return show('err_send'); }
    try { sessionStorage.setItem('ch_live_name', name.split(' ')[0]); } catch (x) { /* */ }
    location.href = 'live-merci.html';
  });
})();
