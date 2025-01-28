"use server";

import { AuthValidType, UserTokenType } from "@/Types/Auth.Types";
import { ResponseResult } from "@/Types/Common.Types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const LoginValidSectionAction = async ({
  data,
}: {
  data: AuthValidType;
}) => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/valid`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    },
  );
  const result: ResponseResult<UserTokenType> = await response.json();

  if (result.IsSuccess) {
    const data = result.Data as UserTokenType;
    cookieStore.set("smartJwt", data.Token);
  }
  return result;
};

export const LogoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("smartJwt");
  redirect("/Admin/Login");
};
