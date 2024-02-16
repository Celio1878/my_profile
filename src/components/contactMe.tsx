import { FC } from "react";
import Link from "next/link";

interface Props {
  dict: {
    contact_me: string;
  };
}

export const ContactMe: FC<Props> = ({ dict }) => (
  <div className="absolute top-3.5 right-6">
    <Link
      className="text-black dark:text-white font-bold underline text-xl px-4 py-2 rounded-md hover:text-white hover:bg-emerald-600 transition-colors duration-300 ease-in-out"
      href="mailto:celio1878@hotmail.com?&body=Hi Célio!"
      target="_top"
    >
      {dict.contact_me}
    </Link>
  </div>
);
