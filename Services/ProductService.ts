import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddProductType,
  ProductListType,
  ProductType,
} from "@/Types/Product.Types";

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

export async function AddProductService({ data }: { data: AddProductType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Product/add",
    body: data,
  })) as ResponseResult<ProductType>;
}
