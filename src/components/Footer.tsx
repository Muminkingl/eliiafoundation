"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  ArrowUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// YouTube SVG icon (lucide doesn't have it)
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// TikTok SVG icon
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const { dir, t } = useLanguage();
  const isRTL = dir === "rtl";

  const quickLinks = [
    { label: t("footer", "linkHome"), href: "#" },
    { label: t("footer", "linkQuotes"), href: "#quotes" },
    { label: t("footer", "linkGallery"), href: "#gallery" },
    { label: t("footer", "linkFaq"), href: "#faq" },
    { label: t("footer", "linkDonate"), href: "#donate" },
    { label: t("footer", "linkContact"), href: "/contact" },
    { label: t("footer", "linkNews"), href: "/news" },
  ];

  const programs = [
    t("footer", "prog1"),
    t("footer", "prog2"),
    t("footer", "prog3"),
    t("footer", "prog4"),
  ];

  return (
    <footer id="contact" className="bg-primary-dark text-white/80" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-white shrink-0">
                <img src="/eliaf.jpg" alt="Ellia Foundation Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white">
                {t("footer", "brandName")}
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {t("footer", "brandDesc")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100080475720956"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/elia.foundation/"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCdIyOhswABxSkhtQZC62s5Q"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@eliafoundation"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="TikTok"
              >
                <TiktokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t("footer", "quickLinksTitle")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t("footer", "programsTitle")}
            </h3>
            <ul className="space-y-3">
              {programs.map((program, i) => (
                <li key={i}>
                  <a
                    href="#gallery"
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t("footer", "contactTitle")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <a href="https://maps.app.goo.gl/7FJXtf7g8oDHj5aA6" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                  {t("footer", "address")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <a href={`mailto:${t("footer", "email")}`} className="text-sm text-white/60 hover:text-white transition-colors" dir="ltr">
                  {t("footer", "email")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                <a href={`tel:${t("footer", "phone")}`} className="text-sm text-white/60 hover:text-white transition-colors" dir="ltr">
                  {t("footer", "phone")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center">
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} {t("footer", "copyright")}
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <a
        href="#"
        className={`fixed bottom-6 ${isRTL ? "left-6" : "right-6"} w-11 h-11 rounded-full bg-primary shadow-lg flex items-center justify-center hover:bg-primary-light transition-all z-40`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </a>
    </footer>
  );
}
