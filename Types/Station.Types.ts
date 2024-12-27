import { PageIndexType } from "./Common.Types";

export type StationListType = PageIndexType & {
  status?: boolean;
  stationName?: string;
};

export type AddStationType = {
  title: string;
  brandName: string;
  imageUrl: string;
  taxNumber: string;
  taxOffice: string;
  affiliateCode: string;
  latitude: string;
  longitude: string;
  stationNumber: string;
  stationIP: string;
  isActive: boolean;
  tanks?: AddTankType[];
  id?: number | null;
};

export type StationType = {
  StationGuid: string;
  StationNumber: string;
  StationIP: string;
  Title: string;
  BrandName: string;
  ImageUrl: string;
  TaxNumber: string;
  TaxOffice: string;
  AffiliateCode: string;
  Latitude: string;
  Longitude: string;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | null;
  DeletedDate: string | null;
  CreatedById: string | null;
  CreatedDate: string;
  Id: number;
  tanks?: TankType[];
};

export type TankType = {
  Id: number;
  StationId: number;
  IntegratorId: number;
  Title: string;
  TankGuid: string;
  TankNumber: string;
  CurrentCapacity: number;
  TotalCapacity: number;
  FuellNess: string;
  IsActive: boolean;
  ePumpId: string;
  tankQrList?: TankQrType[];
};

export type AddTankType = {
  stationId: number;
  integratorId: number;
  ePumpId: string;
  title: string;
  tankNumber: string;
  currentCapacity: number;
  totalCapacity: number;
  isActive: boolean;
  id?: number | null;
};

export type TankQrType = {
  Id: number;
  TankId: number;
  PictureId: number;
  PictureUrl: string;
  Scan: number;
};
