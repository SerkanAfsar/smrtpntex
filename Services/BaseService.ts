"use server";
import { BaseFetchType } from "@/Types/Common.Types";
import { cookies } from "next/headers";

export default async function BaseFetch({ method, url, body }: BaseFetchType) {
  const cookieStore = await cookies();
  try {
    const requestHeaders: any = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${cookieStore.get("smartJwt")?.value || ""}`,
      },
    };
    if (body) {
      requestHeaders.body = JSON.stringify(body);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      requestHeaders,
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    }
    throw new Error("err");
  } catch (error) {
    console.log(error);
  }
}
