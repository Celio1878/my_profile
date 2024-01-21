import { FC } from "react";
import Image from "next/image";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";
import { LinkedinLink } from "@/components/links/linkedinLink";
import Link from "next/link";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";

export const MainPage: FC = () => {
  const get_years_of_experience = () => {
    const init_career_year = 2020;
    const current_year = new Date().getFullYear();
    const years_of_experience = current_year - init_career_year;
    return years_of_experience;
  };
  const years_of_experience = get_years_of_experience();

  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center">
      <h1 className="text-4xl font-bold">Hello, my name is Célio!</h1>
      <Image
        src="https://avatars.githubusercontent.com/u/40040827?&v=4"
        className="rounded-full"
        alt="Célio"
        width="150"
        height="150"
      />
      <p className="flex flex-col text-center justify-center items-center">
        I am a software engineer specializing in Cloud Computing and I&apos;ve
        worked for the last {years_of_experience} years with it.
        <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white">
          <HighlightedContent>
            <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
              Check my curriculum!
            </span>
          </HighlightedContent>
        </LinkedinLink>
      </p>

      <h3>
        I have a full experience using programming languages such as
        <div className="flex flex-row justify-around items-center my-4">
          <Image src="/javascript.svg" alt="JS" width={30} height={30} />
          <Image src="/typescript.svg" alt="JS" width={30} height={30} />
          <Image src="/python.svg" alt="JS" width={30} height={30} />
          <Image src="/golang.svg" alt="JS" width={30} height={30} />
        </div>
      </h3>
      <h4 className="flex flex-row text-sm items-center">
        I know a little about{" "}
        <Image
          className="mx-2"
          src="/csharp.svg"
          alt="JS"
          width={20}
          height={30}
        />
        and
        <Image
          className="mx-2"
          src="/c.svg"
          alt="JS"
          width={20}
          height={30}
        />{" "}
        as well, I&apos;ve developed some features using it
      </h4>
      <h1 className="my-4">
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
      </h1>
      <section>Some technologies I&apos;m using in my features</section>
      <div className="flex flex-wrap w-2/5 justify-center items-center my-6">
        <Image
          className="mx-4"
          src="/aws.svg"
          alt="AWS"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/docker.svg"
          alt="Docker"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/git.svg"
          alt="JS"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/github-icon.svg"
          alt="GITHUB"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/kafka.svg"
          alt="KAFKA"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/elasticsearch.svg"
          alt="ELASTICSEARCH"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/terraform.svg"
          alt="TERRAFORM"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/vercel.svg"
          alt="VERCEL"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/sql-server.svg"
          alt="SQL"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/firebase.svg"
          alt="FIREBASE"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/nodejs.svg"
          alt="NODEJS"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/fastapi.svg"
          alt="FASTAPI"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/nextjs.svg"
          alt="NEXTJS"
          width={30}
          height={30}
        />
        <Image
          className="mx-4"
          src="/react.svg"
          alt="REACTJS"
          width={30}
          height={30}
        />
      </div>

      <div>
        <p>
          Building different kind of software, I realised that it&apos;s
          possible to create packages (libs) that turn easy the creation of any
          other systems.
        </p>
        <ul className="flex flex-row items-center justify-around">
          <li className="w-1/3 flex flex-col items-center justify-center text-center">
            <NpmPackagesLink
              className="border border-2 border-emerald-500 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75"
              complement="package/nodejs-appbuilder"
            >
              NodeJS App Builder
            </NpmPackagesLink>
            <p>
              It&apos;s possible to create a NodeJS App with a Serverless
              handler, and with this, you can focus on routes, middlewares and
              business rules.
            </p>
          </li>
          <li className="w-1/3 flex flex-col items-center justify-center text-center">
            <NpmPackagesLink
              className="border border-2 border-emerald-500 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75"
              complement="package/cdk-factory"
            >
              CDK Factory
            </NpmPackagesLink>
            <p>
              CDK Factory may be used with
              <Link
                className="underline mx-1.5 hover:opacity-50 transition delay-75"
                href="https://aws.amazon.com/pt/cdk/"
              >
                AWS CDK
              </Link>
              and it helps you to create new instances for your Lambda, Api
              Gateway, DynamoDB and many other resources.
            </p>
          </li>
        </ul>
        <div>
          <h3>
            Currently, I&apos;m working as a Software Analyst at
            <Link
              href="https://www.itau.com.br"
              className="underline mx-2 hover:text-orange-500 trasition delay-75"
            >
              Itaú Unibanco
            </Link>
            in Payment systems, managing and building new features
          </h3>
          <h2>Using mainly the AWS services like</h2>
        </div>
      </div>
      <div className="flex w-1/2 overflow-hidden space-x-16 group">
        <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee9f161-df19-4fa7-a2a6-edf9acf0e0d6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 1"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80480f8a-69ad-4c30-88ba-f4e7ee08fc51?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 2"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/140d376c-13f2-4823-b397-b3de733bf560?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 3"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ae217f1-b695-4661-bd3d-6440eebc2c5c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 4"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/67017079-51e1-4245-9bf1-b5957eb66c74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 5"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/515313ac-7ec9-4c6e-95db-80dac2f8b960?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 6"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c513fc32-3ab9-4cca-911e-0b2642ac7206?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 7"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5731a5a7-689f-49ae-abf1-6e6dc00c2043?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 8"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb51d286-530f-42be-9e91-9c850522f127?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 9"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/44ba8437-f6fd-4a51-bfd3-262d7528f7a4?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 10"
          />
        </div>
        <div
          className="flex space-x-16 animate-loop-scroll group-hover:paused"
          aria-hidden="true"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ee9f161-df19-4fa7-a2a6-edf9acf0e0d6?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 1"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80480f8a-69ad-4c30-88ba-f4e7ee08fc51?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 2"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/140d376c-13f2-4823-b397-b3de733bf560?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 3"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ae217f1-b695-4661-bd3d-6440eebc2c5c?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 4"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/67017079-51e1-4245-9bf1-b5957eb66c74?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 5"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/515313ac-7ec9-4c6e-95db-80dac2f8b960?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 6"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c513fc32-3ab9-4cca-911e-0b2642ac7206?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 7"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5731a5a7-689f-49ae-abf1-6e6dc00c2043?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 8"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb51d286-530f-42be-9e91-9c850522f127?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 9"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/44ba8437-f6fd-4a51-bfd3-262d7528f7a4?apiKey=7e8b177c7c374d8abaf3aebf27f1c17d&"
            className="max-w-none"
            alt="Image 10"
          />
        </div>
      </div>
    </section>
  );
};
