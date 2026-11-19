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
  once('remove-example-testimonial', () => {
    D.temoignages = (D.temoignages || []).filter(t => !(t.nom === '—' || /مثال|Exemple|Example/.test(JSON.stringify(t.service || ''))));
  });
  return changed;
};
