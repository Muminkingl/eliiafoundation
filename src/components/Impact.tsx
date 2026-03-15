"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import { Users, Heart, Globe, FolderCheck } from "lucide-react";

const counters = [
  {
    icon: Users,
    target: 1200,
    suffix: "+",
    label: "Families Helped",
    desc: "Directly supported with food, shelter, and essential care",
    accent: "#c8992a",
  },
  {
    icon: Heart,
    target: 536,
    suffix: "+",
    label: "Orphans Sponsored",
    desc: "Children receiving ongoing monthly support and supervision",
    accent: "#e88c8c",
  },
  {
    icon: Globe,
    target: 4,
    suffix: "",
    label: "Regions Covered",
    desc: "Governorates across the Kurdistan Region of Iraq",
    accent: "#6db87a",
  },
  {
    icon: FolderCheck,
    target: 122,
    suffix: "+",
    label: "Projects Completed",
    desc: "Houses, mosques, water wells and more since the 2000s",
    accent: "#7ab8d4",
  },
];

// Spring-based animated counter
function SpringCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const spring = useSpring(0, { stiffness: 45, damping: 18 });

  useEffect(() => {
    if (inView) spring.set(target);
  }, [inView, target, spring]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="impact"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 60%, #0c1710 100%)" }}
    >
      {/* ── Grain ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Background decorative arcs ───────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
        <circle cx="50%" cy="110%" r="600" fill="none" stroke="#c8992a" strokeWidth="1" />
        <circle cx="50%" cy="110%" r="800" fill="none" stroke="#c8992a" strokeWidth="0.5" strokeDasharray="6 10" />
        <circle cx="-5%" cy="50%" r="350" fill="none" stroke="#4a7c5a" strokeWidth="0.7" />
      </svg>

      {/* ── Radial center glow ───────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(200,153,42,0.07) 0%, transparent 65%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-[#c8992a] font-bold text-xs tracking-[0.25em] uppercase mb-5">
            <span className="w-8 h-px bg-[#c8992a]" />
            Our Impact
            <span className="w-8 h-px bg-[#c8992a]" />
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
          >
            Making a Real
            <br />
            <span className="relative inline-block">
              Difference
              <motion.svg
                viewBox="0 0 280 16"
                className="absolute -bottom-1 left-0 w-full"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.75 }}
              >
                <motion.path
                  d="M4 10 Q70 2 140 9 Q210 16 276 8"
                  stroke="#c8992a"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.75 }}
                />
              </motion.svg>
            </span>
          </h2>
          <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(245,237,216,0.5)" }}>
            Every donation creates a ripple of change across Kurdistan. Here's what we've accomplished together since the early 2000s.
          </p>
        </motion.div>

        {/* ── Counter cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {counters.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="relative group rounded-3xl overflow-hidden cursor-default"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Accent glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.accent}18 0%, transparent 65%)` }}
              />

              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.4, duration: 0.6 }}
              />

              <div className="relative z-10 p-7 lg:p-8 flex flex-col">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}35` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.accent }} strokeWidth={1.8} />
                </div>

                {/* Counter */}
                <div
                  className="text-5xl sm:text-6xl font-black leading-none mb-2 tabular-nums"
                  style={{ color: "#f5edd8", fontFamily: "'Georgia', serif" }}
                >
                  <SpringCounter target={item.target} suffix={item.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <div className="font-bold text-sm tracking-wide mb-3" style={{ color: item.accent }}>
                  {item.label}
                </div>

                {/* Divider */}
                <div className="w-8 h-px mb-3" style={{ background: `${item.accent}40` }} />

                {/* Description */}
                <p className="text-xs leading-relaxed" style={{ color: "rgba(245,237,216,0.4)" }}>
                  {item.desc}
                </p>
              </div>

              {/* Corner watermark number */}
              <div
                className="absolute bottom-4 right-5 text-7xl font-black leading-none select-none pointer-events-none opacity-[0.04]"
                style={{ fontFamily: "'Georgia', serif", color: item.accent }}
              >
                {String(i + 1)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom strip ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl"
          style={{
            background: "rgba(200,153,42,0.06)",
            border: "1px solid rgba(200,153,42,0.15)",
          }}
        >
          <p className="text-sm font-medium text-center sm:text-left" style={{ color: "rgba(245,237,216,0.5)" }}>
            All numbers verified and updated regularly. Registered with the Office of NGOs.
          </p>
          <motion.a
            href="#sponsor"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 inline-flex items-center gap-2 font-black text-xs tracking-widest uppercase px-6 py-3 rounded-full"
            style={{ background: "#c8992a", color: "#0e1a12" }}
          >
            <Heart className="w-3.5 h-3.5" />
            Join the Impact
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}