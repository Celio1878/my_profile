import { FC } from "react";

interface Props {
  dict: {
    education: {
      degree: string;
    };
  };
}

export const Education: FC<Props> = ({ dict }) => (
  <p className="w-9/12">{dict.education.degree}.</p>
);
