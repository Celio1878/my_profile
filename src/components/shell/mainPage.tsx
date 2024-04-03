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
import { KnowledgeList } from "@/components/knowledgeList";
import { knowledge_list } from "@/utils/knowledge_list";

interface Props {
  lang: string;
}

export const MainPage: FC<Props> = async ({ lang }) => {
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-row w-full content-between">
      <section className="relative bg-zinc-100 w-1/6 h-full rounded-r-xl pb-6">
        <h2 className="text-xl font-medium w-full bg-zinc-200 p-5 rounded-tr-xl text-zinc-400">
          Knowledge
        </h2>
        <div className="space-y-8 mt-3 pl-5 text-black">
          {knowledge_list.map((item, index) => (
            <KnowledgeList key={index} {...item} />
          ))}
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
