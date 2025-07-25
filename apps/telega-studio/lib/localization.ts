interface LocalizationTexts {
  [key: string]: string;
}

interface LocalizationData {
  [locale: string]: LocalizationTexts;
}

const texts: LocalizationData = {
  ru: {
    app_name: 'Tele•Ga',
    landing_slogan: 'Создайте свой бизнес в Telegram',
    landing_description:
      'Tele•Ga — это маркетплейс, который позволяет создавать магазины, управлять клиентами и зарабатывать через рефералов прямо в Telegram.',
    open_app: 'Открыть приложение',
    feature_shop: 'Конструктор магазинов',
    feature_shop_desc: 'Создавайте магазины с помощью drag-and-drop интерфейса.',
    feature_crm: 'CRM и уведомления',
    feature_crm_desc: 'Управляйте клиентами и отправляйте push-уведомления.',
    feature_affiliate: 'Реферальная программа',
    feature_affiliate_desc: 'Зарабатывайте Teleton, приглашая друзей.',
    top_up: 'Пополнить кошелек',
    enter_amount: 'Введите сумму',
    pay_now: 'Оплатить',
    payment_error: 'Ошибка оплаты',
    login: 'Войти через Telegram',
    wallet: 'Кошелек',
    balance: 'Баланс',
    transactions: 'История транзакций',
    marketbase: 'Маркетплейс',
    products: 'Товары',
    services: 'Услуги',
    favorites: 'Избранное',
    top_week: 'Топ недели',
    category: 'Категория',
    geo: 'Город',
    import_wildberries: 'Импорт из Wildberries',
    import: 'Импорт',
    import_success: 'Товар успешно импортирован',
    import_error: 'Ошибка импорта',
    book_service: 'Записаться на услугу',
    book: 'Записаться',
    booking_success: 'Запись успешна',
    booking_error: 'Ошибка записи',
    loading: 'Загрузка...',
    crm: 'CRM',
    contacts: 'Контакты',
    send_notification: 'Отправить уведомление',
    segment: 'Сегмент',
    message: 'Сообщение',
    send: 'Отправить',
    notification_success: 'Уведомление отправлено',
    notification_error: 'Ошибка отправки',
    export_excel: 'Экспорт в Excel',
    username: 'Имя пользователя',
    email: 'Email',
    affiliate: 'Партнерская программа',
    referral_program: 'Реферальная программа',
    generate_link: 'Сгенерировать ссылку',
    your_link: 'Ваша ссылка',
    referrals: 'Рефералы',
    teleton_earned: 'Заработано Teleton',
    link_generated: 'Ссылка сгенерирована',
    link_error: 'Ошибка генерации ссылки',
  },
  uz: {
    app_name: 'Tele•Ga',
    landing_slogan: "Telegram'da biznesingizni yarating",
    landing_description:
      "Tele•Ga — bu Telegram'da do'konlar yaratish, mijozlarni boshqarish va taklifnomalar orqali daromad qilish imkonini beruvchi bozor.",
    open_app: 'Ilovani ochish',
    feature_shop: "Do'kon konstruktori",
    feature_shop_desc: "Drag-and-drop interfeysi yordamida do'konlar yarating.",
    feature_crm: 'CRM va bildirishnomalar',
    feature_crm_desc: 'Mijozlarni boshqaring va push-bildirishnomalar yuboring.',
    feature_affiliate: 'Taklifnoma dasturi',
    feature_affiliate_desc: "Do'stlaringizni taklif qilib Teleton ishlang.",
    top_up: "Hamyonni to'ldirish",
    enter_amount: 'Summani kiriting',
    pay_now: "To'lov",
    payment_error: "To'lov xatosi",
    login: 'Telegram orqali kirish',
    wallet: 'Hamyon',
    balance: 'Balans',
    transactions: 'Tranzaksiyalar tarixi',
    marketbase: 'Bozor',
    products: 'Mahsulotlar',
    services: 'Xizmatlar',
    favorites: 'Sevimlilar',
    top_week: 'Haftaning eng yaxshilari',
    category: 'Kategoriya',
    geo: 'Shahar',
    import_wildberries: "Wildberries'dan import",
    import: 'Import',
    import_success: 'Mahsulot muvaffaqiyatli import qilindi',
    import_error: 'Import xatosi',
    book_service: 'Xizmatga yozilish',
    book: 'Yozilish',
    booking_success: 'Yozilish muvaffaqiyatli',
    booking_error: 'Yozilish xatosi',
    loading: 'Yuklanmoqda...',
    crm: 'CRM',
    contacts: 'Kontaktlar',
    send_notification: 'Bildirishnoma yuborish',
    segment: 'Segment',
    message: 'Xabar',
    send: 'Yuborish',
    notification_success: 'Bildirishnoma yuborildi',
    notification_error: 'Yuborish xatosi',
    export_excel: "Excel'ga eksport",
    username: 'Foydalanuvchi nomi',
    email: 'Email',
    affiliate: 'Hamkorlik dasturi',
    referral_program: 'Taklifnoma dasturi',
    generate_link: 'Havola yaratish',
    your_link: 'Sizning havolangiz',
    referrals: 'Taklifnomalar',
    teleton_earned: 'Ishlangan Teleton',
    link_generated: 'Havola yaratildi',
    link_error: 'Havola yaratish xatosi',
  },
  kz: {
    app_name: 'Tele•Ga',
    landing_slogan: "Telegram'да өз бизнесіңізді құрыңыз",
    landing_description:
      "Tele•Ga — бұл Telegram'да дүкендер құруға, тұтынушыларды басқаруға және рефералдар арқылы табыс табуға мүмкіндік беретін маркетплейс.",
    open_app: 'Қосымшты ашу',
    feature_shop: 'Дүкен конструкторы',
    feature_shop_desc: 'Drag-and-drop интерфейсі арқылы дүкендер құрыңыз.',
    feature_crm: 'CRM және хабарландырулар',
    feature_crm_desc: 'Тұтынушыларды басқарыңыз және push-хабарландырулар жіберіңіз.',
    feature_affiliate: 'Рефералдық бағдарлама',
    feature_affiliate_desc: 'Достарыңызды шақырып Teleton табыңыз.',
    top_up: 'Әмиянды толтыру',
    enter_amount: 'Соманы енгізіңіз',
    pay_now: 'Төлеу',
    payment_error: 'Төлем қатесі',
    login: 'Telegram арқылы кіру',
    wallet: 'Әмиян',
    balance: 'Баланс',
    transactions: 'Транзакциялар тарихы',
    marketbase: 'Маркетплейс',
    products: 'Тауарлар',
    services: 'Қызметтер',
    favorites: 'Таңдаулылар',
    top_week: 'Аптаның үздіктері',
    category: 'Санат',
    geo: 'Қала',
    import_wildberries: "Wildberries'тен импорттау",
    import: 'Импорттау',
    import_success: 'Тауар сәтті импортталды',
    import_error: 'Импорттау қатесі',
    book_service: 'Қызметке жазылу',
    book: 'Жазылу',
    booking_success: 'Жазылу сәтті',
    booking_error: 'Жазылу қатесі',
    loading: 'Жүктелуде...',
    crm: 'CRM',
    contacts: 'Байланыстар',
    send_notification: 'Хабарландыру жіберу',
    segment: 'Сегмент',
    message: 'Хабар',
    send: 'Жіберу',
    notification_success: 'Хабарландыру жіберілді',
    notification_error: 'Жіберу қатесі',
    export_excel: "Excel'ге экспорттау",
    username: 'Пайдаланушы аты',
    email: 'Email',
    affiliate: 'Серіктестік бағдарлама',
    referral_program: 'Рефералдық бағдарлама',
    generate_link: 'Сілтеме құру',
    your_link: 'Сіздің сілтемеңіз',
    referrals: 'Рефералдар',
    teleton_earned: 'Табылған Teleton',
    link_generated: 'Сілтеме құрылды',
    link_error: 'Сілтеме құру қатесі',
  },
  ua: {
    app_name: 'Tele•Ga',
    landing_slogan: 'Створіть свій бізнес у Telegram',
    landing_description:
      'Tele•Ga — це маркетплейс, який дозволяє створювати магазини, керувати клієнтами та заробляти через рефералів прямо в Telegram.',
    open_app: 'Відкрити додаток',
    feature_shop: 'Конструктор магазинів',
    feature_shop_desc: 'Створюйте магазини за допомогою drag-and-drop інтерфейсу.',
    feature_crm: 'CRM та сповіщення',
    feature_crm_desc: 'Керуйте клієнтами та відправляйте push-сповіщення.',
    feature_affiliate: 'Реферальна програма',
    feature_affiliate_desc: 'Заробляйте Teleton, запрошуючи друзів.',
    top_up: 'Поповнити гаманець',
    enter_amount: 'Введіть суму',
    pay_now: 'Оплатити',
    payment_error: 'Помилка оплати',
    login: 'Увійти через Telegram',
    wallet: 'Гаманець',
    balance: 'Баланс',
    transactions: 'Історія транзакцій',
    marketbase: 'Маркетплейс',
    products: 'Товари',
    services: 'Послуги',
    favorites: 'Обране',
    top_week: 'Топ тижня',
    category: 'Категорія',
    geo: 'Місто',
    import_wildberries: 'Імпорт з Wildberries',
    import: 'Імпорт',
    import_success: 'Товар успішно імпортовано',
    import_error: 'Помилка імпорту',
    book_service: 'Записатися на послугу',
    book: 'Записатися',
    booking_success: 'Запис успішний',
    booking_error: 'Помилка запису',
    loading: 'Завантаження...',
    crm: 'CRM',
    contacts: 'Контакти',
    send_notification: 'Відправити повідомлення',
    segment: 'Сегмент',
    message: 'Повідомлення',
    send: 'Відправити',
    notification_success: 'Повідомлення відправлено',
    notification_error: 'Помилка відправки',
    export_excel: 'Експорт в Excel',
    username: "Ім'я користувача",
    email: 'Email',
    affiliate: 'Партнерська програма',
    referral_program: 'Реферальна програма',
    generate_link: 'Згенерувати посилання',
    your_link: 'Ваше посилання',
    referrals: 'Реферали',
    teleton_earned: 'Зароблено Teleton',
    link_generated: 'Посилання згенеровано',
    link_error: 'Помилка генерації посилання',
  },
  am: {
    app_name: 'Tele•Ga',
    landing_slogan: 'Ստեղծեք Ձեր բիզնեսը Telegram-ում',
    landing_description:
      'Tele•Ga-ն մարկետփլեյս է, որը թույլ է տալիս ստեղծել խանութներ, կառավարել հաճախորդներին և վաստակել հաշվարկների միջոցով հենց Telegram-ում:',
    open_app: 'Բացել հավելվածը',
    feature_shop: 'Խանութի կոնստրուկտոր',
    feature_shop_desc: 'Ստեղծեք խանութներ drag-and-drop ինտերֆեյսի միջոցով:',
    feature_crm: 'CRM և ծանուցումներ',
    feature_crm_desc: 'Կառավարեք հաճախորդներին և ուղարկեք push-ծանուցումներ:',
    feature_affiliate: 'Հաշվարկային ծրագիր',
    feature_affiliate_desc: 'Վաստակեք Teleton՝ հրավիրելով ընկերներին:',
    top_up: 'Լիցքավորել դրամապանակը',
    enter_amount: 'Մուտքագրեք գումարը',
    pay_now: 'Վճարել',
    payment_error: 'Վճարման սխալ',
    login: 'Մուտք գործել Telegram-ով',
    wallet: 'Դրամապանակ',
    balance: 'Հաշվեկշիռ',
    transactions: 'Գործարքների պատմություն',
    marketbase: 'Մարկետփլեյս',
    products: 'Ապրանքներ',
    services: 'Ծառայություններ',
    favorites: 'Հավանածներ',
    top_week: 'Շաբաթվա լավագույն',
    category: 'Կատեգորիա',
    geo: 'Քաղաք',
    import_wildberries: 'Ներմուծել Wildberries-ից',
    import: 'Ներմուծել',
    import_success: 'Ապրանքը հաջողությամբ ներմուծվել է',
    import_error: 'Ներմուծման սխալ',
    book_service: 'Գրանցվել ծառայության համար',
    book: 'Գրանցվել',
    booking_success: 'Գրանցումը հաջող է',
    booking_error: 'Գրանցման սխալ',
    loading: 'Բեռնում...',
    crm: 'CRM',
    contacts: 'Կոնտակտներ',
    send_notification: 'Ուղարկել ծանուցում',
    segment: 'Սեգմենտ',
    message: 'Հաղորդագրություն',
    send: 'Ուղարկել',
    notification_success: 'Ծանուցումը ուղարկվել է',
    notification_error: 'Ծանուցման ուղարկման սխալ',
    export_excel: 'Արտահանել Excel',
    username: 'Օգտատիրոջ անուն',
    email: 'Email',
    affiliate: 'Գործընկերային ծրագիր',
    referral_program: 'Հաշվարկային ծրագիր',
    generate_link: 'Ստեղծել հղում',
    your_link: 'Ձեր հղումը',
    referrals: 'Հաշվարկներ',
    teleton_earned: 'Վաստակած Teleton',
    link_generated: 'Հղումը ստեղծվել է',
    link_error: 'Հղման ստեղծման սխալ',
  },
  ky: {
    app_name: 'Tele•Ga',
    landing_slogan: "Telegram'да өз бизнесиңизди түзүңүз",
    landing_description:
      "Tele•Ga — бул Telegram'да дүкөн түзүүгө, кардарларды башкарууга жана рефералдар аркылуу киреше табууга мүмкүндүк берген маркетплейс.",
    open_app: 'Колдонмону ачуу',
    feature_shop: 'Дүкөн конструктору',
    feature_shop_desc: 'Drag-and-drop интерфейси аркылуу дүкөндөрдү түзүңүз.',
    feature_crm: 'CRM жана билдирүүлөр',
    feature_crm_desc: 'Кардарларды башкарыңыз жана push-билдирүүлөрдү жөнөтүңүз.',
    feature_affiliate: 'Рефералдык программа',
    feature_affiliate_desc: 'Досторуңузду чакырып Teleton табыңыз.',
    top_up: 'Капчыкты толтуруу',
    enter_amount: 'Сумманы киргизиңиз',
    pay_now: 'Төлөө',
    payment_error: 'Төлөм катасы',
    login: 'Telegram аркылуу кирүү',
    wallet: 'Капчык',
    balance: 'Баланс',
    transactions: 'Транзакциялардын тарыхы',
    marketbase: 'Маркетплейс',
    products: 'Товарлар',
    services: 'Кызматтар',
    favorites: 'Сүйүктүүлөр',
    top_week: 'Жуманын мыктылары',
    category: 'Категория',
    geo: 'Шаар',
    import_wildberries: "Wildberries'тен импорттоо",
    import: 'Импорттоо',
    import_success: 'Товар ийгиликтүү импорттолду',
    import_error: 'Импорттоо катасы',
    book_service: 'Кызматка жазылуу',
    book: 'Жазылуу',
    booking_success: 'Жазылуу ийгиликтүү',
    booking_error: 'Жазылуу катасы',
    loading: 'Жүктөлүүдө...',
    crm: 'CRM',
    contacts: 'Байланыштар',
    send_notification: 'Билдирүү жөнөтүү',
    segment: 'Сегмент',
    message: 'Билдирүү',
    send: 'Жөнөтүү',
    notification_success: 'Билдирүү жөнөтүлдү',
    notification_error: 'Билдирүү жөнөтүүдө ката',
    export_excel: "Excel'ге экспорттоо",
    username: 'Колдонуучунун аты',
    email: 'Email',
    affiliate: 'Өнөктөштүк программа',
    referral_program: 'Рефералдык программа',
    generate_link: 'Шилтеме түзүү',
    your_link: 'Сиздин шилтемеңиз',
    referrals: 'Рефералдар',
    teleton_earned: 'Табылган Teleton',
    link_generated: 'Шилтеме түзүлдү',
    link_error: 'Шилтеме түзүүдө ката',
  },
  en: {
    app_name: 'Tele•Ga',
    landing_slogan: 'Build Your Business on Telegram',
    landing_description:
      'Tele•Ga is a marketplace that lets you create shops, manage clients, and earn through referrals directly in Telegram.',
    open_app: 'Open App',
    feature_shop: 'Shop Constructor',
    feature_shop_desc: 'Create shops using a drag-and-drop interface.',
    feature_crm: 'CRM & Notifications',
    feature_crm_desc: 'Manage clients and send push notifications.',
    feature_affiliate: 'Affiliate Program',
    feature_affiliate_desc: 'Earn Teleton by inviting friends.',
    top_up: 'Top Up Wallet',
    enter_amount: 'Enter Amount',
    pay_now: 'Pay Now',
    payment_error: 'Payment Error',
    login: 'Sign in with Telegram',
    wallet: 'Wallet',
    balance: 'Balance',
    transactions: 'Transaction History',
    marketbase: 'Marketplace',
    products: 'Products',
    services: 'Services',
    favorites: 'Favorites',
    top_week: 'Top of the Week',
    category: 'Category',
    geo: 'City',
    import_wildberries: 'Import from Wildberries',
    import: 'Import',
    import_success: 'Product imported successfully',
    import_error: 'Import error',
    book_service: 'Book a Service',
    book: 'Book',
    booking_success: 'Booking successful',
    booking_error: 'Booking error',
    loading: 'Loading...',
    crm: 'CRM',
    contacts: 'Contacts',
    send_notification: 'Send Notification',
    segment: 'Segment',
    message: 'Message',
    send: 'Send',
    notification_success: 'Notification sent',
    notification_error: 'Notification error',
    export_excel: 'Export to Excel',
    username: 'Username',
    email: 'Email',
    affiliate: 'Affiliate Program',
    referral_program: 'Referral Program',
    generate_link: 'Generate Link',
    your_link: 'Your Link',
    referrals: 'Referrals',
    teleton_earned: 'Teleton Earned',
    link_generated: 'Link generated',
    link_error: 'Link generation error',
  },
};

export const getText = (key: string, locale: string = 'en'): string => {
  return texts[locale]?.[key] || texts.en[key] || key;
};

export const getLocale = (): string => {
  if (typeof window !== 'undefined') {
    return (
      window.Telegram?.WebApp?.initDataUnsafe?.language_code ||
      localStorage.getItem('locale') ||
      'en'
    );
  }
  return 'en';
};

export const setLocale = (locale: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
};

export const getSupportedLocales = (): string[] => {
  return Object.keys(texts);
};
