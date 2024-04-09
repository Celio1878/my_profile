import { MainLayout } from "@/components/shell/mainLayout";
import { MainPage } from "@/components/shell/mainPage";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: {
    lang: string;
  };
}

export default async function Home({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <MainLayout
      {...{
        dict,
        lang,
        should_go_back: false,
        aside_menu: "default",
        show_menu_on_top: true,
      }}
    >
      <MainPage {...{ dict }} />
    </MainLayout>
  );
}
