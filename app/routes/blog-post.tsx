import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Compass,
  Copy,
  FileText,
  Share2,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, data, useLoaderData } from "react-router";
import { LinkedInIcon, SubstackIcon, XIcon } from "~/components/brand-icons";
import { MarkdownRenderer } from "~/components/markdown-renderer";
import { Nav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { Footer } from "~/components/sections/footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n";
import { trackOutbound } from "~/lib/analytics";
import { getAllPosts, getPostBySlug, loadPostHtml } from "~/lib/blog";
import { copyText } from "~/lib/clipboard";
import { formatDate, formatNumber } from "~/utils/dates";
import type { Route } from "./+types/blog-post";

const SITE_URL = "https://celiovieira.com";

export async function loader({ params }: Route.LoaderArgs) {
  const post = params.slug ? getPostBySlug(params.slug) : undefined;
  if (!post) {
    throw data("Article not found", { status: 404 });
  }
  const html = await loadPostHtml(post.slug);
  if (!html) {
    throw data("Article content unavailable", { status: 404 });
  }
  return { post, html };
}

export function meta({ params }: Route.MetaArgs) {
  const post = params.slug ? getPostBySlug(params.slug) : undefined;
  if (!post) {
    return [{ title: "Article Not Found — Célio Vieira" }];
  }

  return [
    { title: `${post.title} — Célio Vieira` },
    { name: "description", content: post.description },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: post.date },
    { property: "article:author", content: post.author },
    { property: "og:url", content: `${SITE_URL}/blog/${post.slug}` },
    { property: "og:image", content: `${SITE_URL}/og.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description },
    { name: "twitter:image", content: `${SITE_URL}/og.png` },
    {
      tagName: "link",
      rel: "canonical",
      href: post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`,
    },
  ];
}

