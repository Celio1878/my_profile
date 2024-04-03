"use client";

import { FC, useState } from "react";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import Link from "next/link";
import { DownArrowIcon } from "@/components/icons/downArrowIcon";

interface Props {
  title: string;
  items: { name: string; link: string }[];
}

export const KnowledgeList: FC<Props> = ({ title, items }) => {
  const [show_items, set_show_items] = useState(false);

  return (
    <div>
      <span
        className="flex flex-row mb-1 font-light hover:font-medium hover:cursor-pointer transition-all duration-100 ease-in-out"
        onClick={() => set_show_items(!show_items)}
      >
        {title} {!show_items ? <RightArrowIcon /> : <DownArrowIcon />}
      </span>

      <ul className={`ml-3 space-y-2 ${!show_items ? "hidden" : "block"}`}>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              className="hover:underline text-sm font-medium"
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
