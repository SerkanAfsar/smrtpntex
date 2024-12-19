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
};
