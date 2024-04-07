import { MainLayout } from "@/components/shell/mainLayout";
import { AsideMenu } from "@/components/shell/asideMenu";
import { ContactMe } from "@/components/contactMe";
import { Footer } from "@/components/shell/footer";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: {
    lang: string;
  };
}

export default async function PatternsPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  return (
    <MainLayout>
      {/*<GoBackButton />*/}
      <>
        <div className="flex sm:flex-row flex-col w-full sm:justify-center items-center sm:items-baseline">
          <AsideMenu {...{ lang, dict }} />
          <section className="w-full sm:mt-0 h-full flex flex-col items-center justify-center text-black dark:text-gray-50 text-center gap-y-6 mt-28 sm:mt-0">
            <ContactMe {...{ dict }} />
          </section>
        </div>
        <Footer />
      </>
    </MainLayout>
  );
}
