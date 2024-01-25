import { FC } from "react";
import { ProfileImage } from "@/components/profileImage";

export const Saudation: FC = () => (
  <div className="flex flex-col gap-y-4 text-4xl font-bold items-center justify-center">
    Hello, I&apos;m Célio! <ProfileImage />
  </div>
);
