"use client";

import { FC, ReactNode, useContext } from "react";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";
import { ThemeContext } from "@/app/[lang]/theme-provider";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  // @ts-ignore
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <main className={theme}>
      <div className="flex min-h-screen flex-col items-center justify-between bg-slate-50 dark:bg-black transition duration-700 ease-in-out scroll-smooth">
        <Header
          {...{
            darkMode: theme === "light" ? false : true,
            onToggleThemeClick: toggleTheme,
          }}
        />
        {children}
        <Footer />
      </div>
    </main>
  );
};
