import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const isNotNullOrUndefied = (val: any): boolean => {
  return !!val && (String(val) != "null" || String(val) != "undefined");
};

export type Nullable<T> = { [K in keyof T]: T[K] | null };

export function makeNullable<T extends object>(obj: T): Nullable<T> {
  const result: Partial<Nullable<T>> = {};
  for (const key in obj) {
    result[key] = null; // Tüm property'leri null yapıyoruz
  }
  return result as Nullable<T>;
}
