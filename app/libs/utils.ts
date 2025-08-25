import { twMerge } from "tailwind-merge";

// Minimal cn helper compatible with Tailwind v4 without extra deps
export function cn(...inputs: Array<string | undefined | null | false>) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
