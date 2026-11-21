// Landing page: Masterclass 2027 — Abundance & Conscious Manifestation (5 live online evenings, Dec 14–18, 2026).
// Booking goes through the site cart (course "bawabat-2027", level 0 = full, 1 = VIP).
(function () {
  'use strict';
  const COURSE = 'bawabat-2027';
  // live evenings, Tunisia time (UTC+1)
  const SESSIONS = ['2026-12-14T20:00:00+01:00', '2026-12-15T20:00:00+01:00', '2026-12-16T20:00:00+01:00', '2026-12-17T20:00:00+01:00', '2026-12-18T20:00:00+01:00'];
  const M = {
    ar: {
      rec_chip: '🎬 ماستركلاس مسجّل · ابدأ فوراً من أي مكان', rec_seats: 'الوصول فوري ودائم بعد الدفع', rec_cta: 'ابدأ الآن', rec_count: '🎬 الأمسيات الخمس مسجّلة ومتاحة فوراً بعد الدفع', rec_final_s: 'ابدأ متى شئت: الأمسيات المسجّلة والكرّاسات تنتظرك في «حسابي».', rec_times_t: 'ابدأ متى شئت', rec_times_s: 'بعد الدفع تجد الأمسيات الخمس المسجّلة والكرّاسات و«خزانة الكنوز» في «حسابي» فوراً، وتبقى متاحة لك بشكل دائم.', chip: '✨ ماستركلاس مباشر عن بُعد · 14–18 ديسمبر 2026', h1: 'ماستركلاس 2027', h1b: 'الوفرة والتجلّي الواعي',
      intro: 'خمس أمسيات مباشرة مع راوية غربال لتختم عام 2026 بسلام، وتتحرّر مما أثقلك، وتفتح باب الوفرة، وتضع نواياك لعام 2027 بوعي ووضوح… من أي مكان في العالم.',
      cta: 'احجز مقعدك', cta2: 'اكتشف البرنامج', starts: 'يبدأ الماستركلاس بعد', d: 'يوم', h: 'ساعة', m: 'دقيقة', live_now: 'الماستركلاس جارٍ الآن ✨', seats: 'المقاعد محدودة',
      pain_t: 'هل تشعر بأن…', pains: ['السنة مرّت مثقلة، وتحمل معك تعباً لم تتخلّص منه بعد', 'الأنماط نفسها تتكرّر في علاقاتك أو في مالك', 'لديك أحلام لعام 2027 لكنك لا تعرف من أين تبدأ', 'تريد أن تدخل السنة الجديدة بطاقة نظيفة ونيّة واضحة'],
      pain_c: 'هذا الماستركلاس صُمّم لك.',
      prog_t: 'برنامج الأمسيات الخمس', prog_s: 'كل أمسية 90 دقيقة مباشرة: شرح واضح، تمارين عملية، تأمل موجّه، ووقت للأسئلة.',
      days: [
        ['الأمسية 1', 'الختام بحب: حصاد 2026', 'مراجعة العام بعين رحيمة، والقوانين الكونية السبعة وكيف تعيشها يومياً، وطقس رسالة التحرّر.'],
        ['الأمسية 2', 'تحرير الكارما والعقود القديمة', 'التعرّف على الأنماط المتكرّرة وجذورها العائلية، وتأمل قطع الروابط الطاقية، وتحرير النذور والعقود التي أدّت مهمتها.'],
        ['الأمسية 3', 'تنظيف الطاقة وفتح باب الوفرة', 'تنظيف الهالة وطاقة البيت قبل العام الجديد، وتحويل معتقدات المال والاستحقاق، وقوة السؤال لفتح إمكانيات جديدة.'],
        ['الأمسية 4', 'التجلّي الواعي لعام 2027', 'طاقة عام 2027 في علم الأعداد، وتمرين القفزة الكمية «كأنّه حدث»، ولوحة الرؤية، وكتابة نواياك الثلاث.'],
        ['الأمسية 5', 'طقس نوايا العام الجديد', 'طقس الشموع والنوايا، وورقة التاروت الجماعية لعام 2027، وتأمل العبور إلى العام الجديد قبل عطلة نهاية السنة.']
      ],
      get_t: 'ماذا تحصل عليه', get: ['5 أمسيات مباشرة عن بُعد (Google Meet)', 'تسجيلات كل الأمسيات متاحة لك بشكل دائم في «حسابي»', 'دفتر العمل «2027» بصيغة PDF', 'تأمل مسجّل «استقبال 2027»', 'بطاقة نوايا قابلة للطباعة', 'تحدّي الوفرة لمدة 21 يوماً في يناير مع مجموعة المتابعة'],
      offers_t: 'اختر صيغتك', most: 'الأكثر طلباً', book: 'احجز الآن',
      o1: ['5 أمسيات مباشرة عن بُعد', 'التسجيلات متاحة لك بشكل دائم', 'دفتر العمل PDF والتأمل المسجّل وبطاقة النوايا', 'تحدّي الوفرة لمدة 21 يوماً مع مجموعة المتابعة'],
      o2: ['كل ما في الماستركلاس الكامل', 'جلسة خاصة 45 دقيقة مع راوية (السجلات الأكاشية أو الثيتا هيلينغ) لنواياك', 'قراءة تاروت مكتوبة لعام 2027 (12 شهراً)', 'جلسة قراءة خريطتك الفلكية لعام 2027 كاملاً'],
      times_t: 'المواعيد بتوقيتك', times_s: 'تُعرض المواعيد تلقائياً حسب البلد الذي تتصفّح منه.', tunis: 'بتوقيت تونس',
      about_t: 'من تقدّم الماستركلاس؟', about: 'راوية غربال معالجة شمولية ومرشدة روحية، ترافق الأفراد والمجموعات منذ أكثر من 8 سنوات بالريكي والثيتا هيلينغ وأكسس بارز والسجلات الأكاشية. أسلوبها يجمع بين العمق والبساطة، في مساحة آمنة وخالية من الأحكام.',
      faq_t: 'أسئلة متكرّرة', faq: [['هل أحتاج إلى معرفة مسبقة؟', 'لا. الماستركلاس مفتوح للجميع، ويُشرح كل شيء خطوة بخطوة.'], ['ماذا لو فاتتني أمسية؟', 'ستجد التسجيل في «حسابي» خلال 24 ساعة، ويبقى متاحاً لك بشكل دائم.'], ['بأي لغة يُقدَّم؟', 'بالعربية، مع توضيحات بالفرنسية عند الحاجة. ويمكن طرح الأسئلة بالعربية أو الفرنسية أو الإنجليزية.'], ['كيف أدفع؟', 'بالبطاقة البنكية أو بالتحويل أو عبر الطرق المعروضة بعد الحجز، وتتلقّى تأكيداً عبر واتساب.']],
      final_t: 'ادخل 2027 بوعي ووضوح', final_s: 'المقاعد محدودة، والحجز مفتوح حتى 13 ديسمبر.',
      note: 'الماستركلاس مرافقة للتطوير الشخصي والرفاه، ولا يعوّض الاستشارة الطبية أو النفسية أو المالية.'
    },
    fr: {
      rec_chip: '🎬 Masterclass enregistrée · commencez dès maintenant', rec_seats: 'Accès immédiat et à vie après le paiement', rec_cta: 'Commencer maintenant', rec_count: '🎬 Les 5 soirées sont enregistrées et disponibles dès le paiement', rec_final_s: 'Commencez quand vous voulez : les soirées enregistrées et les cahiers vous attendent dans « Mon espace ».', rec_times_t: 'Commencez quand vous voulez', rec_times_s: 'Après le paiement, vous trouvez immédiatement les 5 soirées enregistrées, les cahiers et le coffre aux trésors dans « Mon espace », accessibles à vie.', chip: '✨ Masterclass en ligne en direct · 14–18 décembre 2026', h1: 'Masterclass 2027', h1b: 'Abondance & Manifestation consciente',
      intro: 'Cinq soirées en direct avec Rawia Ghorbel pour clôturer 2026 en paix, libérer ce qui vous pèse, ouvrir la porte de l’abondance et poser vos intentions pour 2027 avec clarté… où que vous soyez dans le monde.',
      cta: 'Réserver ma place', cta2: 'Voir le programme', starts: 'La masterclass commence dans', d: 'j', h: 'h', m: 'min', live_now: 'La masterclass a commencé ✨', seats: 'Places limitées',
      pain_t: 'Vous sentez que…', pains: ['L’année a été lourde et vous portez encore une fatigue profonde', 'Les mêmes schémas se répètent dans vos relations ou vos finances', 'Vous avez des rêves pour 2027 mais ne savez pas par où commencer', 'Vous voulez entrer dans la nouvelle année avec une énergie claire et une intention forte'],
      pain_c: 'Cette masterclass est faite pour vous.',
      prog_t: 'Le programme des 5 soirées', prog_s: 'Chaque soirée dure 90 minutes en direct : apports clairs, exercices pratiques, méditation guidée et temps de questions.',
      days: [
        ['Soirée 1', 'Clôturer avec amour : la récolte de 2026', 'Faire le bilan avec bienveillance, les 7 lois universelles au quotidien et le rituel de la lettre de libération.'],
        ['Soirée 2', 'Libérer le karma et les anciens contrats', 'Reconnaître les schémas répétitifs et leurs racines familiales, méditation de coupure des liens et libération des vœux qui ont accompli leur mission.'],
        ['Soirée 3', 'Nettoyer son énergie et ouvrir l’abondance', 'Nettoyage de l’aura et de la maison avant la nouvelle année, transformation des croyances sur l’argent et le mérite, le pouvoir de la question.'],
        ['Soirée 4', 'La manifestation consciente de 2027', 'L’énergie de 2027 en numérologie, l’exercice du saut quantique « comme si c’était déjà là », le tableau de vision et vos trois intentions.'],
        ['Soirée 5', 'Le rituel d’intentions du Nouvel An', 'Rituel des bougies et des intentions, carte de Tarot collective pour 2027 et méditation de passage, avant les fêtes de fin d’année.']
      ],
      get_t: 'Ce que vous recevez', get: ['5 soirées en direct en ligne (Google Meet)', 'Les replays de toutes les soirées, accessibles à vie dans « Mon espace »', 'Le cahier d’exercices « 2027 » en PDF', 'La méditation enregistrée « Accueillir 2027 »', 'Une carte d’intentions à imprimer', 'Le défi Abondance de 21 jours en janvier avec le groupe de suivi'],
      offers_t: 'Choisissez votre formule', most: 'Le plus choisi', book: 'Réserver',
      o1: ['5 soirées en direct en ligne', 'Replays accessibles à vie', 'Cahier PDF, méditation enregistrée et carte d’intentions', 'Défi Abondance de 21 jours avec le groupe de suivi'],
      o2: ['Tout le contenu de la masterclass complète', 'Une séance privée de 45 min avec Rawia (Annales Akashiques ou ThetaHealing®) pour vos intentions', 'Un tirage de Tarot écrit pour 2027 (12 mois)', 'Une séance de lecture de votre carte astrologique pour toute l’année 2027'],
      times_t: 'Les horaires chez vous', times_s: 'Les horaires s’affichent automatiquement selon le pays depuis lequel vous consultez la page.', tunis: 'heure de Tunisie',
      about_t: 'Qui anime la masterclass ?', about: 'Rawia Ghorbel est thérapeute holistique et guide spirituelle. Depuis plus de 8 ans, elle accompagne personnes et groupes avec le Reiki, le ThetaHealing®, les Access Bars® et les Annales Akashiques, avec profondeur et simplicité, dans un espace sûr et sans jugement.',
      faq_t: 'Questions fréquentes', faq: [['Faut-il des connaissances préalables ?', 'Non. La masterclass est ouverte à tous et tout est expliqué pas à pas.'], ['Et si je manque une soirée ?', 'Le replay est disponible dans « Mon espace » sous 24 h, et reste accessible à vie.'], ['En quelle langue ?', 'En arabe, avec des explications en français si besoin. Vous pouvez poser vos questions en arabe, en français ou en anglais.'], ['Comment payer ?', 'Par carte bancaire, virement ou les moyens proposés après la réservation, avec une confirmation par WhatsApp.']],
      final_t: 'Entrez en 2027 avec conscience et clarté', final_s: 'Places limitées, réservations ouvertes jusqu’au 13 décembre.',
      note: 'Cette masterclass est un accompagnement de développement personnel et de bien-être ; elle ne remplace pas un avis médical, psychologique ou financier.'
    },
    en: {
      rec_chip: '🎬 Recorded masterclass · start right away', rec_seats: 'Instant, lifetime access after payment', rec_cta: 'Start now', rec_count: '🎬 All 5 evenings are recorded and available as soon as you pay', rec_final_s: 'Start whenever you like: the recorded evenings and workbooks are waiting in “My space”.', rec_times_t: 'Start whenever you like', rec_times_s: 'After payment you instantly get the 5 recorded evenings, the workbooks and the treasure chest in “My space”, with lifetime access.', chip: '✨ Live online masterclass · December 14–18, 2026', h1: 'Masterclass 2027', h1b: 'Abundance & Conscious Manifestation',
      intro: 'Five live evenings with Rawia Ghorbel to close 2026 in peace, release what weighs on you, open the door to abundance and set your intentions for 2027 with clarity… wherever you are in the world.',
      cta: 'Book my seat', cta2: 'See the programme', starts: 'The masterclass starts in', d: 'd', h: 'h', m: 'min', live_now: 'The masterclass has started ✨', seats: 'Limited seats',
      pain_t: 'Do you feel that…', pains: ['This year has been heavy and you still carry a deep tiredness', 'The same patterns keep repeating in your relationships or finances', 'You have dreams for 2027 but don’t know where to start', 'You want to enter the new year with clear energy and a strong intention'],
      pain_c: 'This masterclass was designed for you.',
      prog_t: 'The five-evening programme', prog_s: 'Each evening is 90 minutes live: clear teaching, practical exercises, guided meditation and time for questions.',
      days: [
        ['Evening 1', 'Closing with love: the harvest of 2026', 'A kind review of the year, the 7 universal laws in daily life and the release-letter ritual.'],
        ['Evening 2', 'Releasing karma and old contracts', 'Recognise repeating patterns and their family roots, a cord-cutting meditation and releasing vows that have done their job.'],
        ['Evening 3', 'Clearing your energy and opening to abundance', 'Aura and home cleansing before the new year, transforming beliefs about money and worthiness, and the power of the question.'],
        ['Evening 4', 'Conscious manifestation for 2027', 'The energy of 2027 in numerology, the quantum-leap “as if it’s already here” exercise, the vision board and your three intentions.'],
        ['Evening 5', 'The New Year intention ritual', 'Candle and intention ritual, a collective Tarot card for 2027 and a passage meditation, before the holiday season.']
      ],
      get_t: 'What you receive', get: ['5 live online evenings (Google Meet)', 'Lifetime access to the replays of every evening in “My space”', 'The “2027” PDF workbook', 'The recorded meditation “Welcoming 2027”', 'A printable intention card', 'A 21-day Abundance challenge in January with the support group'],
      offers_t: 'Choose your option', most: 'Most popular', book: 'Book now',
      o1: ['5 live online evenings', 'Lifetime access to the replays', 'PDF workbook, recorded meditation and intention card', '21-day Abundance challenge with the support group'],
      o2: ['Everything in the full masterclass', 'A private 45-min session with Rawia (Akashic Records or ThetaHealing®) for your intentions', 'A written Tarot reading for 2027 (12 months)', 'An astrology chart reading session for the whole of 2027'],
      times_t: 'Times where you live', times_s: 'Times are shown automatically for the country you are browsing from.', tunis: 'Tunisia time',
      about_t: 'Who leads the masterclass?', about: 'Rawia Ghorbel is a holistic therapist and spiritual guide. For over 8 years she has supported individuals and groups with Reiki, ThetaHealing®, Access Bars® and the Akashic Records, with depth and simplicity, in a safe, judgment-free space.',
      faq_t: 'FAQ', faq: [['Do I need any prior knowledge?', 'No. The masterclass is open to everyone and everything is explained step by step.'], ['What if I miss an evening?', 'The replay is in “My space” within 24 hours and stays available for life.'], ['What language is it in?', 'Arabic, with French explanations when needed. You can ask questions in Arabic, French or English.'], ['How do I pay?', 'By card, bank transfer or the options shown after booking, with a WhatsApp confirmation.']],
      final_t: 'Enter 2027 with awareness and clarity', final_s: 'Limited seats, bookings open until December 13.',
      note: 'This masterclass is personal development and wellbeing support; it does not replace medical, psychological or financial advice.'
    }
  };
  const $ = s => document.querySelector(s);
  const lg = () => { const l = window.CH ? window.CH.getLang() : 'ar'; return M[l] ? l : 'fr'; };
  // after the live week, texts with a rec_ version (chip, seats, cta…) switch to the recorded offer
  const LIVE_END = new Date('2026-12-18T21:30:00+01:00');
  const recorded = () => Date.now() > LIVE_END;
  const m = k => (recorded() && M[lg()]['rec_' + k] !== undefined) ? M[lg()]['rec_' + k] : M[lg()][k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const course = () => window.CH && window.CH.getData() && (window.CH.getData().formations || []).find(f => f.id === COURSE);
  const fmtWhen = (iso, tz) => new Date(iso).toLocaleString(lg() === 'ar' ? 'ar-TN' : lg() === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  function render() {
    document.querySelectorAll('[data-k]').forEach(el => { const v = m(el.dataset.k); if (typeof v === 'string') el.textContent = v; });
    $('#k-pains').innerHTML = m('pains').map(p => `<li>${esc(p)}</li>`).join('');
    $('#k-days').innerHTML = m('days').map(([n, t, d], i) => `<article class="mc-day${i === 4 ? ' bonus' : ''}"><span class="mc-n">${esc(n)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');
    $('#k-get').innerHTML = m('get').map(g => `<li>${esc(g)}</li>`).join('');
    // two offers = the course levels (prices set in the dashboard: 🎓 courses)
    const c = course(), lv = (c && c.niveaux) || [], money = window.CH ? window.CH.money : (p => p && p.eur + ' €');
    const L = window.CH ? window.CH.L : (v => v && v.ar);
    $('#k-offers').innerHTML = [0, 1].filter(i => lv[i]).map(i => `<article class="mc-offer${i === 1 ? ' vip' : ''}">${i === 1 ? `<span class="mc-badge">⭐ VIP</span>` : `<span class="mc-badge soft">${esc(m('most'))}</span>`}
        <h3>${esc(L(lv[i].nom))}</h3><div class="mc-price">${money(lv[i].prix)}</div>
        <ul>${m(i ? 'o2' : 'o1').map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <button class="btn ${i ? 'btn-gold' : 'btn-primary'} btn-block" data-mc="${i}">${esc(m('book'))}</button></article>`).join('');
    const tz = (window.CH && window.CH.tz) || Intl.DateTimeFormat().resolvedOptions().timeZone;
    $('#k-times').innerHTML = recorded() ? '' : SESSIONS.map((s, i) => `<li><b>${esc(m('days')[i][0])}</b><span>${esc(fmtWhen(s, tz))}</span>${fmtWhen(s, tz) !== fmtWhen(s, 'Africa/Tunis') ? `<small>${esc(fmtWhen(s, 'Africa/Tunis'))} (${esc(m('tunis'))})</small>` : ''}</li>`).join('');
    $('#k-faq').innerHTML = m('faq').map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join('');
    const portrait = window.CH && window.CH.getData() && (window.CH.getData().settings || {}).portrait;
    if (portrait && /^https?:\/\//.test(portrait)) $('#k-portrait').src = portrait;
    tick();
  }
  function tick() {
    const el = $('#k-count'); if (!el) return;
    if (recorded()) { el.innerHTML = `<b>${esc(m('count'))}</b>`; return; }
    const ms = new Date(SESSIONS[0]) - Date.now();
    if (ms <= 0) { el.innerHTML = `<b>${esc(m('live_now'))}</b>`; return; }
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, mi = Math.floor(ms / 6e4) % 60;
    el.innerHTML = `<span class="mc-cd-l">${esc(m('starts'))}</span><span class="mc-cd"><b>${d}</b> ${esc(m('d'))}</span><span class="mc-cd"><b>${h}</b> ${esc(m('h'))}</span><span class="mc-cd"><b>${mi}</b> ${esc(m('m'))}</span>`;
  }
  setInterval(tick, 30000);
  try { window.chTrack && window.chTrack('ViewContent', { content_ids: [COURSE], content_name: 'Masterclass 2027' }); } catch (e) { /* */ }
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  if (window.CH && window.CH.getData()) render();

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-mc]'); if (!b || !window.CH) return;
    window.CH.addToCart('formations', COURSE, b.dataset.mc);
    const cart = document.getElementById('cart-btn'); if (cart) cart.click();
  });
})();
