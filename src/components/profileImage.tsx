import { FC } from "react";
import Image from "next/image";

export const ProfileImage: FC = () => (
  <Image
    src="https://avatars.githubusercontent.com/u/40040827?&v=4"
    className="rounded-full"
    alt="Célio"
    width="150"
    height="150"
  />
);
