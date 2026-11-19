// Courses prepared by Claude for Rawia (Nov 2026). Added once to the site content by applyContentPatches (assets/sb.js).
// After that, everything is edited in the dashboard (🎓 الدورات). Hidden courses (actif:false) wait for Rawia to publish them.
(function (root) {
  const lv = (ar, fr, en, tnd, eur, usd) => ({ nom: { ar, fr, en }, prix: { tnd: String(tnd), eur: String(eur), usd: String(usd) } });
  const ml = (ar, fr, en) => ({ ar, fr: fr || ar, en: en || fr || ar });
  const C = (o) => Object.assign({ date: '', places: '', nouveau: true, actif: false, icone: 'star', theme: 'violet', categorie: ml('دورة', 'Formation', 'Training') }, o, { image: 'assets/courses/' + o.id + '.jpg', lien: 'formations/' + o.id + '.html' });
  const MODE = ml('في المركز بصفاقس أو أونلاين', 'Au centre à Sfax ou en ligne', 'At the centre in Sfax or online');

  const COURSES = [
    C({
      id: 'reiki-usui', icone: 'hands', theme: 'violet', categorie: ml('ريكي', 'Reiki', 'Reiki'),
      titre: ml('دورة الريكي أوسوي – من المستوى 1 إلى الماستر', 'Formation Reiki Usui – du niveau 1 à la maîtrise', 'Usui Reiki training – level 1 to Master'),
      duree: ml('يومان لكل مستوى', '2 jours par niveau', '2 days per level'), mode: MODE,
      prix: { tnd: '450', eur: '150', usd: '165' },
      niveaux: [
        lv('المستوى 1 – شودن (الريكي الذاتي)', 'Niveau 1 – Shoden', 'Level 1 – Shoden', 450, 150, 165),
        lv('المستوى 2 – أوكودن (الرموز والريكي عن بُعد)', 'Niveau 2 – Okuden', 'Level 2 – Okuden', 550, 185, 200),
        lv('المستوى 3 – شينبيدن (الماستر الممارس)', 'Niveau 3 – Shinpiden (Maître praticien)', 'Level 3 – Master practitioner', 700, 235, 255),
        lv('الماستر المعلّم (تعليم الريكي)', 'Maître enseignant', 'Master teacher', 1000, 335, 365)
      ],
      description: ml(
        'تعلّم الريكي الياباني الأصيل خطوة بخطوة: من العلاج الذاتي إلى علاج الآخرين عن قرب وعن بُعد، وصولاً إلى الماستر وتعليم الريكي. اختر المستوى المناسب لك. شهادة في كل مستوى.',
        'Apprenez le Reiki Usui pas à pas : de l’auto-traitement aux soins à distance, jusqu’à la maîtrise et l’enseignement. Choisissez votre niveau. Certificat à chaque niveau.',
        'Learn traditional Usui Reiki step by step: from self-healing to distance sessions, up to Master and teaching. Choose your level. Certificate at each level.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل شخص يريد أن يعتني بنفسه وبعائلته بطاقة الريكي، أو يريد أن يصبح ممارساً أو معلّماً. لا يحتاج المستوى الأول إلى أي معرفة مسبقة.

## المستوى 1 – شودن: الريكي لنفسك
- تاريخ الريكي ومبادئه الخمسة
- التناغم (Attunement) الأول وفتح قنوات الطاقة
- الشاكرات السبع والهالة
- مواضع اليدين للعلاج الذاتي اليومي
- علاج الأهل والأصدقاء والنباتات والحيوانات
- 21 يوماً من التطهير والمتابعة

## المستوى 2 – أوكودن: الرموز والعلاج عن بُعد
- ثلاثة رموز للطاقة والتوازن العاطفي والإرسال عن بُعد
- جلسة ريكي كاملة لشخص آخر
- الريكي عن بُعد عبر الزمان والمكان
- العمل على العادات والمشاعر والعلاقات

## المستوى 3 – شينبيدن: الماستر الممارس
- رمز الماستر وتعميق القناة
- التأمل وتقوية الطاقة الشخصية
- تقنيات متقدّمة لتنظيف الهالة وموازنة الشاكرات

## الماستر المعلّم
- طريقة نقل التناغمات للمستويات الثلاثة
- تنظيم الدورات وبناء البرنامج
- إشراف ومرافقة بعد الدورة

## ما تحصل عليه
شهادة لكل مستوى، كتيّب PDF، تسجيلات تأمل، ومتابعة عبر واتساب. الفرق الزمني بين المستويات 21 يوماً على الأقل.` }
    }),
    C({
      id: 'karuna-reiki', icone: 'heart', theme: 'rose', categorie: ml('ريكي', 'Reiki', 'Reiki'),
      titre: ml('دورة كارونا ريكي – ريكي الرحمة', 'Formation Karuna Reiki – le Reiki de la compassion', 'Karuna Reiki training – Reiki of compassion'),
      duree: ml('يومان لكل مستوى', '2 jours par niveau', '2 days per level'), mode: MODE,
      prix: { tnd: '550', eur: '185', usd: '200' },
      niveaux: [
        lv('ممارس كارونا (المستويان 1 و2)', 'Praticien Karuna (niveaux 1 et 2)', 'Karuna practitioner (levels 1 & 2)', 550, 185, 200),
        lv('ماستر كارونا', 'Maître Karuna', 'Karuna Master', 800, 270, 295)
      ],
      description: ml(
        '«كارونا» تعني الرحمة. نظام ريكي متقدّم يعمل بعمق على الجروح العاطفية، الذكريات القديمة، والأنماط المتكرّرة. للحاصلين على ماستر الريكي أوسوي.',
        '« Karuna » signifie compassion. Un Reiki avancé qui travaille en profondeur sur les blessures émotionnelles, les mémoires et les schémas répétitifs. Pour les Maîtres Reiki Usui.',
        '"Karuna" means compassion. An advanced Reiki system working deeply on emotional wounds, old memories and repeating patterns. For Usui Reiki Masters.'),
      programme: { ar: `## لمن هذه الدورة؟
للحاصلين على المستوى الثالث (الماستر) في الريكي أوسوي، الذين يريدون أدوات أعمق للشفاء العاطفي والروحي.

## ممارس كارونا
- فلسفة الرحمة والعلاقة بين المعالج والمتلقّي
- رموز كارونا وطاقاتها: التحرّر، الحماية، الحب غير المشروط، التأريض
- العمل على الصدمات القديمة والمشاعر العالقة
- الريكي بالصوت والترنيم
- جلسات تطبيقية مزدوجة

## ماستر كارونا
- رموز الماستر ونقل التناغمات
- علاج الأنماط الكارمية والعلاقات المتكرّرة
- تنظيم الدورات والتعليم

## ما تحصل عليه
شهادة، كتيّب PDF، تسجيلات الترنيم، ومتابعة شهرية.` }
    }),
    C({
      id: 'kundalini-reiki', icone: 'energy', theme: 'gold', categorie: ml('ريكي', 'Reiki', 'Reiki'),
      titre: ml('دورة كونداليني ريكي – إيقاظ الطاقة', 'Formation Kundalini Reiki – éveil de l’énergie', 'Kundalini Reiki training – energy awakening'),
      duree: ml('يوم لكل مستوى', '1 jour par niveau', '1 day per level'), mode: MODE,
      prix: { tnd: '250', eur: '85', usd: '95' },
      niveaux: [
        lv('المستوى 1 – فتح القناة', 'Niveau 1 – Ouverture du canal', 'Level 1 – Opening the channel', 250, 85, 95),
        lv('المستوى 2 – تقوية القناة والشاكرات', 'Niveau 2 – Renforcement', 'Level 2 – Strengthening', 300, 100, 110),
        lv('المستوى 3 – ماستر كونداليني', 'Niveau 3 – Maître Kundalini', 'Level 3 – Kundalini Master', 400, 135, 150)
      ],
      description: ml(
        'نظام ريكي بسيط وقوي يوقظ طاقة الكونداليني بلطف ويقوّي القناة الطاقية والشاكرات. مناسب للمبتدئين والممارسين. ثلاث مستويات.',
        'Un Reiki simple et puissant qui éveille en douceur l’énergie Kundalini et renforce le canal énergétique. Pour débutants et praticiens. Trois niveaux.',
        'A simple, powerful Reiki that gently awakens Kundalini energy and strengthens the energy channel. For beginners and practitioners. Three levels.'),
      programme: { ar: `## لمن هذه الدورة؟
للمبتدئين الذين يريدون بداية سهلة في عالم الطاقة، وللممارسين الذين يريدون تقوية قناتهم.

## المستوى 1 – فتح القناة
- ما هي طاقة الكونداليني؟ وكيف تُوقظ بلطف وأمان
- فتح القناة الطاقية والعلاج الذاتي والآخرين
- تمارين التأريض والحماية

## المستوى 2 – تقوية القناة
- تقوية العمود الطاقي والشاكرات
- العلاج عن بُعد
- تنظيف الأماكن والأشياء

## المستوى 3 – ماستر كونداليني
- إيقاظ الكونداليني الكامل
- علاج الصدمات والولادة والكارما
- نقل التناغمات للآخرين

## ما تحصل عليه
شهادة لكل مستوى، كتيّب PDF، ومتابعة بعد كل مستوى. نترك مدة بين المستويات لاستيعاب الطاقة.` }
    }),
    C({
      id: 'prana-healing', icone: 'lotus', theme: 'green', actif: true, categorie: ml('طاقة', 'Énergie', 'Energy'),
      titre: ml('دورة البرانا هيلينغ – العلاج بالبرانا', 'Formation Prana Healing – soin par le prana', 'Prana Healing training'),
      duree: ml('يومان لكل مستوى', '2 jours par niveau', '2 days per level'), mode: MODE,
      prix: { tnd: '380', eur: '130', usd: '140' },
      niveaux: [
        lv('المستوى الأساسي', 'Niveau de base', 'Basic level', 380, 130, 140),
        lv('المستوى المتقدّم', 'Niveau avancé', 'Advanced level', 480, 160, 175)
      ],
      description: ml(
        'تعلّم العلاج بالبرانا (طاقة الحياة) بدون لمس: مسح الهالة، تنظيفها وإعادة شحنها لدعم التوازن الجسدي والعاطفي. تقنيات عملية تستعملها لنفسك ولعائلتك.',
        'Apprenez le soin par le prana (énergie de vie) sans contact : balayage, nettoyage et recharge de l’aura pour soutenir l’équilibre physique et émotionnel.',
        'Learn no-touch healing with prana (life energy): scanning, cleansing and energising the aura to support physical and emotional balance.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل من يريد أن يتعلّم أداة عملية وسريعة للعناية بطاقته وطاقة عائلته، بدون أي خبرة سابقة في المستوى الأساسي.

## المستوى الأساسي
- البرانا ومصادرها: الشمس، الهواء، الأرض
- الجسد الطاقي، الهالة، والشاكرات الرئيسية
- حساسية اليدين ومسح الهالة (Scanning)
- التنظيف (Sweeping) وإعادة الشحن (Energizing)
- حماية المعالج والتخلّص من الطاقة المستعملة
- تمرين التنفّس البراني وتأمل القلبين

## المستوى المتقدّم
- البرانا الملوّنة واستعمالها الآمن
- العمل على التوتر والمشاعر العالقة
- تنظيف الأماكن والبيوت
- بروتوكولات كاملة لجلسة احترافية

## ما تحصل عليه
شهادة، كتيّب PDF، جلسات تطبيقية، ومتابعة عبر واتساب. البرانا هيلينغ مرافقة طاقية تكمّل المتابعة الطبية ولا تعوّضها.` }
    }),
    C({
      id: 'annales-akashiques', icone: 'book', theme: 'indigo', categorie: ml('إرشاد روحي', 'Guidance', 'Guidance'),
      titre: ml('دورة السجلات الأكاشية – افتح كتاب روحك', 'Formation Annales Akashiques – ouvrir le livre de l’âme', 'Akashic Records training'),
      duree: ml('يومان لكل مستوى', '2 jours par niveau', '2 days per level'), mode: MODE,
      prix: { tnd: '400', eur: '135', usd: '150' },
      niveaux: [
        lv('المستوى 1 – فتح سجلاتك الشخصية', 'Niveau 1 – Ouvrir ses propres Annales', 'Level 1 – Your own Records', 400, 135, 150),
        lv('المستوى 2 – القراءة للآخرين', 'Niveau 2 – Lire pour les autres', 'Level 2 – Reading for others', 550, 185, 200)
      ],
      description: ml(
        'تعلّم فتح سجلاتك الأكاشية بالصلاة المقدّسة، وطرح الأسئلة الصحيحة، واستقبال الإرشاد بوضوح. وفي المستوى الثاني، تعلّم القراءة للآخرين بمسؤولية.',
        'Apprenez à ouvrir vos Annales Akashiques avec la prière sacrée, à poser les bonnes questions et à recevoir la guidance. Niveau 2 : lire pour les autres.',
        'Learn to open your Akashic Records with the sacred prayer, ask the right questions and receive guidance. Level 2: reading for others.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل من يبحث عن فهم أعمق لنفسه، لأنماطه المتكرّرة ولرسالة حياته، ولمن يريد أن يرافق الآخرين بالقراءة.

## المستوى 1 – سجلاتك الشخصية
- ما هي السجلات الأكاشية وأخلاقيات الدخول إليها
- صلاة الفتح والإغلاق
- فن طرح الأسئلة المفتوحة
- قراءة أنماطك، علاقاتك، ومواهب روحك
- تمارين يومية لمدة 21 يوماً

## المستوى 2 – القراءة للآخرين
- فتح سجلات شخص آخر بإذنه
- تقديم القراءة بلطف ومسؤولية
- شفاء الأنماط والعقود عبر السجلات
- قراءات تطبيقية تحت الإشراف

## ما تحصل عليه
شهادة، كتيّب الصلوات والأسئلة، ومتابعة بعد الدورة. القراءة تضيء الحاضر والاختيارات، ولا تتنبّأ بالمستقبل.` }
    }),
    C({
      id: 'bawabat-2027', icone: 'star', theme: 'gold', nouveau: true, date: '2026-12-27', places: '15', categorie: ml('ورشة خاصة', 'Atelier spécial', 'Special workshop'),
      titre: ml('بوابة 2027: القوانين الكونية، الكارما، الثراء والتجلّي', 'Portail 2027 : lois universelles, karma, abondance et manifestation', 'Gateway 2027: universal laws, karma, abundance & manifestation'),
      duree: ml('4 لقاءات (8 ساعات)', '4 séances (8 h)', '4 sessions (8 h)'), mode: MODE,
      prix: { tnd: '220', eur: '75', usd: '85' },
      description: ml(
        'ورشة خاصة لاستقبال 2027 بطاقة جديدة: القوانين الكونية السبعة، فهم الكارما، تنظيف الهالة والبيت، فتح باب الثراء، والتجلّي الواعي لنواياك. مع طقس جماعي لليلة رأس السنة.',
        'Atelier spécial pour accueillir 2027 : les 7 lois universelles, le karma, nettoyage de l’aura et de la maison, abondance et manifestation consciente. Avec un rituel collectif.',
        'Special workshop to welcome 2027: the 7 universal laws, karma, aura and home cleansing, abundance and conscious manifestation. With a group ritual.'),
      programme: { ar: `## لمن هذه الورشة؟
لكل من يريد أن يغلق 2026 بسلام ويفتح 2027 بوضوح ونيّة وطاقة نظيفة.

## اللقاء 1 – القوانين الكونية السبعة
الذبذبة، التناظر، السبب والنتيجة، الإيقاع، القطبية، الجذب، العطاء والاستقبال. كيف تعيشها في يومك.

## اللقاء 2 – الكارما والعقود الروحية
التعرّف على الأنماط المتكرّرة، فهم دروسها، وطقس تحرير العقود التي أدّت مهمتها.

## اللقاء 3 – تنظيف الطاقة والهالة
تنظيف الهالة اليومي، تنظيف البيت قبل العام الجديد، الحماية الطاقية، والشموع والأحجار المناسبة.

## اللقاء 4 – الثراء والتجلّي
تحويل معتقدات المال والاستحقاق، خطوات التجلّي الواعي، لوحة الرؤية (Vision Board)، وطقس النوايا لـ 2027.

## ما تحصل عليه
دفتر عمل PDF، تأمل مسجّل لاستقبال العام، لوحة نوايا، والدخول إلى مجموعة المتابعة خلال جانفي.` }
    }),
    C({
      id: 'jourouh-toufoula', icone: 'heart', theme: 'rose', categorie: ml('تشافي داخلي', 'Guérison intérieure', 'Inner healing'),
      titre: ml('شفاء جروح الطفولة الخمس', 'Guérir les 5 blessures de l’enfance', 'Healing the 5 childhood wounds'),
      duree: ml('3 لقاءات (6 ساعات)', '3 séances (6 h)', '3 sessions (6 h)'), mode: MODE,
      prix: { tnd: '280', eur: '95', usd: '105' },
      description: ml(
        'الرفض، الهجر، الإذلال، الخيانة والظلم: خمسة جروح تشكّل شخصيتنا وعلاقاتنا. تعرّف على جرحك، وأقنعتك، وطريق شفائه مع الطفل الداخلي.',
        'Rejet, abandon, humiliation, trahison, injustice : identifiez votre blessure, vos masques et le chemin de guérison avec l’enfant intérieur.',
        'Rejection, abandonment, humiliation, betrayal, injustice: identify your wound, your masks and the path to healing with your inner child.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل من يلاحظ أن ردود فعله أقوى من الموقف، أو أن علاقاته تتكرّر بنفس الطريقة، ويريد أن يفهم الجذر.

## اللقاء 1 – الجروح الخمسة وأقنعتها
الرفض، الهجر، الإذلال، الخيانة، الظلم: كيف يتكوّن كل جرح، وما القناع الذي نلبسه لنحمي أنفسنا. اختبار لتحديد جرحك الأساسي.

## اللقاء 2 – الطفل الداخلي
التواصل مع الطفل الداخلي، رسالة المصالحة، تأمل موجّه، والتعرّف على احتياجاته التي لم تُلبَّ.

## اللقاء 3 – طريق الشفاء
تحويل المعتقدات المرتبطة بالجرح، تقنيات طاقية للتحرّر العاطفي، وبناء علاقة جديدة مع النفس ومع الآخرين.

## ما تحصل عليه
دفتر تمارين PDF، تأملين مسجّلين، ومتابعة لمدة شهر. هذه الدورة رحلة تطوّر شخصي ولا تعوّض العلاج النفسي عند الحاجة.` }
    }),
    C({
      id: 'alaqat-wa3iya', icone: 'heart', theme: 'violet', categorie: ml('علاقات', 'Relations', 'Relationships'),
      titre: ml('العلاقات الواعية: من التعلّق إلى الحب الحر', 'Relations conscientes : de l’attachement à l’amour libre', 'Conscious relationships'),
      duree: ml('3 لقاءات (6 ساعات)', '3 séances (6 h)', '3 sessions (6 h)'), mode: MODE,
      prix: { tnd: '260', eur: '90', usd: '100' },
      description: ml(
        'لماذا ننجذب إلى نفس النوع من العلاقات؟ أنماط التعلّق، الحدود الصحية، التواصل من القلب، وتنظيف الروابط الطاقية القديمة لعلاقات أكثر سلاماً.',
        'Pourquoi attirons-nous les mêmes relations ? Styles d’attachement, limites saines, communication du cœur et nettoyage des liens énergétiques.',
        'Why do we attract the same relationships? Attachment styles, healthy boundaries, heart-centred communication and clearing old energetic cords.'),
      programme: { ar: `## لمن هذه الدورة؟
للعازبين والمتزوّجين، ولكل من يريد علاقات أكثر صدقاً وسلاماً: مع الشريك، العائلة، الأصدقاء، ومع نفسه.

## اللقاء 1 – مرآة العلاقات
أنماط التعلّق (الآمن، القلق، المتجنّب)، وكيف تعكس العلاقات جروحنا ومعتقداتنا.

## اللقاء 2 – الحدود والتواصل
قول «لا» بحب، التعبير عن الاحتياجات، الاستماع الحقيقي، وتحويل الصراع إلى فهم.

## اللقاء 3 – الروابط الطاقية
قطع الروابط الطاقية القديمة بحب، التسامح، وطقس فتح القلب لعلاقة جديدة أو متجدّدة.

## ما تحصل عليه
دفتر تمارين PDF، تأمل قطع الروابط، ومتابعة لمدة شهر.` }
    }),
    C({
      id: 'karma-3oqoud', icone: 'moon', theme: 'indigo', categorie: ml('روحانيات', 'Spiritualité', 'Spirituality'),
      titre: ml('الكارما والعقود الروحية', 'Karma et contrats d’âme', 'Karma and soul contracts'),
      duree: ml('لقاءان (5 ساعات)', '2 séances (5 h)', '2 sessions (5 h)'), mode: MODE,
      prix: { tnd: '300', eur: '100', usd: '110' },
      description: ml(
        'افهم الأنماط الكارمية التي تتكرّر في حياتك، وتعرّف على العقود الروحية والنذور القديمة، وتعلّم كيف تحرّر ما أدّى مهمته بحب ووعي.',
        'Comprenez les schémas karmiques de votre vie, découvrez les contrats d’âme et les vœux anciens, et libérez ce qui a accompli sa mission.',
        'Understand the karmic patterns in your life, discover soul contracts and old vows, and release what has completed its purpose.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل من يشعر أن بعض الأحداث أو العلاقات «أكبر منه»، ويريد أن يفهم معناها ويتحرّر منها.

## اللقاء 1 – الكارما
معنى الكارما الحقيقي (الفعل وليس العقاب)، علامات الأنماط الكارمية، الكارما العائلية والذاكرة العابرة للأجيال، وتمرين رسم خريطة أنماطك.

## اللقاء 2 – العقود الروحية
العقود بين الأرواح، النذور القديمة (الفقر، الصمت، التضحية)، كيف نتعرّف عليها، وطقس التحرير بالنية والطاقة.

## ما تحصل عليه
دفتر PDF، تأمل مسجّل لتحرير العقود، ومتابعة لمدة أسبوعين.` }
    }),
    C({
      id: 'qouwat-al-sou2al', icone: 'mind', theme: 'blue', categorie: ml('وعي', 'Conscience', 'Awareness'),
      titre: ml('قوة السؤال: أدوات الوعي لحياة أسهل', 'Le pouvoir de la question : outils de conscience', 'The power of the question'),
      duree: ml('لقاءان (4 ساعات)', '2 séances (4 h)', '2 sessions (4 h)'), mode: MODE,
      prix: { tnd: '200', eur: '70', usd: '80' },
      description: ml(
        'السؤال يفتح الباب، والجواب يغلقه. تعلّم كيف تستعمل الأسئلة لتفتح إمكانيات جديدة في المال والعلاقات والجسد والقرارات، وتخرج من الحكم والاستنتاجات.',
        'La question ouvre, la réponse ferme. Apprenez à utiliser les questions pour ouvrir de nouvelles possibilités : argent, relations, corps, décisions.',
        'A question opens, an answer closes. Learn to use questions to open new possibilities in money, relationships, body and decisions.'),
      programme: { ar: `## لمن هذه الدورة؟
لكل من يشعر أنه «عالق» في نفس الأفكار، ويريد أدوات بسيطة ويومية ليعيش بخفّة ووعي أكبر.

## اللقاء 1 – طاقة السؤال
لماذا يغلق الجواب والحكم الإمكانيات؟ الفرق بين السؤال الحقيقي والسؤال المقنّع. أسئلة يومية للصباح، للمشاكل، للأخبار الجميلة والسيئة.

## اللقاء 2 – السؤال في الحياة
أسئلة المال والاستقبال، أسئلة الجسد، أسئلة القرارات والاختيار، وتحدّي 30 يوماً مع دفتر المتابعة.

## ما تحصل عليه
بطاقات أسئلة PDF للطباعة، دفتر تحدّي 30 يوماً، ومجموعة متابعة.` }
    })
  ];

  // Prana session (shown in Sessions)
  const PRANA_SESSION = {
    id: 'prana-healing', categorie: 'energie', icone: 'lotus', theme: 'green', image: '', en_ligne: true,
    titre: ml('جلسة البرانا هيلينغ Prana Healing', 'Séance de Prana Healing', 'Prana Healing session'),
    duree: ml('60 دقيقة', '60 min', '60 min'),
    prix: { tnd: '120', eur: '45', usd: '50' },
    description: ml(
      'جلسة علاج بالبرانا (طاقة الحياة) بدون لمس: مسح الهالة، تنظيف الطاقة الثقيلة، وإعادة شحن الشاكرات لتستعيد الإحساس بالخفّة والتوازن. في المركز أو عن بُعد.',
      'Soin par le prana (énergie de vie) sans contact : balayage de l’aura, nettoyage des énergies lourdes et recharge des chakras. Au centre ou à distance.',
      'No-touch prana (life energy) session: aura scanning, clearing heavy energy and recharging the chakras. At the centre or remotely.')
  };

  const api = { COURSES, PRANA_SESSION };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.CH_COURSES = api;
})(typeof window !== 'undefined' ? window : globalThis);
