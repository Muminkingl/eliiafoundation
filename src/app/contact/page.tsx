"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// ── Floating dot ──────────────────────────────────────────────────────────
const Dot = ({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0.3 }}
    animate={{ y: [0, -14, 0], opacity: [0.2, 0.5, 0.2] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

// ── Animated input wrapper ────────────────────────────────────────────────
function Field({
  type = "text",
  placeholder,
  rows,
  isRTL,
}: {
  type?: string;
  placeholder: string;
  rows?: number;
  isRTL?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const sharedClass =
    "w-full bg-[#faf8f2] text-[#1a2b20] placeholder-[#1a2b20]/50 font-medium text-sm outline-none resize-none transition-all duration-300";
  const style: React.CSSProperties = {
    border: `1.5px solid ${focused ? "#c8992a" : filled ? "rgba(26,43,32,0.2)" : "rgba(26,43,32,0.1)"}`,
    boxShadow: focused ? "0 0 0 4px rgba(200,153,42,0.08)" : "none",
    borderRadius: "16px",
    padding: "14px 18px",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const props = {
    placeholder,
    className: sharedClass,
    style,
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setFilled(e.target.value.length > 0);
    },
    dir: isRTL ? "rtl" : undefined,
  };

  return rows ? (
    <textarea rows={rows} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
  ) : (
    <input type={type} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
  );
}

export default function ContactPage() {
  const { dir, t } = useLanguage();
  const isRTL = dir === "rtl";
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const mapInView = useInView(mapRef, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);

  const contactCards = [
    { icon: MapPin, title: t("contact", "addressTitle"), value: t("contact", "addressValue"), color: "#1a6b3c", bg: "#1a6b3c", emoji: "📍" },
    { icon: Mail, title: t("contact", "emailTitle"), value: t("contact", "emailValue"), color: "#c8992a", bg: "#c8992a", forceDir: "ltr" as const, emoji: "✉️" },
    { icon: Phone, title: t("contact", "phoneTitle"), value: t("contact", "phoneValue"), color: "#1a5276", bg: "#1a5276", forceDir: "ltr" as const, emoji: "📞" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <Header />
      <div className="h-[110px]" />

      <main dir={dir}>

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative py-24 lg:py-36 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
        >
          {/* Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px" }}
          />

          {/* Decorative arcs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
            <circle cx="15%" cy="50%" r="350" fill="none" stroke="#c8992a" strokeWidth="1" />
            <circle cx="85%" cy="50%" r="280" fill="none" stroke="#c8992a" strokeWidth="0.6" strokeDasharray="5 9" />
            <circle cx="50%" cy="110%" r="500" fill="none" stroke="#4a7c5a" strokeWidth="0.8" />
          </svg>

          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(200,153,42,0.09) 0%, transparent 60%)" }}
          />

          {/* Ambient dots */}
          <Dot x="8%" y="20%" size={7} delay={0} color="#c8992a" />
          <Dot x="90%" y="15%" size={5} delay={1.4} color="#4a7c5a" />
          <Dot x="85%" y="75%" size={8} delay={2.5} color="#c8992a" />
          <Dot x="5%" y="75%" size={6} delay={0.9} color="#4a7c5a" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[#c8992a] font-bold text-xs tracking-[0.25em] uppercase mb-6">
                <span className="w-8 h-px bg-[#c8992a]" />
                {t("contact", "sectionLabel")}
                <span className="w-8 h-px bg-[#c8992a]" />
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-5"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
            >
              {t("contact", "heading")}
              <br />
              <span className="relative inline-block">
                <span style={{ color: "#c8992a" }}>{t("contact", "headingAccent")}</span>
                <motion.svg
                  viewBox="0 0 80 14"
                  className="absolute -bottom-1 left-0 w-full"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={heroInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.85, duration: 0.65 }}
                >
                  <motion.path
                    d="M2 9 Q20 2 40 8 Q60 14 78 7"
                    stroke="#c8992a" strokeWidth="2.5" fill="none" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={heroInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.85, duration: 0.65 }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(245,237,216,0.5)" }}
            >
              {t("contact", "subheading")}
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: "1.5px solid rgba(200,153,42,0.35)" }}
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-90" style={{ color: "#c8992a" }} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FORM + INFO
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={formRef}
          className="relative py-24 lg:py-32 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #f5eed8 0%, #ede4c8 55%, #f2ead4 100%)" }}
        >
          {/* Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px" }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" preserveAspectRatio="xMidYMid slice">
            <circle cx="0%" cy="100%" r="400" fill="none" stroke="#c8992a" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="100%" cy="0%" r="350" fill="none" stroke="#1a6b3c" strokeWidth="0.8" />
          </svg>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* ── Contact info cards ───────────────────────────────── */}
            <div className="grid sm:grid-cols-3 gap-4 mb-14">
              {contactCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, boxShadow: `0 16px 40px -12px ${card.color}30` }}
                  className="relative rounded-2xl p-6 text-center group overflow-hidden cursor-default"
                  style={{ background: "#fff", border: "1px solid rgba(26,43,32,0.08)", boxShadow: "0 4px 20px -6px rgba(26,43,32,0.1)", transition: "box-shadow 0.3s" }}
                >
                  {/* Animated top bar */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left"
                    style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                    initial={{ scaleX: 0 }}
                    animate={formInView ? { scaleX: 1 } : {}}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                  />
                  {/* Corner glow on hover */}
                  <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at top right, ${card.color}15, transparent 70%)` }}
                  />

                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${card.color}12`, border: `1px solid ${card.color}25` }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: card.color }} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-black text-xs text-[#1a2b20] mb-1.5 uppercase tracking-[0.15em]">{card.title}</h3>
                  <p className="text-sm font-medium text-[#1a2b20]/70 leading-relaxed" dir={card.forceDir}>{card.value}</p>
                </motion.div>
              ))}
            </div>

            {/* ── Main form card ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden"
              style={{ background: "#fff", boxShadow: "0 12px 60px -16px rgba(26,43,32,0.18)", border: "1px solid rgba(26,43,32,0.08)" }}
            >
              {/* Decorative top gold bar */}
              <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #1a6b3c, #c8992a, #1a5276)" }} />

              {/* Corner radial */}
              <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-72 h-72 pointer-events-none opacity-[0.035]`}
                style={{ background: `radial-gradient(circle at ${isRTL ? "top left" : "top right"}, #c8992a, transparent 65%)` }}
              />

              <div className="p-8 sm:p-10 lg:p-14 relative z-10">

                {/* Form header */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(200,153,42,0.12)", border: "1px solid rgba(200,153,42,0.25)" }}>
                    <MessageSquare className="w-5 h-5" style={{ color: "#c8992a" }} />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-[#1a2b20] leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                      {t("contact", "formTitle") || "Send us a Message"}
                    </h2>
                    <p className="text-xs text-[#1a2b20]/60 mt-0.5">{t("contact", "formSubtitle")}</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      >
                        <CheckCircle className="w-16 h-16 mb-5" style={{ color: "#1a6b3c" }} />
                      </motion.div>
                      <h3 className="text-2xl font-black text-[#1a2b20] mb-2" style={{ fontFamily: "'Georgia', serif" }}>{t("contact", "successTitle")}</h3>
                      <p className="text-sm text-[#1a2b20]/60 max-w-xs">{t("contact", "successDesc")}</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      {/* Row 1 */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field placeholder={t("contact", "name") || "Your Name"} isRTL={isRTL} />
                        <Field type="email" placeholder={t("contact", "email") || "Email Address"} />
                      </div>
                      {/* Row 2 */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field type="tel" placeholder={t("contact", "phone") || "Phone Number"} />
                        <Field placeholder={t("contact", "subject") || "Subject"} isRTL={isRTL} />
                      </div>
                      {/* Message */}
                      <Field placeholder={t("contact", "message") || "Your message..."} rows={5} isRTL={isRTL} />

                      {/* Submit */}
                      <div className="flex justify-center pt-3">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative inline-flex items-center gap-3 font-black text-sm tracking-widest px-10 py-4 rounded-full overflow-hidden"
                          style={{ background: "#c8992a", color: "#18120a" }}
                        >
                          <span className="relative z-10">{t("contact", "send") || "Send Message"}</span>
                          <motion.span
                            className="relative z-10"
                            animate={{ x: isRTL ? [0, -4, 0] : [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                          </motion.span>
                          {/* Shimmer */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8 }}
                          />
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            MAP SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          ref={mapRef}
          className="relative py-24 lg:py-32 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
        >
          {/* Grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px" }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(200,153,42,0.06) 0%, transparent 60%)" }} />

          <Dot x="6%" y="25%" size={6} delay={0} color="#c8992a" />
          <Dot x="92%" y="60%" size={8} delay={1.8} color="#4a7c5a" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Map header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 text-[#c8992a] font-bold text-xs tracking-[0.25em] uppercase mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {t("contact", "mapHeading")}
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
              >
                {t("contact", "mapSubheading")}
              </h2>
            </motion.div>

            {/* Map + side info layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

              {/* Side address card */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={mapInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:w-64 shrink-0 rounded-3xl p-7 flex flex-col gap-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,153,42,0.2)" }}
              >
                {[
                  { icon: MapPin, label: t("contact", "addressTitle"), value: t("contact", "addressValue"), color: "#1a6b3c", forceDir: undefined },
                  { icon: Phone, label: t("contact", "phoneTitle"), value: t("contact", "phoneValue"), color: "#c8992a", forceDir: "ltr" as const },
                  { icon: Mail, label: t("contact", "emailTitle"), value: t("contact", "emailValue"), color: "#1a5276", forceDir: undefined },
                  { icon: Phone, label: t("contact", "fibTitle"), value: t("contact", "fibValue"), color: "#6366f1", forceDir: "ltr" as const },
                  { icon: Phone, label: t("contact", "fastpayTitle"), value: t("contact", "fastpayValue"), color: "#e30b5d", forceDir: "ltr" as const },
                ].map(({ icon: Icon, label, value, color, forceDir }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}35` }}>
                      <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-0.5" style={{ color: "rgba(200,153,42,0.6)" }}>{label}</p>
                      <p className="text-xs font-medium leading-snug" style={{ color: "rgba(245,237,216,0.65)" }} dir={forceDir}>{value}</p>
                    </div>
                  </div>
                ))}

                {/* Decorative quote */}
                <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(200,153,42,0.12)" }}>
                  <p className="text-xs italic leading-relaxed" style={{ color: "rgba(245,237,216,0.3)", fontFamily: "'Georgia', serif" }}>
                    "Serving Kurdistan since the early 2000s"
                  </p>
                </div>
              </motion.div>

              {/* Map embed */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={mapInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 relative rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 12px 50px -16px rgba(0,0,0,0.45)", border: "1.5px solid rgba(200,153,42,0.25)", minHeight: "420px" }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: "linear-gradient(90deg, transparent, #c8992a, transparent)" }} />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3221.7259169623046!2d43.987508!3d36.180486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sIQ!4v1710500000000!5m2!1sen!2sIQ"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: "420px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ellia Foundation Location"
                  className="grayscale-[25%] contrast-[1.05]"
                />
              </motion.div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}