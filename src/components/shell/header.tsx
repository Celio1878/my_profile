import { FC } from "react";
import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import { Locales } from "@/components/shell/locales";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
}

export const Header: FC<Props> = ({ darkMode, onToggleThemeClick }) => {
  return (
    <header className="flex flex-row w-full h-40 items-center justify-between">
      <ToggleThemeButton
        {...{
          is_dark_theme: darkMode,
          onClick: onToggleThemeClick,
        }}
      />
      <Locales />
    </header>
  );
};
