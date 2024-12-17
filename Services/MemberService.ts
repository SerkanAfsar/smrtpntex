import {
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

export async function GetMemberTypesService() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Member/member-types",
  })) as ResponseResult<MemberTypeType>;
}
