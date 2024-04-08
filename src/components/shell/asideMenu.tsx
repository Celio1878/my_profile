import { FC } from "react";
import { knowledge_list } from "@/utils/knowledge_list";
import { KnowledgeList } from "@/components/knowledgeList";

interface Props {
  lang: string;
  dict: {
    aside: {
      knowledge: string;
      title: {
        patters: string;
        infrastructure: string;
        backend: string;
        frontend: string;
        data: string;
        coding: string;
      };
    };
  };
}

export const AsideMenu: FC<Props> = ({ lang, dict }) => {
  return (
    <aside className="absolute block z-50 left-0 top-28 sm:top-48 lg:top-36 sm:bg-zinc-100 w-full sm:w-1/5 lg:w-1/6 rounded-r-xl space-y-4">
      <h2 className="hidden sm:block text-lg sm:text-xl font-medium w-full bg-zinc-200 p-3 lg:p-5 rounded-tr-xl text-zinc-400">
        {dict.aside.knowledge}
      </h2>
      <menu className="flex flex-row justify-center sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 mt-6 sm:mt-0 sm:pl-3 lg:pl-5 py-4 sm:py-0 sm:pb-4 border border-y-slate-600 border-x-0 sm:border-0">
        {knowledge_list.map((knowledge, index) => (
          <KnowledgeList
            key={index}
            {...{
              title: knowledge.title,
              link: `${lang}/${knowledge.link}`,
            }}
          />
        ))}
      </menu>
    </aside>
  );
};
