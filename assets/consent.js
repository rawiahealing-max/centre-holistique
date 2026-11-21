// Cookie consent + Meta Pixel. The pixel loads ONLY after the visitor accepts (GDPR / Tunisian law 2004-63).
// window.chTrack(event, params) sends a Meta event when consent was given (no-op otherwise).
(function () {
  'use strict';
  // live "online now" counter in the footer (assets/online.js, no cookies) — loaded from here so every public page gets it
  try {
    const me = document.currentScript && document.currentScript.src;
    if (me && !window.__chOnline) { window.__chOnline = 1; const o = document.createElement('script'); o.src = me.replace(/consent\.js(\?.*)?$/, 'online.js$1'); o.defer = true; document.head.appendChild(o); }
  } catch (e) { /* */ }
  const PIXEL_ID = '2364786587679358';
  const KEY = 'ch_consent'; // 'yes' | 'no'
  const T = {
    ar: { t: 'نستعمل ملفات تعريف الارتباط (Meta Pixel) لقياس فعالية إعلاناتنا وتحسين الموقع، فقط بموافقتك.', yes: 'أوافق', no: 'لا، شكراً', more: 'سياسة الخصوصية' },
    fr: { t: 'Nous utilisons des cookies (Meta Pixel) pour mesurer l’efficacité de nos publicités et améliorer le site, uniquement avec votre accord.', yes: 'J’accepte', no: 'Non merci', more: 'Confidentialité' },
    en: { t: 'We use cookies (Meta Pixel) to measure our ads and improve the site, only with your consent.', yes: 'Accept', no: 'No thanks', more: 'Privacy' }
  };
  const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const set = v => { try { localStorage.setItem(KEY, v); } catch (e) { /* private mode */ } };
  const lang = () => { const l = (window.CH && window.CH.getLang && window.CH.getLang()) || document.documentElement.lang || 'ar'; return T[l] ? l : 'fr'; };

  let loaded = false;
  function loadPixel() {
    if (loaded) return; loaded = true;
    /* Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    (window.__chQueue || []).forEach(([e, p]) => window.fbq('track', e, p || {}));
    window.__chQueue = [];
  }
  window.chTrack = function (event, params) {
    if (get() !== 'yes') return;
    if (window.fbq) window.fbq('track', event, params || {}); else (window.__chQueue = window.__chQueue || []).push([event, params]);
  };
  // reopen the choice (link on the privacy page)
  window.chConsentReset = function () { try { localStorage.removeItem(KEY); } catch (e) { /* */ } showBanner(); };

  function showBanner() {
    if (document.getElementById('ch-consent')) return;
    const t = T[lang()], rtl = lang() === 'ar';
    const d = document.createElement('div');
    d.id = 'ch-consent'; d.setAttribute('role', 'dialog'); d.dir = rtl ? 'rtl' : 'ltr';
    d.innerHTML = `<p>${t.t} <a href="legal.html#privacy" style="color:#f0d79a;text-decoration:underline">${t.more}</a></p><div class="cc-btns"><button type="button" class="cc-no">${t.no}</button><button type="button" class="cc-yes">${t.yes}</button></div>`;
    document.body.appendChild(d);
    d.querySelector('.cc-yes').onclick = () => { set('yes'); d.remove(); loadPixel(); };
    d.querySelector('.cc-no').onclick = () => { set('no'); d.remove(); };
  }
  const st = document.createElement('style');
  st.textContent = `#ch-consent{position:fixed;z-index:9999;left:16px;right:16px;bottom:16px;max-width:720px;margin:0 auto;background:#2b1d38;color:#fff;border-radius:16px;padding:14px 16px;box-shadow:0 12px 40px rgba(0,0,0,.3);display:flex;gap:14px;align-items:center;flex-wrap:wrap;font-size:.92rem;line-height:1.6}
#ch-consent p{margin:0;flex:1 1 320px}#ch-consent .cc-btns{display:flex;gap:8px}#ch-consent button{font:inherit;border-radius:999px;padding:.5rem 1.1rem;cursor:pointer;border:1px solid rgba(255,255,255,.5);background:transparent;color:#fff}
#ch-consent .cc-yes{background:#f0d79a;color:#3b2550;border-color:#f0d79a;font-weight:700}@media (max-width:720px){#ch-consent{bottom:calc(76px + env(safe-area-inset-bottom))}}`;
  document.head.appendChild(st);

  const start = () => { const c = get(); if (c === 'yes') loadPixel(); else if (c !== 'no') showBanner(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
