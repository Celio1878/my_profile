import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

export const YouTubeLink: FC = () => {
  return (
    <Link href="https://www.youtube.com/@celio1878" target="_blank">
      <Image src="/youtube.svg" alt="My Channel" width={70} height={70} />
    </Link>
  );
};
