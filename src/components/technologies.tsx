import { FC } from "react";
import { ProjectTechnologies } from "@/components/projectTechnologies";

export const Technologies: FC = () => (
  <div className="w-full flex flex-col items-center justify-center gap-y-4">
    <p className="text-2xl font-semibold underline">
      Some technologies I&apos;m using in my projects
    </p>
    <ProjectTechnologies />
  </div>
);
