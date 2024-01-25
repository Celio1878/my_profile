import { FC } from "react";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";
import { LinkedinLink } from "@/components/links/linkedinLink";
import Link from "next/link";
import { IconLink } from "@/components/links/iconLink";
import { AwsServiceSlider } from "@/components/awsServiceSlider";
import { ProjectTechnologies } from "@/components/projectTechnologies";
import { languages_list } from "@/utils/iconsList";
import { BYSLink } from "@/components/links/bysLink";
import { ProfileImage } from "@/components/profileImage";
import { MyPackages } from "@/components/myPackages";
import { OldCompanies } from "@/components/oldCompanies";
import { RestOfTechnologies } from "@/components/restOfTechnologies";
import { get_years_of_experience } from "@/utils/get_years_of_experience";

export const MainPage: FC = () => (
  <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-20">
    <div className="flex flex-col gap-y-4 text-4xl font-bold items-center justify-center">
      Hello, I&apos;m Célio! <ProfileImage />
    </div>

    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-xl font-bold">
        &quot;Test Everything that&apos;s important !!!&quot;
      </h1>
      <p className="w-9/12">
        For me, TDD (Test-Driven Development) is the most important Design
        Pattern, after all, it confirm that what you did works. However, all
        software must deliver at least one thing{" "}
        <span className="font-semibold">Meet customer needs.</span>
      </p>
      <p>
        I like to play with code, creating projects, testing new technologies
        and finding out what we can do with that.
      </p>
      <p>Always updating my knowledge.</p>
    </div>

    <div className="w-9/12 flex flex-col text-center justify-center items-center gap-y-2">
      <p className="text-2xl font-semibold underline">Education</p>
      <ol className="list-disc text-left">
        <li>
          I am a Software Engineer with {get_years_of_experience()} years of
          experience;
        </li>
        <li>Fluent in English and Portuguese;</li>
        <li>Bachelor&apos;s Degree in Computer Science;</li>
        <li>Postgraduate in Cloud Computing Projects and Architecture.</li>
      </ol>
      <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white font-semibold">
        <HighlightedContent>
          <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
            Check My Profile!
          </span>
        </HighlightedContent>
      </LinkedinLink>
    </div>

    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-8 border border-slate-300 dark:border-slate-900 rounded-md">
      <h2>I have gotten some courses/certifications</h2>

      <LinkedinLink
        className="text-gray-800 dark:text-gray-100 hover:text-white mt-2"
        complement="details/certifications/"
      >
        <HighlightedContent>
          <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 font-semibold">
            Check My Certifications!
          </span>
        </HighlightedContent>
      </LinkedinLink>
    </div>

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
        and have some experience using
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

    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <p className="text-2xl font-semibold underline">
        Some technologies I&apos;m using in my projects
      </p>
      <ProjectTechnologies />
    </div>

    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold underline mb-2">Side Hustles</h1>
      <p className="mb-8">
        Building different kind of software, I realised that it&apos;s possible
        to create packages (libs) that turn easy the creation of any other
        systems.
      </p>

      <MyPackages />
    </div>

    <div className="w-full sm:w-9/12 flex items-center justify-center text-center p-8 border border-slate-300 dark:border-slate-900 rounded-md gap-2">
      <h3>And I&apos;m using ones in a side hustle I&apos;m working called</h3>
      <BYSLink />
      <span className="font-medium">completely serverless.</span>
    </div>

    <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-8 gap-y-1 border border-slate-300 dark:border-slate-900 rounded-md">
      <h1 className="text-xl font-bold underline mb-2">
        My current goals are:
      </h1>
      <div className="mb-4">
        <p className="mb-1 text-lg font-medium">Get some AWS CERTIFICATIONS</p>
        <ol className="list-disc text-left">
          <li>AWS Certified Solutions Architect ‒ Associate</li>
          <li>AWS Certified Data Engineer - Associate</li>
          <li>AWS Certified DevOps Engineer – Professional</li>
          <li>AWS Certified Data Analytics - Specialty</li>
          <li>AWS Certified Database – Specialty</li>
          <li>AWS Certified Machine Learning - Specialty</li>
        </ol>
      </div>
      <h1 className="text-lg font-medium">Improve my English vocabulary;</h1>
      <h1 className="text-lg font-medium">
        Achieve fluency in German and Spanish;
      </h1>
      <h1 className="text-lg font-medium">
        Improve and finish some side projects;
      </h1>
      <h1 className="text-lg font-medium">
        Create channels to share knowledge with the community.
      </h1>
    </div>

    <div>
      <h1 className="text-2xl font-semibold underline mb-4">Current Job</h1>
      <p>
        Currently, I&apos;m working as a{" "}
        <span className="font-semibold">Software Engineer</span> at
        <Link
          href="https://www.itau.com.br"
          className="underline mx-2 hover:text-orange-500 trasition delay-75"
        >
          Itaú Unibanco
        </Link>
        in Payment systems, managing and building new features
      </p>
      <div>Using mainly the AWS services like</div>
    </div>

    <div className="w-full my-12">
      <AwsServiceSlider />
    </div>

    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-semibold underline">Old Experiences</h1>
      <OldCompanies />
      <RestOfTechnologies />
    </div>
  </section>
);
