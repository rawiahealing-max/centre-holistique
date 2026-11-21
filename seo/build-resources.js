// Practical resources for participants (A4 PDF, Modern Standard Arabic) → materials/
//   challenge-21-wofra · kurras-thiqa · kurras-hob-that · kurras-musamaha · kurras-wofra-mal · daftar-imtinan-30 · tuqus-wofra · cheque-wofra-2027
// Run: node seo/build-resources.js [name]
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'materials');
fs.mkdirSync(OUT, { recursive: true });
const BROWSER = [process.env.CHROME, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => p && fs.existsSync(p));
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function seed(r, stroke, op) {
  const c = [[0, 0]].concat([...Array(6)].map((_, i) => [r * Math.cos(i * Math.PI / 3), r * Math.sin(i * Math.PI / 3)]));
  return `<g fill="none" stroke="${stroke}" stroke-width="1.2" opacity="${op}">${c.map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}"/>`).join('')}<circle r="${r * 2}"/><circle r="${r * 2.2}" stroke-dasharray="2 5"/></g>`;
}
function stars(n, w, h, s0) { let s = s0; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280; return [...Array(n)].map(() => `<circle cx="${(r() * w).toFixed(0)}" cy="${(r() * h).toFixed(0)}" r="${(r() * 1.6 + .3).toFixed(1)}" fill="#f0d79a" opacity="${(r() * .7 + .2).toFixed(2)}"/>`).join(''); }
const lines = (n, h = 8.5) => `<div class="lines">${`<i style="height:${h}mm"></i>`.repeat(n)}</div>`;
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Tajawal:wght@400;500;700;800&family=Cormorant+Garamond:wght@600;700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">';
const THEMES = { gold: ['#a8782a', '#5a3c22', '#24152f', '#b8862b'], rose: ['#b0477e', '#5e2a52', '#2a1328', '#b0477e'], violet: ['#6b3f98', '#3b2550', '#1e1128', '#7b4fa8'], green: ['#2f7d62', '#22463f', '#122421', '#2f7d62'], blue: ['#2e6fae', '#1f3c63', '#101d33', '#2e6fae'] };
const CSS = (t) => `@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0}body{font-family:Tajawal,sans-serif;color:#2c2233;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;padding:18mm 17mm 16mm;background:#fffdf8}.page:last-child{page-break-after:auto}
h1,h2,h3{font-family:Amiri,serif;margin:0}.run{position:absolute;top:8mm;left:17mm;right:17mm;display:flex;justify-content:space-between;font-size:8.5pt;color:#a08a5a;border-bottom:1px solid #efe2c4;padding-bottom:2mm}
.foot{position:absolute;bottom:7mm;left:17mm;right:17mm;display:flex;justify-content:space-between;font-size:8pt;color:#a08a5a}
.kicker{display:inline-block;background:${t[3]};color:#fff;border-radius:99px;padding:1mm 4mm;font-size:10pt;font-weight:700;margin:3mm 0 2mm}
h2.t{font-size:23pt;color:#3b2550;margin:1mm 0 2mm}.lead{font-size:11.3pt;line-height:1.85;color:#5a4a63;margin:0 0 3mm}
h3{font-size:13.5pt;color:#5b3483;margin:4mm 0 1.5mm}p{font-size:10.8pt;line-height:1.75;margin:0 0 1.5mm}
.lines i{display:block;border-bottom:1px solid #d9cbe6}.box{border:1.5px solid #e8d9b8;border-radius:4mm;padding:3.5mm 5mm;margin:3mm 0;background:#fffaf0}
.q{font-weight:700;color:#3b2550;font-size:10.8pt;margin:2.5mm 0 .5mm}
table{width:100%;border-collapse:collapse;font-size:9.8pt}td,th{border:1px solid #e3d6ee;padding:2mm;text-align:start;vertical-align:top}th{background:#f6f0fb;color:#3b2550}td{height:12mm}
.aff{font-family:Amiri,serif;font-size:14.5pt;color:#3b2550;text-align:center;line-height:1.8}.note{font-size:8.5pt;color:#8a7d95;line-height:1.6}
.day{border:1.5px solid #eadff2;border-radius:4mm;padding:3mm 4.5mm;margin-bottom:3.5mm;break-inside:avoid}.day .dh{display:flex;justify-content:space-between;align-items:center}
.day .dn{font-family:Amiri,serif;font-size:15pt;color:${t[3]}}.day .chk{border:1.5px solid ${t[3]};border-radius:2mm;width:6mm;height:6mm}.day p{margin:1mm 0;font-size:10.2pt}.day .a{font-family:Amiri,serif;color:#5b3483;font-size:11.5pt}
.track{display:grid;grid-template-columns:repeat(6,1fr);gap:2.2mm}.track div{border:1.5px solid #e3d6ee;border-radius:3mm;height:30mm;padding:1.5mm;font-size:8.5pt;color:#9b8aa8}
.cover{background:radial-gradient(120% 80% at 50% 25%,${t[0]} 0%,${t[1]} 45%,${t[2]} 100%);color:#fff;padding:0}.cover svg{position:absolute;inset:0}
.cover .in{position:absolute;inset:30mm 20mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.cover .k{border:1.5px solid rgba(240,215,154,.7);color:#f0d79a;border-radius:99px;padding:2mm 6mm;font-size:11pt}.cover h1{font-size:40pt;color:#fff;margin-top:8mm;line-height:1.3}
.cover p{color:#efe4fa;font-size:13pt;margin-top:8mm;line-height:1.8}.cover .by{margin-top:16mm;color:#f0d79a;font-size:12pt}`;

function cover(o, t) {
  return `<section class="page cover"><svg viewBox="0 0 794 1123" preserveAspectRatio="none">${stars(130, 794, 1123, o.seed || 7)}<g transform="translate(397,430)">${seed(95, '#f0d79a', .32)}</g></svg>
  <div class="in"><span class="k">✨ ${esc(o.kicker)}</span><h1>${o.title}</h1><p>${o.sub}</p><div class="by">مع راوية غربال · Centre Holistique</div></div></section>`;
}
const run = (title, n) => `<div class="run"><span>${esc(title)}</span><span>راوية غربال</span></div><div class="foot"><span>www.centreholistique.net</span><span>${n}</span></div>`;
// block renderer
function blocks(bs) {
  return bs.map(b => {
    if (b.h) return `<h3>${esc(b.h)}</h3>`;
    if (b.p) return `<p>${b.p}</p>`;
    if (b.q) return `<div class="q">${esc(b.q)}</div>${lines(b.n || 3, b.lh)}`;
    if (b.box) return `<div class="box">${b.box.map(x => `<p>${x}</p>`).join('')}</div>`;
    if (b.table) return `<table><tr>${b.table.map(h => `<th>${esc(h)}</th>`).join('')}</tr>${`<tr>${b.table.map(() => '<td></td>').join('')}</tr>`.repeat(b.rows || 3)}</table>`;
    if (b.aff) return `<div class="aff" style="margin-top:5mm">${b.aff}</div>`;
    if (b.html) return b.html;
    return '';
  }).join('');
}
function book(o) {
  const t = THEMES[o.theme || 'gold'];
  const pages = [cover(o, t)];
  o.pages.forEach((pg, i) => pages.push(`<section class="page">${run(o.short, i + 2)}${pg.kicker ? `<span class="kicker">${esc(pg.kicker)}</span>` : ''}${pg.title ? `<h2 class="t">${esc(pg.title)}</h2>` : ''}${pg.lead ? `<p class="lead">${pg.lead}</p>` : ''}${blocks(pg.b || [])}</section>`));
  return { html: pages.join(''), css: CSS(t) };
}
const DISC = '<p class="note" style="margin-top:5mm">هذا الكرّاس أداة للتطوير الشخصي والتأمل، ولا يعوّض المتابعة الطبية أو النفسية أو المالية.</p>';

// ===================== CONTENT =====================
const BOOKS = {};

// ---- 21-day abundance challenge ----
const DAYS = [
  ['النيّة', 'ما الذي أرغب أن أستقبله في حياتي خلال هذه الأيام الـ21؟', 'اكتب ثلاث نوايا واضحة بصيغة الحاضر.', 'أنا مستعدّ لاستقبال الوفرة بكل أشكالها.'],
  ['الامتنان', 'ما الوفرة الموجودة في حياتي الآن ولا أنتبه إليها؟', 'اكتب عشرة أشياء تشكر الحياة عليها اليوم.', 'الامتنان يفتح لي الأبواب.'],
  ['المساحة', 'ما الذي يثقل بيتي ومساحتي ولم أعد أحتاجه؟', 'تخلّص من ثلاثة أشياء لا تستعملها، أو تبرّع بها.', 'أفسح المجال للجديد.'],
  ['معتقد المال', 'ما الجملة عن المال التي سمعتها كثيراً في طفولتي؟', 'اكتب المعتقد القديم، ثم اكتب بجانبه معتقداً جديداً تختاره.', 'المال طاقة طيبة، وأنا أستقبلها بسلام.'],
  ['الاستحقاق', 'ما الذي يجعلني أستحق حياة وافرة؟', 'اكتب خمس صفات جميلة فيك، وخمسة أشياء قدّمتها للآخرين.', 'أنا أستحق الخير والفرح والوفرة.'],
  ['الاستقبال', 'هل أسمح لنفسي بأن أستقبل، أم أعطي فقط؟', 'اقبل اليوم كل مجاملة أو مساعدة بكلمة «شكراً» فقط، دون رفض.', 'أسمح لنفسي بالاستقبال بسهولة.'],
  ['الكرم', 'ما الذي يمكنني أن أعطيه اليوم دون انتظار مقابل؟', 'قدّم شيئاً صغيراً: وقتاً، أو كلمة طيبة، أو هدية، أو صدقة.', 'العطاء يدور ويعود إليّ مضاعفاً.'],
  ['التأريض', 'هل أشعر بالأمان في جسدي وحياتي؟', 'امشِ حافياً على التراب أو العشب عشر دقائق، أو مارس تمرين الجذور.', 'أنا ثابت وآمن، والوفرة تجد أرضاً صلبة عندي.'],
  ['الجسد', 'يا جسدي، ماذا تحتاج مني اليوم؟', 'استمع لجسدك واستجب لحاجة واحدة: راحة، ماء، حركة، أو طعام مغذٍّ.', 'جسدي شريكي في الوفرة.'],
  ['الوقت', 'أين تتسرّب طاقتي ووقتي دون فائدة؟', 'حدّد عادة واحدة تستنزفك، واستبدلها اليوم بشيء يغذّيك.', 'وقتي ثمين، وأستثمره بوعي.'],
  ['الإبداع', 'ما الذي يمكنني أن أخلقه ولم أتخيّله بعد؟', 'اكتب فكرة واحدة يمكن أن تضيف قيمة أو دخلاً لحياتك، دون حكم عليها.', 'الأفكار الجميلة تتدفّق إليّ بسهولة.'],
  ['الدعم', 'من الأشخاص الذين ساندوني في طريقي؟', 'أرسل رسالة شكر صادقة لشخص دعمك.', 'أنا محاط بالحب والدعم.'],
  ['المسامحة', 'ما الخطأ المالي أو القرار الذي ما زلت ألوم نفسي عليه؟', 'اكتبه، ثم اكتب: «أسامح نفسي، وأتعلّم، وأمضي».', 'أحرّر الماضي، وأستقبل الحاضر.'],
  ['منتصف الطريق', 'ما الذي تغيّر فيّ منذ اليوم الأول؟', 'راجع ملاحظاتك، واحتفل بثلاثة تغييرات صغيرة لاحظتها.', 'أنا أتقدّم بثبات ولطف.'],
  ['قوة السؤال', 'كيف يمكن أن يصبح هذا أفضل؟', 'اطرح هذا السؤال عشر مرات اليوم، مع كل خبر جميل أو صعب.', 'كل سؤال يفتح لي إمكانية جديدة.'],
  ['التصوّر', 'كيف تبدو حياتي حين أعيش الوفرة؟', 'أغمض عينيك خمس دقائق، وعِش المشهد بكل حواسك.', 'أنا أعيش وفرتي الآن.'],
  ['الفرص', 'ما الفرص التي تمرّ أمامي ولا أراها؟', 'لاحظ اليوم ثلاث فرص أو إشارات، ودوّنها.', 'عيناي مفتوحتان على الفرص.'],
  ['الخطوة الجريئة', 'ما الخطوة التي أؤجّلها منذ مدة؟', 'قم اليوم بخطوة واحدة صغيرة نحوها، مهما كانت بسيطة.', 'أتحرّك بثقة نحو أحلامي.'],
  ['الاحتفال', 'ما النجاحات الصغيرة التي لم أحتفل بها؟', 'احتفل بإنجاز واحد: هدية صغيرة لنفسك، أو لحظة فرح.', 'أحتفل بكل خطوة في طريقي.'],
  ['مباركة المال', 'كيف أتعامل مع المال حين يدخل وحين يخرج؟', 'بارك كل مبلغ تستقبله أو تدفعه اليوم بكلمة «شكراً».', 'أبارك المال الذي يدخل ويخرج، فيعود إليّ بوفرة.'],
  ['الختام', 'من أصبحتُ بعد هذه الأيام الـ21؟', 'اكتب رسالة إلى نفسك بعد ستة أشهر، واحتفظ بها.', 'الوفرة أسلوب حياتي.']
];
BOOKS['challenge-21-wofra'] = book({
  theme: 'gold', seed: 11, short: 'تحدّي الوفرة: 21 يوماً', kicker: 'كرّاس التحدّي', title: 'تحدّي الوفرة<br>21 يوماً', sub: 'كل يوم: سؤال، وممارسة، وتأكيد.<br>21 يوماً لتعيد برمجة علاقتك بالوفرة بلطف وثبات.',
  pages: [
    { kicker: 'قبل أن تبدأ', title: 'كيف يعمل التحدّي؟', lead: 'نحتاج إلى وقت لنبني عادة جديدة. خلال 21 يوماً، ستخصّص كل يوم بين 10 و15 دقيقة لنفسك.', b: [
      { box: ['🌅 <b>كل صباح:</b> اقرأ سؤال اليوم وممارسته، وردّد التأكيد ثلاث مرات.', '🌙 <b>كل مساء:</b> دوّن ما لاحظته في سطرين، وضع علامة ✓ في خانة اليوم.', '💬 <b>شارك:</b> اكتب في مجموعة المشاركين ما تعلّمته، فالتجربة الجماعية تقوّي الطاقة.'] },
      { q: 'لماذا أبدأ هذا التحدّي؟', n: 3 }, { q: 'ما الذي أتمنى أن يتغيّر بعد 21 يوماً؟', n: 3 }, { aff: '«أنا ألتزم بنفسي، يوماً بعد يوم.»' }] },
    ...[0, 1, 2, 3, 4, 5, 6].map(w => ({ kicker: `الأيام ${w * 3 + 1} – ${w * 3 + 3}`, b: [{ html: DAYS.slice(w * 3, w * 3 + 3).map(([th, q, pr, af], j) => `<div class="day"><div class="dh"><span class="dn">اليوم ${w * 3 + j + 1}: ${esc(th)}</span><span class="chk"></span></div><p><b>السؤال:</b> ${esc(q)}</p><p><b>الممارسة:</b> ${esc(pr)}</p><p class="a">«${esc(af)}»</p>${lines(2, 7)}</div>`).join('') }] })),
    { kicker: 'متابعة', title: 'لوحة الأيام الـ21', lead: 'ضع علامة ✓ أو رسماً صغيراً في كل يوم أكملته.', b: [{ html: `<div class="track">${[...Array(21)].map((_, i) => `<div>اليوم ${i + 1}</div>`).join('')}</div>` }, { q: 'ما الذي تغيّر في داخلي وفي حياتي؟', n: 5 }, { aff: '«الوفرة أسلوب حياتي.»' }, { html: DISC }] }
  ]
});

// ---- self-confidence ----
BOOKS['kurras-thiqa'] = book({
  theme: 'violet', seed: 3, short: 'كرّاس الثقة بالنفس', kicker: 'كرّاس عملي', title: 'كرّاس<br>الثقة بالنفس', sub: 'أسئلة وتمارين لتتعرّف على قوتك،<br>وتتحرّر من الصوت الذي يقول «لا تستطيع».',
  pages: [
    { kicker: 'الخطوة 1', title: 'أين أنا الآن؟', lead: 'قيّم ثقتك بنفسك من 1 إلى 10 في كل مجال، بصدق ودون حكم.', b: [{ table: ['المجال', 'من 1 إلى 10', 'لماذا هذا الرقم؟'], rows: 6 }, { q: 'في أي موقف أفقد ثقتي بنفسي أكثر؟', n: 3 }] },
    { kicker: 'الخطوة 2', title: 'الصوت الناقد في داخلي', lead: 'لكل منّا صوت داخلي ينتقد ويقارن. حين نكتبه، نراه على حقيقته: مجرد فكرة، لا حقيقة.', b: [{ table: ['ما يقوله الصوت الناقد', 'من قالها لي أول مرة؟', 'ما الحقيقة الألطف؟'], rows: 5 }, { q: 'لو كان صديقي المقرّب مكاني، ماذا كنت سأقول له؟', n: 3 }] },
    { kicker: 'الخطوة 3', title: 'دفتر نجاحاتي', lead: 'الثقة تُبنى على الأدلّة. اكتب نجاحات حياتك، كبيرة كانت أو صغيرة.', b: [{ q: 'عشرة أشياء نجحت فيها في حياتي:', n: 6, lh: 8 }, { q: 'صعوبة تجاوزتها، وماذا تعلّمت منها:', n: 3 }, { q: 'ما الذي يقوله عنّي الناس الذين يحبونني؟', n: 2 }] },
    { kicker: 'الخطوة 4', title: 'تمارين يومية', b: [{ box: ['🪞 <b>المرآة:</b> كل صباح، انظر في عينيك وقل: «أنا قادر، وأثق بنفسي».', '🧍 <b>وضعية القوة:</b> قف مستقيماً، وكتفاك إلى الخلف، دقيقتين قبل أي موقف صعب.', '🗣️ <b>كلمة «لا»:</b> قل «لا» مرة واحدة اليوم لشيء لا تريده، بلطف ووضوح.', '🎯 <b>خطوة خارج الراحة:</b> افعل كل يوم شيئاً صغيراً يخيفك قليلاً.'] }, { q: 'الخطوة الجريئة التي سأقوم بها هذا الأسبوع:', n: 2 }, { q: 'ما الذي شعرت به بعد أن فعلتها؟', n: 3 }] },
    { kicker: 'الختام', title: 'تأكيدات الثقة', b: [{ aff: '«أنا أستحق أن أُرى وأن أُسمع.»<br>«أثق بقدرتي على التعلّم والنمو.»<br>«أخطائي دروس، لا أحكام.»<br>«صوتي مهم، وحضوري قيمة.»' }, { q: 'تأكيدي الشخصي الذي سأردّده كل يوم:', n: 2 }, { html: DISC }] }
  ]
});

// ---- self-love ----
BOOKS['kurras-hob-that'] = book({
  theme: 'rose', seed: 5, short: 'كرّاس حب الذات', kicker: 'كرّاس عملي', title: 'كرّاس<br>حب الذات', sub: 'أن تعامل نفسك كما تعامل من تحب:<br>بلطف، وصبر، واحترام.',
  pages: [
    { kicker: 'الخطوة 1', title: 'علاقتي بنفسي', lead: 'أجب بصدق، فهذه الأسئلة بداية المصالحة.', b: [{ q: 'كيف أتحدّث إلى نفسي حين أخطئ؟', n: 3 }, { q: 'متى كانت آخر مرة فعلت فيها شيئاً لنفسي فقط؟', n: 2 }, { q: 'ما الذي أحبه في نفسي؟ (عشرة أشياء على الأقل)', n: 5 }] },
    { kicker: 'الخطوة 2', title: 'رسالة إلى طفلي الداخلي', lead: 'ابحث عن صورة لك وأنت طفل، وانظر إليها دقيقة، ثم اكتب له ما كان يحتاج أن يسمعه.', b: [{ box: ['عزيزي/عزيزتي الصغير(ة)،'] }, { html: lines(11, 8.5) }, { p: '«أنا هنا الآن من أجلك، ولن أتركك.»' }] },
    { kicker: 'الخطوة 3', title: 'حدودي الصحية', lead: 'حب الذات يعني أن تحمي طاقتك. الحدود ليست قسوة، بل احترام.', b: [{ table: ['موقف يستنزفني', 'الحدّ الذي أحتاج أن أضعه', 'الجملة التي سأقولها'], rows: 4 }, { q: 'ما الذي أخاف منه حين أضع حدوداً؟', n: 2 }] },
    { kicker: 'الخطوة 4', title: 'طقوس العناية بالنفس', lead: 'اختر ما يناسبك، والتزم بثلاثة على الأقل هذا الأسبوع.', b: [{ box: ['🛁 حمّام دافئ مع ملح وزيت عطري', '📵 ساعة بلا هاتف قبل النوم', '🚶 مشي في الطبيعة دون هدف', '📖 قراءة كتاب يغذّي روحك', '🕯️ شمعة وردية وتأمل على القلب', '🍵 مشروب دافئ تشربه ببطء وحضور'] }, { q: 'طقوسي الثلاثة هذا الأسبوع:', n: 3 }] },
    { kicker: 'الختام', title: 'عهد الحب مع نفسي', b: [{ box: ['أنا ...................................... أعدُ نفسي بأن:', '• أتحدّث إلى نفسي بلطف.', '• أحترم احتياجاتي وحدودي.', '• أسامح نفسي حين أخطئ.', '• أحتفل بنفسي كما أنا.', 'التوقيع: ........................ التاريخ: ..............'] }, { aff: '«أنا أحب نفسي وأقبلها كما هي.»' }, { html: DISC }] }
  ]
});

// ---- forgiveness ----
BOOKS['kurras-musamaha'] = book({
  theme: 'blue', seed: 9, short: 'كرّاس المسامحة', kicker: 'كرّاس عملي', title: 'كرّاس المسامحة<br>وتحرير المشاعر', sub: 'المسامحة لا تعني أن ما حدث كان مقبولاً،<br>بل تعني أنك لم تعد تحمل ثقله.',
  pages: [
    { kicker: 'الخطوة 1', title: 'ما الذي ما زلت أحمله؟', lead: 'اكتب الأشخاص والمواقف التي ما زالت تثير فيك ألماً أو غضباً.', b: [{ table: ['الشخص أو الموقف', 'الشعور الذي يثيره', 'شدّته من 1 إلى 10'], rows: 5 }, { q: 'كيف يؤثّر هذا الثقل على جسدي وحياتي اليوم؟', n: 3 }] },
    { kicker: 'الخطوة 2', title: 'رسالة لن تُرسل', lead: 'اختر موقفاً واحداً، واكتب للشخص كل ما لم تقله. عبّر بحرية تامة، فلن يقرأها أحد.', b: [{ html: lines(13, 8.5) }] },
    { kicker: 'الخطوة 3', title: 'تحويل الألم إلى درس', b: [{ q: 'ما الذي تعلّمته من هذه التجربة عن نفسي؟', n: 3 }, { q: 'ما الحدّ الذي أحتاج أن أضعه حتى لا يتكرّر الأمر؟', n: 3 }, { q: 'هل هناك ما أحتاج أن أسامح نفسي عليه في هذه القصة؟', n: 3 }] },
    { kicker: 'الخطوة 4', title: 'طقس التحرّر', b: [{ box: ['🕯️ أشعل شمعة بيضاء، واقرأ رسالتك بصوت عالٍ.', '🤲 ضع يديك على قلبك وقل: «أحرّر نفسي من هذا الثقل، وأختار سلامي».', '🔥 مزّق الرسالة أو احرقها بأمان، وتخيّل الثقل يغادر جسدك مع الدخان.', '💧 اشرب كأس ماء ببطء، وكأنك تستقبل بداية جديدة.'] }, { q: 'ما الذي شعرت به بعد الطقس؟', n: 4 }, { aff: '«أسامح لأحرّر نفسي، لا لأبرّر ما حدث.»' }, { html: DISC }] }
  ]
});

// ---- abundance & money ----
BOOKS['kurras-wofra-mal'] = book({
  theme: 'green', seed: 13, short: 'كرّاس الوفرة والمال', kicker: 'كرّاس عملي', title: 'كرّاس الوفرة<br>والعلاقة بالمال', sub: 'افهم قصتك مع المال،<br>وحوّل معتقداتك، وافتح باب الوفرة بوعي.',
  pages: [
    { kicker: 'الخطوة 1', title: 'قصتي مع المال', b: [{ q: 'ماذا كان يقال عن المال في بيت طفولتي؟', n: 3 }, { q: 'ما أول ذكرى لي مع المال؟ وبماذا شعرت؟', n: 3 }, { q: 'إن كان المال شخصاً، كيف أصف علاقتي به؟', n: 3 }] },
    { kicker: 'الخطوة 2', title: 'تحويل المعتقدات', lead: 'أكمل كل جملة بأول ما يخطر لك، ثم اكتب معتقداً جديداً يخدمك.', b: [{ table: ['الجملة', 'ما يخطر لي', 'المعتقد الجديد'], rows: 1 }, { html: `<table>${['المال هو…', 'الأغنياء…', 'لكي أكسب المال يجب أن…', 'لو كان معي مال كثير…', 'أنا والمال…'].map(x => `<tr><td style="width:30%">${x}</td><td></td><td></td></tr>`).join('')}</table>` }] },
    { kicker: 'الخطوة 3', title: 'خريطة وفرتي', lead: 'الوفرة ليست مالاً فقط. لاحظ ما لديك الآن.', b: [{ table: ['المجال', 'ما لديّ الآن', 'ما أرغب فيه'], rows: 6 }] },
    { kicker: 'الخطوة 4', title: 'أفعال الوفرة', b: [{ box: ['💚 خصّص مبلغاً صغيراً كل شهر لنفسك، مهما كان بسيطاً، كإشارة احترام.', '🧾 راجع مصاريفك دون خوف أو لوم، بل بفضول.', '🙏 بارك كل مبلغ يدخل أو يخرج.', '🎁 اجعل للعطاء نصيباً ثابتاً.', '❓ اسأل كل يوم: «ما الذي يلزم لتأتيني الوفرة بسهولة وفرح؟»'] }, { q: 'ثلاثة أفعال سأبدأ بها هذا الشهر:', n: 3 }, { aff: '«المال يتدفّق إليّ بسهولة، وأنا أستقبله بامتنان.»' }, { html: DISC }] }
  ]
});

// ---- gratitude 30 days ----
const gratDays = [...Array(30)].map((_, i) => `<div class="day" style="padding:2.5mm 4mm;margin-bottom:2.5mm"><div class="dh"><span class="dn" style="font-size:12.5pt">اليوم ${i + 1}</span><span class="chk"></span></div><p style="font-size:9.5pt;color:#7a6a85">ثلاثة أشياء أشكر الحياة عليها اليوم:</p>${lines(3, 6.5)}</div>`);
BOOKS['daftar-imtinan-30'] = book({
  theme: 'gold', seed: 17, short: 'دفتر الامتنان: 30 يوماً', kicker: 'دفتر يومي', title: 'دفتر الامتنان<br>30 يوماً', sub: 'ثلاثة أسطر كل مساء،<br>تغيّر الطريقة التي ترى بها حياتك.',
  pages: [
    { kicker: 'قبل أن تبدأ', title: 'لماذا الامتنان؟', lead: 'حين نلاحظ ما لدينا بدل ما ينقصنا، يهدأ الجسد ويتّسع القلب. اكتب كل مساء ثلاثة أشياء صغيرة وحقيقية.', b: [{ box: ['✍️ كن دقيقاً: «ضحكة أختي على الهاتف» أفضل من «عائلتي».', '🌙 اكتب قبل النوم، ودع آخر أفكارك تكون عن النعم.', '🔁 لا تقلق إن فاتك يوم، عُد في اليوم التالي بلطف.'] }, { aff: '«الامتنان يحوّل ما لديّ إلى ما يكفيني، وأكثر.»' }] },
    ...[0, 1, 2, 3, 4].map(w => ({ kicker: `الأيام ${w * 6 + 1} – ${w * 6 + 6}`, b: [{ html: gratDays.slice(w * 6, w * 6 + 6).join('') }] })),
    { kicker: 'الختام', title: 'بعد 30 يوماً', b: [{ q: 'ما الذي لاحظته في نفسي وفي حياتي؟', n: 5 }, { q: 'أكثر شيء أشعر بالامتنان له اليوم:', n: 3 }, { html: DISC }] }
  ]
});

// ---- rituals booklet ----
const ritual = (t, when, need, steps, tip) => ({ html: `<div class="box" style="background:#fff"><h3 style="margin-top:0">${t}</h3><p style="color:#8a5a12"><b>🗓️ التوقيت:</b> ${when}</p><p><b>🧺 ما تحتاجه:</b> ${need}</p>${steps.map((s, i) => `<p>${i + 1}. ${s}</p>`).join('')}${tip ? `<p class="note">💡 ${tip}</p>` : ''}</div>` });
BOOKS['tuqus-wofra'] = book({
  theme: 'gold', seed: 21, short: 'طقوس الوفرة والمال والنجاح والشهرة', kicker: 'كتيّب الطقوس', title: 'طقوس الوفرة<br>والمال والنجاح والظهور', sub: 'طقوس بسيطة لوضع النيّة بوعي،<br>واستقبال الوفرة والنجاح في حياتك.',
  pages: [
    { kicker: 'قبل أن تبدأ', title: 'كيف تمارس الطقوس؟', lead: 'الطقس لحظة وعي تضع فيها نيّتك بوضوح، وتربط فكرك بقلبك وفعلك. قوته في حضورك وصدقك، لا في الأدوات.', b: [{ box: ['🧘 ابدأ دائماً بثلاثة أنفاس عميقة، ونظّف المكان بفتح النافذة أو بالبخور.', '✍️ اكتب نيّتك بصيغة الحاضر وبالإيجاب: «أنا أستقبل…».', '🕯️ لا تترك الشموع مشتعلة دون مراقبة أبداً، وأطفئها بلطف.', '🚶 اختم كل طقس بخطوة عملية صغيرة نحو نيّتك.'] }, { html: '<p class="note">هذه الطقوس ممارسات رمزية للتأمل ووضع النيّة، ولا تضمن نتائج مالية أو مهنية بعينها.</p>' }] },
    { kicker: 'الوفرة', title: 'طقوس الوفرة', b: [
      ritual('🌑 طقس نوايا القمر الجديد', 'ليلة القمر الجديد', 'شمعة بيضاء أو ذهبية، ورقة وقلم', ['أشعل الشمعة، واكتب ثلاث نوايا لهذا الشهر.', 'اقرأها ثلاث مرات بصوت هادئ، وتخيّلها تتحقّق.', 'احتفظ بالورقة حتى القمر الجديد التالي، ثم راجع ما تحقّق.']),
      ritual('💚 طقس الشمعة الخضراء', 'الخميس أو الأحد مساءً', 'شمعة خضراء، عود قرفة، حجر الأفنتورين', ['ضع الحجر والقرفة بجانب الشمعة، ونيّتك مكتوبة تحتها.', 'أشعل الشمعة وقل: «أنا أفتح قلبي وحياتي للوفرة بكل أشكالها».', 'أعد إشعالها بضع دقائق كل يوم لمدة سبعة أيام.'])] },
    { kicker: 'المال', title: 'طقوس المال', b: [
      ritual('🌿 ورقة الغار والأمنية', 'أول أيام الشهر', 'ورقة غار يابسة، قلم', ['اكتب على ورقة الغار كلمة واحدة تمثّل رغبتك المالية.', 'امسكها بين يديك، وتنفّس، وتخيّل الرغبة تتحقّق.', 'ضعها في محفظتك طوال الشهر، ثم أعدها إلى الطبيعة بامتنان.']),
      ritual('🥣 وعاء الوفرة', 'يُحضَّر مرة ويُعتنى به كل أسبوع', 'وعاء جميل، عملات، حبوب أرز، حجر السترين', ['ضع في الوعاء العملات والأرز والحجر.', 'أضف كل أسبوع عملة صغيرة وأنت تقول «شكراً للوفرة».', 'ضعه في مكان نظيف من البيت، بعيداً عن الفوضى.'], 'شيك الوفرة المرفق مع الكرّاسات طقس ممتاز لليلة القمر الجديد.')] },
    { kicker: 'النجاح', title: 'طقوس النجاح', b: [
      ritual('🌞 طقس صباح النجاح', 'كل صباح قبل العمل', 'كأس ماء، حجر السترين', ['اشرب الماء ببطء، وقل: «أنا مستعدّ ليوم ناجح».', 'امسك الحجر، واكتب الأولويات الثلاث لليوم.', 'ضع الحجر على مكتبك ليذكّرك بنيّتك طوال اليوم.']),
      ritual('🔑 طقس الخطوة الأولى', 'قبل بداية أي مشروع جديد', 'شمعة برتقالية، ورقة', ['اكتب مشروعك وسبب أهميته لك.', 'أشعل الشمعة، وتخيّل المشروع ناجحاً ومكتملاً.', 'قم في الساعة نفسها بأول فعل عملي، مهما كان صغيراً.'])] },
    { kicker: 'الظهور والشهرة', title: 'طقوس الظهور والإشعاع', lead: 'الظهور لا يعني الأنا، بل أن تسمح لرسالتك بأن تصل إلى من يحتاجها.', b: [
      ritual('🌻 طقس الإشعاع', 'الأحد (يوم الشمس) صباحاً', 'شمعة صفراء أو ذهبية، زهرة أو صورة عبّاد الشمس', ['أشعل الشمعة، وقف أمامها مستقيماً وكتفاك إلى الخلف.', 'قل بصوت واضح: «أسمح لنوري بأن يُرى، ولصوتي بأن يُسمع».', 'انشر في اليوم نفسه شيئاً يعبّر عنك: فكرة، أو صورة، أو فيديو.']),
      ritual('🔵 طقس الصوت والتعبير', 'قبل كل ظهور أو بثّ مباشر', 'كأس ماء دافئ، حجر أزرق (لابيس لازولي أو أكوامارين)', ['ضع الحجر على حلقك، وتنفّس بعمق خمس مرات.', 'همهم بصوت منخفض دقيقة واحدة لتهدئة الحلق.', 'قل: «كلماتي صادقة، وتصل إلى القلوب».'])] },
    { kicker: 'الختام', title: 'تقويم الطقوس', b: [{ table: ['الطقس', 'الموعد الذي اخترته', 'ما لاحظته'], rows: 6 }, { aff: '«أنا أستقبل الوفرة والنجاح بقلب مفتوح ونيّة واضحة.»' }] }
  ]
});

// ---- abundance cheque ----
const chequeCSS = `.chq-page{display:flex;flex-direction:column;justify-content:center;gap:7mm;background:#fff}.cut{text-align:center;color:#bbb;font-size:9pt;letter-spacing:.1em}
.chq{position:relative;height:95mm;border-radius:5mm;overflow:hidden;background:linear-gradient(135deg,#fffaf0,#f7ecd2);border:2px solid #d9b56a;color:#3b2550}
.chq svg{position:absolute;inset:0;width:100%;height:100%}.chq .in{position:absolute;inset:7mm 10mm;display:flex;flex-direction:column;gap:3.2mm}
.chq .top{display:flex;justify-content:space-between;align-items:center}.chq .bank{font-family:Amiri,serif;font-size:17pt;color:#5a3c22}.chq .no{font-size:9pt;color:#8a5a12}
.chq .row{display:flex;gap:3mm;align-items:flex-end;font-size:11pt}.chq .row i{flex:1;border-bottom:1.3px dashed #b8862b;height:6mm}
.chq .amt{display:flex;gap:4mm;align-items:center}.chq .amt .bx{border:1.8px solid #b8862b;border-radius:2.5mm;padding:1.5mm 5mm;min-width:45mm;height:10mm;background:#fff}
.chq .seal{position:absolute;bottom:7mm;inset-inline-start:10mm;width:30mm;height:30mm;border-radius:50%;border:2px solid #b8862b;display:grid;place-items:center;text-align:center;font-size:7.5pt;color:#8a5a12;line-height:1.3;transform:rotate(-12deg);background:rgba(255,255,255,.6)}
.chq .sig{position:absolute;bottom:8mm;inset-inline-end:12mm;text-align:center;font-size:9pt;color:#5a3c22}.chq .sig b{display:block;font-family:Amiri,serif;font-size:14pt}
.fr .bank{font-family:'Cormorant Garamond',serif}`;
const cheque = (l) => {
  const T = l === 'ar' ? { dir: 'rtl', bank: '🏛️ بنك الكون للوفرة', no: 'شيك رقم 2027', pay: 'ادفعوا لأمر', sum: 'مبلغ', words: 'بالحروف', date: 'تاريخ القمر الجديد', paid: 'مدفوع بالكامل', from: 'قانون الوفرة', seal: '✨<br>مشحون بطاقة<br>الريكي<br>راوية غربال' }
    : { dir: 'ltr', bank: '🏛️ Banque de l’Abondance Universelle', no: 'Chèque n° 2027', pay: 'Payez à l’ordre de', sum: 'Montant', words: 'En toutes lettres', date: 'Date de la Nouvelle Lune', paid: 'Payé intégralement', from: 'La Loi de l’Abondance', seal: '✨<br>Chargé en<br>énergie Reiki<br>Rawia Ghorbel' };
  return `<div class="chq ${l}" dir="${T.dir}"><svg viewBox="0 0 600 360" preserveAspectRatio="none"><g transform="translate(${T.dir === 'rtl' ? 90 : 510},180)">${seed(45, '#d9b56a', .25)}</g></svg><div class="in">
    <div class="top"><span class="bank">${T.bank}</span><span class="no">${T.no}</span></div>
    <div class="row">${T.pay}: <i></i></div>
    <div class="amt"><span>${T.sum}:</span><span class="bx"></span><span style="font-size:10pt;color:#8a5a12">✓ ${T.paid}</span></div>
    <div class="row">${T.words}: <i></i></div><div class="row">${T.date}: <i style="max-width:60mm"></i></div></div>
    <div class="seal">${T.seal}</div><div class="sig">${l === 'ar' ? 'التوقيع' : 'Signature'}<b>${T.from}</b></div></div>`;
};
const chequeBook = () => {
  const t = THEMES.gold;
  const intro = `<section class="page">${run('شيك الوفرة لعام 2027', 1)}<span class="kicker">طقس القمر الجديد</span><h2 class="t">شيك الوفرة لعام 2027</h2>
  <p class="lead">شيك الوفرة طقس رمزي قديم يُمارَس في ليلة القمر الجديد: تكتب لنفسك مبلغاً تحتاجه أو ترغب فيه، وكأن الكون قد دفعه لك بالفعل. هذا الشيك شحنته راوية غربال بطاقة الريكي ونيّة الوفرة لكل من يملؤه.</p>
  <div class="box"><p>1. اطبع الشيك، وانتظر ليلة القمر الجديد (أو أول القمر الجديد بعد استلامه).</p><p>2. اكتب اسمك الكامل في خانة «ادفعوا لأمر».</p><p>3. اكتب مبلغاً محدّداً وواقعياً بالأرقام والحروف، أو اكتب «مبلغ كافٍ لـ…» مع هدفك.</p><p>4. اكتب تاريخ القمر الجديد، ووقّع أسفل الشيك بعبارة «شكراً».</p><p>5. احتفظ به في محفظتك أو في مكان مقدّس في بيتك، واقرأه ليلة البدر.</p><p>6. حين تتحقّق رغبتك، اشكر واكتب شيكاً جديداً بنيّة جديدة.</p></div>
  <p class="note">طقس رمزي للتأمل ووضع النيّة، ولا يحمل أي قيمة مالية، ولا يضمن نتيجة مالية بعينها.</p></section>`;
  return { html: intro + `<section class="page chq-page">${cheque('ar')}<div class="cut">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>${cheque('ar')}</section><section class="page chq-page">${cheque('fr')}<div class="cut">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>${cheque('fr')}</section>`, css: CSS(t) + chequeCSS };
};
BOOKS['cheque-wofra-2027'] = chequeBook();

// ===================== PRINT =====================
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'res-'));
const only = process.argv[2];
for (const [name, b] of Object.entries(BOOKS)) {
  if (only && name !== only) continue;
  const h = path.join(tmp, name + '.html');
  fs.writeFileSync(h, `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">${FONTS}<style>${b.css}</style></head><body>${b.html}</body></html>`);
  const keep = path.join(ROOT, 'magazines', 'html'); if (fs.existsSync(keep)) fs.copyFileSync(h, path.join(keep, 'res-' + name + '.html'));
  const out = path.join(OUT, name + '.pdf');
  execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=15000', '--run-all-compositor-stages-before-draw', `--print-to-pdf=${out}`, 'file:///' + h.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log(name + '.pdf', (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
}
