import type { ReactNode } from "react";

export function HighlightChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
      {children}
    </span>
  );
}
