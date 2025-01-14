import {
  AddMemberType,
  MemberListType,
  MemberType,
  MemberTypeType,
} from "@/Types/Member.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { AddMemberAddressService } from "./ProvinceService";

export async function GetMemberListService({
  searchType,
}: {
  searchType: MemberListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Member/list",
    body: searchType,
  })) as ResponseResult<PaginationType<MemberType>>;
}

export async function GetMemberByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Member/getbyid/${id}`,
  })) as ResponseResult<MemberType>;
}

export async function GetMemberTypesService() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Member/member-types",
  })) as ResponseResult<PaginationType<MemberTypeType>>;
}

export async function AddMemberService({ data }: { data: AddMemberType }) {
  const result = (await BaseFetch({
    method: "POST",
    url: "adminApi/Member/add",
    body: data,
  })) as ResponseResult<MemberType>;
  if (result.IsSuccess) {
    if (data.addresses) {
      const memberId = (result.Data as MemberType).Id;
      for (let i = 0; i < data.addresses.length; i++) {
        const item = data.addresses[i];
        const resultAddress = await AddMemberAddressService({
          memberId,
          data: item,
        });
        if (!resultAddress.IsSuccess) {
          await DeleteMemberService({ id: memberId });
          const newResponse: ResponseResult<MemberType> = {
            IsSuccess: false,
            Message: "Adres Ekleme Hatası",
          };
          return newResponse;
        }
      }
    }
  }
  return result;
}

export async function UpdateMemberService({
  id,
  data,
}: {
  id: number;
  data: AddMemberType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Member/edit/${id}`,
    body: data,
  })) as ResponseResult<MemberType>;
}

export async function DeleteMemberService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Member/delete/${id}`,
  })) as ResponseResult<MemberType>;
}
