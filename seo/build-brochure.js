// Corporate brochure (French, A4) → assets/brochure-entreprises.pdf, from assets/entreprises-data.js
// Run: node seo/build-brochure.js
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const { PROGS } = require('../assets/entreprises-data.js');
const ROOT = path.join(__dirname, '..');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const PORTRAIT = 'https://mhhzppszrqzjktqlgqag.supabase.co/storage/v1/object/public/public/images/mwmkvanl-whatsapp-image-2026-11-18-at-21-29-12.jpeg';
const COL = { green: '#2f7d62', blue: '#2e6fae', violet: '#7b4fa8', indigo: '#4b4fb8', gold: '#b8862b', rose: '#b0477e' };
const prog = p => `<div class="prog" style="border-top-color:${COL[p.theme] || '#7b4fa8'}"><h3>${p.icon} ${esc(p.t.fr)}</h3>
  <p class="meta"><b>Durée :</b> ${esc(p.dur.fr)}<br><b>Public :</b> ${esc(p.aud.fr)}</p><ul>${p.goals.fr.map(g => `<li>${esc(g)}</li>`).join('')}</ul></div>`;
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Cormorant+Garamond:wght@600&display=swap" rel="stylesheet">
<style>@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font-family:Jost,sans-serif;color:#2c2233;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;padding:16mm 15mm;position:relative;page-break-after:always;overflow:hidden}.page:last-child{page-break-after:auto}
.cover{background:linear-gradient(140deg,#1c2a3f,#2b2a5e 45%,#5b3483);color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.brand{letter-spacing:.3em;color:#f0d79a;font-size:10pt}.cover h1{font-family:'Cormorant Garamond',serif;font-size:40pt;line-height:1.1;margin:0 0 6mm}
.cover p{font-size:13pt;line-height:1.6;color:#e5dcf3;max-width:150mm}.tags{display:flex;flex-wrap:wrap;gap:3mm;margin-top:8mm}.tags span{border:1px solid rgba(240,215,154,.6);color:#f0d79a;border-radius:99px;padding:1.5mm 4mm;font-size:10pt}
.foot{font-size:9.5pt;color:#cbb7e0}h2{font-family:'Cormorant Garamond',serif;font-size:24pt;color:#3b2550;margin:0 0 5mm}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:5mm}.prog{border:1px solid #e6dcef;border-top:4px solid;border-radius:4mm;padding:4mm 5mm}
.prog h3{font-size:11.5pt;margin:0 0 2mm;color:#2c2233}.meta{font-size:9pt;color:#5c5266;margin:0 0 2mm;line-height:1.5}.prog ul{margin:0;padding-left:4.5mm;font-size:9.2pt;line-height:1.5}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-bottom:8mm}.step{background:#f6f0fb;border-radius:4mm;padding:4mm}.step b{display:block;color:#5b3483;margin:1mm 0}.step span{display:inline-grid;place-items:center;width:8mm;height:8mm;border-radius:50%;background:#7b4fa8;color:#fff;font-weight:700}.step p{font-size:9pt;margin:0;color:#5c5266;line-height:1.5}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}.two ul{padding-left:5mm;line-height:1.8;font-size:10.5pt}
.about{display:flex;gap:6mm;align-items:center;background:#fbf6ec;border-radius:4mm;padding:5mm;margin:8mm 0}.about img{width:32mm;height:32mm;border-radius:50%;object-fit:cover;border:2px solid #d9b56a}.about p{margin:0;font-size:10pt;line-height:1.7}
.contact{background:#3b2550;color:#fff;border-radius:4mm;padding:6mm;text-align:center;font-size:11.5pt;line-height:1.9}.contact b{color:#f0d79a}</style></head><body>
<section class="page cover"><div class="brand">CENTRE HOLISTIQUE · RAWIA GHORBEL</div>
<div><h1>Formations bien-être<br>pour les entreprises</h1><p>Des équipes plus sereines, plus soudées et plus performantes : programmes sur mesure en gestion du stress, intelligence émotionnelle, communication et leadership.</p>
<div class="tags"><span>Présentiel en Tunisie & à l’international</span><span>En ligne</span><span>Arabe · Français · Anglais</span><span>Diagnostic offert</span></div></div>
<div class="foot">www.centreholistique.net/entreprises.html · +216 26 660 344</div></section>
<section class="page"><h2>Nos programmes</h2><div class="grid">${PROGS.slice(0, 6).map(prog).join('')}</div></section>
<section class="page"><div class="grid" style="margin-bottom:8mm">${PROGS.slice(6).map(prog).join('')}</div>
<h2>Notre démarche</h2><div class="steps">
<div class="step"><span>1</span><b>Diagnostic offert</b><p>30 minutes avec vos RH ou managers.</p></div>
<div class="step"><span>2</span><b>Proposition sur mesure</b><p>Programme, format et devis sous 72 h.</p></div>
<div class="step"><span>3</span><b>Animation</b><p>Ateliers interactifs et pratiques.</p></div>
<div class="step"><span>4</span><b>Évaluation & suivi</b><p>Attestations et rapport RH.</p></div></div>
<div class="two"><div><h3>Inclus</h3><ul><li>Supports PDF pour chaque participant</li><li>Attestation de participation</li><li>Évaluation à chaud et à froid</li><li>Rapport de synthèse anonyme pour les RH</li><li>Suivi à 30 jours</li></ul></div>
<div><h3>Formats</h3><ul><li>Dans vos locaux</li><li>En ligne (Zoom, Teams, Meet)</li><li>Au centre à Sfax</li><li>Arabe, français ou anglais</li></ul></div></div>
<div class="about"><img src="${PORTRAIT}" alt=""><p><b>Rawia Ghorbel</b> accompagne particuliers et groupes depuis plus de 8 ans en gestion du stress, développement personnel et bien-être, avec des pratiques simples et concrètes, dans un cadre confidentiel et sans jugement.</p></div>
<div class="contact"><b>Demandez votre proposition sur mesure</b><br>www.centreholistique.net/entreprises.html · WhatsApp +216 26 660 344<br><span style="font-size:9pt;color:#cbb7e0">Formations de développement personnel et de prévention ; elles ne remplacent pas un suivi médical ou psychologique.</span></div></section>
</body></html>`;
const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'broch-')), 'b.html'); fs.writeFileSync(tmp, html);
const BROWSER = [process.env.CHROME, 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'].find(p => p && fs.existsSync(p));
const out = path.join(ROOT, 'assets', 'brochure-entreprises.pdf');
execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=15000', '--run-all-compositor-stages-before-draw', `--print-to-pdf=${out}`, 'file:///' + tmp.replace(/\\/g, '/')], { stdio: 'ignore' });
console.log('brochure', (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
