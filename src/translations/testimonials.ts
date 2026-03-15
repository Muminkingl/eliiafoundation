import { Lang } from "@/context/LanguageContext";

const testimonialsTranslations: Record<Lang, Record<string, string>> = {
  en: {
    sectionLabel: "Voices of the Foundation",
    headingLine1: "Quotes &",
    headingAccent: "Opinions",
    headingLine3: "from Our People",
    description:
      "The most important statements and opinions of the president, volunteers, and members of the Ellia Foundation — written or spoken during their service.",

    // Testimonial 1
    quote1: "The poor are not only in Ramadan, but in all twelve months of the year. Don't forget them.",
    author1: "Dr. Hogr Ghareeb Khuthur",
    role1: "President of the Organization",

    // Testimonial 2
    quote2: "Every donation, no matter how small, plants a seed of hope in the hearts of those who need it most.",
    author2: "Dr. Ahmed Sleman Muhammed",
    role2: "Communications Manager",

    // Testimonial 3
    quote3: "We don't just build shelters; we rebuild lives, dignity, and futures across all our governorates.",
    author3: "Ahmed Hassan",
    role3: "Comment",
  },

  ku: {
    sectionLabel: "دەنگی دەزگاکە",
    headingLine1: "وتە و",
    headingAccent: "بۆچوونەکان",
    headingLine3: "لە خەڵکەکانمان",
    description:
      "گرنگترین وتە و بۆچوونەکانی سەرۆک، خۆبەخشان و ئەندامانی دەزگای ئیلیا — لە کاتی خزمەتکردنەکانیاندا نووسراو یان ووتراو.",

    quote1: "هەژارەکان تەنها لە ڕەمەزاندا نین، بەڵکو لە هەر دوازدە مانگی ساڵدا هەن. لەبیریان مەکەن.",
    author1: "د. هۆگر غریب خذر",
    role1: "سەرۆکی ڕێکخراوەکە",

    quote2: "هەر بەخشینێک، هەرچەندە بچووک بێت، تۆوی هیوا دەچێنێت لە ناخی ئەوانەی پێویستییان پێیەتی.",
    author2: "د. ئەحمەد سلێمان محەممەد",
    role2: "بەڕێوەبەری پەیوەندییەکان",

    quote3: "ئێمە تەنها پەناگا نابنین؛ بەڵکو ژیان، ئابوور و ئایندە دووبارەئاوا دەکەین لە هەموو پارێزگاکاندا.",
    author3: "ئەحمەد حەسەن",
    role3: "كۆمێنت",
  },

  ar: {
    sectionLabel: "أصوات المؤسسة",
    headingLine1: "اقتباسات و",
    headingAccent: "آراء",
    headingLine3: "من أبناء المؤسسة",
    description:
      "أهم تصريحات وآراء رئيس ومتطوعي وأعضاء مؤسسة إيليا — كُتبت أو قيلت أثناء خدمتهم.",

    quote1: "الفقراء ليسوا فقط في رمضان، بل في جميع أشهر السنة الاثني عشر. لا تنسوهم.",
    author1: "د. هوكر غريب خوسر",
    role1: "رئيس المنظمة",

    quote2: "كل تبرع، مهما كان صغيراً، يزرع بذرة أمل في قلوب من هم في أمس الحاجة إليه.",
    author2: "د. أحمد سليمان محمد",
    role2: "مدير الاتصالات",

    quote3: "نحن لا نبني مجرد ملاجئ؛ بل نعيد بناء الحياة والكرامة والمستقبل عبر جميع محافظاتنا.",
    author3: "أحمد حسن",
    role3: "تعليق",
  },
};

export default testimonialsTranslations;
