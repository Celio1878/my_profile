import { FC } from "react";
import { OldCompanies } from "@/components/oldCompanies";
import { RestOfTechnologies } from "@/components/restOfTechnologies";

interface Props {
  dict: {
    old_experiences: {
      title: string;
    };
    old_companies: {
      description: string;
      squadra_job: string;
      at: string;
      and: string;
      editora_job: string;
      services: string;
    };
  };
}

export const OldExperiences: FC<Props> = ({ dict }) => (
  <div className="flex flex-col items-center justify-center gap-y-4">
    <h1 className="text-2xl font-semibold underline">
      {dict.old_experiences.title}
    </h1>
    <OldCompanies {...{ dict }} />
    <RestOfTechnologies />
  </div>
);
