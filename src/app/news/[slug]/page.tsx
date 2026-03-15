import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

// ─── Custom markdown → HTML (handles <u> correctly) ──────────────────────────
function parseMarkdown(md: string): string {
  if (!md) return "";

  let html = md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>')
    // Divider
    .replace(/^---$/gm, '<hr class="md-hr" />')
    // Bold + Italic combined
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="md-bold">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="md-italic">$1</em>')
    // Underline — parse the tag properly
    .replace(/&lt;u&gt;(.+?)&lt;\/u&gt;/g, '<u class="md-underline">$1</u>')
    .replace(/<u>(.+?)<\/u>/g, '<u class="md-underline">$1</u>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="md-li-bullet">$1</li>')
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, '<li class="md-li-ordered">$1</li>')
    // Wrap consecutive <li> in <ul>/<ol>
    .replace(/(<li class="md-li-bullet">[\s\S]*?<\/li>(\n|$))+/g, (match) => `<ul class="md-ul">${match}</ul>`)
    .replace(/(<li class="md-li-ordered">[\s\S]*?<\/li>(\n|$))+/g, (match) => `<ol class="md-ol">${match}</ol>`)
    // Paragraphs: double newline → paragraph break
    .replace(/\n\n+/g, '\n\n')
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      // Don't wrap block elements in <p>
      if (/^<(h[1-6]|ul|ol|blockquote|hr|div)/i.test(trimmed)) return trimmed;
      return `<p class="md-p">${trimmed.replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');

  return html;
}

function readTime(content: string) {
  const words = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !post) notFound();

  const contentHtml = parseMarkdown(post.content || "");
  const mins = readTime(post.content);

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#faf8f2" }}>
      <Header />

      <main className="flex-1 pb-24">

        {/* ── Hero image header ───────────────────────────────────── */}
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(280px, 45vw, 520px)" }}>
          {post.image_url ? (
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ background: "linear-gradient(160deg, #0e1a12 0%, #1a2b20 100%)" }} />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }} />

          {/* Back link */}
          <div className="absolute top-28 left-0 right-0 z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors rounded-full px-4 py-2" style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to News
              </Link>
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 pb-8 pt-16 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full mb-3" style={{ background: "#c8992a", color: "#0e1a12" }}>
                Foundation News
              </span>
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
              >
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* ── Article content ─────────────────────────────────────── */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-6 text-sm"
            style={{ borderBottom: "1px solid rgba(26,43,32,0.12)", color: "rgba(26,43,32,0.5)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white" style={{ background: "#1a2b20" }}>
                {post.author?.[0]?.toUpperCase() || "E"}
              </div>
              <span className="font-semibold" style={{ color: "#1a2b20" }}>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: "#c8992a" }} />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "#c8992a" }} />
              <span>{mins} min read</span>
            </div>
          </div>

          {/* Excerpt / intro — shown if present */}
          {post.excerpt && (
            <div
              className="mb-8 px-5 py-4 rounded-2xl text-sm sm:text-base leading-relaxed font-semibold italic"
              style={{
                background: "rgba(200,153,42,0.07)",
                borderLeft: "4px solid #c8992a",
                color: "rgba(26,43,32,0.75)",
              }}
            >
              {post.excerpt}
            </div>
          )}

          {/* Markdown content */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </main>

      {/* ── Inline styles for markdown classes ────────────────────── */}
      <style>{`
        .post-content { color: rgba(26,43,32,0.78); font-size: 1rem; line-height: 1.8; }
        .post-content .md-p { margin: 0 0 1.2em; }
        .post-content .md-h1 { font-size: 1.75rem; font-weight: 900; margin: 1.6em 0 0.6em; font-family: Georgia, serif; color: #1a2b20; line-height: 1.2; }
        .post-content .md-h2 { font-size: 1.4rem; font-weight: 900; margin: 1.4em 0 0.5em; font-family: Georgia, serif; color: #1a2b20; }
        .post-content .md-h3 { font-size: 1.15rem; font-weight: 800; margin: 1.2em 0 0.4em; font-family: Georgia, serif; color: #1a2b20; }
        .post-content .md-bold { font-weight: 800; color: #1a2b20; }
        .post-content .md-italic { font-style: italic; }
        .post-content .md-underline { text-decoration: underline; text-decoration-color: #c8992a; text-underline-offset: 3px; }
        .post-content .md-quote { border-left: 3px solid #c8992a; padding: 10px 18px; margin: 1.4em 0; background: rgba(200,153,42,0.07); border-radius: 0 10px 10px 0; font-style: italic; color: rgba(26,43,32,0.7); }
        .post-content .md-hr { border: none; border-top: 1px solid rgba(26,43,32,0.12); margin: 2em 0; }
        .post-content .md-ul { list-style: none; padding: 0; margin: 0.8em 0 1.2em; }
        .post-content .md-ol { list-style: decimal; padding-left: 1.4em; margin: 0.8em 0 1.2em; }
        .post-content .md-li-bullet { padding-left: 1.2em; position: relative; margin: 0.35em 0; }
        .post-content .md-li-bullet::before { content: ""; position: absolute; left: 0; top: 0.7em; width: 6px; height: 6px; border-radius: 50%; background: #c8992a; }
        .post-content .md-li-ordered { margin: 0.35em 0; }
        .post-content .md-link { color: #1a6b3c; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .post-content .md-link:hover { color: #c8992a; }
      `}</style>

      <Footer />
    </div>
  );
}