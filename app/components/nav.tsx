import { useI18n } from "~/i18n";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "~/components/theme-toggle";

export const Nav: FC = () => {
  const { dict } = useI18n();
  const ids = useMemo(
    () => [
      "about",
      "experience",
      "education",
      "certifications",
      "skills",
      "hobbies",
      "projects",
      "resume",
      "contact",
    ],
    [],
  );
  const [active, setActive] = useState<string>(ids[0]);

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

  const link = (href: string, label: string) => (
    <a
      href={`#${href}`}
      className={"hover:underline data-[active=true]:underline"}
      aria-current={active === href ? "page" : undefined}
      data-active={active === href}
    >
      {label}
    </a>
  );

  return (
    <nav
      role="navigation"
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 backdrop-blur bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800 z-50"
    >
      <div className="container mx-auto flex items-center justify-between p-3">
        <div className="flex items-center gap-4 text-sm font-medium">
          {link("about", dict.nav.about)}
          {link("experience", dict.nav.experience)}
          {link("education", dict.nav.education)}
          {link("certifications", dict.nav.certifications)}
          {link("skills", dict.nav.skills)}
          {link("hobbies", dict.nav.hobbies)}
          {link("projects", dict.nav.projects)}
          {link("resume", dict.nav.resume)}
          {link("contact", dict.nav.contact)}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
