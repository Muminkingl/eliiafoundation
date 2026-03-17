import { Lang } from "@/context/LanguageContext";

const contactTranslations: Record<Lang, Record<string, string>> = {
  en: {
    // Page header
    sectionLabel: "Get in Touch",
    heading: "Contact",
    headingAccent: "Us",
    subheading: "Don't hesitate to contact us with the organization team",

    // Form card
    formTitle: "Send us a Message",
    formSubtitle: "We'll respond within 24 hours",

    // Form fields
    name: "Name",
    email: "Email",
    phone: "Phone Number",
    subject: "Subject",
    message: "Message",
    send: "SEND MESSAGE",

    // Success message
    successTitle: "Message Sent!",
    successDesc: "Thank you for reaching out. Our team will get back to you shortly.",

    // Contact info cards
    addressTitle: "Our Address",
    addressValue: "40M St, Erbil, Kurdistan Region, Iraq",
    emailTitle: "Email Us",
    emailValue: "info@elia-foundation.org",
    phoneTitle: "Call Us",
    phoneValue: "07504477409",
    fibTitle: "FIB",
    fibValue: "07504477409",
    fastpayTitle: "FastPay",
    fastpayValue: "07504477409",

    // Map section
    mapHeading: "Find Us",
    mapSubheading: "Visit our office in Erbil, Kurdistan Region",
  },

  ku: {
    sectionLabel: "پەیوەندیمان پێوە بکە",
    heading: "پەیوەندی",
    headingAccent: "بکە",
    subheading: "دوودڵ مەبە لە پەیوەندیکردن لەگەڵ تیمی ڕێکخراوەکە",

    formTitle: "نامەیەکمان بنێرە",
    formSubtitle: "لە ماوەی ٢٤ کاتژمێردا وەڵامت دەدەینەوە",

    name: "ناو",
    email: "ئیمەیڵ",
    phone: "ژمارەی مۆبایل",
    subject: "بابەت",
    message: "پەیام",
    send: "ناردنی پەیام",

    successTitle: "نامەکە نێردرا!",
    successDesc: "سوپاس بۆ پەیوەندیکردنت. تیممان بەزوویی وەڵامت دەداتەوە.",

    addressTitle: "ناونیشانمان",
    addressValue: "شەقامی ٤٠م، هەولێر، هەرێمی کوردستان، عێراق",
    emailTitle: "ئیمەیڵمان بنێرە",
    emailValue: "info@elia-foundation.org",
    phoneTitle: "پەیوەندیمان پێوە بکە",
    phoneValue: "07504477409",
    fibTitle: "FIB",
    fibValue: "07504477409",
    fastpayTitle: "FastPay",
    fastpayValue: "07504477409",

    mapHeading: "بماندۆزەوە",
    mapSubheading: "سەردانی ئۆفیسەکەمان بکە لە هەولێر، هەرێمی کوردستان",
  },

  ar: {
    sectionLabel: "تواصل معنا",
    heading: "اتصل",
    headingAccent: "بنا",
    subheading: "لا تتردد في التواصل مع فريق المنظمة",

    formTitle: "أرسل لنا رسالة",
    formSubtitle: "سنرد خلال ٢٤ ساعة",

    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال الرسالة",

    successTitle: "تم إرسال الرسالة!",
    successDesc: "شكراً لتواصلك. سيتواصل معك فريقنا قريباً.",

    addressTitle: "عنواننا",
    addressValue: "شارع 40م، أربيل، إقليم كوردستان، العراق",
    emailTitle: "راسلنا",
    emailValue: "info@elia-foundation.org",
    phoneTitle: "اتصل بنا",
    phoneValue: "07504477409",
    fibTitle: "FIB",
    fibValue: "07504477409",
    fastpayTitle: "FastPay",
    fastpayValue: "07504477409",

    mapHeading: "موقعنا",
    mapSubheading: "قم بزيارة مكتبنا في أربيل، إقليم كوردستان",
  },
};

export default contactTranslations;
