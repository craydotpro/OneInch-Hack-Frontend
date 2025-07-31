import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const prettifyAddress = (hash: string = "") =>
  hash.substr(0, 6) + "..." + hash.substr(-4);
export const readableError = (error: any) =>
  String(
    error?.response?.data?.error ||
      error?.response?.data ||
      error ||
      "Something Went Wrong"
  );
