import { FC } from "react";
import { LinkedinLink } from "@/components/links/linkedinLink";
import { HighlightedContent } from "@/components/highlightedContent";

export const Certifications: FC = () => (
  <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-8 border border-slate-300 dark:border-slate-900 rounded-md">
    <h2>I have gotten some courses/certifications</h2>

    <LinkedinLink
      className="text-gray-800 dark:text-gray-100 hover:text-white mt-2"
      complement="details/certifications/"
    >
      <HighlightedContent>
        <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75 font-semibold">
          Check My Certifications!
        </span>
      </HighlightedContent>
    </LinkedinLink>
  </div>
);
