import { FC } from "react";
import Link from "next/link";

interface Props {
  title: string;
  link: string;
}

export const KnowledgeList: FC<Props> = ({ title, link }) => {
  return (
    <li>
      <Link href={link} target={"_top"}>
        <span className="underline sm:no-underline sm:hover:underline text-sm text-black dark:text-gray-200 sm:dark:text-black font-light hover:font-medium transition duration-150">
          {title}
        </span>
      </Link>
    </li>
  );
};
