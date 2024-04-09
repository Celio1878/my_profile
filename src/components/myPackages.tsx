import { FC } from "react";
import { PackageItem } from "@/components/npmPackages";

export const MyPackages: FC = () => {
  return (
    <ul className="w-full flex flex-row items-center justify-around">
      <PackageItem
        {...{
          name: "NodeJS App Builder",
          complement: "package/nodejs-appbuilder",
        }}
      />
      <PackageItem
        {...{ name: "CDK Factory", complement: "package/cdk-factory" }}
      />
    </ul>
  );
};
