import { FC } from "react";
import { OldCompanyLink } from "@/components/links/oldCompanyLink";

export const OldCompanies: FC = () => (
  <div>
    But I&apos;ve already worked as Senior Software Developer at
    <OldCompanyLink
      name="Squadra Digital"
      link="https://www.squadra.com.br/index.html"
    />
    and FullStack Developer at
    <OldCompanyLink name="Editora Fórum" link="https://editoraforum.com.br/" />
    using many services like
  </div>
);
