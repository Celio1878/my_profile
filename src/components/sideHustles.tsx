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
  <div className="flex flex-col items-center justify-center gap-y-6">
    <p>{dict.side_hustles.description}.</p>
    <MyPackages {...{ dict }} />
  </div>
);
