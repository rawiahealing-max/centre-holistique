// Corporate brochure (A4) in French, Arabic and English, from assets/entreprises-data.js
//   assets/brochure-entreprises-fr.pdf · -ar.pdf · -en.pdf  and  assets/brochure-entreprises.pdf (all three languages)
// Run: node seo/build-brochure.js
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const { PROGS, WORKSHOPS } = require('../assets/entreprises-data.js');
const ROOT = path.join(__dirname, '..');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const PORTRAIT = 'https://mhhzppszrqzjktqlgqag.supabase.co/storage/v1/object/public/public/images/mwmkvanl-whatsapp-image-2026-11-18-at-21-29-12.jpeg';
const COL = { green: '#2f7d62', blue: '#2e6fae', violet: '#7b4fa8', indigo: '#4b4fb8', gold: '#b8862b', rose: '#b0477e' };
const URL = 'www.centreholistique.net/entreprises.html', WA = '+216 26 660 344';

const T = {
  fr: { dir: 'ltr', kicker: 'CENTRE HOLISTIQUE · RAWIA GHORBEL', title: 'Formations bien-être<br>pour les entreprises',
    lead: 'Le bien-être de vos équipes, la clé de votre réussite : programmes et ateliers sur mesure en gestion du stress, intelligence émotionnelle, communication et leadership.',
    tags: ['Dans vos locaux en Tunisie et à l’international', 'En ligne', 'Arabe · Français · Anglais', 'Diagnostic offert'],
    progs: 'Programmes de formation', ws: 'Ateliers Pro (1 h 30 – 3 h)', wsSub: 'Des formats courts sur les sujets les plus demandés par les entreprises aujourd’hui.',
    dur: 'Durée', aud: 'Public', method: 'Notre démarche',
    steps: [['Diagnostic offert', '30 minutes avec vos RH ou managers.'], ['Proposition sur mesure', 'Programme, format et devis sous 72 h.'], ['Animation', 'Ateliers interactifs et pratiques.'], ['Évaluation & suivi', 'Attestations et rapport RH anonyme.']],
    incl: 'Inclus', inclL: ['Supports PDF pour chaque participant', 'Attestation de participation', 'Évaluation à chaud et à froid', 'Rapport de synthèse anonyme pour les RH', 'Suivi à 30 jours'],
    fmt: 'Formats', fmtL: ['Dans vos locaux', 'En ligne (Zoom, Teams, Meet)', 'Au centre à Sfax (Tunisie)', 'Arabe, français ou anglais'],
    about: '<b>Rawia Ghorbel</b> accompagne particuliers et groupes depuis plus de 8 ans en gestion du stress, développement personnel et bien-être, avec des pratiques simples et concrètes, dans un cadre confidentiel et sans jugement.',
    cta: 'Demandez votre proposition sur mesure', note: 'Formations de développement personnel et de prévention ; elles ne remplacent pas un suivi médical ou psychologique.' },
  ar: { dir: 'rtl', kicker: 'CENTRE HOLISTIQUE · راوية غربال', title: 'تكوينات الرفاه<br>للمؤسسات',
    lead: 'رفاه فريقك… مفتاح نجاح مؤسستك: برامج وورشات حسب الطلب في إدارة الضغط، والذكاء العاطفي، والتواصل، والقيادة.',
    tags: ['في مقرّكم بتونس وخارجها', 'عن بُعد', 'العربية · الفرنسية · الإنجليزية', 'تشخيص مجاني'],
    progs: 'برامج التكوين', ws: 'ورشات Pro (من ساعة ونصف إلى 3 ساعات)', wsSub: 'صيغ قصيرة حول المواضيع الأكثر طلباً لدى المؤسسات اليوم.',
    dur: 'المدة', aud: 'الجمهور', method: 'طريقة العمل',
    steps: [['تشخيص مجاني', '30 دقيقة مع الموارد البشرية أو المديرين.'], ['عرض حسب الطلب', 'البرنامج والصيغة وعرض الأسعار خلال 72 ساعة.'], ['التنشيط', 'ورشات تفاعلية وتطبيقية.'], ['التقييم والمتابعة', 'شهادات حضور وتقرير مجهول الهوية.']],
    incl: 'مشمول في كل تدخّل', inclL: ['محامل PDF لكل مشارك', 'شهادة حضور', 'تقييم فوري وتقييم لاحق', 'تقرير ملخّص مجهول الهوية للموارد البشرية', 'متابعة بعد 30 يوماً'],
    fmt: 'الصيغ', fmtL: ['في مقرّكم', 'عن بُعد (Zoom وTeams وMeet)', 'في المركز بتونس (صفاقس)', 'بالعربية أو الفرنسية أو الإنجليزية'],
    about: '<b>راوية غربال</b> ترافق الأفراد والمجموعات منذ أكثر من 8 سنوات في إدارة الضغط والتطوير الشخصي والرفاه، بممارسات بسيطة وعملية، في إطار سرّي وخالٍ من الأحكام.',
    cta: 'اطلبوا عرضكم حسب الطلب', note: 'تكوينات في التطوير الشخصي والوقاية، ولا تعوّض المتابعة الطبية أو النفسية.' },
  en: { dir: 'ltr', kicker: 'CENTRE HOLISTIQUE · RAWIA GHORBEL', title: 'Wellbeing training<br>for companies',
    lead: 'Your team’s wellbeing, the key to your success: tailor-made programmes and workshops in stress management, emotional intelligence, communication and leadership.',
    tags: ['At your premises in Tunisia and abroad', 'Online', 'Arabic · French · English', 'Free diagnosis'],
    progs: 'Training programmes', ws: 'Pro workshops (1.5 – 3 h)', wsSub: 'Short formats on the topics companies ask for most today.',
    dur: 'Duration', aud: 'Audience', method: 'How we work',
    steps: [['Free diagnosis', '30 minutes with HR or managers.'], ['Tailored proposal', 'Programme, format and quote within 72 h.'], ['Delivery', 'Interactive, practical workshops.'], ['Evaluation & follow-up', 'Certificates and anonymous HR report.']],
    incl: 'Included', inclL: ['PDF materials for each participant', 'Certificate of attendance', 'Immediate and follow-up evaluation', 'Anonymous summary report for HR', '30-day follow-up'],
    fmt: 'Formats', fmtL: ['At your premises', 'Online (Zoom, Teams, Meet)', 'At our centre in Sfax, Tunisia', 'Arabic, French or English'],
    about: '<b>Rawia Ghorbel</b> has supported individuals and groups for over 8 years in stress management, personal development and wellbeing, with simple, practical methods in a confidential, judgment-free setting.',
    cta: 'Request your tailor-made proposal', note: 'Personal development and prevention training; it does not replace medical or psychological care.' }
};

