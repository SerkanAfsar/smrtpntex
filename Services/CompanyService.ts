import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddCompanyType,
  CompanyListType,
  CompanySalesListType,
  CompanySalesType,
  CompanyType,
} from "@/Types/Company.Types";
import BaseFetch from "./BaseService";

export async function GetAllCompanies({
  searchType,
}: {
  searchType: CompanyListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Company/List",
    body: searchType,
  })) as ResponseResult<PaginationType<CompanyType>>;
}

export async function AddCompanyService({ data }: { data: AddCompanyType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Company/add",
    body: data,
  })) as ResponseResult<CompanyType>;
}

export async function CompanySalesService({
  id,
  searchType,
}: {
  id: number;
  searchType: CompanySalesListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/sales/${id}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CompanySalesType>>;
}
