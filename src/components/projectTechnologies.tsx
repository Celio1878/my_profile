import { FC } from "react";
import { techlist } from "@/utils/iconsList";

export const ProjectTechnologies: FC = () => {
  return (
    <ul className="flex flex-wrap w-full sm:w-1/2 gap-4 justify-center items-center">
      {techlist.map((tech) => (
        <li
          className="rounded p-6 bg-slate-200 hover:opacity-70 transition delay-100"
          key={tech.key}
        >
          {tech}
        </li>
      ))}
    </ul>
  );
};
