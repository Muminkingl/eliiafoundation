"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, ArrowRight, Heart, Copy, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function PhoneButton({ phone, isRTL, label }: { phone: string; isRTL: boolean; label: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(phone).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold tracking-widest uppercase text-[#1a2b20]/35 mb-2">
        {label}
      </p>
      <button
        onClick={copy}
        className="group flex items-center gap-3 w-full rounded-2xl px-5 py-4 transition-all duration-300"
        style={{ background: "rgba(26,43,32,0.06)", border: "1px solid rgba(26,43,32,0.1)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#1a6b3c" }}>
          <Phone className="w-4 h-4 text-white" />
        </div>
        <span className={`font-black text-[#1a2b20] tracking-widest text-base flex-1 ${isRTL ? "text-right" : "text-left"}`} dir="ltr">
          {phone}
        </span>
        <motion.div
          animate={{ scale: copied ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          {copied
            ? <Check className="w-4 h-4 text-[#1a6b3c]" />
            : <Copy className="w-4 h-4 text-[#1a2b20]/30 group-hover:text-[#1a2b20]/60 transition-colors" />
          }
        </motion.div>
      </button>
    </div>
  );
}

export default function DonationMethods() {
  const { dir, t } = useLanguage();
  const isRTL = dir === "rtl";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const methods = [
    {
      title: t("donation", "title1"),
      subtitle: t("donation", "subtitle1"),
      description: t("donation", "desc1"),
      phone: "07504477409",
      brandName: "FIB",
      brandColor: "#1a5276",
      accentColor: "#c8992a",
      headerImage: "/first-iraqi-bank.jpg",
      tag: t("donation", "tag1"),
      tagIcon: "🏦",
      cta: t("donation", "cta1"),
    },
    {
      title: t("donation", "title2"),
      subtitle: t("donation", "subtitle2"),
      description: t("donation", "desc2"),
      phone: "07504477409",
      brandName: "FastPay",
      brandColor: "#e91e63",
      accentColor: "#1a6b3c",
      headerImage: "/fastpay.jpg",
      tag: t("donation", "tag2"),
      tagIcon: "📱",
      cta: t("donation", "cta2"),
    },
  ];

  return (
    <section
      id="donate"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f5eed8 0%, #ede4c8 50%, #f2ead4 100%)" }}
      dir={dir}
    >
      {/* ── Grain ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Background arcs ─────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
        <circle cx="100%" cy="0%" r="500" fill="none" stroke="#1a6b3c" strokeWidth="1" />
        <circle cx="0%" cy="100%" r="400" fill="none" stroke="#c8992a" strokeWidth="1" strokeDasharray="5 8" />
      </svg>

      {/* ── Ambient dots ────────────────────────────────────────── */}
      {[
        { x: "8%", y: "15%", s: 7, d: 0, c: "#c8992a" },
        { x: "93%", y: "20%", s: 5, d: 1.5, c: "#1a6b3c" },
        { x: "88%", y: "78%", s: 8, d: 2.2, c: "#c8992a" },
        { x: "4%", y: "80%", s: 6, d: 0.8, c: "#1a6b3c" },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: dot.x, top: dot.y, width: dot.s, height: dot.s, background: dot.c, opacity: 0.35 }}
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4 + dot.d, repeat: Infinity, delay: dot.d, ease: "easeInOut" }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[#1a6b3c] font-bold text-xs tracking-[0.25em] uppercase mb-5">
            <span className="w-8 h-px bg-[#1a6b3c]" />
            {t("donation", "sectionLabel")}
            <span className="w-8 h-px bg-[#1a6b3c]" />
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a2b20] leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {t("donation", "headingPrefix")}{" "}
            <span className="relative inline-block">
              {t("donation", "headingAccent")}
              <motion.svg
                viewBox="0 0 220 16"
                className="absolute -bottom-1 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <motion.path
                  d="M4 10 Q55 2 110 9 Q165 16 216 8"
                  stroke="#c8992a" strokeWidth="2.5" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.7 }}
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#1a2b20]/55 max-w-md mx-auto leading-relaxed">
            {t("donation", "description")}
          </p>
        </motion.div>

        {/* ── Cards grid ──────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {methods.map((method, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              className="relative rounded-3xl overflow-hidden group"
              style={{
                background: "#fff",
                boxShadow: "0 8px 40px -12px rgba(26,43,32,0.18), 0 2px 8px -2px rgba(26,43,32,0.08)",
              }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${method.accentColor}10 0%, transparent 60%)` }}
              />

              {/* ── Image header ──────────────────────────────────── */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={method.headerImage}
                  alt={method.brandName}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "object-top" : ""}`}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

                {/* Tag pill on image */}
                <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-sm"
                    style={{ background: "rgba(0,0,0,0.35)", color: "#fff" }}
                  >
                    <span>{method.tagIcon}</span>
                    {method.tag}
                  </span>
                </div>

                {/* Brand name on image bottom */}
                <div className={`absolute bottom-4 ${isRTL ? "right-5" : "left-5"}`}>
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,0.4)", fontFamily: "'Georgia', serif" }}
                  >
                    {method.brandName}
                  </span>
                </div>
              </div>

              {/* ── Accent divider bar ────────────────────────────── */}
              <div className="h-[3px] w-full" style={{ background: `linear-gradient(${isRTL ? "270deg" : "90deg"}, ${method.accentColor}, transparent)` }} />

              {/* ── Card body ─────────────────────────────────────── */}
              <div className="px-7 pt-6 pb-7">
                <h3
                  className="text-xl font-black text-[#1a2b20] mb-1 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {method.title}
                </h3>
                <h4 className="text-base font-bold mb-4" style={{ color: method.brandColor }}>
                  {method.subtitle}
                </h4>

                <p className="text-sm text-[#1a2b20]/55 leading-relaxed mb-6">
                  {method.description}
                </p>

                {/* Phone — click to copy */}
                <PhoneButton phone={method.phone} isRTL={isRTL} label={t("donation", "contactNumber")} />

                {/* CTA */}
                <motion.a
                  href={`tel:${method.phone}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group/btn w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-black text-sm tracking-wider overflow-hidden"
                  style={{ background: "#1a2b20", color: "#f5edd8" }}
                >
                  <Heart className="w-4 h-4" />
                  <span>{method.cta}</span>
                  <motion.span
                    animate={{ x: isRTL ? [0, -4, 0] : [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                  </motion.span>
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8 }}
                  />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom trust note ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        >
          {[


          ].map(({ icon, text }, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className="text-xs font-semibold text-[#1a2b20]/50">{text}</span>
              </div>
              {i < 2 && <span className="hidden sm:block w-1 h-1 rounded-full bg-[#1a2b20]/20" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}