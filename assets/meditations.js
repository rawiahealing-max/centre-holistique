(function () {
  'use strict';
  const M = {
    ar: { chip: '🧘 تأملات موجّهة', h1: 'خذ نفساً… وعُد إلى ذاتك', intro: 'تأملات صوتية وفيديو للنوم، الصباح، القلق، الشاكرات والقمر. بعضها مجاني للجميع، والباقي حصري لأعضاء الدائرة ✨',
      empty: 'تأملات جديدة قريباً 🌙', cta_t: 'افتح كل التأملات ✨', cta_d: 'انضم إلى الدائرة الشهرية واحصل على كل التأملات الخاصة، التسجيلات والشات مع المجتمع.', cta_join: 'انضم إلى الدائرة', cta_login: 'لدي حساب',
      all: 'الكل', free: 'مجاني', members: 'للأعضاء', play: '▶ استمع', watch: '▶ شاهد', locked: '🔒 للأعضاء', audio: 'صوت', video: 'فيديو' },
    fr: { chip: '🧘 Méditations guidées', h1: 'Respirez… et revenez à vous', intro: "Méditations audio et vidéo pour le sommeil, le matin, l'anxiété, les chakras et la lune. Certaines sont gratuites, les autres réservées aux membres du Cercle ✨",
      empty: 'De nouvelles méditations arrivent bientôt 🌙', cta_t: 'Débloquez toutes les méditations ✨', cta_d: 'Rejoignez le Cercle mensuel : toutes les méditations exclusives, les replays et le chat de la communauté.', cta_join: 'Rejoindre le Cercle', cta_login: "J'ai un compte",
      all: 'Toutes', free: 'Gratuit', members: 'Membres', play: '▶ Écouter', watch: '▶ Regarder', locked: '🔒 Membres', audio: 'Audio', video: 'Vidéo' },
    en: { chip: '🧘 Guided meditations', h1: 'Breathe… and come back to yourself', intro: 'Audio and video meditations for sleep, mornings, anxiety, chakras and the moon. Some are free for everyone, the rest are exclusive to Circle members ✨',
      empty: 'New meditations coming soon 🌙', cta_t: 'Unlock every meditation ✨', cta_d: 'Join the monthly Circle for all exclusive meditations, replays and the community chat.', cta_join: 'Join the Circle', cta_login: 'I have an account',
      all: 'All', free: 'Free', members: 'Members', play: '▶ Listen', watch: '▶ Watch', locked: '🔒 Members', audio: 'Audio', video: 'Video' }
  };
  const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
  const lg = () => (window.CH ? window.CH.getLang() : 'ar');
  const m = k => (M[lg()] && M[lg()][k]) || M.ar[k];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = v => window.CH ? window.CH.L(v) : '';
  let items = [], cat = '';

  async function load() {
    if (!window.sb) { items = []; render(); return; }
    const { data, error } = await window.sb.rpc('list_meditations');
    items = error ? [] : (data || []);
    render();
  }
  function render() {
    if (!window.CH || !window.CH.getData()) return;
    $$('[data-m]').forEach(el => el.textContent = m(el.dataset.m));
    const D = window.CH?.getData() || {};
    const cats = (D.medit_categories || []).filter(c => items.some(x => x.category === c.id));
    $('#mcat').innerHTML = `<button data-cat="" class="${cat ? '' : 'active'}">${esc(m('all'))}</button>` +
      cats.map(c => `<button data-cat="${esc(c.id)}" class="${cat === c.id ? 'active' : ''}">${esc(L(c))}</button>`).join('');
    $('#mcat').hidden = !cats.length;
    const list = items.filter(x => !cat || x.category === cat);
    $('#medit-empty').hidden = list.length > 0;
    $('#member-cta').hidden = !items.some(x => x.locked);
    $('#medits').innerHTML = list.map(x => {
      const c = (D.medit_categories || []).find(y => y.id === x.category);
      return `<article class="medit ${x.locked ? 'is-locked' : ''}">
        <div class="medit-cover t-${esc(x.theme || 'violet')}">${x.cover ? `<img src="${esc(x.cover)}" alt="" loading="lazy">` : `<span class="art">${window.CH.svg(x.kind === 'video' ? 'star' : 'lotus')}</span>`}
          <span class="tag">${x.members_only ? '✨ ' + esc(m('members')) : esc(m('free'))}</span>
          ${x.duration ? `<span class="online-pill">⏱ ${esc(x.duration)}</span>` : ''}</div>
        <div class="pbody"><span class="lec-type">${esc(c ? L(c) : '')}${c ? ' · ' : ''}${esc(m(x.kind))}</span>
          <div class="ptitle">${esc(L(x.title))}</div><p class="pdesc">${esc(L(x.description))}</p>
          <div class="pfoot">${x.locked ? `<a class="btn btn-soft add" href="index.html#cercle">${esc(m('locked'))}</a>` : `<button class="btn btn-primary add" data-play="${x.id}">${esc(m(x.kind === 'video' ? 'watch' : 'play'))}</button>`}</div>
        </div></article>`;
    }).join('');
  }
  $('#mcat').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; render(); } });
  $('#medits').addEventListener('click', async e => {
    const b = e.target.closest('[data-play]'); if (!b) return;
    const x = items.find(i => String(i.id) === b.dataset.play); if (!x) return;
    const emb = window.embedUrl(x.url || '');
    const src = x.storage_path ? await window.fileUrl(x.storage_path) : x.url;
    if (x.kind === 'video' || emb) {
      $('#vframe').innerHTML = emb ? `<iframe src="${esc(emb)}&autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>` : `<video src="${esc(src)}" controls autoplay playsinline controlslist="nodownload"></video>`;
      $('#vdialog').showModal();
    } else {
      $('#mp-title').textContent = L(x.title); $('#mp-sub').textContent = x.duration || '';
      $('#mp-ico').className = 'mp-ico t-' + (x.theme || 'violet'); $('#mp-ico').innerHTML = window.CH.svg('lotus');
      const au = $('#mp-audio'); au.src = src; $('#mplayer').hidden = false; au.play().catch(() => {});
    }
  });
  const closeV = () => { $('#vframe').innerHTML = ''; $('#vdialog').close(); };
  $('#vclose').addEventListener('click', closeV);
  $('#vdialog').addEventListener('click', e => { if (e.target.id === 'vdialog') closeV(); });
  $('#mp-close').addEventListener('click', () => { const au = $('#mp-audio'); au.pause(); au.removeAttribute('src'); $('#mplayer').hidden = true; });

  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  if (window.sb) window.sb.auth.onAuthStateChange(() => load());
  load();
})();
