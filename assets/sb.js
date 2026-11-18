// Supabase connection (public values only — the publishable/anon key is meant to be in the browser;
// all protection is done by Row Level Security rules in the database).
window.SB_CONFIG = {
  url: 'https://mhhzppszrqzjktqlgqag.supabase.co',
  key: 'sb_publishable_crFQdc1MqVa0vWgcD3NRrA_WutJxaJX'
};
window.sbReady = !!(window.supabase && window.SB_CONFIG.key && !/PASTE_/.test(window.SB_CONFIG.key));
window.sb = window.sbReady ? window.supabase.createClient(window.SB_CONFIG.url, window.SB_CONFIG.key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
}) : null;

// Load the site content: database first, then the static file as a fallback
window.loadSiteContent = async function () {
  if (window.sb) {
    try {
      const { data, error } = await window.sb.from('site_content').select('data').eq('id', 1).maybeSingle();
      if (!error && data && data.data) { window.applyContentPatches(data.data); return data.data; }
    } catch (e) { /* fall back */ }
  }
  const r = await fetch('data/site.json?v=' + Date.now());
  const d = await r.json(); window.applyContentPatches(d); return d;
};

// Public URL for a file in the public bucket, or a short-lived signed URL for the private bucket
window.fileUrl = async function (path) {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  if (!window.sb) return '';
  const [bucket, ...rest] = path.split('/');
  const key = rest.join('/');
  if (bucket === 'public') return window.sb.storage.from('public').getPublicUrl(key).data.publicUrl;
  const { data } = await window.sb.storage.from('private').createSignedUrl(key, 60 * 60 * 3);
  return data ? data.signedUrl : '';
};

// YouTube / Vimeo → embeddable URL
window.embedUrl = function (u) {
  if (!u) return '';
  let m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1`;
  m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return '';
};

// Content additions made by Claude. Applied on top of the saved content until they are saved from the dashboard.
// Each patch runs only if its content is missing, so editing or deleting it in the dashboard is respected once published.
window.applyContentPatches = function (D) {
  if (!D) return false;
  let changed = false;
  D.patches_done = D.patches_done || [];
  const once = (id, fn) => { if (!D.patches_done.includes(id)) { fn(); D.patches_done.push(id); changed = true; } };

  once('thetahealing-2026-11', () => {
    D.soins = D.soins || [];
    if (!D.soins.some(s => s.id === 'thetahealing')) {
      const theta = {
        id: 'thetahealing', categorie: 'energie', icone: 'crystal', theme: 'indigo', image: '', en_ligne: true,
        titre: { ar: 'جلسة ثيتا هيلينغ ThetaHealing®', fr: 'Séance de ThetaHealing®', en: 'ThetaHealing® Session' },
        duree: { ar: '60 دقيقة', fr: '60 min', en: '60 min' },
        prix: { tnd: '130', eur: '50', usd: '55' },
        description: {
          ar: 'تقنية تأمل تعتمد على حالة موجات «ثيتا» الدماغية، للوصول إلى المعتقدات المقيّدة العميقة وتحويلها، وتحرير المشاعر والذكريات التي تعيقك. متوفرة في المركز أو أونلاين.',
          fr: "Technique de méditation basée sur l'état d'ondes cérébrales thêta, pour identifier et transformer les croyances limitantes profondes et libérer les émotions et mémoires qui vous bloquent. Au centre ou en ligne.",
          en: 'A meditation technique using the theta brainwave state to identify and transform deep limiting beliefs and release the emotions and memories holding you back. At the centre or online.'
        }
      };
      const i = D.soins.findIndex(s => s.id === 'reiki');
      D.soins.splice(i >= 0 ? i + 1 : D.soins.length, 0, theta);
    }
    const s = D.settings = D.settings || {};
    const add = (key, lang, find, repl) => {
      if (s[key] && typeof s[key] === 'object' && s[key][lang] && !/theta/i.test(s[key][lang]) && s[key][lang].includes(find)) s[key][lang] = s[key][lang].replace(find, repl);
    };
    add('bio', 'ar', 'الريكي،', 'الريكي، الثيتا هيلينغ (ThetaHealing®)،');
    add('bio', 'fr', 'au Reiki,', 'au Reiki, au ThetaHealing®,');
    add('bio', 'en', 'Reiki,', 'Reiki, ThetaHealing®,');
    if (s.certifs && typeof s.certifs === 'object') {
      const line = { ar: 'ممارسة ThetaHealing®', fr: 'Praticienne ThetaHealing®', en: 'ThetaHealing® practitioner' };
      ['ar', 'fr', 'en'].forEach(l => { if (s.certifs[l] && !/theta/i.test(s.certifs[l])) s.certifs[l] = s.certifs[l].split('\n').reduce((a, x, i) => (i === 0 ? [x, line[l]] : [...a, x]), []).join('\n'); });
    }
  });
  return changed;
};
