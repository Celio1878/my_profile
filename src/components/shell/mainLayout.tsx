"use client";

import { FC, ReactNode, useState } from "react";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const { stored_value, set_value } = useLocalStorage("theme", "light");
  const [theme, set_theme] = useState(stored_value);

  function changing_theme() {
    set_theme((prev_theme) => {
      const new_theme = prev_theme === "light" ? "dark" : "light";
      set_value(new_theme);
      return new_theme;
    });
  }

  return (
    <main className={`${theme}`}>
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
