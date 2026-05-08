import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Route } from "./+types/root";
import "./app.css";
import { type ReactNode } from "react";
import { Loader } from "./components/loader";
import { ErrorBoundaryPage } from "./error-boundary-page";
import { InteractiveBackground } from "./components/interactive-background";
import { I18nProvider } from "./i18n";

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/jpeg", href: "/me.jpeg" },
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

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { location } = useNavigation();
  const isNavigating = Boolean(location);

  return (
    <html lang="en">
      <head>
        <title>Celio Vieira - Profile</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <InteractiveBackground />
        <I18nProvider>{isNavigating ? <Loader /> : children}</I18nProvider>
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
