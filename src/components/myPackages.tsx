import { FC, ReactNode } from "react";
import { NpmPackagesLink } from "@/components/links/npmPackagesLink";
import Link from "next/link";

export const MyPackages: FC = () => (
  <ul className="flex flex-col gap-y-4 w-full md:flex-row items-center justify-around">
    <PackageItem
      name="NodeJS App Builder"
      description="It's possible to create a NodeJS App with a Serverless handler, and with this, you can focus on routes, middlewares and business rules."
    />
    <PackageItem
      name="CDK Factory"
      description={
        <>
          CDK Factory may be used with
          <Link
            className="underline mx-1.5 hover:opacity-50 transition delay-75"
            href="https://aws.amazon.com/pt/cdk/"
          >
            AWS CDK
          </Link>
          and it helps you to create new instances for your Lambda, Api Gateway,
          DynamoDB and many other resources.
        </>
      }
    />
  </ul>
);

interface NpmPackageProps {
  name: string;
}

const NpmPackage: FC<NpmPackageProps> = ({ name }) => {
  return (
    <NpmPackagesLink
      className="border border-2 border-emerald-500 p-6 rounded-md hover:bg-emerald-500 hover:text-white transition delay-75 mb-4"
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

const PackageItem: FC<PackageItemProps> = ({ name, description }) => {
  return (
    <li className="w-full sm:w-2/5 flex flex-col items-center justify-center text-center border border-slate-200 py-14 px-20 rounded-md">
      <NpmPackage {...{ name }} />

      <p className="text-center">{description}</p>
    </li>
  );
};
