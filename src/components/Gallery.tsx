"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ImageIcon, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const images = [
  "/work/1.jpg",
  "/work/2.jpg",
  "/work/3.jpg",
  "/work/4.jpg",
  "/work/5.jpg",
];

// Masonry-ish layout configs
const layouts = [
  { col: "lg:col-span-2 lg:row-span-2", aspect: "aspect-square" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
  { col: "lg:col-span-1 lg:row-span-1", aspect: "aspect-[4/3]" },
];

export default function Gallery() {
  const { dir, t, toLocalNum } = useLanguage();
  const isRTL = dir === "rtl";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  const stats = [
    { value: t("gallery", "stat1Value"), label: t("gallery", "stat1Label"), icon: "🏠" },
    { value: t("gallery", "stat2Value"), label: t("gallery", "stat2Label"), icon: "🕌" },
    { value: t("gallery", "stat3Value"), label: t("gallery", "stat3Label"), icon: "📋" },
    { value: t("gallery", "stat4Value"), label: t("gallery", "stat4Label"), icon: "🤝" },
    { value: t("gallery", "stat5Value"), label: t("gallery", "stat5Label"), icon: "💧" },
  ];

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
          className="mb-10 flex items-end justify-between"
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
          <span className="hidden sm:block text-5xl font-black text-foreground/5 select-none" style={{ fontFamily: "'Georgia', serif" }}>
            {toLocalNum(images.length.toString().padStart(2, "0"))}
          </span>
        </motion.div>

        {/* ── Masonry grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] lg:auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-100 ${layouts[i]?.col}`}
              onClick={() => setLightbox(i)}
            >
              <img
                src={img}
                alt={`${t("gallery", "title")} ${toLocalNum(i + 1)}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Zoom icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </motion.div>
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
          ))}
        </div>

        {/* ── Stats bar ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mt-10 rounded-3xl overflow-hidden"
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
                className="relative flex flex-col items-center justify-center text-center py-10 px-6 group"
              >
                {/* Divider between cells */}
                {i > 0 && (
                  <div className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/4 bottom-1/4 w-px`} style={{ background: "rgba(200,153,42,0.15)" }} />
                )}
                <span className="text-3xl mb-2 select-none">{stat.icon}</span>
                <div
                  className="text-4xl sm:text-5xl font-black leading-none mb-2 group-hover:text-[#c8992a] transition-colors duration-300"
                  style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(200,153,42,0.7)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={images[lightbox]} alt="" className="w-full h-full object-contain bg-black" />
              {/* Controls */}
              <button
                onClick={() => setLightbox(null)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
              {lightbox > 0 && (
                <button
                  onClick={() => setLightbox(lightbox - 1)}
                  className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              {lightbox < images.length - 1 && (
                <button
                  onClick={() => setLightbox(lightbox + 1)}
                  className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-bold">
                {toLocalNum(lightbox + 1)} / {toLocalNum(images.length)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}