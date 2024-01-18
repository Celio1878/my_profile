import { FC } from "react";
import Image from "next/image";

export const NpmIcon: FC = () => {
  return (
    <Image
      src="/npm-icon.svg"
      id="npm-icon"
      alt="npm Icon"
      width={40}
      height={40}
      priority
    />
  );
};
