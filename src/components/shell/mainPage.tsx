import { FC } from "react";
import { Greetings } from "@/components/greetings";
import { JobTitle } from "@/components/jobTitle";
import { Education } from "@/components/education";
import { SideHustles } from "@/components/sideHustles";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { ContactMe } from "@/components/contactMe";
import { AsideMenu } from "@/components/shell/asideMenu";
import { Footer } from "@/components/shell/footer";

interface Props {
  lang: string;
}

export const MainPage: FC<Props> = async ({ lang }) => {
  const dict = await getDictionary(lang);

  return (
    <>
      <div className="flex sm:flex-row flex-col w-full sm:justify-center items-center sm:items-baseline">
        <AsideMenu {...{ lang, dict }} />
        <section className="w-full sm:mt-0 h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-6 mt-28 sm:mt-0">
          <ContactMe {...{ dict }} />
          <Greetings {...{ dict }} />
          <JobTitle {...{ dict }} />
          <Education {...{ dict }} />
          <SideHustles {...{ dict }} />
        </section>
      </div>
      <Footer />
    </>
  );
};
