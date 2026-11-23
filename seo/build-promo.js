// Promotional images for the Masterclass 2027 → assets/promo/
//   mc2027-post-ar.png / -fr (1080×1350, Instagram/Facebook post)
//   mc2027-story-ar.png / -fr (1080×1920, story / reel cover)
//   mc2027-og.png (1200×630, link preview)
// Run: node seo/build-promo.js   (then convert to JPG)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'assets', 'promo');
fs.mkdirSync(OUT, { recursive: true });
const PORTRAIT = process.env.PORTRAIT || 'https://mhhzppszrqzjktqlgqag.supabase.co/storage/v1/object/public/public/images/mwmkvanl-whatsapp-image-2026-11-18-at-21-29-12.jpeg';
const BROWSER = [process.env.CHROME, '/usr/bin/google-chrome', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => p && fs.existsSync(p));
const T = {
  ar: { dir: 'rtl', kicker: 'ماستركلاس مباشر عن بُعد', t1: 'ماستركلاس 2027', t2: 'الوفرة والتجلّي الواعي',
    lines: ['اختم 2026 بسلام', 'حرّر ما أثقلك', 'افتح باب الوفرة', 'ضع نواياك لعام 2027 بوعي'],
    when: '3 أمسيات مباشرة · 18 و19 و20 ديسمبر', time: 'الساعة 20:00 بتوقيت تونس · من أي مكان في العالم',
    price: 'ابتداءً من 44 €', cta: 'احجز مقعدك', by: 'مع راوية غربال', seats: 'المقاعد محدودة', url: 'centreholistique.net/masterclass-2027' },
  fr: { dir: 'ltr', kicker: 'Masterclass en ligne en direct', t1: 'Masterclass 2027', t2: 'Abondance & Manifestation consciente',
    lines: ['Clôturez 2026 en paix', 'Libérez ce qui vous pèse', 'Ouvrez la porte de l’abondance', 'Posez vos intentions pour 2027'],
    when: '3 soirées en direct · 18, 19 et 20 décembre', time: '20 h heure de Tunisie · partout dans le monde',
    price: 'À partir de 44 €', cta: 'Réservez votre place', by: 'avec Rawia Ghorbel', seats: 'Places limitées', url: 'centreholistique.net/masterclass-2027' }
};
function seed(r, stroke, op) {
  const c = [[0, 0]].concat([...Array(6)].map((_, i) => [r * Math.cos(i * Math.PI / 3), r * Math.sin(i * Math.PI / 3)]));
  return `<g fill="none" stroke="${stroke}" stroke-width="1.8" opacity="${op}">${c.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`).join('')}<circle r="${r * 2}"/><circle r="${r * 2.2}" stroke-dasharray="3 8"/></g>`;
}
function stars(n, w, h, s0) { let s = s0; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; return [...Array(n)].map(() => `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(r() * 2.2 + .4).toFixed(1)}" fill="#f0d79a" opacity="${(r() * .7 + .2).toFixed(2)}"/>`).join(''); }
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@500;700;800&family=Cormorant+Garamond:wght@600;700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">';
const BASE = (w, h) => `html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden}body{position:relative;color:#fff;background:radial-gradient(120% 80% at 50% 20%,#a8782a 0%,#5a3c22 42%,#24152f 85%)}svg.bg{position:absolute;inset:0}
.ar{font-family:Tajawal,sans-serif}.ar .t1,.ar .t2{font-family:Amiri,serif}.fr{font-family:Jost,sans-serif}.fr .t1,.fr .t2{font-family:'Cormorant Garamond',serif}
.kicker{display:inline-block;border:2px solid rgba(240,215,154,.7);color:#f0d79a;border-radius:999px;padding:10px 30px;font-weight:700}
.t1{color:#fff;line-height:1.05;margin:0}.t2{color:#f0d79a;line-height:1.2;margin:0}
.lines{list-style:none;padding:0;margin:0}.lines li{color:#f3eafc}.lines li::before{content:"✦";color:#f0d79a;margin-inline-end:14px}
.when{font-weight:800;color:#fff}.time{color:#e8dcf5}.price{display:inline-block;background:#f0d79a;color:#3b2550;font-weight:800;border-radius:18px}
.cta{display:inline-block;border:3px solid #fff;color:#fff;font-weight:800;border-radius:999px}.portrait{border-radius:50%;object-fit:cover;border:5px solid #f0d79a}
.by{color:#f0d79a;font-weight:700}.url{color:#e8dcf5;letter-spacing:.02em}.seats{color:#f0d79a;font-weight:700}`;

