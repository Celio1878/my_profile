"use client";

import { FC } from "react";
import { DarkThemeIcon } from "@/components/icons/darkThemeIcon";
import { LightThemeIcon } from "@/components/icons/lightThemeIcon";

interface Props {
  is_dark_theme: boolean;
  onChange: VoidFunction;
}

export const ToggleThemeButton: FC<Props> = ({ is_dark_theme, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer justify-center">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChange}
        checked={is_dark_theme}
      />
      <span className="relative left-3 w-7 h-7 bg-slate-100 dark:bg-black rounded-full z-10 transition-all duration-1000 peer-checked:translate-x-7">
        {is_dark_theme ? <DarkThemeIcon /> : <LightThemeIcon />}
      </span>
      <span className="flex w-7 h-4 cursor-pointer rounded-full bg-slate-200 border border-slate-300 transition-all duration-1000 peer-checked:bg-slate-800" />
    </label>
  );
};
