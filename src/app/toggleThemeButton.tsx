"use client";

import { FC } from "react";
import Image from "next/image";

interface Props {
  is_dark_theme: boolean;
  onClick: VoidFunction;
}

export const ToggleThemeButton: FC<Props> = ({ is_dark_theme, onClick }) => {
  return (
    <button
      className="p-1 rounded-full bg-white dark:bg-black"
      onClick={onClick}
    >
      {is_dark_theme ? (
        <Image
          src="/dark_theme_icon.svg"
          alt="Dark Theme Icon"
          width={25}
          height={25}
          priority
        />
      ) : (
        <Image
          src="/light_theme_icon.svg"
          alt="Light Theme Icon"
          width={25}
          height={25}
          priority
        />
      )}
    </button>
  );
};
