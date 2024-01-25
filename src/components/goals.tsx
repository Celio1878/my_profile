import { FC } from "react";

export const Goals: FC = () => (
  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-8 gap-y-1 border border-slate-300 dark:border-slate-900 rounded-md">
    <h1 className="text-xl font-bold underline mb-2">My current goals are:</h1>
    <div className="mb-4">
      <p className="mb-1 text-lg font-medium">Get some AWS CERTIFICATIONS</p>
      <ol className="list-disc text-left">
        <li>AWS Certified Solutions Architect ‒ Associate</li>
        <li>AWS Certified Data Engineer - Associate</li>
        <li>AWS Certified DevOps Engineer – Professional</li>
        <li>AWS Certified Data Analytics - Specialty</li>
        <li>AWS Certified Database – Specialty</li>
        <li>AWS Certified Machine Learning - Specialty</li>
      </ol>
    </div>
    <h1 className="text-lg font-medium">Improve my English vocabulary;</h1>
    <h1 className="text-lg font-medium">
      Achieve fluency in German and Spanish;
    </h1>
    <h1 className="text-lg font-medium">
      Improve and finish some side projects;
    </h1>
    <h1 className="text-lg font-medium">
      Create channels to share knowledge with the community.
    </h1>
  </div>
);
