(function () {
  'use strict';
  // ================= i18n dictionary =================
  const T = {
    ar: {
      topbar: '🌐 جلسات أونلاين في كل العالم · ردّ خلال 24 ساعة',
      nav_seances: 'الجلسات', nav_tarot: 'تاروت وأوراكل', nav_formations: 'الدورات', nav_cercle: 'الاشتراك الشهري', nav_events: 'أحداث الشهر', nav_about: 'من أنا', nav_faq: 'أسئلة', nav_medit: 'التأملات', nav_blog: 'المدونة', nav_consult: 'استشارة أونلاين', nav_b2b: 'للشركات', account: 'حسابي', bn_medit: 'تأملات', bn_account: 'حسابي',
      hero_chip: 'طاقة · وعي · شفاء', cta_discovery: '📅 احجز استشارة', cta_discover: 'اكتشف الجلسات',
      trust_online: '🌐 أونلاين في كل العالم', trust_private: '🔒 سرية تامة', trust_certified: '🎓 معالجة ومكوّنة معتمدة', trust_langs: '💬 عربي · Français · English',
      stat_years: 'سنوات خبرة', stat_clients: 'شخص رافقتهم', stat_trained: 'متكوّن', stat_countries: 'بلد',
      who_title: 'هل تعيش واحدة من هذه الحالات؟', who_sub: 'لست وحدك، ويوجد طريق.', who_1: 'ضغط، قلق أو تعب لا ينتهي', who_2: 'نفس المشاكل تتكرر في حياتك', who_3: 'علاقات صعبة أو جروح عاطفية', who_4: 'توتر وثقل في العائلة', who_5: 'ضياع وتبحث عن رسالة حياتك', who_6: 'طاقة منخفضة وانسدادات', who_cta: 'احجز استشارة توجيه (30 دقيقة)',
      seances_title: 'اكتشف الجلسات', all_cats: 'كل الجلسات',
      promo_mc_title: 'ماستركلاس 2027: الوفرة والتجلّي الواعي', promo_mc_text: 'خمس أمسيات مباشرة عن بُعد من 14 إلى 18 ديسمبر لتدخل عام 2027 بطاقة جديدة ونيّة واضحة. المقاعد محدودة.', promo_mc_btn: 'اكتشف الماستركلاس ←',
      promo_tarot_title: 'تاروت وأوراكل', promo_tarot_text: 'قراءة الحب، العمل، السنة القادمة، أوراكل الملائكة… اختر نوع القراءة والطريقة التي تناسبك.', promo_tarot_btn: 'اختر قراءتك ←',
      formations_title: 'الدورات التكوينية', level: 'المستوى', program: 'البرنامج الكامل ←', formations_sub: 'شهادة معتمدة · حضوري أو أونلاين',
      cercle_eyebrow: 'العضوية الشهرية', cercle_title: 'انضم إلى الدائرة', cercle_sub: 'أنشطة كل شهر، مجتمع داعم ومرافقة مستمرة — أينما كنت في العالم.',
      bill_monthly: 'شهري', bill_yearly: 'سنوي (شهرين مجاناً)', per_month: '/ شهر', per_year: '/ سنة', join: 'انضم الآن', popular: 'الأكثر اختياراً', cancel_any: 'إلغاء في أي وقت',
      events_title: 'أحداث الشهر', events_sub: 'مباشر · أونلاين', members_only: 'للأعضاء', free_all: 'مجاني للجميع', reserve_place: 'احجز مكانك', tunis_time: 'توقيت تونس', your_time: 'بتوقيتك',
      packs_title: 'الباقات', packs_sub: 'جلسات أكثر، بسعر أقل', sessions: 'جلسات', save: 'وفّر',
      gift_card: 'بطاقة هدية', gift_eyebrow: 'هدية لها معنى', gift_title: 'أهدِ جلسة لمن تحب', gift_text: 'عيد ميلاد، زواج، أو مجرد لفتة حب… بطاقة هدية لأي جلسة أو باقة، تصل باسم الشخص مع رسالتك.',
      f_from: 'اسمك', f_to: 'اسم الشخص', f_gift_choice: 'الهدية', f_gift_msg: 'رسالتك (اختياري)', gift_btn: 'اطلب بطاقة الهدية عبر واتساب',
      about_eyebrow: 'من أنا', about_iam: 'أنا', certifs_title: 'التكوين والشهادات', cta_book: 'احجز موعدك',
      steps_title: 'كيف تتم الجلسة؟', step1_t: 'الحجز', step1_d: 'اختر جلستك وأضفها للسلة أو احجز مباشرة.', step2_t: 'التأكيد', step2_d: 'أتواصل معك على واتساب لتأكيد الموعد والدفع.', step3_t: 'الجلسة', step3_d: 'في المركز أو أونلاين، في إطار آمن ومريح.', step4_t: 'المتابعة', step4_d: 'نصائح شخصية ومتابعة لتثبيت النتائج.',
      testi_title: 'آراء الحرفاء',
      book_eyebrow: 'حجز موعد', book_title: 'احجز جلستك مباشرة', book_text: 'املأ الاستمارة وسيصلني طلبك على واتساب، وأؤكد لك الموعد في أقرب وقت. التوقيت يُحتسب حسب بلدك تلقائياً.',
      f_name: 'الاسم واللقب *', f_phone: 'الهاتف / واتساب (مع رمز البلد) *', f_choice: 'الجلسة أو الدورة *', f_date: 'التاريخ المفضّل', f_time: 'الوقت (بتوقيتك)', tz_yours: 'توقيتك:', f_mode: 'الطريقة', f_msg: 'رسالتك / نيّتك', f_consent: 'أوافق على أن يتم التواصل معي لتأكيد الطلب.', f_note: 'ملاحظة', f_email: 'البريد الإلكتروني (للقراءة المكتوبة)', f_question: 'سؤالك أو موضوع القراءة', f_birth: 'تاريخ الميلاد (اختياري)',
      mode_online: 'أونلاين (فيديو)', mode_center: 'في المركز بتونس (صفاقس)', choose: '— اختر —',
      send_wa: 'إرسال عبر واتساب', send_order: 'إرسال الطلب عبر واتساب', add_cart: 'أضف للسلة', add: 'أضف للسلة', choose_reading: 'اختر نوع القراءة ←',
      faq_title: 'أسئلة شائعة', follow_title: 'تابعني يومياً', follow_text: 'نصائح، طاقة اليوم، قراءات مجانية ولايفات على شبكات التواصل.',
      install: '📲 ثبّت التطبيق', install_ios: 'على iPhone: اضغط زر المشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية».',
      footer_contact: 'تواصل', footer_links: 'روابط', footer_admin: 'لوحة التحكم', rights: 'جميع الحقوق محفوظة.', legal: 'الشروط والخصوصية', more: 'اقرأ أكثر ←', about_page: 'تعرّف على Rawia Ghorbel ←', directions: 'كيف تصل إلى المركز ←', nl_eyebrow: 'ابقَ على تواصل 💌', nl_title: 'احصل على جديدنا وكل العروض', nl_text: 'دورات جديدة، أحداث الشهر، عروض خاصة بالمشتركين فقط وطاقة كل شهر… تصلك مباشرة في بريدك.', nl_name: 'اسمك', nl_email: 'بريدك الإلكتروني', nl_btn: 'اشترك ✨', nl_ok: '✓ شكراً! أنت الآن من عائلة Centre Holistique 💜 ستصلك كل الأخبار والعروض.', nl_go: '🌿 اكتشف الجلسات', nl_err: 'الرجاء كتابة بريد إلكتروني صحيح.', nl_privacy: 'لا رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.', accept_terms: 'بإرسال الطلب، أنت توافق على', disclaimer: 'العلاجات الشمولية مكمّلة ولا تعوّض الاستشارة الطبية.',
      cart_title: 'سلّتك', cart_empty: 'سلّتك فارغة 🌿', total: 'المجموع', chat: 'كيف يمكنني مساعدتك؟',
      bn_home: 'الرئيسية', bn_tarot: 'تاروت', bn_consult: 'استشارة', bn_events: 'أحداث الشهر', bn_cart: 'السلة',
      online: 'أونلاين', new: 'جديد', places: 'أماكن', cards: 'أوراق', selected: '✓ تم الاختيار',
      t_soins: 'جلسة', t_formations: 'دورة', t_packs: 'باقة', t_lectures: 'قراءة', t_abonnements: 'اشتراك', t_evenements: 'حدث',
      g_sessions: 'الجلسات', g_lectures: 'قراءات التاروت والأوراكل', g_formations: 'الدورات', g_packs: 'الباقات', g_abonnements: 'الاشتراك الشهري',
      toast_added: 'تمت الإضافة إلى السلة ✓', err_fill: 'الرجاء إكمال: ', err_reading: 'اختر نوع القراءة أولاً', err_format: 'اختر الطريقة',
      lbl_name: 'الاسم', lbl_phone: 'الهاتف', lbl_tz: 'التوقيت', lbl_consent: 'الموافقة', lbl_choice: 'الاختيار',
      tarot_chip: '🔮 تاروت · أوراكل', tarot_h1: 'اختر قراءتك', tarot_intro: 'قراءات حدسية ولطيفة تضيء طريقك. اختر نوع القراءة، ثم الطريقة التي تناسبك: فيديو مباشر، قراءة مكتوبة أو رسالة صوتية — أينما كنت في العالم.',
      tarot_step1: 'اختر نوع القراءة', tarot_step2: 'اختر الطريقة', tarot_step3: 'سؤالك ومعلوماتك', jeu_all: 'الكل', jeu_tarot: 'تاروت', jeu_oracle: 'أوراكل', jeu_combo: 'تاروت + أوراكل',
      tarot_how_title: 'كيف تتم القراءة؟', fmt_video_t: 'فيديو مباشر', fmt_video_d: 'نلتقي على Zoom أو واتساب فيديو، أسحب الأوراق أمامك ونتحدث معاً.', fmt_ecrit_t: 'قراءة مكتوبة', fmt_ecrit_d: 'تصلك القراءة مفصّلة مع صور الأوراق في ملف PDF خلال 48 ساعة.', fmt_vocal_t: 'رسالة صوتية', fmt_vocal_d: 'تصلك القراءة كرسالة صوتية على واتساب مع صورة السحب.',
      tarot_disclaimer: 'القراءات أداة للتأمل والتوجيه، ولا تعوّض نصيحة طبية أو قانونية أو مالية.', no_reading: 'لم تختر قراءة بعد.',
      m_booking: '🌿 طلب موعد جديد', m_order: '🛒 طلب جديد من الموقع', m_gift: '🎁 طلب بطاقة هدية', m_tarot: '🔮 طلب قراءة', m_discovery: 'مرحباً! أريد حجز مكالمة التعارف المجانية (15 دقيقة).', m_event: '📅 أريد المشاركة في', m_join: '✨ أريد الاشتراك في',
      w_date: 'التاريخ المفضّل', w_time_local: 'الوقت بتوقيتي', w_time_tunis: 'بتوقيت تونس', w_mode: 'الطريقة', w_msg: 'الرسالة', w_from: 'من', w_to: 'إلى', w_choice: 'الاختيار', w_format: 'الطريقة', w_question: 'السؤال', w_birth: 'تاريخ الميلاد', w_email: 'البريد', w_total: 'المجموع', w_currency: 'العملة', w_lang: 'اللغة', w_billing: 'الدفع',
      pay_title: 'طرق الدفع', pay_sub: 'من تونس أو من أي بلد في العالم', pay_tn: '🇹🇳 من تونس', pay_intl: '🌍 من الخارج',
      pay_d17_t: 'D17 (البريد التونسي)', pay_d17_d: 'أرسل المبلغ من تطبيق D17 إلى هذا الرقم:', pay_flouci_t: 'Flouci', pay_flouci_d: 'أرسل المبلغ من تطبيق Flouci إلى هذا الرقم:',
      pay_rib_t: 'تحويل بنكي', pay_rib_d: 'حوّل المبلغ إلى هذا الحساب (RIB):', pay_intlbank_t: 'تحويل بنكي دولي (Wise…)', pay_intlbank_d: 'من بنكك أو من Wise إلى هذا الحساب في تونس (IBAN: TN59 + RIB):',
      pay_payoneer_t: 'بطاقة بنكية Visa / Mastercard', pay_payoneer_d: 'ادفع بأمان ببطاقتك عبر Payoneer:', pay_payoneer_btn: '💳 ادفع بالبطاقة', pay_payoneer_mail: 'أرسل لي طلب دفع Payoneer على بريدك — أو استعمل هذا البريد:',
      pay_wu_t: 'Western Union / MoneyGram / Ria', pay_wu_d: 'أرسل المبلغ باسم:', pay_city: 'المدينة', pay_country: 'البلد: تونس',
      pay_after: '📸 بعد الدفع، أرسل صورة الوصل على واتساب وسأؤكد حجزك في أقرب وقت.', pay_proof_btn: '📸 أرسل الوصل على واتساب', pay_total: 'المبلغ',
      pay_none: 'تواصل معي على واتساب لأرسل لك طريقة الدفع المناسبة لبلدك.', copy: 'نسخ', copied: '✓ تم النسخ', close: 'إغلاق', wa_contact: 'تواصل معي على واتساب', wa_pay_msg: 'مرحباً! عندي سؤال على الدفع', pay_open: '💳 طرق الدفع', pay_order_sent: '✓ تم إرسال طلبك! اختر طريقة الدفع:'
    },
    fr: {
      topbar: '🌐 Séances en ligne dans le monde entier · réponse sous 24 h',
      nav_seances: 'Séances', nav_tarot: 'Tarot & Oracle', nav_formations: 'Formations', nav_cercle: 'Abonnement', nav_events: 'Événements', nav_about: 'À propos', nav_faq: 'FAQ', nav_medit: 'Méditations', nav_blog: 'Blog', nav_consult: 'Consultation en ligne', nav_b2b: 'Entreprises', account: 'Mon espace', bn_medit: 'Méditations', bn_account: 'Mon espace',
      hero_chip: 'Énergie · Conscience · Guérison', cta_discovery: '📅 Réserver une consultation', cta_discover: 'Découvrir les séances',
      trust_online: '🌐 En ligne partout dans le monde', trust_private: '🔒 Confidentialité totale', trust_certified: '🎓 Thérapeute & formatrice certifiée', trust_langs: '💬 عربي · Français · English',
      stat_years: "ans d'expérience", stat_clients: 'personnes accompagnées', stat_trained: 'élèves formés', stat_countries: 'pays',
      who_title: 'Vous reconnaissez-vous ?', who_sub: "Vous n'êtes pas seul(e), il existe un chemin.", who_1: 'Stress, anxiété ou fatigue persistante', who_2: 'Les mêmes problèmes se répètent', who_3: 'Relations difficiles, blessures affectives', who_4: 'Tensions et poids familiaux', who_5: 'Perdu(e), en quête de sens', who_6: 'Énergie basse et blocages', who_cta: "Réserver une consultation d'orientation (30 min)",
      seances_title: 'Découvrez les séances', all_cats: 'Toutes les séances',
      promo_mc_title: 'Masterclass 2027 : Abondance & Manifestation consciente', promo_mc_text: 'Cinq soirées en direct en ligne, du 14 au 18 décembre, pour entrer dans 2027 avec une énergie nouvelle et une intention claire. Places limitées.', promo_mc_btn: 'Découvrir la masterclass →',
      promo_tarot_title: 'Tarot & Oracle', promo_tarot_text: "Amour, travail, année à venir, Oracle des Anges… choisissez votre tirage et le format qui vous convient.", promo_tarot_btn: 'Choisir mon tirage →',
      formations_title: 'Formations', level: 'Niveau', program: 'Programme complet →', formations_sub: 'Certifiantes · en présentiel ou en ligne',
      cercle_eyebrow: 'Abonnement mensuel', cercle_title: 'Rejoignez le Cercle', cercle_sub: "Des activités chaque mois, une communauté bienveillante et un accompagnement continu — où que vous soyez.",
      bill_monthly: 'Mensuel', bill_yearly: 'Annuel (2 mois offerts)', per_month: '/ mois', per_year: '/ an', join: 'Je rejoins', popular: 'Le plus choisi', cancel_any: 'Résiliable à tout moment',
      events_title: 'Événements du mois', events_sub: 'En direct · en ligne', members_only: 'Membres', free_all: 'Gratuit pour tous', reserve_place: 'Réserver ma place', tunis_time: 'heure tunisienne', your_time: 'chez vous',
      packs_title: 'Packs', packs_sub: 'Plus de séances, moins cher', sessions: 'séances', save: 'Économisez',
      gift_card: 'Carte cadeau', gift_eyebrow: 'Un cadeau qui a du sens', gift_title: 'Offrez une séance', gift_text: "Anniversaire, mariage ou simple attention… une carte cadeau pour toute séance ou tout pack, au nom de la personne avec votre message.",
      f_from: 'Votre nom', f_to: 'Nom du bénéficiaire', f_gift_choice: 'Le cadeau', f_gift_msg: 'Votre message (facultatif)', gift_btn: 'Commander la carte cadeau via WhatsApp',
      about_eyebrow: 'Qui suis-je ?', about_iam: 'Je suis', certifs_title: 'Formations & certifications', cta_book: 'Prendre rendez-vous',
      steps_title: 'Comment ça se passe ?', step1_t: 'Réservation', step1_d: 'Choisissez votre séance, ajoutez-la au panier ou réservez directement.', step2_t: 'Confirmation', step2_d: 'Je vous contacte sur WhatsApp pour confirmer le rendez-vous et le paiement.', step3_t: 'Séance', step3_d: 'Au centre ou en ligne, dans un cadre sûr et doux.', step4_t: 'Suivi', step4_d: 'Conseils personnalisés et suivi pour ancrer les bienfaits.',
      testi_title: 'Témoignages',
      book_eyebrow: 'Réservation', book_title: 'Réservez votre séance', book_text: "Remplissez le formulaire : votre demande m'arrive sur WhatsApp et je vous confirme rapidement. Le fuseau horaire est calculé automatiquement.",
      f_name: 'Nom complet *', f_phone: 'Téléphone / WhatsApp (avec indicatif) *', f_choice: 'Séance ou formation *', f_date: 'Date souhaitée', f_time: 'Heure (chez vous)', tz_yours: 'Votre fuseau :', f_mode: 'Format', f_msg: 'Votre message / intention', f_consent: "J'accepte d'être recontacté(e) pour confirmer ma demande.", f_note: 'Note', f_email: 'E-mail (pour une lecture écrite)', f_question: 'Votre question ou le thème du tirage', f_birth: 'Date de naissance (facultatif)',
      mode_online: 'En ligne (visio)', mode_center: 'Au centre à Sfax (Tunisie)', choose: '— Choisir —',
      send_wa: 'Envoyer via WhatsApp', send_order: 'Envoyer la commande via WhatsApp', add_cart: 'Ajouter au panier', add: 'Ajouter', choose_reading: 'Choisir le tirage →',
      faq_title: 'Questions fréquentes', follow_title: 'Suivez-moi au quotidien', follow_text: "Conseils, énergie du jour, tirages gratuits et lives sur les réseaux sociaux.",
      install: "📲 Installer l'application", install_ios: "Sur iPhone : touchez Partager ⬆️ puis « Sur l'écran d'accueil ».",
      footer_contact: 'Contact', footer_links: 'Liens', footer_admin: 'Espace admin', rights: 'Tous droits réservés.', legal: 'Mentions légales & CGV', more: 'En savoir plus →', about_page: 'Découvrir Rawia Ghorbel →', directions: 'Itinéraire vers le centre →', nl_eyebrow: 'Restons en contact 💌', nl_title: 'Recevez nos nouveautés et toutes nos offres', nl_text: 'Nouvelles formations, événements du mois, offres réservées aux abonnés et énergie du mois… directement dans votre boîte mail.', nl_name: 'Votre prénom', nl_email: 'Votre e-mail', nl_btn: 'Je m’inscris ✨', nl_ok: '✓ Merci ! Vous faites maintenant partie de la famille Centre Holistique 💜 Vous recevrez toutes nos nouveautés et offres.', nl_go: '🌿 Découvrir les séances', nl_err: 'Merci d’indiquer un e-mail valide.', nl_privacy: 'Pas de spam. Désinscription possible à tout moment.', accept_terms: 'En envoyant, vous acceptez les', disclaimer: 'Les soins holistiques sont complémentaires et ne remplacent pas un avis médical.',
      cart_title: 'Votre panier', cart_empty: 'Votre panier est vide 🌿', total: 'Total', chat: 'Comment puis-je vous aider ?',
      bn_home: 'Accueil', bn_tarot: 'Tarot', bn_consult: 'Consultation', bn_events: 'Événements', bn_cart: 'Panier',
      online: 'En ligne', new: 'Nouveau', places: 'places', cards: 'cartes', selected: '✓ Sélectionné',
      t_soins: 'Séance', t_formations: 'Formation', t_packs: 'Pack', t_lectures: 'Tirage', t_abonnements: 'Abonnement', t_evenements: 'Événement',
      g_sessions: 'Séances', g_lectures: 'Tirages Tarot & Oracle', g_formations: 'Formations', g_packs: 'Packs', g_abonnements: 'Abonnement mensuel',
      toast_added: 'Ajouté au panier ✓', err_fill: 'Merci de compléter : ', err_reading: "Choisissez d'abord un tirage", err_format: 'Choisissez un format',
      lbl_name: 'nom', lbl_phone: 'téléphone', lbl_tz: 'fuseau', lbl_consent: 'consentement', lbl_choice: 'choix',
      tarot_chip: '🔮 Tarot · Oracle', tarot_h1: 'Choisissez votre tirage', tarot_intro: "Des lectures intuitives et bienveillantes pour éclairer votre chemin. Choisissez le tirage, puis le format : visio en direct, lecture écrite ou message vocal — où que vous soyez.",
      tarot_step1: 'Choisissez le tirage', tarot_step2: 'Choisissez le format', tarot_step3: 'Votre question & vos coordonnées', jeu_all: 'Tous', jeu_tarot: 'Tarot', jeu_oracle: 'Oracle', jeu_combo: 'Tarot + Oracle',
      tarot_how_title: 'Comment se passe le tirage ?', fmt_video_t: 'Visio en direct', fmt_video_d: "Nous nous retrouvons sur Zoom ou WhatsApp, je tire les cartes devant vous et nous échangeons.", fmt_ecrit_t: 'Lecture écrite', fmt_ecrit_d: 'Vous recevez une lecture détaillée avec les photos des cartes en PDF sous 48 h.', fmt_vocal_t: 'Message vocal', fmt_vocal_d: 'Vous recevez la lecture en message vocal WhatsApp avec la photo du tirage.',
      tarot_disclaimer: "Les tirages sont un outil de réflexion et de guidance ; ils ne remplacent pas un avis médical, juridique ou financier.", no_reading: "Aucun tirage choisi pour l'instant.",
      m_booking: '🌿 Nouvelle demande de rendez-vous', m_order: '🛒 Nouvelle commande', m_gift: '🎁 Demande de carte cadeau', m_tarot: '🔮 Demande de tirage', m_discovery: "Bonjour ! J'aimerais réserver l'appel découverte gratuit (15 min).", m_event: '📅 Je souhaite participer à', m_join: '✨ Je souhaite rejoindre',
      w_date: 'Date souhaitée', w_time_local: 'Heure chez moi', w_time_tunis: 'Heure tunisienne', w_mode: 'Format', w_msg: 'Message', w_from: 'De', w_to: 'Pour', w_choice: 'Choix', w_format: 'Format', w_question: 'Question', w_birth: 'Date de naissance', w_email: 'E-mail', w_total: 'Total', w_currency: 'Devise', w_lang: 'Langue', w_billing: 'Facturation',
      pay_title: 'Moyens de paiement', pay_sub: "Depuis la Tunisie ou n'importe quel pays", pay_tn: '🇹🇳 Depuis la Tunisie', pay_intl: "🌍 Depuis l'étranger",
      pay_d17_t: 'D17 (La Poste)', pay_d17_d: "Envoyez le montant depuis l'application D17 à ce numéro :", pay_flouci_t: 'Flouci', pay_flouci_d: "Envoyez le montant depuis l'application Flouci à ce numéro :",
      pay_rib_t: 'Virement bancaire', pay_rib_d: 'Virez le montant sur ce compte (RIB) :', pay_intlbank_t: 'Virement international (Wise…)', pay_intlbank_d: 'Depuis votre banque ou Wise vers ce compte en Tunisie (IBAN : TN59 + RIB) :',
      pay_payoneer_t: 'Carte bancaire Visa / Mastercard', pay_payoneer_d: 'Payez en toute sécurité par carte via Payoneer :', pay_payoneer_btn: '💳 Payer par carte', pay_payoneer_mail: 'Je vous envoie une demande de paiement Payoneer par e-mail — ou utilisez cette adresse :',
      pay_wu_t: 'Western Union / MoneyGram / Ria', pay_wu_d: 'Envoyez le montant au nom de :', pay_city: 'Ville', pay_country: 'Pays : Tunisie',
      pay_after: '📸 Après le paiement, envoyez la photo du reçu sur WhatsApp et je confirme votre réservation rapidement.', pay_proof_btn: '📸 Envoyer le reçu sur WhatsApp', pay_total: 'Montant',
      pay_none: 'Contactez-moi sur WhatsApp pour recevoir le moyen de paiement adapté à votre pays.', copy: 'Copier', copied: '✓ Copié', close: 'Fermer', wa_contact: 'Me contacter sur WhatsApp', wa_pay_msg: "Bonjour ! J'ai une question sur le paiement", pay_open: '💳 Moyens de paiement', pay_order_sent: '✓ Demande envoyée ! Choisissez votre moyen de paiement :'
    },
    en: {
      topbar: '🌐 Online sessions worldwide · reply within 24 h',
      nav_seances: 'Sessions', nav_tarot: 'Tarot & Oracle', nav_formations: 'Trainings', nav_cercle: 'Membership', nav_events: 'Events', nav_about: 'About', nav_faq: 'FAQ', nav_medit: 'Meditations', nav_blog: 'Blog', nav_consult: 'Online consultation', nav_b2b: 'For companies', account: 'My space', bn_medit: 'Meditate', bn_account: 'Account',
      hero_chip: 'Energy · Awareness · Healing', cta_discovery: '📅 Book a consultation', cta_discover: 'Explore sessions',
      trust_online: '🌐 Online worldwide', trust_private: '🔒 Fully confidential', trust_certified: '🎓 Certified therapist & trainer', trust_langs: '💬 عربي · Français · English',
      stat_years: 'years of experience', stat_clients: 'people supported', stat_trained: 'students trained', stat_countries: 'countries',
      who_title: 'Does this sound like you?', who_sub: "You're not alone, and there is a way forward.", who_1: 'Stress, anxiety or constant fatigue', who_2: 'The same problems keep repeating', who_3: 'Difficult relationships or emotional wounds', who_4: 'Family tension and heaviness', who_5: 'Feeling lost, searching for purpose', who_6: 'Low energy and blockages', who_cta: 'Book a guidance consultation (30 min)',
      seances_title: 'Explore sessions', all_cats: 'All sessions',
      promo_mc_title: 'Masterclass 2027: Abundance & Conscious Manifestation', promo_mc_text: 'Five live online evenings, December 14–18, to enter 2027 with new energy and a clear intention. Limited seats.', promo_mc_btn: 'Discover the masterclass →',
      promo_tarot_title: 'Tarot & Oracle', promo_tarot_text: 'Love, career, the year ahead, Angel Oracle… choose your reading and the format that suits you.', promo_tarot_btn: 'Choose my reading →',
      formations_title: 'Trainings', level: 'Level', program: 'Full programme →', formations_sub: 'Certified · in person or online',
      cercle_eyebrow: 'Monthly membership', cercle_title: 'Join the Circle', cercle_sub: 'Monthly activities, a caring community and ongoing support — wherever you are in the world.',
      bill_monthly: 'Monthly', bill_yearly: 'Yearly (2 months free)', per_month: '/ month', per_year: '/ year', join: 'Join now', popular: 'Most popular', cancel_any: 'Cancel anytime',
      events_title: "This month's events", events_sub: 'Live · online', members_only: 'Members', free_all: 'Free for everyone', reserve_place: 'Save my spot', tunis_time: 'Tunisia time', your_time: 'your time',
      packs_title: 'Bundles', packs_sub: 'More sessions, lower price', sessions: 'sessions', save: 'Save',
      gift_card: 'Gift card', gift_eyebrow: 'A meaningful gift', gift_title: 'Gift a session', gift_text: 'Birthday, wedding or simply a gesture of love… a gift card for any session or bundle, in their name with your message.',
      f_from: 'Your name', f_to: "Recipient's name", f_gift_choice: 'The gift', f_gift_msg: 'Your message (optional)', gift_btn: 'Order the gift card via WhatsApp',
      about_eyebrow: 'About me', about_iam: "I'm", certifs_title: 'Training & certifications', cta_book: 'Book a session',
      steps_title: 'How does it work?', step1_t: 'Book', step1_d: 'Choose your session, add it to your cart or book directly.', step2_t: 'Confirm', step2_d: 'I contact you on WhatsApp to confirm the time and payment.', step3_t: 'Session', step3_d: 'At the centre or online, in a safe and gentle space.', step4_t: 'Follow-up', step4_d: 'Personal advice and follow-up to anchor the results.',
      testi_title: 'Testimonials',
      book_eyebrow: 'Booking', book_title: 'Book your session', book_text: 'Fill in the form: your request reaches me on WhatsApp and I confirm quickly. Your time zone is handled automatically.',
      f_name: 'Full name *', f_phone: 'Phone / WhatsApp (with country code) *', f_choice: 'Session or training *', f_date: 'Preferred date', f_time: 'Time (your time)', tz_yours: 'Your time zone:', f_mode: 'Format', f_msg: 'Your message / intention', f_consent: 'I agree to be contacted to confirm my request.', f_note: 'Note', f_email: 'Email (for written readings)', f_question: 'Your question or reading topic', f_birth: 'Date of birth (optional)',
      mode_online: 'Online (video)', mode_center: 'At the centre in Sfax, Tunisia', choose: '— Choose —',
      send_wa: 'Send via WhatsApp', send_order: 'Send order via WhatsApp', add_cart: 'Add to cart', add: 'Add to cart', choose_reading: 'Choose reading →',
      faq_title: 'FAQ', follow_title: 'Follow me daily', follow_text: 'Tips, daily energy, free readings and lives on social media.',
      install: '📲 Install the app', install_ios: 'On iPhone: tap Share ⬆️ then "Add to Home Screen".',
      footer_contact: 'Contact', footer_links: 'Links', footer_admin: 'Admin', rights: 'All rights reserved.', legal: 'Legal & terms', more: 'Learn more →', about_page: 'Meet Rawia Ghorbel →', directions: 'Directions to the centre →', nl_eyebrow: 'Stay in touch 💌', nl_title: 'Get our news and all our offers', nl_text: 'New trainings, monthly events, subscriber-only offers and the energy of the month… straight to your inbox.', nl_name: 'Your first name', nl_email: 'Your email', nl_btn: 'Subscribe ✨', nl_ok: '✓ Thank you! You are now part of the Centre Holistique family 💜 You will receive all our news and offers.', nl_go: '🌿 Explore sessions', nl_err: 'Please enter a valid email.', nl_privacy: 'No spam. Unsubscribe anytime.', accept_terms: 'By sending, you accept the', disclaimer: 'Holistic sessions are complementary and do not replace medical advice.',
      cart_title: 'Your cart', cart_empty: 'Your cart is empty 🌿', total: 'Total', chat: 'How can I help you?',
      bn_home: 'Home', bn_tarot: 'Tarot', bn_consult: 'Consult', bn_events: 'Events', bn_cart: 'Cart',
      online: 'Online', new: 'New', places: 'spots', cards: 'cards', selected: '✓ Selected',
      t_soins: 'Session', t_formations: 'Training', t_packs: 'Bundle', t_lectures: 'Reading', t_abonnements: 'Membership', t_evenements: 'Event',
      g_sessions: 'Sessions', g_lectures: 'Tarot & Oracle readings', g_formations: 'Trainings', g_packs: 'Bundles', g_abonnements: 'Monthly membership',
      toast_added: 'Added to cart ✓', err_fill: 'Please complete: ', err_reading: 'Choose a reading first', err_format: 'Choose a format',
      lbl_name: 'name', lbl_phone: 'phone', lbl_tz: 'time zone', lbl_consent: 'consent', lbl_choice: 'choice',
      tarot_chip: '🔮 Tarot · Oracle', tarot_h1: 'Choose your reading', tarot_intro: 'Intuitive, caring readings to light your path. Choose the reading, then the format: live video, written reading or voice message — wherever you are.',
      tarot_step1: 'Choose the reading', tarot_step2: 'Choose the format', tarot_step3: 'Your question & details', jeu_all: 'All', jeu_tarot: 'Tarot', jeu_oracle: 'Oracle', jeu_combo: 'Tarot + Oracle',
      tarot_how_title: 'How does a reading work?', fmt_video_t: 'Live video', fmt_video_d: 'We meet on Zoom or WhatsApp video, I draw the cards in front of you and we talk.', fmt_ecrit_t: 'Written reading', fmt_ecrit_d: 'You receive a detailed reading with photos of the cards as a PDF within 48 h.', fmt_vocal_t: 'Voice message', fmt_vocal_d: 'You receive the reading as a WhatsApp voice message with a photo of the spread.',
      tarot_disclaimer: 'Readings are a tool for reflection and guidance; they do not replace medical, legal or financial advice.', no_reading: 'No reading selected yet.',
      m_booking: '🌿 New booking request', m_order: '🛒 New order', m_gift: '🎁 Gift card request', m_tarot: '🔮 Reading request', m_discovery: "Hello! I'd like to book the free 15-min discovery call.", m_event: "📅 I'd like to join", m_join: "✨ I'd like to join",
      w_date: 'Preferred date', w_time_local: 'My local time', w_time_tunis: 'Tunisia time', w_mode: 'Format', w_msg: 'Message', w_from: 'From', w_to: 'To', w_choice: 'Choice', w_format: 'Format', w_question: 'Question', w_birth: 'Date of birth', w_email: 'Email', w_total: 'Total', w_currency: 'Currency', w_lang: 'Language', w_billing: 'Billing',
      pay_title: 'Payment methods', pay_sub: 'From Tunisia or anywhere in the world', pay_tn: '🇹🇳 From Tunisia', pay_intl: '🌍 From abroad',
      pay_d17_t: 'D17 (La Poste)', pay_d17_d: 'Send the amount from the D17 app to this number:', pay_flouci_t: 'Flouci', pay_flouci_d: 'Send the amount from the Flouci app to this number:',
      pay_rib_t: 'Bank transfer', pay_rib_d: 'Transfer the amount to this account (RIB):', pay_intlbank_t: 'International transfer (Wise…)', pay_intlbank_d: 'From your bank or Wise to this account in Tunisia (IBAN: TN59 + RIB):',
      pay_payoneer_t: 'Card payment Visa / Mastercard', pay_payoneer_d: 'Pay securely by card via Payoneer:', pay_payoneer_btn: '💳 Pay by card', pay_payoneer_mail: "I'll email you a Payoneer payment request — or use this address:",
      pay_wu_t: 'Western Union / MoneyGram / Ria', pay_wu_d: 'Send the amount to:', pay_city: 'City', pay_country: 'Country: Tunisia',
      pay_after: "📸 After paying, send a photo of the receipt on WhatsApp and I'll confirm your booking quickly.", pay_proof_btn: '📸 Send receipt on WhatsApp', pay_total: 'Amount',
      pay_none: "Message me on WhatsApp and I'll send you the right payment method for your country.", copy: 'Copy', copied: '✓ Copied', close: 'Close', wa_contact: 'Contact me on WhatsApp', wa_pay_msg: 'Hello! I have a question about payment', pay_open: '💳 Payment methods', pay_order_sent: '✓ Request sent! Choose how to pay:'
    }
  };

  const ICONS = {
    energy: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    book: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>',
    cards: '<rect x="3" y="5" width="11" height="15" rx="2"/><path d="M10 4.5 17 3l3.5 14.5-6.5 1.6"/><path d="M8.5 10.5l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z"/>',
    tree: '<circle cx="12" cy="4.5" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><circle cx="8.5" cy="20" r="1.6"/><circle cx="15.5" cy="20" r="1.6"/><path d="M12 6.5V10M12 10H5v1M12 10h7v1M5 15l3.5 3.4M19 15l-3.5 3.4"/>',
    mind: '<path d="M9 21v-3H7a2 2 0 0 1-2-2v-3l-2-1 2-3a7 7 0 0 1 14 2c0 2.2-1 3.8-2 5v5"/><path d="M11 9a2 2 0 1 1 3 1.7V12"/>',
    hands: '<path d="M12 21c-3-2-7-4-7-9V7.5a1.5 1.5 0 0 1 3 0V11M12 21c3-2 7-4 7-9V7.5a1.5 1.5 0 0 0-3 0V11"/><path d="M12 3v3M8.5 4.5l1 2M15.5 4.5l-1 2"/>',
    lotus: '<path d="M12 4c2.5 3 2.5 8 0 12c-2.5-4-2.5-9 0-12z"/><path d="M12 16c-1.5-4-5-6.5-9-6.5c.5 4 4 7 9 6.5zM12 16c1.5-4 5-6.5 9-6.5c-.5 4-4 7-9 6.5z"/><path d="M5 20h14"/>',
    star: '<path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    crystal: '<path d="M12 2 6 8l6 14 6-14z"/><path d="M6 8h12M12 2v20"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1zm0 0c2-4 6-4 6-1s-6 1-6 1z"/>'
  };
  const SOCIAL_SVG = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
    facebook: '<path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 5"/>',
    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/>'
  };

  // ================= helpers =================
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const svg = k => `<svg viewBox="0 0 24 24">${ICONS[k] || ICONS.star}</svg>`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const safeImg = u => /^(https?:\/\/|assets\/)/i.test(u || '') ? u : '';
  const TZ = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; } })();
  const LOCALE = { ar: 'ar-TN', fr: 'fr-FR', en: 'en-GB' };

  // language
  const urlLang = new URLSearchParams(location.search).get('lang');
  let lang = ['ar', 'fr', 'en'].includes(urlLang) ? urlLang : store.get('ch_lang', null);
  if (!lang) { const n = (navigator.language || 'ar').slice(0, 2); lang = n === 'fr' ? 'fr' : n === 'ar' ? 'ar' : (TZ === 'Africa/Tunis' ? 'ar' : 'en'); }
  // currency
  let cur = store.get('ch_cur', null);
  if (!cur) cur = TZ === 'Africa/Tunis' ? 'tnd' : /^America\//.test(TZ) ? 'usd' : 'eur';

  const t = k => (T[lang] && T[lang][k]) ?? T.ar[k] ?? k;
  const L = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] || v.fr || v.en || v.ar || '') : (v ?? '');
  const fmtDate = d => { try { return new Date(d + 'T00:00:00').toLocaleDateString(LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'long' }); } catch { return d; } };
  function priceOf(p) {
    if (!p) return null;
    if (typeof p !== 'object') return { v: +p, c: 'tnd' };
    if (p[cur] !== undefined && p[cur] !== '') return { v: +p[cur], c: cur };
    if (p.tnd) return { v: +p.tnd, c: 'tnd' };
    return null;
  }
  function fmtMoney(v, c) {
    if (v == null || isNaN(v)) return '';
    const n = Number.isInteger(v) ? v : v.toFixed(2);
    if (c === 'eur') return `${n} €`;
    if (c === 'usd') return `$${n}`;
    return lang === 'ar' ? `${n} د.ت` : `${n} DT`;
  }
  const money = p => { const x = priceOf(p); return x ? fmtMoney(x.v, x.c) : ''; };

  let DATA = null;
  let cart = store.get('ch_cart2', []);
  let favs = new Set(store.get('ch_favs', []));
  let billing = 'm';
  const tarotSel = { id: null, format: null };

  // ================= static text =================
  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i]').forEach(el => { el.textContent = t(el.dataset.i); });
    const s = DATA?.settings || {};
    $$('[data-s]').forEach(el => { const v = L(s[el.dataset.s]); if (v !== '') el.textContent = v; });
    $('#lang').value = lang; $('#cur').value = cur;
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    $$('#tz-name').forEach(e => e.textContent = TZ || '—');
  }

  // ================= nav =================
  $('#burger')?.addEventListener('click', () => $('#menu').classList.toggle('open'));
  $('#menu')?.addEventListener('click', e => { if (e.target.tagName === 'A') $('#menu').classList.remove('open'); });
  $('#lang').addEventListener('change', e => { lang = e.target.value; store.set('ch_lang', lang); renderAll(); });
  $('#cur').addEventListener('change', e => { cur = e.target.value; store.set('ch_cur', cur); renderAll(); });
  const chatScroll = () => $('#chat').classList.toggle('compact', scrollY > 300);
  addEventListener('scroll', chatScroll, { passive: true }); chatScroll();

  applyStatic(); // show the right language immediately, before the content arrives
  (window.loadSiteContent ? window.loadSiteContent() : fetch('data/site.json?v=' + Date.now()).then(r => r.json()))
    .then(d => { DATA = d; renderAll(); }).catch(() => {
      document.body.insertAdjacentHTML('afterbegin', '<p style="background:#fde;padding:8px;text-align:center">Content could not be loaded.</p>');
    });

  // ---- logged-in user (Supabase) ----
  let USER = null, PROFILE = null;
  async function initUser() {
    if (!window.sb) return;
    const { data } = await window.sb.auth.getSession();
    USER = data.session?.user || null;
    if (USER) {
      const r = await window.sb.from('profiles').select('full_name,phone,email').eq('id', USER.id).maybeSingle();
      PROFILE = r.data || null;
      $$('.js-account').forEach(a => a.classList.add('logged'));
      // prefill forms
      $$('form input[name=nom]').forEach(i => { if (!i.value && PROFILE?.full_name) i.value = PROFILE.full_name; });
      $$('form input[name=tel]').forEach(i => { if (!i.value && PROFILE?.phone) i.value = PROFILE.phone; });
      $$('form input[name=email]').forEach(i => { if (!i.value && USER.email) i.value = USER.email; });
    }
  }
  initUser();
  // save every request in the database so it appears in the dashboard (WhatsApp still opens)
  // Meta Pixel (only if the visitor accepted cookies, see assets/consent.js)
  function pixelValue(total) {
    const s = String(total || ''), n = parseFloat(s.replace(/[^\d.,]/g, '').replace(',', '.'));
    const cur = /€/.test(s) ? 'EUR' : /\$/.test(s) ? 'USD' : /د\.ت|DT|TND/i.test(s) ? 'TND' : '';
    return isNaN(n) || !cur ? {} : { value: n, currency: cur };
  }
  async function saveOrder(o) {
    try { window.chTrack && window.chTrack('Lead', Object.assign({ content_name: (o.items || []).map(i => i.title).join(' | ').slice(0, 200) }, pixelValue(o.total))); } catch (e) { /* never block */ }
    if (!window.sb) return;
    try {
      await window.sb.from('orders').insert({
        user_id: USER?.id || null, name: o.name || '', phone: o.phone || '', email: o.email || USER?.email || '',
        items: o.items || [], total: o.total || '', note: o.note || '', lang, timezone: TZ
      });
    } catch (e) { /* never block the client */ }
  }

  // ================= renderers =================
  function media(x, tag, extra = '') {
    const img = safeImg(x.image);
    return `<div class="pmedia t-${esc(x.theme || 'violet')}">
      ${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : `<span class="art">${svg(x.icone)}</span>`}
      ${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
      <button class="fav ${favs.has(x.id) ? 'on' : ''}" data-fav="${esc(x.id)}" aria-label="♥">${svg('heart')}</button>${extra}</div>`;
  }
  const catLabel = id => L((DATA.categories || []).find(c => c.id === id)) || '';

  function renderAll() {
    if (!DATA) return;
    applyStatic();
    const s = DATA.settings || {};
    const waNum = (s.whatsapp || '').replace(/\D/g, '');
    $('#chat').href = `https://wa.me/${waNum}`;
    const socials = ['instagram', 'facebook', 'tiktok', 'youtube'].filter(k => s[k] && !/^https?:\/\/[^/]+\/?$/.test(s[k]))
      .map(k => [k, s[k]]).concat([['whatsapp', `https://wa.me/${waNum}`]]);
    const soc = socials.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${k}"><svg viewBox="0 0 24 24">${SOCIAL_SVG[k]}</svg></a>`).join('');
    $$('#socials').forEach(e => e.innerHTML = soc);
    const fb = $('#follow-btns');
    if (fb) fb.innerHTML = socials.map(([k, u]) => `<a class="btn btn-soft" href="${esc(u)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="18" height="18">${SOCIAL_SVG[k]}</svg> ${k.charAt(0).toUpperCase() + k.slice(1)}</a>`).join('');
    $$('.js-maps').forEach(a => { a.href = s.maps || 'https://www.google.com/maps?q=34.7435365,10.7644474'; });
    const ini = $('#initiale'); if (ini) ini.textContent = (s.praticienne || 'R').charAt(0);
    if (s.portrait && safeImg(s.portrait)) {
      const ph = $('.portrait');
      if (ph && !ph.querySelector('img')) ph.insertAdjacentHTML('afterbegin', '<img alt="">');
      const im = ph && ph.querySelector('img'); if (im && im.getAttribute('src') !== s.portrait) im.src = s.portrait;
    }
    const cl = $('#certifs-list'); if (cl) cl.innerHTML = L(s.certifs).split('\n').filter(Boolean).map(c => `<li>${esc(c)}</li>`).join('');

    renderSoins(); renderFormations(); renderPacks(); renderAbos(); renderEvents(); renderTesti(); renderFaq();
    renderChoix(); renderModes(); renderTarot(); renderCart(); injectJsonLd();
    (window.CH_HOOKS || []).forEach(f => { try { f(); } catch (e) { console.error(e); } });
    // deep link from service pages: index.html?book=soins:reiki#reservation
    const bk = new URLSearchParams(location.search).get('book'), sel = $('#booking-form select[name=choix]');
    if (bk && sel && !renderAll.booked) { renderAll.booked = true; sel.value = bk; setTimeout(() => $('#reservation').scrollIntoView({ behavior: 'smooth' }), 300); }
  }
  // shared helpers for the other page scripts (account, meditations)
  window.CH = { t, L, esc, svg, money, fmtMoney, fmtDate, getLang: () => lang, getData: () => DATA, tz: TZ, LOCALE, toast: m => toast(m), addToCart: (a, b, c) => addToCart(a, b, c),
    saveOrder: o => saveOrder(o), sendWA: l => sendWA(l), showPay: tot => showPay(tot), priceOf: p => priceOf(p), getUser: () => USER };

  const SEO_PAGES = { 'reiki': 'reiki-sfax.html', 'thetahealing': 'thetahealing-sfax.html', 'access-bars': 'access-bars-sfax.html', 'soin-energetique': 'soin-energetique-sfax.html', 'annales-akashiques': 'annales-akashiques.html', 'constellation-familiale': 'constellations-familiales-sfax.html', 'tarot': 'tarot-en-ligne.html' };
  function renderSoins() {
    const row = $('#soins-row'); if (!row) return;
    const sel = $('#cat-filter'), prev = sel.value;
    sel.innerHTML = `<option value="">${esc(t('all_cats'))}</option>` + (DATA.categories || []).map(c => `<option value="${esc(c.id)}">${esc(L(c))}</option>`).join('');
    sel.value = prev;
    // tracks as tabs (the select stays as the source of truth, hidden)
    let tabs = $('#cat-tabs');
    if (!tabs) {
      sel.closest('.select-wrap').hidden = true;
      tabs = document.createElement('div'); tabs.id = 'cat-tabs'; tabs.className = 'cat-tabs'; tabs.setAttribute('role', 'tablist');
      row.closest('.rail-wrap').before(tabs);
      tabs.addEventListener('click', e => { const b = e.target.closest('button[data-cat]'); if (!b) return; sel.value = b.dataset.cat; renderSoins(); row.scrollTo({ left: 0 }); });
    }
    const cats = (DATA.categories || []).filter(c => (DATA.soins || []).some(x => x.categorie === c.id));
    tabs.innerHTML = [['', t('all_cats')]].concat(cats.map(c => [c.id, L(c)]))
      .map(([id, name]) => `<button type="button" role="tab" data-cat="${esc(id)}" aria-selected="${sel.value === id}" class="${sel.value === id ? 'on' : ''}">${esc(name)}</button>`).join('');
    const list = (DATA.soins || []).filter(x => !sel.value || x.categorie === sel.value);
    row.innerHTML = list.map(x => `
      <article class="pcard">
        ${media(x, catLabel(x.categorie), x.en_ligne ? `<span class="online-pill">🌐 ${esc(t('online'))}</span>` : '')}
        <div class="pbody">
          <div class="ptitle">${esc(L(x.titre))}</div>
          ${x.note ? `<div class="rating"><b>${esc(x.note)}</b><span class="stars">★★★★★</span>${x.avis ? `<span>(${esc(x.avis)})</span>` : ''}</div>` : ''}
          <p class="pdesc">${esc(L(x.description))}</p>
          ${SEO_PAGES[x.id] ? `<a class="more-link" href="${SEO_PAGES[x.id]}">${esc(t('more'))}</a>` : ''}
          <div class="pmeta">${L(x.duree) ? `<span>⏱ ${esc(L(x.duree))}</span>` : ''}</div>
          <div class="pfoot"><span class="price">${money(x.prix)}</span>
            ${x.lien ? `<a class="btn btn-soft add" href="${esc(x.lien)}">${esc(t('choose_reading'))}</a>` : `<button class="btn btn-soft add" data-add="soins" data-id="${esc(x.id)}">${esc(t('add'))}</button>`}</div>
        </div></article>`).join('');
  }
  $('#cat-filter')?.addEventListener('change', () => { renderSoins(); $('#soins-row').scrollTo({ left: 0 }); });

  function renderFormations() {
    const row = $('#formations-row'); if (!row) return;
    const fs = (DATA.formations || []).filter(f => f.actif !== false).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    $('#formations').hidden = !fs.length;
    row.innerHTML = fs.map(f => {
      const lv = levels(f);
      return `
      <article class="pcard">
        ${media(f, L(f.categorie), f.nouveau ? `<span class="new">${esc(t('new'))}</span>` : '')}
        <div class="pbody">
          <div class="ptitle">${esc(L(f.titre))}</div>
          <div class="pmeta">${f.date ? `<span>📅 ${esc(fmtDate(f.date))}</span>` : ''}${L(f.duree) ? `<span>⏱ ${esc(L(f.duree))}</span>` : ''}${L(f.mode) ? `<span>📍 ${esc(L(f.mode))}</span>` : ''}${f.places ? `<span>👥 ${esc(f.places)} ${esc(t('places'))}</span>` : ''}</div>
          <p class="pdesc">${esc(L(f.description))}</p>
          ${f.lien ? `<a class="more-link" href="${esc(f.lien)}">${esc(t('program'))}</a>` : ''}
          ${lv.length ? `<label class="lv-pick"><span>${esc(t('level'))}</span><select data-lv="${esc(f.id)}">${lv.map((x, i) => `<option value="${i}">${esc(L(x.nom))} — ${money(x.prix)}</option>`).join('')}</select></label>` : ''}
          <div class="pfoot"><span class="price" data-lvprice="${esc(f.id)}">${money(lv.length ? lv[0].prix : f.prix)}${!lv.length && money(f.ancien_prix) ? `<span class="old">${money(f.ancien_prix)}</span>` : ''}</span>
            <button class="btn btn-soft add" data-add="formations" data-id="${esc(f.id)}" data-format="${lv.length ? '0' : ''}">${esc(t('add'))}</button></div>
        </div></article>`;
    }).join('');
  }
  // course levels (e.g. Reiki 1, 2, 3): the visitor picks one in the card
  function levels(it) { return it && Array.isArray(it.niveaux) ? it.niveaux.filter(x => x && (L(x.nom) || x.nom)) : []; }
  function lvPrice(it, i) { const lv = levels(it); return lv.length && i !== '' && i != null && lv[+i] ? lv[+i].prix : it && it.prix; }
  function lvName(it, i) { const lv = levels(it); return lv.length && i !== '' && i != null && lv[+i] ? L(lv[+i].nom) : ''; }
  document.addEventListener('change', e => {
    const s = e.target.closest('select[data-lv]'); if (!s) return;
    const it = findItem('formations', s.dataset.lv), card = s.closest('.pcard');
    card.querySelector('[data-add]').dataset.format = s.value;
    card.querySelector('[data-lvprice]').innerHTML = money(lvPrice(it, s.value));
  });

  function renderPacks() {
    const el = $('#packs-list'); if (!el) return;
    const ps = (DATA.packs || []).filter(p => p.actif !== false);
    $('#packs').hidden = !ps.length;
    el.innerHTML = ps.map(p => {
      const a = priceOf(p.prix), b = priceOf(p.ancien_prix);
      const saveAmt = a && b && b.c === a.c ? b.v - a.v : 0;
      return `<article class="pack">
        <div class="pack-top t-${esc(p.theme || 'violet')}"><span class="tag">${esc(t('t_packs'))}</span><h3>${esc(L(p.titre))}</h3></div>
        <div class="pack-body">
          <span class="count">${p.nb ? esc(p.nb) + ' ' + esc(t('sessions')) + ' · ' : ''}${esc(L(p.contenu))}</span>
          <div><span class="price">${money(p.prix)}</span>${b ? `<span class="old">${fmtMoney(b.v, b.c)}</span>` : ''}</div>
          ${saveAmt > 0 ? `<span class="save">${esc(t('save'))} ${fmtMoney(saveAmt, a.c)}</span>` : ''}
          <button class="btn btn-primary btn-block" data-add="packs" data-id="${esc(p.id)}">${esc(t('add'))}</button>
        </div></article>`;
    }).join('');
  }

  function renderAbos() {
    const el = $('#abos-list'); if (!el) return;
    const as = (DATA.abonnements || []).filter(a => a.actif !== false);
    $('#cercle').hidden = !as.length;
    $$('.billing button').forEach(b => b.classList.toggle('active', b.dataset.bill === billing));
    el.innerHTML = as.map(a => `
      <article class="abo ${a.populaire ? 'pop' : ''}">
        ${a.populaire ? `<span class="pop-badge">⭐ ${esc(t('popular'))}</span>` : ''}
        <h3>${esc(L(a.titre))}</h3>
        <p class="abo-sub">${esc(L(a.accroche))}</p>
        <div class="abo-price">${money(billing === 'm' ? a.prix : a.prix_annuel)} <small>${esc(t(billing === 'm' ? 'per_month' : 'per_year'))}</small></div>
        <ul>${L(a.avantages).split('\n').filter(Boolean).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <button class="btn ${a.populaire ? 'btn-gold' : 'btn-white'} btn-block" data-join="${esc(a.id)}">${esc(t('join'))}</button>
        <span class="abo-note">${esc(t('cancel_any'))}</span>
      </article>`).join('');
  }
  $$('.billing button').forEach(b => b.addEventListener('click', () => { billing = b.dataset.bill; renderAbos(); }));

  function tunisToLocal(date, time) {
    // convert a Tunis wall-clock time (UTC+1, no DST) to the viewer's local time
    try {
      const d = new Date(`${date}T${time}:00+01:00`);
      return d.toLocaleString(LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch { return ''; }
  }
  function renderEvents() {
    const el = $('#events-list'); if (!el) return;
    const today = new Date().toISOString().slice(0, 10);
    const evs = (DATA.evenements || []).filter(e => e.actif !== false && (!e.date || e.date >= today)).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    $('#evenements').hidden = !evs.length;
    el.innerHTML = evs.map(e => {
      const d = new Date((e.date || today) + 'T00:00:00');
      return `<article class="event">
        <div class="ev-date t-${esc(e.theme || 'violet')}"><b>${d.getDate()}</b><span>${esc(d.toLocaleDateString(LOCALE[lang], { month: 'short' }))}</span></div>
        <div class="ev-body">
          <div class="ev-tags">${e.membres ? `<span class="tag-s">✨ ${esc(t('members_only'))}</span>` : `<span class="tag-s free">${esc(t('free_all'))}</span>`}</div>
          <h3>${esc(L(e.titre))}</h3>
          <p>${esc(L(e.description))}</p>
          <span class="ev-time">🕗 ${esc(e.heure || '')} ${esc(t('tunis_time'))}${TZ && TZ !== 'Africa/Tunis' && e.heure ? ` · ${esc(tunisToLocal(e.date, e.heure))} ${esc(t('your_time'))}` : ''}</span>
        </div>
        <button class="btn btn-soft" data-event="${esc(e.id)}">${esc(t('reserve_place'))}</button>
      </article>`;
    }).join('');
  }

  function renderTesti() {
    const el = $('#testi-row'); if (!el) return;
    const ts = (DATA.temoignages || []).filter(x => L(x.texte));
    $('#temoignages').hidden = !ts.length;
    el.innerHTML = ts.map(x => `<article class="tcard"><span class="stars">★★★★★</span><p>${esc(L(x.texte))}</p>
      <div class="who-t">${esc(x.nom)}${x.pays ? ' · ' + esc(x.pays) : ''}<small>${esc(L(x.service))}</small></div></article>`).join('');
  }
  function renderFaq() {
    const el = $('#faq-list'); if (!el) return;
    el.innerHTML = (DATA.faq || []).map(f => `<details><summary>${esc(L(f.q))}</summary><p>${esc(L(f.r))}</p></details>`).join('');
  }

  // all bookable items, grouped
  function catalog() {
    return [
      ['soins', 'g_sessions', (DATA.soins || []).filter(x => !x.lien)],
      ['lectures', 'g_lectures', (DATA.lectures || []).filter(x => x.actif !== false)],
      ['formations', 'g_formations', (DATA.formations || []).filter(x => x.actif !== false)],
      ['packs', 'g_packs', (DATA.packs || []).filter(x => x.actif !== false)]
    ];
  }
  function renderChoix() {
    $$('.js-choix').forEach(sel => {
      const prev = sel.value;
      sel.innerHTML = `<option value="">${esc(t('choose'))}</option>` + catalog().map(([type, g, list]) => list.length ?
        `<optgroup label="${esc(t(g))}">${list.map(x => levels(x).length
          ? levels(x).map((l, i) => `<option value="${type}:${esc(x.id)}:${i}">${esc(L(x.titre))} · ${esc(L(l.nom))} — ${money(l.prix)}</option>`).join('')
          : `<option value="${type}:${esc(x.id)}">${esc(L(x.titre))} — ${money(x.prix)}</option>`).join('')}</optgroup>` : '').join('');
      sel.value = prev;
    });
  }
  function renderModes() {
    const m = $('#mode-select'); if (!m) return;
    m.innerHTML = `<option>${esc(t('mode_online'))}</option><option>${esc(t('mode_center'))}</option>`;
    if (TZ === 'Africa/Tunis') m.selectedIndex = 0;
  }

  // ================= TAROT PAGE =================
  let jeu = '';
  function renderTarot() {
    const el = $('#lectures-list'); if (!el) return;
    const ls = (DATA.lectures || []).filter(x => x.actif !== false && (!jeu || x.jeu === jeu));
    el.innerHTML = ls.map(x => `
      <button type="button" class="lecture ${tarotSel.id === x.id ? 'sel' : ''}" data-lecture="${esc(x.id)}">
        <span class="lec-art t-${esc(x.theme || 'violet')}">${svg(x.icone)}</span>
        <span class="lec-body">
          <span class="lec-type">${esc(t('jeu_' + (x.jeu || 'tarot')))}${x.cartes ? ` · ${esc(x.cartes)} ${esc(t('cards'))}` : ''}${x.populaire ? `<i class="lec-pop">⭐ ${esc(t('popular'))}</i>` : ''}</span>
          <b>${esc(L(x.titre))}</b>
          <span class="lec-desc">${esc(L(x.description))}</span>
          <span class="lec-foot"><span class="price">${money(x.prix)}</span><span class="lec-check">${tarotSel.id === x.id ? esc(t('selected')) : ''}</span></span>
        </span>
      </button>`).join('');
    $$('#jeu-tabs button').forEach(b => b.classList.toggle('active', b.dataset.jeu === jeu));
    const fl = $('#formats-list');
    fl.innerHTML = (DATA.formats || []).map(f => `<button type="button" class="fmt ${tarotSel.format === f.id ? 'sel' : ''}" data-format="${esc(f.id)}">${esc(L(f))}</button>`).join('');
    const sel = (DATA.lectures || []).find(x => x.id === tarotSel.id);
    const fmt = (DATA.formats || []).find(f => f.id === tarotSel.format);
    $('#tarot-summary').innerHTML = sel
      ? `<span class="sum-ico t-${esc(sel.theme || 'violet')}">${svg(sel.icone)}</span><div><b>${esc(L(sel.titre))}</b><small>${fmt ? esc(L(fmt)) : '—'}</small></div><span class="price">${money(sel.prix)}</span>`
      : `<small>${esc(t('no_reading'))}</small>`;
  }
  $('#jeu-tabs')?.addEventListener('click', e => { const b = e.target.closest('[data-jeu]'); if (!b) return; jeu = b.dataset.jeu; renderTarot(); });
  $('#lectures-list')?.addEventListener('click', e => {
    const b = e.target.closest('[data-lecture]'); if (!b) return;
    tarotSel.id = b.dataset.lecture; renderTarot();
    if (!tarotSel.format) $('#formats-list').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('#formats-list')?.addEventListener('click', e => {
    const b = e.target.closest('[data-format]'); if (!b) return;
    tarotSel.format = b.dataset.format; renderTarot();
    $('#tarot-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  function tarotCheck() {
    const err = $('#tarot-error');
    if (!tarotSel.id) { err.textContent = t('err_reading'); err.hidden = false; return false; }
    if (!tarotSel.format) { err.textContent = t('err_format'); err.hidden = false; return false; }
    err.hidden = true; return true;
  }
  $('#tarot-form')?.addEventListener('submit', e => {
    e.preventDefault(); if (!tarotCheck()) return;
    const f = e.target, v = n => f.elements[n].value.trim(), err = $('#tarot-error');
    const miss = []; if (!v('nom')) miss.push(t('lbl_name')); if (!v('tel')) miss.push(t('lbl_phone'));
    if (miss.length) { err.textContent = t('err_fill') + miss.join(', '); err.hidden = false; return; }
    const sel = DATA.lectures.find(x => x.id === tarotSel.id), fmt = DATA.formats.find(x => x.id === tarotSel.format);
    const lines = [t('m_tarot'), `${t('w_choice')}: ${L(sel.titre)} (${money(sel.prix)})`, `${t('w_format')}: ${L(fmt)}`, `${t('lbl_name')}: ${v('nom')}`, `${t('lbl_phone')}: ${v('tel')}`];
    if (v('email')) lines.push(`${t('w_email')}: ${v('email')}`);
    if (v('naissance')) lines.push(`${t('w_birth')}: ${v('naissance')}`);
    if (v('question')) lines.push(`${t('w_question')}: ${v('question')}`);
    lines.push(`${t('lbl_tz')}: ${TZ}`, `${t('w_lang')}: ${lang.toUpperCase()}`);
    saveOrder({ name: v('nom'), phone: v('tel'), email: v('email'), total: money(sel.prix),
      note: [v('question') && `${t('w_question')}: ${v('question')}`, v('naissance') && `${t('w_birth')}: ${v('naissance')}`].filter(Boolean).join('\n'),
      items: [{ type: 'lectures', id: sel.id, format: fmt.id, title: L(sel.titre), price: money(sel.prix), option: L(fmt) }] });
    sendWA(lines);
    showPay(money(sel.prix));
  });
  $('#tarot-add')?.addEventListener('click', () => {
    if (!tarotCheck()) return;
    addToCart('lectures', tarotSel.id, tarotSel.format);
  });

  // ================= cart =================
  function findItem(type, id) { return (DATA[type] || []).find(x => x.id === id); }
  function addToCart(type, id, format) {
    const item = findItem(type, id); if (!item) return;
    const key = `${type}:${id}${format ? ':' + format : ''}`;
    if (!cart.find(c => c.key === key)) { cart.push({ key, type, id, format: format || '' }); store.set('ch_cart2', cart); }
    renderCart(); toast(t('toast_added'));
    try { window.chTrack && window.chTrack('AddToCart', { content_ids: [id], content_type: 'product', content_name: L(item.titre) }); } catch (e) { /* never block */ }
  }
  function cartLines() {
    return cart.map(c => {
      const it = findItem(c.type, c.id); if (!it) return null;
      const p = priceOf(c.type === 'abonnements' && c.format === 'y' ? it.prix_annuel : (c.type === 'formations' ? lvPrice(it, c.format) : it.prix));
      const fmt = c.format && c.type === 'lectures' ? L((DATA.formats || []).find(f => f.id === c.format)) : (c.type === 'abonnements' ? t(c.format === 'y' ? 'bill_yearly' : 'bill_monthly') : (c.type === 'formations' ? lvName(it, c.format) : ''));
      return { c, it, p, fmt };
    }).filter(Boolean);
  }
  function renderCart() {
    if (!DATA) return;
    const lines = cartLines(), n = lines.length;
    $('#cart-count').textContent = n; $('#cart-count').hidden = n === 0;
    $('#cart-empty').hidden = n > 0; $('#checkout').hidden = n === 0;
    $('#cart-items').innerHTML = lines.map(({ c, it, p, fmt }) => `
      <div class="citem"><span class="thumb t-${esc(it.theme || 'violet')}">${svg(it.icone || 'gift')}</span>
        <div class="info"><b>${esc(L(it.titre))}</b><small>${esc(t('t_' + c.type))}${fmt ? ' · ' + esc(fmt) : ''} · ${p ? fmtMoney(p.v, p.c) : ''}</small></div>
        <button data-rm="${esc(c.key)}" aria-label="✕">✕</button></div>`).join('');
    const tot = totals(lines);
    $('#cart-total').textContent = tot;
  }
  function totals(lines) {
    const by = {}; lines.forEach(({ p }) => { if (p) by[p.c] = (by[p.c] || 0) + p.v; });
    return Object.entries(by).map(([c, v]) => fmtMoney(v, c)).join(' + ');
  }
  $('#cart-items').addEventListener('click', e => {
    const b = e.target.closest('[data-rm]'); if (!b) return;
    cart = cart.filter(c => c.key !== b.dataset.rm); store.set('ch_cart2', cart); renderCart();
  });
  const openCart = () => { $('#drawer').classList.add('open'); $('#overlay').hidden = false; $('#drawer').setAttribute('aria-hidden', 'false'); };
  const closeCart = () => { $('#drawer').classList.remove('open'); $('#overlay').hidden = true; $('#drawer').setAttribute('aria-hidden', 'true'); };
  $('#cart-btn').addEventListener('click', openCart);
  $$('.js-open-cart').forEach(a => a.addEventListener('click', e => { e.preventDefault(); openCart(); }));
  $('#drawer-close').addEventListener('click', closeCart);
  $('#overlay').addEventListener('click', closeCart);
  addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  $('#checkout').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, err = $('#checkout-error'), nom = f.nom.value.trim(), tel = f.tel.value.trim();
    if (!nom || !tel) { err.textContent = t('err_fill') + [!nom && t('lbl_name'), !tel && t('lbl_phone')].filter(Boolean).join(', '); err.hidden = false; return; }
    err.hidden = true;
    const lines = cartLines();
    const out = [t('m_order'), ...lines.map(({ c, it, p, fmt }) => `• ${L(it.titre)} (${t('t_' + c.type)}${fmt ? ' – ' + fmt : ''}) – ${p ? fmtMoney(p.v, p.c) : ''}`),
      `${t('w_total')}: ${totals(lines)}`, `${t('lbl_name')}: ${nom}`, `${t('lbl_phone')}: ${tel}`, `${t('lbl_tz')}: ${TZ}`, `${t('w_lang')}: ${lang.toUpperCase()}`];
    if (f.message.value.trim()) out.push(`${t('f_note')}: ${f.message.value.trim()}`);
    saveOrder({ name: nom, phone: tel, note: f.message.value.trim(), total: totals(lines),
      items: lines.map(({ c, it, p, fmt }) => ({ type: c.type, id: c.id, format: c.format, title: L(it.titre), price: p ? fmtMoney(p.v, p.c) : '', option: fmt })) });
    const tot = totals(lines);
    sendWA(out);
    cart = []; store.set('ch_cart2', cart); renderCart(); closeCart();
    showPay(tot);
  });

  // global clicks: favourites, add, join, event, discovery
  document.addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    if (fav) { e.preventDefault(); const id = fav.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id); fav.classList.toggle('on'); store.set('ch_favs', [...favs]); return; }
    const add = e.target.closest('[data-add]');
    if (add) { addToCart(add.dataset.add, add.dataset.id, add.dataset.format || ''); return; }
    const join = e.target.closest('[data-join]');
    if (join) { addToCart('abonnements', join.dataset.join, billing); openCart(); return; }
    const ev = e.target.closest('[data-event]');
    if (ev) { const x = findItem('evenements', ev.dataset.event); if (x) sendWA([`${t('m_event')}: ${L(x.titre)}`, `📅 ${fmtDate(x.date)} · ${x.heure} (${t('tunis_time')})`, `${t('lbl_tz')}: ${TZ}`]); return; }
    const disc = e.target.closest('.js-discovery');
    if (disc) {
      e.preventDefault();
      const sel = $('#booking-form select[name=choix]');
      if (sel) { sel.value = 'soins:consultation'; $('#reservation').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#booking-form input[name=nom]').focus({ preventScroll: true }), 700); }
    }
  });

  // rails
  $$('.rail-arrow').forEach(b => b.addEventListener('click', () => {
    const r = document.getElementById(b.dataset.rail), rtl = document.documentElement.dir === 'rtl';
    const dirSign = b.classList.contains('next') ? 1 : -1;
    r.scrollBy({ left: dirSign * (rtl ? -1 : 1) * r.clientWidth * .8, behavior: 'smooth' });
  }));

  // ================= booking form (home) =================
  function localToTunis(date, time) {
    try {
      const d = new Date(`${date}T${time}`);
      return d.toLocaleString(LOCALE[lang], { timeZone: 'Africa/Tunis', weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch { return ''; }
  }
  const bf = $('#booking-form');
  if (bf) {
    const upd = () => {
      const d = bf.date.value, h = bf.heure.value, out = $('#tz-conv');
      out.textContent = d && h && TZ !== 'Africa/Tunis' ? `→ ${localToTunis(d, h)} (${t('tunis_time')})` : '';
    };
    bf.date.addEventListener('change', upd); bf.heure.addEventListener('change', upd);
    bf.addEventListener('submit', e => {
      e.preventDefault();
      const v = n => (bf.elements[n]?.value || '').trim(), err = $('#form-error'), miss = [];
      if (!v('nom')) miss.push(t('lbl_name')); if (!v('tel')) miss.push(t('lbl_phone')); if (!v('choix')) miss.push(t('lbl_choice'));
      if (!bf.elements.ok.checked) miss.push(t('lbl_consent'));
      if (miss.length) { err.textContent = t('err_fill') + miss.join(', '); err.hidden = false; return; }
      err.hidden = true;
      const lines = [t('m_booking'), `${t('w_choice')}: ${bf.choix.selectedOptions[0].textContent}`, `${t('lbl_name')}: ${v('nom')}`, `${t('lbl_phone')}: ${v('tel')}`];
      if (v('date')) lines.push(`${t('w_date')}: ${fmtDate(v('date'))}`);
      if (v('date') && v('heure')) {
        lines.push(`${t('w_time_local')}: ${v('heure')} (${TZ})`);
        if (TZ !== 'Africa/Tunis') lines.push(`${t('w_time_tunis')}: ${localToTunis(v('date'), v('heure'))}`);
      }
      lines.push(`${t('w_mode')}: ${v('mode')}`, `${t('w_lang')}: ${lang.toUpperCase()}`);
      if (v('message')) lines.push(`${t('w_msg')}: ${v('message')}`);
      const [ty, id, lvi] = v('choix').split(':'), it = findItem(ty, id), pr = it ? money(ty === 'formations' ? lvPrice(it, lvi) : it.prix) : '';
      saveOrder({ name: v('nom'), phone: v('tel'), total: pr,
        note: lines.slice(4).join('\n'),
        items: [{ type: ty, id, format: lvi || '', title: it ? L(it.titre) + (lvi ? ' · ' + lvName(it, lvi) : '') : '', price: pr, option: v('mode') }] });
      sendWA(lines);
      showPay(pr);
    });
  }
  const gf = $('#gift-form');
  gf?.addEventListener('submit', e => {
    e.preventDefault();
    const v = n => gf.elements[n].value.trim();
    const lines = [t('m_gift')];
    if (v('choix')) lines.push(`${t('w_choice')}: ${gf.choix.selectedOptions[0].textContent}`);
    if (v('from')) lines.push(`${t('w_from')}: ${v('from')}`);
    if (v('to')) lines.push(`${t('w_to')}: ${v('to')}`);
    if (v('msg')) lines.push(`${t('w_msg')}: ${v('msg')}`);
    lines.push(`${t('lbl_tz')}: ${TZ}`);
    const [ty, id, lvi] = (v('choix') || ':').split(':'), it = findItem(ty, id), pr = it ? money(ty === 'formations' ? lvPrice(it, lvi) : it.prix) : '';
    saveOrder({ name: v('from'), note: `🎁 ${t('w_to')}: ${v('to')}\n${v('msg')}`, total: pr,
      items: [{ type: ty, id, format: lvi || '', title: it ? '🎁 ' + L(it.titre) + (lvi ? ' · ' + lvName(it, lvi) : '') : '🎁', price: pr, option: 'gift' }] });
    sendWA(lines);
    showPay(it ? money(it.prix) : '');
  });

  // ================= PAYMENT METHODS =================
  let payZone = TZ === 'Africa/Tunis' ? 'tn' : 'intl';
  // used until payment methods are published from the dashboard
  const PAY_DEFAULT = [
    { id: 'd17', zone: 'tn', icone: '📮', titre: { ar: 'D17 (البريد التونسي)', fr: 'D17 (La Poste)', en: 'D17 (Tunisian Post)' }, details: '28 550 802',
      instructions: { ar: 'أرسل المبلغ من تطبيق D17 إلى هذا الرقم', fr: "Envoyez le montant depuis l'appli D17 à ce numéro", en: 'Send the amount from the D17 app to this number' } },
    { id: 'attijari', zone: 'tn', icone: '🏦', titre: { ar: 'تحويل بنكي — Attijari Bank', fr: 'Virement bancaire — Attijari Bank', en: 'Bank transfer — Attijari Bank' }, details: 'RIB : 04 149 2310087195269 23\nRawia Ghorbel',
      instructions: { ar: 'حوّل المبلغ إلى هذا الحساب', fr: 'Virez le montant sur ce compte', en: 'Transfer the amount to this account' } },
    ...[['moneygram', '💸', 'MoneyGram'], ['ria', '💱', 'Ria Money Transfer'], ['western', '🌍', 'Western Union']].map(([id, icone, name]) => ({
      id, zone: 'intl', icone, titre: { ar: name, fr: name, en: name }, details: 'RAWIA GHORBEL\nTunisie / Tunisia',
      instructions: { ar: 'أرسل المبلغ بهذا الاسم — البلد: تونس', fr: 'Envoyez le montant à ce nom — Pays : Tunisie', en: 'Send the amount to this name — Country: Tunisia' } }))
  ];
  const payAll = () => (DATA?.paiements || PAY_DEFAULT).filter(p => p.actif !== false && (p.details || p.lien));
  function payMethods(zone) { return payAll().filter(p => p.zone === zone || p.zone === 'both'); }
  function payHTML(total, sent) {
    const list = payMethods(payZone);
    return `${sent ? `<p class="pay-sent">${esc(t('pay_order_sent'))}</p>` : ''}
      ${total ? `<div class="pay-total"><span>${esc(t('pay_total'))}</span><b>${esc(total)}</b></div>` : ''}
      <div class="pay-tabs"><button data-pz="tn" class="${payZone === 'tn' ? 'active' : ''}">${esc(t('pay_tn'))}</button><button data-pz="intl" class="${payZone === 'intl' ? 'active' : ''}">${esc(t('pay_intl'))}</button></div>
      ${list.length ? '' : `<p class="pay-none">${esc(t('pay_none'))}</p>`}
      <div class="pay-list">${list.map(p => `<details class="pay-item" ${list.length === 1 ? 'open' : ''}><summary><span class="pay-ico">${esc(p.icone || '💳')}</span><b>${esc(L(p.titre))}</b></summary>
        <div class="pay-body">${L(p.instructions) ? `<p>${esc(L(p.instructions))}</p>` : ''}
          ${p.details ? `<div class="pay-details"><pre dir="ltr">${esc(p.details)}</pre><button type="button" class="btn btn-soft add" data-copy="${esc(p.details)}">${esc(t('copy'))}</button></div>` : ''}
          ${p.lien ? `<a class="btn btn-primary" href="${esc(p.lien)}" target="_blank" rel="noopener">${esc(t('pay_payoneer_btn'))}</a>` : ''}</div></details>`).join('')}</div>
      <p class="pay-after">${esc(t('pay_after'))}</p>
      <a class="btn btn-primary btn-block" href="${esc($('#chat').href)}?text=${encodeURIComponent('📸 ' + t('pay_proof_btn').replace(/^\S+\s/, '') + (total ? ' — ' + total : ''))}" target="_blank" rel="noopener">${esc(t('pay_proof_btn'))}</a>
      <a class="btn btn-wa btn-block" href="${esc($('#chat').href)}?text=${encodeURIComponent(t('wa_pay_msg') + (total ? ' (' + total + ')' : ''))}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/></svg> ${esc(t('wa_contact'))}</a>`;
  }
  function showPay(total) {
    let d = $('#paydlg');
    if (!d) {
      document.body.insertAdjacentHTML('beforeend', `<dialog id="paydlg" class="paydlg"><div class="paydlg-head"><h3></h3><button class="icon-btn" data-close aria-label="close">✕</button></div><div class="paydlg-body"></div></dialog>`);
      d = $('#paydlg');
      d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    }
    d.dataset.total = total || '';
    d.querySelector('h3').textContent = t('pay_title');
    d.querySelector('.paydlg-body').innerHTML = payHTML(total, true);
    if (!d.open) d.showModal();
  }
  function renderPayInline() {
    const el = $('#pay-inline'); if (!el) return;
    $('#paiement').hidden = false;
    el.innerHTML = payHTML('', false);
  }
  document.addEventListener('click', async e => {
    const pz = e.target.closest('[data-pz]');
    if (pz) { payZone = pz.dataset.pz; const d = $('#paydlg'); if (d && d.open && d.contains(pz)) d.querySelector('.paydlg-body').innerHTML = payHTML(d.dataset.total, true); else renderPayInline(); return; }
    const cp = e.target.closest('[data-copy]');
    if (cp && cp.closest('.pay-details')) { try { await navigator.clipboard.writeText(cp.dataset.copy); } catch {} const o = cp.textContent; cp.textContent = t('copied'); setTimeout(() => cp.textContent = o, 1500); }
  });
  window.CH_HOOKS = window.CH_HOOKS || []; window.CH_HOOKS.push(renderPayInline);

  // ================= NEWSLETTER =================
  function renderNewsletter() {
    $$('.js-newsletter').forEach(box => {
      let done = false; try { done = !!localStorage.getItem('ch_sub'); } catch {}
      box.innerHTML = `<div class="nl-text"><span class="eyebrow light">${esc(t('nl_eyebrow'))}</span><h2>${esc(t('nl_title'))}</h2><p>${esc(t('nl_text'))}</p></div>` +
        (done ? `<div class="nl-done"><p>${esc(t('nl_ok'))}</p><a class="btn btn-gold" href="index.html#seances">${esc(t('nl_go'))}</a></div>`
          : `<form class="nl-form" novalidate><input name="name" placeholder="${esc(t('nl_name'))}" autocomplete="given-name"><input name="email" type="email" dir="ltr" placeholder="${esc(t('nl_email'))}" autocomplete="email" required>
             <button class="btn btn-gold" type="submit">${esc(t('nl_btn'))}</button><small class="nl-err" hidden></small><small>${esc(t('nl_privacy'))}</small></form>`);
    });
  }
  document.addEventListener('submit', async e => {
    const f = e.target.closest('.nl-form'); if (!f) return;
    e.preventDefault();
    const email = f.email.value.trim(), err = f.querySelector('.nl-err');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err.textContent = t('nl_err'); err.hidden = false; return; }
    f.querySelector('button').disabled = true;
    try { if (window.sb) await window.sb.from('subscribers').insert({ email, name: f.name.value.trim(), lang, source: document.body.dataset.page || '', timezone: TZ }); } catch (x) { /* duplicates are fine */ }
    try { localStorage.setItem('ch_sub', email); } catch {}
    renderNewsletter();
  });
  window.CH_HOOKS = window.CH_HOOKS || []; window.CH_HOOKS.push(renderNewsletter);

  function sendWA(lines) {
    const num = (DATA?.settings?.whatsapp || '').replace(/\D/g, '');
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  }
  let tt;
  function toast(msg) { const x = $('#toast'); x.textContent = msg; x.hidden = false; clearTimeout(tt); tt = setTimeout(() => x.hidden = true, 1800); }

  // ================= SEO: structured data =================
  function injectJsonLd() {
    if ($('#jsonld')) return;
    const s = DATA.settings, base = 'https://www.centreholistique.net/';
    const offers = (DATA.soins || []).concat(DATA.lectures || []).map(x => ({
      '@type': 'Offer', price: (x.prix && x.prix.tnd) || '', priceCurrency: 'TND',
      itemOffered: { '@type': 'Service', name: (x.titre && (x.titre.fr || x.titre.en)) || '' }
    }));
    const ld = {
      '@context': 'https://schema.org', '@type': 'HealthAndBeautyBusiness', name: s.nom_centre, url: base,
      telephone: s.telephone, email: s.email, image: base + 'assets/icon-512.png',
      address: { '@type': 'PostalAddress', streetAddress: 'Immeuble El Kawthar, 3e étage, Rue de l’Armée', postalCode: '3047', addressLocality: 'Sfax', addressRegion: 'Sfax', addressCountry: 'TN' }, geo: { '@type': 'GeoCoordinates', latitude: 34.7435365, longitude: 10.7644474 }, hasMap: 'https://www.google.com/maps?q=34.7435365,10.7644474',
      areaServed: 'Worldwide', availableLanguage: ['ar', 'fr', 'en'],
      founder: { '@type': 'Person', name: s.praticienne, jobTitle: L(s.titre_praticienne) },
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: offers },
      sameAs: ['instagram', 'facebook', 'tiktok', 'youtube'].map(k => s[k]).filter(u => u && !/^https?:\/\/[^/]+\/?$/.test(u))
    };
    const sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.id = 'jsonld'; sc.textContent = JSON.stringify(ld);
    document.head.appendChild(sc);
  }

  // ================= PWA =================
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  let deferred = null;
  const ib = $('#install-btn');
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; if (ib) ib.hidden = false; });
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone;
  if (ib && isIOS) ib.hidden = false;
  ib?.addEventListener('click', async () => {
    if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; ib.hidden = true; }
    else if (isIOS) alert(t('install_ios'));
  });

  // bottom nav active state (home)
  if (document.body.dataset.page === 'home') {
    const links = $$('.bottom-nav a');
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href').endsWith('#' + en.target.id)));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['accueil', 'evenements'].forEach(id => { const s = document.getElementById(id); if (s) io.observe(s); });
  }
})();
