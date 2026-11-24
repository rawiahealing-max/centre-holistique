(function () {
  'use strict';
  const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = v => v && typeof v === 'object' ? (v.ar || v.fr || v.en || '') : (v || '');
  // ⁦ … ⁩ = left-to-right isolate, so prices don't get scrambled inside Arabic text
  const P = v => { const s = v && typeof v === 'object' ? [v.tnd && v.tnd + ' DT', v.eur && v.eur + ' €', v.usd && '$' + v.usd].filter(Boolean).join(' / ') : (v ? v + ' DT' : ''); return s ? '⁦' + s + '⁩' : ''; };
  const fmtD = d => d ? new Date(d).toLocaleString('ar-TN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
  const slug = s => { const x = (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); return (x || 'item') + '-' + Date.now().toString(36); };
  const sb = window.sb;
  let me = null, content = null, dirty = false, view = 'home', clients = [], chatChannel = null;

  function toast(m) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2200); }
  function status(el, type, m) { el.innerHTML = `<div class="status ${type}">${m}</div>`; }
  const setDirty = v => { dirty = v; $('#dirty').hidden = !v; };
  addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  if (!sb) { document.body.innerHTML = '<p style="padding:40px;text-align:center">Supabase غير مفعّل.</p>'; return; }

  // ================= AUTH =================
  $('#f-login').addEventListener('submit', async e => {
    e.preventDefault(); const f = e.target, m = $('#login-msg');
    const { error } = await sb.auth.signInWithPassword({ email: f.email.value.trim(), password: f.password.value });
    if (error) { m.hidden = false; m.className = 'status err'; m.textContent = 'الإيميل ولا كلمة السر غالطين، ولا الإيميل مازال ما تأكّدش.'; }
  });
  $('#logout').addEventListener('click', async () => { if (dirty && !confirm('فما تعديلات ما تنشرتش. تخرج؟')) return; setDirty(false); await sb.auth.signOut(); location.reload(); });
  sb.auth.onAuthStateChange((ev, s) => { if (ev === 'SIGNED_IN' && !me) boot(); });
  boot();

  async function boot() {
    const { data } = await sb.auth.getSession();
    const user = data.session?.user;
    if (!user) { $('#login').hidden = false; $('#app').hidden = true; return; }
    const { data: p } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
    if (!p || p.role !== 'admin') {
      $('#login').hidden = false; $('#app').hidden = true;
      const m = $('#login-msg'); m.hidden = false; m.className = 'status err';
      m.innerHTML = `الحساب <b dir="ltr">${esc(user.email)}</b> موش مسؤول (admin). <button class="btn sm line" id="lo2">خروج</button>`;
      $('#lo2').onclick = async () => { await sb.auth.signOut(); location.reload(); };
      return;
    }
    me = { ...p, email: user.email };
    $('#login').hidden = true; $('#app').hidden = false; $('#me').textContent = me.email;
    await loadContent();
    refreshCounts(); setInterval(refreshCounts, 60000);
    go(location.hash.slice(1) || 'home');
  }

  async function loadContent() {
    const { data } = await sb.from('site_content').select('data').eq('id', 1).maybeSingle();
    if (data && data.data) {
      content = data.data;
      if (window.applyContentPatches && window.applyContentPatches(content)) { setDirty(true); toast('✨ فما إضافات جديدة من Claude — اضغط «انشر على الموقع» باش تتحفظ'); }
      return;
    }
    // first time: import the content from the static file
    const r = await fetch('data/site.json?v=' + Date.now()); content = await r.json();
    const { error } = await sb.from('site_content').upsert({ id: 1, data: content, updated_at: new Date().toISOString() });
    if (!error) toast('✓ تم نقل محتوى الموقع إلى قاعدة البيانات');
  }
  async function saveContent() {
    const b = $('#btn-save'); b.disabled = true;
    const { error } = await sb.from('site_content').upsert({ id: 1, data: content, updated_at: new Date().toISOString() });
    b.disabled = false;
    if (error) return toast('خطأ: ' + error.message);
    setDirty(false); toast('✓ تم النشر! الموقع تحدّث.');
  }
  $('#btn-save').addEventListener('click', saveContent);

  async function refreshCounts() {
    const { count } = await sb.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending');
    $('#cnt-orders').textContent = count || '';
  }

  // ================= NAV =================
  $('#nav').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) { if (b.dataset.view.startsWith('c:') || b.dataset.view === 'settings' || !dirty || confirm('فما تعديلات ما تنشرتش على محتوى الموقع. تكمّل؟')) go(b.dataset.view); } });
  $('#burger').addEventListener('click', () => $('#side').classList.toggle('open'));
  function go(v) {
    view = v; location.hash = v;
    $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.view === v));
    $('#side').classList.remove('open');
    if (chatChannel) { sb.removeChannel(chatChannel); chatChannel = null; }
    const btn = $(`#nav [data-view="${v}"]`); $('#view-title').textContent = btn ? btn.textContent.replace(/\d+$/, '').trim() : '';
    const V = $('#view'); V.innerHTML = '<p class="muted">…</p>';
    if (v === 'home') return vHome(V);
    if (v === 'orders') return vOrders(V);
    if (v === 'agenda') return vAgenda(V);
    if (v === 'clients') return vClients(V);
    if (v === 'chat') return vChat(V);
    if (v === 'lives') return vLives(V);
    if (v === 'newsletter') return vNewsletter(V);
    if (v === 'lessons') return vLessons(V);
    if (v === 'medits') return vMedits(V);
    if (v === 'media') return vMedia(V);
    if (v === 'settings') return vSettings(V);
    if (v.startsWith('c:')) return vContentList(V, v.slice(2));
  }

  // ================= HOME =================
  async function vHome(V) {
    const [o, c, m, ms] = await Promise.all([
      sb.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      sb.from('profiles').select('id', { count: 'exact', head: true }),
      sb.from('enrollments').select('id', { count: 'exact', head: true }).eq('item_type', 'abonnements').eq('status', 'active'),
      sb.from('messages').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 864e5).toISOString())
    ]);
    V.innerHTML = `<div class="stats">
      <div class="stat" data-go="orders"><b>${o.count || 0}</b><span>⏳ طلبات تستنّى التأكيد</span></div>
      <div class="stat" data-go="clients"><b>${c.count || 0}</b><span>👥 حساب مسجّل</span></div>
      <div class="stat" data-go="clients"><b>${m.count || 0}</b><span>✨ مشترك في الدائرة</span></div>
      <div class="stat" data-go="chat"><b>${ms.count || 0}</b><span>💬 رسالة هالجمعة</span></div></div>
      <div class="panel"><h3>كيفاش تخدم؟ 🌿</h3><ol class="muted" style="padding-inline-start:20px;line-height:2;margin-top:8px">
        <li>كي حريف يطلب حاجة، توصلك على <b>واتساب</b> وتتسجّل في <b>🧾 الطلبات</b>.</li>
        <li>كي يخلّص، اضغط <b>«✓ خلّص — أعطيه الوصول»</b>: الدورة ولا الاشتراك يظهرو وحدهم في «فضائي» متاعو.</li>
        <li>زيد الفيديوات والصوت والـ PDF متاع كل دورة من <b>🎓 محتوى الدورات</b>.</li>
        <li>زيد التأملات من <b>🧘 التأملات</b> (مجانية ولا للأعضاء).</li>
        <li>بدّل أي نص، سعر ولا صورة في الموقع من قسم <b>محتوى الموقع</b>، ومن بعد اضغط <b>«انشر على الموقع»</b>.</li></ol></div>`;
    V.querySelectorAll('[data-go]').forEach(s => s.onclick = () => go(s.dataset.go));
  }

  // ================= ORDERS =================
  let orderFilter = 'pending';
  async function vOrders(V) {
    let q = sb.from('orders').select('*').order('created_at', { ascending: false }).limit(300);
    if (orderFilter !== 'all') q = q.eq('status', orderFilter);
    const { data: os, error } = await q;
    if (error) { V.innerHTML = `<div class="status err">${esc(error.message)}</div>`; return; }
    V.innerHTML = `<div class="filters">${[['pending', '⏳ في الانتظار'], ['paid', '✓ مخلّصة'], ['cancelled', '✕ ملغاة'], ['all', 'الكل']].map(([k, l]) => `<button data-f="${k}" class="${orderFilter === k ? 'active' : ''}">${l}</button>`).join('')}</div>
      ${(os || []).length ? os.map(o => `<div class="item"><div class="grow">
        <b>#${o.id} · ${esc(o.name || '—')}</b> <span class="pill ${esc(o.status)}">${{ pending: 'في الانتظار', paid: 'مخلّصة', cancelled: 'ملغاة' }[o.status]}</span>
        ${o.user_id ? '<span class="pill">👤 عندو حساب</span>' : ''}<br>
        <small>${esc(fmtD(o.created_at))}${o.phone ? ` · <a href="https://wa.me/${esc(o.phone.replace(/\D/g, ''))}" target="_blank" dir="ltr">${esc(o.phone)}</a>` : ''}${o.email ? ` · <span dir="ltr">${esc(o.email)}</span>` : ''}${o.timezone ? ` · 🌍 ${esc(o.timezone)}` : ''}</small>
        <ul class="order-items">${(o.items || []).map(i => `<li>• ${esc(i.title)}${i.option ? ' (' + esc(i.option) + ')' : ''} — <b>${esc(i.price || '')}</b></li>`).join('')}</ul>
        ${o.total ? `<b>المجموع: ${esc(o.total)}</b>` : ''}${o.note ? `<p class="small muted" style="white-space:pre-line">${esc(o.note)}</p>` : ''}
        ${sessBlock(o)}</div>
        <div class="row">${o.status !== 'paid' ? `<button class="btn ok sm" data-pay="${o.id}">✓ خلّص — أعطيه الوصول</button>` : ''}
          ${o.status === 'pending' ? `<button class="btn line sm" data-cancel="${o.id}">✕ إلغاء</button>` : ''}
          <button class="btn danger sm" data-del="${o.id}">🗑</button></div></div>`).join('') : '<p class="muted">ما فمّا حتى طلب.</p>'}`;
    V.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { orderFilter = b.dataset.f; vOrders(V); });
    V.querySelectorAll('[data-cancel]').forEach(b => b.onclick = async () => { await sb.from('orders').update({ status: 'cancelled' }).eq('id', b.dataset.cancel); refreshCounts(); vOrders(V); });
    V.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (!confirm('تفسخ الطلب نهائياً؟')) return; await sb.from('orders').delete().eq('id', b.dataset.del); refreshCounts(); vOrders(V); });
    V.querySelectorAll('[data-pay]').forEach(b => b.onclick = () => confirmPay(os.find(o => String(o.id) === b.dataset.pay), V));
    V.querySelectorAll('[data-ssave]').forEach(b => b.onclick = async () => {
      const id = b.dataset.ssave, box = b.closest('.sess');
      const d = box.querySelector('[name=sd]').value, t = box.querySelector('[name=st]').value, url = box.querySelector('[name=su]').value.trim();
      if (url && url !== 'chat' && !/^https?:\/\//.test(url)) return toast('الرابط لازم يبدا بـ https://');
      const { error } = await sb.from('orders').update({ meeting_url: url || null, session_at: d ? toTunisISO(d, t || '10:00') : null }).eq('id', id);
      if (error) return toast(/column|schema/i.test(error.message) ? '⚠️ لازم تشغّلي ملف video.sql في Supabase مرة وحدة الأول.' : 'خطأ: ' + error.message);
      toast('✓ تحفظت الجلسة — الحريف يلقاها في «حسابي»'); vOrders(V);
    });
    V.querySelectorAll('[data-schat]').forEach(b => b.onclick = () => { const i = b.closest('.sess').querySelector('[name=su]'); i.value = 'chat'; toast('اضغط «💾 حفظ»'); });
    V.querySelectorAll('[data-sdm]').forEach(b => b.onclick = () => { chatRoom = 'dm:' + b.dataset.sdm; go('chat'); });
  }

  // ---------- online sessions (Google Meet / YouTube) ----------
  // Tunisia is UTC+1 all year (no daylight saving)
  const toTunisISO = (d, t) => `${d}T${t}:00+01:00`;
  const tunisParts = iso => { if (!iso) return { d: '', t: '' }; const x = new Date(new Date(iso).getTime() + 3600e3).toISOString(); return { d: x.slice(0, 10), t: x.slice(11, 16) }; };
  function waSessionLink(o) {
    const p = tunisParts(o.session_at), ph = (o.phone || '').replace(/\D/g, '');
    const txt = `السلام عليكم ${o.name || ''} 🌿\nموعد جلستك أونلاين${p.d ? `: ${p.d} على الساعة ${p.t} (توقيت تونس)` : ''}.\n${o.meeting_url === 'chat' ? 'الاستشارة تكون بالشات داخل الموقع: ادخل لـ «حسابي» ← 💬 الشات.' : 'رابط الجلسة: ' + o.meeting_url}\n${o.user_id ? 'تنجم تدخل زادة من «حسابي» في الموقع: https://www.centreholistique.net/account.html?tab=orders\n' : ''}راوية غربال – Centre Holistique`;
    return `https://wa.me/${ph}?text=${encodeURIComponent(txt)}`;
  }
  function sessBlock(o) {
    const p = tunisParts(o.session_at), mode = (o.items || []).map(i => i.format).find(f => ['audio', 'video', 'chat'].includes(f));
    const modeTxt = { audio: '📞 مكالمة صوتية', video: '🎥 فيديو', chat: '💬 شات' }[mode] || '';
    return `<details class="sess" ${o.meeting_url || mode ? 'open' : ''}><summary>🎥 جلسة أونلاين ${modeTxt ? `<span class="pill">${modeTxt}</span>` : ''} ${o.meeting_url ? `<span class="pill paid">${esc(p.d)} ${esc(p.t)}</span>` : '<span class="muted small">(صوت، فيديو أو شات)</span>'}</summary>
      <div class="sess-grid"><label>التاريخ<input type="date" name="sd" value="${esc(p.d)}"></label><label>الساعة (توقيت تونس)<input type="time" name="st" value="${esc(p.t)}"></label>
      <label class="full">رابط الجلسة (Google Meet، Zoom، WhatsApp…)<input name="su" dir="ltr" placeholder="https://meet.google.com/abc-defg-hij" value="${esc(o.meeting_url || '')}"></label></div>
      <div class="row"><a class="btn line sm" href="https://meet.google.com/new" target="_blank" rel="noopener">➕ اعمل رابط Meet جديد</a><button type="button" class="btn line sm" data-schat>💬 شات في الموقع</button><button class="btn gold sm" data-ssave="${o.id}">💾 حفظ</button>
      ${o.meeting_url && o.phone ? `<a class="btn ok sm" href="${esc(waSessionLink(o))}" target="_blank" rel="noopener">📲 ابعثلو الرابط على واتساب</a>` : ''}${o.meeting_url === 'chat' && o.user_id ? `<button type="button" class="btn line sm" data-sdm="${esc(o.user_id)}">💬 افتح الشات متاعو</button>` : (o.meeting_url && o.meeting_url !== 'chat' ? `<a class="btn line sm" href="${esc(o.meeting_url)}" target="_blank" rel="noopener">▶ ادخل للجلسة</a>` : '')}</div>
      <p class="hint">📞/🎥 صوت ولا فيديو: «اعمل رابط Meet جديد» ← انسخ الرابط ← حطّو هنا وحفظ (في المكالمة الصوتية الحريف يسكّر الكاميرا). 💬 شات: اضغط «شات في الموقع» وحفظ، والحريف يكتبلك من «حسابي» وإنتِ تجاوبيه من 💬 الشات هنا.</p></details>`;
  }

  // ================= AGENDA (appointments) =================
  // Mon–Sat 10:00–19:00 Tunis time · 1 h break after each session · a time chosen on the site is held 48 h until payment
  const AG_BREAK = 60;
  const agDay = iso => new Date(iso).toLocaleDateString('ar-TN', { timeZone: 'Africa/Tunis', weekday: 'long', day: 'numeric', month: 'long' });
  const agTime = iso => new Date(iso).toLocaleTimeString('ar-TN', { timeZone: 'Africa/Tunis', hour: '2-digit', minute: '2-digit' });
  function agWa(b) {
    const ph = (b.phone || '').replace(/\D/g, '');
    const txt = `السلام عليكم ${b.name || ''} 🌿\nنذكّرك بموعدك في Centre Holistique: ${agDay(b.start_at)} على الساعة ${agTime(b.start_at)} (توقيت تونس)${b.service ? '\n' + b.service : ''}.\nفي انتظارك 🤍`;
    return `https://wa.me/${ph}?text=${encodeURIComponent(txt)}`;
  }
  async function vAgenda(V) {
    const from = new Date(Date.now() - 2 * 864e5).toISOString();
    await sb.rpc('agenda_busy', { p_from: from, p_to: from }); // frees the expired 48 h holds
    const [{ data, error }, feed] = await Promise.all([
      sb.from('bookings').select('*').gte('start_at', from).in('status', ['hold', 'confirmed']).order('start_at').limit(500),
      sb.from('app_secrets').select('value').eq('key', 'agenda_feed_token').maybeSingle()
    ]);
    if (error) { V.innerHTML = `<div class="status err">${esc(error.message)}</div>`; return; }
    const list = data || [], now = Date.now();
    const upcoming = list.filter(b => Date.parse(b.end_at) > now);
    const feedUrl = feed && feed.data && feed.data.value ? `https://mhhzppszrqzjktqlgqag.supabase.co/functions/v1/agenda-ics?t=${feed.data.value}` : '';
    const days = {}; list.forEach(b => { const k = new Date(Date.parse(b.start_at) + 3600e3).toISOString().slice(0, 10); (days[k] = days[k] || []).push(b); });
    const today = new Date(now + 3600e3).toISOString().slice(0, 10);
    V.innerHTML = `<div class="stats">
        <div class="stat"><b>${upcoming.filter(b => b.kind === 'client' && b.status === 'confirmed').length}</b><span>✅ موعد مؤكّد قادم</span></div>
        <div class="stat"><b>${upcoming.filter(b => b.status === 'hold').length}</b><span>⏳ محجوز يستنّى الخلاص (48 س)</span></div>
        <div class="stat"><b>${(days[today] || []).filter(b => b.kind === 'client').length}</b><span>📅 مواعيد اليوم</span></div></div>
      <div class="panel"><h3 style="margin-top:0">➕ زيد موعد (حريف بالواتساب) ولا سكّر وقت</h3>
        <form id="ag-form" class="sess-grid">
          <label>النوع<select name="kind"><option value="client">👤 موعد حريف</option><option value="block">🚫 وقت مسكّر (عطلة / خاص)</option></select></label>
          <label>الحالة<select name="status"><option value="confirmed">✅ مؤكّد (خلّص)</option><option value="hold">⏳ يستنّى الخلاص (48 س)</option></select></label>
          <label>التاريخ<input type="date" name="d" required></label>
          <label>الساعة (توقيت تونس)<input type="time" name="t" step="1800" required value="10:00"></label>
          <label>المدّة<select name="min"><option>30</option><option>45</option><option selected>60</option><option>75</option><option>90</option><option>120</option><option>180</option><option value="540">النهار الكل</option></select></label>
          <label>الجلسة<input name="service" placeholder="مثلاً: ثيتا هيلينغ"></label>
          <label>الاسم<input name="name"></label>
          <label>الهاتف / واتساب<input name="phone" dir="ltr" placeholder="+216…"></label>
          <label>الإيميل (يوصلو تأكيد وتذكير)<input name="email" type="email" dir="ltr" placeholder="exemple@gmail.com"></label>
          <label>الطريقة<select name="mode"><option value="">—</option><option value="cabinet">🏡 في المركز</option><option value="video">🎥 فيديو</option><option value="audio">📞 صوت</option><option value="chat">💬 شات</option></select></label>
          <label class="full">ملاحظة<input name="note"></label>
          <div class="full row"><button class="btn gold" type="submit">💾 زيد في الأجندة</button><span class="muted small">بعد كل جلسة تتحسب ساعة استراحة أوتوماتيك، والوقت يتسكّر في الموقع.</span></div>
        </form></div>
      ${feedUrl ? `<div class="panel"><h3 style="margin-top:0">📲 المواعيد الكل في كالندار تليفونك</h3>
        <p class="muted small">زيدي الرابط هذا مرّة وحدة في <b>Google Calendar</b> (من الكمبيوتر: «Autres agendas» ← «+» ← «À partir de l’URL»)، والمواعيد الكل يظهرو وحدهم في تليفونك. Google يحدّثو كل بضعة ساعات. ⚠️ الرابط سرّي، ما تبعثيهولش لحد.</p>
        <div class="row"><input id="ag-feed" dir="ltr" readonly value="${esc(feedUrl)}" style="flex:1;min-width:240px"><button class="btn line" id="ag-copy">📋 انسخ</button><a class="btn line" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/r/settings/addbyurl">➕ افتح Google Calendar</a></div></div>` : ''}
      ${Object.keys(days).length ? Object.entries(days).map(([d, bs]) => `<div class="panel"><h3 style="margin-top:0">${d === today ? '🌟 اليوم · ' : ''}${esc(agDay(d + 'T12:00:00+01:00'))}</h3>
        ${bs.map(b => `<div class="order ${b.status === 'hold' ? 'pending' : ''}" style="margin-bottom:8px"><div>
          <b>${esc(agTime(b.start_at))} → ${esc(agTime(b.end_at))}</b>
          ${b.kind === 'block' ? '<span class="pill">🚫 وقت مسكّر</span>' : b.status === 'confirmed' ? '<span class="pill paid">✅ مؤكّد</span>' : `<span class="pill">⏳ محجوز حتى ${esc(fmtD(b.hold_until))}</span>`}
          ${b.source === 'site' ? '<span class="pill">🌐 من الموقع</span>' : ''}${b.order_id ? `<span class="pill">🧾 طلب #${b.order_id}</span>` : ''}<br>
          ${b.service ? esc(b.service) + ' · ' : ''}${esc(b.name || '')}${b.phone ? ` · <a href="https://wa.me/${esc(b.phone.replace(/\D/g, ''))}" target="_blank" dir="ltr">${esc(b.phone)}</a>` : ''}${b.mode ? ` · ${esc(b.mode)}` : ''}
          ${b.note ? `<p class="small muted" style="white-space:pre-line;margin:.3rem 0 0">${esc(b.note)}</p>` : ''}</div>
          <div class="row">${b.status === 'hold' ? `<button class="btn ok sm" data-agok="${b.id}">✅ أكّد</button>` : ''}
            ${b.phone && b.kind === 'client' ? `<a class="btn line sm" href="${esc(agWa(b))}" target="_blank" rel="noopener">📲 ذكّرو</a>` : ''}
            <button class="btn line sm" data-agx="${b.id}">✕ ألغي (يتحلّ الوقت)</button></div></div>`).join('')}</div>`).join('') : '<div class="panel"><p class="muted">ما فمّا حتى موعد قادم.</p></div>'}`;
    const f = $('#ag-form');
    f.d.value = new Date(now + 3600e3).toISOString().slice(0, 10);
    f.kind.onchange = () => { f.status.value = 'confirmed'; f.status.disabled = f.kind.value === 'block'; };
    f.onsubmit = async e => {
      e.preventDefault();
      const block = f.kind.value === 'block', min = +f.min.value;
      const start = block && min === 540 ? `${f.d.value}T10:00:00+01:00` : `${f.d.value}T${f.t.value}:00+01:00`;
      const s0 = Date.parse(start), e0 = s0 + (block && min === 540 ? 540 : min) * 6e4;
      if (!block && (!f.name.value.trim())) return toast('اكتب اسم الحريف');
      const row = { start_at: new Date(s0).toISOString(), end_at: new Date(e0).toISOString(), block_end: new Date(e0 + (block ? 0 : AG_BREAK * 6e4)).toISOString(),
        status: block ? 'confirmed' : f.status.value, hold_until: !block && f.status.value === 'hold' ? new Date(now + 48 * 3600e3).toISOString() : null,
        kind: block ? 'block' : 'client', service: f.service.value.trim() || (block ? 'وقت مسكّر' : ''), name: f.name.value.trim(), phone: f.phone.value.trim(),
        mode: f.mode.value, note: f.note.value.trim(), email: f.email.value.trim() || null, source: 'admin' };
      const { error: er } = await sb.from('bookings').insert(row);
      if (er) return toast(/no_overlap|exclusion|conflict/i.test(er.message + er.code) ? '⚠️ الوقت هذا (ولا ساعة الاستراحة متاعو) محجوز من قبل. اختاري وقت آخر.' : 'خطأ: ' + er.message);
      toast('✓ تزاد في الأجندة، والوقت تسكّر في الموقع'); vAgenda(V);
    };
    V.querySelectorAll('[data-agok]').forEach(b => b.onclick = async () => { const { error: er } = await sb.from('bookings').update({ status: 'confirmed', hold_until: null }).eq('id', b.dataset.agok); if (er) return toast('خطأ: ' + er.message); toast('✓ تأكّد'); vAgenda(V); });
    V.querySelectorAll('[data-agx]').forEach(b => b.onclick = async () => { if (!confirm('تلغي الموعد؟ الوقت يرجع فارغ في الموقع.')) return; await sb.from('bookings').update({ status: 'cancelled' }).eq('id', b.dataset.agx); toast('✓ تلغى'); vAgenda(V); });
    const cp = $('#ag-copy'); if (cp) cp.onclick = async () => { try { await navigator.clipboard.writeText($('#ag-feed').value); toast('✓ تنسخ'); } catch { $('#ag-feed').select(); } };
  }

  // ================= LIVES =================
  async function vLives(V) {
    const { data: ls, error } = await sb.from('lives').select('*').order('starts_at', { ascending: false }).limit(100);
    if (error) { V.innerHTML = `<div class="panel"><div class="status err">⚠️ لازم تشغّلي ملف <b>video.sql</b> في Supabase مرة وحدة باش يخدم قسم اللايفات.<br><small dir="ltr">${esc(error.message)}</small></div></div>`; return; }
    const now = Date.now();
    V.innerHTML = `<div class="panel"><div class="row between"><h3>🔴 اللايفات والجلسات الجماعية</h3><button class="btn gold" id="addlive">+ لايف جديد</button></div>
      <p class="hint" style="margin-top:6px">حط رابط <b>Google Meet</b> (الناس يحكيو ويبانو، حتى 100 شخص) ولا رابط <b>يوتيوب لايف</b> (يتعرض داخل الموقع، بلا حد). «للأعضاء فقط» = الرابط ما يبانش كان للمشتركين في الدائرة.</p>
      <div id="llives">${(ls || []).length ? ls.map(l => { const p = tunisParts(l.starts_at), past = new Date(l.starts_at).getTime() + (l.duration_min + 60) * 6e4 < now;
        return `<div class="item"><div class="grow"><b>${/youtu/.test(l.url || '') ? '📺' : '🎥'} ${esc(L(l.title))}</b> ${l.members_only ? '<span class="pill">✨ للأعضاء</span>' : '<span class="pill paid">مفتوح للجميع</span>'}${l.active ? '' : '<span class="pill off">مخفي</span>'}${past ? '<span class="pill off">فات</span>' : ''}
        <br><small>${esc(p.d)} · ${esc(p.t)} (توقيت تونس) · ${l.duration_min} دقيقة</small><br><small dir="ltr">${esc(l.url || '⚠️ ما فماش رابط')}</small></div>
        <div class="row">${l.url ? `<a class="btn line sm" href="${esc(l.url)}" target="_blank" rel="noopener">▶ افتح</a>` : ''}<button class="btn line sm" data-edit-live="${l.id}">تعديل</button><button class="btn danger sm" data-del-live="${l.id}">🗑</button></div></div>`; }).join('') : '<p class="muted">ما فمّا حتى لايف. اضغط «+ لايف جديد».</p>'}</div></div>`;
    $('#addlive').onclick = () => liveDialog(null, V);
    V.querySelectorAll('[data-edit-live]').forEach(b => b.onclick = () => liveDialog(ls.find(l => String(l.id) === b.dataset.editLive), V));
    V.querySelectorAll('[data-del-live]').forEach(b => b.onclick = async () => { if (!confirm('تفسخ اللايف؟')) return; await sb.from('lives').delete().eq('id', b.dataset.delLive); vLives(V); });
  }
  function liveDialog(l, V) {
    l = l || { title: {}, description: {}, duration_min: 60, members_only: true, active: true };
    const p = tunisParts(l.starts_at), f = $('#dlg-form');
    f.innerHTML = `<h2>${l.id ? 'تعديل' : 'لايف جديد'}</h2><div class="g2">
      ${field(['title', 'العنوان (مثلاً: تأمل القمر الجديد)', 'i'], l.title)}
      <label>التاريخ<input type="date" name="ld" required value="${esc(p.d)}"></label>
      <label>الساعة (توقيت تونس)<input type="time" name="lt" required value="${esc(p.t || '20:00')}"></label>
      <label>المدة بالدقائق<input type="number" name="dur" min="10" step="5" value="${esc(l.duration_min || 60)}"></label>
      <label class="full">الرابط: Google Meet ولا يوتيوب لايف<div class="upl"><input name="url" dir="ltr" placeholder="https://meet.google.com/… ولا https://youtube.com/live/…" value="${esc(l.url || '')}"><a class="btn line sm" href="https://meet.google.com/new" target="_blank" rel="noopener">➕ Meet</a></div>
        <span class="hint">تنجم تحط الرابط من توّا ولا قبل اللايف بشوية.</span></label>
      <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="members_only" ${l.members_only ? 'checked' : ''}> ✨ للأعضاء فقط</label>
      <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="active" ${l.active !== false ? 'checked' : ''}> ظاهر في الموقع</label>
      ${field(['description', 'وصف قصير (اختياري)', 'it'], l.description)}</div>
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel" formnovalidate>إلغاء</button><button class="btn gold" value="ok">حفظ</button></div>`;
    const d = $('#dlg'); d.returnValue = ''; d.showModal();
    d.onclose = async () => {
      if (d.returnValue !== 'ok') return;
      if (!f.ld.value) return toast('اختار التاريخ.');
      const url = f.url.value.trim();
      if (url && !/^https?:\/\//.test(url)) return toast('الرابط لازم يبدا بـ https://');
      const row = { title: readField(f, ['title', '', 'i']), description: readField(f, ['description', '', 'it']), starts_at: toTunisISO(f.ld.value, f.lt.value || '20:00'),
        duration_min: Math.max(10, +f.dur.value || 60), url: url || null, members_only: f.members_only.checked, active: f.active.checked };
      await autoFill(row, [['title', '', 'i'], ['description', '', 'it']]);
      const r = l.id ? await sb.from('lives').update(row).eq('id', l.id) : await sb.from('lives').insert(row);
      if (r.error) return toast('خطأ: ' + r.error.message);
      toast('✓ تحفظ'); vLives(V);
    };
  }
  async function loadClients() { const { data } = await sb.from('profiles').select('*').order('created_at', { ascending: false }); clients = data || []; return clients; }
  async function confirmPay(o, V) {
    await loadClients();
    const grantable = (o.items || []).filter(i => ['formations', 'abonnements'].includes(i.type));
    let uid = o.user_id || (clients.find(c => o.email && c.email && c.email.toLowerCase() === o.email.toLowerCase()) || clients.find(c => o.phone && c.phone && c.phone.replace(/\D/g, '').endsWith(o.phone.replace(/\D/g, '').slice(-8))) || {}).id || '';
    const f = $('#dlg-form');
    f.innerHTML = `<h2>تأكيد الدفع — طلب #${o.id}</h2>
      ${grantable.length ? `<p class="muted">الحاجات هاذي باش تتحلّ في «فضائي» متاع الحريف:</p><ul class="order-items">${grantable.map(i => `<li>✓ ${esc(i.title)}${i.type === 'abonnements' ? ` (${i.format === 'y' ? 'سنة' : 'شهر'})` : ''}</li>`).join('')}</ul>
        <label>حساب الحريف<select name="uid"><option value="">— اختار —</option>${clients.map(c => `<option value="${c.id}" ${c.id === uid ? 'selected' : ''}>${esc(c.full_name || '—')} · ${esc(c.email)}</option>`).join('')}</select></label>
        <p class="hint">إذا الحريف ما عندوش حساب، قلّو يعمل حساب من «حسابي» في الموقع، ومن بعد ارجع هنا.</p>` : '<p class="muted">الطلب هذا (جلسة / قراءة) ما فيهش محتوى أونلاين. باش يتسجّل «مخلّص» برك.</p>'}
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel" formnovalidate>رجوع</button><button class="btn ok" value="ok">✓ تأكيد</button></div>`;
    const d = $('#dlg'); d.returnValue = ''; d.showModal();
    d.onclose = async () => {
      if (d.returnValue !== 'ok') return;
      const user_id = f.uid ? f.uid.value : '';
      if (grantable.length && !user_id) return toast('اختار حساب الحريف باش يتعطى الوصول.');
      for (const i of grantable) {
        let expires = null;
        if (i.type === 'abonnements') { const dt = new Date(); i.format === 'y' ? dt.setFullYear(dt.getFullYear() + 1) : dt.setMonth(dt.getMonth() + 1); expires = dt.toISOString(); }
        const { error } = await sb.from('enrollments').insert({ user_id, item_type: i.type, item_id: i.id, title: i.title, expires_at: expires });
        if (error) return toast('خطأ: ' + error.message);
      }
      await sb.from('orders').update({ status: 'paid', user_id: user_id || o.user_id }).eq('id', o.id);
      toast('✓ تم! الحريف عندو الوصول توا.'); refreshCounts(); vOrders(V);
    };
  }

  // ================= CLIENTS =================
  async function vClients(V) {
    await loadClients();
    const { data: ens } = await sb.from('enrollments').select('*').order('created_at', { ascending: false });
    const by = {}; (ens || []).forEach(e => (by[e.user_id] = by[e.user_id] || []).push(e));
    V.innerHTML = `<div class="panel"><input id="csearch" placeholder="🔍 لوّج بالاسم، الإيميل ولا التليفون"></div>
      <div class="panel" style="padding:0;overflow:auto"><table><thead><tr><th>الاسم</th><th>الإيميل</th><th>الهاتف</th><th>البلد</th><th>الوصول</th></tr></thead><tbody id="ctable"></tbody></table></div>`;
    const draw = () => {
      const q = $('#csearch').value.toLowerCase();
      $('#ctable').innerHTML = clients.filter(c => !q || [c.full_name, c.email, c.phone].join(' ').toLowerCase().includes(q)).map(c => {
        const act = (by[c.id] || []).filter(e => e.status === 'active');
        return `<tr class="click" data-c="${c.id}"><td><b>${esc(c.full_name || '—')}</b>${c.role === 'admin' ? ' <span class="pill">admin</span>' : ''}</td><td dir="ltr">${esc(c.email)}</td><td dir="ltr">${esc(c.phone || '')}</td><td>${esc(c.country || '')}</td>
          <td>${act.map(e => `<span class="pill active">${e.item_type === 'abonnements' ? '✨' : '🎓'} ${esc(e.title || e.item_id)}</span>`).join(' ')}</td></tr>`;
      }).join('') || '<tr><td colspan="5" class="muted">ما فمّا حتى حريف.</td></tr>';
    };
    $('#csearch').oninput = draw; draw();
    $('#ctable').onclick = e => { const r = e.target.closest('[data-c]'); if (r) clientDialog(clients.find(c => c.id === r.dataset.c), by[r.dataset.c] || [], V); };
  }
  function clientDialog(c, ens, V) {
    const f = $('#dlg-form'), items = [...(content.formations || []).map(x => ['formations', x]), ...(content.abonnements || []).map(x => ['abonnements', x])];
    const nextMonth = new Date(); nextMonth.setMonth(nextMonth.getMonth() + 1);
    f.innerHTML = `<h2>${esc(c.full_name || c.email)}</h2>
      <p class="muted"><span dir="ltr">${esc(c.email)}</span>${c.phone ? ` · <a href="https://wa.me/${esc(c.phone.replace(/\D/g, ''))}" target="_blank" dir="ltr">${esc(c.phone)}</a>` : ''} · ${esc(c.country || '')} · ${esc(fmtD(c.created_at))}</p>
      <h3>الوصول (دورات / اشتراك)</h3>
      <div>${ens.length ? ens.map(e => `<div class="item"><div class="grow"><b>${e.item_type === 'abonnements' ? '✨' : '🎓'} ${esc(e.title || e.item_id)}</b> <span class="pill ${e.status}">${e.status}</span><br><small>${e.expires_at ? 'حتى ' + esc(fmtD(e.expires_at)) : 'بلا تاريخ نهاية'}</small></div>
        ${e.status === 'active' ? `<button class="btn danger sm" type="button" data-revoke="${e.id}">سكّر الوصول</button>` : ''}</div>`).join('') : '<p class="muted">ما عندو حتى وصول.</p>'}</div>
      <h3>زيد وصول</h3>
      <div class="g2"><label>الدورة / الاشتراك<select name="it">${items.map(([t, x]) => `<option value="${t}:${esc(x.id)}">${t === 'abonnements' ? '✨' : '🎓'} ${esc(L(x.titre))}</option>`).join('')}</select></label>
        <label>ينتهي في (اختياري)<input type="date" name="exp"></label></div>
      <p class="hint">للاشتراك الشهري حط تاريخ النهاية (مثلاً ${nextMonth.toISOString().slice(0, 10)}). للدورات خلّيه فارغ.</p>
      <div class="row"><button class="btn ok" type="button" id="grant">+ أعطي الوصول</button>
        ${c.id !== me.id ? `<button class="btn line" type="button" id="mkadmin">${c.role === 'admin' ? 'نحّي دور المسؤول' : 'اجعله مسؤول (admin)'}</button>` : ''}
        <a class="btn line" href="#chat" id="tochat">💬 ابعثلو ميساج</a></div>
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel">سكّر</button></div>`;
    const d = $('#dlg'); d.returnValue = ''; d.showModal(); d.onclose = null;
    f.querySelectorAll('[data-revoke]').forEach(b => b.onclick = async () => { await sb.from('enrollments').update({ status: 'cancelled' }).eq('id', b.dataset.revoke); d.close(); toast('✓ تسكّر'); vClients(V); });
    $('#grant').onclick = async () => {
      const [t, id] = f.it.value.split(':'), x = (content[t] || []).find(y => y.id === id);
      const exp = f.exp.value ? new Date(f.exp.value + 'T23:59:00').toISOString() : null;
      // no duplicates: if this client already has active access to it, only update the end date
      const dup = await sb.from('enrollments').select('id').eq('user_id', c.id).eq('item_type', t).eq('item_id', id).eq('status', 'active');
      if ((dup.data || []).length) { await sb.from('enrollments').update({ expires_at: exp }).eq('id', dup.data[0].id); d.close(); toast('✓ لديه الوصول مسبقاً، تم تحديث التاريخ فقط'); return vClients(V); }
      const { error } = await sb.from('enrollments').insert({ user_id: c.id, item_type: t, item_id: id, title: L(x?.titre), expires_at: exp });
      if (error) return toast('خطأ: ' + error.message);
      d.close(); toast('✓ تعطى الوصول'); vClients(V);
    };
    const mk = $('#mkadmin'); if (mk) mk.onclick = async () => { if (!confirm('متأكّد؟ المسؤول يتحكّم في كل شي.')) return; await sb.from('profiles').update({ role: c.role === 'admin' ? 'client' : 'admin' }).eq('id', c.id); d.close(); vClients(V); };
    $('#tochat').onclick = e => { e.preventDefault(); d.close(); chatRoom = 'dm:' + c.id; go('chat'); };
  }

  // ================= NEWSLETTER =================
  async function vNewsletter(V) {
    const { data: subs, error } = await sb.from('subscribers').select('*').order('created_at', { ascending: false });
    if (error) { V.innerHTML = `<div class="status err">${esc(error.message)}<br>إذا مكتوب «subscribers does not exist»: لازم تخدّم كود SQL متاع النشرة في Supabase.</div>`; return; }
    const list = subs || [];
    V.innerHTML = `<div class="stats"><div class="stat"><b>${list.length}</b><span>💌 مشترك في النشرة</span></div>
        <div class="stat"><b>${list.filter(s => Date.now() - new Date(s.created_at) < 7 * 864e5).length}</b><span>جدد هالجمعة</span></div></div>
      <div class="panel"><div class="row between"><p class="muted">انسخ الإيميلات وابعثلهم من Gmail (حطّهم في <b>Cci / BCC</b> باش ما يشوفوش بعضهم)، ولا حمّل الملف وارفعو في Brevo.</p>
        <div class="row"><button class="btn gold" id="nl-copy">📋 انسخ الإيميلات الكل</button><button class="btn line" id="nl-csv">⬇️ تحميل Excel (CSV)</button></div></div></div>
      <div class="panel" style="padding:0;overflow:auto"><table><thead><tr><th>الاسم</th><th>الإيميل</th><th>اللغة</th><th>التاريخ</th><th></th></tr></thead><tbody>
      ${list.map(s => `<tr><td>${esc(s.name || '—')}</td><td dir="ltr">${esc(s.email)}</td><td>${esc((s.lang || '').toUpperCase())}</td><td>${esc(fmtD(s.created_at))}</td><td><button class="btn danger sm" data-del-sub="${s.id}">🗑</button></td></tr>`).join('') || '<tr><td colspan="5" class="muted">ما فمّا حتى مشترك لتوا.</td></tr>'}
      </tbody></table></div>`;
    $('#nl-copy').onclick = async () => { const t = list.map(s => s.email).join(', '); try { await navigator.clipboard.writeText(t); toast(`✓ تنسخو ${list.length} إيميل`); } catch { prompt('انسخ:', t); } };
    $('#nl-csv').onclick = () => {
      const rows = [['name', 'email', 'lang', 'date'], ...list.map(s => [s.name || '', s.email, s.lang || '', s.created_at])];
      const csv = '﻿' + rows.map(r => r.map(x => '"' + String(x).replace(/"/g, '""') + '"').join(',')).join('\n');
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'newsletter-centre-holistique.csv'; a.click();
    };
    V.querySelectorAll('[data-del-sub]').forEach(b => b.onclick = async () => { if (!confirm('تفسخ المشترك؟')) return; await sb.from('subscribers').delete().eq('id', b.dataset.delSub); vNewsletter(V); });
  }

  // ================= CHAT =================
  let chatRoom = 'cercle';
  async function vChat(V) {
    await loadClients();
    const { data: recent } = await sb.from('messages').select('room,body,created_at,author_name').order('created_at', { ascending: false }).limit(500);
    const rooms = {}; (recent || []).forEach(m => { if (!rooms[m.room]) rooms[m.room] = m; });
    if (!rooms.cercle) rooms.cercle = null;
    // one group per published course (participants only), listed even before the first message
    const courses = ((content && content.formations) || []).filter(f => f.actif !== false);
    courses.forEach(f => { if (!(('course:' + f.id) in rooms)) rooms['course:' + f.id] = null; });
    if (chatRoom.startsWith('dm:') && !(chatRoom in rooms)) rooms[chatRoom] = null;
    const fl = await sb.from('chat_flags').select('*');
    const flags = {}; (fl.data || []).forEach(f => { flags[f.room] = f; });
    const name = r => r === 'cercle' ? '✨ شات الدائرة (الأعضاء)'
      : r.startsWith('course:') ? '👥 مجموعة: ' + esc(L(((content && content.formations) || []).find(f => 'course:' + f.id === r)?.titre) || r.slice(7))
      : '💌 ' + esc((clients.find(c => 'dm:' + c.id === r) || {}).full_name || 'عميل');
    const isDm = chatRoom.startsWith('dm:'), urgent = !!(flags[chatRoom] && flags[chatRoom].urgent);
    // discreet list: no message text in the list, only the time of the last message
    V.innerHTML = `<div class="chatwrap"><div class="rooms" id="rooms">${Object.keys(rooms).sort((x, y) => (flags[y]?.urgent ? 1 : 0) - (flags[x]?.urgent ? 1 : 0)).map(r => `<button data-room="${esc(r)}" class="${r === chatRoom ? 'active' : ''} ${flags[r]?.urgent ? 'urgent' : ''}"><b>${flags[r]?.urgent ? '🚩 ' : ''}${name(r)}</b><small>${rooms[r] ? 'آخر رسالة: ' + esc(fmtD(rooms[r].created_at)) : '—'}</small></button>`).join('')}</div>
      <div class="chatbox ${isDm ? 'calm' : ''}">${isDm ? `<div class="chat-tools"><span>🔒 محادثة خاصة: لا يراها إلا الحريف وإنتِ</span>
        <button class="btn sm ${urgent ? 'danger' : 'line'}" id="flagurg">${urgent ? '🚩 عاجلة — نحّي العلامة' : '🚩 علّمها عاجلة'}</button>
        <button class="btn danger sm" id="delconv">🗑 فسخ المحادثة كاملة</button></div>
        ${urgent ? '<div class="status err" style="margin:6px 10px">🚩 محادثة عاجلة. كان الحريف في خطر، شجّعو يتّصل حالاً بالإسعاف 190 ولا الشرطة 197 (ولا رقم الطوارئ في بلادو).</div>' : ''}` : ''}
        <div class="msgs" id="msgs"></div><div class="typing" id="atyping" hidden>الحريف يكتب…</div>
        <form class="chatform" id="cform"><input name="body" placeholder="اكتب ميساج…" autocomplete="off"><button class="btn">إرسال</button></form></div></div>`;
    if (isDm) {
      $('#flagurg').onclick = async () => {
        const { error } = await sb.from('chat_flags').upsert({ room: chatRoom, urgent: !urgent, updated_at: new Date().toISOString() });
        if (error) return toast(/relation|schema|exist/i.test(error.message) ? '⚠️ لازم تشغّلي ملف video.sql في Supabase الأول.' : 'خطأ: ' + error.message);
        vChat(V);
      };
      $('#delconv').onclick = async () => {
        if (!confirm('تفسخ المحادثة هاذي كاملة نهائياً؟ ما تنجمش ترجعها.')) return;
        const { error } = await sb.from('messages').delete().eq('room', chatRoom);
        if (error) return toast('خطأ: ' + error.message);
        await sb.from('chat_flags').delete().eq('room', chatRoom);
        toast('✓ تفسخت المحادثة'); vChat(V);
      };
    }
    $('#rooms').onclick = e => { const b = e.target.closest('[data-room]'); if (b) { chatRoom = b.dataset.room; vChat(V); } };
    const { data: ms } = await sb.from('messages').select('*').eq('room', chatRoom).order('created_at').limit(300);
    const box = $('#msgs');
    const add = m => {
      box.insertAdjacentHTML('beforeend', `<div class="msg ${m.user_id === me.id ? 'mine' : ''}" data-mid="${m.id}"><span class="who">${esc(m.author_name || '')}<button data-delmsg="${m.id}" title="فسخ">🗑</button></span><p>${esc(m.body).replace(/\n/g, '<br>')}</p><time>${esc(fmtD(m.created_at))}</time></div>`);
      box.scrollTop = box.scrollHeight;
    };
    (ms || []).forEach(add);
    if (!(ms || []).length) box.innerHTML = '<p class="muted" style="margin:auto">ما فمّا حتى ميساج.</p>';
    box.onclick = async e => { const b = e.target.closest('[data-delmsg]'); if (b && confirm('تفسخ الميساج؟')) { await sb.from('messages').delete().eq('id', b.dataset.delmsg); b.closest('.msg').remove(); } };
    let tTimer = null, lastT = 0;
    const tEl = $('#atyping');
    chatChannel = sb.channel('room-' + chatRoom).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room=eq.${chatRoom}` }, p => { if (!box.querySelector(`[data-mid="${p.new.id}"]`)) { box.querySelector('p.muted')?.remove(); add(p.new); tEl.hidden = true; } })
      .on('broadcast', { event: 'typing' }, p => { if (!isDm || !p.payload || p.payload.u === me.id) return; tEl.hidden = false; clearTimeout(tTimer); tTimer = setTimeout(() => { tEl.hidden = true; }, 4000); }).subscribe();
    $('#cform').body.addEventListener('input', () => { if (!isDm || Date.now() - lastT < 2500) return; lastT = Date.now(); chatChannel.send({ type: 'broadcast', event: 'typing', payload: { u: me.id } }); });
    $('#cform').onsubmit = async e => {
      e.preventDefault(); const i = e.target.body, body = i.value.trim(); if (!body) return; i.value = '';
      const { data: m, error } = await sb.from('messages').insert({ room: chatRoom, user_id: me.id, author_name: me.full_name || 'Rawia', is_admin: true, body }).select().single();
      if (error) { i.value = body; return toast(error.message); }
      if (!box.querySelector(`[data-mid="${m.id}"]`)) { box.querySelector('p.muted')?.remove(); add(m); }
    };
  }

  // ================= UPLOAD helper =================
  async function uploadFile(file, bucket, folder) {
    if (file.size > 50 * 1024 * 1024) { toast('الملف أكبر من 50 ميغا. للفيديوات الكبار استعمل YouTube (Non répertorié).'); return null; }
    const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
    const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'file';
    const key = `${folder ? folder.replace(/\/$/, '') + '/' : ''}${Date.now().toString(36)}-${base}.${ext}`;
    toast('⏳ جاري الرفع… ' + file.name);
    const { error } = await sb.storage.from(bucket).upload(key, file, { contentType: file.type || undefined, upsert: false });
    if (error) { toast('خطأ في الرفع: ' + error.message); return null; }
    toast('✓ تم الرفع');
    return { path: `${bucket}/${key}`, url: bucket === 'public' ? sb.storage.from('public').getPublicUrl(key).data.publicUrl : '' };
  }
  // an input + upload button. mode: 'url' (store public URL) or 'path' (store bucket/key path)
  function uplField(name, label, val, accept, bucket, folder, mode, hint) {
    return `<label class="full">${label}<div class="upl"><input type="text" name="${name}" dir="ltr" value="${esc(val || '')}" placeholder="${mode === 'url' ? 'https://…' : 'public/… أو private/…'}">
      <label class="btn line sm">⬆️ رفع<input type="file" accept="${accept}" data-up="${name}" data-bucket="${bucket}" data-folder="${folder}" data-mode="${mode}"></label></div>${hint ? `<span class="hint">${hint}</span>` : ''}</label>`;
  }
  document.addEventListener('change', async e => {
    const inp = e.target.closest('input[type=file][data-up]'); if (!inp || !inp.files[0]) return;
    const form = inp.closest('form') || document;
    let bucket = inp.dataset.bucket;
    if (bucket === 'auto') bucket = form.querySelector('[name=members_only]')?.checked ? 'private' : 'public';
    let folder = inp.dataset.folder;
    if (bucket === 'private' && folder === 'meditations') folder = 'members/meditations';
    const r = await uploadFile(inp.files[0], bucket, folder);
    if (r) { const t = form.querySelector(`[name="${inp.dataset.up}"]`); t.value = inp.dataset.mode === 'url' && r.url ? r.url : r.path; t.dispatchEvent(new Event('input', { bubbles: true })); }
    inp.value = '';
  });

  // ================= LESSONS (course content) =================
  let lessonCourse = '';
  async function vLessons(V) {
    const fs = content.formations || [];
    if (!lessonCourse && fs.length) lessonCourse = fs[0].id;
    V.innerHTML = `<div class="panel"><label>اختار الدورة<select id="lc">${fs.map(f => `<option value="${esc(f.id)}" ${f.id === lessonCourse ? 'selected' : ''}>${esc(L(f.titre))}</option>`).join('')}</select></label>
      <p class="hint" style="margin-top:8px">الدروس هاذم يظهرو كان للحرفاء اللي عندهم الوصول للدورة. 🎬 فيديو: حط رابط YouTube (Non répertorié) ولا ارفع فيديو صغير. 🎧 صوت، 📄 PDF، 🖼️ صورة: ارفعهم مباشرة.<br>🌐 اكتبي العنوان والشرح بالعربية فقط، وتُترجَم الفرنسية والإنجليزية تلقائياً عند الحفظ (ويمكنكِ تعديلها بعد ذلك).</p></div>
      <div class="panel"><div class="row between"><h3>الدروس</h3><button class="btn gold" id="addl">+ زيد درس</button></div><div id="llist"></div></div>`;
    $('#lc').onchange = e => { lessonCourse = e.target.value; vLessons(V); };
    $('#addl').onclick = () => lessonDialog(null, V);
    if (!lessonCourse) { $('#llist').innerHTML = '<p class="muted">زيد دورة من «محتوى الموقع ← الدورات» الأول.</p>'; return; }
    const { data: ls } = await sb.from('lessons').select('*').eq('course_id', lessonCourse).order('position').order('id');
    const ico = { video: '🎬', audio: '🎧', pdf: '📄', image: '🖼️', text: '📝', link: '🔗' };
    // courses with sections (e.g. the 5 evenings of the masterclass): show lessons grouped by section
    const secs = courseSections(lessonCourse), secOf = l => (l.body && l.body.section) || '';
    const row = (l, i) => `<div class="item"><div class="grow"><b>${i + 1}. ${ico[l.kind] || ''} ${esc(L(l.title))}</b><br><small dir="ltr">${esc(l.url || l.storage_path || '')}</small></div>
      <div class="row"><button class="btn line sm" data-up-l="${l.id}" ${i ? '' : 'disabled'}>↑</button><button class="btn line sm" data-edit-l="${l.id}">تعديل</button><button class="btn danger sm" data-del-l="${l.id}">🗑</button></div></div>`;
    const idx = new Map((ls || []).map((l, i) => [l.id, i]));
    $('#llist').innerHTML = !(ls || []).length ? '<p class="muted">لا توجد دروس بعد. اضغطي «زيد درس».</p>'
      : !secs.length ? ls.map(row).join('')
      : [{ id: '', ar: 'بدون قسم' }].concat(secs).map(s => { const g = ls.filter(l => secOf(l) === s.id); return g.length || s.id ? `<h4 class="lsec">${esc(s.ar)} <small>(${g.length})</small></h4>${g.map(l => row(l, idx.get(l.id))).join('') || '<p class="muted sm">—</p>'}` : ''; }).join('');
    V.querySelectorAll('[data-edit-l]').forEach(b => b.onclick = () => lessonDialog(ls.find(l => String(l.id) === b.dataset.editL), V));
    V.querySelectorAll('[data-del-l]').forEach(b => b.onclick = async () => { if (!confirm('تفسخ الدرس؟')) return; await sb.from('lessons').delete().eq('id', b.dataset.delL); vLessons(V); });
    V.querySelectorAll('[data-up-l]').forEach(b => b.onclick = async () => {
      const i = ls.findIndex(l => String(l.id) === b.dataset.upL); if (i < 1) return;
      [ls[i - 1], ls[i]] = [ls[i], ls[i - 1]];
      await Promise.all(ls.map((l, j) => sb.from('lessons').update({ position: j }).eq('id', l.id))); vLessons(V);
    });
  }
  function courseSections(cid) { const c = ((content && content.formations) || []).find(f => f.id === cid); return (c && Array.isArray(c.sections)) ? c.sections : []; }
  function lessonDialog(l, V) {
    l = l || { title: {}, kind: 'video', body: {} };
    const f = $('#dlg-form'), secs = courseSections(lessonCourse), cur = (l.body && l.body.section) || '';
    f.innerHTML = `<h2>${l.id ? 'تعديل' : 'زيد'} درس</h2><div class="g2">
      ${secs.length ? `<label class="full">الأمسية / القسم<select name="section"><option value="">— بدون قسم —</option>${secs.map(s => `<option value="${esc(s.id)}" ${s.id === cur ? 'selected' : ''}>${esc(s.ar)}</option>`).join('')}</select></label>` : ''}
      ${field(['title', 'عنوان الدرس', 'i'], l.title)}
      <label>النوع<select name="kind">${[['video', '🎬 فيديو'], ['audio', '🎧 صوت'], ['pdf', '📄 PDF'], ['image', '🖼️ صورة'], ['text', '📝 نص'], ['link', '🔗 رابط']].map(([k, n]) => `<option value="${k}" ${l.kind === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="full">رابط (YouTube، Vimeo، Zoom، Drive…)<input name="url" dir="ltr" value="${esc(l.url || '')}" placeholder="https://youtu.be/…"></label>
      ${uplField('storage_path', 'ولا ارفع ملف (صوت، PDF، صورة، فيديو صغير — حتى 50 ميغا)', l.storage_path, 'audio/*,video/*,application/pdf,image/*', 'private', 'courses/' + lessonCourse, 'path', 'الملفات هاذي محمية: ما يشوفهمش كان اللي شرا الدورة.')}
      ${field(['body', 'نص / شرح (اختياري)', 'it'], l.body)}</div>
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel" formnovalidate>إلغاء</button><button class="btn gold" value="ok">حفظ</button></div>`;
    const d = $('#dlg'); d.returnValue = ''; d.showModal();
    d.onclose = async () => {
      if (d.returnValue !== 'ok') return;
      const tr = await autoFill({ title: readField(f, ['title', '', 'i']), body: readField(f, ['body', '', 'it']) }, [['title', '', 'i'], ['body', '', 'it']]);
      const body = Object.assign({}, tr.body || {});
      if (f.section) { if (f.section.value) body.section = f.section.value; else delete body.section; }
      const row = { course_id: lessonCourse, title: tr.title, kind: f.kind.value, url: f.url.value.trim() || null, storage_path: f.storage_path.value.trim() || null, body };
      const r = l.id ? await sb.from('lessons').update(row).eq('id', l.id) : await sb.from('lessons').insert({ ...row, position: 999 });
      if (r.error) return toast('خطأ: ' + r.error.message);
      toast('✓ تحفظ'); vLessons(V);
    };
  }

  // ================= MEDITATIONS =================
  async function vMedits(V) {
    const { data: ms } = await sb.from('meditations').select('*').order('position').order('id');
    V.innerHTML = `<div class="panel"><div class="row between"><h3>التأملات</h3><button class="btn gold" id="addm">+ زيد تأمل</button></div>
      <p class="hint" style="margin-top:6px">✨ «للأعضاء فقط»: ما يسمعوهاش كان المشتركين في الدائرة. الباقي مجاني للجميع ويجيبلك زوّار.</p><div id="mlist"></div></div>`;
    $('#addm').onclick = () => meditDialog(null, V);
    $('#mlist').innerHTML = (ms || []).length ? ms.map(m => `<div class="item"><div class="grow"><b>${m.kind === 'video' ? '🎬' : '🎧'} ${esc(L(m.title))}</b>
      ${m.members_only ? '<span class="pill">✨ للأعضاء</span>' : '<span class="pill paid">مجاني</span>'}${m.active ? '' : '<span class="pill off">مخفي</span>'}<br><small>${esc(m.category || '')} · ${esc(m.duration || '')}</small></div>
      <div class="row"><button class="btn line sm" data-edit-m="${m.id}">تعديل</button><button class="btn danger sm" data-del-m="${m.id}">🗑</button></div></div>`).join('') : '<p class="muted">ما فمّا حتى تأمل.</p>';
    V.querySelectorAll('[data-edit-m]').forEach(b => b.onclick = () => meditDialog(ms.find(m => String(m.id) === b.dataset.editM), V));
    V.querySelectorAll('[data-del-m]').forEach(b => b.onclick = async () => { if (!confirm('تفسخ التأمل؟')) return; await sb.from('meditations').delete().eq('id', b.dataset.delM); vMedits(V); });
  }
  function meditDialog(m, V) {
    m = m || { title: {}, description: {}, kind: 'audio', members_only: false, active: true, theme: 'violet', position: 0 };
    const cats = content.medit_categories || [];
    const f = $('#dlg-form');
    f.innerHTML = `<h2>${m.id ? 'تعديل' : 'زيد'} تأمل</h2><div class="g2">
      ${field(['title', 'العنوان', 'i'], m.title)}
      <label>النوع<select name="kind"><option value="audio" ${m.kind === 'audio' ? 'selected' : ''}>🎧 صوت</option><option value="video" ${m.kind === 'video' ? 'selected' : ''}>🎬 فيديو</option></select></label>
      <label>الصنف<select name="category">${cats.map(c => `<option value="${esc(c.id)}" ${m.category === c.id ? 'selected' : ''}>${esc(L(c))}</option>`).join('')}</select></label>
      <label>المدة (مثلاً 12 min)<input name="duration" value="${esc(m.duration || '')}"></label>
      <label>اللون<select name="theme">${['violet', 'indigo', 'rose', 'green', 'blue', 'gold'].map(t => `<option ${m.theme === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="members_only" ${m.members_only ? 'checked' : ''}> ✨ للأعضاء فقط</label>
      <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="active" ${m.active !== false ? 'checked' : ''}> ظاهر في الموقع</label>
      <label class="full">رابط YouTube / Vimeo (اختياري)<input name="url" dir="ltr" value="${esc(m.url || '')}"></label>
      ${uplField('storage_path', 'ولا ارفع ملف صوتي / فيديو (mp3, m4a, mp4 — حتى 50 ميغا)', m.storage_path, 'audio/*,video/*', 'auto', 'meditations', 'path', 'اختار «للأعضاء فقط» قبل ما ترفع، باش يتحفظ الملف في البلاصة المحمية.')}
      ${uplField('cover', 'صورة الغلاف (اختياري)', m.cover, 'image/*', 'public', 'covers', 'url')}
      ${field(['description', 'الوصف', 'it'], m.description)}</div>
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel" formnovalidate>إلغاء</button><button class="btn gold" value="ok">حفظ</button></div>`;
    const d = $('#dlg'); d.returnValue = ''; d.showModal();
    d.onclose = async () => {
      if (d.returnValue !== 'ok') return;
      const row = { title: readField(f, ['title', '', 'i']), description: readField(f, ['description', '', 'it']), kind: f.kind.value, category: f.category.value, duration: f.duration.value.trim(),
        theme: f.theme.value, members_only: f.members_only.checked, active: f.active.checked, url: f.url.value.trim() || null, storage_path: f.storage_path.value.trim() || null, cover: f.cover.value.trim() || null };
      await autoFill(row, [['title', '', 'i'], ['description', '', 'it']]);
      if (row.members_only && row.storage_path && row.storage_path.startsWith('public/')) toast('⚠️ الملف في البلاصة العمومية. باش يكون محمي، عاود ارفعو بعد ما تختار «للأعضاء فقط».');
      const r = m.id ? await sb.from('meditations').update(row).eq('id', m.id) : await sb.from('meditations').insert(row);
      if (r.error) return toast('خطأ: ' + r.error.message);
      toast('✓ تحفظ'); vMedits(V);
    };
  }

  // ================= MEDIA LIBRARY =================
  async function vMedia(V) {
    V.innerHTML = `<div class="panel"><h3>رفع ملفات (صور، PDF، صوت، فيديو صغير)</h3>
      <p class="hint" style="margin:6px 0 10px">الملفات هنا عمومية: تنجم تستعمل الرابط متاعها في أي بلاصة في الموقع. للملفات الخاصة بالدورات استعمل «🎓 محتوى الدورات».</p>
      <label class="drop" id="drop">📤 اسحب الملفات هنا ولا اضغط باش تختار<input type="file" id="mfiles" multiple hidden></label></div>
      <div class="panel"><h3>ملفاتي</h3><div class="files" id="flist"><p class="muted">…</p></div></div>`;
    const drop = $('#drop');
    const up = async files => { for (const fl of files) await uploadFile(fl, 'public', 'media'); listMedia(); };
    $('#mfiles').onchange = e => up(e.target.files);
    drop.ondragover = e => { e.preventDefault(); drop.classList.add('over'); };
    drop.ondragleave = () => drop.classList.remove('over');
    drop.ondrop = e => { e.preventDefault(); drop.classList.remove('over'); up(e.dataTransfer.files); };
    listMedia();
  }
  async function listMedia() {
    const folders = ['media', 'covers', 'images'];
    let all = [];
    for (const fo of folders) { const { data } = await sb.storage.from('public').list(fo, { limit: 500, sortBy: { column: 'created_at', order: 'desc' } }); (data || []).filter(x => x.id).forEach(x => all.push({ ...x, key: fo + '/' + x.name })); }
    const el = $('#flist'); if (!el) return;
    el.innerHTML = all.length ? all.map(x => {
      const url = sb.storage.from('public').getPublicUrl(x.key).data.publicUrl, isImg = /\.(png|jpe?g|webp|gif|svg)$/i.test(x.name);
      const ic = /\.pdf$/i.test(x.name) ? '📄' : /\.(mp3|m4a|wav|ogg)$/i.test(x.name) ? '🎧' : /\.(mp4|mov|webm)$/i.test(x.name) ? '🎬' : '📎';
      return `<div class="file"><div class="thumb">${isImg ? `<img src="${esc(url)}" alt="" loading="lazy">` : ic}</div><div class="meta"><span>${esc(x.name.replace(/^[a-z0-9]+-/, ''))}</span>
        <div class="row"><button class="btn line sm" data-copy="${esc(url)}">📋 انسخ الرابط</button><button class="btn danger sm" data-rm="${esc(x.key)}">🗑</button></div></div></div>`;
    }).join('') : '<p class="muted">ما فمّا حتى ملف.</p>';
    el.onclick = async e => {
      const c = e.target.closest('[data-copy]'); if (c) { try { await navigator.clipboard.writeText(c.dataset.copy); toast('✓ تنسخ الرابط'); } catch { prompt('انسخ الرابط:', c.dataset.copy); } return; }
      const r = e.target.closest('[data-rm]'); if (r && confirm('تفسخ الملف؟')) { await sb.storage.from('public').remove([r.dataset.rm]); listMedia(); }
    };
  }

  // ================= SITE CONTENT EDITOR =================
  const ICONS = ['energy', 'book', 'cards', 'tree', 'mind', 'hands', 'lotus', 'star', 'heart', 'moon', 'crystal', 'gift'];
  const THEMES = ['violet', 'indigo', 'rose', 'green', 'blue', 'gold'];
  const IMG = ['image', 'صورة — اختياري', 'img'];
  const SCHEMAS = {
    soins: { label: x => L(x.titre), sub: x => [L(x.duree), P(x.prix)].filter(Boolean).join(' · '),
      fields: [['titre', 'الاسم', 'i'], ['categorie', 'الصنف', 'cat'], ['duree', 'المدة', 'i'], ['prix', 'السعر', 'p'], ['icone', 'الأيقونة', 'select', ICONS], ['theme', 'اللون', 'select', THEMES], IMG,
        ['note', 'التقييم (مثلاً 4.9) — اختياري'], ['avis', 'عدد التقييمات — اختياري', 'number'], ['lien', 'رابط — اختياري (مثلاً tarot.html)'], ['description', 'الوصف', 'it'], ['en_ligne', 'متوفرة أونلاين', 'checkbox', null, true]] },
    lectures: { label: x => L(x.titre), sub: x => [x.jeu, x.cartes && x.cartes + ' أوراق', P(x.prix)].filter(Boolean).join(' · '),
      fields: [['titre', 'اسم القراءة', 'i'], ['jeu', 'النوع', 'select', ['tarot', 'oracle', 'combo']], ['cartes', 'عدد الأوراق'], ['prix', 'السعر', 'p'], ['icone', 'الأيقونة', 'select', ICONS], ['theme', 'اللون', 'select', THEMES], IMG,
        ['description', 'الوصف', 'it'], ['populaire', 'شارة «الأكثر اختياراً»', 'checkbox', null, false], ['actif', 'ظاهرة في الموقع', 'checkbox', null, true]] },
    formations: { hint: 'الدورات المخفية ما تظهرش للزوّار. باش تنشر دورة: «تعديل» ← فعّل «ظاهرة في الموقع» ← «انشر على الموقع». صفحة البرنامج تتعمل وحدها في أقل من ساعة.',
      label: x => L(x.titre), sub: x => [x.date, L(x.mode), Array.isArray(x.niveaux) && x.niveaux.length ? x.niveaux.length + ' مستويات' : P(x.prix)].filter(Boolean).join(' · '),
      fields: [['titre', 'العنوان', 'i'], ['categorie', 'الصنف', 'i'], ['date', 'التاريخ', 'date'], ['duree', 'المدة', 'i'], ['mode', 'الطريقة', 'i'], ['places', 'عدد الأماكن', 'number'], ['prix', 'السعر', 'p'], ['ancien_prix', 'السعر القديم (تخفيض) — اختياري', 'p'],
        ['icone', 'الأيقونة', 'select', ICONS], ['theme', 'اللون', 'select', THEMES], IMG, ['description', 'الوصف', 'it'],
        ['niveaux', 'المستويات — اختياري (الحريف يختار المستوى). سطر لكل مستوى: الاسم بالعربية / Nom FR / Name EN | دينار | يورو | دولار', 'lv'],
        ['programme', 'البرنامج الكامل (يظهر في صفحة الدورة)', 'lt'],
        ['lien', 'رابط صفحة البرنامج — اختياري (مثلاً formations/reiki-usui.html)'],
        ['nouveau', 'شارة «جديد»', 'checkbox', null, false], ['actif', 'ظاهرة في الموقع', 'checkbox', null, true]] },
    abonnements: { hint: 'المزايا: اكتب كل ميزة في سطر.', label: x => L(x.titre), sub: x => P(x.prix) + ' / شهر',
      fields: [['titre', 'اسم الاشتراك', 'i'], ['accroche', 'جملة قصيرة', 'i'], ['prix', 'السعر الشهري', 'p'], ['prix_annuel', 'السعر السنوي', 'p'], ['avantages', 'المزايا (سطر لكل ميزة)', 'it'],
        ['theme', 'اللون', 'select', THEMES], ['populaire', 'شارة «الأكثر اختياراً»', 'checkbox', null, false], ['actif', 'ظاهر في الموقع', 'checkbox', null, true]] },
    evenements: { hint: 'الساعة بتوقيت تونس — الموقع يحوّلها لتوقيت كل زائر. الأحداث القديمة تختفي وحدها.', label: x => L(x.titre), sub: x => [x.date, x.heure].filter(Boolean).join(' · '),
      fields: [['titre', 'العنوان', 'i'], ['date', 'التاريخ', 'date'], ['heure', 'الساعة (توقيت تونس)', 'time'], ['description', 'الوصف', 'it'], ['icone', 'الأيقونة', 'select', ICONS], ['theme', 'اللون', 'select', THEMES],
        ['membres', 'للأعضاء فقط', 'checkbox', null, true], ['actif', 'ظاهر في الموقع', 'checkbox', null, true]] },
    packs: { label: x => L(x.titre), sub: x => P(x.prix),
      fields: [['titre', 'اسم الباقة', 'i'], ['contenu', 'محتوى الباقة', 'i'], ['nb', 'عدد الجلسات', 'number'], ['prix', 'سعر الباقة', 'p'], ['ancien_prix', 'السعر بدون باقة', 'p'], ['theme', 'اللون', 'select', THEMES], ['actif', 'ظاهرة في الموقع', 'checkbox', null, true]] },
    temoignages: { label: x => x.nom, sub: x => L(x.service), fields: [['nom', 'الاسم'], ['pays', 'البلد'], ['service', 'الجلسة / الدورة', 'i'], ['texte', 'الرأي', 'it']] },
    faq: { label: x => L(x.q), sub: x => L(x.r).slice(0, 90) + '…', fields: [['q', 'السؤال', 'i'], ['r', 'الجواب', 'it']] },
    paiements: { hint: 'عمّر التفاصيل (رقم، RIB، الاسم…) وفعّل «ظاهرة في الموقع». تنجم تزيد أي طريقة أخرى بـ «+ إضافة».', label: x => (x.icone || '') + ' ' + L(x.titre), sub: x => ({ tn: '🇹🇳 تونس', intl: '🌍 الخارج', both: '🇹🇳 + 🌍 الزوز' }[x.zone] || '') + (x.details ? ' · ' + x.details.split('\n')[0] : ' · ⚠️ التفاصيل فارغة'),
      fields: [['titre', 'اسم الطريقة', 'i'], ['zone', 'تظهر لـ', 'select', ['tn', 'intl', 'both']], ['icone', 'أيقونة (emoji)'],
        ['details', 'التفاصيل اللي ينسخها الحريف (رقم الهاتف، RIB، IBAN، الاسم الكامل والمدينة…)', 'textarea'],
        ['instructions', 'شرح قصير للحريف', 'i'], ['lien', 'رابط دفع — اختياري (مثلاً رابط Payoneer)'], ['actif', 'ظاهرة في الموقع', 'checkbox', null, true]] },
    blog: { hint: 'اكتب المقال بلغة وحدة ولا أكثر (العربية / الفرنسية / الإنجليزية). كل لغة تعمّرها تظهر للزوّار اللي يقراو بيها. بعد «انشر على الموقع»، المقال يظهر فوراً، وجوجل يلقاه في أقل من ساعة.',
      label: x => L(x.titre), sub: x => [x.date > new Date().toISOString().slice(0, 10) ? '⏳ مبرمج، يتنشر وحدو نهار ' + x.date : x.date, L(x.categorie), x.slug && 'blog/' + x.slug + '.html'].filter(Boolean).join(' · '),
      fields: [['titre', 'عنوان المقال', 'i'], ['date', 'تاريخ النشر', 'date'], ['categorie', 'الصنف (مثلاً: طاقة، تاروت، تأمل)', 'i'], ['image', 'صورة الغلاف — اختياري', 'img'],
        ['resume', 'ملخّص قصير (يظهر في جوجل وفي البطاقة) — اختياري', 'i'], ['contenu', 'نص المقال', 'lt'],
        ['slug', 'رابط المقال بالحروف اللاتينية (مثلاً bienfaits-reiki) — يتعمّر وحدو كان تخليه فارغ'], ['actif', 'منشور في الموقع', 'checkbox', null, true]] },
    consult_tarifs: { hint: 'أسعار صفحة «استشارة أونلاين». كل سطر = طريقة + مدة + سعر. زيد مدة جديدة بـ «+ إضافة»، ولا خبّي طريقة بإلغاء «ظاهرة في الموقع».',
      label: x => ({ audio: '📞 مكالمة صوتية', video: '🎥 مكالمة فيديو', chat: '💬 شات' }[x.mode] || x.mode) + ' · ' + x.duree + ' دقيقة', sub: x => P(x.prix),
      fields: [['mode', 'الطريقة', 'select', ['audio', 'video', 'chat']], ['duree', 'المدة بالدقائق', 'number'], ['prix', 'السعر', 'p'], ['actif', 'ظاهرة في الموقع', 'checkbox', null, true]] },
    categories: { label: x => L(x), sub: x => x.fr, fields: [['ar', 'بالعربية'], ['fr', 'بالفرنسية'], ['en', 'بالإنجليزية']] },
    medit_categories: { label: x => L(x), sub: x => x.fr, fields: [['ar', 'بالعربية'], ['fr', 'بالفرنسية'], ['en', 'بالإنجليزية']] }
  };
  const SETTINGS = [['nom_centre', 'اسم المركز'], ['slogan', 'الشعار', 'i'], ['intro', 'نص تعريفي قصير', 'it'], ['praticienne', 'اسمك'], ['titre_praticienne', 'صفتك', 'i'],
    ['bio', 'التعريف بك (فقرة 1)', 'it'], ['bio2', 'التعريف بك (فقرة 2)', 'it'], ['certifs', 'الشهادات (سطر لكل شهادة)', 'it'], ['annees_experience', 'سنوات الخبرة'], ['clients', 'عدد الأشخاص المرافَقين'], ['formes', 'عدد المتكوّنين'], ['pays', 'عدد البلدان'],
    ['telephone', 'الهاتف (يظهر في الموقع)'], ['whatsapp', 'رقم واتساب (أرقام فقط مع 216)'], ['email', 'البريد الإلكتروني'], ['adresse', 'العنوان', 'i'], ['horaires', 'أوقات العمل', 'i'],
    ['instagram', 'رابط إنستغرام'], ['facebook', 'رابط فيسبوك'], ['tiktok', 'رابط تيك توك'], ['youtube', 'رابط يوتيوب']];
  // default payment methods (inactive until Rawia fills them in)
  const PAY_TEMPLATES = [
    { id: 'd17', zone: 'tn', icone: '📮', titre: { ar: 'D17 (البريد التونسي)', fr: 'D17 (La Poste)', en: 'D17 (Tunisian Post)' }, details: '28 550 802', instructions: { ar: 'أرسل المبلغ من تطبيق D17 إلى هذا الرقم', fr: "Envoyez le montant depuis l'appli D17 à ce numéro", en: 'Send the amount from the D17 app to this number' }, lien: '', actif: true },
    { id: 'flouci', zone: 'tn', icone: '📱', titre: { ar: 'Flouci', fr: 'Flouci', en: 'Flouci' }, details: '', instructions: { ar: 'أرسل المبلغ من تطبيق Flouci إلى هذا الرقم', fr: "Envoyez le montant depuis l'appli Flouci à ce numéro", en: 'Send the amount from the Flouci app to this number' }, lien: '', actif: false },
    { id: 'poste', zone: 'tn', icone: '🏤', titre: { ar: 'البريد التونسي (حوالة / CCP)', fr: 'La Poste (mandat / CCP)', en: 'Tunisian Post (money order / CCP)' }, details: '', instructions: { ar: 'حوالة بريدية أو تحويل إلى هذا الحساب البريدي', fr: 'Mandat postal ou virement sur ce compte postal', en: 'Postal money order or transfer to this postal account' }, lien: '', actif: false },
    { id: 'attijari', zone: 'tn', icone: '🏦', titre: { ar: 'تحويل بنكي — Attijari Bank', fr: 'Virement bancaire — Attijari Bank', en: 'Bank transfer — Attijari Bank' }, details: 'RIB : 04 149 2310087195269 23\nRawia Ghorbel', instructions: { ar: 'حوّل المبلغ إلى هذا الحساب', fr: 'Virez le montant sur ce compte', en: 'Transfer the amount to this account' }, lien: '', actif: true },
    { id: 'moneygram', zone: 'intl', icone: '💸', titre: { ar: 'MoneyGram', fr: 'MoneyGram', en: 'MoneyGram' }, details: 'RAWIA GHORBEL\nTunisie / Tunisia', instructions: { ar: 'أرسل المبلغ بهذا الاسم — البلد: تونس', fr: 'Envoyez le montant à ce nom — Pays : Tunisie', en: 'Send the amount to this name — Country: Tunisia' }, lien: '', actif: true },
    { id: 'ria', zone: 'intl', icone: '💱', titre: { ar: 'Ria Money Transfer', fr: 'Ria Money Transfer', en: 'Ria Money Transfer' }, details: 'RAWIA GHORBEL\nTunisie / Tunisia', instructions: { ar: 'أرسل المبلغ بهذا الاسم — البلد: تونس', fr: 'Envoyez le montant à ce nom — Pays : Tunisie', en: 'Send the amount to this name — Country: Tunisia' }, lien: '', actif: true },
    { id: 'paypal', zone: 'intl', icone: '🅿️', titre: { ar: 'PayPal', fr: 'PayPal', en: 'PayPal' }, details: '', instructions: { ar: 'أرسل المبلغ عبر PayPal (خيار «أصدقاء وعائلة») إلى هذا الحساب', fr: 'Envoyez le montant via PayPal à ce compte', en: 'Send the amount via PayPal to this account' }, lien: '', actif: false },
    { id: 'western', zone: 'intl', icone: '🌍', titre: { ar: 'Western Union', fr: 'Western Union', en: 'Western Union' }, details: 'RAWIA GHORBEL\nTunisie / Tunisia', instructions: { ar: 'أرسل المبلغ بهذا الاسم — البلد: تونس', fr: 'Envoyez le montant à ce nom — Pays : Tunisie', en: 'Send the amount to this name — Country: Tunisia' }, lien: '', actif: true }
  ];

  function field([k, label, type, opts, def], val) {
    if (type === 'sep') return `<h3 class="full" style="margin-top:14px;border-top:1px solid var(--line);padding-top:14px">${label}</h3>`;
    if (type === 'i' || type === 'it') {
      const v = val && typeof val === 'object' ? val : { ar: val || '', fr: '', en: '' };
      const inp = (lg, name, dir) => type === 'it' ? `<label><small>${name}</small><textarea name="${k}.${lg}" dir="${dir}" rows="4">${esc(v[lg])}</textarea></label>` : `<label><small>${name}</small><input name="${k}.${lg}" dir="${dir}" value="${esc(v[lg])}"></label>`;
      return `<div class="multi"><span>${label}</span><div class="row3">${inp('ar', 'العربية', 'rtl')}${inp('fr', 'Français', 'ltr')}${inp('en', 'English', 'ltr')}</div></div>`;
    }
    if (type === 'lt') {
      const v = val && typeof val === 'object' ? val : { ar: val || '', fr: '', en: '' };
      const help = 'سطر فارغ = فقرة جديدة · <b>## عنوان</b> = عنوان فرعي · <b>- </b> في أول السطر = قائمة · <b>**كلمة**</b> = خط عريض · <b>[نص](رابط)</b> = رابط · رابط صورة ولا YouTube وحدو في سطر = يظهر صورة / فيديو';
      return `<div class="multi full"><span>${label}</span><p class="hint">${help}</p>${[['ar', 'العربية', 'rtl'], ['fr', 'Français', 'ltr'], ['en', 'English', 'ltr']].map(([lg, n, dir]) =>
        `<details ${v[lg] || lg === 'ar' ? 'open' : ''}><summary>${n}${v[lg] ? ' ✓' : ''}</summary><textarea name="${k}.${lg}" dir="${dir}" rows="16" style="width:100%">${esc(v[lg])}</textarea></details>`).join('')}</div>`;
    }
    if (type === 'p') {
      const v = val && typeof val === 'object' ? val : { tnd: val || '', eur: '', usd: '' };
      const inp = (c, name) => `<label><small>${name}</small><input type="number" step="any" name="${k}.${c}" dir="ltr" value="${esc(v[c])}"></label>`;
      return `<div class="multi"><span>${label}</span><div class="row3">${inp('tnd', 'دينار DT')}${inp('eur', 'يورو €')}${inp('usd', 'دولار $')}</div></div>`;
    }
    if (type === 'lv') {
      const lines = (Array.isArray(val) ? val : []).map(x => [[x.nom?.ar, x.nom?.fr, x.nom?.en].filter(Boolean).join(' / ') || (typeof x.nom === 'string' ? x.nom : ''), x.prix?.tnd || '', x.prix?.eur || '', x.prix?.usd || ''].join(' | ')).join('\n');
      return `<label class="full">${label}<textarea name="${k}" rows="4" dir="auto" placeholder="المستوى 1 / Niveau 1 / Level 1 | 350 | 120 | 130">${esc(lines)}</textarea></label>`;
    }
    if (type === 'img') return uplField(k, label, val, 'image/*', 'public', 'images', 'url');
    if (type === 'cat') return `<label>${label}<select name="${k}">${(content.categories || []).map(c => `<option value="${esc(c.id)}" ${c.id === val ? 'selected' : ''}>${esc(L(c))}</option>`).join('')}</select></label>`;
    if (type === 'textarea') return `<label class="full">${label}<textarea name="${k}" rows="4" dir="auto">${esc(val ?? '')}</textarea></label>`;
    if (type === 'select') { const NAMES = { tn: '🇹🇳 تونس برك', intl: '🌍 الخارج برك', both: '🇹🇳 + 🌍 الزوز', audio: '📞 مكالمة صوتية', video: '🎥 مكالمة فيديو', chat: '💬 شات' }; const o = opts.includes(val) || !val ? opts : [val, ...opts]; return `<label>${label}<select name="${k}">${o.map(x => `<option value="${esc(x)}" ${x === val ? 'selected' : ''}>${esc(NAMES[x] || x)}</option>`).join('')}</select></label>`; }
    if (type === 'checkbox') { const on = val === '' || val === undefined ? def : val !== false; return `<label style="display:flex;gap:8px;align-items:center"><input type="checkbox" name="${k}" ${on ? 'checked' : ''}> ${label}</label>`; }
    return `<label>${label}<input name="${k}" type="${type || 'text'}" value="${esc(val ?? '')}"></label>`;
  }
  // ---- automatic translation: Rawia writes in one language, the empty languages are filled on save ----
  async function translateText(text, to) {
    const parts = String(text).split(/(\n{2,})/), out = [];
    let chunk = '';
    const flush = async () => {
      if (!chunk.trim()) { out.push(chunk); chunk = ''; return; }
      const r = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + to + '&dt=t', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: 'q=' + encodeURIComponent(chunk) });
      const j = await r.json(); out.push((j[0] || []).map(x => x[0]).join('')); chunk = '';
    };
    for (const p of parts) { if ((chunk + p).length > 3500) await flush(); chunk += p; }
    await flush();
    return out.join('');
  }
  async function autoLang(o) {
    if (!o || typeof o !== 'object') return o;
    const src = o.ar || o.fr || o.en; if (!src) return o;
    for (const l of ['ar', 'fr', 'en']) if (!o[l]) { try { o[l] = await translateText(src, l); } catch (e) { /* keep empty if offline */ } }
    return o;
  }
  async function autoFill(obj, fields) {
    const multi = fields.filter(fd => ['i', 'it', 'lt'].includes(fd[2]));
    if (multi.some(fd => { const v = obj[fd[0]]; return v && (v.ar || v.fr || v.en) && !(v.ar && v.fr && v.en); })) toast('🌐 جارٍ الترجمة إلى اللغات الأخرى…');
    for (const fd of multi) obj[fd[0]] = await autoLang(obj[fd[0]]);
    return obj;
  }
  function readField(f, [k, , type]) {
    if (type === 'i' || type === 'it' || type === 'lt') return { ar: f.elements[k + '.ar'].value.trim(), fr: f.elements[k + '.fr'].value.trim(), en: f.elements[k + '.en'].value.trim() };
    if (type === 'p') return { tnd: f.elements[k + '.tnd'].value.trim(), eur: f.elements[k + '.eur'].value.trim(), usd: f.elements[k + '.usd'].value.trim() };
    if (type === 'checkbox') return f.elements[k].checked;
    if (type === 'lv') return f.elements[k].value.split('\n').map(l => l.split('|').map(s => s.trim())).filter(p => p[0]).map(([n, tnd, eur, usd]) => {
      const [ar, fr, en] = n.split(' / ').map(s => s.trim());
      return { nom: { ar: ar || '', fr: fr || ar || '', en: en || fr || ar || '' }, prix: { tnd: tnd || '', eur: eur || '', usd: usd || '' } };
    });
    return f.elements[k].value.trim();
  }

  function vContentList(V, key) {
    const S = SCHEMAS[key];
    if (key === 'paiements' && !content.paiements) { content.paiements = JSON.parse(JSON.stringify(PAY_TEMPLATES)); setDirty(true); }
    content[key] = content[key] || [];
    const arr = content[key];
    const vis = x => ('actif' in x) ? (x.actif === false ? '<span class="pill off">مخفي</span>' : '<span class="pill paid">ظاهر</span>') : '';
    V.innerHTML = `<div class="panel"><div class="row between"><p class="muted">${esc(S.hint || 'بدّل، زيد، ولا رتّب. ما تنساش تضغط «انشر على الموقع» في الآخر.')}</p><button class="btn gold" id="add">+ إضافة</button></div>
      <div>${arr.length ? arr.map((x, i) => `<div class="item"><div class="grow"><b>${esc(S.label(x))}</b>${vis(x)}<br><small>${esc(S.sub(x) || '')}</small></div>
      <div class="row"><button class="btn line sm" data-act="up" data-i="${i}" ${i ? '' : 'disabled'}>↑</button><button class="btn line sm" data-act="edit" data-i="${i}">تعديل</button><button class="btn danger sm" data-act="del" data-i="${i}">🗑</button></div></div>`).join('') : '<p class="muted">فارغ. اضغط «إضافة».</p>'}</div></div>`;
    $('#add').onclick = () => editItem(key, -1, V);
    V.querySelectorAll('[data-act]').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if (b.dataset.act === 'edit') editItem(key, i, V);
      if (b.dataset.act === 'del' && confirm(`تفسخ «${S.label(arr[i])}»؟`)) { arr.splice(i, 1); setDirty(true); vContentList(V, key); }
      if (b.dataset.act === 'up' && i) { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; setDirty(true); vContentList(V, key); }
    });
  }
  function editItem(key, i, V) {
    const S = SCHEMAS[key], item = i >= 0 ? content[key][i] : {}, f = $('#dlg-form'), d = $('#dlg');
    f.innerHTML = `<h2>${i >= 0 ? 'تعديل' : 'إضافة'}</h2><div class="g2">${S.fields.map(x => field(x, item[x[0]] ?? '')).join('')}</div>
      <div class="row" style="justify-content:flex-end"><button class="btn line" value="cancel" formnovalidate>إلغاء</button><button class="btn gold" value="ok">حفظ</button></div>`;
    d.returnValue = ''; d.showModal();
    d.onclose = async () => {
      if (d.returnValue !== 'ok') return;
      const out = { ...item }; S.fields.forEach(fd => out[fd[0]] = readField(f, fd));
      await autoFill(out, S.fields);
      if (key === 'blog') {
        if (!out.date) out.date = new Date().toISOString().slice(0, 10);
        const clean = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-$/, '');
        let sl = clean(out.slug) || clean(out.titre.fr) || clean(out.titre.en) || 'article-' + out.date;
        const taken = s => content.blog.some((p, j) => j !== i && p.slug === s);
        let n = 2; const base = sl; while (taken(sl)) sl = base + '-' + n++;
        out.slug = sl; out.id = out.id || sl;
      }
      if (!out.id && !['temoignages', 'faq'].includes(key)) out.id = slug((out.titre && (out.titre.fr || out.titre.en)) || out.fr || out.en || 'item');
      i >= 0 ? (content[key][i] = out) : content[key].push(out);
      setDirty(true); vContentList(V, key);
    };
  }
  function vSettings(V) {
    const s = content.settings = content.settings || {};
    V.innerHTML = `<div class="panel"><form id="sform" onsubmit="return false"><div class="g2">${SETTINGS.map(x => field(x, s[x[0]] ?? '')).join('')}
      ${uplField('portrait', 'صورتك الشخصية', s.portrait, 'image/*', 'public', 'images', 'url', 'صورة عمودية (مثلاً 800×1000).')}</div></form></div>`;
    $('#sform').oninput = e => {
      const n = e.target.name; if (!n) return; const [k, sub] = n.split('.');
      if (sub) { if (typeof s[k] !== 'object' || !s[k]) s[k] = { ar: s[k] || '', fr: '', en: '' }; s[k][sub] = e.target.value; } else s[k] = e.target.value;
      setDirty(true);
    };
  }
})();
