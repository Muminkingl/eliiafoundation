import { Lang } from "@/context/LanguageContext";

const newsTranslations: Record<Lang, Record<string, string>> = {
  en: {
    badge: "Ellia Foundation",
    title: "News & Updates",
    subtitle: "Project reports, community impact stories, and humanitarian updates from across Kurdistan and beyond.",
    noPostsTitle: "No posts yet",
    noPostsSubtitle: "Check back soon for updates!",
    latest: "Latest",
    minRead: "min read",
    min: "min",
    readFullStory: "Read Full Story",
    readPost: "Read Post",
  },
  ku: {
    badge: "دەزگای ئیلیای مرۆیی",
    title: "هەواڵ و نوێکارییەکان",
    subtitle: "ڕاپۆرتی پڕۆژەکان، چیرۆکی کاریگەری کۆمەڵگا، و نوێکارییەکانی مرۆیی لە سەرانسەری کوردستان و دەرەوەی.",
    noPostsTitle: "هیچ بابەتێک نییە",
    noPostsSubtitle: "بەم زوانە نوێکاری دەبینیت!",
    latest: "نوێترین",
    minRead: "خولەک خوێندنەوە",
    min: "خولەک",
    readFullStory: "چیرۆکی تەواو بخوێنەوە",
    readPost: "بابەتەکە بخوێنەوە",
  },
  ar: {
    badge: "مؤسسة إيليا",
    title: "الأخبار والتحديثات",
    subtitle: "تقارير المشاريع، قصص التأثير المجتمعي، والتحديثات الإنسانية من جميع أنحاء كردستان وخارجها.",
    noPostsTitle: "لا توجد منشورات بعد",
    noPostsSubtitle: "تحقق مرة أخرى قريباً للحصول على التحديثات!",
    latest: "الأحدث",
    minRead: "دقيقة للقراءة",
    min: "دقيقة",
    readFullStory: "اقرأ القصة كاملة",
    readPost: "اقرأ المنشور",
  },
};

export default newsTranslations;
