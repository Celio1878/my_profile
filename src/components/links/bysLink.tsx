import { FC } from "react";
import Link from "next/link";

export const BYSLink: FC = () => (
  <Link
    className="text-lg font-semibold border border-slate-400 p-2 rounded hover:bg-purple-600 hover:border-slate-50 hover:text-white transition delay-75"
    href="https://beyourstories.com/"
    key="bys"
    id="bys"
    target="_blank"
  >
    Be Your Stories
  </Link>
);
