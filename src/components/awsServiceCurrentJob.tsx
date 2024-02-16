import { FC } from "react";
import { aws_services_logos } from "@/utils/iconsList";

export const AwsServiceCurrentJob: FC = () => (
  <ul className="flex flex-wrap w-full md:w-3/5 gap-14 justify-center items-center text-sm mt-6 mb-24">
    {aws_services_logos.map((logo) => (
      <li
        className="flex flex-col items-center hover:underline"
        title={logo.props.alt}
        key={logo.key}
      >
        {logo} {logo.props.alt}
      </li>
    ))}
  </ul>
);
