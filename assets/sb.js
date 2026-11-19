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
    const fix = v => typeof v === 'string' ? v.replace(/بتونس/g, 'بصفاقس').replace(/à Tunis\b/g, 'à Sfax').replace(/in Tunis\b/g, 'in Sfax').replace(/heure de Tunis/g, 'heure tunisienne').replace(/Tunis time/g, 'Tunisia time') : v;
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

هل ترغب في التجربة؟ تجد كل التفاصيل في صفحة [جلسة ريكي في صفاقس وعن بُعد](reiki-sfax.html)، أو [احجز جلستك](index.html#reservation) مباشرة 🙌`,
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

Envie d’essayer ? Toutes les informations sont sur la page [Reiki à Sfax et à distance](reiki-sfax.html), ou [réservez votre séance](index.html#reservation) directement 🙌`,
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

الجلسات في المركز بصفاقس أو أونلاين، بالعربية والفرنسية والإنجليزية. اكتشف [جلسة الثيتا هيلينغ](thetahealing-sfax.html) أو اسألني مباشرة على واتساب 💎`,
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

Séances au centre à Sfax ou en ligne, en arabe, en français et en anglais. Découvrez la [séance de ThetaHealing®](thetahealing-sfax.html) ou posez-moi vos questions sur WhatsApp 💎`,
        en: ''
      }
    });
  });
  once('remove-example-testimonial', () => {
    D.temoignages = (D.temoignages || []).filter(t => !(t.nom === '—' || /مثال|Exemple|Example/.test(JSON.stringify(t.service || ''))));
  });
  return changed;
};
