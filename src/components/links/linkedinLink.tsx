import { FC, ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  className?: string;
  complement?: string;
}

export const LinkedinLink: FC<Props> = ({
  children,
  className,
  complement = "",
}) => (
  <Link
    {...{
      className,
      id: "npm-packages-link",
      href: `https://www.linkedin.com/in/c%C3%A9lio-vieira-6362a284/${complement}`,
      target: "_blank",
    }}
  >
    {children}
  </Link>
);
