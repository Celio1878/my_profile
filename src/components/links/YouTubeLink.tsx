import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const YouTubeLink: FC = () => {
  return (
    <Link
      className="hover:opacity-60 transition delay-100"
      href="https://www.youtube.com/@celio1878"
      target="_blank"
    >
      <Image src="/youtube.svg" alt="My Channel" width={80} height={80} />
    </Link>
  );
};
