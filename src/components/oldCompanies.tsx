import { FC } from "react";
import { OldCompanyLink } from "@/components/links/oldCompanyLink";

export const OldCompanies: FC = () => (
  <div>
    I&apos;ve worked as
    <span className="font-semibold mx-1">Senior Software Developer</span> at
    <OldCompanyLink
      name="Squadra Digital"
      link="https://www.squadra.com.br/index.html"
    />
    and <span className="font-semibold mx-1">FullStack Developer</span>
    at
    <OldCompanyLink name="Editora Fórum" link="https://editoraforum.com.br/" />
    using many services like
  </div>
);
