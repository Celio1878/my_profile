import { MainLayout } from "@/components/shell/mainLayout";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: {
    lang: string;
  };
}

export default async function BackendPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <MainLayout {...{ lang, dict, should_go_back: true }}>
      <></>
    </MainLayout>
  );
}
