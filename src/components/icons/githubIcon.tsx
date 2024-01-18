import { FC } from "react";
import Image from "next/image";

export const GithubIcon: FC = () => {
  return (
    <Image
      src="/github-icon.svg"
      id="github-icon"
      alt="Github Icon"
      width={40}
      height={40}
      priority
    />
  );
};
