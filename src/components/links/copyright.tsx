import { FC } from "react";

export const Copyright: FC = () => {
  // Get year updated
  const date = new Date();
  const year = date.getFullYear();

  return (
    <p id="copyright" className="text-sm">
      Copyright © {year} - Célio Vieira. All rights reserved.
    </p>
  );
};
