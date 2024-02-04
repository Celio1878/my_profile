import { FC } from "react";

interface Props {
  dict: {
    goals: {
      title: string;
      certifications: string;
      improve_english: string;
      achieve_fluency: string;
      finish_projects: string;
      share_knowledge: string;
    };
  };
}

export const Goals: FC<Props> = ({ dict }) => (
  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-8 gap-y-1 border border-slate-300 dark:border-slate-900 rounded-md">
    <h1 className="text-xl font-bold underline mb-5">{dict.goals.title}:</h1>
    <div className="mb-6">
      <p className="mb-1 text-lg font-medium mb-2">
        {dict.goals.certifications}
      </p>
      <ol className="list-disc text-left px-2 sm:px-0 space-y-3 underline">
        <li>AWS Certified Solutions Architect ‒ Associate</li>
        <li>AWS Certified Data Engineer - Associate</li>
        <li>AWS Certified DevOps Engineer – Professional</li>
        <li>AWS Certified Data Analytics - Specialty</li>
        <li>AWS Certified Database – Specialty</li>
        <li>AWS Certified Machine Learning - Specialty</li>
      </ol>
    </div>
    <h1 className="text-lg font-medium">{dict.goals.improve_english};</h1>
    <h1 className="text-lg font-medium">{dict.goals.achieve_fluency};</h1>
    <h1 className="text-lg font-medium">{dict.goals.finish_projects};</h1>
    <h1 className="text-lg font-medium">{dict.goals.share_knowledge}.</h1>
  </div>
);
