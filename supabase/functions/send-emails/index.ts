// Sends the queued e-mails (table email_queue). Called every 5 min by pg_cron with the x-cron-secret header.
// Secrets (Edge Functions → Secrets): SMTP_PASS (required), SMTP_USER (default contact@centreholistique.net), SMTP_HOST (default mail.privateemail.com)
import nodemailer from 'npm:nodemailer@6.9.16';

const SB = Deno.env.get('SUPABASE_URL')!;
const KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SMTP_USER = Deno.env.get('SMTP_USER') || 'contact@centreholistique.net';
const SMTP_PASS = Deno.env.get('SMTP_PASS') || '';
const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'mail.privateemail.com';
const SITE = 'https://www.centreholistique.net';
const LIVE_URL = 'https://www.youtube.com/live/3zyCQ21mhRQ';
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

const rest = (path: string, init: RequestInit = {}) => fetch(`${SB}/rest/v1/${path}`, { ...init, headers: { ...H, ...(init.headers || {}) } });
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const fr = (l: string) => l === 'fr' || l === 'en';
const when = (iso: string, l: string) => iso ? new Date(iso).toLocaleString(fr(l) ? 'fr-FR' : 'ar-TN', { timeZone: 'Africa/Tunis', weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + (fr(l) ? ' (heure de Tunisie)' : ' (توقيت تونس)') : '';
const items = (d: any) => (Array.isArray(d.items) ? d.items : []).map((i: any) => `<li>${esc(i.title || i.id)}${i.option ? ' · ' + esc(i.option) : ''}${i.price ? ' — ' + esc(i.price) : ''}</li>`).join('');
const btn = (href: string, label: string) => `<p style="text-align:center;margin:22px 0"><a href="${href}" style="display:inline-block;background:#9a6b1f;color:#fff;text-decoration:none;font-weight:bold;font-size:17px;padding:13px 32px;border-radius:999px">${label}</a></p>`;
const box = (html: string) => `<div style="background:#fbf6ec;border:1px solid #ecdcbc;border-radius:14px;padding:16px 18px;margin:16px 0;line-height:1.9">${html}</div>`;

function shell(l: string, body: string) {
  const dir = fr(l) ? 'ltr' : 'rtl', al = fr(l) ? 'left' : 'right';
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f6f1ea">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f1ea"><tr><td align="center" style="padding:22px 10px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:18px;overflow:hidden;font-family:Tahoma,Arial,sans-serif;color:#3b2550">
<tr><td><img src="${SITE}/assets/email/welcome.jpg" width="600" alt="Centre Holistique" style="display:block;width:100%;height:auto;border:0"></td></tr>
<tr><td dir="${dir}" style="padding:26px 30px;text-align:${al};font-size:16px;line-height:1.9">${body}</td></tr>
<tr><td style="background:#3b2550;padding:20px;text-align:center;font-size:14px;line-height:1.9;color:#e9dcf5"><b style="color:#f3d79a">Centre Holistique · Rawia Gharbal</b><br>Sfax · <a href="https://wa.me/21626660344" style="color:#f3d79a;text-decoration:none">WhatsApp +216 26 660 344</a><br><a href="${SITE}" style="color:#f3d79a;text-decoration:none">www.centreholistique.net</a></td></tr>
</table></td></tr></table></body></html>`;
}

function build(kind: string, l: string, d: any): { subject: string; html: string } | null {
  const n = esc(d.name || '');
  const appt = d.start_at ? box(fr(l) ? `📅 <b>${esc(when(d.start_at, l))}</b>${d.service ? '<br>' + esc(d.service) : ''}` : `📅 <b>${esc(when(d.start_at, l))}</b>${d.service ? '<br>' + esc(d.service) : ''}`) : '';
  switch (kind) {
    case 'order_new': return fr(l)
      ? { subject: `🌸 Nous avons bien reçu votre demande n° ${d.order_id}`, html: shell(l, `<p><b>Bonjour ${n},</b></p><p>Merci pour votre confiance 🤍 Nous avons bien reçu votre demande :</p><ul>${items(d)}</ul>${d.total ? `<p>Total : <b>${esc(d.total)}</b></p>` : ''}${appt}${d.start_at ? '<p>⏳ Ce créneau vous est réservé 48 h, le temps du paiement.</p>' : ''}<p>Nous vous contactons sur WhatsApp pour le paiement. Dès qu'il est confirmé, vous recevez un e-mail de confirmation.</p>`) }
      : { subject: `🌸 وصلنا طلبك رقم ${d.order_id}`, html: shell(l, `<p><b>أهلاً ${n} 🤍</b></p><p>شكراً على ثقتك. وصلنا طلبك:</p><ul>${items(d)}</ul>${d.total ? `<p>المجموع: <b>${esc(d.total)}</b></p>` : ''}${appt}${d.start_at ? '<p>⏳ الموعد هذا محجوزلك 48 ساعة حتى يتم الدفع.</p>' : ''}<p>باش نتواصلو معاك على الواتساب للدفع، وكي يتأكّد يوصلك إيميل تأكيد.</p>`) };
    case 'order_paid': {
      const course = (Array.isArray(d.items) ? d.items : []).some((i: any) => ['formations', 'abonnements'].includes(i.type));
      return fr(l)
        ? { subject: `✨ Paiement confirmé — bienvenue, ${d.name || ''}`, html: shell(l, `<p><b>Bonjour ${n},</b></p><p>Votre paiement est confirmé, merci 🙏</p><ul>${items(d)}</ul>${d.start_at ? `<p>Votre rendez-vous est confirmé :</p>${appt}<p>Vous recevrez un rappel la veille.</p>` : ''}${d.meeting_url ? btn(esc(d.meeting_url), '🎥 Lien de la séance') : ''}${course ? `<p>Votre accès est ouvert dans votre espace :</p>${btn(SITE + '/account.html', '🌟 Mon espace')}` : ''}<p>Avec amour et lumière,<br>Rawia</p>`) }
        : { subject: `✨ تأكّد الدفع — مرحبا بيك ${d.name || ''}`, html: shell(l, `<p><b>أهلاً ${n} 🤍</b></p><p>الدفع متاعك تأكّد، يعطيك الصحة 🙏</p><ul>${items(d)}</ul>${d.start_at ? `<p>موعدك تأكّد:</p>${appt}<p>يوصلك تذكير نهار قبل.</p>` : ''}${d.meeting_url ? btn(esc(d.meeting_url), '🎥 رابط الجلسة') : ''}${course ? `<p>الدخول تحلّ في فضائك:</p>${btn(SITE + '/account.html', '🌟 فضائي')}` : ''}<p>بكل حب ونور،<br>راوية</p>`) };
    }
    case 'booking_confirmed': return { subject: '✅ موعدك في Centre Holistique تأكّد', html: shell('ar', `<p><b>أهلاً ${n} 🤍</b></p><p>موعدك تأكّد، في انتظارك:</p>${appt}<p>يوصلك تذكير نهار قبل. إذا تحب تبدّل الموعد، ابعثلنا على الواتساب.</p>`) };
    case 'booking_reminder': return fr(l)
      ? { subject: '🌙 Rappel : votre rendez-vous demain', html: shell(l, `<p><b>Bonjour ${n},</b></p><p>Petit rappel avec douceur : votre rendez-vous est demain.</p>${appt}<p>Prenez un moment avant la séance pour respirer et poser votre intention 🤍</p>`) }
      : { subject: '🌙 تذكير: موعدك غدوة', html: shell(l, `<p><b>أهلاً ${n} 🤍</b></p><p>تذكير صغير بالحب: موعدك غدوة.</p>${appt}<p>خذ لحظة قبل الجلسة، تنفّس وحطّ نيّتك 🤍</p>`) };
    case 'live_day_before': return fr(l)
      ? { subject: '✨ Demain 20h : notre live gratuit', html: shell(l, `<p><b>Bonjour ${n},</b></p><p>On se retrouve <b>demain jeudi 10 décembre à 20h (heure de Tunisie)</b> pour le live gratuit sur l'abondance et l'année 2027 ✨</p><p>Préparez un carnet, un stylo et une bougie si vous le souhaitez.</p>${btn(LIVE_URL, '▶️ Lien du live YouTube')}`) }
      : { subject: '✨ غدوة على الساعة 8 متاع الليل: اللايف المجاني', html: shell(l, `<p><b>أهلاً ${n} 🤍</b></p><p>نتلاقاو <b>غدوة الخميس 10 ديسمبر على الساعة 20:00 بتوقيت تونس</b> في اللايف المجاني على الوفرة وعام 2027 ✨</p><p>حضّر كرّاس وقلم، وشمعة إذا تحب.</p>${btn(LIVE_URL, '▶️ رابط اللايف على يوتيوب')}`) };
    case 'live_1h': return fr(l)
      ? { subject: '⏰ Dans 1 heure : le live commence', html: shell(l, `<p><b>${n},</b> le live commence dans une heure (20h, heure de Tunisie) 🤍</p>${btn(LIVE_URL, '▶️ Rejoindre le live')}`) }
      : { subject: '⏰ بعد ساعة: اللايف يبدا', html: shell(l, `<p><b>${n}</b>، اللايف يبدا بعد ساعة (20:00 بتوقيت تونس) 🤍</p>${btn(LIVE_URL, '▶️ ادخل للايف')}`) };
    case 'admin_order': return { subject: `🧾 طلب جديد #${d.order_id} — ${d.name || ''}`, html: shell('ar', `<p><b>طلب جديد في الموقع</b></p><p>${n} · <a href="https://wa.me/${String(d.phone || '').replace(/\D/g, '')}">${esc(d.phone)}</a>${d.email ? ' · ' + esc(d.email) : ''}</p><ul>${items(d)}</ul>${d.total ? `<p>المجموع: <b>${esc(d.total)}</b></p>` : ''}${appt}${d.note ? `<p style="white-space:pre-line">${esc(d.note)}</p>` : ''}${btn(SITE + '/admin.html', 'افتح لوحة التحكم')}`) };
    case 'admin_booking': return { subject: `📅 موعد جديد — ${d.name || ''}`, html: shell('ar', `<p><b>موعد جديد محجوز من الموقع</b> (يستنّى الخلاص 48 ساعة)</p><p>${n} · <a href="https://wa.me/${String(d.phone || '').replace(/\D/g, '')}">${esc(d.phone)}</a></p>${appt}${btn(SITE + '/admin.html', 'افتح المواعيد')}`) };
  }
  return null;
}

Deno.serve(async (req) => {
  const sec = req.headers.get('x-cron-secret') || '';
  const s = await (await rest(`app_secrets?key=eq.cron_secret&select=value`)).json();
  if (!sec || !s[0] || s[0].value !== sec) return new Response('forbidden', { status: 403 });
  if (!SMTP_PASS) return new Response('SMTP_PASS missing', { status: 200 });

  const due = await (await rest(`email_queue?sent_at=is.null&cancelled=is.false&attempts=lt.5&send_after=lte.${new Date().toISOString()}&order=send_after&limit=40`)).json();
  if (!Array.isArray(due) || !due.length) return new Response('nothing', { status: 200 });
  const tx = nodemailer.createTransport({ host: SMTP_HOST, port: 465, secure: true, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  let sent = 0;
  for (const m of due) {
    try {
      // reminders only for appointments still on
      if (m.kind === 'booking_reminder' && m.data?.booking_id) {
        const b = await (await rest(`bookings?id=eq.${m.data.booking_id}&select=status,start_at`)).json();
        if (!b[0] || b[0].status !== 'confirmed') { await rest(`email_queue?id=eq.${m.id}`, { method: 'PATCH', body: JSON.stringify({ cancelled: true, error: 'booking not confirmed' }) }); continue; }
        m.data.start_at = b[0].start_at;
      }
      const e = build(m.kind, m.lang || 'ar', m.data || {});
      if (!e) { await rest(`email_queue?id=eq.${m.id}`, { method: 'PATCH', body: JSON.stringify({ cancelled: true, error: 'unknown kind' }) }); continue; }
      await tx.sendMail({ from: `"Centre Holistique" <${SMTP_USER}>`, replyTo: SMTP_USER, to: m.to_email, subject: e.subject, html: e.html });
      await rest(`email_queue?id=eq.${m.id}`, { method: 'PATCH', body: JSON.stringify({ sent_at: new Date().toISOString(), attempts: m.attempts + 1, error: null }) });
      sent++;
    } catch (err) {
      await rest(`email_queue?id=eq.${m.id}`, { method: 'PATCH', body: JSON.stringify({ attempts: m.attempts + 1, error: String(err).slice(0, 500) }) });
    }
  }
  return new Response(JSON.stringify({ sent }), { headers: { 'Content-Type': 'application/json' } });
});
