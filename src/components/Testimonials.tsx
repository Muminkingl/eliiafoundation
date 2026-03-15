"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Animated word-by-word text
const AnimatedQuote = ({ text, k, isRTL }: { text: string; k: number; isRTL: boolean }) => {
  const words = text.split(" ");
  return (
    <motion.p
      key={k}
      className="text-base sm:text-lg lg:text-xl leading-relaxed font-medium"
      style={{ color: "#f5edd8" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className={`inline-block ${isRTL ? "ml-[0.3em]" : "mr-[0.3em]"}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default function Testimonials() {
  const { dir, t, toLocalNum } = useLanguage();
  const isRTL = dir === "rtl";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Build testimonials data from translations
  const testimonials = [
    {
      id: 1,
      quote: t("testimonials", "quote1"),
      author: t("testimonials", "author1"),
      role: t("testimonials", "role1"),
      image: "/testonamina/photo_2026-03-14_20-43-34.jpg",
      initial: "H",
    },
    {
      id: 2,
      quote: t("testimonials", "quote2"),
      author: t("testimonials", "author2"),
      role: t("testimonials", "role2"),
      image: "/eliaf.jpg",
      initial: "F",
    },
    {
      id: 3,
      quote: t("testimonials", "quote3"),
      author: t("testimonials", "author3"),
      role: t("testimonials", "role3"),
      image: "/eliaf.jpg",
      initial: "A",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlaying, testimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setDirection(1);
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.97, filter: "blur(6px)" }),
    center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.97, filter: "blur(6px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
  };

  return (
    <section
      id="quotes"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1a2b20 0%, #162519 50%, #1e2e24 100%)" }}
      dir={dir}
    >
      {/* ── Grain overlay ───────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Radial glows ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "20%", left: "-5%", width: "50%", height: "60%", background: "radial-gradient(ellipse, rgba(200,153,42,0.07) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "0%", width: "40%", height: "50%", background: "radial-gradient(ellipse, rgba(100,160,120,0.06) 0%, transparent 65%)" }} />
      </div>

      {/* ── Decorative arcs ─────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
        <circle cx="0%" cy="50%" r="400" fill="none" stroke="#c8992a" strokeWidth="1" />
        <circle cx="100%" cy="50%" r="550" fill="none" stroke="#c8992a" strokeWidth="0.5" strokeDasharray="6 8" />
      </svg>

      {/* ── Floating ambient dots ────────────────────────────────── */}
      {[
        { x: "12%", y: "18%", s: 6, d: 0 },
        { x: "85%", y: "12%", s: 9, d: 1.4 },
        { x: "90%", y: "72%", s: 5, d: 2.8 },
        { x: "5%", y: "78%", s: 7, d: 1.8 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: dot.s, height: dot.s, background: "rgba(200,153,42,0.35)" }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + dot.d, repeat: Infinity, delay: dot.d, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Quote Card ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`relative ${isRTL ? "lg:order-2" : ""}`}
          >
            {/* Floating ghost avatars */}
            {testimonials.map((item, i) => {
              if (i === currentIndex) return null;
              const positions = [
                { top: "-2rem", [isRTL ? "left" : "right"]: "2rem" },
                { bottom: "1rem", [isRTL ? "left" : "right"]: "-1rem" },
              ];
              const pos = positions[i % 2] || positions[0];
              return (
                <motion.div
                  key={item.id}
                  className="absolute z-0 w-14 h-14 rounded-full overflow-hidden"
                  style={{ ...pos, border: "2px solid rgba(200,153,42,0.3)", opacity: 0.45 }}
                  animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                </motion.div>
              );
            })}

            {/* Progress bar */}
            <div className="mb-8 flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className="relative h-1 rounded-full overflow-hidden flex-1 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  {i === currentIndex && (
                    <motion.div
                      className={`absolute inset-y-0 ${isRTL ? "right-0" : "left-0"} rounded-full`}
                      style={{ background: "#c8992a" }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: isAutoPlaying ? 7 : 0.3, ease: "linear" }}
                      key={currentIndex}
                    />
                  )}
                  {i < currentIndex && (
                    <div className="absolute inset-0 rounded-full" style={{ background: "rgba(200,153,42,0.5)" }} />
                  )}
                </button>
              ))}
            </div>

            {/* Main card */}
            <div className="relative">
              {/* Shadow stack */}
              <div className={`absolute inset-0 ${isRTL ? "-translate-x-3" : "translate-x-3"} translate-y-3 rounded-3xl opacity-20`} style={{ background: "#c8992a" }} />
              <div className={`absolute inset-0 ${isRTL ? "-translate-x-1.5" : "translate-x-1.5"} translate-y-1.5 rounded-3xl opacity-10`} style={{ background: "#c8992a" }} />

              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(200,153,42,0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Top gold accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, #c8992a, rgba(200,153,42,0.2))` }} />

                <div className="p-8 sm:p-10">
                  {/* Giant quote mark */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-6"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(200,153,42,0.15)", border: "1px solid rgba(200,153,42,0.3)" }}
                    >
                      <Quote className={`w-6 h-6 fill-current ${isRTL ? "scale-x-[-1]" : ""}`} style={{ color: "#c8992a" }} />
                    </div>
                  </motion.div>

                  {/* Animated quote text */}
                  <div className="min-h-[120px] mb-8">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <AnimatedQuote text={current.quote} k={currentIndex} isRTL={isRTL} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px mb-6" style={{ background: "rgba(200,153,42,0.2)" }} />

                  {/* Author row */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`author-${currentIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative">
                          <div
                            className="w-14 h-14 rounded-full overflow-hidden"
                            style={{ border: "2px solid rgba(200,153,42,0.5)" }}
                          >
                            <img src={current.image} alt={current.author} className="w-full h-full object-cover" />
                          </div>
                          {/* Online dot */}
                          <div
                            className={`absolute bottom-0 ${isRTL ? "left-0" : "right-0"} w-3 h-3 rounded-full border-2`}
                            style={{ background: "#4ade80", borderColor: "#1a2b20" }}
                          />
                        </div>
                        <div>
                          <div className="font-black text-base" style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}>
                            {current.author}
                          </div>
                          <div className="text-xs font-semibold mt-0.5" style={{ color: "#c8992a" }}>
                            {current.role}
                          </div>
                        </div>
                      </div>

                      {/* Nav buttons */}
                      <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        {[{ fn: handlePrev, Icon: ArrowLeft }, { fn: handleNext, Icon: ArrowRight }].map(({ fn, Icon }, i) => (
                          <motion.button
                            key={i}
                            onClick={fn}
                            whileHover={{ scale: 1.1, background: "rgba(200,153,42,0.2)" }}
                            whileTap={{ scale: 0.93 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,153,42,0.25)", color: "#c8992a" }}
                          >
                            <Icon className="w-4 h-4" />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Heading side ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`flex flex-col items-center ${isRTL ? "lg:items-start lg:order-1" : "lg:items-end"} text-center ${isRTL ? "lg:text-right" : "lg:text-right"}`}
          >
            <span className="inline-flex items-center gap-2 font-bold text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#c8992a" }}>
              <span className="w-8 h-px" style={{ background: "#c8992a" }} />
              {t("testimonials", "sectionLabel")}
            </span>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
            >
              {t("testimonials", "headingLine1")}
              <br />
              <span className="relative inline-block">
                {t("testimonials", "headingAccent")}
                <motion.svg
                  viewBox="0 0 260 16"
                  className="absolute -bottom-1 left-0 w-full"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  <motion.path
                    d="M4 10 Q65 2 130 9 Q195 16 256 8"
                    stroke="#c8992a"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.7 }}
                  />
                </motion.svg>
              </span>
              <br />
              {t("testimonials", "headingLine3")}
            </h2>

            <p className="text-base leading-relaxed max-w-sm mb-10" style={{ color: "rgba(245,237,216,0.55)" }}>
              {t("testimonials", "description")}
            </p>

            {/* Testimonial thumbnails row */}
            <div className="flex items-center gap-3">
              {testimonials.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => { setIsAutoPlaying(false); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full overflow-hidden transition-all"
                  style={{
                    width: i === currentIndex ? 52 : 40,
                    height: i === currentIndex ? 52 : 40,
                    border: i === currentIndex ? "2px solid #c8992a" : "2px solid rgba(255,255,255,0.15)",
                    opacity: i === currentIndex ? 1 : 0.5,
                    transition: "all 0.3s ease",
                  }}
                >
                  <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                </motion.button>
              ))}
              <span className={`text-xs font-bold ${isRTL ? "mr-1" : "ml-1"}`} style={{ color: "rgba(245,237,216,0.4)" }}>
                {toLocalNum(currentIndex + 1)} / {toLocalNum(testimonials.length)}
              </span>
            </div>

            {/* Decorative large quote mark */}
            <motion.div
              animate={{ opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mt-10 select-none pointer-events-none"
              style={{
                fontSize: "220px",
                lineHeight: 1,
                color: "#c8992a",
                fontFamily: "'Georgia', serif",
                fontWeight: 900,
              }}
            >
              &ldquo;
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}