"use client";

import { FC, useState } from "react";
import { knowledge_list } from "@/utils/knowledge_list";
import { KnowledgeList } from "@/components/knowledgeList";

export const AsideMenu: FC = () => {
  const [index_to_open, set_index_to_open] = useState(-1);

  const toggle_item = (event: MouseEvent, index: number) => {
    event.preventDefault();
    set_index_to_open(index === index_to_open ? -1 : index);
  };

  return (
    <aside className="absolute z-50 left-0 top-28 sm:top-40 sm:bg-zinc-100 w-full sm:w-1/5 lg:w-1/6 rounded-r-xl dark:text-white">
      <h2 className="hidden sm:block text-lg sm:text-xl font-medium w-full bg-zinc-200 p-3 lg:p-5 rounded-tr-xl text-zinc-400">
        Knowledge
      </h2>
      <menu className="flex flex-row justify-center sm:flex-col space-x-8 sm:space-x-0 sm:space-y-4 mt-6 sm:mt-0 sm:pl-3 lg:pl-5 text-black dark:text-white sm:dark:text-black py-4 border border-y-slate-600 border-x-0 sm:border-0">
        {knowledge_list.map((knowledge, index) => (
          <KnowledgeList
            key={index}
            {...{
              title: knowledge.title,
              id: index,
              index_to_open,
              set_item_to_show: toggle_item,
              items: knowledge.items,
            }}
          />
        ))}
      </menu>
    </aside>
  );
};
