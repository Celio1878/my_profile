import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  className?: string;
  complement?: string;
}

export const GithubLink: FC<Props> = ({ children, className, complement }) => (
  <Link
    {...{
      className,
      id: "github-link",
      href: `https://github.com/Celio1878${complement ? `?${complement}` : ""}`,
      target: "_blank",
    }}
  >
    {children}
  </Link>
);
