"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import {
  Heart, Menu, Mail, Phone, MapPin, ChevronDown, X, Globe,
} from "lucide-react";
import { useLanguage, Lang } from "@/context/LanguageContext";


const languages = [
  { code: "en" as Lang, name: "English", nativeName: "English", flag: "/language/english.svg" },
  { code: "ar" as Lang, name: "Arabic", nativeName: "العربية", flag: "/language/arabic.svg" },
  { code: "ku" as Lang, name: "Kurdish", nativeName: "کوردی", flag: "/language/kurdish.svg" },
];

export default function Header() {
  const { lang, setLang, dir, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isRTL = dir === "rtl";


  // Current language object for display
  const currentLang = languages.find((l) => l.code === lang) || languages[0];

  // Build nav links from translations
  const navLinks = [
    { label: t("header", "home"), href: "/" },
    { label: t("header", "quotes"), href: "/#quotes" },
    { label: t("header", "gallery"), href: "/#gallery" },
    { label: t("header", "faq"), href: "/#faq" },
    { label: t("header", "contact"), href: "/contact" },
    { label: t("header", "news"), href: "/news" },
  ];

  const [activeSection, setActiveSection] = useState(pathname || "/");

  useEffect(() => {
    // If we're on a subpage, set the pathname as active
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    // Scroll spy for homepage hash links
    const handler = () => {
      const sections = navLinks.map((l) => l.href.replace("/#", "")).filter(s => s !== "/" && !s.startsWith("/"));
      let current = "/";
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = `/#${id}`;
          break;
        }
      }
      setActiveSection(current);
    };
    
    // Initial check
    handler();
    
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [pathname, navLinks]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50" dir={dir}>

      {/* ── Top info bar ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, #0f1a13 0%, #1a2b20 60%, #141f17 100%)" }}
      >
        {/* Diagonal stripe accent */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(-60deg, #c8992a 0px, #c8992a 1px, transparent 1px, transparent 18px)" }}
        />
        {/* Gold bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #c8992a55, transparent)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap items-center justify-between gap-y-1 py-2.5 sm:py-0 sm:h-11`}>

            {/* Contact items */}
            <div className={`flex flex-wrap items-center gap-5 sm:gap-8`}>
              {[
                { icon: MapPin, value: t("header", "address"), link: "https://maps.app.goo.gl/7FJXtf7g8oDHj5aA6" },
                { icon: Mail, value: t("header", "email") },
                { icon: Phone, value: t("header", "phone"), forceDir: "ltr" as const },
              ].map(({ icon: Icon, value, forceDir, link }) => {
                const innerContent = (
                  <>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300"
                      style={{ background: "rgba(200,153,42,0.12)", border: "1px solid rgba(200,153,42,0.25)" }}
                    >
                      <Icon className="w-3 h-3 transition-colors duration-300" style={{ color: "#c8992a" }} />
                    </div>
                    <span className="text-[11px] font-medium transition-colors duration-200 group-hover:text-white" style={{ color: "rgba(245,237,216,0.55)" }} dir={forceDir}>
                      {value}
                    </span>
                  </>
                );

                return link ? (
                  <a key={value} href={link} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-100">
                    {innerContent}
                  </a>
                ) : (
                  <div key={value} className="group flex items-center gap-2 cursor-default">
                    {innerContent}
                  </div>
                );
              })}
            </div>

            {/* Right: Sponsor CTA + Logo */}
            <div className={`flex items-center gap-5`}>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group hidden sm:flex items-center gap-2 font-bold text-[13px] tracking-wide transition-colors"
                style={{ color: "#f5edd8" }}
              >
                <span className="group-hover:text-[#c8992a] transition-colors">{t("header", "sponsorOrphan")}</span>
                <motion.div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "#c8992a" }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#0f1a13]" />
                </motion.div>
              </motion.a>

              {/* Logo */}
              <div className={`hidden lg:flex items-center gap-2.5 ${isRTL ? "pr-5 border-r" : "pl-5 border-l"}`} style={{ borderColor: "rgba(200,153,42,0.2)" }}>
                <div
                  className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ background: "#fff", border: "1.5px solid rgba(200,153,42,0.3)" }}
                >
                  <img src="/eliaf.jpg" alt="Ellia Foundation" className="w-full h-full object-contain p-0.5" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "#c8992a" }}>{t("header", "organization")}</span>
                  <span
                    className="font-black text-base leading-none"
                    style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}
                  >
                    {t("header", "foundationName")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav ─────────────────────────────────────────────── */}
      <motion.nav
        animate={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(26,43,32,1)",
          boxShadow: scrolled ? "0 4px 30px -4px rgba(0,0,0,0.12)" : "none",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ backdropFilter: scrolled ? "blur(16px)" : "none" }}
        className="relative"
      >
        {/* Gold top line (visible on scroll) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: "linear-gradient(90deg, transparent, #c8992a, transparent)" }}
        />

        <div className={`max-w-7xl mx-auto flex items-stretch h-[58px] ${isRTL ? "flex-row-reverse" : ""}`}>

          {/* ── Gold donate button block ─────────────────────────── */}
          <motion.a
            href="/contact"
            className={`relative group w-[120px] sm:w-[160px] flex items-center justify-center gap-2 font-black text-sm tracking-wide shrink-0 overflow-hidden`}
            style={{ background: "#c8992a", color: "#0f1a13" }}
            whileHover={{ filter: "brightness(1.08)" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative z-10">{t("header", "donate")}</span>
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          </motion.a>

          {/* ── Nav links area ───────────────────────────────────── */}
          <div className={`flex-1 flex items-center ${isRTL ? "justify-start" : "justify-end"} px-4 sm:px-6 gap-2`}>

            {/* Desktop links */}
            <nav className={`hidden lg:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href || activeSection.startsWith(link.href) && link.href !== "/";
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="relative px-4 py-2 text-[14px] font-bold rounded-lg transition-colors duration-200 group"
                    style={{
                      color: scrolled
                        ? isActive ? "#1a2b20" : "#1a2b20aa"
                        : isActive ? "#c8992a" : "rgba(245,237,216,0.7)",
                    }}
                  >
                    {link.label}
                    {/* Active underline */}
                    <motion.span
                      className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full"
                      style={{ background: scrolled ? "#1a2b20" : "#c8992a" }}
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    />
                    {/* Hover bg */}
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: scrolled ? "rgba(26,43,32,0.06)" : "rgba(255,255,255,0.07)" }}
                    />
                  </motion.a>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 mx-2" style={{ background: scrolled ? "rgba(26,43,32,0.15)" : "rgba(255,255,255,0.15)" }} />

            {/* Language selector */}
            <div ref={langRef} className="hidden lg:block relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-[13px] transition-colors"
                style={{ color: scrolled ? "#1a2b20" : "rgba(245,237,216,0.8)" }}
              >
                <Globe className="w-3.5 h-3.5" style={{ color: "#c8992a" }} />
                {currentLang.nativeName}
                <motion.div animate={{ rotate: langOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${isRTL ? "left-0" : "right-0"} mt-2 w-40 rounded-2xl overflow-hidden shadow-xl z-50`}
                    style={{ background: "#fff", border: "1px solid rgba(26,43,32,0.1)" }}
                  >
                    {languages.map((langItem, i) => (
                      <motion.button
                        key={langItem.code}
                        initial={{ opacity: 0, x: isRTL ? 8 : -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => handleLangChange(langItem.code)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold hover:bg-[#1a2b20]/05 transition-colors"
                        style={{ color: langItem.code === lang ? "#1a6b3c" : "#1a2b20" }}
                      >
                        {langItem.nativeName}
                        <img src={langItem.flag} alt={langItem.name} className="w-5 h-5 rounded-sm object-cover" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{
                      background: scrolled ? "rgba(26,43,32,0.07)" : "rgba(255,255,255,0.1)",
                      color: scrolled ? "#1a2b20" : "#f5edd8",
                    }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.button>
                </SheetTrigger>

                <SheetContent side={isRTL ? "right" : "left"} className="w-[300px] p-0 border-0" style={{ background: "#0f1a13" }}>
                  {/* Mobile panel */}
                  <div className="flex flex-col h-full" dir={dir}>
                    {/* Header */}
                    <div className={`flex items-center justify-between px-6 py-5`} style={{ borderBottom: "1px solid rgba(200,153,42,0.15)" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                          <img src="/eliaf.jpg" alt="Ellia Foundation" className="w-full h-full object-contain p-0.5" />
                        </div>
                        <div>
                          <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "#c8992a" }}>{t("header", "foundation")}</div>
                          <div className="font-black text-sm" style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}>{t("header", "ellia")}</div>
                        </div>
                      </div>
                      <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "#f5edd8" }}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                      {navLinks.map((link, i) => {
                        const isActive = activeSection === link.href;
                        return (
                          <motion.a
                            key={link.href}
                            href={link.href}
                            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-all`}
                            style={{
                              background: isActive ? "rgba(200,153,42,0.12)" : "transparent",
                              color: isActive ? "#c8992a" : "rgba(245,237,216,0.65)",
                              border: isActive ? "1px solid rgba(200,153,42,0.25)" : "1px solid transparent",
                            }}
                          >
                            {link.label}
                            {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8992a" }} />}
                          </motion.a>
                        );
                      })}
                    </nav>

                    {/* Lang + Donate */}
                    <div className="px-4 pb-6 space-y-3" style={{ borderTop: "1px solid rgba(200,153,42,0.12)" }}>
                      <div className="flex gap-2 pt-4">
                        {languages.map((langItem) => (
                          <button
                            key={langItem.code}
                            onClick={() => handleLangChange(langItem.code)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all"
                            style={{
                              background: langItem.code === lang ? "rgba(200,153,42,0.15)" : "rgba(255,255,255,0.05)",
                              color: langItem.code === lang ? "#c8992a" : "rgba(245,237,216,0.5)",
                              border: langItem.code === lang ? "1px solid rgba(200,153,42,0.3)" : "1px solid transparent",
                            }}
                          >
                            <img src={langItem.flag} alt={langItem.name} className="w-4 h-4 rounded-sm" />
                            {langItem.code.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <motion.a
                        href="#donate"
                        onClick={() => setMobileOpen(false)}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-black text-sm tracking-wide"
                        style={{ background: "#c8992a", color: "#0f1a13" }}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        {t("header", "donateNow")}
                      </motion.a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </motion.nav>
    </header>
  );
}