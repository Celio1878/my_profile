import { FC } from "react";
import { knowledge_list } from "@/utils/knowledge_list";
import { KnowledgeList } from "@/components/knowledgeList";

export const AsideMenu: FC = () => {
  return (
    <aside className="absolute z-50 left-0 top-28 sm:top-40 sm:bg-zinc-100 w-full sm:w-1/5 lg:w-1/6 rounded-r-xl dark:text-white">
      <h2 className="hidden sm:block text-lg sm:text-xl font-medium w-full bg-zinc-200 p-3 lg:p-5 rounded-tr-xl text-zinc-400">
        Knowledge
      </h2>
      <menu className="flex flex-row justify-center sm:flex-col space-x-8 sm:space-x-0 sm:space-y-4 mt-6 sm:pl-3 lg:pl-5 text-black dark:text-white sm:dark:text-black py-2 border border-y-slate-600 border-x-0 sm:border-0">
        {knowledge_list.map((item, index) => (
          <KnowledgeList key={index} {...item} />
        ))}
      </menu>
    </aside>
  );
};
