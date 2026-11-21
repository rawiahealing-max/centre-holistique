// Generates static, SEO-friendly landing pages (one per service + an "about Rawia" page).
// Run: node seo/build-pages.js   → writes the .html files at the site root.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.centreholistique.net/';
const WA = 'https://wa.me/21626660344';
const ADDRESS = 'Immeuble El Kawthar, 3ᵉ étage, Rue de l’Armée, 3047 Sfax, Tunisie';
const MAPS = 'https://www.google.com/maps?q=34.7435365,10.7644474';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const PAGES = [
  {
    file: 'reiki-sfax.html', id: 'reiki', icon: '🙌',
    title: 'Reiki à Sfax (Tunisie) et à distance – Soin Reiki Usui | Rawia Ghorbel',
    desc: 'Séance de Reiki Usui à Sfax (Tunisie) (Centre Holistique) ou à distance partout dans le monde avec Rawia Ghorbel, praticienne Reiki. Détente profonde, apaisement, rééquilibrage énergétique.',
    h1: 'Soin Reiki à Sfax (Tunisie) et à distance',
    lead: 'Le Reiki est une méthode japonaise de soin énergétique par imposition des mains. Une parenthèse de calme profond pour relâcher les tensions, apaiser le mental et vous reconnecter à votre énergie.',
    sections: [
      ['Qu’est-ce que le Reiki ?', 'Le Reiki Usui est une pratique douce née au Japon au début du XXᵉ siècle. La praticienne canalise l’énergie universelle (« Rei-Ki ») et la transmet par une légère imposition des mains, habillé(e) et allongé(e) confortablement. Le soin accompagne la relaxation et les capacités naturelles du corps à retrouver l’équilibre.'],
      ['Comment se déroule une séance ?', 'Nous commençons par un court échange sur votre intention et ce que vous traversez. Vous vous allongez ensuite dans un espace calme ; le soin dure environ 45 minutes, suivi d’un temps d’intégration et de partage de vos ressentis. Le Reiki peut aussi se pratiquer à distance : vous restez chez vous, au calme, où que vous soyez dans le monde.'],
      ['Pour qui ?', 'Pour toute personne qui ressent de la fatigue, du stress, une surcharge émotionnelle, des difficultés à lâcher prise ou simplement le besoin de prendre soin d’elle. Le Reiki convient aux adultes comme aux enfants (avec accord parental).']
    ],
    price: '110 DT / 45 € · 60 min · au centre à Sfax (Tunisie) ou à distance',
    faq: [['Le Reiki à distance fonctionne-t-il ?', 'L’énergie ne connaît pas la distance. Beaucoup de personnes ressentent la même détente profonde qu’en présentiel. Vous vous installez au calme et nous échangeons ensuite par appel ou message.'],
      ['Combien de séances faut-il ?', 'Une séance apporte déjà un apaisement. Pour un accompagnement plus profond, 3 à 4 séances espacées de 1 à 2 semaines sont souvent proposées.'],
      ['Puis-je apprendre le Reiki ?', 'Oui ! Des formations Reiki Usui niveau 1 sont proposées au centre et en ligne, avec certificat.']],
    ar: { t: 'جلسة ريكي في صفاقس، تونس وعن بعد', p: 'الريكي تقنية يابانية لطيفة لنقل الطاقة بوضع اليدين، تساعدك على الاسترخاء العميق، تهدئة الذهن وإعادة التوازن لطاقتك. الجلسة في المركز بتونس (صفاقس) أو عن بعد من أي مكان في العالم. 110 د.ت · 60 دقيقة.' },
    book: 'soins:reiki', related: ['thetahealing-sfax.html', 'soin-energetique-sfax.html', 'access-bars-sfax.html']
  },
  {
    file: 'thetahealing-sfax.html', id: 'thetahealing', icon: '💎',
    title: 'ThetaHealing® à Sfax (Tunisie) et en ligne – Séance avec Rawia Ghorbel',
    desc: 'Séance de ThetaHealing® à Sfax (Tunisie) ou en ligne avec Rawia Ghorbel, praticienne ThetaHealing®. Identifier et transformer les croyances limitantes, libérer les mémoires émotionnelles.',
    h1: 'ThetaHealing® à Sfax (Tunisie) et en ligne',
    lead: 'Le ThetaHealing® est une technique de méditation qui utilise l’état d’ondes cérébrales thêta pour identifier les croyances limitantes profondes et les transformer, en douceur et en conscience.',
    sections: [
      ['Qu’est-ce que le ThetaHealing® ?', 'Développé par Vianna Stibal, le ThetaHealing® s’appuie sur l’état thêta, cet état de conscience très détendu proche de la méditation profonde ou de l’endormissement. Dans cet état, nous explorons ensemble les croyances et mémoires qui freinent votre vie (« je ne mérite pas », « je ne suis pas en sécurité »…) et nous ouvrons de nouvelles possibilités.'],
      ['Déroulement de la séance', 'La séance se fait sous forme d’échange, au centre à Sfax (Tunisie) ou en visio. Vous parlez de ce que vous souhaitez changer ; par un travail de questionnement (« digging »), nous trouvons la croyance racine, puis je vous accompagne dans le travail de transformation et d’ancrage de nouveaux ressentis.'],
      ['Pour quelles situations ?', 'Blocages répétitifs, manque de confiance, relations difficiles, peur de l’abondance, deuils, besoin de sens… Le ThetaHealing® est un accompagnement de développement personnel et spirituel, complémentaire à tout suivi médical.']
    ],
    price: '130 DT / 50 € · 60 min · au centre à Sfax (Tunisie) ou en ligne',
    faq: [['La séance en ligne est-elle aussi efficace ?', 'Oui, le ThetaHealing® repose sur l’échange et l’intention : la visio (Zoom, WhatsApp) fonctionne parfaitement.'],
      ['En quelle langue ?', 'En arabe (tunisien), en français ou en anglais.'],
      ['Combien de séances ?', 'Souvent 2 à 3 séances pour un thème précis, selon votre rythme.']],
    ar: { t: 'ثيتا هيلينغ في صفاقس، تونس وأونلاين', p: 'تقنية تأمل تعتمد على موجات «ثيتا» الدماغية، للوصول إلى المعتقدات المقيّدة العميقة وتحويلها، وتحرير المشاعر والذكريات التي تعيقك. في المركز بتونس (صفاقس) أو أونلاين، بالعربية والفرنسية والإنجليزية. 130 د.ت.' },
    book: 'soins:thetahealing', related: ['reiki-sfax.html', 'annales-akashiques.html', 'constellations-familiales-sfax.html']
  },
  {
    file: 'access-bars-sfax.html', id: 'access-bars', icon: '✨',
    title: 'Access Bars® à Sfax (Tunisie) – Séance Access Consciousness® | Rawia Ghorbel',
    desc: 'Séance Access Bars® (Access Consciousness®) à Sfax (Tunisie) avec Rawia Ghorbel. 32 points touchés en douceur sur la tête pour apaiser le mental et retrouver légèreté.',
    h1: 'Access Bars® à Sfax (Tunisie)',
    lead: 'Une séance douce issue d’Access Consciousness® : 32 points sont légèrement touchés sur la tête pour aider à libérer les pensées, croyances et émotions accumulées. Beaucoup la décrivent comme un « reset » du mental.',
    sections: [
      ['Que sont les Bars® ?', 'Les Bars® sont 32 points situés sur la tête, chacun associé à un domaine de la vie (argent, corps, communication, joie, tristesse, contrôle…). Un toucher très léger sur ces points aide à relâcher ce qui s’y est accumulé au fil des années.'],
      ['Comment se passe une séance ?', 'Vous êtes allongé(e) habillé(e), confortablement. Je pose délicatement les doigts sur les points pendant 60 à 90 minutes. Beaucoup de personnes s’endorment ou entrent dans une détente très profonde, et repartent avec une sensation d’espace et de légèreté.'],
      ['Pour qui ?', 'Pour toute personne qui a « trop de pensées », du mal à dormir, de la pression, ou envie de plus de facilité et de joie dans sa vie. Les séances se font au centre à Sfax (Tunisie) (toucher nécessaire).']
    ],
    price: '120 DT / 45 € · 60–90 min · au centre à Sfax (Tunisie)',
    faq: [['Que vais-je ressentir ?', 'Le plus souvent une détente profonde, des picotements, de la chaleur ou un état proche du sommeil. Chaque séance est unique.'],
      ['Dois-je me préparer ?', 'Venez simplement avec des vêtements confortables et quelques minutes d’avance.'],
      ['Puis-je combiner avec un autre soin ?', 'Oui, avec le Reiki ou le ThetaHealing® par exemple, sur des séances séparées.']],
    ar: { t: 'جلسة أكسس بارز في صفاقس، تونس', p: 'جلسة لطيفة من مدرسة Access Consciousness®، يتم فيها لمس 32 نقطة على الرأس بخفّة لتحرير الأفكار والمعتقدات والمشاعر المخزّنة، وتهدئة الذهن، والشعور بخفّة. في المركز بتونس (صفاقس). 120 د.ت · 60–90 دقيقة.' },
    book: 'soins:access-bars', related: ['reiki-sfax.html', 'thetahealing-sfax.html', 'soin-energetique-sfax.html']
  },
  {
    file: 'soin-energetique-sfax.html', id: 'soin-energetique', icon: '⚡',
    title: 'Soin énergétique à Sfax (Tunisie) et à distance – Chakras & aura | Centre Holistique',
    desc: 'Soin énergétique à Sfax (Tunisie) ou à distance : rééquilibrage des chakras et de l’aura, libération des tensions et blocages émotionnels, avec Rawia Ghorbel, thérapeute holistique.',
    h1: 'Soin énergétique à Sfax (Tunisie) et à distance',
    lead: 'Rééquilibrer vos centres énergétiques (chakras) et votre champ aurique pour libérer la fatigue, les tensions et les blocages émotionnels, et retrouver un sentiment d’alignement.',
    sections: [
      ['Le soin énergétique, c’est quoi ?', 'Nous sommes bien plus qu’un corps physique : émotions, pensées et vécu s’inscrivent aussi dans notre énergie. Le soin énergétique consiste à nettoyer, harmoniser et recharger ce champ subtil, en travaillant sur les chakras et l’aura.'],
      ['Déroulement', 'Après un échange, vous vous allongez ; je travaille sur votre énergie par les mains, l’intention, parfois les pierres et la voix. Le soin se termine par un ancrage et des conseils personnalisés pour prolonger ses bienfaits.'],
      ['Quand en faire un ?', 'Après une période difficile, un choc émotionnel, un épuisement, un déménagement, une rupture… ou simplement pour un « nettoyage » régulier, aux changements de saison.']
    ],
    price: '120 DT / 45 € · 60 min · au centre à Sfax (Tunisie) ou à distance',
    faq: [['Quelle différence avec le Reiki ?', 'Le Reiki est une méthode précise de transmission d’énergie ; le soin énergétique est plus global (chakras, aura, nettoyage, protection) et adapté à chaque séance.'],
      ['Est-ce possible à distance ?', 'Oui, le soin énergétique se pratique très bien à distance.'],
      ['Puis-je me former ?', 'Oui, la formation « Praticien en soins énergétiques » est proposée au centre.']],
    ar: { t: 'العلاج الطاقي في صفاقس، تونس وعن بعد', p: 'إعادة توازن مراكز الطاقة (الشاكرات) والهالة لتحرير التوتر والتعب والانسدادات العاطفية. في المركز بتونس (صفاقس) أو عن بعد. 120 د.ت · 60 دقيقة.' },
    book: 'soins:soin-energetique', related: ['reiki-sfax.html', 'access-bars-sfax.html', 'thetahealing-sfax.html']
  },
  {
    file: 'annales-akashiques.html', id: 'annales-akashiques', icon: '📖',
    title: 'Lecture des Annales Akashiques en ligne et à Sfax (Tunisie) | Rawia Ghorbel',
    desc: 'Lecture des Annales Akashiques en ligne ou à Sfax (Tunisie) avec Rawia Ghorbel : comprendre vos schémas répétitifs, votre mission de vie et recevoir des guidances pour votre âme.',
    h1: 'Lecture des Annales Akashiques',
    lead: 'Les Annales Akashiques sont souvent décrites comme la mémoire de l’âme. Une lecture vous aide à comprendre vos schémas, vos liens et votre chemin, et à recevoir des guidances précieuses.',
    sections: [
      ['Que sont les Annales Akashiques ?', 'Dans de nombreuses traditions spirituelles, les Annales (ou Archives) Akashiques désignent un « espace » où serait inscrite l’histoire de chaque âme. La lecture consiste à ouvrir cet espace avec une prière d’ouverture et à transmettre les messages reçus pour vos questions.'],
      ['Comment préparer votre lecture ?', 'Vous préparez 3 à 5 questions ouvertes (« Que dois-je comprendre de… ? », « Comment avancer vers… ? »). La lecture se fait en visio ou au centre, et dure environ 75 minutes avec un temps d’échange.'],
      ['Ce que vous pouvez en attendre', 'De la clarté sur une situation, une compréhension plus douce de votre histoire, des pistes concrètes pour avancer et un sentiment d’être guidé(e).']
    ],
    price: '150 DT / 60 € · 75 min · en ligne ou au centre à Sfax (Tunisie)',
    faq: [['Faut-il être croyant(e) ?', 'Non, il suffit d’être ouvert(e). La lecture respecte toutes les croyances.'],
      ['Puis-je poser des questions sur une autre personne ?', 'Les questions portent sur vous et votre relation à l’autre, dans le respect de chacun.'],
      ['La lecture prédit-elle l’avenir ?', 'Non, elle éclaire le présent et vos choix ; vous restez libre de votre chemin.']],
    ar: { t: 'قراءة السجلات الأكاشية أونلاين وفي صفاقس، تونس', p: 'الوصول إلى ذاكرة روحك لفهم الأنماط المتكررة ورسالة حياتك وتلقي إرشادات ثمينة. أونلاين أو في المركز بتونس (صفاقس). 150 د.ت · 75 دقيقة.' },
    book: 'soins:annales-akashiques', related: ['thetahealing-sfax.html', 'tarot-en-ligne.html', 'constellations-familiales-sfax.html']
  },
  {
    file: 'constellations-familiales-sfax.html', id: 'constellation-familiale', icon: '🌳',
    title: 'Constellations familiales à Sfax (Tunisie) et en ligne | Centre Holistique',
    desc: 'Constellation familiale à Sfax (Tunisie) ou en ligne avec Rawia Ghorbel : mettre en lumière les loyautés invisibles et mémoires transgénérationnelles pour apaiser les liens familiaux.',
    h1: 'Constellations familiales à Sfax (Tunisie)',
    lead: 'Mettre en lumière les loyautés invisibles et les mémoires transgénérationnelles pour apaiser les liens familiaux et avancer plus librement dans votre vie.',
    sections: [
      ['Qu’est-ce qu’une constellation familiale ?', 'Approche développée par Bert Hellinger, la constellation familiale permet de visualiser votre système familial (avec des figurines ou des représentants) pour faire apparaître les dynamiques cachées : places non prises, secrets, deuils non faits, répétitions d’une génération à l’autre.'],
      ['Déroulement', 'En séance individuelle (au centre ou en visio), nous définissons votre question, puis nous « constellons » votre famille. Des phrases et gestes de reconnaissance permettent de remettre chacun à sa juste place et d’apaiser ce qui doit l’être.'],
      ['Pour quelles questions ?', 'Conflits familiaux, difficultés de couple répétitives, relation avec un parent, sentiment de ne pas avoir sa place, deuils, questions d’argent ou de réussite qui semblent « héritées ».']
    ],
    price: '180 DT / 70 € · 90 min · au centre à Sfax (Tunisie) ou en ligne',
    faq: [['Ma famille doit-elle être présente ?', 'Non, la constellation se fait avec vous seul(e).'],
      ['Faut-il connaître toute l’histoire familiale ?', 'Non, ce que vous savez suffit ; le travail fait souvent apparaître ce qui est important.'],
      ['Combien de temps pour ressentir les effets ?', 'Les effets s’installent souvent dans les semaines qui suivent ; laissez le travail s’intégrer.']],
    ar: { t: 'الأبراج العائلية في صفاقس، تونس وأونلاين', p: 'كشف الولاءات الخفية والذاكرة العابرة للأجيال لتهدئة العلاقات العائلية والمضي بحرية. في المركز بتونس (صفاقس) أو أونلاين. 180 د.ت · 90 دقيقة.' },
    book: 'soins:constellation-familiale', related: ['thetahealing-sfax.html', 'annales-akashiques.html', 'reiki-sfax.html']
  },
  {
    file: 'tarot-en-ligne.html', id: 'tarot', icon: '🔮',
    title: 'Tirage de Tarot en ligne et à Sfax (Tunisie) – Tarot & Oracle | Rawia Ghorbel',
    desc: 'Tirage de Tarot et Oracle en ligne ou à Sfax (Tunisie) : amour, travail, année à venir, croix celtique, Oracle des Anges. Lecture intuitive et bienveillante par Rawia Ghorbel.',
    h1: 'Tirage de Tarot en ligne et à Sfax (Tunisie)',
    lead: 'Une lecture intuitive et bienveillante pour éclairer une situation, une décision ou une période de transition. En visio, par écrit (PDF) ou par message vocal — où que vous soyez.',
    sections: [
      ['Mes tirages', 'Question unique, Amour & relations, Travail & argent, Croix celtique (tirage complet), Année à venir (12 mois), Oracle des Anges, Oracle des Chakras, Oracle de l’Âme et Tarot + Oracle. Chaque tirage est choisi selon votre question.'],
      ['Comment ça marche ?', 'Vous choisissez votre tirage et le format (visio en direct, lecture écrite en PDF sous 48 h, message vocal ou au centre à Sfax (Tunisie)), puis vous envoyez votre question. Vous recevez une lecture claire, avec des conseils concrets.'],
      ['Ma façon de lire', 'Le Tarot n’est pas une fatalité : c’est un miroir qui éclaire vos ressources et vos choix. Mes lectures sont douces, honnêtes et tournées vers des solutions.']
    ],
    price: 'À partir de 40 DT / 15 € · en ligne ou au centre à Sfax (Tunisie)',
    faq: [['La lecture écrite est-elle détaillée ?', 'Oui, vous recevez un PDF avec les photos des cartes et l’interprétation de chaque position.'],
      ['Puis-je demander un tirage pour quelqu’un d’autre ?', 'Le tirage porte sur votre question et votre relation à la situation.'],
      ['Le Tarot prédit-il l’avenir ?', 'Il éclaire les énergies du moment et les tendances ; vos choix restent libres.']],
    ar: { t: 'قراءة تاروت وأوراكل أونلاين وفي صفاقس، تونس', p: 'قراءات حدسية ولطيفة: سؤال واحد، الحب، العمل والمال، الصليب السلتي، السنة القادمة، أوراكل الملائكة… فيديو مباشر، قراءة مكتوبة أو رسالة صوتية. ابتداءً من 40 د.ت.' },
    book: '', cta: 'tarot.html', related: ['annales-akashiques.html', 'thetahealing-sfax.html', 'reiki-sfax.html']
  }
];

