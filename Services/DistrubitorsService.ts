import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddDistributerType,
  DistributorCarType,
  DistributorCompanyType,
  DistributorCurrentAccountType,
  DistributorSaleType,
  DistributorUserType,
  DistrubitorCarsListType,
  DistrubitorCompanyListType,
  DistrubitorCurrentAccountsListType,
  DistrubitorListType,
  DistrubitorSaleListType,
  DistrubitorType,
  DistrubitorUsersListType,
  PaymentMethodType,
} from "@/Types/Distrubitor.Types";
import BaseFetch from "./BaseService";

export async function GetAllDistrubitors({
  searchType,
}: {
  searchType: DistrubitorListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Distributor/List",
    body: searchType,
  })) as ResponseResult<PaginationType<DistrubitorType>>;
}

export async function GetDistributorByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Distributor/getbyid/${id}`,
  })) as ResponseResult<DistrubitorType>;
}

export async function GetPaymentMethodTypes() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Common/payment-methods",
  })) as ResponseResult<PaymentMethodType>;
}

export async function AddDistributorService({
  data,
}: {
  data: AddDistributerType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Distributor/add",
    body: data,
  })) as ResponseResult<DistrubitorType>;
}

export async function UpdateDistributorService({
  id,
  data,
}: {
  id: number;
  data: AddDistributerType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Distributor/edit/${id}`,
    body: data,
  })) as ResponseResult<DistrubitorType>;
}

export async function GetDistributorSalesListService({
  distributorId,
  searchType,
}: {
  distributorId: number;
  searchType: DistrubitorSaleListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Distributor/sales/${distributorId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorSaleType>>;
}

export async function GetDistributorCompaniesListService({
  distributorId,
  searchType,
}: {
  distributorId: number;
  searchType: DistrubitorCompanyListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Distributor/companies/${distributorId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorCompanyType>>;
}

export async function GetDistributorCarsListService({
  distributorId,
  searchType,
}: {
  distributorId: number;
  searchType: DistrubitorCarsListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Distributor/cars/${distributorId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorCarType>>;
}

export async function GetDistributorUsersListService({
  distributorId,
  searchType,
}: {
  distributorId: number;
  searchType: DistrubitorUsersListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Distributor/user/${distributorId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorUserType>>;
}

export async function GetDistributorCurrentAccountsTypeListService({
  distributorId,
  searchType,
}: {
  distributorId: number;
  searchType: DistrubitorCurrentAccountsListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Distributor/current-accounts/${distributorId}`,
    body: searchType,
  })) as ResponseResult<PaginationType<DistributorCurrentAccountType>>;
}