function post(l) {
  const t = T[l], W = 1080, H = 1350;
  return `<!doctype html><html dir="${t.dir}"><head><meta charset="utf-8">${FONTS}<style>${BASE(W, H)}
  .wrap{position:absolute;inset:70px 80px;display:flex;flex-direction:column;align-items:center;text-align:center}
  .kicker{font-size:30px}.t1{font-size:${l === 'ar' ? 122 : 112}px;margin-top:34px}.t2{font-size:${l === 'ar' ? 64 : 56}px;margin-top:10px}
  .lines{margin-top:46px;display:grid;gap:14px}.lines li{font-size:36px}
  .when{font-size:44px;margin-top:48px}.time{font-size:30px;margin-top:10px}
  .row{display:flex;align-items:center;gap:28px;margin-top:44px}.portrait{width:150px;height:150px;box-shadow:0 0 40px rgba(240,215,154,.4)}.by{font-size:34px}
  .price{font-size:40px;padding:16px 34px}.foot{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center}
  .cta{font-size:32px;padding:16px 40px}.url{font-size:26px}</style></head><body class="${l}">
  <svg class="bg" viewBox="0 0 ${W} ${H}">${stars(120, W, H, 5)}<g transform="translate(${W / 2},${H * .43})">${seed(150, '#f0d79a', .16)}</g></svg>
  <div class="wrap"><span class="kicker">✨ ${t.kicker}</span><h1 class="t1">${t.t1}</h1><h2 class="t2">${t.t2}</h2>
  <ul class="lines">${t.lines.map(x => `<li>${x}</li>`).join('')}</ul>
  <div class="when">${t.when}</div><div class="time">${t.time}</div>
  <div class="row"><img class="portrait" src="${PORTRAIT}" alt=""><div><div class="by">${t.by}</div><div class="seats">${t.seats}</div></div><span class="price">${t.price}</span></div>
  <div class="foot"><span class="cta">${t.cta}</span><span class="url">${t.url}</span></div></div></body></html>`;
}
function story(l) {
  const t = T[l], W = 1080, H = 1920;
  return `<!doctype html><html dir="${t.dir}"><head><meta charset="utf-8">${FONTS}<style>${BASE(W, H)}
  .wrap{position:absolute;inset:130px 80px 120px;display:flex;flex-direction:column;align-items:center;text-align:center}
  .kicker{font-size:32px}.t1{font-size:${l === 'ar' ? 136 : 124}px;margin-top:50px}.t2{font-size:${l === 'ar' ? 70 : 60}px;margin-top:14px}
  .portrait{width:260px;height:260px;margin-top:56px;box-shadow:0 0 60px rgba(240,215,154,.45)}.by{font-size:40px;margin-top:22px}
  .lines{margin-top:50px;display:grid;gap:18px}.lines li{font-size:42px}
  .when{font-size:50px;margin-top:56px}.time{font-size:32px;margin-top:14px}
  .price{font-size:46px;padding:18px 42px;margin-top:46px;box-shadow:0 10px 30px rgba(0,0,0,.25)}.seats{font-size:34px;margin-top:22px}
  .bottom{margin-top:54px;text-align:center}.cta{font-size:40px;padding:20px 56px;background:rgba(255,255,255,.08)}.url{display:block;font-size:30px;margin-top:20px}</style></head><body class="${l}">
  <svg class="bg" viewBox="0 0 ${W} ${H}">${stars(170, W, H, 9)}<g transform="translate(${W / 2},${H * .3})">${seed(170, '#f0d79a', .15)}</g></svg>
  <div class="wrap"><span class="kicker">✨ ${t.kicker}</span><h1 class="t1">${t.t1}</h1><h2 class="t2">${t.t2}</h2>
  <img class="portrait" src="${PORTRAIT}" alt=""><div class="by">${t.by}</div>
  <ul class="lines">${t.lines.map(x => `<li>${x}</li>`).join('')}</ul>
  <div class="when">${t.when}</div><div class="time">${t.time}</div>
  <span class="price">${t.price}</span><div class="seats">${t.seats}</div>
  <div class="bottom"><span class="cta">${t.cta}</span><span class="url">${t.url}</span></div></div></body></html>`;
}
function og() {
  const t = T.ar, W = 1200, H = 630;
  return `<!doctype html><html dir="rtl"><head><meta charset="utf-8">${FONTS}<style>${BASE(W, H)}
  .wrap{position:absolute;inset:60px 70px;display:flex;align-items:center;gap:50px}.txt{flex:1}
  .kicker{font-size:24px}.t1{font-size:96px;margin-top:20px}.t2{font-size:50px;margin-top:6px}.when{font-size:32px;margin-top:26px}.time{font-size:22px;margin-top:6px}
  .portrait{width:300px;height:300px}.price{font-size:30px;padding:10px 24px;margin-top:22px}</style></head><body class="ar">
  <svg class="bg" viewBox="0 0 ${W} ${H}">${stars(90, W, H, 3)}<g transform="translate(230,315)">${seed(90, '#f0d79a', .2)}</g></svg>
  <div class="wrap"><div class="txt"><span class="kicker">✨ ${t.kicker}</span><h1 class="t1">${t.t1}</h1><h2 class="t2">${t.t2}</h2>
  <div class="when">${t.when}</div><div class="time">${t.time}</div><span class="price">${t.price}</span></div>
  <img class="portrait" src="${PORTRAIT}" alt=""></div></body></html>`;
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'promo-'));
const shot = (name, html, w, h) => {
  const f = path.join(tmp, name + '.html'); fs.writeFileSync(f, html);
  const png = path.join(OUT, name + '.png');
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${w},${h}`, '--virtual-time-budget=12000', `--screenshot=${png}`, 'file:///' + f.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log(name);
};
for (const l of ['ar', 'fr']) { shot('mc2027-post-' + l, post(l), 1080, 1350); shot('mc2027-story-' + l, story(l), 1080, 1920); }
shot('mc2027-og', og(), 1200, 630);