const TITLES = Object.fromEntries(PAGES.map(p => [p.file, p.h1]));
TITLES['rawia-ghorbel.html'] = 'Rawia Ghorbel – qui suis-je ?';

function layout({ file, title, desc, body, ld }) {
  return `<!doctype html>
<html lang="fr" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="max-image-preview:large">
  <meta name="theme-color" content="#3b2550">
  <link rel="canonical" href="${BASE}${file}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Centre Holistique">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${BASE}${file}">
  <meta property="og:image" content="${BASE}assets/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/icon-192.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/seo.css">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="seo-page">
<header class="nav"><div class="container nav-inner">
  <a href="index.html" class="brand"><img src="assets/favicon.svg" alt="Centre Holistique" width="38" height="38"><span class="brand-name">Centre Holistique</span></a>
  <nav class="seo-nav"><a href="index.html#seances">Séances</a><a href="consultation.html">Consultation en ligne</a><a href="blog.html">Blog</a><a href="rawia-ghorbel.html">Rawia Ghorbel</a><a class="btn btn-primary btn-sm" href="index.html#reservation">Réserver</a></nav>
</div></header>
<main>${body}</main>
<footer class="footer"><div class="container footer-grid">
  <div><a href="index.html" class="brand light"><img src="assets/favicon.svg" alt="" width="36" height="36"><span class="brand-name">Centre Holistique</span></a>
    <p>Rawia Ghorbel · guide et enseignante spirituelle, thérapeute holistique.</p><p><a href="https://www.instagram.com/rawiahealing/" target="_blank" rel="noopener">📸 Instagram</a> · <a href="https://www.facebook.com/centreholistique" target="_blank" rel="noopener">📘 Facebook</a></p></div>
  <div><h4>Contact</h4><p>${esc(ADDRESS)}<br><a href="tel:+21626660344">+216 26 660 344</a><br><a href="mailto:contact@centreholistique.net">contact@centreholistique.net</a><br><a href="${MAPS}" target="_blank" rel="noopener">📍 Itinéraire</a></p></div>
  <div><h4>Séances</h4><p>${PAGES.map(p => `<a href="${p.file}">${esc(p.h1)}</a>`).join('<br>')}</p></div>
</div><div class="container footer-bottom"><p>© ${new Date().getFullYear()} Centre Holistique · <a href="legal.html">Mentions légales & CGV</a></p><p class="disclaimer">Les soins holistiques sont complémentaires et ne remplacent pas un avis médical.</p></div></footer>
<a class="wa-fab" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
<script src="assets/consent.js"></script>
</body>
</html>
`;
}

