import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import BaseFetch from "./BaseService";
import {
  AddAddressType,
  AddressType,
  CountryType,
  DistrictsType,
  NeighbourType,
  ProvicesType,
} from "@/Types/Address.Types";

export async function GetAllCountries() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Common/delivery-country",
  })) as ResponseResult<PaginationType<CountryType>>;
}

export async function GetProvicesByCountryId({
  countryId,
}: {
  countryId: number;
}) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Common/delivery-provices/${countryId}`,
  })) as ResponseResult<PaginationType<ProvicesType>>;
}

export async function GetDisctrictsByProvinceId({
  provinceId,
}: {
  provinceId: number;
}) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Common/delivery-districts/${provinceId}`,
  })) as ResponseResult<PaginationType<DistrictsType>>;
}

export async function GetNeighboursByDistrictId({
  districtId,
}: {
  districtId: number;
}) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Common/delivery-neighborhoods/${districtId}`,
  })) as ResponseResult<PaginationType<NeighbourType>>;
}

export async function AddMemberAddressService({
  memberId,
  data,
}: {
  memberId: number;
  data: AddAddressType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Member/address-add/${memberId}`,
    body: data,
  })) as ResponseResult<AddressType>;
}

export async function AddCompanyAddressService({
  companyId,
  data,
}: {
  companyId: number;
  data: AddAddressType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Company/address-add/${companyId}`,
    body: data,
  })) as ResponseResult<AddressType>;
}
