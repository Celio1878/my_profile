import { FC } from "react";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";

interface NpmPackageProps {
  name: string;
}

const NpmPackage: FC<NpmPackageProps> = ({ name }) => {
  return (
    <NpmPackagesLink
      className="border border-2 border-emerald-500 dark:border-emerald-700 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75 mb-4"
      complement="package/nodejs-appbuilder"
    >
      {name}
    </NpmPackagesLink>
  );
};

interface PackageItemProps {
  name: string;
}

export const PackageItem: FC<PackageItemProps> = ({ name }) => {
  return (
    <li className="w-full flex flex-col items-center justify-center text-center rounded-md">
      <NpmPackage {...{ name }} />
    </li>
  );
};
