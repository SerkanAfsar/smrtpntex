import { LoginType, UserTokenType } from "@/Types/Auth.Types";
import BaseFetch from "./BaseService";
import { ResponseResult } from "@/Types/Common.Types";

export const LoginService = async (
  data: LoginType
): Promise<ResponseResult<LoginType>> => {
  const result = await BaseFetch({
    method: "POST",
    url: "adminApi/Auth/login",
    body: data,
  });
  return result as ResponseResult<LoginType>;
};

export const ValidationService = async (
  data: LoginType
): Promise<ResponseResult<UserTokenType>> => {
  const result = await BaseFetch({
    method: "POST",
    url: "adminApi/Auth/valid",
    body: data,
  });
  return result as ResponseResult<UserTokenType>;
};
