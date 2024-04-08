import { FC } from "react";

interface CopyrightProps {
  dict: {
    footer: {
      copyright: string;
    };
  };
}

export const Copyright: FC<CopyrightProps> = ({ dict }) => {
  const year = new Date().getFullYear();

  return (
    <p id="copyright" className="text-sm text-center">
      Copyright © {year} - Célio Vieira. {dict.footer.copyright}.
    </p>
  );
};
