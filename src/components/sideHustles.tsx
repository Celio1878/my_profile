import { FC } from "react";
import { MyPackages } from "@/components/myPackages";

interface Props {
  dict: {
    side_hustles: {
      title: string;
      description: string;
      subtitle: string;
      kind_of_packages: string;
    };
    packages: {
      description1: string;
      description2_title: string;
      description2_source: string;
      description2_doc: string;
    };
  };
}

export const SideHustles: FC<Props> = ({ dict }) => (
  <>
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold underline mb-2">
        {dict.side_hustles.title}
      </h1>
      <p className="mb-8">{dict.side_hustles.description}.</p>

      <MyPackages {...{ dict }} />
    </div>

    {/*<div className="w-full sm:w-9/12 flex items-center justify-center text-center p-8 border border-slate-300 dark:border-slate-900 rounded-md gap-2">*/}
    {/*  <h3>{dict.side_hustles.subtitle}</h3>*/}
    {/*  <BYSLink />*/}
    {/*  <span className="font-medium">{dict.side_hustles.kind_of_packages}.</span>*/}
    {/*</div>*/}
  </>
);
