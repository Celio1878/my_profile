"use client";

import { FC } from "react";
import { LightThemeIcon } from "@/components/icons/lightThemeIcon";
import { DarkThemeIcon } from "@/components/icons/darkThemeIcon";

interface Props {
  is_dark_theme: boolean;
  onClick: VoidFunction;
}

export const ToggleThemeButton: FC<Props> = ({ is_dark_theme, onClick }) => {
  return (
    <button
      id="toggle-theme-button"
      className="p-1 rounded-full bg-slate-50 dark:bg-black"
      onClick={onClick}
    >
      {is_dark_theme ? <DarkThemeIcon /> : <LightThemeIcon />}
    </button>
  );
};
