import { FC } from "react";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";
import { LinkedinLink } from "@/components/links/linkedinLink";
import Link from "next/link";
import { IconLink } from "@/components/links/iconLink";
import { AwsServiceSlider } from "@/components/awsServiceSlider";
import { get_years_of_experience } from "@/utils/get_years_of_experience";
import { ProjectTechnologies } from "@/components/projectTechnologies";
import { languages_list } from "@/utils/iconsList";
import { BYSLink } from "@/components/links/bysLink";
import { ProfileImage } from "@/components/profileImage";
import { MyPackages } from "@/components/myPackages";
import { OldCompanies } from "@/components/oldCompanies";
import { RestOfTechnologies } from "@/components/restOfTechnologies";

export const MainPage: FC = () => {
  const years_of_experience = get_years_of_experience();

  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center">
      <div className="flex flex-col gap-y-4 text-4xl font-bold items-center justify-center">
        Hello, my name is Célio! <ProfileImage />
      </div>

      <div className="flex flex-col text-center justify-center items-center my-8">
        I am a software engineer specializing in Cloud Computing and I&apos;ve
        worked for the last {years_of_experience} years with it.
        <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white">
          <HighlightedContent>
            <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
              Check my curriculum!
            </span>
          </HighlightedContent>
        </LinkedinLink>
      </div>

      <div className="my-8">
        I have a full experience using programming languages such as
        <ul className="flex flex-row justify-around items-center gap-6">
          {languages_list.map((language) => (
            <li key={language.key}>{language}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row text-sm items-center">
        and knowing a little about
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
      <div className="mt-4 mb-8">
        <GithubLink
          className="text-gray-800 dark:text-gray-100 hover:text-white"
          complement="tab=repositories"
        >
          <HighlightedContent>
            <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 ml-2">
              check out my github repositories
            </span>
          </HighlightedContent>
        </GithubLink>
      </div>

      <section className="text-xl mb-2">
        Some technologies I&apos;m using in my projects
      </section>
      <ProjectTechnologies />
      <div className="flex flex-col mt-16 items-center justify-center">
        <div className="mb-16">
          <p className="mb-4">
            Building different kind of software, I realised that it&apos;s
            possible to create packages (libs) that turn easy the creation of
            any other systems.
          </p>
          <MyPackages />
        </div>

        <div className="w-10/12 text-center mt-8 mb-16 p-8 border border-slate-300 rounded-md">
          And I&apos;m using ones in a side hustle I&apos;m working called
          <BYSLink />
          completely serverless.
        </div>

        <div className="w-7/12 flex flex-col items-center justify-center mt-4 mb-16 p-8 border border-slate-300 rounded-md">
          <div>
            Additionally, I have gotten some courses/certifications about great
            technologies
          </div>

          <LinkedinLink
            className="text-gray-800 dark:text-gray-100 hover:text-white"
            complement="details/certifications/"
          >
            <HighlightedContent>
              <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
                Check my Certifications!
              </span>
            </HighlightedContent>
          </LinkedinLink>
        </div>

        <div>
          <div>
            Currently, I&apos;m working as a Software Engineer at
            <Link
              href="https://www.itau.com.br"
              className="underline mx-2 hover:text-orange-500 trasition delay-75"
            >
              Itaú Unibanco
            </Link>
            in Payment systems, managing and building new features
          </div>
          <div>Using mainly the AWS services like</div>
        </div>
      </div>
      <div className="w-full my-12">
        <AwsServiceSlider />
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 mb-12">
        <OldCompanies />
        <RestOfTechnologies />
      </div>
    </section>
  );
};
