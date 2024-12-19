import { AddUserType, UserListType, UserType } from "@/Types/User.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function GetAllUsersService({
  searchType,
}: {
  searchType: UserListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/User/list",
    body: searchType,
  })) as ResponseResult<PaginationType<UserType>>;
}

export async function RemoveBanService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/User/remove-ban/${id}`,
    body: null,
  })) as ResponseResult<UserType>;
}

export async function GetUserByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/User/getbyid/${id}`,
  })) as ResponseResult<UserType>;
}

export async function AddUserService({ data }: { data: AddUserType }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/User/add`,
    body: data,
  })) as ResponseResult<UserType>;
}

export async function UpdateUserService({
  id,
  data,
}: {
  id: number;
  data: AddUserType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/User/edit/${id}`,
    body: data,
  })) as ResponseResult<UserType>;
}
