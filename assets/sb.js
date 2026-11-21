// Supabase connection (public values only — the publishable/anon key is meant to be in the browser;
// all protection is done by Row Level Security rules in the database).
window.SB_CONFIG = {
  url: 'https://mhhzppszrqzjktqlgqag.supabase.co',
  key: 'sb_publishable_crFQdc1MqVa0vWgcD3NRrA_WutJxaJX'
};
window.sbReady = !!(window.supabase && window.SB_CONFIG.key && !/PASTE_/.test(window.SB_CONFIG.key));
window.sb = window.sbReady ? window.supabase.createClient(window.SB_CONFIG.url, window.SB_CONFIG.key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
}) : null;

// Load the site content: database first, then the static file as a fallback
window.loadSiteContent = async function () {
  if (window.sb) {
    try {
      // never let a slow connection block the page: give the database 5 s, then use the built-in content
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000));
      const { data, error } = await Promise.race([window.sb.from('site_content').select('data').eq('id', 1).maybeSingle(), timeout]);
      if (!error && data && data.data) { window.applyContentPatches(data.data); return data.data; }
    } catch (e) { /* fall back */ }
  }
  const r = await fetch('data/site.json?v=' + Date.now());
  const d = await r.json(); window.applyContentPatches(d); return d;
};

// Public URL for a file in the public bucket, or a short-lived signed URL for the private bucket
window.fileUrl = async function (path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  if (!window.sb) return '';
  const [bucket, ...rest] = path.split('/');
  const key = rest.join('/');
  if (bucket === 'public') return window.sb.storage.from('public').getPublicUrl(key).data.publicUrl;
  const { data } = await window.sb.storage.from('private').createSignedUrl(key, 60 * 60 * 3);
  return data ? data.signedUrl : '';
};

