import { DistrubitorSaleListType } from "@/Types/Distrubitor.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { SystemLogType, UserLogType } from "@/Types/Log.Types";

export async function GetUserLogsService({
  searchType,
}: {
  searchType: DistrubitorSaleListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Log/user-logs`,
    body: searchType,
  })) as ResponseResult<PaginationType<UserLogType>>;
}

export async function GetSystemLogsService({
  searchType,
}: {
  searchType: DistrubitorSaleListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Log/system-logs`,
    body: searchType,
  })) as ResponseResult<PaginationType<SystemLogType>>;
}
