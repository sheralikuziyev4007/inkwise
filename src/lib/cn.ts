import { clsx, type ClassValue } from "clsx";

/** Joins conditional class names. Kept tiny on purpose — no runtime merging. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
