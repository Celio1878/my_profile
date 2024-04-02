"use client";

import { FC, ReactNode, useState } from "react";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const get_theme = localStorage.getItem("theme") || "light";
  const [theme, set_theme] = useState(() => {
    return get_theme;
  });

  function changing_theme() {
    set_theme((prev_theme) => {
      const new_theme = prev_theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", new_theme);
      return new_theme;
    });
  }

  return (
    <main className={theme}>
      <div className="flex min-h-screen flex-col items-center justify-between bg-slate-50 dark:bg-black transition duration-700 ease-in-out scroll-smooth">
        <Header
          {...{
            darkMode: theme !== "light",
            onToggleThemeClick: changing_theme,
          }}
        />
        {children}
        <Footer />
      </div>
    </main>
  );
};
