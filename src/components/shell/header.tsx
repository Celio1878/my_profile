import { FC } from "react";
import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
}

export const Header: FC<Props> = ({ darkMode, onToggleThemeClick }) => {
  return (
    <header className="flex flex-row w-full h-full items-center justify-between">
      <ToggleThemeButton
        {...{
          is_dark_theme: darkMode,
          onClick: onToggleThemeClick,
        }}
      />
    </header>
  );
};
