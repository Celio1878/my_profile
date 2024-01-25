import { FC } from "react";
import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import Link from "next/link";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
}

export const Header: FC<Props> = ({ darkMode, onToggleThemeClick }) => (
  <header className="flex flex-row w-full h-full items-center justify-between mb-14 px-4 pt-4">
    <ToggleThemeButton
      {...{
        is_dark_theme: darkMode,
        onClick: onToggleThemeClick,
      }}
    />
    <Link
      className="text-black dark:text-white font-bold underline text-xl px-4 py-2 rounded-md hover:text-white hover:bg-emerald-600 transition-colors duration-300 ease-in-out"
      href="mailto:celio1878@hotmail.com?&body=Hi Célio!"
      target="_top"
    >
      Contact Me
    </Link>
  </header>
);
