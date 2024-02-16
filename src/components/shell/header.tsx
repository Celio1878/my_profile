import { FC } from "react";
import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import { useParams } from "next/navigation";
import { SelectLanguages } from "@/components/selectLanguages";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
}

export const Header: FC<Props> = ({ darkMode, onToggleThemeClick }) => {
  const params = useParams();

  return (
    <>
      <header className="flex flex-row w-full h-full items-center justify-between px-4 py-4 bg-slate-100 dark:bg-black">
        <ToggleThemeButton
          {...{
            is_dark_theme: darkMode,
            onClick: onToggleThemeClick,
          }}
        />
      </header>
      <div className="flex flex-row w-11/12 items-end justify-end">
        <SelectLanguages {...{ lang_route: params.lang }} />
      </div>
    </>
  );
};