const business = {
  sameAs: (process.env.SAMEAS || '').split(',').filter(Boolean),
  '@type': 'HealthAndBeautyBusiness', '@id': BASE + '#business', name: 'Centre Holistique – Rawia Ghorbel', url: BASE,
  telephone: '+216 26 660 344', email: 'contact@centreholistique.net', image: BASE + 'assets/og-image.jpg',
  address: { '@type': 'PostalAddress', streetAddress: 'Immeuble El Kawthar, 3e étage, Rue de l’Armée', postalCode: '3047', addressLocality: 'Sfax', addressCountry: 'TN' },
  geo: { '@type': 'GeoCoordinates', latitude: 34.7435365, longitude: 10.7644474 }, areaServed: ['Sfax', 'Tunisie', 'Worldwide']
};

for (const p of PAGES) {
  const href = p.cta || `index.html?book=${encodeURIComponent(p.book)}#reservation`;
  const body = `
<section class="seo-hero"><div class="container narrow">
  <nav class="crumbs"><a href="index.html">Accueil</a> › <a href="index.html#seances">Séances</a> › <span>${esc(p.h1)}</span></nav>
  <span class="seo-ico">${p.icon}</span>
  <h1>${esc(p.h1)}</h1>
  <p class="seo-lead">${esc(p.lead)}</p>
  <p class="seo-price">${esc(p.price)}</p>
  <div class="form-actions"><a class="btn btn-gold" href="${href}">${p.cta ? 'Choisir mon tirage' : 'Réserver cette séance'}</a><a class="btn btn-outline-light" href="${WA}" target="_blank" rel="noopener">Poser une question sur WhatsApp</a></div>
</div></section>
<section class="block"><div class="container narrow seo-body">
  ${p.sections.map(([h, t]) => `<h2>${esc(h)}</h2><p>${esc(t)}</p>`).join('\n  ')}
  <div class="seo-by"><img src="assets/icon-192.png" alt="" width="56" height="56"><p>Séance proposée par <a href="rawia-ghorbel.html"><b>Rawia Ghorbel</b></a>, guide et enseignante spirituelle, thérapeute holistique au Centre Holistique de Sfax (Tunisie). Séances en arabe, français et anglais.</p></div>
  <h2>Questions fréquentes</h2>
  <div class="faq">${p.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
  <div class="seo-ar" lang="ar" dir="rtl"><h2>${esc(p.ar.t)}</h2><p>${esc(p.ar.p)}</p></div>
  <p class="seo-note">Les soins holistiques sont un accompagnement de bien-être, complémentaires à tout suivi médical ; ils ne remplacent ni un diagnostic ni un traitement.</p>
  <div class="seo-cta"><h2>Prêt(e) à prendre soin de vous ?</h2><div class="form-actions"><a class="btn btn-primary" href="${href}">${p.cta ? 'Choisir mon tirage' : 'Réserver cette séance'}</a><a class="btn btn-soft" href="${MAPS}" target="_blank" rel="noopener">📍 Itinéraire vers le centre</a></div></div>
  <h2>Découvrir aussi</h2>
  <div class="seo-related">${p.related.map(r => `<a href="${r}">${esc(TITLES[r])} →</a>`).join('')}</div>
</div></section>`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    business,
    { '@type': 'Service', name: p.h1, description: p.desc, provider: { '@id': BASE + '#business' }, areaServed: ['Sfax', 'Worldwide'], url: BASE + p.file },
    { '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE }, { '@type': 'ListItem', position: 2, name: p.h1, item: BASE + p.file }] }
  ] };
  fs.writeFileSync(path.join(ROOT, p.file), layout({ file: p.file, title: p.title, desc: p.desc, body, ld }));
  console.log('wrote', p.file);
}

