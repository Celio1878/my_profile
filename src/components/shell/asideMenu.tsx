import { FC } from "react";
import { knowledge_list } from "@/utils/knowledge_list";
import { KnowledgeList } from "@/components/knowledgeList";

export const AsideMenu: FC = () => {
  return (
    <aside className="absolute left-0 bg-zinc-100 w-1/6 rounded-r-xl pb-6">
      <h2 className="text-xl font-medium w-full bg-zinc-200 p-5 rounded-tr-xl text-zinc-400">
        Knowledge
      </h2>
      <div className="space-y-8 mt-3 pl-5 text-black">
        {knowledge_list.map((item, index) => (
          <KnowledgeList key={index} {...item} />
        ))}
      </div>
    </aside>
  );
};
