import { FC } from "react";
import { ProjectTechnologies } from "@/components/projectTechnologies";

interface Props {
  dict: { technologies: { title: string } };
}

export const Technologies: FC<Props> = ({ dict }) => (
  <div className="w-full flex flex-col items-center justify-center gap-y-4">
    <p className="text-2xl font-semibold underline">
      {dict.technologies.title}
    </p>
    <ProjectTechnologies />
  </div>
);
