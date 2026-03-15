"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { HeartHandshake, Users, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


// ─── Floating particle component ───────────────────────────────────────────
const FloatingDot = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-secondary/30 pointer-events-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -18, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

// ─── Animated counter ──────────────────────────────────────────────────────
const Counter = ({ to, suffix = "", formatNum }: { to: number; suffix?: string; formatNum?: (n: number | string) => string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const springVal = useSpring(0, { stiffness: 60, damping: 20 });
  const fmt = formatNum || String;

  useEffect(() => {
    if (inView) springVal.set(to);
  }, [inView, to, springVal]);

  useEffect(() => {
    return springVal.on("change", (v) => {
      if (ref.current) ref.current.textContent = fmt(Math.round(v)) + suffix;
    });
  }, [springVal, suffix, fmt]);

  return <span ref={ref}>{fmt(0)}{suffix}</span>;
};

export default function Hero() {
  const { dir, t, toLocalNum } = useLanguage();
  const isRTL = dir === "rtl";

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);



  // Stagger variants
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden"
      style={{ background: "linear-gradient(155deg, #fdf9ef 0%, #f7f0dd 45%, #faf5e8 100%)" }}
      dir={dir}
    >
      {/* ── Textured grain overlay ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Background parallax arcs ───────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <circle cx="900" cy="-100" r="600" fill="none" stroke="#c8992a" strokeWidth="1.5" />
          <circle cx="950" cy="-60" r="480" fill="none" stroke="#c8992a" strokeWidth="1" />
          <circle cx="100" cy="900" r="500" fill="none" stroke="#c8992a" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* ── Floating ambient dots ──────────────────────────────────────── */}
      <FloatingDot delay={0} x="8%" y="20%" size={8} />
      <FloatingDot delay={1.2} x="15%" y="65%" size={5} />
      <FloatingDot delay={2.5} x="88%" y="15%" size={10} />
      <FloatingDot delay={0.8} x="75%" y="75%" size={6} />
      <FloatingDot delay={3.1} x="55%" y="10%" size={4} />

      {/* ── Diagonal accent stripe ─────────────────────────────────────── */}
      <div
        className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-[45%] h-full pointer-events-none opacity-[0.04]`}
        style={{
          background: "repeating-linear-gradient(-55deg, #c8992a 0px, #c8992a 1px, transparent 1px, transparent 28px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-center ${isRTL ? "direction-rtl" : ""}`}>

          {/* ── TEXT CONTENT ────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ y: textY }}
            className={`flex flex-col items-center lg:items-start text-center lg:text-start ${isRTL ? "lg:order-2" : ""}`}
          >
            {/* Pill badge */}
            <motion.div variants={fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary font-bold text-xs sm:text-sm tracking-widest uppercase px-4 py-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                {t("hero", "badge")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp}>
              <h1 className="relative inline-block">
                <span className={`block text-sm sm:text-base font-semibold text-muted-foreground tracking-[0.2em] uppercase mb-1 ${isRTL ? "lg:text-right" : "lg:text-left"} text-center`}>
                  {t("hero", "welcomeTo")}
                </span>
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-black text-primary leading-[0.95] tracking-tight"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {t("hero", "titleLine1")}
                  <br />
                  <span className="relative">
                    {t("hero", "titleLine2")}
                    {/* Underline swoosh */}
                    <motion.svg
                      viewBox="0 0 320 18"
                      className="absolute -bottom-2 left-0 w-full"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    >
                      <motion.path
                        d="M4 12 Q80 2 160 10 Q240 18 316 8"
                        stroke="#c8992a"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.svg>
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-[500px] text-balance"
            >
              {t("hero", "description")}{" "}
              <strong className="text-foreground font-semibold">{t("hero", "descBold")}</strong>{" "}
              {t("hero", "descEnd")}
            </motion.p>

            {/* Quote */}
            <motion.div
              variants={fadeUp}
              className={`relative mt-6 mb-8 max-w-[500px] lg:mx-0 mx-auto ${isRTL ? "text-right" : "text-left"}`}
            >
              <div className={`absolute ${isRTL ? "right-0" : "left-0"} top-0 bottom-0 w-[3px] bg-gradient-to-b from-secondary via-secondary/60 to-transparent rounded-full`} />
              <p className={`${isRTL ? "pr-5" : "pl-5"} text-foreground font-bold text-lg sm:text-xl leading-snug`}>
                {t("hero", "quote")}
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className={`flex gap-8 sm:gap-12 mb-10 w-full max-w-[500px]`}
            >
              {[
                { value: 4, suffix: "+", label: t("hero", "statGovernorates") },
                { value: 2000, suffix: "", label: t("hero", "statEst") },
                { value: 100, suffix: "%", label: t("hero", "statTransparent") },
              ].map(({ value, suffix, label }) => (
                <div key={label} className={isRTL ? "text-right" : "text-left"}>
                  <div className="text-3xl sm:text-4xl font-black text-primary leading-none">
                    <Counter to={value} suffix={suffix} formatNum={toLocalNum} />
                  </div>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase mt-1 font-medium">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              variants={containerVariants}
              className="w-full max-w-[500px] grid grid-cols-2 gap-4 mb-10"
            >
              {[
                {
                  icon: HeartHandshake,
                  title: t("hero", "sponsorshipTitle"),
                  desc: t("hero", "sponsorshipDesc"),
                  accent: "from-amber-50 to-yellow-50",
                },
                {
                  icon: Users,
                  title: t("hero", "orphanCareTitle"),
                  desc: t("hero", "orphanCareDesc"),
                  accent: "from-orange-50 to-amber-50",
                },
              ].map(({ icon: Icon, title, desc, accent }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: "0 16px 40px -12px rgba(200,153,42,0.25)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${accent} border border-secondary/35 cursor-default overflow-hidden shadow-[0_4px_24px_-4px_rgba(200,153,42,0.18)]`}
                >
                  {/* Corner accent */}
                  <div className={`absolute top-0 ${isRTL ? "left-0 rounded-br-3xl" : "right-0 rounded-bl-3xl"} w-12 h-12 bg-secondary/10`} />
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-0.5">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className={`flex flex-wrap gap-4 items-center ${isRTL ? "flex-row-reverse" : ""}`}>
              <motion.a
                href="#quotes"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 bg-primary text-white font-black px-8 py-4 rounded-full shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] overflow-hidden tracking-wider text-sm"
              >
                <span className="relative z-10">{t("hero", "learnMore")}</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: isRTL ? [0, -4, 0] : [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </motion.span>
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                />
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border-2 border-secondary/60 text-secondary font-black px-8 py-4 rounded-full hover:bg-secondary/10 transition-colors text-sm tracking-wider"
              >
                <HeartHandshake className="w-4 h-4" />
                {t("hero", "sponsorChild")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── IMAGE ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className={`relative lg:h-[650px] h-[420px] w-full flex items-center ${isRTL ? "justify-start lg:order-1" : "justify-end"}`}
          >
            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className={`absolute top-1/2 ${isRTL ? "left-[5%]" : "right-[5%]"} -translate-y-1/2 w-[92%] aspect-square rounded-full pointer-events-none`}
              style={{
                border: "1.5px dashed rgba(200,153,42,0.25)",
              }}
            />

            {/* Second slower ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
              className={`absolute top-1/2 ${isRTL ? "left-[10%]" : "right-[10%]"} -translate-y-1/2 w-[78%] aspect-square rounded-full pointer-events-none`}
              style={{
                border: "1px dashed rgba(200,153,42,0.15)",
              }}
            />

            {/* Decorative filled circle behind image */}
            <div
              className={`absolute top-[5%] ${isRTL ? "left-0" : "right-0"} w-[85%] h-[85%] rounded-[40%_60%_60%_40%/40%_40%_60%_60%] pointer-events-none`}
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(200,153,42,0.12) 0%, transparent 70%)" }}
            />

            {/* Gold border frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} w-[80%] h-[88%] border-2 border-secondary/40 rounded-[80px_20px_80px_20px] pointer-events-none z-0`}
            />

            {/* Main image card */}
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-[88%] h-[92%] z-10 overflow-hidden rounded-[60px_16px_60px_16px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]"
            >
              <img
                src="/happy.jpg"
                alt="Children smiling at Ellia Foundation"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Floating stat on image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className={`absolute bottom-6 ${isRTL ? "left-6" : "right-6"} bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">{t("hero", "activeProgram")}</div>
                    <div className="text-sm font-black text-foreground">{t("hero", "sinceEarly2000")}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Logo badge — enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6, type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`absolute ${isRTL ? "-right-4 sm:-right-10" : "-left-4 sm:-left-10"} bottom-16 z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-[0_16px_60px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden`}
              style={{
                background: "radial-gradient(circle at 40% 40%, #fff 60%, #fdf5e0 100%)",
                border: "4px solid #fff",
                outline: "2px solid rgba(200,153,42,0.3)",
                outlineOffset: "3px",
              }}
            >
              <img src="/eliaf.jpg" alt="Ellia Foundation Logo" className="w-[85%] h-[85%] object-contain" />
            </motion.div>

            {/* Floating hearts */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute z-30 text-secondary/60 text-lg select-none pointer-events-none"
                style={{ right: `${18 + i * 8}%`, top: `${8 + i * 5}%` }}
                animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3 + i * 0.8, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
              >
                ♥
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}