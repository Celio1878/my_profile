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

interface Props {
  lang: string;
}

export const MainPage: FC<Props> = async ({ lang }) => {
  const dict = await getDictionary(lang);

  return (
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
  );
};
