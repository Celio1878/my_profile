import { FC } from "react";
import Image from "next/image";

export const LinkedInIcon: FC = () => {
  return (
    <Image
      src="/linkedin-icon.svg"
      id="linkedin-icon"
      alt="LinkedIn Icon"
      width={40}
      height={40}
      priority
    />
  );
};
