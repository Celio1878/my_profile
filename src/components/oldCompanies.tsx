import { FC } from "react";
import { OldCompanyLink } from "@/components/links/oldCompanyLink";

interface Props {
  dict: {
    old_companies: {
      description: string;
      squadra_job: string;
      at: string;
      and: string;
      editora_job: string;
      services: string;
    };
  };
}

export const OldCompanies: FC<Props> = ({ dict }) => (
  <div>
    {dict.old_companies.description}
    <span className="font-semibold mx-1">
      {dict.old_companies.squadra_job}
    </span>{" "}
    {dict.old_companies.at}
    <OldCompanyLink
      name="Squadra Digital"
      link="https://www.squadra.com.br/index.html"
    />
    {dict.old_companies.and}{" "}
    <span className="font-semibold mx-1">{dict.old_companies.editora_job}</span>
    {dict.old_companies.at}
    <OldCompanyLink name="Editora Fórum" link="https://editoraforum.com.br/" />
    {dict.old_companies.services}
  </div>
);
