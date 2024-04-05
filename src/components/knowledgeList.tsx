"use client";

import { FC } from "react";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  items: { name: string; link: string }[];
  index_to_open: number;
  set_item_to_show: (event: any, index: number) => void;
}

export const KnowledgeList: FC<Props> = ({
  id,
  title,
  items,
  index_to_open,
  set_item_to_show,
}) => {
  return (
    <div>
      <span
        className="flex flex-row mb-1 text-sm font-medium sm:font-light hover:font-medium hover:cursor-pointer transition-all duration-100 ease-in-out underline sm:no-underline"
        onClick={(event) => set_item_to_show(event, id)}
      >
        {title}
        {
          <span
            className={`transition-transform transform duration-300 ${index_to_open === id && "rotate-90"}`}
          >
            <RightArrowIcon />
          </span>
        }
      </span>

      <ul
        className={`max-w-[12rem] sm:ml-3 sm:space-y-2 ${index_to_open !== id ? "hidden" : "absolute sm:relative block bg-slate-800 text-white sm:text-black sm:bg-transparent p-2 sm:p-0 rounded-md"}`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link
              className="hover:underline text-xs font-medium"
              href={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
