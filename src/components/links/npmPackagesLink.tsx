import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  className?: string;
  complement?: string;
}

export const NpmPackagesLink: FC<Props> = ({
  children,
  className,
  complement = "",
}) => (
  <Link
    {...{
      className,
      id: "npm-packages-link",
      href: `https://www.npmjs.com/${complement}`,
      target: "_blank",
    }}
  >
    {children}
  </Link>
);
