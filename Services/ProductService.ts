import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { ProductListType, ProductType } from "@/Types/Product.Types";

export async function GetAllProducts({
  searchType,
}: {
  searchType: ProductListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Product/list",
    body: searchType,
  })) as ResponseResult<PaginationType<ProductType>>;
}
