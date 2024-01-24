import { FC } from "react";
import { frameworks_list } from "@/utils/iconsList";

export const RestOfTechnologies: FC = () => (
  <ul className="flex flex-wrap w-full md:w-1/2 gap-14 justify-center items-center text-sm mt-6 mb-24">
    {frameworks_list.map((framework) => (
      <li
        className="flex flex-col items-center hover:underline"
        title={framework.props.alt}
        key={framework.key}
      >
        {framework} {framework.props.alt}
      </li>
    ))}
  </ul>
);
