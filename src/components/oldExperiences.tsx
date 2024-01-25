import { FC } from "react";
import { OldCompanies } from "@/components/oldCompanies";
import { RestOfTechnologies } from "@/components/restOfTechnologies";

export const OldExperiences: FC = () => (
  <div className="flex flex-col items-center justify-center gap-y-4">
    <h1 className="text-2xl font-semibold underline">Old Experiences</h1>
    <OldCompanies />
    <RestOfTechnologies />
  </div>
);
