import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Route } from "./+types/root";
import "./app.css";
import { type ReactNode } from "react";
import { ErrorBoundaryPage } from "./error-boundary-page";
import { InteractiveBackground } from "./components/interactive-background";
import { I18nProvider, useI18n } from "./i18n";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/jpeg", href: "/me.jpeg" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.json" },
  {
    rel: "alternate",
    type: "application/rss+xml",
    title: "Célio Vieira — Knowledge Hub",
    href: "/rss.xml",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function SkipLink() {
  const { dict } = useI18n();
  return (
    <a href="#main" className="skip-link">
      {dict.ui.skipToMain}
    </a>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#090b10" />
        <meta name="robots" content="index, follow" />
        <Meta />
        <Links />
      </head>
      <body>
        <InteractiveBackground />
        <I18nProvider>
          <SkipLink />
          {/* Lightweight top indicator — never unmounts the current page. */}
          {isNavigating && <div className="nav-loading-bar" aria-hidden="true" />}
          {children}
        </I18nProvider>
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryPage props={props} />;
}