// YouTube / Vimeo → embeddable URL
window.embedUrl = function (u) {
  if (!u) return '';
  let m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1`;
  m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return '';
};

// Content additions made by Claude. Applied on top of the saved content until they are saved from the dashboard.
// Each patch runs only if its content is missing, so editing or deleting it in the dashboard is respected once published.
window.applyContentPatches = function (D) {
  if (!D) return false;
  let changed = false;
  D.patches_done = D.patches_done || [];
  const once = (id, fn) => { if (!D.patches_done.includes(id)) { fn(); D.patches_done.push(id); changed = true; } };

  once('thetahealing-2026-11', () => {
    D.soins = D.soins || [];
    if (!D.soins.some(s => s.id === 'thetahealing')) {
      const theta = {
        id: 'thetahealing', categorie: 'energie', icone: 'crystal', theme: 'indigo', image: '', en_ligne: true,
        titre: { ar: 'جلسة ثيتا هيلينغ ThetaHealing®', fr: 'Séance de ThetaHealing®', en: 'ThetaHealing® Session' },
        duree: { ar: '60 دقيقة', fr: '60 min', en: '60 min' },
        prix: { tnd: '130', eur: '50', usd: '55' },
        description: {
          ar: 'تقنية تأمل تعتمد على حالة موجات «ثيتا» الدماغية، للوصول إلى المعتقدات المقيّدة العميقة وتحويلها، وتحرير المشاعر والذكريات التي تعيقك. متوفرة في المركز أو أونلاين.',
          fr: "Technique de méditation basée sur l'état d'ondes cérébrales thêta, pour identifier et transformer les croyances limitantes profondes et libérer les émotions et mémoires qui vous bloquent. Au centre ou en ligne.",
          en: 'A meditation technique using the theta brainwave state to identify and transform deep limiting beliefs and release the emotions and memories holding you back. At the centre or online.'
        }
      };
      const i = D.soins.findIndex(s => s.id === 'reiki');
      D.soins.splice(i >= 0 ? i + 1 : D.soins.length, 0, theta);
    }
    const s = D.settings = D.settings || {};
    const add = (key, lang, find, repl) => {
      if (s[key] && typeof s[key] === 'object' && s[key][lang] && !/theta/i.test(s[key][lang]) && s[key][lang].includes(find)) s[key][lang] = s[key][lang].replace(find, repl);
    };
    add('bio', 'ar', 'الريكي،', 'الريكي، الثيتا هيلينغ (ThetaHealing®)،');
    add('bio', 'fr', 'au Reiki,', 'au Reiki, au ThetaHealing®,');
    add('bio', 'en', 'Reiki,', 'Reiki, ThetaHealing®,');
    if (s.certifs && typeof s.certifs === 'object') {
      const line = { ar: 'ممارسة ThetaHealing®', fr: 'Praticienne ThetaHealing®', en: 'ThetaHealing® practitioner' };
      ['ar', 'fr', 'en'].forEach(l => { if (s.certifs[l] && !/theta/i.test(s.certifs[l])) s.certifs[l] = s.certifs[l].split('\n').reduce((a, x, i) => (i === 0 ? [x, line[l]] : [...a, x]), []).join('\n'); });
    }
  });
  once('membership-plan-2026-11', () => {
    const lumiere = (D.abonnements || []).find(a => a.id === 'cercle-lumiere');
    const ame = (D.abonnements || []).find(a => a.id === 'cercle-ame');
    if (lumiere) {
      lumiere.accroche = { ar: 'رحلة شهرية بثيمة جديدة كل شهر', fr: 'Un voyage mensuel, un nouveau thème chaque mois', en: 'A monthly journey with a new theme each month' };
      lumiere.avantages = {
        ar: 'تأمل القمر الجديد مباشر كل شهر + وضع النوايا\n«طاقة الشهر»: قراءة تاروت جماعية مسجّلة\nتأمل جديد مسجّل كل شهر على ثيمة الشهر\nشات الدائرة: مجتمع داعم ومتابعة يومية\nهدية الترحيب: تأمل «بداية الرحلة» + دليل PDF\nتخفيض 10% على كل الجلسات',
        fr: 'Méditation de Nouvelle Lune en direct chaque mois + intentions\n« Énergie du mois » : tirage de Tarot collectif enregistré\nUne nouvelle méditation enregistrée chaque mois sur le thème du mois\nChat du Cercle : communauté bienveillante et suivi quotidien\nCadeau de bienvenue : méditation « Début du voyage » + guide PDF\n-10 % sur toutes les séances',
        en: 'Live New Moon meditation every month + intentions\n"Energy of the month": recorded collective Tarot reading\nA new recorded meditation every month on the monthly theme\nCircle chat: caring community and daily follow-up\nWelcome gift: "Start of the journey" meditation + PDF guide\n10% off every session'
      };
    }
    if (ame) {
      ame.accroche = { ar: 'الأكثر اختياراً — مرافقة كاملة كل شهر', fr: 'Le plus choisi — un accompagnement complet chaque mois', en: 'Most popular — full support every month' };
      ame.avantages = {
        ar: 'كل مزايا «دائرة النور»\nجلسة فردية 30 دقيقة كل شهر: قراءة، ثيتا هيلينغ أو علاج طاقي\nطقوس البدر + ريكي جماعي عن بعد (مباشر)\nلايف أسئلة وأجوبة شهري\nورشة شهرية صغيرة على ثيمة الشهر + تمارين PDF\nمكتبة كل التسجيلات والتأملات\nبعد 3 أشهر: قراءة تاروت مجانية 🎁\nتخفيض 20% على الجلسات والدورات',
        fr: 'Tous les avantages du Cercle Lumière\n1 séance individuelle de 30 min par mois : lecture, ThetaHealing® ou soin énergétique\nRituel de Pleine Lune + Reiki collectif à distance (en direct)\nLive Questions/Réponses mensuel\nAtelier mensuel sur le thème du mois + exercices PDF\nBibliothèque de tous les replays et méditations\nAprès 3 mois : un tirage de Tarot offert 🎁\n-20 % sur les séances et formations',
        en: 'Everything in Light Circle\n1 private 30-min session each month: reading, ThetaHealing® or energy healing\nFull Moon ritual + remote group Reiki (live)\nMonthly live Q&A\nMonthly workshop on the theme + PDF exercises\nLibrary of all replays and meditations\nAfter 3 months: a free Tarot reading 🎁\n20% off sessions and trainings'
      };
    }
    // December 2026 programme — theme: "Release & close the year"
    const ev = (id, date, heure, icone, theme, membres, titre, description) => ({ id, date, heure, icone, theme, membres, actif: true, titre, description });
    D.evenements = [
      ev('dec-energie', '2026-12-01', '19:00', 'cards', 'rose', true,
        { ar: '🔮 طاقة ديسمبر + تأمل الشهر', fr: '🔮 Énergie de décembre + méditation du mois', en: '🔮 December energy + meditation of the month' },
        { ar: 'ثيمة الشهر: «التحرر وغلق السنة». قراءة تاروت جماعية وتأمل «أترك ما لم يعد يخدمني».', fr: 'Thème du mois : « Lâcher-prise et clôturer l’année ». Tirage collectif et méditation « Je laisse partir ce qui ne me sert plus ».', en: 'Theme of the month: "Release & close the year". Collective reading and "Letting go of what no longer serves me" meditation.' }),
      ev('dec-nouvelle-lune', '2026-12-09', '20:00', 'moon', 'indigo', true,
        { ar: '🌑 تأمل القمر الجديد', fr: '🌑 Méditation de Nouvelle Lune', en: '🌑 New Moon Meditation' },
        { ar: 'نضع نوايا العام الجديد معاً في تأمل موجّه مباشر.', fr: 'Posons ensemble nos intentions pour la nouvelle année en méditation guidée.', en: 'Set your intentions for the new year together in a live guided meditation.' }),
      ev('dec-atelier', '2026-12-16', '20:00', 'book', 'gold', true,
        { ar: '📚 ورشة: رسالة إلى نفسي للعام القادم', fr: '📚 Atelier : lettre à moi-même pour l’année à venir', en: '📚 Workshop: a letter to myself for the year ahead' },
        { ar: 'ورشة كتابة علاجية + تمارين PDF، لدائرة الروح.', fr: 'Atelier d’écriture thérapeutique + exercices PDF, pour le Cercle Âme.', en: 'Therapeutic writing workshop + PDF exercises, for the Soul Circle.' }),
      ev('dec-pleine-lune', '2026-12-24', '20:30', 'crystal', 'violet', true,
        { ar: '🌕 طقوس البدر + ريكي جماعي', fr: '🌕 Rituel de Pleine Lune + Reiki collectif', en: '🌕 Full Moon ritual + group Reiki' },
        { ar: 'نتحرر مما حملناه طوال السنة، ثم جلسة ريكي جماعية عن بعد.', fr: 'Libérons ce que nous avons porté toute l’année, puis soin Reiki collectif à distance.', en: 'Release what we carried all year, then a remote group Reiki session.' }),
      ev('dec-live', '2026-12-28', '19:00', 'mind', 'blue', false,
        { ar: '🎤 لايف مجاني: أسئلة وأجوبة', fr: '🎤 Live gratuit : Questions / Réponses', en: '🎤 Free Live: Q&A' },
        { ar: 'لايف مفتوح للجميع على إنستغرام. اسألوا كل ما تريدون!', fr: 'Live ouvert à tous sur Instagram. Posez toutes vos questions !', en: 'Open live on Instagram for everyone. Ask me anything!' })
    ];
  });
  once('bio-guide-2026-11', () => {
    const s = D.settings = D.settings || {};
    s.titre_praticienne = { ar: 'مرشدة ومعلّمة روحية · معالجة شمولية', fr: 'Guide et enseignante spirituelle · Thérapeute holistique', en: 'Spiritual guide & teacher · Holistic healer' };
    s.bio = {
      ar: 'أنا مرشدة ومعلّمة روحية ومعالجة شمولية. رسالتي أن أرافقك لتكتشف النور الذي يسكن داخلك منذ الأزل… ذلك النور الذي غطّته الجروح والمخاوف وضجيج الحياة. معاً، نحرّر ما يُثقل قلبك، نشفي الذكريات التي تؤلمك، ونعيد وصلك بحكمتك الداخلية وبقوّتك الحقيقية.',
      fr: 'Je suis guide et enseignante spirituelle, thérapeute holistique. Ma mission : vous accompagner à redécouvrir la lumière qui vit en vous depuis toujours… cette lumière que les blessures, les peurs et le bruit du monde ont parfois voilée. Ensemble, nous libérons ce qui pèse sur votre cœur, nous apaisons les mémoires douloureuses et nous vous reconnectons à votre sagesse intérieure et à votre véritable puissance.',
      en: 'I am a spiritual guide, teacher and holistic healer. My mission is to walk beside you as you rediscover the light that has always lived within you… the light that wounds, fears and the noise of life may have covered. Together, we release what weighs on your heart, heal the memories that still hurt, and reconnect you with your inner wisdom and your true power.'
    };
    s.bio2 = {
      ar: 'من خلال الريكي، الثيتا هيلينغ (ThetaHealing®)، العلاج الطاقي، قراءة السجلات الأكاشية، التاروت والأبراج العائلية، أفتح لك مساحة آمنة ودافئة وخالية من الأحكام… مساحة تتنفّس فيها، تتشافى، وتتذكّر من أنت حقاً. لأنك لم تأتِ إلى هذه الحياة لتعيش نصفها… بل لتُشرق ✨',
      fr: 'À travers le Reiki, le ThetaHealing®, les soins énergétiques, les Annales Akashiques, le Tarot et les Constellations familiales, je vous offre un espace sûr, chaleureux et sans jugement… un lieu pour respirer, guérir et vous souvenir de qui vous êtes vraiment. Parce que vous n’êtes pas venu(e) au monde pour vivre à moitié… mais pour rayonner ✨',
      en: 'Through Reiki, ThetaHealing®, energy healing, Akashic Records, Tarot and Family Constellations, I offer you a safe, warm and non-judgmental space… a place to breathe, to heal, and to remember who you truly are. Because you did not come into this life to live it halfway… but to shine ✨'
    };
  });
  once('access-bars-2026-11', () => {
    D.soins = D.soins || [];
    if (!D.soins.some(x => x.id === 'access-bars')) {
      const bars = {
        id: 'access-bars', categorie: 'energie', icone: 'lotus', theme: 'gold', image: '', en_ligne: false,
        titre: { ar: 'جلسة أكسس بارز Access Bars®', fr: 'Séance Access Bars®', en: 'Access Bars® Session' },
        duree: { ar: '60–90 دقيقة', fr: '60–90 min', en: '60–90 min' },
        prix: { tnd: '120', eur: '45', usd: '50' },
        description: {
          ar: 'جلسة لطيفة من مدرسة Access Consciousness®، يتم فيها لمس 32 نقطة على الرأس بخفّة، لتساعدك على تحرير الأفكار والمعتقدات والمشاعر المخزّنة، وتهدئة الذهن، والشعور بخفّة ومساحة أكبر في حياتك. في المركز.',
          fr: 'Une séance douce issue d’Access Consciousness® : 32 points sont légèrement touchés sur la tête pour aider à libérer pensées, croyances et émotions accumulées, apaiser le mental et retrouver légèreté et espace dans votre vie. Au centre.',
          en: 'A gentle session from Access Consciousness®: 32 points on the head are lightly touched to help release stored thoughts, beliefs and emotions, quiet the mind and bring more lightness and space into your life. At the centre.'
        }
      };
      const i = D.soins.findIndex(x => x.id === 'thetahealing');
      D.soins.splice(i >= 0 ? i + 1 : D.soins.length, 0, bars);
    }
    const s = D.settings = D.settings || {};
    const rep = (key, l, find, by) => { if (s[key] && s[key][l] && !/Access/i.test(s[key][l]) && s[key][l].includes(find)) s[key][l] = s[key][l].replace(find, by); };
    rep('bio2', 'ar', 'الثيتا هيلينغ (ThetaHealing®)،', 'الثيتا هيلينغ (ThetaHealing®)، الأكسس بارز (Access Bars®)،');
    rep('bio2', 'fr', 'le ThetaHealing®,', 'le ThetaHealing®, les Access Bars®,');
    rep('bio2', 'en', 'ThetaHealing®,', 'ThetaHealing®, Access Bars®,');
    if (s.certifs && typeof s.certifs === 'object') {
      const line = { ar: 'ممارسة Access Bars® – مدرسة Access Consciousness®', fr: 'Praticienne Access Bars® – Access Consciousness®', en: 'Access Bars® practitioner – Access Consciousness®' };
      ['ar', 'fr', 'en'].forEach(l => {
        if (!s.certifs[l] || /Access/i.test(s.certifs[l])) return;
        const lines = s.certifs[l].split('\n'), j = lines.findIndex(x => /theta/i.test(x));
        lines.splice(j >= 0 ? j + 1 : 1, 0, line[l]); s.certifs[l] = lines.join('\n');
      });
    }
  });
  once('sfax-2026-11', () => {
    const s = D.settings = D.settings || {};
    s.adresse = { ar: 'صفاقس، تونس', fr: 'Sfax, Tunisie', en: 'Sfax, Tunisia' };
    s.maps = 'https://www.google.com/maps?q=34.7435365,10.7644474';
    const fix = v => typeof v === 'string' ? v.replace(/بتونس(?! \(صفاقس\))/g, 'بتونس (صفاقس)').replace(/à Tunis\b/g, 'à Sfax').replace(/in Tunis\b/g, 'in Sfax').replace(/heure de Tunis/g, 'heure tunisienne').replace(/Tunis time/g, 'Tunisia time') : v;
    ['intro', 'horaires', 'bio', 'bio2'].forEach(k => { if (s[k] && typeof s[k] === 'object') ['ar', 'fr', 'en'].forEach(l => { s[k][l] = fix(s[k][l]); }); });
    (D.faq || []).forEach(f => ['ar', 'fr', 'en'].forEach(l => { if (f.r) f.r[l] = fix(f.r[l]); }));
  });
  once('address-full-2026-11', () => {
    const s = D.settings = D.settings || {};
    s.adresse = {
      ar: 'عمارة الكوثر، الطابق الثالث، نهج الجيش، صفاقس 3047، تونس',
      fr: 'Immeuble El Kawthar, 3ᵉ étage, Rue de l’Armée, 3047 Sfax, Tunisie',
      en: 'El Kawthar Building, 3rd floor, Rue de l’Armée, 3047 Sfax, Tunisia'
    };
  });
  once('social-facebook-2026-11', () => {
    const s = D.settings = D.settings || {};
    s.facebook = 'https://www.facebook.com/centreholistique';
  });
  once('social-instagram-2026-11', () => {
    const s = D.settings = D.settings || {};
    s.instagram = 'https://www.instagram.com/rawiahealing/';
  });
  once('blog-starter-2026-11', () => {
    D.blog = D.blog || [];
    const add = p => { if (!D.blog.some(x => x.slug === p.slug)) D.blog.push({ actif: true, icone: 'lotus', theme: 'violet', image: '', ...p, id: p.slug }); };
    add({
      slug: 'meditation-5-minutes-par-jour', date: '2026-11-19', icone: 'moon', theme: 'indigo',
      categorie: { ar: 'تأمل', fr: 'Méditation', en: 'Meditation' },
      titre: { ar: 'تأمل 5 دقائق في اليوم لتهدئة الذهن', fr: 'Méditation : 5 minutes par jour pour apaiser le mental', en: '' },
      resume: { ar: 'تمرين تأمل بسيط يمكنك ممارسته في أي مكان وفي 5 دقائق فقط، لتستعيد هدوء ذهنك وتعود إلى ذاتك.', fr: 'Un exercice de méditation simple, à faire n’importe où en 5 minutes, pour calmer le mental et revenir à soi.', en: '' },
      contenu: {
        ar: `نعيش في ضجيج دائم: إشعارات، أفكار، مسؤوليات… والذهن لا يرتاح أبداً. والخبر الجميل أنك لا تحتاج إلى ساعات لتستعيد هدوءك. **خمس دقائق في اليوم** تكفي لتبدأ في الإحساس بالفرق.

## لماذا التأمل اليومي؟
التأمل ليس «إفراغ الذهن» من كل فكرة، بل هو ببساطة أن تُعيد انتباهك إلى اللحظة الحاضرة، بلطف، كلما شرد. ومع الوقت، يساعد هذا التمرين البسيط على:
- تخفيف التوتر والضغط اليومي
- نوم أهدأ وأعمق
- صفاء الذهن وهدوء القرارات
- علاقة ألطف مع مشاعرك

## التمرين: 5 دقائق فقط
- **الدقيقة 1:** اجلس في وضعية مريحة، ظهرك مستقيم وكتفاك مرتخيان. أغمض عينيك أو اخفض نظرك.
- **الدقيقة 2:** تنفّس من أنفك: شهيق على 4 عدّات، وزفير على 6 عدّات. الزفير الطويل يقول لجسدك: «أنت في أمان».
- **الدقيقة 3:** ضع انتباهك على إحساس النَّفَس: الهواء البارد وهو يدخل، والدافئ وهو يخرج.
- **الدقيقة 4:** إذا جاءت فكرة، قل لنفسك بلطف «فكرة» وعُد إلى النَّفَس، دون أن تلوم نفسك.
- **الدقيقة 5:** ضع يدك على قلبك، وردّد في داخلك جملة لطيفة: «أنا هنا، وأنا بخير في هذه اللحظة».

> السرّ ليس في طول التأمل، بل في الاستمرارية. خمس دقائق كل يوم أفضل من ساعة مرة في الشهر.

## نصائح للمواظبة
اختر الوقت نفسه كل يوم (في الصباح قبل الهاتف، أو قبل النوم). اربطه بعادة لديك أصلاً، مثل قهوة الصباح. وإذا نسيت يوماً، فلا بأس: عُد في الغد بكل لطف.

ولتذهب أبعد، تجد [تأملات موجّهة صوتية](meditations.html) على الموقع، ونلتقي كل شهر في **تأمل القمر الجديد مباشرةً** مع أعضاء [الدائرة الشهرية](index.html#cercle) ✨`,
        fr: `Nous vivons dans un bruit permanent : notifications, pensées, responsabilités… et le mental ne se repose jamais. La bonne nouvelle, c’est qu’il ne faut pas des heures pour retrouver le calme. **Cinq minutes par jour** suffisent pour commencer à sentir la différence.

## Pourquoi méditer chaque jour ?
Méditer, ce n’est pas « faire le vide ». C’est simplement ramener son attention dans l’instant présent, avec douceur, chaque fois qu’elle s’échappe. Avec le temps, cette pratique toute simple aide à :
- diminuer le stress du quotidien
- retrouver un sommeil plus paisible
- avoir l’esprit plus clair pour décider
- accueillir ses émotions avec plus de bienveillance

## L’exercice : 5 minutes chrono
- **Minute 1 :** asseyez-vous confortablement, dos droit, épaules relâchées. Fermez les yeux ou baissez le regard.
- **Minute 2 :** respirez par le nez : inspirez sur 4 temps, expirez sur 6 temps. L’expiration longue dit à votre corps : « tu es en sécurité ».
- **Minute 3 :** posez votre attention sur la sensation du souffle : l’air frais qui entre, l’air tiède qui sort.
- **Minute 4 :** si une pensée arrive, notez simplement « pensée » et revenez au souffle, sans vous juger.
- **Minute 5 :** posez une main sur le cœur et dites intérieurement une phrase douce : « Je suis là, et je vais bien en cet instant. »

> Le secret n’est pas la durée, mais la régularité. Cinq minutes chaque jour valent mieux qu’une heure une fois par mois.

## Pour tenir dans la durée
Choisissez le même moment chaque jour (le matin avant le téléphone, ou le soir avant de dormir). Associez-le à une habitude existante, comme le café du matin. Et si vous oubliez un jour, ce n’est pas grave : reprenez le lendemain, avec douceur.

Pour aller plus loin, retrouvez des [méditations guidées audio](meditations.html) sur le site, et chaque mois une **méditation de Nouvelle Lune en direct** avec les membres du [Cercle mensuel](index.html#cercle) ✨`,
        en: ''
      }
    });
    add({
      slug: 'bienfaits-du-reiki-premiere-seance', date: '2026-11-17', icone: 'hands', theme: 'violet',
      categorie: { ar: 'طاقة', fr: 'Énergie', en: 'Energy' },
      titre: { ar: 'الريكي: ما هو وماذا تتوقع في جلستك الأولى؟', fr: 'Le Reiki : qu’est-ce que c’est et à quoi s’attendre lors d’une première séance ?', en: '' },
      resume: { ar: 'كل ما تحتاج معرفته عن الريكي قبل جلستك الأولى: أصله، كيف تجري الجلسة، وما الذي قد تشعر به.', fr: 'Tout ce qu’il faut savoir avant votre première séance de Reiki : ses origines, le déroulement et ce que vous pouvez ressentir.', en: '' },
      contenu: {
        ar: `الريكي من أشهر الطرق الطاقية في العالم، ومع ذلك ما زال كثيرون يتساءلون: «ما هو بالضبط؟ وماذا يحدث خلال الجلسة؟». في هذا المقال نجيبك ببساطة.

## ما هو الريكي؟
الريكي (Reiki Usui) طريقة يابانية ظهرت في بداية القرن العشرين. تتكوّن الكلمة من جزأين: **«ري»** أي الكوني، و**«كي»** أي طاقة الحياة. تنقل الممارِسة هذه الطاقة بوضع اليدين بخفّة على الجسم أو فوقه، لمساعدة الجسد والذهن على الاسترخاء العميق واستعادة التوازن.

## كيف تجري الجلسة؟
- **حديث قصير:** نتحدث عمّا تمرّ به وعن نيّتك من الجلسة.
- **الاسترخاء:** تستلقي على طاولة مريحة، بملابسك، في جوّ هادئ.
- **الريكي:** أضع يديّ بخفّة على مناطق مختلفة (الرأس، الصدر، البطن، الساقين) لمدة 45 دقيقة تقريباً.
- **العودة بلطف:** وقت قصير للاستيعاب، ثم نتشارك ما شعرت به.

## ماذا قد تشعر؟
لكل شخص تجربته الخاصة. يشعر كثيرون بـ **دفء** تحت اليدين، أو وخز خفيف، أو ثقل مريح في الجسد، أو يدخلون في حالة قريبة من النوم. وقد يبكي البعض أو يضحك، وهذا طبيعي: إنها مشاعر تتحرّر. ويقول كثيرون إنهم ناموا بعد الجلسة نوماً أعمق من المعتاد.

> الريكي لا يعوّض الطبيب ولا العلاج. إنه مرافقة طاقية لطيفة تكمّل أي متابعة طبية.

## الريكي عن بُعد
الطاقة لا تعرف المسافات. تجري الجلسة عن بُعد بالطريقة نفسها: تجلس مرتاحاً في بيتك، نبدأ في الوقت نفسه، ثم نتحدث هاتفياً أو عبر الرسائل. وهكذا أرافق أشخاصاً في تونس وخارجها.

هل ترغب في التجربة؟ تجد كل التفاصيل في صفحة [جلسة ريكي في صفاقس، تونس وعن بُعد](reiki-sfax.html)، أو [احجز جلستك](index.html#reservation) مباشرة 🙌`,
        fr: `Le Reiki fait partie des méthodes énergétiques les plus connues au monde, et pourtant beaucoup se demandent encore : « Qu’est-ce que c’est exactement ? Que se passe-t-il pendant une séance ? ». Voici des réponses simples.

## Qu’est-ce que le Reiki ?
Le Reiki Usui est une méthode japonaise née au début du XXᵉ siècle. Le mot réunit **« Rei »**, l’universel, et **« Ki »**, l’énergie de vie. La praticienne transmet cette énergie par une légère imposition des mains, sur ou au-dessus du corps, pour accompagner une détente profonde et le retour à l’équilibre.

## Comment se déroule une séance ?
- **Un court échange :** nous parlons de ce que vous traversez et de votre intention.
- **L’installation :** vous vous allongez habillé(e), confortablement, dans un espace calme.
- **Le soin :** je pose délicatement les mains sur différentes zones (tête, poitrine, ventre, jambes) pendant environ 45 minutes.
- **Le retour en douceur :** un temps d’intégration, puis nous partageons vos ressentis.

## Que peut-on ressentir ?
Chaque expérience est unique. Beaucoup ressentent une **chaleur** sous les mains, des picotements, une lourdeur agréable ou un état proche du sommeil. Certaines personnes pleurent ou rient : c’est normal, des émotions se libèrent. Et beaucoup disent avoir mieux dormi les nuits suivantes.

> Le Reiki ne remplace ni un médecin ni un traitement. C’est un accompagnement énergétique doux, complémentaire à tout suivi médical.

## Le Reiki à distance
L’énergie ne connaît pas la distance. La séance à distance se déroule de la même façon : vous vous installez au calme chez vous, nous commençons à la même heure, puis nous échangeons par appel ou message. C’est ainsi que j’accompagne des personnes en Tunisie comme à l’étranger.

Envie d’essayer ? Toutes les informations sont sur la page [Reiki à Sfax (Tunisie) et à distance](reiki-sfax.html), ou [réservez votre séance](index.html#reservation) directement 🙌`,
        en: ''
      }
    });
    add({
      slug: 'croyances-limitantes-thetahealing', date: '2026-11-14', icone: 'crystal', theme: 'rose',
      categorie: { ar: 'تشافي داخلي', fr: 'Guérison intérieure', en: 'Inner healing' },
      titre: { ar: 'المعتقدات المقيّدة: كيف تكتشفها وكيف تساعدك الثيتا هيلينغ على التحرّر منها', fr: 'Croyances limitantes : les reconnaître et s’en libérer avec le ThetaHealing®', en: '' },
      resume: { ar: '«لا أستحق»، «يجب أن أتعب لأحصل على ما أريد»… جمل نردّدها دون وعي. تعلّم كيف تكتشفها وكيف تساعد الثيتا هيلينغ على تحويلها.', fr: '« Je ne mérite pas », « il faut souffrir pour réussir »… Apprenez à repérer ces croyances et découvrez comment le ThetaHealing® aide à les transformer.', en: '' },
      contenu: {
        ar: `أحياناً نعيد السيناريو نفسه مراراً: النوع نفسه من العلاقات، المشاكل نفسها مع المال، الخوف نفسه قبل كل خطوة جديدة. وفي كثير من الأحيان، ليس السبب «سوء الحظ»، بل **معتقد مقيّد** مختبئ في اللاوعي.

## ما هو المعتقد المقيّد؟
هو فكرة قبلناها كحقيقة، غالباً في الطفولة، وأصبحت توجّه اختياراتنا دون أن نشعر. مثلاً:
- «لا أستحق الحب ولا النجاح»
- «يجب أن أتعب كثيراً لأحصل على أي شيء»
- «إذا أظهرت مشاعري، سيرفضونني»
- «المال يُبعدني عن الروحانية»

## كيف تكتشفها؟
استمع إلى ما تقوله عن نفسك، خاصة تحت الضغط. لاحظ أين تتكرّر المشكلة نفسها في حياتك. واسأل نفسك: **«ما الذي يجب أن يكون صحيحاً في ذهني حتى يحدث لي هذا؟»** غالباً ما يكون الجواب الأول هو المفتاح.

## دور الثيتا هيلينغ
الثيتا هيلينغ (ThetaHealing®) تقنية تأمل تعتمد على **موجات ثيتا** الدماغية، وهي حالة استرخاء عميق قريبة من النوم. خلال الجلسة:
- نتحدث عن الموضوع الذي ترغب في تغييره؛
- عبر الأسئلة المتتالية (digging) نصل إلى المعتقد الجذري، الذي قد يكون مختلفاً تماماً عمّا نتصوّر؛
- نعمل على تحويله وترسيخ إحساس جديد: «أنا أستحق»، «أنا في أمان»…

> التغيير الحقيقي يحدث عندما نغيّر الجذر، لا عندما نقصّ الأوراق.

الثيتا هيلينغ مرافقة في التطوّر الشخصي والروحي، تكمّل أي متابعة طبية أو نفسية ولا تعوّضها.

الجلسات في المركز بتونس (صفاقس) أو أونلاين، بالعربية والفرنسية والإنجليزية. اكتشف [جلسة الثيتا هيلينغ](thetahealing-sfax.html) أو اسألني مباشرة على واتساب 💎`,
        fr: `Il arrive que l’on rejoue sans cesse le même scénario : le même type de relations, les mêmes difficultés avec l’argent, la même peur avant chaque nouveau pas. Souvent, ce n’est pas de la « malchance », mais une **croyance limitante** cachée dans l’inconscient.

## Qu’est-ce qu’une croyance limitante ?
C’est une idée que nous avons acceptée comme une vérité, souvent dans l’enfance, et qui guide nos choix sans que nous en ayons conscience. Par exemple :
- « Je ne mérite pas l’amour ni la réussite »
- « Il faut souffrir pour obtenir quelque chose »
- « Si je montre mes émotions, je serai rejeté(e) »
- « L’argent éloigne de la spiritualité »

## Comment les repérer ?
Écoutez ce que vous vous dites, surtout sous pression. Observez où le même problème se répète dans votre vie. Et posez-vous la question : **« Qu’est-ce qui devrait être vrai dans ma tête pour que cela m’arrive ? »** La première réponse qui vient est souvent la clé.

## Le rôle du ThetaHealing®
Le ThetaHealing® est une technique de méditation qui utilise les **ondes cérébrales thêta**, un état de relaxation profonde proche de l’endormissement. En séance :
- nous parlons du thème que vous souhaitez transformer ;
- par un travail de questionnement (« digging »), nous trouvons la croyance racine, parfois très différente de ce que l’on imaginait ;
- nous travaillons à la transformer et à ancrer un nouveau ressenti : « je mérite », « je suis en sécurité »…

> Le vrai changement se produit quand on transforme la racine, pas quand on coupe les feuilles.

Le ThetaHealing® est un accompagnement de développement personnel et spirituel, complémentaire à tout suivi médical ou psychologique, qu’il ne remplace pas.

Séances au centre à Sfax (Tunisie) ou en ligne, en arabe, en français et en anglais. Découvrez la [séance de ThetaHealing®](thetahealing-sfax.html) ou posez-moi vos questions sur WhatsApp 💎`,
        en: ''
      }
    });
  });
  // second batch: one article per week — each appears automatically on its date
  once('blog-batch2-2026-11', () => {
    D.blog = D.blog || [];
    const add = p => { if (!D.blog.some(x => x.slug === p.slug)) D.blog.push({ actif: true, image: '', ...p, id: p.slug }); };
    add({
      slug: 'access-bars-seance-bienfaits', date: '2026-11-26', icone: 'lotus', theme: 'gold',
      categorie: { ar: 'طاقة', fr: 'Énergie', en: 'Energy' },
      titre: { ar: 'أكسس بارز: 32 نقطة لتهدئة الذهن واستعادة الخفّة', fr: 'Access Bars® : 32 points pour apaiser le mental et retrouver la légèreté', en: '' },
      resume: { ar: 'ما هي جلسة أكسس بارز، كيف تجري، ولمن تناسب؟ دليل بسيط قبل جلستك الأولى.', fr: 'Qu’est-ce qu’une séance d’Access Bars®, comment se déroule-t-elle et pour qui ? Un guide simple avant votre première séance.', en: '' },
      contenu: {
        ar: `هل تشعر أحياناً أن رأسك مزدحم بالأفكار ولا يتوقف أبداً؟ أن عقلك يعيد السيناريوهات نفسها حتى في الليل؟ جلسة **أكسس بارز (Access Bars®)** قد تكون المساحة التي تحتاجها لتتنفّس.

## ما هي «البارز»؟
البارز هي **32 نقطة** على الرأس، ترتبط كل واحدة منها بمجال من مجالات الحياة: المال، الجسد، التواصل، الفرح، الحزن، التحكّم، الإبداع… مع السنين، تتراكم في هذه النقاط أفكار ومشاعر ومعتقدات. ولمس هذه النقاط بخفّة يساعد على تحرير هذا التراكم.

## كيف تجري الجلسة؟
- تستلقي بملابسك على طاولة مريحة.
- أضع أصابعي بلطف على النقاط، دون ضغط ولا تدليك.
- تدوم الجلسة بين 60 و90 دقيقة.
- كثيرون يدخلون في استرخاء عميق، وبعضهم ينام تماماً.

> بعد الجلسة، يصف كثيرون إحساساً بـ«المساحة» في الرأس، كأن أحداً فتح النوافذ في غرفة مغلقة.

## لمن تناسب؟
- لمن لديه **أفكار كثيرة** ويصعب عليه الهدوء
- لمن يعاني من صعوبة في النوم أو ضغط مستمر
- لمن يريد مزيداً من السهولة والفرح في حياته
- لمن يمرّ بمرحلة تغيير ويحتاج إلى وضوح

أكسس بارز ممارسة للرفاه والاسترخاء، وهي مكمّلة لأي متابعة طبية ولا تعوّضها.

## نصائح لجلستك الأولى
البس ملابس مريحة، تعال قبل الموعد ببضع دقائق، واشرب ماءً بعد الجلسة. لا تحتاج إلى أي تحضير آخر: فقط أن تسمح لنفسك بالراحة.

الجلسات في المركز بتونس (صفاقس). كل التفاصيل في صفحة [أكسس بارز في صفاقس، تونس](access-bars-sfax.html) ✨`,
        fr: `Avez-vous parfois l’impression que votre tête est pleine de pensées qui ne s’arrêtent jamais ? Que votre mental rejoue les mêmes scénarios, même la nuit ? Une séance d’**Access Bars®** peut être l’espace dont vous avez besoin pour respirer.

## Que sont les « Bars » ?
Les Bars sont **32 points** situés sur la tête, chacun associé à un domaine de la vie : l’argent, le corps, la communication, la joie, la tristesse, le contrôle, la créativité… Au fil des années, pensées, émotions et croyances s’y accumulent. Un toucher léger sur ces points aide à libérer cette charge.

## Comment se déroule une séance ?
- Vous êtes allongé(e), habillé(e), confortablement.
- Je pose délicatement les doigts sur les points, sans pression ni massage.
- La séance dure entre 60 et 90 minutes.
- Beaucoup entrent dans une détente profonde, certains s’endorment complètement.

> Après la séance, beaucoup décrivent une sensation « d’espace » dans la tête, comme si l’on avait ouvert les fenêtres d’une pièce fermée.

## Pour qui ?
- Pour celles et ceux qui ont **trop de pensées** et du mal à se poser
- En cas de difficultés de sommeil ou de pression constante
- Pour plus de facilité et de joie au quotidien
- Pendant une période de changement, pour retrouver de la clarté

L’Access Bars® est une pratique de bien-être et de détente, complémentaire à tout suivi médical, qu’elle ne remplace pas.

## Conseils pour votre première séance
Portez des vêtements confortables, arrivez quelques minutes en avance et buvez de l’eau après la séance. Aucune autre préparation n’est nécessaire : il suffit de vous autoriser à vous reposer.

Séances au centre à Sfax (Tunisie). Toutes les informations sur la page [Access Bars® à Sfax (Tunisie)](access-bars-sfax.html) ✨`,
        en: ''
      }
    });
    add({
      slug: 'annales-akashiques-preparer-ses-questions', date: '2026-12-03', icone: 'book', theme: 'indigo',
      categorie: { ar: 'إرشاد روحي', fr: 'Guidance', en: 'Guidance' },
      titre: { ar: 'السجلات الأكاشية: كيف تحضّر أسئلتك لقراءة عميقة', fr: 'Annales Akashiques : comment préparer ses questions pour une lecture profonde', en: '' },
      resume: { ar: 'جودة القراءة الأكاشية تبدأ بجودة السؤال. إليك كيف تصوغ أسئلة مفتوحة تفتح لك أبواب الفهم.', fr: 'La qualité d’une lecture akashique commence par la qualité des questions. Voici comment formuler des questions ouvertes qui éclairent vraiment.', en: '' },
      contenu: {
        ar: `السجلات الأكاشية تُوصف غالباً بأنها **ذاكرة الروح**: مساحة يُقال إن فيها قصة كل روح، بدروسها وعلاقاتها ومواهبها. والقراءة ليست عرافة، بل حوار لطيف يساعدك على فهم نفسك واختياراتك. وسرّ القراءة الجيدة؟ **السؤال الجيد.**

## الأسئلة المفتوحة أولاً
الأسئلة التي جوابها «نعم» أو «لا» تُغلق الباب. أما الأسئلة المفتوحة فتفتح مساحة للفهم. قارن:
- بدل «هل سأتزوج هذا العام؟» ← **«ما الذي أحتاج أن أفهمه عن علاقاتي العاطفية؟»**
- بدل «هل أترك عملي؟» ← **«ما الذي يساعدني على اتخاذ قرار واضح بشأن عملي؟»**
- بدل «لماذا يحدث لي هذا دائماً؟» ← **«ما الدرس الذي يحمله هذا النمط المتكرر في حياتي؟»**

## أسئلة مقترحة
- ما هي مواهبي الروحية وكيف أعيشها أكثر؟
- ما الذي يمنعني من التقدّم نحو …؟
- كيف أتعامل مع علاقتي بـ … بمزيد من السلام؟
- ما الخطوة التالية في طريقي الآن؟

> السجلات تتحدث عنك وعن علاقتك بالآخرين، لا عن أسرار الآخرين.

## كيف تستعد للقراءة؟
اكتب **3 إلى 5 أسئلة** قبل الموعد، ورتّبها حسب الأهمية. اختر مكاناً هادئاً إن كانت القراءة أونلاين. وجهّز دفتراً لتدوين ما يلمسك، لأن بعض الرسائل تتّضح بعد أيام.

القراءة تدوم حوالي 75 دقيقة، أونلاين أو في المركز بتونس (صفاقس). اكتشف [قراءة السجلات الأكاشية](annales-akashiques.html) 📖`,
        fr: `Les Annales Akashiques sont souvent décrites comme la **mémoire de l’âme** : un espace où serait inscrite l’histoire de chaque âme, avec ses leçons, ses liens et ses talents. Une lecture n’est pas de la voyance, mais un dialogue bienveillant qui aide à mieux se comprendre. Le secret d’une belle lecture ? **De bonnes questions.**

## Privilégier les questions ouvertes
Les questions fermées (oui/non) referment la porte ; les questions ouvertes créent un espace de compréhension. Comparez :
- Au lieu de « Vais-je me marier cette année ? » → **« Que dois-je comprendre de ma vie amoureuse ? »**
- Au lieu de « Dois-je quitter mon travail ? » → **« Qu’est-ce qui m’aide à prendre une décision claire pour mon travail ? »**
- Au lieu de « Pourquoi cela m’arrive-t-il toujours ? » → **« Quelle leçon porte ce schéma qui se répète dans ma vie ? »**

## Exemples de questions
- Quels sont mes talents d’âme et comment les vivre davantage ?
- Qu’est-ce qui me freine pour avancer vers… ?
- Comment vivre ma relation avec… avec plus de paix ?
- Quelle est la prochaine étape sur mon chemin ?

> Les Annales parlent de vous et de votre relation aux autres, pas des secrets des autres.

## Comment se préparer ?
Notez **3 à 5 questions** avant le rendez-vous et classez-les par importance. Installez-vous dans un endroit calme si la lecture a lieu en ligne. Gardez un carnet à portée de main : certains messages prennent tout leur sens quelques jours plus tard.

La lecture dure environ 75 minutes, en ligne ou au centre à Sfax (Tunisie). Découvrez la [lecture des Annales Akashiques](annales-akashiques.html) 📖`,
        en: ''
      }
    });
    add({
      slug: 'tarot-comment-poser-la-bonne-question', date: '2026-12-10', icone: 'cards', theme: 'rose',
      categorie: { ar: 'تاروت', fr: 'Tarot', en: 'Tarot' },
      titre: { ar: 'التاروت: كيف تطرح السؤال الصحيح لقراءة واضحة', fr: 'Tarot : comment poser la bonne question pour un tirage clair', en: '' },
      resume: { ar: 'التاروت مرآة وليس قدراً. تعلّم كيف تصوغ سؤالك لتحصل على قراءة واضحة ومفيدة.', fr: 'Le Tarot est un miroir, pas une fatalité. Apprenez à formuler votre question pour obtenir une lecture claire et utile.', en: '' },
      contenu: {
        ar: `كثيرون يأتون إلى قراءة التاروت بسؤال مثل «ماذا سيحدث لي؟». لكن التاروت ليس آلة للتنبؤ بقدر ما هو **مرآة**: يكشف الطاقات الموجودة الآن، والموارد التي تملكها، والاتجاهات الممكنة. ولذلك، طريقة صياغة السؤال تغيّر كل شيء.

## ثلاث قواعد بسيطة
- **ركّز على نفسك:** «كيف أحسّن علاقتي مع …؟» أفضل من «ماذا يفكّر فيّ فلان؟».
- **سؤال واحد في كل مرة:** السؤال المزدوج يعطي إجابة مشوّشة.
- **اجعله مفتوحاً وعملياً:** «ما الذي يساعدني على …؟»، «ما الذي أحتاج إلى معرفته عن …؟».

## أمثلة قبل وبعد
- «هل سيعود؟» ← **«ما الذي أحتاج أن أفهمه عن هذه العلاقة لأمضي بسلام؟»**
- «هل سأنجح؟» ← **«ما الذي يدعم نجاحي في هذا المشروع، وما الذي يعيقه؟»**
- «ماذا ينتظرني هذه السنة؟» ← قراءة **السنة القادمة (12 شهراً)** مناسبة تماماً لهذا!

> الأوراق لا تقرّر عنك. هي تضيء الطريق، وأنت من يختار خطواتك.

## اختر القراءة المناسبة لسؤالك
- **سؤال واحد:** لقرار سريع أو توضيح موقف.
- **الحب والعلاقات:** لفهم ديناميكية العلاقة.
- **العمل والمال:** للمشاريع والتوجّه المهني.
- **الصليب السلتي:** قراءة شاملة لموقف معقّد.
- **أوراكل الملائكة:** لرسالة لطيفة ومطمئنة.

يمكنك اختيار قراءتك مباشرة من [صفحة التاروت](tarot.html)، أونلاين (فيديو، قراءة مكتوبة PDF أو رسالة صوتية) أو في المركز بتونس (صفاقس) 🔮`,
        fr: `Beaucoup arrivent à un tirage avec une question comme « Que va-t-il m’arriver ? ». Mais le Tarot n’est pas une machine à prédire : c’est avant tout un **miroir**. Il révèle les énergies présentes, vos ressources et les tendances possibles. La façon de formuler la question change donc tout.

## Trois règles simples
- **Centrez la question sur vous :** « Comment améliorer ma relation avec… ? » plutôt que « Que pense untel de moi ? ».
- **Une seule question à la fois :** une question double donne une réponse confuse.
- **Ouverte et concrète :** « Qu’est-ce qui m’aide à… ? », « Que dois-je savoir sur… ? ».

## Avant / après
- « Va-t-il revenir ? » → **« Que dois-je comprendre de cette relation pour avancer en paix ? »**
- « Vais-je réussir ? » → **« Qu’est-ce qui soutient la réussite de ce projet, et qu’est-ce qui la freine ? »**
- « Que me réserve cette année ? » → le tirage **Année à venir (12 mois)** est fait pour ça !

> Les cartes ne décident pas à votre place. Elles éclairent le chemin ; c’est vous qui choisissez vos pas.

## Choisir le bon tirage
- **Question unique :** pour une décision rapide ou clarifier une situation.
- **Amour & relations :** pour comprendre la dynamique d’une relation.
- **Travail & argent :** projets et orientation professionnelle.
- **Croix celtique :** lecture complète d’une situation complexe.
- **Oracle des Anges :** pour un message doux et rassurant.

Choisissez votre tirage directement sur la [page Tarot](tarot.html), en ligne (visio, lecture écrite en PDF ou message vocal) ou au centre à Sfax (Tunisie) 🔮`,
        en: ''
      }
    });
    add({
      slug: 'les-7-chakras-expliques-simplement', date: '2026-12-17', icone: 'energy', theme: 'green',
      categorie: { ar: 'طاقة', fr: 'Énergie', en: 'Energy' },
      titre: { ar: 'الشاكرات السبع: دليل بسيط لفهم مراكز طاقتك', fr: 'Les 7 chakras expliqués simplement', en: '' },
      resume: { ar: 'من شاكرا الجذر إلى شاكرا التاج: ماذا يمثّل كل مركز طاقي، وكيف تلاحظ أنه يحتاج إلى توازن؟', fr: 'De la racine à la couronne : ce que représente chaque centre énergétique et comment savoir s’il a besoin d’être rééquilibré.', en: '' },
      contenu: {
        ar: `في التقاليد الهندية القديمة، **الشاكرات** («العجلات» بالسنسكريتية) هي مراكز طاقة تمتد على طول العمود الفقري، من القاعدة إلى قمّة الرأس. يرتبط كل مركز بجانب من حياتنا الجسدية والعاطفية والروحية.

## الشاكرات السبع
- **1. شاكرا الجذر (الأحمر)** — في قاعدة العمود الفقري: الأمان، الاستقرار، الانتماء.
- **2. الشاكرا العجزية (البرتقالي)** — أسفل البطن: المشاعر، الإبداع، المتعة.
- **3. شاكرا الضفيرة الشمسية (الأصفر)** — فوق السرّة: الثقة بالنفس، الإرادة، القوة الشخصية.
- **4. شاكرا القلب (الأخضر)** — وسط الصدر: الحب، التسامح، الرحمة.
- **5. شاكرا الحلق (الأزرق)** — الحلق: التعبير، قول الحقيقة، التواصل.
- **6. شاكرا العين الثالثة (النيلي)** — بين الحاجبين: الحدس، الوضوح، البصيرة.
- **7. شاكرا التاج (البنفسجي)** — قمة الرأس: الاتصال الروحي والمعنى.

## علامات تحتاج إلى انتباه
عندما يكون مركز ما غير متوازن، قد نلاحظ ذلك في حياتنا اليومية: قلق دائم وعدم أمان (الجذر)، صعوبة في قول «لا» (الضفيرة الشمسية)، صعوبة في التعبير عن المشاعر (الحلق)، أو انغلاق القلب بعد جرح عاطفي (القلب).

> الشاكرات قراءة رمزية للطاقة، ولا تُستعمل لتشخيص أي مرض. أي عرض جسدي يستحق استشارة طبية.

## تمرين صغير لموازنة الشاكرات
اجلس بهدوء، وتخيّل مع كل نفس ضوءاً بلون الشاكرا يتوهّج في مكانها، من الأحمر في الأسفل حتى البنفسجي في الأعلى. خذ ثلاثة أنفاس عميقة لكل مركز. هذا التمرين البسيط يساعد على الاسترخاء والوعي بالجسد.

للمرافقة الأعمق، تساعد [جلسة العلاج الطاقي](soin-energetique-sfax.html) على تنظيف وموازنة الشاكرات والهالة، في المركز بتونس (صفاقس) أو عن بُعد 🌈`,
        fr: `Dans les traditions indiennes anciennes, les **chakras** (« roues » en sanskrit) sont des centres d’énergie situés le long de la colonne vertébrale, de la base jusqu’au sommet du crâne. Chacun est relié à un aspect de notre vie physique, émotionnelle et spirituelle.

## Les 7 chakras
- **1. Chakra racine (rouge)** — base de la colonne : sécurité, ancrage, appartenance.
- **2. Chakra sacré (orange)** — bas-ventre : émotions, créativité, plaisir.
- **3. Plexus solaire (jaune)** — au-dessus du nombril : confiance en soi, volonté, pouvoir personnel.
- **4. Chakra du cœur (vert)** — centre de la poitrine : amour, pardon, compassion.
- **5. Chakra de la gorge (bleu)** — gorge : expression, vérité, communication.
- **6. Troisième œil (indigo)** — entre les sourcils : intuition, clarté, discernement.
- **7. Chakra couronne (violet)** — sommet du crâne : connexion spirituelle et sens.

## Les signes qui demandent de l’attention
Quand un centre est déséquilibré, on peut le remarquer au quotidien : insécurité et anxiété permanentes (racine), difficulté à dire « non » (plexus solaire), mal à exprimer ses émotions (gorge), cœur fermé après une blessure affective (cœur).

> Les chakras sont une lecture symbolique de l’énergie ; ils ne servent pas à diagnostiquer une maladie. Tout symptôme physique mérite un avis médical.

## Un petit exercice d’équilibrage
Asseyez-vous au calme et, à chaque respiration, imaginez une lumière de la couleur du chakra qui s’illumine à son emplacement, du rouge en bas jusqu’au violet en haut. Prenez trois respirations profondes par centre. Cet exercice simple favorise la détente et la conscience du corps.

Pour un accompagnement plus profond, le [soin énergétique](soin-energetique-sfax.html) aide à nettoyer et rééquilibrer les chakras et l’aura, au centre à Sfax (Tunisie) ou à distance 🌈`,
        en: ''
      }
    });
  });
  // courses + Prana session (data in assets/courses-data.js; only runs on pages that loaded it)
  const CC = (typeof window !== 'undefined' && window.CH_COURSES) || null;
  if (CC) once('courses-2026-11', () => {
    D.formations = D.formations || [];
    CC.COURSES.forEach(c => { if (!D.formations.some(f => f.id === c.id)) D.formations.push(JSON.parse(JSON.stringify(c))); });
    D.soins = D.soins || [];
    if (!D.soins.some(s => s.id === CC.PRANA_SESSION.id)) {
      const i = D.soins.findIndex(s => s.id === 'soin-energetique');
      D.soins.splice(i >= 0 ? i + 1 : D.soins.length, 0, JSON.parse(JSON.stringify(CC.PRANA_SESSION)));
    }
  });
  // more accessible membership prices (only if Rawia has not changed them herself)
  once('membership-price-2026-11', () => {
    const set = (id, oldTnd, prix, an) => {
      const a = (D.abonnements || []).find(x => x.id === id);
      if (a && (!a.prix || String(a.prix.tnd) === oldTnd)) { a.prix = prix; a.prix_annuel = an; }
    };
    set('cercle-lumiere', '49', { tnd: '25', eur: '9', usd: '10' }, { tnd: '250', eur: '90', usd: '100' });
    set('cercle-ame', '129', { tnd: '69', eur: '25', usd: '27' }, { tnd: '690', eur: '250', usd: '270' });
  });
  // online consultation prices (voice / video / chat) — editable in the dashboard
  once('consult-online-2026-11', () => {
    if (D.consult_tarifs && D.consult_tarifs.length) return;
    const t = (mode, duree, tnd, eur, usd) => ({ id: `${mode}-${duree}`, mode, duree: String(duree), prix: { tnd: String(tnd), eur: String(eur), usd: String(usd) }, actif: true });
    D.consult_tarifs = [t('audio', 30, 45, 18, 20), t('audio', 60, 90, 35, 40), t('video', 30, 50, 20, 22), t('video', 60, 100, 40, 45), t('chat', 30, 40, 15, 17), t('chat', 60, 75, 30, 33)];
  });
  // one Reiki course only: hide the old "Reiki Usui – level 1" (the new course with levels replaces it), no dates
  once('hide-old-reiki-2026-11', () => {
    const old = (D.formations || []).find(f => f.id === 'reiki-niveau-1');
    if (old && (D.formations || []).some(f => f.id === 'reiki-usui')) old.actif = false;
  });
  // couple therapy session (after the psychological consultation) — price and text editable in the dashboard
  once('couple-therapy-2026-11', () => {
    D.soins = D.soins || [];
    if (D.soins.some(s => s.id === 'therapie-couple')) return;
    const x = {
      id: 'therapie-couple', categorie: 'psy', icone: 'heart', theme: 'rose', image: '', en_ligne: true,
      titre: { ar: 'العلاج الزوجي (Couple Therapy)', fr: 'Thérapie de couple', en: 'Couple therapy' },
      duree: { ar: '90 دقيقة', fr: '90 min', en: '90 min' },
      prix: { tnd: '160', eur: '60', usd: '65' },
      description: {
        ar: 'مساحة آمنة وخالية من الأحكام للزوجين: نفهم معاً أسباب الخلاف، ونتعلّم التواصل من القلب، ونعيد بناء الثقة والقرب. في المركز أو عن بُعد.',
        fr: 'Un espace sûr et sans jugement pour le couple : comprendre les tensions, apprendre à communiquer avec le cœur et retrouver confiance et complicité. Au centre ou en ligne.',
        en: 'A safe, judgment-free space for couples: understand the tensions, learn to communicate from the heart and rebuild trust and closeness. At the centre or online.'
      }
    };
    const i = D.soins.findIndex(s => s.id === 'consultation-psychologique');
    D.soins.splice(i >= 0 ? i + 1 : D.soins.length, 0, x);
  });
  // Rawia wants the session named "Couple Therapy" in every language (only if the title was not edited since)
  once('couple-therapy-title-2026-11', () => {
    const x = (D.soins || []).find(s => s.id === 'therapie-couple');
    if (x && x.titre && x.titre.fr === 'Thérapie de couple') x.titre = { ar: 'Couple Therapy – العلاج الزوجي', fr: 'Couple Therapy – Thérapie de couple', en: 'Couple Therapy' };
  });
  // site Arabic must be Modern Standard Arabic: fix the couple-therapy text if it was saved in dialect
  once('couple-therapy-msa-2026-11', () => {
    const x = (D.soins || []).find(s => s.id === 'therapie-couple');
    if (x && x.description && /نفهمو|نتعلّمو|نبنيو/.test(x.description.ar || '')) x.description.ar = 'مساحة آمنة وخالية من الأحكام للزوجين: نفهم معاً أسباب الخلاف، ونتعلّم التواصل من القلب، ونعيد بناء الثقة والقرب. في المركز أو عن بُعد.';
  });
  // Sfax is not known abroad: always say Tunisia with it (texts saved in the database too)
  once('tunisie-sfax-2026-11', () => {
    const RULES = [
      [/في المركز بصفاقس(?![،,]?\s*\(?تونس)/g, 'في المركز بتونس (صفاقس)'],
      [/بصفاقس(?![،,]?\s*\(?تونس)/g, 'بتونس (صفاقس)'],
      [/في صفاقس(?![،,]?\s*تونس)/g, 'في صفاقس، تونس'],
      [/ à Sfax(?! \(Tunisie\)|, Tunisie)/g, ' à Sfax (Tunisie)'],
      [/ de Sfax(?! \(Tunisie\)|, Tunisie)/g, ' de Sfax (Tunisie)'],
      [/ in Sfax(?!, Tunisia)/g, ' in Sfax, Tunisia']
    ];
    const fixS = v => RULES.reduce((t, [re, rep]) => t.replace(re, rep), v);
    const walk = o => { for (const k in o) { if (typeof o[k] === 'string') o[k] = fixS(o[k]); else if (o[k] && typeof o[k] === 'object') walk(o[k]); } };
    ['soins', 'formations', 'packs', 'lectures', 'evenements', 'abonnements', 'faq', 'blog', 'categories', 'settings'].forEach(k => D[k] && walk(D[k]));
  });
  once('remove-example-testimonial', () => {    D.temoignages = (D.temoignages || []).filter(t => !(t.nom === '—' || /مثال|Exemple|Example/.test(JSON.stringify(t.service || ''))));
  });
  return changed;
};
