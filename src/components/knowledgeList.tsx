"use client";

import { FC, useState } from "react";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import Link from "next/link";
import { DownArrowIcon } from "@/components/icons/downArrowIcon";

interface Props {
  id: string;
  title: string;
  items: { name: string; link: string }[];
}

export const KnowledgeList: FC<Props> = ({ id, title, items }) => {
  const [show_items, set_show_items] = useState("");

  console.log(show_items);

  return (
    <div>
      <span
        className="flex flex-row mb-1 text-sm font-medium sm:font-light hover:font-medium hover:cursor-pointer transition-all duration-100 ease-in-out underline sm:no-underline"
        onClick={() => set_show_items(id)}
      >
        {title} {show_items === id ? <RightArrowIcon /> : <DownArrowIcon />}
      </span>

      <ul
        className={`max-w-[8rem] sm:ml-3 sm:space-y-2 ${show_items === id ? "hidden" : "absolute sm:relative block bg-slate-800 text-white sm:text-black sm:bg-transparent p-2 rounded-md"}`}
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
