// "Online now" counter in the footer, using Supabase Realtime Presence.
// No cookie, no personal data: each open tab joins with a random temporary id that disappears when it closes.
// Shown only when at least 2 people are on the site (the visitor + someone else).
(function () {
  'use strict';
  const URL_ = 'https://mhhzppszrqzjktqlgqag.supabase.co', KEY = 'sb_publishable_crFQdc1MqVa0vWgcD3NRrA_WutJxaJX';
  const MIN = 2;
  const T = {
    ar: n => `<span class="ch-dot"></span> متواجدون الآن على الموقع: <b>${n}</b>`,
    fr: n => `<span class="ch-dot"></span> En ligne sur le site en ce moment : <b>${n}</b>`,
    en: n => `<span class="ch-dot"></span> Online on the site right now: <b>${n}</b>`
  };
  const lang = () => { const l = (window.CH && window.CH.getLang && window.CH.getLang()) || document.documentElement.lang || 'ar'; return T[l] ? l : 'fr'; };

  const st = document.createElement('style');
  st.textContent = `.ch-online{display:flex;align-items:center;justify-content:center;gap:.45rem;margin:.6rem 0 0;font-size:.9rem;opacity:.9;width:100%}
.ch-online b{font-weight:700}.ch-dot{width:9px;height:9px;border-radius:50%;background:#3ccf6e;box-shadow:0 0 0 0 rgba(60,207,110,.6);animation:chPulse 2s infinite}
@keyframes chPulse{0%{box-shadow:0 0 0 0 rgba(60,207,110,.6)}70%{box-shadow:0 0 0 8px rgba(60,207,110,0)}100%{box-shadow:0 0 0 0 rgba(60,207,110,0)}}`;
  document.head.appendChild(st);

  let count = 0, el = null;
  function render() {
    const host = document.querySelector('.footer-bottom') || document.querySelector('footer');
    if (!host) return;
    if (!el) { el = document.createElement('p'); el.className = 'ch-online'; el.setAttribute('aria-live', 'polite'); host.appendChild(el); }
    el.hidden = count < MIN;
    el.dir = lang() === 'ar' ? 'rtl' : 'ltr';
    el.innerHTML = T[lang()](count);
  }

  function start() {
    try {
      const client = window.sb || window.supabase.createClient(URL_, KEY, { auth: { persistSession: false, autoRefreshToken: false } });
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      const ch = client.channel('site-online', { config: { presence: { key: id } } });
      ch.on('presence', { event: 'sync' }, () => { count = Object.keys(ch.presenceState()).length; render(); })
        .subscribe(s => { if (s === 'SUBSCRIBED') ch.track({ p: location.pathname.slice(0, 80) }); });
      // re-render when the visitor switches language
      document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-lang],.lang-switch,.lang')) setTimeout(render, 50); });
    } catch (e) { /* never break the page */ }
  }

  function boot() {
    if (window.supabase) return start();
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
    s.onload = start; document.head.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
