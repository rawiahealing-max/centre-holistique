// Builds a full page for every published course: formations/<id>.html (+ sitemap entries).
// Also writes magazines/html/catalogue-formations.html with ALL courses (published or not) for Rawia to review / print.
// Run: node seo/build-courses.js   (the GitHub Action runs it every hour together with the blog)
const fs = require('fs'), path = require('path'), vm = require('vm');
const B = require('../assets/blog-render.js');
const ROOT = path.join(__dirname, '..'), BASE = 'https://www.centreholistique.net/', WA = 'https://wa.me/21626660344';
const esc = B.esc;
const sandbox = { window: {}, setTimeout, Promise, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/courses-data.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/sb.js'), 'utf8'), sandbox);
const CFG = sandbox.window.SB_CONFIG;

async function loadContent() {
  try {
    const r = await fetch(`${CFG.url}/rest/v1/site_content?id=eq.1&select=data`, { headers: { apikey: CFG.key, Authorization: 'Bearer ' + CFG.key } });
    const j = await r.json(); if (Array.isArray(j) && j[0] && j[0].data) return j[0].data;
  } catch (e) { console.warn('database unreachable:', e.message); }
  return JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
}
const L = v => v && typeof v === 'object' ? (v.ar || v.fr || v.en || '') : (v || '');
const price = p => p ? [p.tnd && p.tnd + ' DT', p.eur && p.eur + ' €', p.usd && '$' + p.usd].filter(Boolean).join(' · ') : '';
// course page / sharing: the cover with the Arabic title when it exists (cards use the plain one)
const heroImg = c => { const a = c.image && c.image.replace(/\.jpg$/, '-ar.jpg'); return a && fs.existsSync(path.join(ROOT, a)) ? a : c.image; };
const levels = c => Array.isArray(c.niveaux) ? c.niveaux.filter(x => x && L(x.nom)) : [];

function courseBody(c, forPdf) {
  const lv = levels(c);
  const book = i => `index.html?book=${encodeURIComponent('formations:' + c.id + (lv.length ? ':' + i : ''))}#reservation`;
  return `
<section class="seo-hero"><div class="container narrow">
  ${forPdf ? '' : `<nav class="crumbs"><a href="index.html">الرئيسية</a> › <a href="index.html#formations">الدورات</a> › <span>${esc(L(c.titre))}</span></nav>`}
  ${heroImg(c) ? `<img class="post-cover" src="${esc(heroImg(c))}" alt="${esc(L(c.titre))}">` : ''}
  <h1>${esc(L(c.titre))}</h1>
  <p class="seo-lead">${esc(L(c.description))}</p>
  <p class="seo-price">${esc([L(c.duree), L(c.mode), c.date && '📅 ' + c.date].filter(Boolean).join(' · '))}</p>
  ${forPdf ? '' : `<div class="form-actions"><a class="btn btn-gold" href="${book(0)}">سجّل في الدورة</a><a class="btn btn-outline-light" href="${WA}" target="_blank" rel="noopener">اسأل على واتساب</a></div>`}
</div></section>
<section class="block"><div class="container narrow seo-body">
  <h2>${lv.length ? 'المستويات والأسعار' : 'السعر'}</h2>
  ${lv.length ? `<div class="lv-table">${lv.map((x, i) => `<div class="lv-row"><b>${esc(L(x.nom))}</b><span dir="ltr">${esc(price(x.prix))}</span>${forPdf ? '' : `<a class="btn btn-soft btn-sm" href="${book(i)}">اختر</a>`}</div>`).join('')}</div>` : `<p class="seo-price" style="color:#5b3483;background:#f6f0fb;border-color:#e3d3f2"><span dir="ltr">${esc(price(c.prix))}</span></p>`}
  <div class="post-body">${B.md(L(c.programme))}</div>
  <div class="seo-by"><img src="assets/icon-192.png" alt="" width="56" height="56"><p>تقدّمها <a href="rawia-ghorbel.html"><b>راوية غربال</b></a>، غراند ماستر في الريكي، معالجة بالطاقة وعضو الجمعية الدولية للمعالجين، في مركز هولستيك بصفاقس. الدورات بالعربية والفرنسية.</p></div>
  ${forPdf ? '' : `<div class="seo-cta"><h2>جاهز(ة) للبدء؟</h2><div class="form-actions"><a class="btn btn-primary" href="${book(0)}">سجّل الآن</a><a class="btn btn-soft" href="${WA}" target="_blank" rel="noopener">💬 واتساب</a></div></div>`}
</div></section>`;
}

function page(c) {
  const url = `${BASE}formations/${c.id}.html`, title = L(c.titre), desc = L(c.description).slice(0, 155);
  const lv = levels(c);
  const ld = { '@context': 'https://schema.org', '@type': 'Course', name: title, description: L(c.description), inLanguage: 'ar', url,
    image: heroImg(c) ? BASE + heroImg(c) : BASE + 'assets/og-image.jpg',
    provider: { '@type': 'Organization', name: 'Centre Holistique – Rawia Ghorbel', sameAs: BASE },
    offers: (lv.length ? lv.map(x => x.prix) : [c.prix]).filter(p => p && p.tnd).map(p => ({ '@type': 'Offer', price: p.tnd, priceCurrency: 'TND', category: 'Paid', availability: 'https://schema.org/InStock' })),
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: ['Onsite', 'Online'], location: 'Sfax, Tunisie' } };
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <base href="../">
  <title>${esc(title)} | Centre Holistique – Rawia Ghorbel</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="robots" content="max-image-preview:large">
  <meta name="theme-color" content="#3b2550">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}"><meta property="og:image" content="${esc(heroImg(c) ? BASE + heroImg(c) : BASE + 'assets/og-image.jpg')}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cormorant+Garamond:wght@500;600&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/seo.css">
  <script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body class="seo-page">
