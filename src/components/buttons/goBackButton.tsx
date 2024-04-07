"use client";

import { FC } from "react";
import { RightArrowIcon } from "@/components/icons/rightArrowIcon";
import { useRouter } from "next/navigation";

export const GoBackButton: FC = () => {
  const router = useRouter();

  return (
    <div>
      <button className="flex flex-row text-pink-600" onClick={router.back}>
        <span className="rotate-180">
          <RightArrowIcon />
        </span>{" "}
        Go Back{" "}
      </button>
    </div>
  );
};
