import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { CategoryListType, CategoryType } from "@/Types/Category.Types";

export async function GetAllCategories({
  searchType,
}: {
  searchType: CategoryListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Category/list",
    body: searchType,
  })) as ResponseResult<PaginationType<CategoryType>>;
}
