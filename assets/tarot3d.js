// "Card of the day": 3 face-down cards that flip in 3D (pure CSS transforms, no WebGL)
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const box = $('#daily-cards'); if (!box) return;
  const lg = () => (window.CH ? window.CH.getLang() : 'ar');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const UI = {
    ar: { title: '🔮 ورقة اليوم', sub: 'خذ نفساً عميقاً، ركّز على يومك… واختر ورقة.', again: 'ورقتك لليوم', full: '✨ احصل على قراءة كاملة', share: '💬 شارك ورقتك على واتساب', shareTxt: 'ورقتي لليوم', tomorrow: 'ورقة جديدة تنتظرك غداً 🌙', pick: 'اضغط على ورقة' },
    fr: { title: '🔮 La carte du jour', sub: 'Respirez profondément, pensez à votre journée… et choisissez une carte.', again: 'Votre carte du jour', full: '✨ Recevoir un tirage complet', share: '💬 Partager ma carte sur WhatsApp', shareTxt: 'Ma carte du jour', tomorrow: 'Une nouvelle carte vous attend demain 🌙', pick: 'Touchez une carte' },
    en: { title: '🔮 Card of the day', sub: 'Take a deep breath, think about your day… and choose a card.', again: 'Your card of the day', full: '✨ Get a full reading', share: '💬 Share my card on WhatsApp', shareTxt: 'My card of the day', tomorrow: 'A new card awaits you tomorrow 🌙', pick: 'Tap a card' }
  };
  const DECK = [
    { s: '☀', n: { ar: 'الشمس', fr: 'Le Soleil', en: 'The Sun' }, m: { ar: 'يوم مضيء ينتظرك. افرح بنجاحاتك الصغيرة ودع نورك يظهر.', fr: 'Une journée lumineuse vous attend. Célébrez vos petites réussites et laissez briller votre lumière.', en: 'A bright day awaits. Celebrate your small wins and let your light shine.' } },
    { s: '☾', n: { ar: 'القمر', fr: 'La Lune', en: 'The Moon' }, m: { ar: 'استمع لحدسك وأحلامك. ليس كل شيء واضحاً بعد، والجواب سيأتي في وقته.', fr: 'Écoutez votre intuition et vos rêves. Tout n’est pas encore clair, la réponse viendra en son temps.', en: 'Listen to your intuition and dreams. Not everything is clear yet; the answer will come in time.' } },
    { s: '✶', n: { ar: 'النجمة', fr: 'L’Étoile', en: 'The Star' }, m: { ar: 'الأمل يعود. أنت في طريق الشفاء، ثق في نفسك وفي الحياة.', fr: 'L’espoir revient. Vous êtes sur le chemin de la guérison : faites-vous confiance.', en: 'Hope returns. You are on the path of healing: trust yourself and life.' } },
    { s: '◎', n: { ar: 'العالم', fr: 'Le Monde', en: 'The World' }, m: { ar: 'دورة تكتمل. احتفل بما أنجزته واستعد لبداية جديدة.', fr: 'Un cycle s’achève. Honorez ce que vous avez accompli et préparez un nouveau départ.', en: 'A cycle completes. Honour what you have achieved and prepare for a new beginning.' } },
    { s: '∞', n: { ar: 'القوة', fr: 'La Force', en: 'Strength' }, m: { ar: 'قوتك في لطفك. تعامل مع التحديات بهدوء وصبر وحب.', fr: 'Votre force est dans votre douceur. Affrontez les défis avec calme, patience et amour.', en: 'Your strength lies in gentleness. Meet challenges with calm, patience and love.' } },
    { s: '❀', n: { ar: 'الإمبراطورة', fr: 'L’Impératrice', en: 'The Empress' }, m: { ar: 'الوفرة والإبداع حولك. اعتنِ بنفسك كما تعتني بمن تحب.', fr: 'L’abondance et la créativité vous entourent. Prenez soin de vous comme de ceux que vous aimez.', en: 'Abundance and creativity surround you. Care for yourself as you care for those you love.' } },
    { s: '✧', n: { ar: 'الناسك', fr: 'L’Ermite', en: 'The Hermit' }, m: { ar: 'خذ لحظة صمت لنفسك. الأجوبة التي تبحث عنها موجودة في داخلك.', fr: 'Offrez-vous un moment de silence. Les réponses que vous cherchez sont en vous.', en: 'Give yourself a moment of silence. The answers you seek are within you.' } },
    { s: '☸', n: { ar: 'عجلة الحظ', fr: 'La Roue de Fortune', en: 'Wheel of Fortune' }, m: { ar: 'تغيير جميل في الطريق. كن منفتحاً على المفاجآت.', fr: 'Un beau changement se prépare. Restez ouvert(e) aux surprises.', en: 'A beautiful change is on its way. Stay open to surprises.' } },
    { s: '♡', n: { ar: 'العشّاق', fr: 'Les Amoureux', en: 'The Lovers' }, m: { ar: 'اختر بقلبك. العلاقات الصادقة تتقوّى اليوم.', fr: 'Choisissez avec votre cœur. Les liens sincères se renforcent aujourd’hui.', en: 'Choose with your heart. Sincere bonds grow stronger today.' } },
    { s: '⚖', n: { ar: 'الاعتدال', fr: 'La Tempérance', en: 'Temperance' }, m: { ar: 'ابحث عن التوازن بين العطاء والراحة. خطوة بخطوة تصل.', fr: 'Cherchez l’équilibre entre donner et vous reposer. Pas à pas, vous y arriverez.', en: 'Seek balance between giving and resting. Step by step, you will get there.' } },
    { s: '✦', n: { ar: 'الساحر', fr: 'Le Bateleur', en: 'The Magician' }, m: { ar: 'عندك كل الأدوات لتحقيق ما تريد. ابدأ اليوم.', fr: 'Vous avez tous les outils pour réaliser vos projets. Commencez aujourd’hui.', en: 'You have every tool you need to create what you want. Begin today.' } },
    { s: '☽', n: { ar: 'الكاهنة', fr: 'La Papesse', en: 'The High Priestess' }, m: { ar: 'حكمتك الداخلية قوية. ثق بما تشعر به حتى لو لم تجد له تفسيراً.', fr: 'Votre sagesse intérieure est puissante. Faites confiance à ce que vous ressentez.', en: 'Your inner wisdom is powerful. Trust what you feel, even without explanation.' } }
  ];
  const today = new Date().toISOString().slice(0, 10);
  const KEY = 'ch_daily_card';
  const saved = (() => { try { const v = JSON.parse(localStorage.getItem(KEY)); return v && v.d === today ? v : null; } catch { return null; } })();
  let pickedSlot = saved ? saved.slot : -1, cardIdx = saved ? saved.c : -1;
  // three random different cards for today's spread
  const spread = (() => { const a = [...DECK.keys()].sort(() => Math.random() - 0.5); return a.slice(0, 3); })();
  if (cardIdx >= 0 && pickedSlot >= 0) spread[pickedSlot] = cardIdx;

  function render() {
    const u = UI[lg()] || UI.ar;
    $('#daily-title').textContent = u.title; $('#daily-sub').textContent = pickedSlot >= 0 ? u.again : u.sub;
    box.innerHTML = spread.map((ci, i) => {
      const c = DECK[ci], flipped = i === pickedSlot;
      return `<button type="button" class="tc3d ${flipped ? 'flipped' : ''} ${pickedSlot >= 0 && !flipped ? 'faded' : ''}" data-slot="${i}" style="--i:${i}" aria-label="${esc(u.pick)}" ${pickedSlot >= 0 ? 'disabled' : ''}>
        <span class="tc-inner">
          <span class="tc-face tc-back"><span class="tc-moon">☾</span></span>
          <span class="tc-face tc-front"><span class="tc-num">${['I', 'II', 'III'][i]}</span><span class="tc-sym">${c.s}</span><span class="tc-name">${esc(c.n[lg()] || c.n.fr)}</span></span>
        </span></button>`;
    }).join('');
    const res = $('#daily-result');
    if (pickedSlot >= 0) {
      const c = DECK[cardIdx], name = c.n[lg()] || c.n.fr, msg = c.m[lg()] || c.m.fr;
      const shareText = `${u.shareTxt}: ${c.s} ${name}\n“${msg}”\n\n🔮 https://www.centreholistique.net/tarot.html`;
      res.innerHTML = `<h3>${c.s} ${esc(name)}</h3><p>${esc(msg)}</p>
        <div class="form-actions"><a class="btn btn-primary" href="#lectures-list" data-goto-lectures>${esc(u.full)}</a>
        <a class="btn btn-wa" href="https://wa.me/?text=${encodeURIComponent(shareText)}" target="_blank" rel="noopener">${esc(u.share)}</a></div>
        <small>${esc(u.tomorrow)}</small>`;
      res.hidden = false;
    } else res.hidden = true;
  }
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-slot]'); if (!b || pickedSlot >= 0) return;
    pickedSlot = +b.dataset.slot; cardIdx = spread[pickedSlot];
    try { localStorage.setItem(KEY, JSON.stringify({ d: today, slot: pickedSlot, c: cardIdx })); } catch {}
    b.classList.add('flipped');
    box.querySelectorAll('.tc3d').forEach(x => { if (x !== b) x.classList.add('faded'); x.disabled = true; });
    setTimeout(render, 950);
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-goto-lectures]')) { e.preventDefault(); document.getElementById('lectures-list').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
  (window.CH_HOOKS = window.CH_HOOKS || []).push(render);
  render();
})();
