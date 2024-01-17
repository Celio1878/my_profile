import { FC } from "react";
import Image from "next/image";

export const DarkThemeIcon: FC = () => {
  return (
    <Image
      src="/dark_theme_icon.svg"
      id="dark-theme-icon"
      alt="Dark Theme Icon"
      width={25}
      height={25}
      priority
    />
  );
};
