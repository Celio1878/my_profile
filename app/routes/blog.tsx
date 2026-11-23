import {
  ArrowRight,
  BookOpen,
  Calendar,
  Compass,
  Layers,
  Search,
  Sparkles,
  SquareArrowOutUpRight,
  Tag,
} from "lucide-react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { SubstackIcon } from "~/components/brand-icons";
import { Nav } from "~/components/nav";
import { Reveal } from "~/components/reveal";
import { Footer } from "~/components/sections/footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useI18n } from "~/i18n";
import { trackOutbound } from "~/lib/analytics";
import { getAllPosts, getAllTags, type BlogPost } from "~/lib/blog";
import { formatDate } from "~/utils/dates";
import type { Route } from "./+types/blog";

const SITE_URL = "https://celiovieira.com";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Knowledge Hub & Discoveries — Célio Vieira" },
    {
      name: "description",
      content:
        "Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.",
    },
    { property: "og:title", content: "Knowledge Hub & Discoveries — Célio Vieira" },
    {
      property: "og:description",
      content:
        "Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${SITE_URL}/blog` },
    { property: "og:image", content: `${SITE_URL}/og.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Knowledge Hub & Discoveries — Célio Vieira" },
    {
      name: "twitter:description",
      content:
        "Practical engineering blueprints, architectural decisions, and product experiments on AI, Cloud, Lakehouses, and Mobile Systems.",
    },
    { name: "twitter:image", content: `${SITE_URL}/og.png` },
    { tagName: "link", rel: "canonical", href: `${SITE_URL}/blog` },
  ];
}

type SourceFilter = "all" | "native" | "substack";
const SOURCE_FILTERS: SourceFilter[] = ["all", "native", "substack"];

export default function BlogRoute() {
  const { dict, locale } = useI18n();
  const allPosts = useMemo(() => getAllPosts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Filters live in the URL so searches are shareable and back/forward works.
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const selectedTag = searchParams.get("tag");
  const rawSource = searchParams.get("source") ?? "all";
  const sourceFilter: SourceFilter = SOURCE_FILTERS.includes(rawSource as SourceFilter)
    ? (rawSource as SourceFilter)
    : "all";

  const updateParams = (mutate: (params: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    setSearchParams(next, { replace: true });
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of allPosts) {
      for (const tag of post.tags) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }
    return counts;
  }, [allPosts]);

  const nativeCount = useMemo(
    () => allPosts.filter((p) => p.source === "native").length,
    [allPosts],
  );
  const substackCount = useMemo(
    () => allPosts.filter((p) => p.source === "substack").length,
    [allPosts],
  );

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesSource = sourceFilter === "all" || post.source === sourceFilter;
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.headings.some((h) => h.text.toLowerCase().includes(query));
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSource && matchesSearch && matchesTag;
    });
  }, [allPosts, sourceFilter, search, selectedTag]);

  const sourceButtonClass = (active: boolean, activeColor: string) =>
    `flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
      active
        ? `bg-white dark:bg-slate-800 ${activeColor} shadow-xs font-bold`
        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
    }`;

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Nav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 max-w-6xl py-10" id="main">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <BookOpen size={14} aria-hidden="true" />
              <span>{dict.blog.knowledgeHub}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 gradient-text text-balance">
              {dict.blog.title}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 text-pretty">
              {dict.blog.subtitle}
            </p>

            {/* Substack Publication Banner */}
            <div className="p-5 sm:p-6 rounded-2xl border border-primary/25 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left shadow-lg">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <SubstackIcon size={16} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">
                    {dict.blog.substackPublication}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  {dict.blog.substackBanner}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
                  {dict.blog.substackText}
                </p>
              </div>
              <a
                href="https://substack.com/@celio1878"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackOutbound("substack_subscribe", "blog_banner")}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm group"
              >
                <span>{dict.blog.substackCta}</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Source Filter Tabs & Search Controls */}
        <Reveal delay={80}>
          <div className="space-y-5 mb-10 max-w-4xl mx-auto">
            <div
              className="flex items-center justify-center p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-gray-200 dark:border-gray-800 max-w-md mx-auto text-xs font-semibold shadow-inner"
              role="group"
              aria-label={dict.blog.filterAllSources}
            >
              <button
                type="button"
                aria-pressed={sourceFilter === "all"}
                onClick={() => updateParams((p) => p.delete("source"))}
                className={sourceButtonClass(
                  sourceFilter === "all",
                  "text-gray-900 dark:text-white",
                )}
              >
                <Layers size={13} aria-hidden="true" />
                <span>{dict.blog.filterAllSources}</span>
                <span className="font-mono opacity-70">({allPosts.length})</span>
              </button>

              <button
                type="button"
                aria-pressed={sourceFilter === "native"}
                onClick={() => updateParams((p) => p.set("source", "native"))}
                className={sourceButtonClass(sourceFilter === "native", "text-emerald-500")}
              >
                <Sparkles size={13} className="text-emerald-500" aria-hidden="true" />
                <span>{dict.blog.filterBlueprints}</span>
                <span className="font-mono opacity-70">({nativeCount})</span>
              </button>

              <button
                type="button"
                aria-pressed={sourceFilter === "substack"}
                onClick={() => updateParams((p) => p.set("source", "substack"))}
                className={sourceButtonClass(sourceFilter === "substack", "text-amber-500")}
              >
                <span>{dict.blog.filterSubstack}</span>
                <span className="font-mono opacity-70">({substackCount})</span>
              </button>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder={dict.blog.searchPlaceholder.replace(
                  "{count}",
                  String(allPosts.length),
                )}
                value={search}
                onChange={(e) =>
                  updateParams((p) => {
                    if (e.target.value) p.set("q", e.target.value);
                    else p.delete("q");
                  })
                }
                aria-label={dict.blog.searchPlaceholder.replace("{count}", String(allPosts.length))}
                className="w-full pl-10 pr-16 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all shadow-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => updateParams((p) => p.delete("q"))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 px-2 py-1 rounded bg-gray-100 dark:bg-slate-800"
                >
                  {dict.blog.clearSearch}
                </button>
              )}
            </div>

            {/* Topic Tag Pills with Counts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                aria-pressed={selectedTag === null}
                onClick={() => updateParams((p) => p.delete("tag"))}
                className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border flex items-center gap-1.5 ${
                  selectedTag === null
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50"
                }`}
              >
                <span>{dict.blog.filterAll}</span>
                <span className="font-mono opacity-75">({allPosts.length})</span>
              </button>
              {allTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  aria-pressed={selectedTag === tag}
                  onClick={() =>
                    updateParams((p) => {
                      if (tag === selectedTag) p.delete("tag");
                      else p.set("tag", tag);
                    })
                  }
                  className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium border flex items-center gap-1.5 ${
                    selectedTag === tag
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white/50 dark:bg-slate-900/50 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50"
                  }`}
                >
                  <Tag size={10} aria-hidden="true" />
                  <span>{tag}</span>
                  <span className="font-mono opacity-75 text-[10px]">({tagCounts[tag] || 0})</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <Reveal>
            <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {dict.blog.noPostsFound}
              </p>
              <button
                type="button"
                onClick={() => setSearchParams({}, { replace: true })}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                {dict.blog.resetFilters}
              </button>
            </div>
          </Reveal>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post: BlogPost, idx: number) => (
              <Reveal as="li" key={post.slug} delay={Math.min(idx * 30, 300)}>
                <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg relative group">
                  {post.coverImage && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-gray-100 dark:border-gray-800">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3 flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 font-mono">
                      <span className="flex items-center gap-1 shrink-0">
                        <Calendar size={12} aria-hidden="true" />
                        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        {post.source === "native" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded">
                            <Sparkles size={10} aria-hidden="true" />
                            {dict.blog.sourceBlueprint}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded">
                            {dict.blog.sourceSubstack}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`} className="block focus:outline-none">
                      <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-snug text-balance">
                        {post.title}
                      </CardTitle>
                    </Link>

                    <CardDescription className="text-xs line-clamp-2 text-gray-600 dark:text-gray-300 text-pretty">
                      {post.description}
                    </CardDescription>

                    {post.headings.length > 0 && (
                      <div className="pt-1.5 pb-0.5">
                        <div className="p-2 rounded-lg bg-slate-50/80 dark:bg-slate-950/60 border border-gray-100 dark:border-gray-800/80 space-y-1">
                          <div className="flex items-center gap-1 text-[10px] font-mono uppercase font-bold tracking-wider text-muted-foreground">
                            <Compass size={10} aria-hidden="true" />
                            <span>{dict.blog.keySections}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {post.headings.slice(0, 3).map((heading) => (
                              <span
                                key={heading.id}
                                className="text-[10px] font-mono text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gray-200/60 dark:border-gray-800/80 truncate max-w-[210px]"
                                title={heading.text}
                              >
                                § {heading.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0 mt-auto">
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-[10px] font-normal py-0 px-2 bg-slate-100/50 dark:bg-slate-800/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold pt-2.5 border-t border-gray-100/80 dark:border-gray-800/80">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex items-center gap-1 text-primary group-hover:translate-x-1 transition-transform"
                      >
                        <span>{dict.latestInsights.readArticle}</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                      {post.canonicalUrl && (
                        <a
                          href={post.canonicalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackOutbound("substack_article", "blog_card")}
                          className="flex items-center gap-1 font-mono text-[11px] text-amber-500 hover:text-amber-400 transition-colors"
                          title={dict.blog.openOnSubstack}
                        >
                          <span>Substack</span>
                          <SquareArrowOutUpRight size={11} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
