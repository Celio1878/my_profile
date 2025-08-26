import { useI18n } from "~/i18n";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

export const Nav: FC = () => {
  const { dict } = useI18n();
  const ids = useMemo(
    () => [
      "about",
      "experience",
      "education",
      "certifications",
      "skills",
      "projects",
      // Showcase sections
      "bys-showcase",
      "nodejs-appbuilder",
      "cdk-factory",
      "resume",
      "contact",
    ],
    [],
  );
  const [active, setActive] = useState<string>(ids[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  // Close mobile menu on route/hash change or Escape key
  useEffect(() => {
    const onHashChange = () => setMenuOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const link = (href: string, label: string) => (
    <a
      href={`#${href}`}
      className={"hover:underline data-[active=true]:underline"}
      aria-current={active === href ? "page" : undefined}
      data-active={active === href}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </a>
  );

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 backdrop-blur bg-slate-100/50 dark:bg-black border-b border-gray-200 dark:border-gray-800 z-50"
    >
      <div className="container mx-auto p-3 relative">
        <div className="flex items-center justify-between">
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            {link("about", dict.nav.about)}
            {link("experience", dict.nav.experience)}
            {link("education", dict.nav.education)}
            {link("certifications", dict.nav.certifications)}
            {link("skills", dict.nav.skills)}
            {link("projects", dict.nav.projects)}
            {link("bys-showcase", dict.nav.bys)}
            {link("nodejs-appbuilder", dict.nav.appBuilder)}
            {link("cdk-factory", dict.nav.cdkFactory)}
            {link("resume", dict.nav.resume)}
            {link("contact", dict.nav.contact)}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Theme toggle always visible */}
            <ThemeToggle />
            {/* Hamburger for mobile */}
            <button
              type="button"
              aria-label={menuOpen ? dict.ui.closeMenu : dict.ui.openMenu}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              className="inline-flex items-center justify-center sm:hidden h-9 w-9 rounded-md border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-slate-900/70"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <CloseIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="primary-navigation"
          ref={mobilePanelRef}
          role="menu"
          aria-label="Primary navigation"
          className={
            (menuOpen
              ? "max-h-96 opacity-100 pointer-events-auto"
              : "max-h-0 opacity-0 pointer-events-none") +
            " sm:hidden overflow-hidden transition-all duration-300 ease-out"
          }
        >
          <div className="mt-2 flex flex-col gap-3 text-sm font-medium bg-slate-50/70 dark:bg-slate-950/40 rounded-md p-3 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {dict.ui.menu}
              </span>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="flex flex-col" role="none">
              <div role="none">{link("about", dict.nav.about)}</div>
              <div role="none">{link("experience", dict.nav.experience)}</div>
              <div role="none">{link("education", dict.nav.education)}</div>
              <div role="none">
                {link("certifications", dict.nav.certifications)}
              </div>
              <div role="none">{link("skills", dict.nav.skills)}</div>
              <div role="none">{link("projects", dict.nav.projects)}</div>
              <div role="none">{link("bys-showcase", dict.nav.bys)}</div>
              <div role="none">
                {link("nodejs-appbuilder", dict.nav.appBuilder)}
              </div>
              <div role="none">{link("cdk-factory", dict.nav.cdkFactory)}</div>
              <div role="none">{link("resume", dict.nav.resume)}</div>
              <div role="none">{link("contact", dict.nav.contact)}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
