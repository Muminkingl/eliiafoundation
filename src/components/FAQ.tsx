"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, HelpCircle, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { dir, t, toLocalNum } = useLanguage();
  const isRTL = dir === "rtl";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<number | null>(1);

  // Build FAQ data from translations
  const faqs = [
    { id: 1, question: t("faq", "q1"), answer: t("faq", "a1"), tag: t("faq", "tag1") },
    { id: 2, question: t("faq", "q2"), answer: t("faq", "a2"), tag: t("faq", "tag2") },
    { id: 3, question: t("faq", "q3"), answer: t("faq", "a3"), tag: t("faq", "tag3") },
    { id: 4, question: t("faq", "q4"), answer: t("faq", "a4"), tag: t("faq", "tag4") },
  ];

  const quickStats = [
    { value: t("faq", "statVal1"), label: t("faq", "statLabel1") },
    { value: t("faq", "statVal2"), label: t("faq", "statLabel2") },
    { value: t("faq", "statVal3"), label: t("faq", "statLabel3") },
    { value: t("faq", "statVal4"), label: t("faq", "statLabel4") },
  ];

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 50%, #0c1710 100%)" }}
      dir={dir}
    >
      {/* ── Grain texture ──────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Radial glow ────────────────────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", left: "-10%", width: "55%", height: "80%",
          background: "radial-gradient(ellipse at 30% 50%, rgba(200,153,42,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0, right: 0, width: "45%", height: "60%",
          background: "radial-gradient(ellipse at 70% 80%, rgba(200,153,42,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Decorative arc lines ───────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
        <circle cx="100%" cy="0%" r="500" fill="none" stroke="#c8992a" strokeWidth="1" />
        <circle cx="100%" cy="0%" r="700" fill="none" stroke="#c8992a" strokeWidth="0.5" />
        <circle cx="0%" cy="100%" r="400" fill="none" stroke="#c8992a" strokeWidth="1" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[#c8992a] font-bold text-xs tracking-[0.25em] uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              {t("faq", "sectionLabel")}
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.0] tracking-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
            >
              {t("faq", "headingLine1")}
              <br />
              <span className="relative inline-block">
                {t("faq", "headingAccent")}
                {/* Underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className={`absolute -bottom-1 left-0 w-full h-[3px] ${isRTL ? "origin-right" : "origin-left"} rounded-full`}
                  style={{ background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, #c8992a, rgba(200,153,42,0.2))` }}
                />
              </span>
            </h2>
          </div>

          <p className={`text-base leading-relaxed max-w-sm ${isRTL ? "lg:text-left" : "lg:text-right"}`} style={{ color: "rgba(245,237,216,0.45)" }}>
            {t("faq", "headerNote")}
          </p>
        </motion.div>

        {/* ── Main layout ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ── FAQ list ─────────────────────────────────────────────── */}
          <div className={`w-full lg:w-3/5 space-y-3 ${isRTL ? "lg:order-2" : ""}`}>
            {faqs.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                >
                  <motion.div
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="relative cursor-pointer rounded-2xl overflow-hidden group"
                    animate={{
                      background: isOpen
                        ? "linear-gradient(135deg, rgba(200,153,42,0.12) 0%, rgba(200,153,42,0.05) 100%)"
                        : "rgba(255,255,255,0.05)",
                      borderColor: isOpen ? "rgba(200,153,42,0.4)" : "rgba(255,255,255,0.07)",
                    }}
                    style={{ border: "1px solid" }}
                    whileHover={{
                      background: isOpen
                        ? "linear-gradient(135deg, rgba(200,153,42,0.14) 0%, rgba(200,153,42,0.06) 100%)"
                        : "rgba(255,255,255,0.06)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Side glow bar */}
                    <motion.div
                      className={`absolute ${isRTL ? "right-0 rounded-r-2xl" : "left-0 rounded-l-2xl"} top-0 bottom-0 w-[3px]`}
                      animate={{
                        background: isOpen
                          ? "linear-gradient(180deg, #c8992a, rgba(200,153,42,0.3))"
                          : "rgba(100,160,120,0.15)",
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Question row */}
                    <div className="flex items-start gap-5 px-6 pt-6 pb-5">
                      {/* Number */}
                      <motion.span
                        className="shrink-0 font-black text-3xl leading-none select-none mt-0.5"
                        animate={{ color: isOpen ? "#c8992a" : "rgba(255,255,255,0.15)" }}
                        transition={{ duration: 0.3 }}
                        style={{ fontFamily: "'Georgia', serif", minWidth: "2rem" }}
                      >
                        {toLocalNum(String(i + 1).padStart(2, "0"))}
                      </motion.span>

                      <div className="flex-1 min-w-0">
                        {/* Tag pill */}
                        <motion.span
                          className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2"
                          animate={{
                            background: isOpen ? "rgba(200,153,42,0.2)" : "rgba(255,255,255,0.06)",
                            color: isOpen ? "#c8992a" : "rgba(255,255,255,0.3)",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.tag}
                        </motion.span>

                        <motion.h3
                          className="font-bold text-base sm:text-lg leading-snug"
                          animate={{ color: isOpen ? "#f5edd8" : "rgba(245,237,216,0.5)" }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.question}
                        </motion.h3>
                      </div>

                      {/* Chevron */}
                      <motion.div
                        className="shrink-0 mt-1"
                        animate={{ rotate: isOpen ? (isRTL ? -90 : 90) : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      >
                        <ChevronRight
                          className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                          style={{ color: isOpen ? "#c8992a" : "rgba(255,255,255,0.2)" }}
                        />
                      </motion.div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                            className={`px-6 pb-6 ${isRTL ? "mr-[3.75rem]" : "ml-[3.75rem]"} text-sm sm:text-base leading-relaxed`}
                            style={{ color: "rgba(245,237,216,0.45)" }}
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right panel ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className={`w-full lg:w-2/5 lg:sticky lg:top-32 space-y-5 ${isRTL ? "lg:order-1" : ""}`}
          >
            {/* Decorative card */}
            <div
              className="relative rounded-3xl overflow-hidden p-8"
              style={{
                background: "linear-gradient(145deg, rgba(200,153,42,0.14) 0%, rgba(200,153,42,0.04) 100%)",
                border: "1px solid rgba(200,153,42,0.25)",
              }}
            >
              {/* Corner decoration */}
              <div
                className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-40 h-40 pointer-events-none opacity-20`}
                style={{
                  background: `radial-gradient(circle at ${isRTL ? "top left" : "top right"}, #c8992a, transparent 70%)`,
                }}
              />
              <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} opacity-10`}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <circle cx="40" cy="40" r="38" stroke="#c8992a" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="40" cy="40" r="28" stroke="#c8992a" strokeWidth="0.5" />
                  <text x="40" y="46" textAnchor="middle" fill="#c8992a" fontSize="20" fontFamily="serif">?</text>
                </svg>
              </div>

              <MessageCircle className="w-8 h-8 mb-4" style={{ color: "#c8992a" }} />
              <h3 className="font-black text-xl mb-2" style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}>
                {t("faq", "stillHaveQuestions")}
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(245,237,216,0.45)" }}>
                {t("faq", "panelDescription")}
              </p>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 font-black text-sm tracking-wider px-6 py-3.5 rounded-full overflow-hidden"
                style={{ background: "#c8992a", color: "#18120a" }}
              >
                <span className="relative z-10">{t("faq", "askQuestion")}</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: isRTL ? [0, -4, 0] : [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </motion.span>
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.8 }}
                />
              </motion.a>
            </div>

            {/* Quick stats strip */}
            <div className="grid grid-cols-2 gap-3">
              {quickStats.map(({ value, label }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="text-2xl font-black mb-0.5"
                    style={{ color: "#c8992a", fontFamily: "'Georgia', serif" }}
                  >
                    {value}
                  </div>
                  <div className="text-[11px] font-medium tracking-wide" style={{ color: "rgba(245,237,216,0.4)" }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}