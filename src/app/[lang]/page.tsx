import { MainLayout } from "@/components/shell/mainLayout";
import { MainPage } from "@/components/shell/mainPage";

interface Props {
  params: {
    lang: string;
  };
}

export default function Home({ params: { lang } }: Props) {
  return (
    <MainLayout>
      <MainPage {...{ lang }} />
    </MainLayout>
  );
}