export default function BlogPostRoute() {
  const { post, html } = useLoaderData<typeof loader>();
  const { dict, locale } = useI18n();
  const allPosts = useMemo(() => getAllPosts(), []);

  // Related posts scored by overlapping tags (must share at least one tag).
  const relatedPosts = useMemo(() => {
    const currentTags = new Set(post.tags);
    return allPosts
      .filter((p) => p.slug !== post.slug)
      .map((p) => ({
        post: p,
        sharedCount: p.tags.filter((t) => currentTags.has(t)).length,
      }))
      .filter((item) => item.sharedCount > 0)
      .sort((a, b) => b.sharedCount - a.sharedCount)
      .slice(0, 2)
      .map((item) => item.post);
  }, [allPosts, post]);

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const copyTimer = useRef<number | null>(null);

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareTitle = post.title;

  // rAF-throttled reading progress (also correct on load/resize).
  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const value = total <= 0 ? 0 : Math.min(100, Math.max(0, (window.scrollY / total) * 100));
      setScrollProgress(value);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    queueMicrotask(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [html]);

  // TOC scroll spy — highlights the section currently in view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const article = document.getElementById("article-content");
    if (!article) return;
    const headings = Array.from(article.querySelectorAll<HTMLElement>("h2[id], h3[id]"));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [html]);

  // Native Web Share availability is client-only (avoids hydration mismatch).
  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      queueMicrotask(() => setCanNativeShare(true));
    }
  }, []);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const handleCopyLink = () => {
    void copyText(shareUrl).then((ok) => {
      if (!ok) return;
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {
        /* user cancelled */
      });
    }
  };

  const articleJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.lang,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${SITE_URL}/about`,
    },
    image: `${SITE_URL}/og.png`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.canonicalUrl ? { isBasedOn: post.canonicalUrl } : {}),
  });

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd }} />
      <Nav />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={dict.blog.readingProgress}
      >
        <div
          className="h-full bg-primary transition-all duration-75 ease-out shadow-xs shadow-primary/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-4xl py-10" id="main">
        {/* Breadcrumb & Share */}
        <Reveal>
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>{dict.blog.backToBlog}</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:border-primary/50 transition-colors"
                title={dict.blog.copyLink}
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" aria-hidden="true" />
                    <span className="text-emerald-500">{dict.ui.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} aria-hidden="true" />
                    <span>{dict.blog.copyLink}</span>
                  </>
                )}
              </button>

              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:border-primary/50 transition-colors"
                  title={dict.blog.shareArticle}
                  aria-label={dict.blog.shareArticle}
                >
                  <Share2 size={13} aria-hidden="true" />
                </button>
              )}

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("share_x", "blog_post")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:text-primary hover:border-primary/50 transition-colors"
                title={dict.blog.shareOnX}
              >
                <XIcon size={12} />
                <span>{dict.blog.share}</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("share_linkedin", "blog_post")}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 hover:text-sky-500 hover:border-sky-500/50 transition-colors"
                title={dict.blog.shareOnLinkedIn}
                aria-label={dict.blog.shareOnLinkedIn}
              >
                <LinkedInIcon size={12} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Article Header */}
        <Reveal delay={60}>
          <header className="mb-10 pb-8 border-b border-gray-200/80 dark:border-gray-800/80">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.source === "native" ? (
                <Badge className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/25 flex items-center gap-1 font-mono font-bold">
                  <Sparkles size={11} aria-hidden="true" />
                  <span>{dict.blog.blueprintBadge}</span>
                </Badge>
              ) : (
                <Badge className="text-xs bg-amber-500/10 text-amber-500 border-amber-500/25 flex items-center gap-1 font-mono font-bold">
                  <FileText size={11} aria-hidden="true" />
                  <span>{dict.blog.substackBadge}</span>
                </Badge>
              )}

              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-primary/5 text-primary border-primary/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight text-balance">
              {post.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-pretty">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <BookOpen size={15} className="text-primary" aria-hidden="true" />
                <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar size={15} aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              </span>
              <span aria-hidden="true">•</span>
              <span className="text-gray-400 dark:text-gray-500">
                {formatNumber(post.wordCount, locale)} {dict.blog.words}
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5 text-primary font-medium">
                <Clock size={15} aria-hidden="true" />
                <span>
                  {post.readTimeMinutes} {dict.blog.readTime}
                </span>
              </span>
            </div>

            {post.canonicalUrl && (
              <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <SubstackIcon size={16} className="text-amber-500 shrink-0" />
                  <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                    {dict.blog.originallyPublished}
                  </span>
                </div>
                <a
                  href={post.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutbound("substack_article", "blog_post_banner")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors shrink-0"
                >
                  <span>{dict.blog.readOnSubstack}</span>
                  <SquareArrowOutUpRight size={12} aria-hidden="true" />
                </a>
              </div>
            )}
          </header>
        </Reveal>

        {/* Interactive Table of Contents with scroll spy */}
        {post.headings.length > 1 && (
          <Reveal delay={80}>
            <div className="mb-10 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xs">
              <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-wider font-bold text-muted-foreground">
                <Compass size={14} className="text-primary" aria-hidden="true" />
                <span>{dict.blog.tableOfContents}</span>
              </div>
              <nav aria-label={dict.blog.tableOfContents}>
                <ul className="space-y-1.5 text-xs sm:text-sm font-medium">
                  {post.headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? "pl-4" : "pl-0"}>
                      <a
                        href={`#${heading.id}`}
                        onClick={() => setActiveHeadingId(heading.id)}
                        aria-current={activeHeadingId === heading.id ? "location" : undefined}
                        className={`transition-colors flex items-center gap-1.5 py-0.5 group ${
                          activeHeadingId === heading.id
                            ? "text-primary font-semibold"
                            : "text-gray-600 dark:text-gray-300 hover:text-primary"
                        }`}
                      >
                        <span
                          className={`font-mono text-[10px] ${
                            activeHeadingId === heading.id
                              ? "text-primary"
                              : "text-gray-400 dark:text-gray-600 group-hover:text-primary"
                          }`}
                          aria-hidden="true"
                        >
                          {heading.level === 3 ? "↳" : "§"}
                        </span>
                        <span className="group-hover:underline text-pretty">{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <Reveal delay={100}>
            <div className="mb-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full max-h-96 object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Article Content (pre-rendered & sanitized at build time) */}
        <Reveal delay={120}>
          <article id="article-content" className="prose prose-slate dark:prose-invert max-w-none">
            <MarkdownRenderer html={html} />
          </article>
        </Reveal>

        {/* Author Bio Box */}
        <Reveal delay={140}>
          <div className="mt-14 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row items-center gap-5">
            <img
              src="/me.jpeg"
              alt="Célio Vieira"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/50 shadow-sm shrink-0"
            />
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Célio Vieira</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium font-mono">
                  {dict.blog.authorRole}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed text-pretty">
                {dict.blog.authorBio}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://substack.com/@celio1878"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("substack_profile", "blog_post_author")}
                className="px-3.5 py-2 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors shadow-xs"
              >
                Substack
              </a>
              <Link
                to="/about"
                className="px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                {dict.blog.aboutLink}
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200/80 dark:border-gray-800/80">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dict.blog.relatedTitle}
              </h2>
              <Link
                to="/blog"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>{dict.blog.viewAllCount.replace("{count}", String(allPosts.length))}</span>
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}`}
                  className="group block focus:outline-none focus:ring-2 focus:ring-primary rounded-xl"
                >
                  <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 transition-all p-5">
                    <CardHeader className="p-0 pb-2 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span className="text-[10px]">{formatDate(related.date, locale)}</span>
                        <span className="text-primary font-medium text-[10px]">
                          {related.readTimeMinutes} {dict.blog.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2 text-balance">
                        {related.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2 text-gray-600 dark:text-gray-300 text-pretty">
                        {related.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 mt-auto flex items-center justify-between text-xs font-semibold text-primary">
                      <div className="flex gap-1">
                        {related.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] py-0 px-1.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {dict.blog.read} <ArrowRight size={11} aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