<header class="nav"><div class="container nav-inner">
  <a href="index.html" class="brand"><img src="assets/favicon.svg" alt="Centre Holistique" width="38" height="38"><span class="brand-name">Centre Holistique</span></a>
  <nav class="seo-nav"><a href="index.html#seances">الجلسات</a><a href="index.html#formations">الدورات</a><a href="blog.html">المدونة</a><a class="btn btn-primary btn-sm" href="index.html#reservation">احجز</a></nav>
</div></header>
<main>${courseBody(c, false)}</main>
<footer class="footer"><div class="container footer-bottom"><p>© ${new Date().getFullYear()} Centre Holistique · <a href="legal.html">Mentions légales & CGV</a></p><p class="disclaimer">الدورات للتطوّر الشخصي والرفاه، ولا تعوّض الاستشارة الطبية أو النفسية.</p></div></footer>
<a class="wa-fab" href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
</body></html>
`;
}

function catalogue(all) {
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><base href="../../">
<title>كتالوج الدورات – Centre Holistique</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Amiri:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/seo.css">
<style>@page{size:A4;margin:12mm 0}body{background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.course{page-break-after:always}.course:last-child{page-break-after:auto}.seo-hero{padding:8mm 0}.seo-hero h1{font-size:24pt}.post-cover{max-height:70mm}
.seo-body h2{break-after:avoid}.post-body li,.post-body p{break-inside:avoid}.badge{display:inline-block;margin:0 0 3mm;border-radius:999px;padding:1mm 4mm;font-weight:700;font-size:10pt}
.on{background:#e5f4e4;color:#1f6b3a}.off{background:#f9eeda;color:#8a5a12}
.coverp{height:270mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:radial-gradient(120% 80% at 50% 30%,#6b3f98,#3b2550 60%,#1e1128);color:#fff;page-break-after:always}
.coverp h1{font-family:Amiri,serif;font-size:46pt;margin:0;color:#fff}.coverp p{font-size:15pt;color:#f0d79a}</style></head><body>
<section class="coverp"><p>CENTRE HOLISTIQUE · RAWIA GHORBEL</p><h1>كتالوج الدورات التكوينية</h1><p>${all.length} دورات · نسخة للمراجعة قبل النشر</p></section>
${all.map(c => `<article class="course"><div class="container narrow" style="padding-top:6mm"><span class="badge ${c.actif === false ? 'off' : 'on'}">${c.actif === false ? '⏳ مخفية — تنتظر النشر' : '✅ منشورة في الموقع'}</span></div>${courseBody(c, true)}</article>`).join('')}
</body></html>`;
}

(async () => {
  const D = await loadContent();
  sandbox.window.applyContentPatches(D);
  const all = (D.formations || []).filter(c => c.programme && L(c.programme));
  const live = all.filter(c => c.actif !== false);
  const dir = path.join(ROOT, 'formations'); fs.mkdirSync(dir, { recursive: true });
  const keep = new Set();
  for (const c of live) {
    const f = c.id + '.html'; keep.add(f); const html = page(c), file = path.join(dir, f);
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== html) { fs.writeFileSync(file, html); console.log('wrote formations/' + f); }
  }
  for (const f of fs.readdirSync(dir)) if (f.endsWith('.html') && !keep.has(f)) { fs.unlinkSync(path.join(dir, f)); console.log('removed formations/' + f); }
  const smFile = path.join(ROOT, 'sitemap.xml');
  let sm = fs.readFileSync(smFile, 'utf8').replace(/\s*<url>\s*<loc>[^<]*\/formations\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  sm = sm.replace('</urlset>', live.map(c => `  <url>\n    <loc>${BASE}formations/${c.id}.html</loc>\n    <priority>0.7</priority>\n  </url>`).join('\n') + (live.length ? '\n' : '') + '</urlset>');
  fs.writeFileSync(smFile, sm);
  const mag = path.join(ROOT, 'magazines', 'html'); if (fs.existsSync(path.join(ROOT, 'magazines'))) { fs.mkdirSync(mag, { recursive: true }); fs.writeFileSync(path.join(mag, 'catalogue-formations.html'), catalogue(all)); }
  console.log(live.length + ' published courses, ' + all.length + ' with a programme');
})();
