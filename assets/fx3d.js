// 3D effects: sacred-geometry hero (Three.js, loaded lazily) + 3D tilt on cards.
// Everything degrades gracefully: no WebGL, reduced motion or weak devices keep the normal design.
(function () {
  'use strict';
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia && matchMedia('(pointer: fine)').matches;

  // ---------------- 3D TILT ON CARDS ----------------
  const TILT = '.pcard, .pack, .abo, .lecture, .medit, .step, .who-item';
  if (fine && !reduce) {
    let cur = null;
    document.addEventListener('pointermove', e => {
      const el = e.target.closest && e.target.closest(TILT);
      if (cur && cur !== el) reset(cur);
      if (!el) { cur = null; return; }
      cur = el;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      const max = el.matches('.abo') ? 5 : 8;
      el.classList.add('tilting');
      el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * max).toFixed(2)}deg) rotateY(${((px - 0.5) * max).toFixed(2)}deg) translateY(-4px)`;
      el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    }, { passive: true });
    document.addEventListener('pointerout', e => { if (!e.relatedTarget && cur) { reset(cur); cur = null; } });
    window.addEventListener('blur', () => { if (cur) { reset(cur); cur = null; } });
    function reset(el) { el.classList.remove('tilting'); el.style.transform = ''; }
  }

  // ---------------- 3D HERO ----------------
  const hero = document.querySelector('[data-page="home"] .hero');
  if (!hero || reduce) return;
  const weak = (navigator.deviceMemory && navigator.deviceMemory < 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 3);
  if (weak) return;
  try { const c = document.createElement('canvas'); if (!(c.getContext('webgl') || c.getContext('experimental-webgl'))) return; } catch (e) { return; }

  const start = () => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.async = true;
    s.onload = () => { try { build(); } catch (e) { console.warn('3D disabled', e); } };
    document.head.appendChild(s);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2500 }); else setTimeout(start, 1200);

  function build() {
    const T = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.className = 'hero3d';
    canvas.setAttribute('aria-hidden', 'true');
    hero.prepend(canvas);
    const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const GOLD = 0xe3c47a, LILAC = 0xd8b9ff;
    const lineMat = (color, opacity) => new T.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const group = new T.Group();
    scene.add(group);

    // Merkaba (star tetrahedron)
    const tetra = new T.TetrahedronGeometry(1.55, 0);
    const edges = new T.EdgesGeometry(tetra);
    const t1 = new T.LineSegments(edges, lineMat(GOLD, 0.95));
    const t2 = new T.LineSegments(edges, lineMat(GOLD, 0.95));
    t2.rotation.set(Math.PI, Math.PI / 2, 0);
    const merkaba = new T.Group(); merkaba.add(t1, t2); group.add(merkaba);

    // soft inner glow
    const glowTex = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
      const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, 'rgba(255,236,190,1)'); grd.addColorStop(0.35, 'rgba(240,215,154,.45)'); grd.addColorStop(1, 'rgba(240,215,154,0)');
      g.fillStyle = grd; g.fillRect(0, 0, 128, 128); return new T.CanvasTexture(c);
    })();
    const glow = new T.Sprite(new T.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0.55 }));
    glow.scale.set(2.6, 2.6, 1); group.add(glow);

    // Icosahedron cage
    const cage = new T.LineSegments(new T.EdgesGeometry(new T.IcosahedronGeometry(2.45, 0)), lineMat(LILAC, 0.28));
    group.add(cage);

    // Flower of life (7 circles) on two tilted rings
    const circle = (r, x, y, mat) => {
      const pts = []; for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; pts.push(new T.Vector3(x + Math.cos(a) * r, y + Math.sin(a) * r, 0)); }
      return new T.Line(new T.BufferGeometry().setFromPoints(pts), mat);
    };
    const flower = new T.Group(), fm = lineMat(GOLD, 0.35), r = 1.05;
    flower.add(circle(r, 0, 0, fm));
    for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; flower.add(circle(r, Math.cos(a) * r, Math.sin(a) * r, fm)); }
    flower.add(circle(r * 2, 0, 0, lineMat(GOLD, 0.22)));
    flower.scale.setScalar(1.45); flower.position.z = -1.2; group.add(flower);

    const ring = new T.Group();
    const rm = lineMat(GOLD, 0.5);
    [3.1, 3.35].forEach(rr => ring.add(circle(rr, 0, 0, rm)));
    ring.rotation.x = 1.15; group.add(ring);

    // floating particles (energy)
    const N = window.innerWidth < 720 ? 160 : 320;
    const pos = new Float32Array(N * 3), speed = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 14; pos[i * 3 + 1] = (Math.random() - 0.5) * 8; pos[i * 3 + 2] = (Math.random() - 0.5) * 6; speed[i] = 0.004 + Math.random() * 0.012; }
    const pg = new T.BufferGeometry(); pg.setAttribute('position', new T.BufferAttribute(pos, 3));
    const dot = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d'); const grd = g.createRadialGradient(16, 16, 0, 16, 16, 16); grd.addColorStop(0, 'rgba(255,240,200,1)'); grd.addColorStop(1, 'rgba(255,240,200,0)'); g.fillStyle = grd; g.fillRect(0, 0, 32, 32); return new T.CanvasTexture(c); })();
    const points = new T.Points(pg, new T.PointsMaterial({ size: 0.09, map: dot, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: 0.85, color: 0xffe9b8 }));
    scene.add(points);

    // layout: geometry on the side opposite the text (or centred & dimmed on phones)
    let W = 0, H = 0;
    function layout() {
      W = hero.clientWidth; H = hero.clientHeight;
      renderer.setSize(W, H, false); camera.aspect = W / H; camera.updateProjectionMatrix();
      const mobile = W < 720, rtl = document.documentElement.dir === 'rtl';
      const halfW = Math.tan((camera.fov * Math.PI / 180) / 2) * camera.position.z * camera.aspect;
      group.position.x = mobile ? 0 : (rtl ? -1 : 1) * halfW * 0.52;
      group.position.y = mobile ? 0.6 : 0;
      group.scale.setScalar(mobile ? 0.8 : 1);
      canvas.style.setProperty('--o3d', mobile ? '.45' : '1');
    }
    layout();
    new ResizeObserver(layout).observe(hero);
    new MutationObserver(layout).observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    hero.classList.add('has3d');

    // interaction: mouse / device tilt
    let tx = 0, ty = 0, mx = 0, my = 0;
    hero.addEventListener('pointermove', e => { const b = hero.getBoundingClientRect(); tx = ((e.clientX - b.left) / b.width - 0.5) * 0.8; ty = ((e.clientY - b.top) / b.height - 0.5) * 0.6; }, { passive: true });
    hero.addEventListener('pointerleave', () => { tx = ty = 0; });
    window.addEventListener('deviceorientation', e => { if (e.gamma == null) return; tx = Math.max(-1, Math.min(1, e.gamma / 35)) * 0.6; ty = Math.max(-1, Math.min(1, (e.beta - 45) / 35)) * 0.4; }, { passive: true });

    // run only while visible
    let visible = true, raf = 0;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible && !raf) loop(); }, { threshold: 0 }).observe(hero);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && visible && !raf) loop(); });

    const clock = new T.Clock();
    function loop() {
      if (!visible || document.hidden) { raf = 0; return; }
      raf = requestAnimationFrame(loop);
      const t = clock.getElapsedTime();
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      merkaba.rotation.y = t * 0.35; merkaba.rotation.x = Math.sin(t * 0.3) * 0.25;
      cage.rotation.y = -t * 0.12; cage.rotation.z = t * 0.05;
      flower.rotation.z = t * 0.08;
      ring.rotation.z = -t * 0.15;
      group.rotation.y = mx; group.rotation.x = my;
      const breathe = 1 + Math.sin(t * 1.2) * 0.035;
      merkaba.scale.setScalar(breathe); glow.material.opacity = 0.4 + Math.sin(t * 1.2) * 0.15;
      const p = pg.attributes.position.array;
      for (let i = 0; i < N; i++) { p[i * 3 + 1] += speed[i]; p[i * 3] += Math.sin(t + i) * 0.0015; if (p[i * 3 + 1] > 4.2) p[i * 3 + 1] = -4.2; }
      pg.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    loop();
  }
})();
