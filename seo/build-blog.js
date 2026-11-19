// Builds a static, Google-friendly page for every blog article: blog/<slug>.html, and updates sitemap.xml.
// Articles are written by Rawia in the dashboard (saved in Supabase). Run: node seo/build-blog.js
// A GitHub Action runs this automatically (see .github/workflows/blog.yml).
const fs = require('fs'), path = require('path'), vm = require('vm');
const B = require('../assets/blog-render.js');
const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.centreholistique.net/';
const WA = 'https://wa.me/21626660344';
const ADDRESS = 'Immeuble El Kawthar, 3ᵉ étage, Rue de l’Armée, 3047 Sfax, Tunisie';
const esc = B.esc;

// Load Supabase config + content patches from the site's own sb.js
const sbSrc = fs.readFileSync(path.join(ROOT, 'assets/sb.js'), 'utf8');
const sandbox = { window: {}, setTimeout, Promise, console };
vm.createContext(sandbox); vm.runInContext(sbSrc, sandbox);
const CFG = sandbox.window.SB_CONFIG, applyPatches = sandbox.window.applyContentPatches;

async function loadContent() {
  try {
    const r = await fetch(`${CFG.url}/rest/v1/site_content?id=eq.1&select=data`, { headers: { apikey: CFG.key, Authorization: 'Bearer ' + CFG.key } });
    const j = await r.json();
    if (Array.isArray(j) && j[0] && j[0].data) return j[0].data;
    console.warn('database answer:', JSON.stringify(j).slice(0, 200));
  } catch (e) { console.warn('database unreachable:', e.message); }
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
}