function pages(l) {
  const t = T[l], v = o => o[l] || o.fr;
  const prog = p => `<div class="prog" style="border-top-color:${COL[p.theme] || '#7b4fa8'}"><h3>${p.icon} ${esc(v(p.t))}</h3>
    <p class="meta"><b>${t.dur} :</b> ${esc(v(p.dur))}<br><b>${t.aud} :</b> ${esc(v(p.aud))}</p><ul>${v(p.goals).map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>`;
  const ws = w => `<div class="ws"><span class="ico">${w.icon}</span><div><span class="dur">⏱ ${esc(v(w.dur))}</span><h4>${esc(v(w.t))}</h4><p>${esc(v(w.d))}</p></div></div>`;
  return `<div class="lang-${l}" dir="${t.dir}" lang="${l}">
<section class="page cover"><div class="brand">${t.kicker}</div>
<div><h1>${t.title}</h1><p>${esc(t.lead)}</p><div class="tags">${t.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div><div class="about cov"><img src="${PORTRAIT}" alt=""><p>${t.about}</p></div></div>
<div class="foot">${URL} · WhatsApp ${WA}</div></section>
<section class="page"><h2>${t.progs}</h2><div class="grid">${PROGS.slice(0, 6).map(prog).join('')}</div></section>
<section class="page"><div class="grid" style="margin-bottom:7mm">${PROGS.slice(6).map(prog).join('')}</div>
<h2>${t.ws}</h2><p class="sub">${esc(t.wsSub)}</p><div class="wsgrid">${WORKSHOPS.slice(0, 4).map(ws).join('')}</div></section>
<section class="page"><div class="wsgrid" style="margin-bottom:7mm">${WORKSHOPS.slice(4).map(ws).join('')}</div>
<h2>${t.method}</h2><div class="steps">${t.steps.map(([a, b], i) => `<div class="step"><span>${i + 1}</span><b>${esc(a)}</b><p>${esc(b)}</p></div>`).join('')}</div>
<div class="two"><div><h3>${t.incl}</h3><ul>${t.inclL.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div><h3>${t.fmt}</h3><ul>${t.fmtL.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
<div class="contact"><b>${t.cta}</b><br>${URL} · WhatsApp <span dir="ltr">${WA}</span><br><span class="small">${esc(t.note)}</span></div></section></div>`;
}

