import {
  AddBpOrderType,
  BpOrderListType,
  BpOrderStateType,
  BpOrderStationType,
  BpOrderType,
} from "@/Types/BpOrder.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function GetBpOrderListData({
  searchType,
}: {
  searchType: BpOrderListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/BpOrder/list",
    body: searchType,
  })) as ResponseResult<PaginationType<BpOrderType>>;
}

export async function GetBpOrderStationList() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/BpOrder/station-list",
  })) as ResponseResult<PaginationType<BpOrderStationType>>;
}

export async function AddBpOrderService({ data }: { data: AddBpOrderType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/BpOrder/add",
    body: data,
  })) as ResponseResult<AddBpOrderType>;
}

export async function DeleteBpOrderService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/BpOrder/delete/${id}`,
  })) as ResponseResult<AddBpOrderType>;
}

export async function ApproveBpOrderService({ idList }: { idList: number[] }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/BpOrder/approve-selected-order?selectedIds=${idList.join(",")}`,
  })) as ResponseResult<AddBpOrderType>;
}

export async function GetBpOrderStateService() {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Common/order-states`,
  })) as ResponseResult<BpOrderStateType>;
}
