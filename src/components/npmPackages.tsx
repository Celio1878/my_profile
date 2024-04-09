import { FC } from "react";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";

interface NpmPackageProps {
  name: string;
  complement?: string;
}

const NpmPackage: FC<NpmPackageProps> = ({ name, complement }) => {
  return (
    <NpmPackagesLink
      className="border-2 border-emerald-500 dark:border-emerald-700 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75 mb-4 text-sm"
      {...{ complement }}
    >
      {name}
    </NpmPackagesLink>
  );
};

interface PackageItemProps {
  name: string;
  complement?: string;
}

export const PackageItem: FC<PackageItemProps> = ({ name, complement }) => {
  return (
    <li className="flex flex-col text-center rounded-md">
      <NpmPackage {...{ name, complement }} />
    </li>
  );
};
