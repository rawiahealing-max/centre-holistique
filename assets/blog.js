// Blog: list page (blog.html), single article fallback (blog.html?a=slug) and "latest articles" on the home page.
(function () {
  'use strict';
  const B = window.BLOG; if (!B) return;
  const M = {
    ar: { chip: '📝 المدونة', h1: 'مقالات للروح والطاقة', intro: 'نصائح، تأملات وتجارب حول الريكي، الثيتا هيلينغ، التاروت، الطاقة والتشافي الداخلي — بقلم راوية غربال.', all: 'الكل', read: 'اقرأ المقال ←', min: 'دقائق قراءة', empty: 'مقالات جديدة قريباً ✨', back: '→ كل المقالات', latest: 'من المدونة', latest_sub: 'آخر المقالات', more: 'كل المقالات', cta_t: 'هل ترغب في خوض التجربة؟', cta_d: 'احجز جلستك في المركز بتونس (صفاقس) أو أونلاين، أو اسألني على واتساب.', book: 'احجز جلسة', wa: 'اسأل على واتساب', by: 'بقلم', notfound: 'المقال غير موجود.' },
    fr: { chip: '📝 Le blog', h1: 'Articles pour l’âme et l’énergie', intro: 'Conseils, méditations et partages autour du Reiki, du ThetaHealing®, du Tarot, de l’énergie et de la guérison intérieure — par Rawia Ghorbel.', all: 'Tous', read: 'Lire l’article →', min: 'min de lecture', empty: 'De nouveaux articles arrivent bientôt ✨', back: '← Tous les articles', latest: 'Le blog', latest_sub: 'Derniers articles', more: 'Tous les articles', cta_t: 'Envie de vivre l’expérience ?', cta_d: 'Réservez votre séance au centre à Sfax (Tunisie) ou en ligne, ou posez-moi vos questions sur WhatsApp.', book: 'Réserver une séance', wa: 'Question sur WhatsApp', by: 'Par', notfound: 'Article introuvable.' },
    en: { chip: '📝 Blog', h1: 'Articles for the soul and energy', intro: 'Tips, meditations and insights on Reiki, ThetaHealing®, Tarot, energy and inner healing — by Rawia Ghorbel.', all: 'All', read: 'Read article →', min: 'min read', empty: 'New articles coming soon ✨', back: '← All articles', latest: 'From the blog', latest_sub: 'Latest articles', more: 'All articles', cta_t: 'Ready to experience it?', cta_d: 'Book your session at the centre in Sfax, Tunisia or online, or ask me on WhatsApp.', book: 'Book a session', wa: 'Ask on WhatsApp', by: 'By', notfound: 'Article not found.' }
  };
  const $ = s => document.querySelector(s);
  const lg = () => (window.CH ? window.CH.getLang() : 'ar');
  const m = k => (M[lg()] || M.ar)[k] || M.ar[k];
  const esc = B.esc;
  const slugParam = new URLSearchParams(location.search).get('a');
  let cat = '';
  const fmt = (d, l) => { try { return d ? new Date(d + 'T12:00:00').toLocaleDateString(l === 'ar' ? 'ar-TN' : l === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''; } catch (e) { return d; } };
  const href = p => 'blog/' + encodeURIComponent(p.slug) + '.html';

  function card(p) {
    const l = B.pick(p, lg());
    return `<article class="medit post-card" lang="${l}" dir="${l === 'ar' ? 'rtl' : 'ltr'}">
      <a class="medit-cover t-${esc(p.theme || 'violet')}" href="${href(p)}" tabindex="-1" aria-hidden="true">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : `<span class="art">${window.CH ? window.CH.svg(p.icone || 'lotus') : ''}</span>`}
        ${B.val(p.categorie, l) ? `<span class="tag">${esc(B.val(p.categorie, l))}</span>` : ''}</a>
      <div class="pbody"><span class="lec-type">${esc(fmt(p.date, l))} · ${esc(B.readLabel(B.minutes(p, l), l))}</span>
        <a class="ptitle" href="${href(p)}">${esc(B.val(p.titre, l))}</a><p class="pdesc">${esc(B.excerpt(p, l))}</p>
        <div class="pfoot"><a class="more-link" href="${href(p)}">${esc((M[l] || M.ar).read)}</a></div></div></article>`;
  }

  function renderList(posts) {
    const l = lg();
    const cats = [...new Set(posts.map(p => B.val(p.categorie, B.pick(p, l))).filter(Boolean))];
    $('#bcat').innerHTML = cats.length > 1 ? `<button data-cat="" class="${cat ? '' : 'active'}">${esc(m('all'))}</button>` + cats.map(c => `<button data-cat="${esc(c)}" class="${cat === c ? 'active' : ''}">${esc(c)}</button>`).join('') : '';
    const list = posts.filter(p => !cat || B.val(p.categorie, B.pick(p, l)) === cat);
    $('#posts').innerHTML = list.map(card).join('');
    $('#blog-empty').hidden = list.length > 0;
  }

  function renderArticle(p) {
    const l = B.pick(p, lg()), S = (window.CH && window.CH.getData() || {}).settings || {};
    const wa = 'https://wa.me/' + String(S.whatsapp || '21626660344').replace(/\D/g, '');
    document.title = B.val(p.titre, l) + ' | Centre Holistique';
    $('#blog-hero').hidden = true; $('#blog-list').hidden = true;
    const box = $('#blog-article'); box.hidden = false;
    box.innerHTML = `<article class="post" lang="${l}" dir="${l === 'ar' ? 'rtl' : 'ltr'}">
      <a class="post-back" href="blog.html">${esc(m('back'))}</a>
      ${p.image ? `<img class="post-cover" src="${esc(p.image)}" alt="">` : ''}
      <p class="post-meta">${esc(B.val(p.categorie, l))}${B.val(p.categorie, l) ? ' · ' : ''}${esc(fmt(p.date, l))} · ${esc(B.readLabel(B.minutes(p, l), l))}</p>
      <h1>${esc(B.val(p.titre, l))}</h1>
      <div class="post-body">${B.md(B.val(p.contenu, l))}</div>
      <p class="post-author">${esc((M[l] || M.ar).by)} <a href="rawia-ghorbel.html"><b>Rawia Ghorbel</b></a></p>
      <div class="seo-cta"><h2>${esc((M[l] || M.ar).cta_t)}</h2><p>${esc((M[l] || M.ar).cta_d)}</p><div class="form-actions"><a class="btn btn-primary" href="index.html#reservation">${esc((M[l] || M.ar).book)}</a><a class="btn btn-soft" href="${wa}" target="_blank" rel="noopener">${esc((M[l] || M.ar).wa)}</a></div></div>
    </article>`;
  }

  function renderLatest(posts) {
    const sec = $('#blog-latest'); if (!sec) return;
    sec.hidden = !posts.length; if (!posts.length) return;
    sec.querySelector('[data-b="latest"]').textContent = m('latest');
    sec.querySelector('[data-b="latest_sub"]').textContent = m('latest_sub');
    sec.querySelector('[data-b="more"]').textContent = m('more');
    sec.querySelector('.js-latest').innerHTML = posts.slice(0, 3).map(card).join('');
  }

  function render() {
    if (!window.CH || !window.CH.getData()) return;
    const posts = B.published(window.CH.getData());
    renderLatest(posts);
    if (!$('#posts')) return;
    document.querySelectorAll('[data-b]').forEach(el => { if (M.ar[el.dataset.b] && !el.closest('#blog-latest')) el.textContent = m(el.dataset.b); });
    if (slugParam) {
      const p = posts.find(x => x.slug === slugParam);
      if (p) return renderArticle(p);
      $('#blog-empty').hidden = false; $('#blog-empty p').textContent = m('notfound');
    }
    renderList(posts);
  }
  document.addEventListener('click', e => { const b = e.target.closest('#bcat [data-cat]'); if (b) { cat = b.dataset.cat; render(); } });
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  render();
})();
