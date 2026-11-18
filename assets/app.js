(function () {
  const ICONS = {
    energy: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    cards: '<rect x="3" y="5" width="11" height="15" rx="2"/><path d="M10 4.5 17 3l3.5 14.5-6.5 1.6"/><path d="M8.5 10.5l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z"/>',
    tree: '<circle cx="12" cy="4.5" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><circle cx="8.5" cy="20" r="1.6"/><circle cx="15.5" cy="20" r="1.6"/><path d="M12 6.5V10M12 10H5v1M12 10h7v1M5 15l3.5 3.4M19 15l-3.5 3.4"/>',
    mind: '<path d="M9 21v-3H7a2 2 0 0 1-2-2v-3l-2-1 2-3a7 7 0 0 1 14 2c0 2.2-1 3.8-2 5v5"/><path d="M11 9a2 2 0 1 1 3 1.7V12"/>',
    hands: '<path d="M12 21c-3-2-7-4-7-9V7.5a1.5 1.5 0 0 1 3 0V11M12 21c3-2 7-4 7-9V7.5a1.5 1.5 0 0 0-3 0V11"/><path d="M12 3v3M8.5 4.5l1 2M15.5 4.5l-1 2"/>',
    lotus: '<path d="M12 4c2.5 3 2.5 8 0 12c-2.5-4-2.5-9 0-12z"/><path d="M12 16c-1.5-4-5-6.5-9-6.5c.5 4 4 7 9 6.5zM12 16c1.5-4 5-6.5 9-6.5c-.5 4-4 7-9 6.5z"/><path d="M5 20h14"/>',
    star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    crystal: '<path d="M12 2 6 8l6 14 6-14z"/><path d="M6 8h12M12 2v20"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/>'
  };
  const svg = k => `<svg viewBox="0 0 24 24">${ICONS[k] || ICONS.star}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = s => document.querySelector(s);
  const fmtDate = d => { try { return new Date(d + 'T00:00:00').toLocaleDateString('ar-TN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return d; } };
  const store = {
    get(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const safeImg = u => /^(https?:\/\/|assets\/)/i.test(u || '') ? u : '';

  let DATA = null, DEV = 'د.ت';
  let cart = store.get('ch_cart', []);
  let favs = new Set(store.get('ch_favs', []));

  // ---------- header / nav
  $('#burger').addEventListener('click', () => $('#menu').classList.toggle('open'));
  $('#menu').addEventListener('click', e => { if (e.target.tagName === 'A') $('#menu').classList.remove('open'); });
  $('#year').textContent = new Date().getFullYear();
  const chatScroll = () => $('#chat').classList.toggle('compact', scrollY > 300);
  addEventListener('scroll', chatScroll, { passive: true }); chatScroll();

  fetch('data/site.json?v=' + Date.now()).then(r => r.json()).then(d => { DATA = d; render(); }).catch(() => {
    document.body.insertAdjacentHTML('afterbegin', '<p style="background:#fde;padding:8px;text-align:center">تعذّر تحميل المحتوى (data/site.json).</p>');
  });

  function money(p) { return `${esc(p)} <small>${esc(DEV)}</small>`; }
  function rating(x) {
    if (!x.note) return '';
    return `<div class="rating"><b>${esc(x.note)}</b><span class="stars">★★★★★</span>${x.avis ? `<span>(${esc(x.avis)})</span>` : ''}</div>`;
  }
  function media(x, tag, extra = '') {
    const img = safeImg(x.image);
    return `<div class="pmedia t-${esc(x.theme || 'violet')}">
      ${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : `<span class="art">${svg(x.icone)}</span>`}
      ${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
      <button class="fav ${favs.has(x.id) ? 'on' : ''}" data-fav="${esc(x.id)}" aria-label="المفضلة">${svg('heart')}</button>
      ${extra}</div>`;
  }

  function render() {
    const s = DATA.settings || {};
    DEV = s.devise || DEV;
    document.querySelectorAll('[data-s]').forEach(el => { const v = s[el.dataset.s]; if (v != null) el.textContent = v; });
    $('#initiale').textContent = (s.praticienne || 'R').charAt(0);
    const wa = `https://wa.me/${(s.whatsapp || '').replace(/\D/g, '')}`;
    $('#chat').href = wa; $('#lnk-wa').href = wa;
    $('#lnk-ig').href = s.instagram || '#'; $('#lnk-fb').href = s.facebook || '#';

    // categories
    const cats = DATA.categories?.length ? DATA.categories : [...new Set((DATA.soins || []).map(x => x.categorie).filter(Boolean))];
    $('#cat-filter').innerHTML = '<option value="">كل الجلسات</option>' + cats.map(c => `<option>${esc(c)}</option>`).join('');
    renderSoins();

    // formations
    const fs = (DATA.formations || []).filter(f => f.actif !== false).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    $('#formations-empty').hidden = fs.length > 0;
    $('#formations-row').innerHTML = fs.map(f => `
      <article class="pcard">
        ${media(f, f.categorie, f.nouveau ? '<span class="new">جديد</span>' : '')}
        <div class="pbody">
          <div class="ptitle">${esc(f.titre)}</div>
          ${rating(f)}
          <div class="pmeta">${f.date ? `<span>📅 ${esc(fmtDate(f.date))}</span>` : ''}${f.duree ? `<span>⏱ ${esc(f.duree)}</span>` : ''}${f.mode ? `<span>📍 ${esc(f.mode)}</span>` : ''}</div>
          <p class="pdesc">${esc(f.description)}</p>
          <div class="pfoot"><span class="price">${money(f.prix)}${f.ancien_prix ? `<span class="old">${esc(f.ancien_prix)}</span>` : ''}</span>
            <button class="btn btn-soft add" data-add="formations" data-id="${esc(f.id)}">أضف للسلة</button></div>
        </div>
      </article>`).join('');

    // packs
    const ps = (DATA.packs || []).filter(p => p.actif !== false);
    $('#packs').hidden = ps.length === 0;
    $('#packs-list').innerHTML = ps.map(p => {
      const save = p.ancien_prix && (+p.ancien_prix - +p.prix);
      return `<article class="pack">
        <div class="pack-top t-${esc(p.theme || 'violet')}"><span class="tag">باقة</span><h3>${esc(p.titre)}</h3></div>
        <div class="pack-body">
          <span class="count">${esc(p.nb ? p.nb + ' جلسات · ' : '')}${esc(p.contenu)}</span>
          <div><span class="price">${money(p.prix)}</span>${p.ancien_prix ? `<span class="old">${esc(p.ancien_prix)}</span>` : ''}</div>
          ${save > 0 ? `<span class="save">وفّر ${save} ${esc(DEV)} بدل الحجز المنفصل</span>` : ''}
          <button class="btn btn-primary btn-block" data-add="packs" data-id="${esc(p.id)}">أضف للسلة</button>
        </div></article>`;
    }).join('');

    $('#testi-row').innerHTML = (DATA.temoignages || []).map(t => `
      <article class="tcard"><span class="stars">★★★★★</span><p>${esc(t.texte)}</p>
      <div class="who">${esc(t.nom)}<small>${esc(t.service)}</small></div></article>`).join('');
    $('#temoignages').hidden = !(DATA.temoignages || []).length;

    $('#faq-list').innerHTML = (DATA.faq || []).map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.r)}</p></details>`).join('');

    // booking select
    const opt = (x, g) => `<option value="${g}:${esc(x.id)}">${esc(x.sous_titre ? x.sous_titre + ' – ' + x.titre : x.titre)}</option>`;
    $('#choix').innerHTML = '<option value="">— اختر —</option>' +
      `<optgroup label="الجلسات">${(DATA.soins || []).map(x => opt(x, 'soins')).join('')}</optgroup>` +
      (fs.length ? `<optgroup label="الدورات">${fs.map(x => opt(x, 'formations')).join('')}</optgroup>` : '');

    renderCart();
  }

  function renderSoins() {
    const cat = $('#cat-filter').value;
    const list = (DATA.soins || []).filter(x => !cat || x.categorie === cat);
    $('#soins-row').innerHTML = list.map(x => `
      <article class="pcard">
        ${media(x, x.categorie)}
        <div class="pbody">
          <div class="ptitle">${esc(x.sous_titre || x.titre)}</div>
          ${x.sous_titre ? `<div class="psub" dir="ltr" style="text-align:right">${esc(x.titre)}</div>` : ''}
          ${rating(x)}
          <p class="pdesc">${esc(x.description)}</p>
          <div class="pmeta">${x.duree ? `<span>⏱ ${esc(x.duree)}</span>` : ''}</div>
          <div class="pfoot"><span class="price">${money(x.prix)}</span>
            <button class="btn btn-soft add" data-add="soins" data-id="${esc(x.id)}">أضف للسلة</button></div>
        </div>
      </article>`).join('');
    $('#soins-row').scrollTo({ left: 0 });
  }
  $('#cat-filter').addEventListener('change', renderSoins);

  // rails arrows (RTL: "next" goes to the left)
  document.querySelectorAll('.rail-arrow').forEach(b => b.addEventListener('click', () => {
    const r = document.getElementById(b.dataset.rail);
    r.scrollBy({ left: (b.classList.contains('next') ? -1 : 1) * r.clientWidth * .8, behavior: 'smooth' });
  }));

  // favorites + add to cart
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fav]');
    if (f) { const id = f.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id); f.classList.toggle('on'); store.set('ch_favs', [...favs]); return; }
    const a = e.target.closest('[data-add]');
    if (a) {
      const item = (DATA[a.dataset.add] || []).find(x => x.id === a.dataset.id); if (!item) return;
      const key = a.dataset.add + ':' + item.id;
      if (!cart.find(c => c.key === key)) {
        cart.push({ key, type: a.dataset.add, titre: item.sous_titre || item.titre, prix: +item.prix || 0, icone: item.icone || 'gift', theme: item.theme || 'violet' });
        store.set('ch_cart', cart);
      }
      renderCart(); toast('تمت الإضافة إلى السلة ✓');
    }
  });

  // ---------- cart
  const TYPE_LABEL = { soins: 'جلسة', formations: 'دورة تكوينية', packs: 'باقة' };
  function renderCart() {
    const n = cart.length;
    $('#cart-count').textContent = n; $('#cart-count').hidden = n === 0;
    $('#cart-empty').hidden = n > 0; $('#checkout').hidden = n === 0;
    $('#cart-items').innerHTML = cart.map((c, i) => `
      <div class="citem"><span class="thumb t-${esc(c.theme)}">${svg(c.icone)}</span>
        <div class="info"><b>${esc(c.titre)}</b><small>${TYPE_LABEL[c.type] || ''} · ${esc(c.prix)} ${esc(DEV)}</small></div>
        <button data-rm="${i}" aria-label="حذف">✕</button></div>`).join('');
    $('#cart-total').textContent = cart.reduce((t, c) => t + c.prix, 0) + ' ' + DEV;
  }
  $('#cart-items').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if (!b) return;
    cart.splice(+b.dataset.rm, 1); store.set('ch_cart', cart); renderCart();
  });
  const openCart = () => { $('#drawer').classList.add('open'); $('#overlay').hidden = false; $('#drawer').setAttribute('aria-hidden', 'false'); };
  const closeCart = () => { $('#drawer').classList.remove('open'); $('#overlay').hidden = true; $('#drawer').setAttribute('aria-hidden', 'true'); };
  $('#cart-btn').addEventListener('click', openCart);
  $('#bn-cart').addEventListener('click', e => { e.preventDefault(); openCart(); });
  $('#drawer-close').addEventListener('click', closeCart);
  $('#overlay').addEventListener('click', closeCart);
  addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  function sendWhatsApp(text) {
    const num = (DATA.settings.whatsapp || '').replace(/\D/g, '');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
  }

  $('#checkout').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, err = $('#checkout-error');
    const nom = f.nom.value.trim(), tel = f.tel.value.trim();
    if (!nom || !tel) { err.textContent = 'الرجاء إدخال الاسم ورقم الهاتف.'; err.hidden = false; return; }
    err.hidden = true;
    const lines = ['🛒 طلب جديد من الموقع', ...cart.map(c => `• ${c.titre} (${TYPE_LABEL[c.type]}) – ${c.prix} ${DEV}`),
      `المجموع: ${cart.reduce((t, c) => t + c.prix, 0)} ${DEV}`, `الاسم: ${nom}`, `الهاتف: ${tel}`];
    if (f.message.value.trim()) lines.push(`ملاحظة: ${f.message.value.trim()}`);
    sendWhatsApp(lines.join('\n'));
  });

  // ---------- direct booking form
  $('#booking-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, err = $('#form-error'), v = n => (f.elements[n]?.value || '').trim();
    const miss = [];
    if (!v('nom')) miss.push('الاسم'); if (!v('tel')) miss.push('الهاتف'); if (!v('choix')) miss.push('الجلسة');
    if (!f.elements.ok.checked) miss.push('الموافقة');
    if (miss.length) { err.textContent = 'الرجاء إكمال: ' + miss.join('، '); err.hidden = false; return; }
    err.hidden = true;
    const lines = ['🌿 طلب موعد جديد', `الجلسة: ${f.choix.selectedOptions[0].textContent}`, `الاسم: ${v('nom')}`, `الهاتف: ${v('tel')}`];
    if (v('date')) lines.push(`التاريخ المفضّل: ${fmtDate(v('date'))}`);
    if (v('heure')) lines.push(`الوقت: ${v('heure')}`);
    lines.push(`الطريقة: ${v('mode')}`);
    if (v('message')) lines.push(`الرسالة: ${v('message')}`);
    sendWhatsApp(lines.join('\n'));
  });

  // ---------- toast
  let tt;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, 1800); }

  // ---------- bottom nav active state
  const secs = ['accueil', 'seances', 'formations'].map(id => document.getElementById(id));
  const links = document.querySelectorAll('.bottom-nav a');
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => s && io.observe(s));
})();
