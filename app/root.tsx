import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Route } from "./+types/root";
import "./app.css";
import { useTheme } from "react-router-theme";
import { type ReactNode } from "react";
import { Loader } from "~/components/loader";
import { ErrorBoundaryPage } from "~/error-boundary-page";
import { ThemeContext } from "./lib/theme-context";
import { I18nProvider } from "~/i18n";

export { loader, action } from "react-router-theme";

const defaultTheme = "light";

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
  const loaderData = useLoaderData<{ theme: string | undefined }>();
  const fetcher = useFetcher();
  const [theme, setTheme] = useTheme(
    loaderData ?? { theme: defaultTheme },
    fetcher,
    defaultTheme,
  );
  const isNavigating = Boolean(location);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html
        lang={"en"}
        className={theme}
        data-theme={theme}
        data-react-hydration="true"
      >
        <head>
          <title>Celio Vieira - Profile</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <I18nProvider>{isNavigating ? <Loader /> : children}</I18nProvider>
          <ScrollRestoration />
          <Scripts />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ThemeContext.Provider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary(props: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryPage props={props} />;
}
