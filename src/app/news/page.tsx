"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function readTime(content: string) {
  const words = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
  content: string;
};

export default function NewsPage() {
  const { t, lang, toLocalNum } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("title, slug, excerpt, image_url, created_at, content")
        .order("created_at", { ascending: false });

      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const dateLocale = lang === "ku" ? "ckb" : lang === "ar" ? "ar" : "en-US";

  const [featured, ...rest] = posts;

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#faf8f2" }}>
      <Header />

      {/* ── Hero banner ──────────────────────────────────────────── */}
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
      >
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px" }}
        />
        {/* Arcs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
          <circle cx="0%" cy="50%" r="350" fill="none" stroke="#c8992a" strokeWidth="1" />
          <circle cx="100%" cy="50%" r="400" fill="none" stroke="#c8992a" strokeWidth="0.6" strokeDasharray="5 9" />
        </svg>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(200,153,42,0.08) 0%, transparent 60%)" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 font-bold text-xs tracking-[0.25em] uppercase mb-5" style={{ color: "#c8992a" }}>
            <span className="w-8 h-px" style={{ background: "#c8992a" }} />
            {t("news", "badge")}
            <span className="w-8 h-px" style={{ background: "#c8992a" }} />
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#f5edd8" }}
          >
            {t("news", "title")}
          </h1>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(245,237,216,0.5)" }}>
            {t("news", "subtitle")}
          </p>
        </div>
      </section>

      <main className="flex-1 pb-24 relative z-10 pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Loading state ────────────────────────────────────────── */}
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <div className="w-8 h-8 rounded-full animate-spin border-2 border-muted border-t-primary" />
            </div>
          ) : !posts || posts.length === 0 ? (
            /* ── Empty state ────────────────────────────────────────── */
            <div className="flex min-h-[40vh] items-center justify-center rounded-3xl mt-8" style={{ background: "#fff", border: "1px dashed rgba(26,43,32,0.15)" }}>
              <div className="text-center py-16">
                <Newspaper className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(200,153,42,0.3)" }} />
                <p className="text-lg font-bold text-[#1a2b20]">{t("news", "noPostsTitle")}</p>
                <p className="mt-1 text-sm" style={{ color: "rgba(26,43,32,0.4)" }}>{t("news", "noPostsSubtitle")}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-12">

              {/* ── Featured post (first) ───────────────────────────── */}
              {featured && (
                <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: "#fff", border: "1px solid rgba(26,43,32,0.08)" }}>
                  <Link href={`/news/${featured.slug}`} className="grid lg:grid-cols-2 group">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto overflow-hidden" style={{ background: "#e8e0cc", minHeight: "300px" }}>
                      {featured.image_url ? (
                        <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(145deg,#ede4c8,#d9cfb8)" }}>
                          <Newspaper className="w-12 h-12" style={{ color: "rgba(200,153,42,0.3)" }} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full" style={{ background: "#c8992a", color: "#0e1a12" }}>
                          {t("news", "latest")}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4 text-xs font-medium" style={{ color: "rgba(26,43,32,0.45)" }}>
                        <Calendar className="w-3.5 h-3.5" style={{ color: "#c8992a" }} />
                        <time>{toLocalNum(new Date(featured.created_at).toLocaleDateString(dateLocale, { month: "long", day: "numeric", year: "numeric" }))}</time>
                        <span className="w-1 h-1 rounded-full" style={{ background: "rgba(26,43,32,0.25)" }} />
                        <Clock className="w-3.5 h-3.5" />
                        <span>{toLocalNum(readTime(featured.content))} {t("news", "minRead")}</span>
                      </div>
                      {/* Gold bar */}
                      <div className="w-10 h-[3px] rounded-full mb-4" style={{ background: "#c8992a" }} />
                      <h2 className="text-2xl sm:text-3xl font-black leading-snug mb-3 transition-colors group-hover:text-[#1a6b3c]" style={{ color: "#1a2b20", fontFamily: "'Georgia', serif" }}>
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "rgba(26,43,32,0.55)" }}>
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="mt-auto inline-flex items-center gap-2 font-black text-sm tracking-wide transition-all group-hover:gap-3" style={{ color: "#1a6b3c" }}>
                        {t("news", "readFullStory")}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* ── Rest of the posts ───────────────────────────────── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "#fff",
                        border: "1px solid rgba(26,43,32,0.08)",
                        boxShadow: "0 4px 20px -6px rgba(26,43,32,0.1)",
                      }}
                    >
                      {/* Image */}
                      <Link href={`/news/${post.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: "16/10", background: "#e8e0cc" }}>
                        {post.image_url ? (
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(145deg,#ede4c8,#d9cfb8)" }}>
                            <Newspaper className="w-8 h-8" style={{ color: "rgba(200,153,42,0.3)" }} />
                          </div>
                        )}
                        {/* Gold bar on hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" style={{ background: "#c8992a" }} />
                      </Link>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center gap-2 mb-3 text-[11px] font-medium" style={{ color: "rgba(26,43,32,0.4)" }}>
                          <Calendar className="w-3 h-3" style={{ color: "#c8992a" }} />
                          <time>{toLocalNum(new Date(post.created_at).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric" }))}</time>
                          <span className="w-1 h-1 rounded-full" style={{ background: "rgba(26,43,32,0.2)" }} />
                          <Clock className="w-3 h-3" />
                          <span>{toLocalNum(readTime(post.content))} {t("news", "min")}</span>
                        </div>

                        <h2 className="text-base font-black leading-snug mb-2 line-clamp-2 transition-colors group-hover:text-[#1a6b3c]" style={{ color: "#1a2b20", fontFamily: "'Georgia', serif" }}>
                          <Link href={`/news/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {post.excerpt && (
                          <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "rgba(26,43,32,0.5)" }}>
                            {post.excerpt}
                          </p>
                        )}

                        <div className="mt-auto pt-3" style={{ borderTop: "1px solid rgba(26,43,32,0.07)" }}>
                          <Link href={`/news/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs font-black tracking-wide transition-all group-hover:gap-2.5" style={{ color: "#1a6b3c" }}>
                            {t("news", "readPost")} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}