const UI = {
  ar: { home: 'الرئيسية', blog: 'المدونة', min: 'دقائق قراءة', by: 'بقلم', bio: 'مرشدة ومعلّمة روحية ومعالجة شمولية، مؤسسة Centre Holistique في صفاقس. جلسات في المركز أو أونلاين.', cta_t: 'تحب تعيش التجربة؟', cta_d: 'احجز جلستك في المركز بصفاقس أو أونلاين، أو اسألني على واتساب.', book: 'احجز جلسة', wa: 'اسأل على واتساب', more: 'مقالات أخرى', note: 'المحتوى للتثقيف والرفاه، ولا يعوّض استشارة طبية.', name: 'العربية' },
  fr: { home: 'Accueil', blog: 'Blog', min: 'min de lecture', by: 'Par', bio: 'Guide et enseignante spirituelle, thérapeute holistique, fondatrice du Centre Holistique à Sfax. Séances au centre ou en ligne.', cta_t: 'Envie de vivre l’expérience ?', cta_d: 'Réservez votre séance au centre à Sfax ou en ligne, ou posez-moi vos questions sur WhatsApp.', book: 'Réserver une séance', wa: 'Question sur WhatsApp', more: 'À lire aussi', note: 'Contenu de bien-être et d’information ; il ne remplace pas un avis médical.', name: 'Français' },
  en: { home: 'Home', blog: 'Blog', min: 'min read', by: 'By', bio: 'Spiritual guide, teacher and holistic healer, founder of Centre Holistique in Sfax. Sessions at the centre or online.', cta_t: 'Ready to experience it?', cta_d: 'Book your session at the centre in Sfax or online, or ask me on WhatsApp.', book: 'Book a session', wa: 'Ask on WhatsApp', more: 'Read also', note: 'Wellbeing and information content; it does not replace medical advice.', name: 'English' }
};
const LOCALE = { ar: 'ar-TN', fr: 'fr-FR', en: 'en-GB' };
const fmt = (d, l) => { try { return new Date(d + 'T12:00:00Z').toLocaleDateString(LOCALE[l], { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return d; } };
// main language of the static page: French first (most searched), then Arabic, then English
const mainLang = p => ['fr', 'ar', 'en'].find(l => B.langsOf(p).includes(l));

function page(p, all) {
  const langs = B.langsOf(p), main = mainLang(p), u = UI[main];
  const url = `${BASE}blog/${p.slug}.html`;
  const title = B.val(p.titre, main), desc = B.excerpt(p, main, 155);
  const others = all.filter(x => x.slug !== p.slug).slice(0, 3);
  const sections = langs.sort((a, b) => (a === main ? -1 : b === main ? 1 : 0)).map(l => {
    const t = UI[l];
    return `<article class="post" id="lang-${l}" lang="${l}" dir="${l === 'ar' ? 'rtl' : 'ltr'}" data-lang="${l}">
  <p class="post-meta">${esc(B.val(p.categorie, l))}${B.val(p.categorie, l) ? ' · ' : ''}<time datetime="${esc(p.date)}">${esc(fmt(p.date, l))}</time> · ${B.minutes(p, l)} ${t.min}</p>
  <h${l === main ? 1 : 2} class="post-title">${esc(B.val(p.titre, l))}</h${l === main ? 1 : 2}>
  <div class="post-body">${B.md(B.val(p.contenu, l))}</div>
  <div class="seo-by"><img src="assets/icon-192.png" alt="" width="56" height="56"><p>${t.by} <a href="rawia-ghorbel.html"><b>Rawia Ghorbel</b></a> — ${esc(t.bio)}</p></div>
  <div class="seo-cta"><h2>${esc(t.cta_t)}</h2><p>${esc(t.cta_d)}</p><div class="form-actions"><a class="btn btn-primary" href="index.html#reservation">${esc(t.book)}</a><a class="btn btn-soft" href="${WA}" target="_blank" rel="noopener">${esc(t.wa)}</a></div></div>
  ${others.length ? `<h2>${esc(t.more)}</h2><div class="seo-related">${others.map(o => `<a href="blog/${o.slug}.html">${esc(B.val(o.titre, B.pick(o, l)))} →</a>`).join('')}</div>` : ''}
  <p class="seo-note">${esc(t.note)}</p>
</article>`;
  }).join('\n');

  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BlogPosting', headline: title, description: desc, datePublished: p.date, dateModified: p.date, inLanguage: langs, mainEntityOfPage: url, url,
      image: p.image || BASE + 'assets/og-image.jpg',
      author: { '@type': 'Person', '@id': BASE + 'rawia-ghorbel.html#person', name: 'Rawia Ghorbel', url: BASE + 'rawia-ghorbel.html' },
      publisher: { '@type': 'Organization', name: 'Centre Holistique', logo: { '@type': 'ImageObject', url: BASE + 'assets/icon-512.png' } } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: u.home, item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: BASE + 'blog.html' },
      { '@type': 'ListItem', position: 3, name: title, item: url }] }
  ] };

  return `<!doctype html>
<html lang="${main}" dir="${main === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <base href="../">
  <title>${esc(title)} | Rawia Ghorbel – Centre Holistique</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="#3b2550">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Centre Holistique">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${esc(p.image || BASE + 'assets/og-image.jpg')}">
  <meta property="article:published_time" content="${esc(p.date)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/icon-192.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/seo.css">
  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body class="seo-page">
<header class="nav"><div class="container nav-inner">
  <a href="index.html" class="brand"><img src="assets/favicon.svg" alt="Centre Holistique" width="38" height="38"><span class="brand-name">Centre Holistique</span></a>
  <nav class="seo-nav"><a href="index.html#seances">Séances</a><a href="blog.html">Blog</a><a href="rawia-ghorbel.html">Rawia Ghorbel</a><a class="btn btn-primary btn-sm" href="index.html#reservation">Réserver</a></nav>
</div></header>
<main>
<section class="seo-hero"><div class="container narrow">
  <nav class="crumbs"><a href="index.html">${esc(u.home)}</a> › <a href="blog.html">Blog</a> › <span>${esc(title)}</span></nav>
  ${langs.length > 1 ? `<div class="post-langs">${langs.map(l => `<button type="button" data-show="${l}" class="${l === main ? 'on' : ''}">${UI[l].name}</button>`).join('')}</div>` : ''}
  ${p.image ? `<img class="post-cover" src="${esc(p.image)}" alt="">` : ''}
</div></section>
<section class="block"><div class="container narrow">
${sections}
</div></section>
</main>
<footer class="footer"><div class="container footer-grid">
  <div><a href="index.html" class="brand light"><img src="assets/favicon.svg" alt="" width="36" height="36"><span class="brand-name">Centre Holistique</span></a>
    <p>Rawia Ghorbel · guide et enseignante spirituelle, thérapeute holistique.</p><p><a href="https://www.instagram.com/rawiahealing/" target="_blank" rel="noopener">📸 Instagram</a> · <a href="https://www.facebook.com/centreholistique" target="_blank" rel="noopener">📘 Facebook</a></p></div>
  <div><h4>Contact</h4><p>${esc(ADDRESS)}<br><a href="tel:+21626660344">+216 26 660 344</a><br><a href="mailto:contact@centreholistique.net">contact@centreholistique.net</a></p></div>
  <div><h4>Blog</h4><p>${all.slice(0, 5).map(o => `<a href="blog/${o.slug}.html">${esc(B.val(o.titre, mainLang(o)))}</a>`).join('<br>')}</p></div>
</div><div class="container footer-bottom"><p>© ${new Date().getFullYear()} Centre Holistique · <a href="legal.html">Mentions légales & CGV</a></p></div></footer>
<a class="wa-fab" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
<script>(function(){var ls=[].slice.call(document.querySelectorAll('[data-lang]'));if(ls.length<2)return;
function show(l){ls.forEach(function(a){a.hidden=a.dataset.lang!==l});[].forEach.call(document.querySelectorAll('[data-show]'),function(b){b.classList.toggle('on',b.dataset.show===l)});}
var want=null;try{want=JSON.parse(localStorage.getItem('ch_lang'))}catch(e){}
show(ls.some(function(a){return a.dataset.lang===want})?want:ls[0].dataset.lang);
document.addEventListener('click',function(e){var b=e.target.closest('[data-show]');if(b){show(b.dataset.show);try{localStorage.setItem('ch_lang',JSON.stringify(b.dataset.show))}catch(e){}}});})();</script>
</body>
</html>
`;
}

