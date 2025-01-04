import {
  AddMemberType,
  MemberListType,
  MemberType,
  MemberTypeType,
} from "@/Types/Member.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function GetMemberListService({
  searchType,
}: {
  searchType: MemberListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Member/list",
    body: searchType,
  })) as ResponseResult<PaginationType<MemberType>>;
}

export async function GetMemberByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Member/getbyid/${id}`,
  })) as ResponseResult<MemberType>;
}

export async function GetMemberTypesService() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Member/member-types",
  })) as ResponseResult<PaginationType<MemberTypeType>>;
}

export async function AddMemberService({ data }: { data: AddMemberType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Member/add",
    body: data,
  })) as ResponseResult<MemberType>;
}

export async function UpdateMemberService({
  id,
  data,
}: {
  id: number;
  data: AddMemberType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Member/edit/${id}`,
    body: data,
  })) as ResponseResult<MemberType>;
}

export async function DeleteMemberService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Member/delete/${id}`,
  })) as ResponseResult<MemberType>;
}
