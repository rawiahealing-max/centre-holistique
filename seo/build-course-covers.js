// Draws two cover images (1200×800) for every course in assets/courses-data.js:
//   assets/courses/<id>.jpg     no title (used on the cards, works in every language)
//   assets/courses/<id>-ar.jpg  with the Arabic title (course page + social media)
// Run: node seo/build-course-covers.js   (uses headless Chrome/Edge screenshots)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const { COURSES } = require('../assets/courses-data.js');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'assets', 'courses');
fs.mkdirSync(OUT, { recursive: true });
const BROWSER = [process.env.CHROME, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => p && fs.existsSync(p));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const THEMES = { violet: ['#6b3f98', '#3b2550', '#1e1128'], rose: ['#b0477e', '#5e2a52', '#2a1328'], gold: ['#a8782a', '#5a3c22', '#24152f'], green: ['#2f7d62', '#22463f', '#122421'], indigo: ['#4b4fb8', '#2b2a6b', '#151433'], blue: ['#2e6fae', '#1f3c63', '#101d33'] };
// short title shown on the image (the full title stays on the site)
const SHORT = {
  'reiki-usui': ['الريكي أوسوي', 'من المستوى 1 إلى الماستر'], 'karuna-reiki': ['كارونا ريكي', 'ريكي الرحمة'], 'kundalini-reiki': ['كونداليني ريكي', 'إيقاظ الطاقة بلطف'],
  'prana-healing': ['البرانا هيلينغ', 'العلاج بطاقة الحياة'], 'annales-akashiques': ['السجلات الأكاشية', 'افتح كتاب روحك'], 'bawabat-2027': ['ماستركلاس 2027', 'الوفرة والتجلّي الواعي', '5 أمسيات مباشرة · 14–18 ديسمبر'],
  'jourouh-toufoula': ['جروح الطفولة الخمس', 'رحلة شفاء مع طفلك الداخلي'], 'alaqat-wa3iya': ['العلاقات الواعية', 'من التعلّق إلى الحب الحر'], 'karma-3oqoud': ['الكارما والعقود الروحية', 'حرّر ما أدّى مهمته'],
  'qouwat-al-sou2al': ['قوة السؤال', 'سؤال واحد يفتح كل الإمكانيات']
};
function seed(r, stroke, op) {
  const c = [[0, 0]].concat([...Array(6)].map((_, i) => [r * Math.cos(i * Math.PI / 3), r * Math.sin(i * Math.PI / 3)]));
  return `<g fill="none" stroke="${stroke}" stroke-width="1.6" opacity="${op}">${c.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`).join('')}<circle r="${r * 2}"/><circle r="${r * 2.2}" stroke-dasharray="3 7"/></g>`;
}
function stars(n, seedN) { let s = seedN; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; return [...Array(n)].map(() => `<circle cx="${(r() * 1200).toFixed(0)}" cy="${(r() * 800).toFixed(0)}" r="${(r() * 2 + .4).toFixed(1)}" fill="#f0d79a" opacity="${(r() * .7 + .2).toFixed(2)}"/>`).join(''); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'covers-'));
const ONLY = process.argv[2];
for (const plainMode of [true, false]) COURSES.forEach((c, k) => {
  if (ONLY && c.id !== ONLY) return;
  const [a, b, d] = THEMES[c.theme] || THEMES.violet, [t1, t2, pill] = SHORT[c.id] || [c.titre.ar, ''];
  const lv = (c.niveaux || []).length;
  const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@500;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;width:1200px;height:800px;overflow:hidden}body{background:radial-gradient(110% 90% at 30% 30%,${a} 0%,${b} 55%,${d} 100%);font-family:Tajawal,sans-serif;color:#fff;position:relative}
svg{position:absolute;inset:0}.txt{position:absolute;right:80px;top:0;bottom:0;width:640px;display:flex;flex-direction:column;justify-content:center}
.k{color:#f0d79a;letter-spacing:.25em;font-size:22px;font-weight:700}.t{font-family:Amiri,serif;font-size:${t1.length > 14 ? 74 : 92}px;line-height:1.15;margin:18px 0 10px}
.s{font-size:32px;color:#efe4fa;line-height:1.4}.pill{display:inline-block;margin-top:34px;border:2px solid #f0d79a;color:#f0d79a;border-radius:999px;padding:8px 26px;font-size:24px;font-weight:700}
.f{position:absolute;bottom:34px;right:80px;font-size:20px;color:#d9c8ec;letter-spacing:.08em}</style></head><body>
<svg viewBox="0 0 1200 800">${stars(90, k * 7 + 3)}<g transform="translate(${plainMode ? 600 : 260},400)">${seed(78, '#f0d79a', .85)}${seed(156, '#ffffff', .12)}<circle r="12" fill="#f0d79a"/></g></svg>
${plainMode ? `<div class="f" style="right:0;left:0;text-align:center">CENTRE HOLISTIQUE</div>` : `<div class="txt"><div class="k">دورة تكوينية</div><div class="t">${esc(t1)}</div><div class="s">${esc(t2)}</div>${pill ? `<div><span class="pill">${esc(pill)}</span></div>` : lv ? `<div><span class="pill">${lv} مستويات · شهادة</span></div>` : `<div><span class="pill">مع شهادة · في المركز أو عن بُعد</span></div>`}</div>
<div class="f">CENTRE HOLISTIQUE · RAWIA GHORBEL</div>`}</body></html>`;
  const tag = plainMode ? '' : '-ar', h = path.join(tmp, c.id + tag + '.html'), png = path.join(tmp, c.id + tag + '.png');
  fs.writeFileSync(h, html);
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,800', '--virtual-time-budget=10000', `--screenshot=${png}`, 'file:///' + h.replace(/\\/g, '/')], { stdio: 'ignore' });
  fs.copyFileSync(png, path.join(OUT, c.id + tag + '.png'));
  console.log('cover', c.id + tag);
});
