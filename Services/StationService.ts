import { StationListType, StationType } from "@/Types/Station.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function GetAllStationsService({
  searchType,
}: {
  searchType: StationListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Station/list",
    body: searchType,
  })) as ResponseResult<PaginationType<StationType>>;
}
