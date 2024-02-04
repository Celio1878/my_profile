import { FC } from "react";
import Link from "next/link";
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

export const MyPackages: FC<Props> = ({ dict }) => (
  <ul className="flex flex-col gap-y-4 w-full md:flex-row items-center justify-around">
    <PackageItem
      name="NodeJS App Builder"
      description={`${dict.packages.description1}.`}
    />
    <PackageItem
      name="CDK Factory"
      description={
        <>
          {dict.packages.description2_title}
          <Link
            className="underline mx-1.5 hover:opacity-50 transition delay-75"
            href="https://aws.amazon.com/pt/cdk/"
          >
            {dict.packages.description2_source}
          </Link>
          {dict.packages.description2_doc}.
        </>
      }
    />
  </ul>
);
