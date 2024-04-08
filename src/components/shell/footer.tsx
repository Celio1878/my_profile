import { FC } from "react";
import { NpmIcon } from "@/components/icons/npmIcon";
import { GithubIcon } from "@/components/icons/githubIcon";
import { LinkedInIcon } from "@/components/icons/linkedInIcon";
import { GithubLink } from "@/components/links/githubLink";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";
import { LinkedinLink } from "@/components/links/linkedinLink";
import { YouTubeLink } from "@/components/links/YouTubeLink";
import { Copyright } from "@/components/links/copyright";

interface Props {
  dict: {};
}

export const Footer: FC<Props> = ({ dict }) => {
  console.log(dict);

  return (
    <footer className="flex flex-col w-full h-[12rem] justify-between items-center text-black dark:text-gray-50 pb-3">
      <span></span>
      <div className="flex flex-row justify-center items-center text-black dark:text-gray-50 gap-x-12">
        <NpmPackagesLink
          className="hover:opacity-60 transition delay-100"
          complement="settings/celio1878/packages"
        >
          <NpmIcon />
        </NpmPackagesLink>

        <GithubLink className="hover:opacity-60 transition delay-100">
          <GithubIcon />
        </GithubLink>

        <LinkedinLink className="hover:opacity-60 transition delay-100">
          <LinkedInIcon />
        </LinkedinLink>

        <YouTubeLink />
      </div>
      <Copyright />
    </footer>
  );
};
