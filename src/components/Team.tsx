"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Briefcase, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const { dir, t } = useLanguage();
  const isRTL = dir === "rtl";

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const members = [
    {
      name: t("team", "drAhmedName"),
      role: t("team", "drAhmedRole"),
      bio: t("team", "drAhmedBio"),
      image: "/ahmed.jpg",
      icon: Award,
      email: "ahmed@elia-foundation.org",
    },
    {
      name: t("team", "drHogrName"),
      role: t("team", "drHogrRole"),
      bio: t("team", "drHogrBio"),
      image: "/hogr.jpg",
      icon: Briefcase,
      email: "info@elia-foundation.org",
    },
  ];

  return (
    <section
      id="leadership"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(155deg, #FAF8F2 0%, #F5EEDC 50%, #FAF8F2 100%)" }}
      ref={ref}
      dir={dir}
    >
      {/* ── Textured grain overlay ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Decorative vector background shapes */}
      <div className={`absolute top-1/4 ${isRTL ? "left-[-10%]" : "right-[-10%]"} w-[40%] aspect-square rounded-full bg-secondary/5 blur-3xl pointer-events-none`} />
      <div className={`absolute bottom-1/4 ${isRTL ? "right-[-10%]" : "left-[-10%]"} w-[40%] aspect-square rounded-full bg-primary/5 blur-3xl pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-secondary font-bold text-xs tracking-[0.25em] uppercase mb-3 justify-center">
            <span className="w-6 h-px bg-secondary" />
            {t("team", "sectionTitle")}
            <span className="w-6 h-px bg-secondary" />
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-primary leading-tight tracking-tight mt-1 mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {t("team", "sectionTitle")}
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-balance">
            {t("team", "sectionSubtitle")}
          </p>
        </motion.div>

        {/* Members Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto items-stretch">
          {members.map((member, i) => {
            const IconComponent = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.25, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col md:flex-row gap-6 p-6 sm:p-8 rounded-[32px] bg-white border border-secondary/20 shadow-[0_10px_40px_-15px_rgba(200,153,42,0.12)] hover:shadow-[0_20px_50px_-10px_rgba(200,153,42,0.22)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Diagonal background accent */}
                <div
                  className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-24 h-24 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300`}
                  style={{
                    background: "repeating-linear-gradient(-45deg, #c8992a 0px, #c8992a 1px, transparent 1px, transparent 10px)",
                  }}
                />

                {/* Left Profile Image container */}
                <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Border accent */}
                    <div className="absolute inset-0 border-2 border-secondary/25 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Right Details details */}
                <div className="flex flex-col justify-between flex-grow text-center md:text-start">
                  <div>
                    {/* Badge Icon */}
                    <div className={`inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <IconComponent className="w-3.5 h-3.5" />
                      <span className="uppercase tracking-wider">
                        {i === 0 ? "President" : "Director"}
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-black text-foreground mb-1 leading-snug group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm font-bold text-secondary tracking-wide uppercase mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
                      {member.bio}
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-secondary/15 my-4 w-full" />

                  {/* Actions/Contact Row */}
                  <div className={`flex items-center justify-center md:justify-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{member.email}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
