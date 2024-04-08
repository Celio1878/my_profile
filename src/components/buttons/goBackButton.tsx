"use client";

import { FC } from "react";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import { useRouter } from "next/navigation";

export const GoBackButton: FC = () => {
  const router = useRouter();

  return (
    <button
      className="flex flex-row text-black dark:text-white p-1 rounded-full border hover:border-gray-300 hover:bg-gray-300 hover:text-white transition delay-75 ease-in-out"
      onClick={router.back}
      aria-label="Go back"
      title="Go back"
    >
      <span className="relative top-[.15rem] left-[.1rem] rotate-180">
        <RightArrowIcon {...{ width: 25, height: 25 }} />
      </span>
    </button>
  );
};
