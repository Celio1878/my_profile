"use client";

import { useState } from "react";
import { Header } from "@/components/shell/header";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/githubIcon";
import { LinkedInIcon } from "@/components/icons/linkedInIcon";
import { NpmIcon } from "@/components/icons/npmIcon";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col items-center justify-between px-3 py-2 bg-gray-50 dark:bg-black transition duration-700 ease-in-out scroll-smooth">
        <Header
          {...{ darkMode, onToggleThemeClick: () => setDarkMode(!darkMode) }}
        />
        <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50">
          <h1 className="text-4xl font-bold">Hello, my name is Celio!</h1>
        </section>
        <footer className="flex flex-col w-full h-28 justify-between items-center px-12 text-black dark:text-gray-50">
          <div className="flex flex-row w-10/12 sm:w-1/4 justify-around items-center text-black dark:text-gray-50">
            <Link href="https://www.npmjs.com/~celio1878">
              <NpmIcon />
            </Link>
            <Link
              href="https://github.com/Celio1878"
              target={"_blank"}
              id="github-page"
            >
              <GithubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/c%C3%A9lio-vieira-6362a284"
              target={"_blank"}
            >
              <LinkedInIcon />
            </Link>
          </div>
          <Link className="hover:underline" href="https://vercel.com/about">
            Powered by Vercel
          </Link>
        </footer>
      </div>
    </main>
  );
}
