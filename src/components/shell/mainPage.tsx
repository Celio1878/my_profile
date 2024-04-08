import { FC } from "react";
import { Greetings } from "@/components/greetings";
import { JobTitle } from "@/components/jobTitle";
import { Education } from "@/components/education";
import { SideHustles } from "@/components/sideHustles";

interface Props {
  dict: any;
}

export const MainPage: FC<Props> = ({ dict }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-6 mt-28 md:mt-0">
      <Greetings {...{ dict }} />
      <JobTitle {...{ dict }} />
      <Education {...{ dict }} />
      <SideHustles {...{ dict }} />
    </section>
  );
};
