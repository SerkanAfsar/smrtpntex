import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import BaseFetch from "./BaseService";
import {
  HelpDescCommonType,
  HelpDescItemType,
  HelpDescSearchType,
} from "@/Types/Help.Types";

export async function GetHelpDescStatusService() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/HelpDesk/status",
  })) as ResponseResult<PaginationType<HelpDescCommonType>>;
}

export async function GetHelpDescSubjectsService() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/HelpDesk/subjects",
  })) as ResponseResult<PaginationType<HelpDescCommonType>>;
}

export async function GetHelpDescListService({
  searchType,
}: {
  searchType: HelpDescSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/HelpDesk/list",
    body: searchType,
  })) as ResponseResult<PaginationType<HelpDescItemType>>;
}