const CSS = `@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Jost,sans-serif;color:#2c2233;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.lang-ar{font-family:Tajawal,sans-serif}.lang-ar h1,.lang-ar h2{font-family:Amiri,serif}
.page{width:210mm;height:297mm;padding:15mm 15mm;position:relative;page-break-after:always;overflow:hidden}
.cover{background:linear-gradient(140deg,#1c2a3f,#2b2a5e 45%,#5b3483);color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.brand{letter-spacing:.3em;color:#f0d79a;font-size:10pt}.lang-ar .brand{letter-spacing:.05em}.cover h1{font-family:'Cormorant Garamond',serif;font-size:40pt;line-height:1.15;margin:0 0 6mm}
.cover p{font-size:13pt;line-height:1.7;color:#e5dcf3;max-width:155mm}.tags{display:flex;flex-wrap:wrap;gap:3mm;margin-top:8mm}.tags span{border:1px solid rgba(240,215,154,.6);color:#f0d79a;border-radius:99px;padding:1.5mm 4mm;font-size:10pt}
.foot{font-size:9.5pt;color:#cbb7e0}h2{font-family:'Cormorant Garamond',serif;font-size:23pt;color:#3b2550;margin:0 0 3mm}.sub{margin:0 0 5mm;color:#5c5266;font-size:10pt}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:5mm}.prog{border:1px solid #e6dcef;border-top:4px solid;border-radius:4mm;padding:4mm 5mm}
.prog h3{font-size:11.5pt;margin:0 0 2mm}.meta{font-size:9pt;color:#5c5266;margin:0 0 2mm;line-height:1.55}.prog ul,.two ul{margin:0;padding-inline-start:4.5mm;font-size:9.3pt;line-height:1.55}
.wsgrid{display:grid;grid-template-columns:1fr 1fr;gap:4mm}.ws{display:flex;gap:3mm;border:1px solid #e6dcef;border-radius:4mm;padding:3.5mm 4mm;background:#fff}
.ws .ico{font-size:15pt;width:11mm;height:11mm;display:grid;place-items:center;background:#f6f0fb;border-radius:3mm;flex:none}.ws h4{font-size:10.5pt;margin:1mm 0}.ws p{font-size:9pt;margin:0;color:#5c5266;line-height:1.5}
.dur{font-size:8pt;font-weight:700;color:#8a5a12;background:#fbf3e3;border-radius:99px;padding:.5mm 2.5mm}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:3.5mm;margin-bottom:6mm}.step{background:#f6f0fb;border-radius:4mm;padding:3.5mm}.step b{display:block;color:#5b3483;margin:1mm 0;font-size:10pt}.step span{display:inline-grid;place-items:center;width:7mm;height:7mm;border-radius:50%;background:#7b4fa8;color:#fff;font-weight:700}.step p{font-size:8.8pt;margin:0;color:#5c5266;line-height:1.5}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}.two h3{margin:0 0 2mm;font-size:12pt;color:#3b2550}.two ul{font-size:10pt;line-height:1.8}
.about{display:flex;gap:5mm;align-items:center;background:#fbf6ec;border-radius:4mm;padding:4.5mm;margin:6mm 0}.about img{width:28mm;height:28mm;border-radius:50%;object-fit:cover;border:2px solid #d9b56a;flex:none}.about p{margin:0;font-size:10pt;line-height:1.7}
.about.cov{background:rgba(255,255,255,.08);border:1px solid rgba(240,215,154,.35);margin-top:12mm}.about.cov p{color:#efe6fa}.about.cov b{color:#f0d79a}.contact{margin-top:6mm;background:#3b2550;color:#fff;border-radius:4mm;padding:5mm;text-align:center;font-size:11pt;line-height:1.9}.contact b{color:#f0d79a}.small{font-size:8.5pt;color:#cbb7e0}
.lang-wrap:last-child .page:last-child{page-break-after:auto}`;
const head = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Cormorant+Garamond:wght@600&family=Tajawal:wght@400;500;700&family=Amiri:wght@700&display=swap" rel="stylesheet"><style>${CSS}</style></head><body>`;
const BROWSER = [process.env.CHROME, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => p && fs.existsSync(p));
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'broch-'));
const print = (name, body) => {
  const h = path.join(tmpDir, name + '.html'); fs.writeFileSync(h, head + body + '</body></html>');
  const keep = path.join(ROOT, 'magazines', 'html'); if (fs.existsSync(keep)) fs.copyFileSync(h, path.join(keep, name + '.html'));
  const out = path.join(ROOT, 'assets', name + '.pdf');
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=15000', '--run-all-compositor-stages-before-draw', `--print-to-pdf=${out}`, 'file:///' + h.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log(name + '.pdf', (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
};
for (const l of ['fr', 'ar', 'en']) print('brochure-entreprises-' + l, `<div class="lang-wrap">${pages(l)}</div>`);
print('brochure-entreprises', ['fr', 'ar', 'en'].map(l => `<div class="lang-wrap">${pages(l)}</div>`).join(''));
