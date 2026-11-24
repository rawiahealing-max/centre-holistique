// Hero "breath": the golden flower of life draws itself line by line, then the sacred geometry symbols
// appear one after another in the centre (lotus, seed of life, Metatron's cube, Sri Yantra, Merkaba, vesica piscis),
// each one drawn with light, held, then dissolved into the next. Everything breathes slowly.
// The title appears word by word.
(function () {
  'use strict';
  const sacred = document.querySelector('.hero .sacred'); if (!sacred) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const f = n => n.toFixed(2);
  const pt = (r, deg) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];

  // ---------- the symbols (viewBox -60 -60 120 120) ----------
  const LOTUS = `<path d="M0 30C-13 12-13-12 0-34C13-12 13 12 0 30Z"/>
    <path d="M0 30C-20 26-36 10-38-12C-20-9-6 6 0 30Z"/><path d="M0 30C20 26 36 10 38-12C20-9 6 6 0 30Z"/>
    <path d="M0 30C-26 34-48 26-56 10C-34 6-14 14 0 30Z"/><path d="M0 30C26 34 48 26 56 10C34 6 14 14 0 30Z"/>
    <path d="M-44 36C-20 44 20 44 44 36"/><circle cx="0" cy="-44" r="2.6"/>`;
  const SEED = (() => { let s = '<circle r="18"/>'; for (let i = 0; i < 6; i++) { const [x, y] = pt(18, i * 60 - 90); s += `<circle cx="${f(x)}" cy="${f(y)}" r="18"/>`; } return s + '<circle r="36"/>'; })();
  const METATRON = (() => {
    const c = [[0, 0]], d = 17;
    for (let i = 0; i < 6; i++) c.push(pt(d, i * 60 - 90));
    for (let i = 0; i < 6; i++) c.push(pt(d * 2, i * 60 - 90));
    let s = '';
    for (let a = 0; a < c.length; a++) for (let b = a + 1; b < c.length; b++) s += `<line x1="${f(c[a][0])}" y1="${f(c[a][1])}" x2="${f(c[b][0])}" y2="${f(c[b][1])}" class="thin"/>`;
    c.forEach(([x, y]) => { s += `<circle cx="${f(x)}" cy="${f(y)}" r="8.2"/>`; });
    return s;
  })();
  const SRI = (() => {
    // 4 triangles pointing up and 5 pointing down, nested, inside lotus petals rings
    const up = [[-42, 30, -40], [-34, 22, -30], [-26, 14, -18], [-16, 6, -6]];
    const dn = [[40, -30, 40], [32, -22, 30], [24, -14, 20], [16, -6, 10], [10, -1, 3]];
    let s = '';
    up.forEach(([w, b, t]) => { s += `<polygon points="0,${t} ${-w},${b} ${w},${b}"/>`; });
    dn.forEach(([w, b, t]) => { s += `<polygon points="0,${t} ${-w},${b} ${w},${b}"/>`; });
    s += '<circle r="1.6"/><circle r="46"/><circle r="50"/>';
    for (let i = 0; i < 16; i++) { const a = i * 22.5, [x1, y1] = pt(50, a - 11.25), [x2, y2] = pt(50, a + 11.25), [cx, cy] = pt(57, a); s += `<path class="thin" d="M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}"/>`; }
    return s;
  })();
  const MERKABA = (() => {
    const t1 = [0, 120, 240].map(a => pt(46, a - 90)), t2 = [0, 120, 240].map(a => pt(46, a + 90));
    const poly = p => `<polygon points="${p.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')}"/>`;
    let s = poly(t1) + poly(t2);
    [...t1, ...t2].forEach(([x, y]) => { s += `<line class="thin" x1="0" y1="0" x2="${f(x)}" y2="${f(y)}"/>`; });
    const h = [0, 60, 120, 180, 240, 300].map(a => pt(26.6, a - 90));
    s += `<polygon class="thin" points="${h.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')}"/><circle r="52" class="thin"/>`;
    return s;
  })();
  const VESICA = `<circle cx="-14" cy="0" r="28"/><circle cx="14" cy="0" r="28"/><path d="M0 -24.2C9 -12 9 12 0 24.2C-9 12 -9 -12 0 -24.2Z"/>
    <line class="thin" x1="-14" y1="0" x2="14" y2="0"/><line class="thin" x1="0" y1="-24.2" x2="0" y2="24.2"/><circle r="50" class="thin"/>`;

  const SYMBOLS = [LOTUS, SEED, METATRON, SRI, MERKABA, VESICA];
  const lang = () => (window.CH ? window.CH.getLang() : 'ar');

  const holder = document.createElement('div');
  holder.className = 'sg-layer sg-cycle';
  sacred.appendChild(holder);
  // breathing invitation, in time with the figure (7 s: in 3.5 s, out 3.5 s)
  const BREATH = { ar: ['شهيق…', 'زفير…', 'تنفّس معايا'], fr: ['Inspirez…', 'Expirez…', 'Respirez avec moi'], en: ['Breathe in…', 'Breathe out…', 'Breathe with me'] };
  const breath = document.createElement('div');
  breath.className = 'sg-breath';
  breath.setAttribute('aria-hidden', 'true');
  sacred.appendChild(breath);

  function prep(root) {
    let k = 0;
    root.querySelectorAll('circle, polygon, path, line, polyline').forEach(el => {
      let len = 0; try { len = el.getTotalLength(); } catch (e) { /* ignore */ }
      if (!len) return;
      el.classList.add('sgd');
      el.style.setProperty('--len', (len + 1).toFixed(1));
      el.style.setProperty('--k', String(k++));
    });
    return k;
  }

  let idx = 0;
  function show(i) {
    const fig = document.createElement('div');
    fig.className = 'sg-sym' + (i === 0 ? ' is-lotus' : '');
    fig.innerHTML = `<svg viewBox="-60 -60 120 120"><g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round">${SYMBOLS[i]}</g></svg>`;
    holder.appendChild(fig);
    const n = prep(fig);
    fig.style.setProperty('--step', Math.min(0.08, 2.2 / Math.max(1, n)).toFixed(3) + 's');
    if (reduce) fig.classList.add('on', 'still');
    else requestAnimationFrame(() => requestAnimationFrame(() => fig.classList.add('on')));
    [...holder.children].slice(0, -1).forEach(old => { old.classList.add('out'); setTimeout(() => old.remove(), 1600); });
  }

  if (reduce) { sacred.classList.add('sg-ready'); show(0); return; }

  // 1) the flower of life (existing layers) draws itself
  sacred.querySelectorAll('.sg-flower, .sg-ring, .sg-star').forEach(el => prep(el));
  sacred.classList.add('sg-draw');
  requestAnimationFrame(() => requestAnimationFrame(() => sacred.classList.add('sg-go')));

  // 2) then the symbols, one after another (paused while the tab is hidden)
  const HOLD = 7000;
  let timer = 0;
  const next = () => { show(idx); idx = (idx + 1) % SYMBOLS.length; if (typeof pulse === 'function') pulse(); };
  const schedule = d => { clearTimeout(timer); timer = setTimeout(function loop() { if (!document.hidden) next(); timer = setTimeout(loop, HOLD); }, d); };
  schedule(2400);

  // 3) breathe with me: the words follow the breathing of the figure
  const B = () => BREATH[lang()] || BREATH.fr;
  breath.textContent = B()[2];
  setTimeout(() => {
    breath.classList.add('on');
    let inhale = true;
    const tick = () => { if (!document.hidden) { breath.textContent = B()[inhale ? 0 : 1]; breath.classList.toggle('in', inhale); } inhale = !inhale; };
    // the figure's breathing starts 4 s after load and lasts 7 s; start the words in time with it
    tick(); setInterval(tick, 3500);
  }, 4000);

  let pulse = null;
  // 4) touch the light: a golden ripple where you click / tap, and the next symbol comes at once
  const hero = sacred.closest('.hero');
  hero.addEventListener('pointerdown', e => {
    if (e.target.closest('a,button,input,select,textarea')) return;
    const hb = hero.getBoundingClientRect();
    const ring = document.createElement('span');
    ring.className = 'sg-ripple';
    ring.style.left = (e.clientX - hb.left) + 'px'; ring.style.top = (e.clientY - hb.top) + 'px';
    hero.appendChild(ring); setTimeout(() => ring.remove(), 1400);
    burst(e.clientX - hb.left, e.clientY - hb.top, 18);
    const sb = sacred.getBoundingClientRect();
    if (e.clientX > sb.left && e.clientX < sb.right && e.clientY > sb.top && e.clientY < sb.bottom) { next(); schedule(HOLD); }
  });

  // 5) light dust that follows the mouse (desktop only, very light)
  const canvas = document.createElement('canvas');
  canvas.className = 'sg-dust';
  canvas.setAttribute('aria-hidden', 'true');
  hero.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let parts = [], raf = 0, W = 0, H = 0;
  const size = () => { const r = hero.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1); W = r.width; H = r.height; canvas.width = W * d; canvas.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); window.addEventListener('resize', size);
  function burst(x, y, n, soft) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = soft ? Math.random() * 0.6 : 0.8 + Math.random() * 2.4;
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (soft ? 0.4 : 0.2), r: 0.8 + Math.random() * (soft ? 1.6 : 2.2), life: 1, decay: 0.012 + Math.random() * 0.02 });
    }
    if (parts.length > 160) parts = parts.slice(-160);
    if (!raf) raf = requestAnimationFrame(draw);
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy = p.vy * 0.97 - 0.01; p.life -= p.decay; });
    parts = parts.filter(p => p.life > 0);
    ctx.globalCompositeOperation = 'lighter';
    parts.forEach(p => {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(255,236,180,${(0.9 * p.life).toFixed(3)})`); g.addColorStop(1, 'rgba(255,220,150,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
    });
    raf = parts.length ? requestAnimationFrame(draw) : 0;
  }
  // 6) automatic: a golden wave from the centre at each new symbol, and light dust rising around the figure all the time
  let visible = true;
  try { new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(hero); } catch (e) { /* old browsers: always on */ }
  function centre() { const hb = hero.getBoundingClientRect(), sb = sacred.getBoundingClientRect(); return [sb.left - hb.left + sb.width / 2, sb.top - hb.top + sb.height / 2, sb.width / 2]; }
  function ripple(x, y) { const ring = document.createElement('span'); ring.className = 'sg-ripple'; ring.style.left = x + 'px'; ring.style.top = y + 'px'; hero.appendChild(ring); setTimeout(() => ring.remove(), 1400); }
  pulse = function () { if (!visible || document.hidden) return; const [x, y] = centre(); ripple(x, y); setTimeout(() => ripple(x, y), 350); burst(x, y, 26); };
  setInterval(() => {
    if (!visible || document.hidden) return;
    const [cx, cy, r] = centre(), a = Math.random() * Math.PI * 2, d = r * (0.35 + Math.random() * 0.75);
    burst(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1, true);
  }, 160);

  if (window.matchMedia('(pointer: fine)').matches) {
    let last = 0;
    hero.addEventListener('pointermove', e => {
      const now = performance.now(); if (now - last < 28) return; last = now;
      const hb = hero.getBoundingClientRect(); burst(e.clientX - hb.left, e.clientY - hb.top, 2, true);
    });
  }

  // title: word by word
  function words() {
    const h = document.querySelector('.hero h1[data-s="slogan"]'); if (!h) return;
    const txt = h.textContent.trim(); if (!txt || h.querySelector('.hw')) return;
    h.innerHTML = txt.split(/\s+/).map((w, i) => `<span class="hw" style="--w:${i}">${w.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))}</span>`).join(' ');
  }
  (window.CH_HOOKS = window.CH_HOOKS || []).push(() => setTimeout(words, 0));
  setTimeout(words, 600);
})();
