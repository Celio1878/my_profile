"use client";

import { useState } from "react";
import { Header } from "@/components/shell/header";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col items-center justify-between px-3 py-2 bg-gray-50 dark:bg-black transition duration-700 ease-in-out">
        <Header
          {...{
            darkMode,
            onToggleThemeClick: () => setDarkMode(!darkMode),
          }}
        />
        <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50">
          <h1 className="text-4xl font-bold">Hi, my name is Celio!</h1>
        </section>
      </div>
    </main>
  );
}
