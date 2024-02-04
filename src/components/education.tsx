import { FC } from "react";
import { get_years_of_experience } from "@/utils/get_years_of_experience";
import { LinkedinLink } from "@/components/links/linkedinLink";
import { HighlightedContent } from "@/components/highlightedContent";

interface Props {
  dict: {
    education: {
      title: string;
      job_title: string;
      years_of_experience: string;
      languages_spoken: string;
      major: string;
      post_degree: string;
      check_resume: string;
    };
  };
}

export const Education: FC<Props> = ({ dict }) => (
  <div className="w-9/12 flex flex-col text-center justify-center items-center gap-y-4">
    <p className="text-2xl font-semibold underline">{dict.education.title}</p>
    <ol className="list-disc text-left space-y-3 mb-4 underline">
      <li>
        {dict.education.job_title} +{get_years_of_experience()}{" "}
        {dict.education.years_of_experience};
      </li>
      <li>{dict.education.languages_spoken};</li>
      <li>{dict.education.major};</li>
      <li>{dict.education.post_degree}.</li>
    </ol>
    <LinkedinLink className="text-gray-800 dark:text-gray-100 hover:text-white font-semibold">
      <HighlightedContent>
        <span className="py-2 px-3 border border-sky-100 dark:border-sky-800 rounded-md hover:bg-sky-400 transition delay-75">
          {dict.education.check_resume}
        </span>
      </HighlightedContent>
    </LinkedinLink>
  </div>
);
