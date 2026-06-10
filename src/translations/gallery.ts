import { Lang } from "@/context/LanguageContext";

const galleryTranslations: Record<Lang, Record<string, string>> = {
  en: {
    title: "Our Work in Pictures",
    sectionLabel: "Field Documentation",
    description: "Real moments from our work across Kurdistan — each photo tells the story of lives changed.",

    // Categories
    catAll: "All",
    catJournalist: "Journalist Workshop",
    catComputer: "Advanced Computer Courses",
    catWomensDay: "International Women's Day",
    catChildrensDay: "International Children's Day",
    catFarouk: "Dr. Farouk Rafeeq Seminar",
    catArabKurd: "The Arab-Kurd Foundation",
    catLebanon: "Lebanon Young Leaders Program",
    catIrex: "IREX - First Meeting",
    catVoter: "Voter Education",

    // UI Buttons
    viewAll: "View All Images",
    showLess: "Show Less",

    // Stats
    stat1Value: "205",
    stat1Label: "Houses Built",
    stat2Value: "20",
    stat2Label: "Mosques Built",
    stat3Value: "122",
    stat3Label: "Charity Projects",
    stat4Value: "536",
    stat4Label: "Orphans Sponsored",
    stat5Value: "13",
    stat5Label: "Water Wells",
  },

  ku: {
    title: "کارەکانمان لە وێنەدا",
    sectionLabel: "کارەکانمان",
    description: "ساتە ڕاستەقینەکان لە کارەکانمان لە سەرتاسەری کوردستان — هەر وێنەیەک چیرۆکی ژیانی گۆڕاو دەگێڕێتەوە.",

    // Categories
    catAll: "هەموو",
    catJournalist: "ۆرک شۆپی ڕۆژنامەنووسی",
    catComputer: "خولەکانی کۆمپیوتەری پێشکەوتوو",
    catWomensDay: "ڕۆژی جیهانیی ژنان",
    catChildrensDay: "ڕۆژی جیهانیی منداڵان",
    catFarouk: "سیمیناری د. فاروق ڕەفیق",
    catArabKurd: "دەزگای عەرەبی-کوردی",
    catLebanon: "بەرنامەی سەرکردە گەنجەکانی لوبنان",
    catIrex: "ئایرێکس - کۆبوونەوەی یەکەم",
    catVoter: "پەروەردەکردنی دەنگدەران",

    // UI Buttons
    viewAll: "بینینی هەموو وێنەکان",
    showLess: "بینینی کەمتر",

    stat1Value: "٢٠٥",
    stat1Label: "خانووی دروستکراو",
    stat2Value: "٢٠",
    stat2Label: "مزگەوتی دروستکراو",
    stat3Value: "١٢٢",
    stat3Label: "پڕۆژەی خێرخوازی",
    stat4Value: "٥٣٦",
    stat4Label: "هەتیوی کەفاڵەتکراو",
    stat5Value: "١٣",
    stat5Label: "بیری ئاو",
  },

  ar: {
    title: "أعمالنا بالصور",
    sectionLabel: "التوثيق الميداني",
    description: "لحظات حقيقية من عملنا عبر كوردستان — كل صورة تروي قصة حياة تغيّرت.",

    // Categories
    catAll: "الكل",
    catJournalist: "ورشة عمل الصحفيين",
    catComputer: "دورات الحاسوب المتقدمة",
    catWomensDay: "اليوم العالمي للمرأة",
    catChildrensDay: "اليوم العالمي للطفل",
    catFarouk: "ندوة د. فاروق رفيق",
    catArabKurd: "المؤسسة العربية الكردية",
    catLebanon: "برنامج القادة الشباب في لبنان",
    catIrex: "آيركس - الاجتماع الأول",
    catVoter: "تثقيف الناخبين والتوعية الانتخابية",

    // UI Buttons
    viewAll: "عرض جميع الصور",
    showLess: "عرض أقل",

    stat1Value: "٢٠٥",
    stat1Label: "منزل مبني",
    stat2Value: "٢٠",
    stat2Label: "مسجد مبني",
    stat3Value: "١٢٢",
    stat3Label: "مشروع خيري",
    stat4Value: "٥٣٦",
    stat4Label: "يتيم مكفول",
    stat5Value: "١٣",
    stat5Label: "بئر مياه",
  },
};

export default galleryTranslations;
