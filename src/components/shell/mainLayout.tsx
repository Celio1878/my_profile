"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col items-center justify-between px-3 py-2 bg-slate-300 dark:bg-black transition duration-700 ease-in-out scroll-smooth">
        <Header
          {...{ darkMode, onToggleThemeClick: () => setDarkMode(!darkMode) }}
        />
        {children}
        <Footer />
      </div>
    </main>
  );
};
