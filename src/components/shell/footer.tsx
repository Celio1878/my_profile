import { FC } from "react";
import { NpmIcon } from "@/components/icons/npmIcon";
import { GithubIcon } from "@/components/icons/githubIcon";
import { LinkedInIcon } from "@/components/icons/linkedInIcon";
import { GithubLink } from "@/components/links/githubLink";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";
import { LinkedinLink } from "@/components/links/linkedinLink";
import { VercelLink } from "@/components/links/vercelLink";
import { YouTubeLink } from "@/components/links/YouTubeLink";

export const Footer: FC = () => (
  <footer className="flex flex-col w-full h-28 justify-between items-center px-12 text-black dark:text-gray-50">
    <div className="flex flex-row w-10/12 sm:w-1/4 justify-around items-center text-black dark:text-gray-50">
      <NpmPackagesLink complement="settings/celio1878/packages">
        <NpmIcon />
      </NpmPackagesLink>

      <GithubLink>
        <GithubIcon />
      </GithubLink>

      <LinkedinLink>
        <LinkedInIcon />
      </LinkedinLink>

      <YouTubeLink />
    </div>
    <VercelLink />
  </footer>
);
