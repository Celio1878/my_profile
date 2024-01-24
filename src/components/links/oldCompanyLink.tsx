import { FC } from "react";
import Link from "next/link";

interface Props {
  name: string;
  link: string;
}

export const OldCompanyLink: FC<Props> = ({ name, link }) => (
  <Link className="mx-2 underline hover:opacity-85" href={link}>
    {name}
  </Link>
);
