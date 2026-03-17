"use client";

import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main
      className="flex min-h-screen w-full flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(200,42,42,0.08) 0%, transparent 60%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10"
      >
        <ShieldAlert className="w-20 h-20 mx-auto mb-6 text-red-500/80" />
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tight mb-4"
          style={{ fontFamily: "'Georgia', serif", color: "#f5edd8" }}
        >
          403 Access Denied
        </h1>
        <p className="text-sm max-w-sm mx-auto mb-8 leading-relaxed" style={{ color: "rgba(245,237,216,0.6)" }}>
          You do not have permission to access the admin panel. Only authorized administrators are allowed.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105"
          style={{ background: "#c8992a", color: "#18120a" }}
        >
          Return to Home
        </a>
      </motion.div>
    </main>
  );
}
