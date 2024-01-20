import { FC } from "react";
import Link from "next/link";

export const VercelLink: FC = () => (
  <Link
    id="vercel-page"
    className="hover:underline"
    href="https://vercel.com/about"
    target={"_blank"}
  >
    Powered by Vercel
  </Link>
);
