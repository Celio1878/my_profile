import { FC } from "react";
import { AwsServiceSlider } from "@/components/awsServiceSlider";
import { Saudation } from "@/components/saudation";
import { Likes } from "@/components/likes";
import { Education } from "@/components/education";
import { Certifications } from "@/components/certifications";
import { ProgrammingLanguages } from "@/components/programmingLanguages";
import { Technologies } from "@/components/technologies";
import { SideHustles } from "@/components/sideHustles";
import { Goals } from "@/components/goals";
import { CurrentJob } from "@/components/currentJob";
import { OldExperiences } from "@/components/oldExperiences";

export const MainPage: FC = () => (
  <section className="w-full h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-20">
    <Saudation />
    <Likes />
    <Education />
    <Certifications />
    <ProgrammingLanguages />
    <Technologies />
    <SideHustles />
    <Goals />
    <CurrentJob />
    <AwsServiceSlider />
    <OldExperiences />
  </section>
);
