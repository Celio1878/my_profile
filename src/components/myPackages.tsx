import { FC } from "react";
import { PackageItem } from "@/components/npmPackages";

interface Props {
  dict: {
    packages: {
      description1: string;
      description2_title: string;
      description2_source: string;
      description2_doc: string;
    };
  };
}

export const MyPackages: FC<Props> = ({ dict }) => {
  console.log(dict);

  return (
    <ul className="w-full flex flex-row items-center">
      <PackageItem name="NodeJS App Builder" />
      <PackageItem name="CDK Factory" />
    </ul>
  );
};
