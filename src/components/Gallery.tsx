"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ─── Generate Image Datasets ──────────────────────────────────────────────
const journalistImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/${i + 1}.jpg`,
  category: "journalist",
}));
const computerImages = Array.from({ length: 17 }, (_, i) => ({
  src: `/images/z${i + 1}.jpg`,
  category: "computer",
}));
const womensDayImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/x${i + 1}.jpg`,
  category: "womensDay",
}));
const childrensDayImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/images/c${i + 1}.jpg`,
  category: "childrensDay",
}));
const faroukImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/v${i + 1}.jpg`,
  category: "farouk",
}));
const arabKurdImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/b${i + 1}.jpg`,
  category: "arabKurd",
}));
const lebanonImages = Array.from({ length: 4 }, (_, i) => ({
  src: `/images/n${i + 1}.jpg`,
  category: "lebanon",
}));
const irexImages = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/m${i + 1}.jpg`,
  category: "irex",
}));
const voterImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/f${i + 1}.jpg`,
  category: "voter",
}));

const allImages = [
  ...journalistImages,
  ...computerImages,
  ...womensDayImages,
  ...childrensDayImages,
  ...faroukImages,
  ...arabKurdImages,
  ...lebanonImages,
  ...irexImages,
  ...voterImages,
];

// Masonry-ish layouts config
const layouts = [
  { col: "lg:col-span-2 lg:row-span-2", aspect: "aspect-square" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
];

const categories = [
  { id: "all", labelKey: "catAll" },
  { id: "journalist", labelKey: "catJournalist" },
  { id: "computer", labelKey: "catComputer" },
  { id: "womensDay", labelKey: "catWomensDay" },
  { id: "childrensDay", labelKey: "catChildrensDay" },
  { id: "farouk", labelKey: "catFarouk" },
  { id: "arabKurd", labelKey: "catArabKurd" },
  { id: "lebanon", labelKey: "catLebanon" },
  { id: "irex", labelKey: "catIrex" },
  { id: "voter", labelKey: "catVoter" },
];

export default function Gallery() {
  const { dir, t, toLocalNum } = useLanguage();
  const isRTL = dir === "rtl";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images
  const filteredImages = selectedCategory === "all"
    ? allImages
    : allImages.filter((img) => img.category === selectedCategory);

  // Set visible limit (default 8 images)
  const defaultLimit = 8;
  const hasMore = filteredImages.length > defaultLimit;
  const visibleImages = isExpanded ? filteredImages : filteredImages.slice(0, defaultLimit);

  const stats = [
    { value: t("gallery", "stat1Value"), label: t("gallery", "stat1Label"), icon: "🏠" },
    { value: t("gallery", "stat2Value"), label: t("gallery", "stat2Label"), icon: "🕌" },
    { value: t("gallery", "stat3Value"), label: t("gallery", "stat3Label"), icon: "📋" },
    { value: t("gallery", "stat4Value"), label: t("gallery", "stat4Label"), icon: "🤝" },
    { value: t("gallery", "stat5Value"), label: t("gallery", "stat5Label"), icon: "💧" },
  ];

  const handleOpenLightbox = (imgSrc: string) => {
    const idx = filteredImages.findIndex((img) => img.src === imgSrc);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setIsExpanded(false); // Reset expansion on filter change
  };

  return (
    <section id="gallery" className="relative bg-[#faf8f2] pb-24 lg:pb-32 overflow-hidden" ref={ref} dir={dir}>
      {/* ── Grain overlay ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Header banner ───────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ background: "#c8992a" }}>
        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #000 0px, #000 1px, transparent 1px, transparent 12px)",
          }}
        />
        <div className="relative z-10 py-6 sm:py-7 flex items-center justify-center gap-3">
          <ImageIcon className="w-5 h-5 text-[#18120a]" />
          <h2
            className="font-black text-[#18120a] text-3xl sm:text-4xl tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {t("gallery", "title")}
          </h2>
        </div>
        {/* Downward triangle */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#c8992a] z-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 relative z-10">
        {/* ── Section label ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[#c8992a] font-bold text-xs tracking-[0.25em] uppercase mb-2">
              <span className="w-6 h-px bg-[#c8992a]" />
              {t("gallery", "sectionLabel")}
            </span>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("gallery", "description")}
            </p>
          </div>
          <span className="hidden sm:block text-5xl font-black text-foreground/5 select-none font-serif">
            {toLocalNum(filteredImages.length.toString().padStart(2, "0"))}
          </span>
        </motion.div>

        {/* ── Filter Tabs ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {/* Scrollable Container on Mobile, Wraps on Desktop */}
          <div className="flex gap-2.5 overflow-x-auto pb-3 w-full justify-start lg:justify-center flex-nowrap lg:flex-wrap no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 border uppercase tracking-wider cursor-pointer select-none ${
                    active
                      ? "bg-secondary/15 border-secondary text-secondary font-black shadow-[0_2px_10px_-3px_rgba(200,153,42,0.3)]"
                      : "bg-white/40 border-secondary/20 hover:border-secondary/60 text-muted-foreground hover:text-secondary"
                  }`}
                >
                  {t("gallery", cat.labelKey)}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Masonry grid ────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] lg:auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {visibleImages.map((img, i) => {
              const layoutConfig = layouts[i % layouts.length];
              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-100 ${layoutConfig.col}`}
                  onClick={() => handleOpenLightbox(img.src)}
                >
                  <img
                    src={img.src}
                    alt={`${t("gallery", "title")} ${toLocalNum(i + 1)}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Number badge */}
                  <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <span className="text-white text-xs font-bold">{toLocalNum(String(i + 1).padStart(2, "0"))}</span>
                  </div>

                  {/* Gold bottom bar on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ background: "#c8992a" }}
                    initial={{ scaleX: 0, originX: isRTL ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── View All / Show Less button ─────────────────────────── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 bg-primary text-white font-black text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-full shadow-md hover:shadow-lg hover:bg-primary-light transition-all duration-300 cursor-pointer select-none"
            >
              <Grid className="w-4 h-4" />
              <span>{isExpanded ? t("gallery", "showLess") : t("gallery", "viewAll")}</span>
            </button>
          </motion.div>
        )}

        {/* ── Stats bar ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a2b20 0%, #0f1f15 100%)" }}
        >
          {/* Grain on stats */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px",
            }}
          />
          {/* Glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-full pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(200,153,42,0.12) 0%, transparent 65%)" }} />
          {/* Top gold line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #c8992a, transparent)" }} />

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center text-center py-10 px-6 group"
              >
                {/* Divider between cells */}
                {i > 0 && (
                  <div className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/4 bottom-1/4 w-px`} style={{ background: "rgba(200,153,42,0.15)" }} />
                )}
                <span className="text-3xl mb-2 select-none">{stat.icon}</span>
                <div
                  className="text-4xl sm:text-5xl font-black leading-none mb-2 group-hover:text-[#c8992a] transition-colors duration-300 font-serif"
                  style={{ color: "#f5edd8" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(200,153,42,0.7)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filteredImages[lightboxIndex]?.src} alt="" className="w-full h-full object-contain bg-black" />
              {/* Controls */}
              <button
                onClick={() => setLightboxIndex(null)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors border-none cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors border-none cursor-pointer`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {lightboxIndex < filteredImages.length - 1 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors border-none cursor-pointer`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold">
                {toLocalNum(lightboxIndex + 1)} / {toLocalNum(filteredImages.length)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}