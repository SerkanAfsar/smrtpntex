"use server";
import { BaseFetchType, ResponseResult } from "@/Types/Common.Types";
import { cookies } from "next/headers";

export default async function BaseFetch({
  method,
  url,
  body,
  isFile = false,
}: BaseFetchType) {
  const cookieStore = await cookies();
  try {
    const headers: any = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${cookieStore.get("smartJwt")?.value || ""}`,
    };

    if (isFile) {
      delete headers["Content-Type"];
    }
    const requestHeaders: any = {
      method,
      headers,
    };

    if (body) {
      requestHeaders.body = !isFile ? JSON.stringify(body) : body;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      requestHeaders,
    );
    const result = (await response.json()) as any;
    if (response.ok) {
      return result;
    } else {
      const newResult: ResponseResult<any> = {
        Code: response.status,
        Data: null,
        Message: result.Message,
        IsSuccess: false,
      };
      return newResult;
    }
  } catch (err: unknown) {
    const newResult: ResponseResult<any> = {
      Data: null,
      IsSuccess: false,
    };

    if (typeof err == "string") {
      newResult.Message = err;
      newResult.Code = 500;
    }
    if (err instanceof Error) {
      newResult.Message = err.message;
      newResult.Code = 500;
    }
    return newResult;
  }
}
