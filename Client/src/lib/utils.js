import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This is what shadcn/ui needs
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

