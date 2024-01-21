import { FC } from "react";
import Image from "next/image";
import { GithubLink } from "@/components/links/githubLink";
import { HighlightedContent } from "@/components/highlightedContent";
import { LinkedinLink } from "@/components/links/linkedinLink";
import Link from "next/link";

export const MainPage: FC = () => (
  <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50">
    <h1 className="text-4xl font-bold">Hello, my name is Célio!</h1>
    <Image
      src="https://avatars.githubusercontent.com/u/40040827?&v=4"
      className="rounded-full"
      alt="Célio"
      width="150"
      height="150"
    />
    <p className="text-lg">
      I am a software engineer specializing in Cloud Computing.
      <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white">
        <HighlightedContent>
          <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
            Check my curriculum!
          </span>
        </HighlightedContent>
      </LinkedinLink>
    </p>
    <h3>
      Currently, I&apos;m Software Engineer at{" "}
      <Link href="https://www.itau.com.br" className="underline">
        Itaú Unibanco
      </Link>
    </h3>
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
      />{" "}
      and{" "}
      <Image className="mx-2" src="/c.svg" alt="JS" width={20} height={30} /> as
      well, I&apos;ve developed some features using it
    </h4>
    <h1 className="flex flex-col my-4 items-center justify-center">
      check out
      <GithubLink
        className="text-gray-800 dark:text-gray-100 hover:text-white"
        complement="tab=repositories"
      >
        <HighlightedContent>
          <span className="py-1 px-2 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 ml-2">
            my github repositories
          </span>
        </HighlightedContent>
      </GithubLink>
    </h1>
    <section>Some technologies I&apos;m using in my feature</section>
    <div className="flex flex-wrap w-1/5 justify-center my-6">
      <Image className="mx-4" src="/aws.svg" alt="AWS" width={30} height={30} />
      <Image
        className="mx-4"
        src="/docker.svg"
        alt="Docker"
        width={30}
        height={30}
      />
      <Image className="mx-4" src="/git.svg" alt="JS" width={30} height={30} />
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
  </section>
);
