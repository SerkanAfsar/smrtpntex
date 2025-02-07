import { PageIndexType } from "./Common.Types";

export type StationListType = PageIndexType & {
  status?: boolean;
  stationName?: string;
};

export type AddStationType = {
  title: string;
  brandId: number;
  taxNumber: string;
  taxOffice: string;
  affiliateCode: string;
  latitude: string;
  longitude: string;
  stationNumber: string;
  stationIP: string;
  isActive: boolean;
  tanks?: AddTankType[];
  priceCode: string;
  remarketingRatio: number;
  purchasePrice: number;
  distributorId: number;
  salePrice: number;
  id?: number | null;
};

export type StationType = {
  DistributorId: number;
  BrandName?: string;
  ImageUrl?: string;
  StationGuid: string;
  StationNumber: string;
  StationIP: string;
  Title: string;
  StationBrandId: number | string;
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
  SalePrice: number;
  Id: number;
  RemarketingRatio: number;
  PriceCode: string;
  PurchasePrice: number;
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

export type StationBrandType = {
  Title: string;
  ImageUrl: string;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};
