import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import { useParams } from "next/navigation";
import { SelectLanguages } from "@/components/selectLanguages";
import { FC } from "react";

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
            onChange: onToggleThemeClick,
          }}
        />
      </header>
      <div className="absolute top-[3.8rem] flex flex-row w-[95%] items-end justify-end">
        <SelectLanguages {...{ lang_route: params.lang }} />
      </div>
    </>
  );
};
