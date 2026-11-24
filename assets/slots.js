// Appointment picker: the visitor only sees FREE times (Mon–Sat 10:00–19:00 Tunis time, 1 h break after each session).
// A chosen time is held 48 h in the database (bookings) until payment; nobody else can take it.
// Use: CHSlots.mount(el, { minutes }) · CHSlots.value(el) → { start, labelLocal, labelTunis } · await CHSlots.book(el, {...}) → booking id
(function () {
  'use strict';
  const OPEN = 10 * 60, CLOSE = 19 * 60, STEP = 30, BREAK = 60, NOTICE_H = 3, DAYS = 28, TUN = 'Africa/Tunis';
  const T = {
    ar: { day: 'اختر النهار', time: 'اختر الساعة', none: 'ما فمّاش أوقات فارغة في النهار هذا، اختر نهار آخر.', loading: 'نحضّرو الأوقات الفارغة…', your: 'بتوقيتك', tunis: 'بتوقيت تونس', picked: 'موعدك:', hold: 'الموعد يتحجزلك 48 ساعة حتى يتم الدفع.', need: 'اختر نهار وساعة الموعد', taken: 'الموعد هذا تحجز توّا من شخص آخر 🙏 اختر وقت آخر.', bad: 'الوقت هذا موش متاح، اختر وقت آخر.', err: 'صار مشكل في حجز الموعد، عاود من فضلك.', full: 'محجوز' },
    fr: { day: 'Choisissez le jour', time: 'Choisissez l’heure', none: 'Plus de créneau libre ce jour-là, choisissez un autre jour.', loading: 'Chargement des créneaux libres…', your: 'votre heure', tunis: 'heure de Tunisie', picked: 'Votre rendez-vous :', hold: 'Le créneau vous est réservé 48 h, le temps du paiement.', need: 'Choisissez le jour et l’heure du rendez-vous', taken: 'Ce créneau vient d’être réservé par quelqu’un d’autre 🙏 Choisissez-en un autre.', bad: 'Ce créneau n’est pas disponible, choisissez-en un autre.', err: 'La réservation du créneau n’a pas fonctionné, réessayez.', full: 'complet' },
    en: { day: 'Choose the day', time: 'Choose the time', none: 'No free time left that day, please choose another day.', loading: 'Loading free times…', your: 'your time', tunis: 'Tunisia time', picked: 'Your appointment:', hold: 'The time is held for you for 48 h until payment.', need: 'Choose the day and time of your appointment', taken: 'This time was just booked by someone else 🙏 Please choose another one.', bad: 'This time is not available, please choose another one.', err: 'Booking the time failed, please try again.', full: 'full' }
  };
  const lg = () => { const l = window.CH ? window.CH.getLang() : 'ar'; return T[l] ? l : 'fr'; };
  const t = k => T[lg()][k];
  const loc = () => ({ ar: 'ar-TN', fr: 'fr-FR', en: 'en-GB' }[lg()]);
  const myTZ = () => (window.CH && window.CH.tz) || Intl.DateTimeFormat().resolvedOptions().timeZone || TUN;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  // Tunisia is UTC+1 all year
  const tunisDate = ms => new Date(ms + 3600e3).toISOString().slice(0, 10);
  const isoAt = (d, min) => `${d}T${pad(Math.floor(min / 60))}:${pad(min % 60)}:00+01:00`;
  const fmtTime = (iso, tz) => new Date(iso).toLocaleTimeString(loc(), { timeZone: tz, hour: '2-digit', minute: '2-digit' });
  const fmtDay = (iso, tz, long) => new Date(iso).toLocaleDateString(loc(), { timeZone: tz, weekday: long ? 'long' : 'short', day: 'numeric', month: long ? 'long' : 'short' });

  let busyCache = null, busyAt = 0;
  async function busy(force) {
    if (!force && busyCache && Date.now() - busyAt < 60e3) return busyCache;
    const from = new Date().toISOString(), to = new Date(Date.now() + (DAYS + 2) * 864e5).toISOString();
    try {
      const { data, error } = await window.sb.rpc('agenda_busy', { p_from: from, p_to: to });
      if (error) throw error;
      busyCache = (data || []).map(b => [Date.parse(b.start_at), Date.parse(b.block_end)]);
    } catch (e) { busyCache = busyCache || []; }
    busyAt = Date.now();
    return busyCache;
  }
  function freeTimes(day, minutes, B) {
    const out = [], earliest = Date.now() + NOTICE_H * 3600e3;
    for (let m = OPEN; m + minutes <= CLOSE; m += STEP) {
      const s = Date.parse(isoAt(day, m)), e = s + (minutes + BREAK) * 6e4;
      if (s < earliest) continue;
      if (B.some(([bs, be]) => s < be && e > bs)) continue;
      out.push(isoAt(day, m));
    }
    return out;
  }
  function days() {
    const out = [];
    for (let i = 0; i < DAYS; i++) {
      const d = tunisDate(Date.now() + i * 864e5);
      if (new Date(d + 'T12:00:00+01:00').getUTCDay() === 0) continue; // Sunday closed
      out.push(d);
    }
    return out;
  }

  async function render(el, force) {
    const st = el._slots; if (!st) return;
    if (!st.B) el.innerHTML = `<p class="sl-load">${esc(t('loading'))}</p>`;
    st.B = await busy(force);
    const ds = days().map(d => ({ d, n: freeTimes(d, st.minutes, st.B).length })).filter(x => x.n > 0 || x.d === st.day);
    if (!st.day || !ds.some(x => x.d === st.day && x.n)) st.day = (ds.find(x => x.n) || {}).d || '';
    if (st.start && !freeTimes(st.day, st.minutes, st.B).includes(st.start)) st.start = '';
    const tz = myTZ(), other = tz !== TUN;
    const times = st.day ? freeTimes(st.day, st.minutes, st.B) : [];
    el.innerHTML = `<p class="sl-h">📅 ${esc(t('day'))}</p>
      <div class="sl-days">${ds.map(x => `<button type="button" class="sl-day ${x.d === st.day ? 'sel' : ''}" data-sday="${x.d}" ${x.n ? '' : 'disabled'}>${esc(fmtDay(x.d + 'T12:00:00+01:00', TUN))}</button>`).join('')}</div>
      <p class="sl-h">🕗 ${esc(t('time'))} <small>(${esc(other ? t('your') + ' · ' + tz : t('tunis'))})</small></p>
      <div class="sl-times">${times.length ? times.map(s => `<button type="button" class="sl-time ${s === st.start ? 'sel' : ''}" data-stime="${s}">${esc(fmtTime(s, tz))}${other ? `<small>${esc(fmtTime(s, TUN))} 🇹🇳</small>` : ''}</button>`).join('') : `<p class="sl-none">${esc(t('none'))}</p>`}</div>
      ${st.start ? `<p class="sl-picked">✅ ${esc(t('picked'))} <b>${esc(fmtDay(st.start, tz, true))} · ${esc(fmtTime(st.start, tz))}</b>${other ? ` <small>(${esc(fmtTime(st.start, TUN))} ${esc(t('tunis'))})</small>` : ''}<br><small>⏳ ${esc(t('hold'))}</small></p>` : ''}
      ${st.msg ? `<p class="form-error">${esc(st.msg)}</p>` : ''}`;
    el.dataset.start = st.start || '';
  }

  const CHSlots = {
    mount(el, opts) {
      if (!el) return;
      const o = opts || {};
      el.classList.add('slot-pick');
      el._slots = Object.assign(el._slots || {}, { minutes: Math.min(180, Math.max(15, Math.round(o.minutes || 60))) });
      if (!el._wired) {
        el._wired = true;
        el.addEventListener('click', e => {
          const d = e.target.closest('[data-sday]'); if (d) { el._slots.day = d.dataset.sday; el._slots.start = ''; el._slots.msg = ''; render(el); return; }
          const s = e.target.closest('[data-stime]'); if (s) { el._slots.start = s.dataset.stime; el._slots.msg = ''; render(el); }
        });
      }
      render(el);
    },
    setMinutes(el, minutes) { if (el && el._slots) { el._slots.minutes = Math.min(180, Math.max(15, Math.round(minutes || 60))); render(el); } },
    rerender(el) { if (el && el._slots) render(el); },
    value(el) {
      const s = el && el._slots && el._slots.start; if (!s) return null;
      const tz = myTZ();
      return { start: s, minutes: el._slots.minutes, labelLocal: `${fmtDay(s, tz, true)} · ${fmtTime(s, tz)} (${tz})`, labelTunis: `${fmtDay(s, TUN, true)} · ${fmtTime(s, TUN)} (${t('tunis')})` };
    },
    need: () => t('need'),
    // hold the chosen time in the database; returns the booking id or throws an Error with a message for the visitor
    async book(el, info) {
      const v = CHSlots.value(el); if (!v) throw new Error(t('need'));
      const { data, error } = await window.sb.rpc('book_slot', { p_start: v.start, p_minutes: v.minutes, p_service: String(info.service || '').slice(0, 200), p_mode: String(info.mode || '').slice(0, 40), p_name: String(info.name || '').slice(0, 120), p_phone: String(info.phone || '').slice(0, 40) });
      if (error) {
        const msg = /slot_taken/.test(error.message) ? t('taken') : /bad_time/.test(error.message) ? t('bad') : t('err');
        el._slots.start = ''; el._slots.msg = msg; await render(el, true);
        throw new Error(msg);
      }
      busyCache = null;
      return data;
    },
    // "1 h", "60 min", "1h30", "90" → minutes
    minutesOf(d) {
      const s = String((d && (d.fr || d.en || d.ar)) || d || '').toLowerCase();
      const h = s.match(/(\d+)\s*h\s*(\d+)?/); if (h) return +h[1] * 60 + (+h[2] || 0);
      const m = s.match(/(\d+)/); return m ? +m[1] : 60;
    }
  };
  window.CHSlots = CHSlots;
  // re-draw in the visitor's language when it changes
  (window.CH_HOOKS = window.CH_HOOKS || []).push(() => document.querySelectorAll('.slot-pick').forEach(el => el._slots && render(el)));
})();
