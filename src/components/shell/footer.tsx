import { FC } from "react";
import Link from "next/link";
import { NpmIcon } from "@/components/icons/npmIcon";
import { GithubIcon } from "@/components/icons/githubIcon";
import { LinkedInIcon } from "@/components/icons/linkedInIcon";

export const Footer: FC = () => (
  <footer className="flex flex-col w-full h-28 justify-between items-center px-12 text-black dark:text-gray-50">
    <div className="flex flex-row w-10/12 sm:w-1/4 justify-around items-center text-black dark:text-gray-50">
      <Link
        id="npm-packages-page"
        href="https://www.npmjs.com/~celio1878"
        target="_blank"
      >
        <NpmIcon />
      </Link>
      <Link
        id="github-page"
        href="https://github.com/Celio1878"
        target="_blank"
      >
        <GithubIcon />
      </Link>
      <Link
        id="linkedin-page"
        href="https://www.linkedin.com/in/c%C3%A9lio-vieira-6362a284"
        target={"_blank"}
      >
        <LinkedInIcon />
      </Link>
    </div>
    <Link
      id="vercel-page"
      className="hover:underline"
      href="https://vercel.com/about"
      target={"_blank"}
    >
      Powered by Vercel
    </Link>
  </footer>
);
