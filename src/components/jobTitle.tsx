import { FC } from "react";

interface Props {
  dict: {
    job: {
      title: string;
      experience: string;
    };
  };
}

export const JobTitle: FC<Props> = ({ dict }) => {
  return <p className="w-10/12">{dict.job.title}.</p>;
};
