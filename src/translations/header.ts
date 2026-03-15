import { Lang } from "@/context/LanguageContext";

const headerTranslations: Record<Lang, Record<string, string>> = {
  en: {
    // Top bar
    address: "40M St, Erbil, Iraq",
    email: "info@elliafoundation.org",
    phone: "07504477409",
    sponsorOrphan: "Sponsor an Orphan",
    organization: "Organization",
    foundationName: "Ellia Foundation",

    // Nav links
    home: "Home",
    quotes: "Quotes",
    gallery: "Gallery",
    faq: "FAQ",
    donation: "Donation",
    contact: "Contact",
    news: "News",

    // Donate button
    donate: "Donate",
    donateNow: "Donate Now",

    // Mobile menu
    foundation: "Foundation",
    ellia: "Ellia",
  },

  ku: {
    // Top bar
    address: "شەقامی ٤٠م، هەولێر، عێراق",
    email: "info@elliafoundation.org",
    phone: "07504477409",
    sponsorOrphan: "کەفاڵەتی هەتیوێک",
    organization: "ڕێکخراو",
    foundationName: "دەزگای ئیلیای مرۆیی",

    // Nav links
    home: "سەرەکی",
    quotes: "وتەکان",
    gallery: "وێنەکان",
    faq: "پرسیارەکان",
    donation: "بەخشین",
    contact: "پەیوەندی",
    news: "هەواڵ",

    // Donate button
    donate: "بەخشین",
    donateNow: "ئێستا بەخشین بکە",

    // Mobile menu
    foundation: "فاوندەیشن",
    ellia: "دەزگای ئیلیای مرۆیی",
  },

  ar: {
    // Top bar
    address: "شارع 40م، أربيل، العراق",
    email: "info@elliafoundation.org",
    phone: "07504477409",
    sponsorOrphan: "اكفل يتيماً",
    organization: "منظمة",
    foundationName: "مؤسسة إيليا",

    // Nav links
    home: "الرئيسية",
    quotes: "الاقتباسات",
    gallery: "المعرض",
    faq: "الأسئلة",
    donation: "التبرع",
    contact: "اتصل بنا",
    news: "الأخبار",

    // Donate button
    donate: "تبرع",
    donateNow: "تبرع الآن",

    // Mobile menu
    foundation: "مؤسسة",
    ellia: "إيليا",
  },
};

export default headerTranslations;
