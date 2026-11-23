import { ArrowLeft, Compass, Home } from "lucide-react";
import { isRouteErrorResponse, Link } from "react-router";
import { Nav } from "~/components/nav";
import { Footer } from "~/components/sections/footer";
import { useI18n } from "~/i18n";
import type { Route } from "./+types/root";

interface ErrorBoundaryPageProps {
  props: Route.ErrorBoundaryProps;
}

export function ErrorBoundaryPage({ props: { error } }: ErrorBoundaryPageProps) {
  const { dict } = useI18n();

  const isNotFound = isRouteErrorResponse(error) && error.status === 404;
  const title = isNotFound
    ? dict.errors.notFoundTitle
    : error instanceof Error
      ? dict.errors.errorTitle
      : dict.errors.unknownError;
  const message = isNotFound
    ? dict.errors.notFoundText
    : error instanceof Error
      ? dict.errors.errorText
      : dict.errors.errorText;

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Nav />
      <main
        id="main"
        className="flex-1 container mx-auto px-4 max-w-3xl py-24 flex flex-col items-center text-center gap-6"
      >
        <p className="font-mono text-7xl font-extrabold text-primary" aria-hidden="true">
          {isRouteErrorResponse(error) ? error.status : "500"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white text-balance">
          {title}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl text-pretty">{message}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home size={15} aria-hidden="true" />
            {dict.errors.backHome}
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
          >
            <Compass size={15} aria-hidden="true" />
            {dict.nav.blog}
          </Link>
        </div>

        {error instanceof Error && import.meta.env.DEV && (
          <div className="mt-8 w-full text-left">
            <p className="text-xs font-mono text-muted-foreground mb-2">{dict.errors.stackTrace}</p>
            <pre className="text-xs w-full overflow-x-auto p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-950 text-gray-600 dark:text-gray-400">
              {error.stack}
            </pre>
          </div>
        )}

        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          {dict.blog.backToBlog}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
