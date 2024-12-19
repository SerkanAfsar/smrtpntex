import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { AddRoleType, RoleListType, RoleType } from "@/Types/Role.Types";
import BaseFetch from "./BaseService";

export async function GetAllRolesService({
  searchType,
}: {
  searchType: RoleListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/User/roles",
    body: searchType,
  })) as ResponseResult<PaginationType<RoleType>>;
}

export async function AddRoleService({ data }: { data: AddRoleType }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/User/role-add`,
    body: data,
  })) as ResponseResult<RoleType>;
}

export async function GetRoleByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/User/role/${id}`,
  })) as ResponseResult<RoleType>;
}

export async function UpdateRoleService({
  id,
  data,
}: {
  id: number;
  data: AddRoleType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/User/role-edit/${id}`,
    body: data,
  })) as ResponseResult<RoleType>;
}
