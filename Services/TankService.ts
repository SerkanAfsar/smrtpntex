import { AddTankType, TankQrType, TankType } from "@/Types/Station.Types";
import BaseFetch from "./BaseService";
import { ResponseResult } from "@/Types/Common.Types";

export async function AddTankService({ data }: { data: AddTankType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Station/tank-add",
    body: data,
  })) as ResponseResult<TankType>;
}
export async function UpdateTankService({
  id,
  data,
}: {
  id: number;
  data: AddTankType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Station/tank-edit/${id}`,
    body: data,
  })) as ResponseResult<TankType>;
}
export async function GetAllTanksByStationIdService({
  stationId,
}: {
  stationId: number;
}) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Station/tanks/${stationId}`,
  })) as ResponseResult<TankType>;
}
export async function AddTankQRCodeService({ tankId }: { tankId: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Station/tank-qr-add/${tankId}`,
  })) as ResponseResult<TankQrType>;
}

export async function DeleteTankByIdService({ tankId }: { tankId: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Station/tank-delete/${tankId}`,
  })) as ResponseResult<TankType>;
}
