import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import { useParams } from "next/navigation";
import { SelectLanguages } from "@/components/selectLanguages";
import { FC } from "react";
import { ContactMe } from "@/components/contactMe";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
  dict: { contact_me: string };
  should_go_back: boolean;
}

export const Header: FC<Props> = ({ darkMode, onToggleThemeClick, dict }) => {
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
        <ContactMe {...{ dict }} />
      </header>
      <div className="absolute top-[3.8rem] flex flex-row w-full items-end justify-end px-4 sm:px-8">
        <SelectLanguages {...{ lang_route: params.lang }} />
      </div>
    </>
  );
};
