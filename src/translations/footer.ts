import { Lang } from "@/context/LanguageContext";

const footerTranslations: Record<Lang, Record<string, string>> = {
  en: {
    brandName: "Ellia Foundation",
    brandDesc: "A charitable humanitarian NGO dedicated to providing care for orphans and support for families in need.",

    // Column titles
    quickLinksTitle: "Quick Links",
    programsTitle: "Programs",
    contactTitle: "Contact Us",

    // Quick links (matches header nav order)
    linkHome: "Home",
    linkQuotes: "Quotes",
    linkGallery: "Gallery",
    linkFaq: "FAQ",
    linkDonate: "Donate",
    linkContact: "Contact",
    linkNews: "News",

    // Programs
    prog1: "Orphan Sponsorship",
    prog2: "Education Support",
    prog3: "Healthcare Initiatives",
    prog4: "Emergency Relief",

    // Contact
    address: "Erbil, Kurdistan Region, Iraq",
    email: "info@elliafoundation.org",
    phone: "07504477409",

    // Bottom
    copyright: "Ellia Foundation. All rights reserved.",
  },

  ku: {
    brandName: "دەزگای ئیلیای مرۆیی",
    brandDesc: "ڕێکخراوێکی خێرخوازی مرۆڤدۆستانەیە تایبەت بە چاودێریکردنی هەتیوان و پشتیوانیکردنی خێزانە پێویستمەندەکان.",

    quickLinksTitle: "لینکە خێراکان",
    programsTitle: "بەرنامەکان",
    contactTitle: "پەیوەندیمان پێوە بکە",

    linkHome: "سەرەکی",
    linkQuotes: "وتەکان",
    linkGallery: "وێنەکان",
    linkFaq: "پرسیارەکان",
    linkDonate: "بەخشین",
    linkContact: "پەیوەندی",
    linkNews: "هەواڵ",

    prog1: "کەفاڵەتی هەتیوان",
    prog2: "پشتیوانی خوێندن",
    prog3: "بەرنامەکانی تەندروستی",
    prog4: "یارمەتی فریاگوزاری",

    address: "هەولێر، هەرێمی کوردستان، عێراق",
    email: "info@elliafoundation.org",
    phone: "07504477409",

    copyright: "دەزگای ئیلیای مرۆیی. هەموو مافەکان پارێزراون.",
  },

  ar: {
    brandName: "مؤسسة إيليا",
    brandDesc: "منظمة إنسانية خيرية مكرسة لتوفير الرعاية للأيتام ودعم الأسر المحتاجة.",

    quickLinksTitle: "روابط سريعة",
    programsTitle: "البرامج",
    contactTitle: "اتصل بنا",

    linkHome: "الرئيسية",
    linkQuotes: "الاقتباسات",
    linkGallery: "المعرض",
    linkFaq: "الأسئلة",
    linkDonate: "تبرع",
    linkContact: "اتصل بنا",
    linkNews: "الأخبار",

    prog1: "كفالة الأيتام",
    prog2: "دعم التعليم",
    prog3: "المبادرات الصحية",
    prog4: "الإغاثة الطارئة",

    address: "أربيل، إقليم كوردستان، العراق",
    email: "info@elliafoundation.org",
    phone: "07504477409",

    copyright: "مؤسسة إيليا. جميع الحقوق محفوظة.",
  },
};

export default footerTranslations;
