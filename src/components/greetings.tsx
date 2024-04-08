import { FC } from "react";
import { ProfileImage } from "@/components/profileImage";

interface Props {
  dict: {
    greetings: {
      title: string;
    };
  };
}

export const Greetings: FC<Props> = ({ dict }) => {
  return (
    <div className="flex flex-col gap-y-4 text-4xl font-bold items-center justify-center mb-4 mt-14 sm:mt-0">
      <ProfileImage /> {dict.greetings.title}
    </div>
  );
};
