import { FC } from "react";
import { AwsServiceCurrentJob } from "@/components/awsServiceCurrentJob";
import { Greetings } from "@/components/greetings";
import { Interests } from "@/components/interests";
import { Education } from "@/components/education";
import { Certifications } from "@/components/certifications";
import { ProgrammingLanguages } from "@/components/programmingLanguages";
import { Technologies } from "@/components/technologies";
import { SideHustles } from "@/components/sideHustles";
import { Goals } from "@/components/goals";
import { CurrentJob } from "@/components/currentJob";
import { OldExperiences } from "@/components/oldExperiences";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { ContactMe } from "@/components/contactMe";
import Link from "next/link";

interface Props {
  lang: string;
}

export const MainPage: FC<Props> = async ({ lang }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-row w-full content-between">
      <section className="relative bg-zinc-200 w-1/6 h-full text-gray-700 rounded-r-xl pb-4">
        <h2 className="text-xl font-medium w-full bg-zinc-300 p-4 rounded-tr-xl">
          Knowledge
        </h2>
        <div className="space-y-4 mt-3 pl-4">
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Languages
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  JS/TS
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Python
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Golang
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Infrastructure
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Cloud
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Terraform
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Serverless Framework
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Git/Github
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Docker
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Kafka
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Backend
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  NodeJS
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  FastAPI
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Go Standard Library
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Frontend
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  ReactJS
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  NextJS
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Data
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  SQL
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  NoSQL
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Data Structure
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  ML
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  AI
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  LLM
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-light hover:font-medium hover:cursor-pointer">
              Patterns
            </h3>
            <ul className="ml-3 space-y-1">
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  *DD
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  OOP/FP
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  SOLID
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  YAGNI
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Well Architected Framework
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Structural
                </Link>
              </li>
              <li>
                <Link className="hover:underline text-sm font-medium" href="">
                  Behavioral
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-20 pt-14 px-4">
        <ContactMe {...{ dict }} />
        <Greetings {...{ dict }} />
        <Interests {...{ dict }} />
        <Education {...{ dict }} />
        <Certifications {...{ dict }} />
        <ProgrammingLanguages {...{ dict }} />
        <Technologies {...{ dict }} />
        <SideHustles {...{ dict }} />
        <Goals {...{ dict }} />
        <CurrentJob {...{ dict }} />
        <AwsServiceCurrentJob />
        <OldExperiences {...{ dict }} />
      </section>
    </div>
  );
};
