import { ToggleThemeButton } from "@/components/buttons/toggleThemeButton";
import { useParams } from "next/navigation";
import { SelectLanguages } from "@/components/selectLanguages";
import { FC } from "react";
import { ContactMe } from "@/components/contactMe";
import { GoBackButton } from "@/components/buttons/goBackButton";

interface Props {
  darkMode: boolean;
  onToggleThemeClick: VoidFunction;
  dict: any;
  should_go_back: boolean;
}

export const Header: FC<Props> = ({
  darkMode,
  onToggleThemeClick,
  dict,
  should_go_back = false,
}) => {
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
      <div
        className={`absolute top-[3.8rem] flex flex-row w-full ${should_go_back ? "items-center justify-between" : "items-end justify-end"} px-4 sm:px-8`}
      >
        {should_go_back && <GoBackButton />}
        <SelectLanguages {...{ lang_route: params.lang }} />
      </div>
    </>
  );
};
