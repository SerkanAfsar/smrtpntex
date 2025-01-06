import { Metadata } from "next";
import UsersContainer from "./Containers/UsersContainer";
import { GetPermissionPagesService } from "@/Services/RoleService";
import { PermissionPageType } from "@/Types/Permission.Types";
import {
  GetAllStationsService,
  GetStationBrandTypesService,
} from "@/Services/StationService";
import { StationBrandType, StationType } from "@/Types/Station.Types";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
export const metadata: Metadata = {
  title: "Kullanıcılar",
};

export type PermissionPageDataType = {
  Permissions: PermissionPageType[];
};

export default async function Page() {
  const result = await GetPermissionPagesService();
  const permissionPages: PermissionPageDataType = result.Data;

  const stationBrandResult = await GetStationBrandTypesService();
  if (!stationBrandResult.IsSuccess) {
    throw new Error(stationBrandResult.Message || "Brand Hata");
  }

  const stationBrands: CustomOptionsType[] = (
    stationBrandResult.Data as StationBrandType[]
  ).map((item) => ({
    name: item.Title,
    value: item.Id,
  }));

  const stationListResult = await GetAllStationsService({
    searchType: {
      pageIndex: 1,
      pageSize: 999999,
    },
  });

  if (!stationListResult.IsSuccess) {
    throw new Error(stationListResult.Message || "Station Hata");
  }

  const resultStation = stationListResult.Data as PaginationType<StationType>;
  const stationList: CustomOptionsType[] = (
    resultStation.records as StationType[]
  ).map((item) => ({
    name: item.Title,
    value: item.Id,
  }));

  return (
    <UsersContainer
      stationBrands={stationBrands}
      permissionPages={permissionPages}
      stationList={stationList}
    />
  );
}
