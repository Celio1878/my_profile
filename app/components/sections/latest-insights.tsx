import { useI18n } from "~/i18n";
import { Link } from "react-router";
import { getAllPosts, type BlogPost } from "~/lib/blog";
import { Reveal } from "~/components/reveal";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { useMemo } from "react";

export function LatestInsights() {
  const { dict } = useI18n();
  const recentPosts = useMemo(() => getAllPosts().slice(0, 3), []);

  return (
    <section id="latest-insights" className="py-16 container mx-auto px-4 max-w-5xl">
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <BookOpen size={14} aria-hidden="true" />
              <span>Knowledge Hub</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
              {dict.latestInsights.heading}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
              {dict.latestInsights.subheading}
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline group shrink-0"
          >
            <span>{dict.latestInsights.viewAll}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {recentPosts.map((post: BlogPost, idx: number) => (
          <Reveal key={post.slug} delay={idx * 80 + 100}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
            >
              <Card className="card-hover h-full flex flex-col border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md group-hover:border-primary/40 shadow-sm transition-all">
                <CardHeader className="pb-3 flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} aria-hidden="true" />
                      <span>{post.date}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {post.canonicalUrl && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.2 rounded">
                          Substack
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Clock size={11} aria-hidden="true" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[11px] font-normal py-0 px-2 bg-slate-100/50 dark:bg-slate-800/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    <span>{dict.latestInsights.readArticle}</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
