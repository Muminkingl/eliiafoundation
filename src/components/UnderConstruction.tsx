"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Construction, Sparkles, Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  en: {
    badge: "Coming Soon",
    title: "Site Under Construction",
    subtitle: "We are currently upgrading our website to bring you a better experience. Please check back soon!",
    working: "Our team is working hard behind the scenes.",
    close: "Dismiss",
  },
  ar: {
    badge: "قريباً",
    title: "الموقع تحت الإنشاء",
    subtitle: "نقوم حالياً بتحديث موقعنا لنقدم لكم تجربة أفضل. يرجى العودة قروياً!",
    working: "فريقنا يعمل بجد خلف الكواليس.",
    close: "إغلاق",
  },
  ku: {
    badge: "بەم زووانە",
    title: "ماڵپەڕ لە ژێر چاکسازیدایە",
    subtitle: "لە ئێستادا سەرقاڵی نوێکردنەوەی ماڵپەڕەکەمانین بۆ ئەوەی ئەزموونێکی باشترت پێشکەش بکەین. تکایە بەم زووانە سەردانمان بکەرەوە!",
    working: "تیمەکەمان بە سەختی لە پشت پەردەوە کار دەکات.",
    close: "داخستن",
  },
};

export default function UnderConstruction() {
  const { lang, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session storage to see if the user dismissed it previously
    const dismissed = sessionStorage.getItem("under-construction-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("under-construction-dismissed", "true");
    setIsVisible(false);
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  const isRTL = dir === "rtl";

  // Prevent flash during hydration/initial check
  if (isVisible === null || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeInOut" } }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
        style={{
          background: "radial-gradient(circle at center, #14281c 0%, #0a130e 100%)",
        }}
        dir={dir}
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #c8992a 0px, #c8992a 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, #c8992a 0px, #c8992a 1px, transparent 1px, transparent 24px)",
          }}
        />

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#c8992a]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#2d6a4f]/20 blur-[120px] pointer-events-none" />

        {/* The Tiny X button in the top corner for developers to close and see the page */}
        <button
          onClick={handleDismiss}
          className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} z-[100000] p-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer`}
          title={t.close}
          aria-label={t.close}
        >
          <X className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90" />
        </button>

        {/* Construction Panel Container */}
        <div className="relative max-w-lg w-full text-center px-6 py-12 sm:p-16 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl flex flex-col items-center">
          {/* Top Organization Brand */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white flex items-center justify-center p-0.5 border border-[#c8992a]/30 shadow-md">
              <img src="/eliaf.jpg" alt="Ellia Foundation" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#c8992a]">
                {lang === "en" ? "ORGANIZATION" : lang === "ar" ? "منظمة" : "ڕێکخراوی"}
              </span>
              <span className="font-semibold text-sm text-[#f5edd8]" style={{ fontFamily: "'Georgia', serif" }}>
                {lang === "en" ? "Ellia Foundation" : lang === "ar" ? "مؤسسة إيليا" : "دەزگای ئێلیا"}
              </span>
            </div>
          </div>

          {/* Construction Animated Icon Section */}
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#c8992a]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {/* Secondary pulsing background */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#2d6a4f]/20 to-[#c8992a]/10 animate-pulse" />
            
            {/* Animated center icons */}
            <Construction className="w-10 h-10 text-[#c8992a] relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-[#c8992a]" />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-1"
              animate={{ rotate: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hammer className="w-5 h-5 text-[#2d6a4f]" />
            </motion.div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8992a]/10 border border-[#c8992a]/20 text-xs font-bold text-[#c8992a] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8992a] animate-ping" />
            <span>{t.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5edd8] to-[#c8992a] mb-4 tracking-tight leading-tight">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 font-medium max-w-sm">
            {t.subtitle}
          </p>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

          {/* Working message */}
          <p className="text-[11px] uppercase tracking-wider text-white/40 font-bold">
            {t.working}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
