import { FC } from "react";
import { get_years_of_experience } from "@/utils/get_years_of_experience";
import { LinkedinLink } from "@/components/links/linkedinLink";
import { HighlightedContent } from "@/components/highlightedContent";

export const Education: FC = () => (
  <div className="w-9/12 flex flex-col text-center justify-center items-center gap-y-2">
    <p className="text-2xl font-semibold underline">Education</p>
    <ol className="list-disc text-left">
      <li>
        I am a Software Engineer with {get_years_of_experience()} years of
        experience;
      </li>
      <li>Fluent in English and Portuguese;</li>
      <li>Bachelor&apos;s Degree in Computer Science;</li>
      <li>Postgraduate in Cloud Computing Projects and Architecture.</li>
    </ol>
    <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white font-semibold">
      <HighlightedContent>
        <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
          Check My Resume!
        </span>
      </HighlightedContent>
    </LinkedinLink>
  </div>
);
