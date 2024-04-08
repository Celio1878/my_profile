import { FC } from "react";
import { languages } from "@/utils/languages";
import { useParams, usePathname, useRouter } from "next/navigation";

interface Props {
  lang_route: string | string[] | undefined;
}

export const SelectLanguages: FC<Props> = ({ lang_route }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams();

  function remove_lang_from_route(route: string) {
    return route.replace(`/${lang}`, "");
  }

  const current_route = remove_lang_from_route(pathname);

  function change_language(lang: string) {
    return router.push(`/${lang}${current_route}`);
  }

  return (
    <select
      className="py-3 rounded-md text-slate-800 dark:text-slate-200 dark:bg-black border border-slate-300 dark:border-slate-700 my-2 bg-slate-50 cursor-pointer hover:bg-slate-200 hover:dark:bg-gray-700 transition delay-75"
      onChange={(event) => change_language(event.target.value)}
      value={lang_route}
    >
      {languages.map((lang) => (
        <option
          key={lang.name}
          value={lang.href}
          className="text-black dark:text-gray-50 cursor-pointer"
        >
          {lang.badge} {lang.name}
        </option>
      ))}
    </select>
  );
};
