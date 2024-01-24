"use client";

import { FC, ReactNode, useState } from "react";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";

interface Props {
  children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col items-center justify-between bg-slate-50 dark:bg-black transition duration-700 ease-in-out scroll-smooth px-4">
        <Header
          {...{ darkMode, onToggleThemeClick: () => setDarkMode(!darkMode) }}
        />
        {children}
        <Footer />
      </div>
    </main>
  );
};
