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

export async function DeleteProductService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Product/delete/${id}`,
  })) as ResponseResult<ProductType>;
}

export async function GetProductById({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Product/getbyid/${id}`,
  })) as ResponseResult<ProductType>;
}