// ---- About page ----
const about = `
<section class="seo-hero"><div class="container narrow about-hero">
  <img class="about-photo" src="https://mhhzppszrqzjktqlgqag.supabase.co/storage/v1/object/public/public/images/mwmkvanl-whatsapp-image-2026-11-18-at-21-29-12.jpeg" alt="Rawia Ghorbel" width="220" height="220" onerror="this.src='assets/icon-192.png'">
  <div><span class="chip-light">Guide · Enseignante spirituelle · Thérapeute holistique</span>
  <h1>Rawia Ghorbel</h1>
  <p class="seo-lead">Fondatrice du Centre Holistique à Sfax (Tunisie). J’accompagne les personnes à redécouvrir la lumière qui vit en elles, à se libérer de ce qui les pèse et à guérir en douceur.</p>
  <div class="form-actions"><a class="btn btn-gold" href="index.html#reservation">Prendre rendez-vous</a><a class="btn btn-outline-light" href="${WA}" target="_blank" rel="noopener">WhatsApp</a></div></div>
</div></section>
<section class="block"><div class="container narrow seo-body">
  <h2>Mon chemin</h2>
  <p>Passionnée par l’être humain dans sa globalité, je me suis formée à de nombreuses approches énergétiques et spirituelles pour accompagner celles et ceux qui cherchent l’équilibre, la guérison intérieure et le sens. Mon cabinet, le Centre Holistique, se trouve à Sfax (Tunisie), et j’accompagne aussi des personnes partout dans le monde en ligne, en arabe, en français et en anglais.</p>
  <h2>Mes approches</h2>
  <ul class="seo-list">${PAGES.map(p => `<li><a href="${p.file}">${p.icon} ${esc(p.h1)}</a></li>`).join('')}<li>🧠 Consultation psychologique et coaching de vie</li><li>🎓 Formations certifiantes (Reiki, Tarot, soins énergétiques) et cercle mensuel</li></ul>
  <h2>Formations & certifications</h2>
  <ul class="seo-list"><li>Praticienne Reiki Usui</li><li>Praticienne ThetaHealing®</li><li>Praticienne Access Bars® – Access Consciousness®</li><li>Lectrice des Annales Akashiques</li><li>Facilitatrice en Constellations familiales</li><li>Formation en accompagnement psychologique</li></ul>
  <h2>Ma vision</h2>
  <p>Vous n’êtes pas venu(e) au monde pour vivre à moitié, mais pour rayonner. Mon rôle est de vous offrir un espace sûr, chaleureux et sans jugement, où respirer, guérir et vous souvenir de qui vous êtes vraiment.</p>
  <div class="seo-ar" lang="ar" dir="rtl"><h2>راوية غربال – مرشدة ومعلّمة روحية</h2><p>مؤسسة «Centre Holistique» في صفاقس، تونس. أرافقك لتكتشف النور الذي يسكن داخلك، وتتحرّر مما يُثقل قلبك، وتتشافى بلطف: ريكي، ثيتا هيلينغ، أكسس بارز، علاج طاقي، السجلات الأكاشية، تاروت وأوراكل، الأبراج العائلية واستشارات. في المركز بتونس (صفاقس) أو أونلاين من أي مكان في العالم.</p></div>
  <div class="seo-cta"><h2>Me contacter</h2><p>${esc(ADDRESS)} · <a href="tel:+21626660344">+216 26 660 344</a> · <a href="mailto:contact@centreholistique.net">contact@centreholistique.net</a></p><div class="form-actions"><a class="btn btn-primary" href="index.html#reservation">Réserver une séance</a><a class="btn btn-soft" href="${MAPS}" target="_blank" rel="noopener">📍 Itinéraire</a></div></div>
</div></section>`;
const aboutLd = { '@context': 'https://schema.org', '@graph': [business,
  { '@type': 'Person', '@id': BASE + 'rawia-ghorbel.html#person', name: 'Rawia Ghorbel', alternateName: ['Raouia Gharbal', 'راوية غربال'], jobTitle: 'Guide et enseignante spirituelle, thérapeute holistique',
    worksFor: { '@id': BASE + '#business' }, url: BASE + 'rawia-ghorbel.html', image: 'https://mhhzppszrqzjktqlgqag.supabase.co/storage/v1/object/public/public/images/mwmkvanl-whatsapp-image-2026-11-18-at-21-29-12.jpeg', address: business.address,
    knowsAbout: ['Reiki', 'ThetaHealing', 'Access Bars', 'Tarot', 'Annales Akashiques', 'Constellations familiales', 'Soins énergétiques', 'Méditation'],
    sameAs: (process.env.SAMEAS || '').split(',').filter(Boolean) }] };
fs.writeFileSync(path.join(ROOT, 'rawia-ghorbel.html'), layout({ file: 'rawia-ghorbel.html', title: 'Rawia Ghorbel – Guide et enseignante spirituelle, thérapeute holistique à Sfax (Tunisie)', desc: 'Rawia Ghorbel, guide et enseignante spirituelle et thérapeute holistique, fondatrice du Centre Holistique à Sfax (Tunisie) : Reiki, ThetaHealing®, Access Bars®, Tarot, Annales Akashiques, constellations familiales. En ligne partout dans le monde.', body: about, ld: aboutLd }));
console.log('wrote rawia-ghorbel.html');
