import { MainLayout } from "@/components/shell/mainLayout";
import Image from "next/image";
import { GithubLink } from "@/components/links/githubLink";

export default function Home() {
  return (
    <MainLayout>
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
        </p>
        <h3>Currently, I&apos;m Sofware Engineer at Itau Unibanco</h3>
        <h3>
          I have a full experience using programming languages such as
          JavaScript/TypeScript, Python, Golang (more know like GO).
        </h3>
        <h4>
          I know little about C# and C++ as well, I&apos;ve developed some
          features using it
        </h4>
        <h1>
          check out
          <GithubLink
            className="text-gray-800 dark:text-gray-100 hover:text-sky-600"
            complement="tab=repositories"
          >
            <span className="relative flex h-full w-13">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-30"></span>

              <span>my github repositories</span>
            </span>
          </GithubLink>
        </h1>
      </section>
    </MainLayout>
  );
}
