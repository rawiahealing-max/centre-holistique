// Landing page: Masterclass 2027 — Abundance & Conscious Manifestation (3 live online evenings, Dec 18–20, 2026).
// Booking goes through the site cart (course "bawabat-2027", level 0 = full, 1 = VIP).
(function () {
  'use strict';
  const COURSE = 'bawabat-2027';
  // live evenings, Tunisia time (UTC+1)
  const SESSIONS = ['2026-12-18T20:00:00+01:00', '2026-12-19T20:00:00+01:00', '2026-12-20T20:00:00+01:00'];
  const M = {
    ar: {
      early_badge: '🎁 سعر مبكّر حتى 15 ديسمبر', early_then: 'بعدها:', f_title: 'كل المعلومات في لمحة', f_dates: 'التواريخ', f_dates_v: 'الجمعة 18، السبت 19 والأحد 20 ديسمبر 2026', f_time: 'الساعة', f_time_v: '20:00 بتوقيت تونس · 90 دقيقة لكل أمسية', f_where: 'أين؟', f_where_v: 'مباشرة عن بُعد على Google Meet، من أي مكان في العالم', f_rec: 'التسجيلات', f_rec_v: 'تسجيلات الأمسيات + تأملات موجّهة مسجّلة، متاحة لك بشكل دائم', f_lang: 'اللغة', f_lang_v: 'العربية، مع توضيحات بالفرنسية', f_price: 'السعر', f_vip: 'VIP (الخريطة الفلكية + جلسة القفزة الكمية):', f_deadline: 'الحجز مفتوح حتى 17 ديسمبر', f_compare: 'قارن الصيغتين ↓', rec_f_dates: 'الصيغة', rec_f_dates_v: 'مسجّل: 3 أمسيات + تأملات، ابدأ فوراً', rec_f_time: 'المدّة', rec_f_time_v: '3 أمسيات × 90 دقيقة، بالسرعة اللي تناسبك', rec_f_deadline: 'وصول فوري ودائم بعد الدفع',
      rec_chip: '🎬 ماستركلاس مسجّل · ابدأ فوراً من أي مكان', rec_seats: 'الوصول فوري ودائم بعد الدفع', rec_cta: 'ابدأ الآن', rec_count: '🎬 الأمسيات الثلاث والتأملات مسجّلة ومتاحة فوراً بعد الدفع', rec_final_s: 'ابدأ متى شئت: الأمسيات المسجّلة والكرّاسات تنتظرك في «حسابي».', rec_times_t: 'ابدأ متى شئت', rec_times_s: 'بعد الدفع تجد الأمسيات الثلاث المسجّلة والتأملات والكرّاسات و«خزانة الكنوز» في «حسابي» فوراً، وتبقى متاحة لك بشكل دائم.', chip: '✨ ماستركلاس مباشر عن بُعد · 18–20 ديسمبر 2026', h1: 'ماستركلاس 2027', h1b: 'الوفرة والتجلّي الواعي',
      intro: 'ثلاث أمسيات مباشرة مع راوية غربال لتختم عام 2026 بسلام، وتتحرّر مما أثقلك، وتفتح باب الوفرة، وتضع نواياك لعام 2027 بوعي ووضوح… من أي مكان في العالم.',
      cta: 'احجز مقعدك', cta2: 'اكتشف البرنامج', starts: 'يبدأ الماستركلاس بعد', d: 'يوم', h: 'ساعة', m: 'دقيقة', live_now: 'الماستركلاس جارٍ الآن ✨', seats: 'المقاعد محدودة',
      pain_t: 'هل تشعر بأن…', pains: ['السنة مرّت مثقلة، وتحمل معك تعباً لم تتخلّص منه بعد', 'الأنماط نفسها تتكرّر في علاقاتك أو في مالك', 'لديك أحلام لعام 2027 لكنك لا تعرف من أين تبدأ', 'تريد أن تدخل السنة الجديدة بطاقة نظيفة ونيّة واضحة'],
      pain_c: 'هذا الماستركلاس صُمّم لك.',
      prog_t: 'برنامج الأمسيات الثلاث', prog_s: 'كل أمسية 90 دقيقة مباشرة: شرح واضح، تمارين عملية، تأمل موجّه، ووقت للأسئلة.',
      days: [
        ['الأمسية 1 · الجمعة 18 ديسمبر', 'الختام بحب وتحرير الكارما', 'حصاد 2026 بعين رحيمة والقوانين الكونية السبعة، التعرّف على الأنماط المتكرّرة وجذورها العائلية، تأمل قطع الروابط الطاقية وطقس رسالة التحرّر.'],
        ['الأمسية 2 · السبت 19 ديسمبر', 'تنظيف الطاقة وفتح باب الوفرة', 'تنظيف الهالة وطاقة البيت قبل العام الجديد، وتحويل معتقدات المال والاستحقاق، وقوة السؤال لفتح إمكانيات جديدة.'],
        ['الأمسية 3 · الأحد 20 ديسمبر', 'التجلّي الواعي وطقس نوايا 2027', 'طاقة 2027 في علم الأعداد، وتمرين القفزة الكمية «كأنّه حدث»، ولوحة الرؤية ونواياك الثلاث، ثم طقس الشموع وورقة التاروت الجماعية وتأمل العبور إلى العام الجديد.']
      ],
      get_t: 'ماذا تحصل عليه', get: ['3 أمسيات مباشرة عن بُعد (Google Meet) · 18 و19 و20 ديسمبر', 'تسجيلات كل الأمسيات متاحة لك بشكل دائم في «حسابي»', 'دفتر العمل «2027» بصيغة PDF', 'تأملات موجّهة مسجّلة (منها «استقبال 2027») تعاودها متى شئت', 'بطاقة نوايا قابلة للطباعة', 'تحدّي الوفرة لمدة 21 يوماً في يناير مع مجموعة المتابعة'],
      offers_t: 'اختر صيغتك', most: 'الأكثر طلباً', book: 'احجز الآن',
      o1: ['3 أمسيات مباشرة عن بُعد', 'التسجيلات متاحة لك بشكل دائم', 'دفتر العمل PDF والتأملات المسجّلة وبطاقة النوايا', 'تحدّي الوفرة لمدة 21 يوماً مع مجموعة المتابعة'],
      o2: ['كل ما في الماستركلاس الكامل (3 أمسيات، التسجيلات، التأملات والكرّاسات)', '🌌 قراءة خريطتك الفلكية لعام 2027 كاملاً في جلسة خاصة', '🚀 جلسة خاصة «القفزة الكمية» مع راوية (60 دقيقة) لتثبيت نواياك لعام 2027', '🃏 قراءة تاروت مكتوبة لعام 2027 (12 شهراً، شهر بشهر)', '💰 شيك الوفرة 2027 مشحون بالريكي باسمك', '⭐ أولوية لأسئلتك خلال الأمسيات المباشرة'],
      times_t: 'المواعيد بتوقيتك', times_s: 'تُعرض المواعيد تلقائياً حسب البلد الذي تتصفّح منه.', tunis: 'بتوقيت تونس',
      about_t: 'من تقدّم الماستركلاس؟', about: 'راوية غربال معالجة شمولية ومرشدة روحية، ترافق الأفراد والمجموعات منذ أكثر من 8 سنوات بالريكي والثيتا هيلينغ وأكسس بارز والسجلات الأكاشية. أسلوبها يجمع بين العمق والبساطة، في مساحة آمنة وخالية من الأحكام.',
      faq_t: 'أسئلة متكرّرة', faq: [['هل أحتاج إلى معرفة مسبقة؟', 'لا. الماستركلاس مفتوح للجميع، ويُشرح كل شيء خطوة بخطوة.'], ['ماذا لو فاتتني أمسية؟', 'ستجد التسجيل في «حسابي» خلال 24 ساعة، ويبقى متاحاً لك بشكل دائم.'], ['بأي لغة يُقدَّم؟', 'بالعربية، مع توضيحات بالفرنسية عند الحاجة. ويمكن طرح الأسئلة بالعربية أو الفرنسية أو الإنجليزية.'], ['كيف أدفع؟', 'بالبطاقة البنكية أو بالتحويل أو عبر الطرق المعروضة بعد الحجز، وتتلقّى تأكيداً عبر واتساب.']],
      final_t: 'ادخل 2027 بوعي ووضوح', final_s: 'المقاعد محدودة، والحجز مفتوح حتى 17 ديسمبر.',
      note: 'الماستركلاس مرافقة للتطوير الشخصي والرفاه، ولا يعوّض الاستشارة الطبية أو النفسية أو المالية.'
    },
    fr: {
      early_badge: '🎁 Prix early bird jusqu’au 15 décembre', early_then: 'ensuite :', f_title: 'Toutes les infos en un coup d’œil', f_dates: 'Dates', f_dates_v: 'Vendredi 18, samedi 19 et dimanche 20 décembre 2026', f_time: 'Horaire', f_time_v: '20 h heure de Tunisie · 90 min par soirée', f_where: 'Où ?', f_where_v: 'En direct sur Google Meet, où que vous soyez dans le monde', f_rec: 'Enregistrements', f_rec_v: 'Replays des soirées + méditations guidées enregistrées, accessibles à vie', f_lang: 'Langue', f_lang_v: 'Arabe, avec des explications en français', f_price: 'Prix', f_vip: 'VIP (carte astrologique + séance Saut quantique) :', f_deadline: 'Réservations ouvertes jusqu’au 17 décembre', f_compare: 'Comparer les 2 formules ↓', rec_f_dates: 'Format', rec_f_dates_v: 'Enregistrée : 3 soirées + méditations, commencez tout de suite', rec_f_time: 'Durée', rec_f_time_v: '3 soirées × 90 min, à votre rythme', rec_f_deadline: 'Accès immédiat et à vie après le paiement',
      rec_chip: '🎬 Masterclass enregistrée · commencez dès maintenant', rec_seats: 'Accès immédiat et à vie après le paiement', rec_cta: 'Commencer maintenant', rec_count: '🎬 Les 3 soirées et les méditations sont enregistrées et disponibles dès le paiement', rec_final_s: 'Commencez quand vous voulez : les soirées enregistrées et les cahiers vous attendent dans « Mon espace ».', rec_times_t: 'Commencez quand vous voulez', rec_times_s: 'Après le paiement, vous trouvez immédiatement les 3 soirées enregistrées, les méditations, les cahiers et le coffre aux trésors dans « Mon espace », accessibles à vie.', chip: '✨ Masterclass en ligne en direct · 18–20 décembre 2026', h1: 'Masterclass 2027', h1b: 'Abondance & Manifestation consciente',
      intro: 'Trois soirées en direct avec Rawia Ghorbel pour clôturer 2026 en paix, libérer ce qui vous pèse, ouvrir la porte de l’abondance et poser vos intentions pour 2027 avec clarté… où que vous soyez dans le monde.',
      cta: 'Réserver ma place', cta2: 'Voir le programme', starts: 'La masterclass commence dans', d: 'j', h: 'h', m: 'min', live_now: 'La masterclass a commencé ✨', seats: 'Places limitées',
      pain_t: 'Vous sentez que…', pains: ['L’année a été lourde et vous portez encore une fatigue profonde', 'Les mêmes schémas se répètent dans vos relations ou vos finances', 'Vous avez des rêves pour 2027 mais ne savez pas par où commencer', 'Vous voulez entrer dans la nouvelle année avec une énergie claire et une intention forte'],
      pain_c: 'Cette masterclass est faite pour vous.',
      prog_t: 'Le programme des 3 soirées', prog_s: 'Chaque soirée dure 90 minutes en direct : apports clairs, exercices pratiques, méditation guidée et temps de questions.',
      days: [
        ['Soirée 1 · vendredi 18 décembre', 'Clôturer avec amour et libérer le karma', 'La récolte de 2026 avec bienveillance et les 7 lois universelles, reconnaître les schémas répétitifs et leurs racines familiales, méditation de coupure des liens et rituel de la lettre de libération.'],
        ['Soirée 2 · samedi 19 décembre', 'Nettoyer son énergie et ouvrir l’abondance', 'Nettoyage de l’aura et de la maison avant la nouvelle année, transformation des croyances sur l’argent et le mérite, le pouvoir de la question.'],
        ['Soirée 3 · dimanche 20 décembre', 'Manifestation consciente et rituel d’intentions 2027', 'L’énergie de 2027 en numérologie, le saut quantique « comme si c’était déjà là », le tableau de vision et vos trois intentions, puis le rituel des bougies, la carte de Tarot collective et la méditation de passage.']
      ],
      get_t: 'Ce que vous recevez', get: ['3 soirées en direct en ligne (Google Meet) · 18, 19 et 20 décembre', 'Les replays de toutes les soirées, accessibles à vie dans « Mon espace »', 'Le cahier d’exercices « 2027 » en PDF', 'Des méditations guidées enregistrées (dont « Accueillir 2027 »), à refaire quand vous voulez', 'Une carte d’intentions à imprimer', 'Le défi Abondance de 21 jours en janvier avec le groupe de suivi'],
      offers_t: 'Choisissez votre formule', most: 'Le plus choisi', book: 'Réserver',
      o1: ['3 soirées en direct en ligne', 'Replays accessibles à vie', 'Cahier PDF, méditations enregistrées et carte d’intentions', 'Défi Abondance de 21 jours avec le groupe de suivi'],
      o2: ['Tout le contenu de la masterclass complète (3 soirées, replays, méditations et cahiers)', '🌌 La lecture de votre carte astrologique pour toute l’année 2027, en séance privée', '🚀 Une séance privée « Saut quantique » avec Rawia (60 min) pour ancrer vos intentions 2027', '🃏 Un tirage de Tarot écrit pour 2027 (12 mois, mois par mois)', '💰 Votre chèque d’abondance 2027 chargé en Reiki, à votre nom', '⭐ Priorité à vos questions pendant les soirées en direct'],
      times_t: 'Les horaires chez vous', times_s: 'Les horaires s’affichent automatiquement selon le pays depuis lequel vous consultez la page.', tunis: 'heure de Tunisie',
      about_t: 'Qui anime la masterclass ?', about: 'Rawia Ghorbel est thérapeute holistique et guide spirituelle. Depuis plus de 8 ans, elle accompagne personnes et groupes avec le Reiki, le ThetaHealing®, les Access Bars® et les Annales Akashiques, avec profondeur et simplicité, dans un espace sûr et sans jugement.',
      faq_t: 'Questions fréquentes', faq: [['Faut-il des connaissances préalables ?', 'Non. La masterclass est ouverte à tous et tout est expliqué pas à pas.'], ['Et si je manque une soirée ?', 'Le replay est disponible dans « Mon espace » sous 24 h, et reste accessible à vie.'], ['En quelle langue ?', 'En arabe, avec des explications en français si besoin. Vous pouvez poser vos questions en arabe, en français ou en anglais.'], ['Comment payer ?', 'Par carte bancaire, virement ou les moyens proposés après la réservation, avec une confirmation par WhatsApp.']],
      final_t: 'Entrez en 2027 avec conscience et clarté', final_s: 'Places limitées, réservations ouvertes jusqu’au 17 décembre.',
      note: 'Cette masterclass est un accompagnement de développement personnel et de bien-être ; elle ne remplace pas un avis médical, psychologique ou financier.'
    },
    en: {
      early_badge: '🎁 Early-bird price until December 15', early_then: 'then:', f_title: 'Everything at a glance', f_dates: 'Dates', f_dates_v: 'Friday 18, Saturday 19 and Sunday 20 December 2026', f_time: 'Time', f_time_v: '8 pm Tunisia time · 90 min per evening', f_where: 'Where?', f_where_v: 'Live on Google Meet, from anywhere in the world', f_rec: 'Recordings', f_rec_v: 'Replays of the evenings + recorded guided meditations, lifetime access', f_lang: 'Language', f_lang_v: 'Arabic, with French explanations', f_price: 'Price', f_vip: 'VIP (astrology chart + Quantum Leap session):', f_deadline: 'Bookings open until December 17', f_compare: 'Compare the 2 options ↓', rec_f_dates: 'Format', rec_f_dates_v: 'Recorded: 3 evenings + meditations, start right away', rec_f_time: 'Length', rec_f_time_v: '3 evenings × 90 min, at your own pace', rec_f_deadline: 'Instant, lifetime access after payment',
      rec_chip: '🎬 Recorded masterclass · start right away', rec_seats: 'Instant, lifetime access after payment', rec_cta: 'Start now', rec_count: '🎬 All 3 evenings and the meditations are recorded and available as soon as you pay', rec_final_s: 'Start whenever you like: the recorded evenings and workbooks are waiting in “My space”.', rec_times_t: 'Start whenever you like', rec_times_s: 'After payment you instantly get the 3 recorded evenings, the meditations, the workbooks and the treasure chest in “My space”, with lifetime access.', chip: '✨ Live online masterclass · December 18–20, 2026', h1: 'Masterclass 2027', h1b: 'Abundance & Conscious Manifestation',
      intro: 'Three live evenings with Rawia Ghorbel to close 2026 in peace, release what weighs on you, open the door to abundance and set your intentions for 2027 with clarity… wherever you are in the world.',
      cta: 'Book my seat', cta2: 'See the programme', starts: 'The masterclass starts in', d: 'd', h: 'h', m: 'min', live_now: 'The masterclass has started ✨', seats: 'Limited seats',
      pain_t: 'Do you feel that…', pains: ['This year has been heavy and you still carry a deep tiredness', 'The same patterns keep repeating in your relationships or finances', 'You have dreams for 2027 but don’t know where to start', 'You want to enter the new year with clear energy and a strong intention'],
      pain_c: 'This masterclass was designed for you.',
      prog_t: 'The three-evening programme', prog_s: 'Each evening is 90 minutes live: clear teaching, practical exercises, guided meditation and time for questions.',
      days: [
        ['Evening 1 · Friday, December 18', 'Closing with love and releasing karma', 'A kind harvest of 2026 and the 7 universal laws, recognising repeating patterns and their family roots, a cord-cutting meditation and the release-letter ritual.'],
        ['Evening 2 · Saturday, December 19', 'Clearing your energy and opening to abundance', 'Aura and home cleansing before the new year, transforming beliefs about money and worthiness, and the power of the question.'],
        ['Evening 3 · Sunday, December 20', 'Conscious manifestation and the 2027 intention ritual', 'The energy of 2027 in numerology, the quantum-leap “as if it’s already here” exercise, the vision board and your three intentions, then the candle ritual, a collective Tarot card and a passage meditation.']
      ],
      get_t: 'What you receive', get: ['3 live online evenings (Google Meet) · December 18, 19 and 20', 'Lifetime access to the replays of every evening in “My space”', 'The “2027” PDF workbook', 'Recorded guided meditations (including “Welcoming 2027”) to replay whenever you like', 'A printable intention card', 'A 21-day Abundance challenge in January with the support group'],
      offers_t: 'Choose your option', most: 'Most popular', book: 'Book now',
      o1: ['3 live online evenings', 'Lifetime access to the replays', 'PDF workbook, recorded meditations and intention card', '21-day Abundance challenge with the support group'],
      o2: ['Everything in the full masterclass (3 evenings, replays, meditations and workbooks)', '🌌 Your astrology chart reading for the whole of 2027, in a private session', '🚀 A private “Quantum Leap” session with Rawia (60 min) to anchor your 2027 intentions', '🃏 A written Tarot reading for 2027 (12 months, month by month)', '💰 Your Reiki-charged 2027 abundance cheque, in your name', '⭐ Priority for your questions during the live evenings'],
      times_t: 'Times where you live', times_s: 'Times are shown automatically for the country you are browsing from.', tunis: 'Tunisia time',
      about_t: 'Who leads the masterclass?', about: 'Rawia Ghorbel is a holistic therapist and spiritual guide. For over 8 years she has supported individuals and groups with Reiki, ThetaHealing®, Access Bars® and the Akashic Records, with depth and simplicity, in a safe, judgment-free space.',
      faq_t: 'FAQ', faq: [['Do I need any prior knowledge?', 'No. The masterclass is open to everyone and everything is explained step by step.'], ['What if I miss an evening?', 'The replay is in “My space” within 24 hours and stays available for life.'], ['What language is it in?', 'Arabic, with French explanations when needed. You can ask questions in Arabic, French or English.'], ['How do I pay?', 'By card, bank transfer or the options shown after booking, with a WhatsApp confirmation.']],
      final_t: 'Enter 2027 with awareness and clarity', final_s: 'Limited seats, bookings open until December 17.',
      note: 'This masterclass is personal development and wellbeing support; it does not replace medical, psychological or financial advice.'
    }
  };
  const $ = s => document.querySelector(s);
  const lg = () => { const l = window.CH ? window.CH.getLang() : 'ar'; return M[l] ? l : 'fr'; };
  // after the live week, texts with a rec_ version (chip, seats, cta…) switch to the recorded offer
  const LIVE_END = new Date('2026-12-20T21:30:00+01:00');
  const recorded = () => Date.now() > LIVE_END;
  const m = k => (recorded() && M[lg()]['rec_' + k] !== undefined) ? M[lg()]['rec_' + k] : M[lg()][k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const course = () => window.CH && window.CH.getData() && (window.CH.getData().formations || []).find(f => f.id === COURSE);
  const fmtWhen = (iso, tz) => new Date(iso).toLocaleString(lg() === 'ar' ? 'ar-TN' : lg() === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: tz, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  function render() {
    document.querySelectorAll('[data-k]').forEach(el => { const v = m(el.dataset.k); if (typeof v === 'string') el.textContent = v; });
    $('#k-pains').innerHTML = m('pains').map(p => `<li>${esc(p)}</li>`).join('');
    $('#k-days').innerHTML = m('days').map(([n, t, d], i) => `<article class="mc-day${i === m('days').length - 1 ? ' bonus' : ''}"><span class="mc-n">${esc(n)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');
    $('#k-get').innerHTML = m('get').map(g => `<li>${esc(g)}</li>`).join('');
    // two offers = the course levels (prices set in the dashboard: 🎓 courses)
    const c = course(), lv = (c && c.niveaux) || [], money = window.CH ? window.CH.money : (p => p && p.eur + ' €');
    const L = window.CH ? window.CH.L : (v => v && v.ar);
    const tndOf = pr => (pr && pr.tnd && window.CH) ? window.CH.fmtMoney(+pr.tnd, 'tnd') : money(pr);
    const priceHtml = pr => { const a = tndOf(pr), b = money(pr); return b && b !== a ? `${a} <small class="mc-alt">(≈ ${b})</small>` : a; };
    $('#k-offers').innerHTML = [0, 1].filter(i => lv[i]).map(i => `<article class="mc-offer${i === 1 ? ' vip' : ''}">${i === 1 ? `<span class="mc-badge">⭐ VIP</span>` : `<span class="mc-badge soft">${esc(m('most'))}</span>`}
        <h3>${esc(L(lv[i].nom))}</h3><div class="mc-price">${priceHtml(lv[i].prix)}${lv[i].prix_full ? ` <s class="mc-old">${tndOf(lv[i].prix_full)}</s>` : ''}</div>${lv[i].prix_full ? `<p class="mc-early">${esc(m('early_badge'))} · ${esc(m('early_then'))} <bdi>${tndOf(lv[i].prix_full)}</bdi></p>` : ''}
        <ul>${m(i ? 'o2' : 'o1').map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <button class="btn ${i ? 'btn-gold' : 'btn-primary'} btn-block" data-mc="${i}">${esc(m('book'))}</button></article>`).join('');
    const tz = (window.CH && window.CH.tz) || Intl.DateTimeFormat().resolvedOptions().timeZone;
    // hero "everything at a glance" card: dates, time, place, recordings, language and price
    const fx = $('#k-facts');
    if (fx) {
      const row = (ic, k, v) => `<li><span class="mc-f-ic" aria-hidden="true">${ic}</span><div><b>${esc(m(k))}</b><span>${esc(m(v))}</span></div></li>`;
      const p0 = lv[0] ? tndOf(lv[0].prix) : '', p1 = lv[1] ? tndOf(lv[1].prix) : '', p0alt = lv[0] ? money(lv[0].prix) : '';
      const localT = !recorded() && fmtWhen(SESSIONS[0], tz) !== fmtWhen(SESSIONS[0], 'Africa/Tunis')
        ? `<li class="mc-f-local"><span class="mc-f-ic" aria-hidden="true">🌍</span><div><span>${esc(new Date(SESSIONS[0]).toLocaleTimeString(lg() === 'ar' ? 'ar-TN' : lg() === 'fr' ? 'fr-FR' : 'en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }))} · ${esc(tz)}</span></div></li>` : '';
      fx.innerHTML = `<h2 class="mc-f-t">${esc(m('f_title'))}</h2>
        ${p0 ? `<div class="mc-f-price"><span>${esc(m('f_price'))}</span><strong>${p0}</strong>${lv[0] && lv[0].prix_full ? `<s class="mc-old">${tndOf(lv[0].prix_full)}</s>` : ''}${p0alt && p0alt !== p0 ? `<small class="mc-alt">≈ ${p0alt}</small>` : ''}${lv[0] && lv[0].prix_full ? `<small class="mc-early">${esc(m('early_badge'))} · ${esc(m('early_then'))} <bdi>${tndOf(lv[0].prix_full)}</bdi></small>` : ''}${p1 ? `<small>${esc(m('f_vip'))} <b>${p1}</b></small>` : ''}</div>` : ''}
        <ul class="mc-f-list">${row('📅', 'f_dates', 'f_dates_v')}${row('🕗', 'f_time', 'f_time_v')}${localT}${row('💻', 'f_where', 'f_where_v')}${row('🎧', 'f_rec', 'f_rec_v')}${row('🗣️', 'f_lang', 'f_lang_v')}</ul>
        <button class="btn btn-gold btn-block" data-mc="0">${esc(m('book'))}${p0 ? ' · ' + p0 : ''}</button>
        <a class="mc-f-more" href="#offres">${esc(m('f_compare'))}</a>
        <p class="mc-f-dl">⏳ ${esc(m('f_deadline'))}</p>`;
    }
    // show the price on the main hero button too (visible on the first screen on phones)
    const heroCta = document.querySelector('.hero-cta [data-k="cta"]');
    if (heroCta && lv[0]) heroCta.innerHTML = `${esc(m('cta'))} · <bdi><b>${tndOf(lv[0].prix)}</b></bdi>`;
    $('#k-times').innerHTML = recorded() ? '' : SESSIONS.map((s, i) => `<li><b>${esc(m('days')[i][0].split(' · ')[0])}</b><span>${esc(fmtWhen(s, tz))}</span>${fmtWhen(s, tz) !== fmtWhen(s, 'Africa/Tunis') ? `<small>${esc(fmtWhen(s, 'Africa/Tunis'))} (${esc(m('tunis'))})</small>` : ''}</li>`).join('');
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
