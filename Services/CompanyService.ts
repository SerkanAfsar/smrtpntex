import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddCompanyType,
  CompanyCarListType,
  CompanyCarType,
  CompanyCreditCartListType,
  CompanyInvoiceListType,
  CompanyListType,
  CompanySalesListType,
  CompanySalesType,
  CompanyType,
  CompanyUserListType,
  CompanyUserType,
  CreditCartType,
  CurrentAccountListType,
  CurrentAccountType,
  OtorizationsListType,
  OtorizationType,
} from "@/Types/Company.Types";
import BaseFetch from "./BaseService";
import {
  DistributorCarType,
  DistributorCurrentAccountType,
  DistributorSaleType,
  DistrubitorCarsListType,
  DistrubitorCurrentAccountsListType,
  DistrubitorSaleListType,
} from "@/Types/Distrubitor.Types";

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

export async function DeleteCompanyService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/delete/${id}`,
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

export async function GetCompanySalesListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: DistrubitorSaleListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/sales/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorSaleType>>;
}

export async function GetCompanyCarsListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: DistrubitorCarsListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/cars/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorCarType>>;
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

export async function CompanyCarListService({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: CompanyCarListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/cars/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CompanyCarType>>;
}

export async function GetCompanyCurrentAccountsTypeListService({
  compantId,
  searchType,
}: {
  compantId: number;
  searchType: DistrubitorCurrentAccountsListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/current-accounts/${compantId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorCurrentAccountType>>;
}

export async function GetCompanyCreditCartList({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: CompanyCreditCartListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/credit-cards/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CreditCartType>>;
}

export async function GetCompanyInvoiceList({
  companyId,
  searchType,
}: {
  companyId: number;
  searchType: CompanyInvoiceListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/invoices/${companyId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<CreditCartType>>;
}

export async function UpdateCompanyService({
  id,
  data,
}: {
  id: number;
  data: AddCompanyType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Company/edit/${id}`,
    body: data,
  })) as ResponseResult<CompanyType>;
}
