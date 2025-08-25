import * as React from "react";
import { cn } from "~/libs/utils";

export function VisuallyHidden({
  as: Comp = "span",
  className,
  children,
  ...props
}: any) {
  return (
    <Comp
      className={cn("sr-only not-sr-only:focus-visible", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
