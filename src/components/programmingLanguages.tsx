import { FC } from "react";
import { languages_list } from "@/utils/iconsList";
import { IconLink } from "@/components/links/iconLink";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";

export const ProgrammingLanguages: FC = () => (
  <div className="flex flex-col gap-y-2 items-center justify-center">
    <p className="text-lg font-semibold">
      I have a full experience using programming languages such as
    </p>
    <ul className="flex flex-row justify-around items-center gap-10 border border-slate-300 dark:border-slate-900 rounded-md py-8 px-10">
      {languages_list.map((language) => (
        <li key={language.key}>{language}</li>
      ))}
    </ul>
    <div className="flex flex-row text-sm items-center">
      and I have some experience using
      <IconLink
        className="mx-2"
        src="/csharp.svg"
        alt="C#"
        key="csharp"
        href="https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/"
        width={30}
        height={30}
      />
      and
      <IconLink
        className="mx-2"
        src="/c.svg"
        alt="C++"
        key="c++"
        href="https://learn.microsoft.com/cpp/cpp/?view=msvc-170"
        width={30}
        height={30}
      />
      as well, I&apos;ve developed some features using it
    </div>
    <div className="mt-4">
      <GithubLink
        className="text-gray-800 dark:text-gray-100 hover:text-white"
        complement="tab=repositories"
      >
        <HighlightedContent>
          <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 font-semibold">
            Check my github repositories
          </span>
        </HighlightedContent>
      </GithubLink>
    </div>
  </div>
);