(async () => {
  const D = await loadContent();
  applyPatches(D);
  const posts = B.published(D);
  const dir = path.join(ROOT, 'blog');
  fs.mkdirSync(dir, { recursive: true });
  const keep = new Set();
  for (const p of posts) {
    const f = p.slug + '.html'; keep.add(f);
    const html = page(p, posts), file = path.join(dir, f);
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== html) { fs.writeFileSync(file, html); console.log('wrote blog/' + f); }
  }
  for (const f of fs.readdirSync(dir)) if (f.endsWith('.html') && !keep.has(f)) { fs.unlinkSync(path.join(dir, f)); console.log('removed blog/' + f); }

  // sitemap: replace the blog entries
  const smFile = path.join(ROOT, 'sitemap.xml');
  let sm = fs.readFileSync(smFile, 'utf8').replace(/\s*<url>\s*<loc>[^<]*\/blog(?:\.html|\/[^<]*)<\/loc>[\s\S]*?<\/url>/g, '');
  const latest = posts[0] ? posts[0].date : new Date().toISOString().slice(0, 10);
  const entries = [`  <url>\n    <loc>${BASE}blog.html</loc>\n    <lastmod>${latest}</lastmod>\n    <priority>0.7</priority>\n  </url>`]
    .concat(posts.map(p => `  <url>\n    <loc>${BASE}blog/${p.slug}.html</loc>\n    <lastmod>${p.date}</lastmod>\n    <priority>0.6</priority>\n  </url>`));
  sm = sm.replace('</urlset>', entries.join('\n') + '\n</urlset>');
  fs.writeFileSync(smFile, sm);
  console.log(posts.length + ' articles');
})();
