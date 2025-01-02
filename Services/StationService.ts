import {
  AddStationType,
  AddTankType,
  StationListType,
  StationType,
  TankType,
} from "@/Types/Station.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import {
  AddTankQRCodeService,
  AddTankService,
  UpdateTankService,
} from "./TankService";
import { toast } from "react-toastify";

export async function GetAllStationsService({
  searchType,
}: {
  searchType: StationListType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Station/list",
    body: searchType,
  })) as ResponseResult<PaginationType<StationType>>;
}

export async function GetStationByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Station/getbyid/${id}`,
  })) as ResponseResult<StationType>;
}

export async function AddStationService({ data }: { data: AddStationType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Station/add",
    body: data,
  })) as ResponseResult<StationType>;
}

export async function AddTotalTankService({ data }: { data: AddStationType }) {
  const result = !data.id
    ? await AddStationService({ data })
    : await UpdateStationService({ id: data.id, data });

  if (!result.IsSuccess) {
    toast.error(`station Hata ${result.Message}` || "İstasyon Hata", {
      position: "top-right",
    });
    return result;
  }

  const resultData = result.Data as StationType;
  const tankList: AddTankType[] =
    data.tanks?.map((tankItem: AddTankType) => ({
      ...tankItem,
      stationId: resultData.Id,
    })) || [];

  for (let index = 0; index < tankList.length; index++) {
    const elem = tankList[index];
    const tankResult =
      elem.id == 0 || !elem.id
        ? await AddTankService({ data: elem })
        : await UpdateTankService({ id: elem.id as number, data: elem });
    if (!tankResult.IsSuccess) {
      await DeleteStationService({ id: resultData.Id });
      setTimeout(() => {
        toast.error(
          `tankresult hata ${tankResult.Message}` || "Tank Oluşturma Hata",
          {
            position: "top-right",
          },
        );
      }, index * 400);
      return null;
    }
    const tankResultData = tankResult.Data as TankType;

    if (elem.id == 0 || !elem.id) {
      const qrResult = await AddTankQRCodeService({
        tankId: tankResultData.Id,
      });
      if (!qrResult.IsSuccess) {
        await DeleteStationService({ id: resultData.Id });
        toast.error(
          `qr error ${qrResult.Message}` || "Tank Qr Oluşturma Hata",
          {
            position: "top-right",
          },
        );
        return null;
      }
    }
  }
  return result;
}

export async function UpdateStationService({
  id,
  data,
}: {
  id: number;
  data: AddStationType;
}) {
  return (await BaseFetch({
    method: "PUT",
    url: `adminApi/Station/edit/${id}`,
    body: data,
  })) as ResponseResult<StationType>;
}

export async function DeleteStationService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Station/delete/${id}`,
  })) as ResponseResult<StationType>;
}

export async function GetStationBrandTypesService() {
  return (await BaseFetch({
    method: "GET",
    url: `adminApi/Station/brands`,
  })) as ResponseResult<any>;
}
