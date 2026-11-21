// Entreprises (corporate training) page: programmes, method, quote request → saved in the dashboard + WhatsApp.
(function () {
  'use strict';
  const M = {
    fr: {
      chip: '🏢 Entreprises & organisations', h1: 'Le bien-être de vos équipes, la clé de votre réussite',
      intro: 'Formations et ateliers sur mesure en gestion du stress, intelligence émotionnelle, communication et leadership — dans vos locaux, en ligne ou au centre à Sfax (Tunisie), en arabe, français ou anglais.',
      cta: 'Demander une proposition', cta2: 'Télécharger la brochure (PDF)',
      why_t: 'Pourquoi investir dans le bien-être de vos équipes ?',
      why: [['📉', 'Moins d’absentéisme', 'Le stress chronique et l’épuisement coûtent cher : arrêts, turnover, erreurs. Les prévenir est rentable.'], ['🤝', 'Un meilleur climat', 'Des équipes qui savent communiquer et gérer leurs émotions coopèrent mieux et résolvent les conflits plus vite.'], ['🚀', 'Plus d’engagement', 'Des collaborateurs reconnus et soutenus s’impliquent davantage et restent plus longtemps.'], ['🎯', '100 % sur mesure', 'Chaque intervention part d’un diagnostic de vos besoins, de votre culture et de vos contraintes.']],
      ws_t: 'Ateliers Pro (1 h 30 – 3 h)', ws_s: 'Des formats courts sur les sujets les plus demandés par les entreprises aujourd’hui : idéal pour une pause déjeuner, une semaine QVT ou un séminaire.', ws_g: 'Ateliers Pro', prog_g: 'Programmes', prog_t: 'Nos programmes', prog_s: 'Chaque programme est adapté à votre contexte, à la taille du groupe et au format choisi.',
      dur: 'Durée', aud: 'Public', goals: 'Objectifs', ask: 'Demander ce programme →',
      method_t: 'Notre démarche', method: [['1', 'Diagnostic offert', 'Un échange de 30 minutes avec vos RH ou managers pour comprendre vos enjeux.'], ['2', 'Proposition sur mesure', 'Programme, format, planning et devis détaillé sous 72 h.'], ['3', 'Animation', 'Ateliers interactifs : apports clairs, exercices pratiques, mises en situation.'], ['4', 'Évaluation & suivi', 'Questionnaires, attestations de participation et rapport de synthèse pour les RH.']],
      formats_t: 'Formats', formats: [['🏢', 'Dans vos locaux', 'En Tunisie et à l’international'], ['💻', 'En ligne', 'Zoom, Teams ou Google Meet'], ['🌿', 'Au centre à Sfax (Tunisie)', 'Un cadre calme, hors du bureau'], ['🌍', 'Trilingue', 'Arabe, français, anglais']],
      incl_t: 'Inclus dans chaque intervention', incl: ['Supports pédagogiques PDF pour chaque participant', 'Attestation de participation', 'Évaluation à chaud et à froid', 'Rapport de synthèse pour la direction / les RH', 'Suivi à 30 jours avec le référent'],
      about_t: 'Votre intervenante', about: 'Rawia Ghorbel accompagne particuliers et groupes depuis plus de 8 ans en gestion du stress, développement personnel et bien-être. Ses ateliers allient apports concrets, pratiques simples (respiration, pleine conscience, communication) et une écoute chaleureuse, dans un cadre confidentiel et sans jugement.',
      form_t: 'Demander une proposition', form_s: 'Réponse sous 48 h ouvrées. Le diagnostic de 30 minutes est offert.',
      f_company: 'Entreprise / organisation *', f_name: 'Votre nom *', f_role: 'Fonction', f_email: 'E-mail professionnel *', f_phone: 'Téléphone / WhatsApp *', f_size: 'Nombre de participants', f_prog: 'Programme souhaité', f_format: 'Format', f_period: 'Période souhaitée', f_msg: 'Vos besoins / contexte',
      sizes: ['Moins de 10', '10 – 25', '25 – 50', '50 – 100', 'Plus de 100'], prog_any: 'À définir ensemble', fmt_opts: ['Dans nos locaux', 'En ligne', 'Au centre à Sfax (Tunisie)', 'À définir'],
      send: 'Envoyer ma demande', err: 'Merci de compléter : ', ok: '✓ Merci ! Votre demande est bien reçue. Rawia vous recontacte sous 48 h ouvrées.',
      faq_t: 'Questions fréquentes', faq: [['Quel est le tarif ?', 'Chaque proposition est chiffrée sur mesure selon le nombre de participants, la durée et le format. Le devis est gratuit et sans engagement.'], ['Pouvez-vous intervenir hors de Tunisie ?', 'Oui : en ligne partout dans le monde, et en présentiel sur demande (déplacements à prévoir).'], ['Les échanges restent-ils confidentiels ?', 'Oui. Les rapports RH sont anonymes et aucun contenu personnel des participants n’est partagé.'], ['Est-ce une thérapie ?', 'Non. Ce sont des formations de développement personnel et de prévention ; elles ne remplacent pas un suivi médical ou psychologique.']],
      wa_head: '🏢 Demande entreprise', w_company: 'Entreprise', w_role: 'Fonction', w_email: 'E-mail', w_phone: 'Téléphone', w_size: 'Participants', w_prog: 'Programme', w_format: 'Format', w_period: 'Période', w_msg: 'Besoins'
    },
    ar: {
      chip: '🏢 للشركات والمؤسسات', h1: 'رفاه فريقك… مفتاح نجاح مؤسستك',
      intro: 'تكوينات وورشات حسب الطلب في إدارة الضغط، الذكاء العاطفي، التواصل والقيادة: في مقرّكم أو عن بُعد أو في المركز بتونس (صفاقس)، بالعربية والفرنسية والإنجليزية.',
      cta: 'اطلب عرضاً', cta2: 'حمّل الكتيّب (PDF)',
      why_t: 'لماذا تستثمر في رفاه فريقك؟',
      why: [['📉', 'غيابات أقل', 'يكلّف الضغط المزمن والإرهاق كثيراً: غيابات واستقالات وأخطاء، والوقاية استثمار مربح.'], ['🤝', 'مناخ عمل أفضل', 'الفرق التي تُحسن التواصل وإدارة مشاعرها تتعاون بشكل أفضل وتحلّ النزاعات بسرعة أكبر.'], ['🚀', 'التزام أكبر', 'الموظف الذي يشعر بالدعم يعطي أكثر ويبقى مدة أطول.'], ['🎯', 'حسب الطلب 100 %', 'يبدأ كل تدخّل بتشخيص احتياجاتكم وثقافة مؤسستكم.']],
      ws_t: 'ورشات Pro (من ساعة ونصف إلى 3 ساعات)', ws_s: 'صيغ قصيرة حول المواضيع الأكثر طلباً لدى المؤسسات اليوم: مثالية لاستراحة الغداء أو لأسبوع جودة الحياة في العمل أو لملتقى داخلي.', ws_g: 'ورشات Pro', prog_g: 'البرامج', prog_t: 'برامجنا', prog_s: 'يُكيَّف كل برنامج حسب وضعكم وعدد المشاركين والصيغة التي تختارونها.',
      dur: 'المدة', aud: 'الجمهور', goals: 'الأهداف', ask: 'اطلب هذا البرنامج ←',
      method_t: 'طريقة العمل', method: [['1', 'تشخيص مجاني', 'لقاء 30 دقيقة مع الموارد البشرية أو المديرين لفهم احتياجاتكم.'], ['2', 'عرض حسب الطلب', 'البرنامج، الصيغة، الرزنامة وعرض أسعار مفصّل في 72 ساعة.'], ['3', 'التنشيط', 'ورشات تفاعلية: معلومات واضحة، تمارين تطبيقية ومحاكاة.'], ['4', 'التقييم والمتابعة', 'استبيانات، شهادات حضور وتقرير ملخّص للإدارة.']],
      formats_t: 'الصيغ', formats: [['🏢', 'في مقرّكم', 'في تونس وخارجها'], ['💻', 'عن بُعد', 'Zoom أو Teams أو Google Meet'], ['🌿', 'في المركز بتونس (صفاقس)', 'فضاء هادئ بعيداً عن المكتب'], ['🌍', 'بثلاث لغات', 'العربية والفرنسية والإنجليزية']],
      incl_t: 'مشمول في كل تدخّل', incl: ['محامل بيداغوجية PDF لكل مشارك', 'شهادة حضور', 'تقييم فوري وتقييم بعد مدة', 'تقرير ملخّص للإدارة / الموارد البشرية', 'متابعة بعد 30 يوماً مع المسؤول'],
      about_t: 'المكوّنة', about: 'راوية غربال ترافق الأفراد والمجموعات منذ أكثر من 8 سنوات في إدارة الضغط، التطوير الشخصي والرفاه. ورشاتها تجمع بين معلومات عملية، تمارين بسيطة (التنفّس، اليقظة الذهنية، التواصل) وإصغاء دافئ، في إطار سرّي وبلا أحكام.',
      form_t: 'اطلب عرضاً', form_s: 'نردّ عليكم خلال 48 ساعة عمل. التشخيص (30 دقيقة) مجاني.',
      f_company: 'الشركة / المؤسسة *', f_name: 'الاسم *', f_role: 'الوظيفة', f_email: 'الإيميل المهني *', f_phone: 'الهاتف / واتساب *', f_size: 'عدد المشاركين', f_prog: 'البرنامج المطلوب', f_format: 'الصيغة', f_period: 'الفترة المفضّلة', f_msg: 'احتياجاتكم / السياق',
      sizes: ['أقل من 10', '10 – 25', '25 – 50', '50 – 100', 'أكثر من 100'], prog_any: 'نحدّده معاً', fmt_opts: ['في مقرّنا', 'عن بُعد', 'في المركز بتونس (صفاقس)', 'يُحدَّد لاحقاً'],
      send: 'ابعث الطلب', err: 'الرجاء إكمال: ', ok: '✓ شكراً! وصل طلبكم، وستتواصل معكم راوية خلال 48 ساعة عمل.',
      faq_t: 'أسئلة متكرّرة', faq: [['ما هي التكلفة؟', 'يُحتسب كل عرض حسب عدد المشاركين والمدة والصيغة. عرض الأسعار مجاني ودون التزام.'], ['هل يمكنكم التدخّل خارج تونس؟', 'نعم: عن بُعد في جميع أنحاء العالم، وحضورياً حسب الطلب.'], ['هل تبقى المعطيات سرّية؟', 'نعم. تقارير الموارد البشرية مجهولة الهوية، ولا تُشارَك أي معلومة شخصية عن المشاركين.'], ['هل هذا علاج؟', 'لا. هذه تكوينات في التطوير الشخصي والوقاية، ولا تعوّض المتابعة الطبية أو النفسية.']],
      wa_head: '🏢 طلب شركة', w_company: 'الشركة', w_role: 'الوظيفة', w_email: 'الإيميل', w_phone: 'الهاتف', w_size: 'المشاركون', w_prog: 'البرنامج', w_format: 'الصيغة', w_period: 'الفترة', w_msg: 'الاحتياجات'
    },
    en: {
      chip: '🏢 Companies & organisations', h1: 'Your team’s wellbeing, the key to your success',
      intro: 'Tailor-made training and workshops in stress management, emotional intelligence, communication and leadership — at your premises, online or at our centre in Sfax, Tunisia, in Arabic, French or English.',
      cta: 'Request a proposal', cta2: 'Download the brochure (PDF)',
      why_t: 'Why invest in your team’s wellbeing?',
      why: [['📉', 'Less absenteeism', 'Chronic stress and burnout are costly: sick leave, turnover, mistakes. Prevention pays off.'], ['🤝', 'A better climate', 'Teams who communicate well and manage emotions cooperate better and resolve conflicts faster.'], ['🚀', 'More engagement', 'Supported employees give more and stay longer.'], ['🎯', '100% tailor-made', 'Every intervention starts from a diagnosis of your needs, culture and constraints.']],
      ws_t: 'Pro workshops (1.5 – 3 h)', ws_s: 'Short formats on the topics companies ask for most today: ideal for a lunch break, a wellbeing week or an offsite.', ws_g: 'Pro workshops', prog_g: 'Programmes', prog_t: 'Our programmes', prog_s: 'Each programme is adapted to your context, group size and chosen format.',
      dur: 'Duration', aud: 'Audience', goals: 'Objectives', ask: 'Request this programme →',
      method_t: 'How we work', method: [['1', 'Free diagnosis', 'A 30-minute call with HR or managers to understand your needs.'], ['2', 'Tailored proposal', 'Programme, format, schedule and detailed quote within 72 hours.'], ['3', 'Delivery', 'Interactive workshops: clear content, practical exercises, role plays.'], ['4', 'Evaluation & follow-up', 'Questionnaires, attendance certificates and a summary report for HR.']],
      formats_t: 'Formats', formats: [['🏢', 'At your premises', 'In Tunisia and abroad'], ['💻', 'Online', 'Zoom, Teams or Google Meet'], ['🌿', 'At the centre in Sfax, Tunisia', 'A calm setting away from the office'], ['🌍', 'Trilingual', 'Arabic, French, English']],
      incl_t: 'Included in every intervention', incl: ['PDF learning materials for each participant', 'Certificate of attendance', 'Immediate and follow-up evaluation', 'Summary report for management / HR', '30-day follow-up with your contact person'],
      about_t: 'Your trainer', about: 'Rawia Ghorbel has supported individuals and groups for over 8 years in stress management, personal development and wellbeing. Her workshops combine practical content, simple techniques (breathing, mindfulness, communication) and warm listening, in a confidential, judgment-free setting.',
      form_t: 'Request a proposal', form_s: 'Reply within 2 business days. The 30-minute diagnosis is free.',
      f_company: 'Company / organisation *', f_name: 'Your name *', f_role: 'Job title', f_email: 'Work email *', f_phone: 'Phone / WhatsApp *', f_size: 'Number of participants', f_prog: 'Programme', f_format: 'Format', f_period: 'Preferred period', f_msg: 'Your needs / context',
      sizes: ['Fewer than 10', '10 – 25', '25 – 50', '50 – 100', 'More than 100'], prog_any: 'To define together', fmt_opts: ['At our premises', 'Online', 'At the centre in Sfax, Tunisia', 'To be decided'],
      send: 'Send my request', err: 'Please complete: ', ok: '✓ Thank you! Your request has been received. Rawia will get back to you within 2 business days.',
      faq_t: 'FAQ', faq: [['How much does it cost?', 'Each proposal is priced to fit the number of participants, duration and format. Quotes are free and without obligation.'], ['Can you work outside Tunisia?', 'Yes: online worldwide, and on site on request.'], ['Is everything confidential?', 'Yes. HR reports are anonymous and no personal content from participants is shared.'], ['Is this therapy?', 'No. These are personal development and prevention trainings; they do not replace medical or psychological care.']],
      wa_head: '🏢 Company request', w_company: 'Company', w_role: 'Job title', w_email: 'Email', w_phone: 'Phone', w_size: 'Participants', w_prog: 'Programme', w_format: 'Format', w_period: 'Period', w_msg: 'Needs'
    }
  };
  const $ = s => document.querySelector(s);
  const lg = () => { const l = window.CH ? window.CH.getLang() : 'fr'; return M[l] ? l : 'fr'; };
  const m = k => M[lg()][k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PROGS = (window.CH_B2B && window.CH_B2B.PROGS) || [];
  const WS = (window.CH_B2B && window.CH_B2B.WORKSHOPS) || [];
  const pv = (o) => o[lg()] || o.fr;

  function render() {
    document.querySelectorAll('[data-e]').forEach(el => { const v = m(el.dataset.e); if (typeof v === 'string') el.textContent = v; });
    document.querySelectorAll('[data-ep]').forEach(el => { el.placeholder = m(el.dataset.ep); });
    $('#e-why').innerHTML = m('why').map(([i, t, d]) => `<div class="b2b-why"><span>${i}</span><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('');
    $('#e-progs').innerHTML = PROGS.map(p => `<article class="b2b-prog b2b-c-${esc(p.theme)}" id="prog-${esc(p.id)}">
        <div class="b2b-prog-head"><span class="b2b-ico">${p.icon}</span><h3>${esc(pv(p.t))}</h3></div>
        <dl><dt>${esc(m('dur'))}</dt><dd>${esc(pv(p.dur))}</dd><dt>${esc(m('aud'))}</dt><dd>${esc(pv(p.aud))}</dd></dl>
        <p class="b2b-goals-t">${esc(m('goals'))}</p><ul>${pv(p.goals).map(g => `<li>${esc(g)}</li>`).join('')}</ul>
        <a class="more-link" href="#devis" data-prog="${esc(p.id)}">${esc(m('ask'))}</a></article>`).join('');
    $('#e-ws').innerHTML = WS.map(w => `<article class="b2b-ws"><span class="b2b-ws-ico">${w.icon}</span><div><span class="b2b-ws-dur">⏱ ${esc(pv(w.dur))}</span><h3>${esc(pv(w.t))}</h3><p>${esc(pv(w.d))}</p><a class="more-link" href="#devis" data-prog="ws-${esc(w.id)}">${esc(m('ask'))}</a></div></article>`).join('');
    $('#e-method').innerHTML = m('method').map(([n, t, d]) => `<div class="b2b-step"><span>${n}</span><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('');
    $('#e-formats').innerHTML = m('formats').map(([i, t, d]) => `<div class="b2b-fmt"><span>${i}</span><b>${esc(t)}</b><small>${esc(d)}</small></div>`).join('');
    $('#e-incl').innerHTML = m('incl').map(x => `<li>${esc(x)}</li>`).join('');
    $('#e-faq').innerHTML = m('faq').map(([q, r]) => `<details><summary>${esc(q)}</summary><p>${esc(r)}</p></details>`).join('');
    const f = $('#e-form'), keep = { size: f.size.value, prog: f.prog.value, format: f.format.value };
    f.size.innerHTML = m('sizes').map(s => `<option>${esc(s)}</option>`).join('');
    f.prog.innerHTML = `<option value="">${esc(m('prog_any'))}</option><optgroup label="${esc(m('prog_g'))}">` + PROGS.map(p => `<option value="${esc(p.id)}">${esc(pv(p.t))}</option>`).join('') + `</optgroup><optgroup label="${esc(m('ws_g'))}">` + WS.map(w => `<option value="ws-${esc(w.id)}">${esc(pv(w.t))}</option>`).join('') + '</optgroup>';
    f.format.innerHTML = m('fmt_opts').map(s => `<option>${esc(s)}</option>`).join('');
    if (keep.prog) f.prog.value = keep.prog;
    const portrait = window.CH && window.CH.getData() && (window.CH.getData().settings || {}).portrait;
    if (portrait && /^https?:\/\//.test(portrait)) $('#e-portrait').src = portrait;
  }
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  if (window.CH && window.CH.getData()) render();

  document.addEventListener('click', e => {
    const a = e.target.closest('[data-prog]'); if (!a) return;
    $('#e-form').prog.value = a.dataset.prog;
  });

  $('#e-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, v = n => (f.elements[n].value || '').trim(), err = $('#e-err');
    const miss = [];
    if (!v('company')) miss.push(m('f_company').replace(' *', ''));
    if (!v('name')) miss.push(m('f_name').replace(' *', ''));
    if (!/^\S+@\S+\.\S+$/.test(v('email'))) miss.push(m('f_email').replace(' *', ''));
    if (!v('phone')) miss.push(m('f_phone').replace(' *', ''));
    if (miss.length) { err.textContent = m('err') + miss.join(', '); err.hidden = false; return; }
    err.hidden = true;
    const sel = PROGS.find(p => p.id === v('prog')) || WS.find(w => 'ws-' + w.id === v('prog')); const progName = v('prog') ? pv((sel || { t: { fr: v('prog') } }).t) : m('prog_any');
    const lines = [m('wa_head'), `${m('w_company')}: ${v('company')}`, `👤 ${v('name')}${v('role') ? ' – ' + v('role') : ''}`, `${m('w_email')}: ${v('email')}`, `${m('w_phone')}: ${v('phone')}`,
      `${m('w_size')}: ${v('size')}`, `${m('w_prog')}: ${progName}`, `${m('w_format')}: ${v('format')}`];
    if (v('period')) lines.push(`${m('w_period')}: ${v('period')}`);
    if (v('msg')) lines.push(`${m('w_msg')}: ${v('msg')}`);
    if (window.CH) {
      window.CH.saveOrder({ name: `${v('name')} (${v('company')})`, phone: v('phone'), email: v('email'), total: '',
        note: lines.slice(1).join('\n'), items: [{ type: 'entreprise', id: v('prog') || 'sur-mesure', title: '🏢 ' + v('company') + ' – ' + progName, price: '', option: v('format') }] });
      window.CH.sendWA(lines);
    }
    const ok = $('#e-ok'); ok.textContent = m('ok'); ok.hidden = false; f.reset();
  });
})();
