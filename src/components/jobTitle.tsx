import { FC } from "react";
import { get_years_of_experience } from "@/utils/get_years_of_experience";

interface Props {
  dict: {
    job: {
      title: string;
      experience: string;
    };
  };
}

export const JobTitle: FC<Props> = ({ dict }) => {
  const years_of_experience = get_years_of_experience();

  return (
    <p className="w-10/12">
      {dict.job.title} +{years_of_experience} {dict.job.experience}.
    </p>
  );
};
