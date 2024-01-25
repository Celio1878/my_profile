import { FC } from "react";
import { MyPackages } from "@/components/myPackages";
import { BYSLink } from "@/components/links/bysLink";

export const SideHustles: FC = () => (
  <>
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold underline mb-2">Side Hustles</h1>
      <p className="mb-8">
        Building different kind of software, I realised that it&apos;s possible
        to create packages (libs) that turn easy the creation of any other
        systems.
      </p>

      <MyPackages />
    </div>

    <div className="w-full sm:w-9/12 flex items-center justify-center text-center p-8 border border-slate-300 dark:border-slate-900 rounded-md gap-2">
      <h3>And I&apos;m using ones in a side hustle I&apos;m working called</h3>
      <BYSLink />
      <span className="font-medium">completely serverless.</span>
    </div>
  </>
);
