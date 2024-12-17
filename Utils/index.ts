import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const isNotNullOrUndefied = (val: any): boolean => {
  return !!val && (String(val) != "null" || String(val) != "undefined");
};
