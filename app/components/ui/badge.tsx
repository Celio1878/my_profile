import * as React from "react";
import { cn } from "~/libs/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
};

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-xs font-medium text-foreground",
  secondary:
    "inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
  outline:
    "inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span ref={ref} className={cn(variants[variant], className)} {...props} />
  ),
);
Badge.displayName = "Badge";
