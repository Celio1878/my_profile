import { FC, ReactNode } from "react";
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
  description: string | ReactNode;
}

export const PackageItem: FC<PackageItemProps> = ({ name, description }) => {
  return (
    <li className="w-full sm:w-2/5 flex flex-col items-center justify-center text-center border border-slate-200 dark:border-slate-800 py-14 px-20 rounded-md">
      <NpmPackage {...{ name }} />

      <p className="text-center">{description}</p>
    </li>
  );
};
