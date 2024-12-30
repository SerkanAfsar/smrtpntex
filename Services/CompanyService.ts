import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddCompanyType,
  CompanyListType,
  CompanySalesListType,
  CompanySalesType,
  CompanyType,
  CompanyUserListType,
  CompanyUserType,
  CurrentAccountListType,
  CurrentAccountType,
  OtorizationsListType,
  OtorizationType,
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

export async function GetCompanyByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Company/getById/${id}`,
  })) as ResponseResult<CompanyType>;
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

export async function CompanyUserListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: CompanyUserListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/users/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CompanyUserType>>;
}

export async function CompanyCurrentAccountListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: CurrentAccountListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/current-accounts/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CurrentAccountType>>;
}

export async function CompanyOtorizationListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: OtorizationsListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/financials/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<OtorizationType>>;
}
