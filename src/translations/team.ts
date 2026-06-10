import { Lang } from "@/context/LanguageContext";

const teamTranslations: Record<Lang, Record<string, string>> = {
  en: {
    sectionTitle: "Our Leadership",
    sectionSubtitle: "The dedicated minds guiding Ellia Humanitarian Organization",
    drAhmedName: "Dr. Ahmed Sleman",
    drAhmedRole: "President of the Foundation",
    drAhmedBio: "Directing the organization's overarching humanitarian vision and dedicated to securing sustainable support for families and orphans.",
    drHogrName: "Dr. Hogr Ghareeb Khuthur",
    drHogrRole: "Projects Director",
    drHogrBio: "Managing operational activities and supervising field projects to ensure effective delivery of humanitarian services.",
  },

  ku: {
    sectionTitle: "دەستەی بەڕێوەبردن",
    sectionSubtitle: "ئەو کەسە دڵسۆزانەی کە ڕێ پیشاندەری ڕێکخراوی ئیلیان",
    drAhmedName: "د. ئەحمەد سلێمان",
    drAhmedRole: "سەرۆکی دەزگا",
    drAhmedBio: "ڕێبەرایەتیکردنی کار و دیدگای گشتی ڕێکخراو لە پێناو دابینکردنی پاڵپشتی بەردەوام بۆ خێزانەکان و منداڵانی بێسەرپەرشت.",
    drHogrName: "د. هۆگر غەریب خدر",
    drHogrRole: "بەڕێوەبەری پڕۆژەکان",
    drHogrBio: "بەڕێوەبردن و سەرپەرشتیکردنی پڕۆژە مەیدانییەکان و دڵنیابوونەوە لە گەیاندنی کاریگەری یارمەتییە مرۆییەکان.",
  },

  ar: {
    sectionTitle: "الهيئة الإدارية",
    sectionSubtitle: "العقول المخلصة التي تقود منظمة إيليا الإنسانية",
    drAhmedName: "د. أحمد سليمان",
    drAhmedRole: "رئيس المؤسسة",
    drAhmedBio: "قيادة الرؤية الإنسانية العامة للمنظمة والعمل على تأمين الدعم المستدام للعائلات والأيتام.",
    drHogrName: "د. هوكر غريب خضر",
    drHogrRole: "مدير المشاريع",
    drHogrBio: "إدارة الأنشطة التشغيلية والإشراف على المشاريع الميدانية لضمان تقديم المساعدات الإنسانية بفعالية.",
  },
};

export default teamTranslations;
