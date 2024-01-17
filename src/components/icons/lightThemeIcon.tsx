import { FC } from "react";
import Image from "next/image";

export const LightThemeIcon: FC = () => {
  return (
    <Image
      src="/light_theme_icon.svg"
      id="light-theme-icon"
      alt="Light Theme Icon"
      width={25}
      height={25}
      priority
    />
  );
};
