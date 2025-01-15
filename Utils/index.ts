import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

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

export const exportToExcel = (data: any, fileName: string) => {
  if (data) {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  }
};

export function getResultData<T extends object>(
  responseResult: ResponseResult<PaginationType<T>> | ResponseResult<T>,
  type: "List" | "Simple",
) {
  if (type == "List") {
    const result = responseResult.IsSuccess
      ? (responseResult.Data as PaginationType<T>)
      : undefined;
    return (result?.records as T[]) || [];
  } else {
    const result = responseResult.IsSuccess
      ? (responseResult.Data as T)
      : undefined;
    return result;
  }
}
