import { FC } from "react";
import Link from "next/link";

interface Props {
  dict: {
    job: {
      title: string;
      description: string;
      as: string;
      at: string;
      area: string;
      services: string;
    };
  };
}

export const CurrentJob: FC<Props> = ({ dict }) => (
  <div>
    <h1 className="text-2xl font-semibold underline mb-4">{dict.job.title}</h1>
    <p>
      {dict.job.description}{" "}
      <span className="font-semibold">{dict.job.as}</span> {dict.job.at}
      <Link
        href="https://www.itau.com.br"
        className="underline mx-2 hover:text-orange-500 trasition delay-75"
      >
        Itaú Unibanco
      </Link>
      {dict.job.area}
    </p>
    <div>{dict.job.services}</div>
  </div>
);
