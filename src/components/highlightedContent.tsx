import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const HighlightedContent: FC<Props> = ({ children }) => (
  <div className="flex flex-row">
    {children}
    <span className="relative flex flex-row h-3 w-3 right-2 bottom-1">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    </span>
  </div>
);
