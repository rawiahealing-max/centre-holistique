// Shared blog helpers — used by the site (browser) and by seo/build-blog.js (Node).
// Article text format (easy to type in the dashboard):
//   empty line = new paragraph · "## Title" = heading · "- item" = list · "> text" = quote
//   **bold** · *italic* · [text](https://link) · a line with only an image URL or ![alt](url) = image
//   a line with only a YouTube / Vimeo link = video
(function (root) {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LANGS = ['ar', 'fr', 'en'];

  function embed(u) {
    let m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1`;
    m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
    return '';
  }
  function inline(s) {
    let h = esc(s);
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|[\w./#?=&-]+\.html[^)\s]*)\)/g, (_, t, u) => {
      const ext = /^https?:/.test(u) && !/centreholistique\.net/.test(u);
      return `<a href="${u}"${ext ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
    });
    h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');
    return h;
  }
  function md(text) {
    const lines = String(text || '').replace(/\r/g, '').split('\n');
    const out = []; let para = [], list = null;
    const flushP = () => { if (para.length) { out.push(`<p>${para.map(inline).join('<br>')}</p>`); para = []; } };
    const flushL = () => { if (list) { out.push(`<ul>${list.map(x => `<li>${inline(x)}</li>`).join('')}</ul>`); list = null; } };
    for (const raw of lines) {
      const l = raw.trim();
      if (!l) { flushP(); flushL(); continue; }
      let m;
      if ((m = l.match(/^#{2,3}\s+(.+)/))) { flushP(); flushL(); out.push(`<h2>${inline(m[1])}</h2>`); continue; }
      if ((m = l.match(/^[-•]\s+(.+)/))) { flushP(); (list = list || []).push(m[1]); continue; }
      if ((m = l.match(/^>\s*(.+)/))) { flushP(); flushL(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); continue; }
      if ((m = l.match(/^!\[([^\]]*)\]\((https?:\/\/\S+)\)$/)) || (m = l.match(/^()(https?:\/\/\S+\.(?:jpe?g|png|webp|gif)(?:\?\S*)?)$/i))) {
        flushP(); flushL(); out.push(`<figure><img src="${esc(m[2])}" alt="${esc(m[1])}" loading="lazy"></figure>`); continue;
      }
      if (/^https?:\/\/\S+$/.test(l) && embed(l)) { flushP(); flushL(); out.push(`<div class="ratio"><iframe src="${esc(embed(l))}" title="video" loading="lazy" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`); continue; }
      flushL(); para.push(l);
    }
    flushP(); flushL();
    return out.join('\n');
  }
  const plain = text => String(text || '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/https?:\/\/\S+/g, '').replace(/[#*>_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const val = (v, l) => v && typeof v === 'object' ? (v[l] || '') : (l === 'ar' ? (v || '') : '');
  const langsOf = p => LANGS.filter(l => val(p.titre, l) && val(p.contenu, l));
  // best language for a visitor: their language if the article has it, otherwise the article's first language
  // (an English visitor gets the French version before the Arabic one, and vice versa)
  const pick = (p, want) => { const ls = langsOf(p); if (ls.includes(want)) return want; const pref = want === 'en' ? ['fr', 'ar'] : want === 'fr' ? ['en', 'ar'] : ['fr', 'en']; return pref.find(l => ls.includes(l)) || ls[0] || want; };
  // "5 min read" in the right grammar for each language
  const readLabel = (n, l) => l === 'ar' ? (n === 1 ? 'دقيقة قراءة' : n === 2 ? 'دقيقتا قراءة' : n <= 10 ? n + ' دقائق قراءة' : n + ' دقيقة قراءة') : l === 'fr' ? n + ' min de lecture' : n + ' min read';
  const excerpt = (p, l, n = 170) => { const r = val(p.resume, l) || plain(val(p.contenu, l)); return r.length > n ? r.slice(0, n).replace(/\s+\S*$/, '') + '…' : r; };
  const minutes = (p, l) => Math.max(1, Math.round(plain(val(p.contenu, l)).split(' ').length / 200));
  const published = D => (D && D.blog || []).filter(p => p.actif !== false && p.slug && langsOf(p).length && (!p.date || p.date <= new Date().toISOString().slice(0, 10)))
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

  const api = { esc, md, inline, plain, val, langsOf, pick, excerpt, minutes, readLabel, published, embed, LANGS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.BLOG = api;
})(typeof window !== 'undefined' ? window : globalThis);
