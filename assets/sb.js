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
      if (!error && data && data.data) return data.data;
    } catch (e) { /* fall back */ }
  }
  const r = await fetch('data/site.json?v=' + Date.now());
  return r.json();
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
