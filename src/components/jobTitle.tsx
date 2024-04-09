import { FC } from "react";

interface Props {
  dict: {
    job: {
      title: string;
      description: string;
      frontend: string;
      backend: string;
      data: string;
      cloud: string;
    };
  };
}

export const JobTitle: FC<Props> = ({ dict }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <p>{dict.job.title}</p>
      <p>{dict.job.description}.</p>
      <ol className="flex flex-col list-disc items-start justify-center mt-2">
        <li>{dict.job.cloud}</li>
        <li>{dict.job.backend}</li>
        <li>{dict.job.data}</li>
        <li>{dict.job.frontend}</li>
      </ol>
    </div>
  );
};
