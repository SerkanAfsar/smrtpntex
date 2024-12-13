import { PageIndexType } from "./Common.Types";

export type CarListType = PageIndexType & {
  plateNumber?: string;
  keywords?: string;
};

export type CarBrandSearchType = PageIndexType & {
  keywords: string;
};

export type CarAddEditBrandType = {
  title: string;
  isActive: boolean;
};

export type CarType = {
  FirstName: string;
  LastName: string;
  CompanyName: string;
  UserName: string;
  Title: string;
  BrandName: string;
  ModelName: string;
  ClassName: string;
  MemberId: number;
  CarBrandId: number;
  CarModelId: number;
  PlateNumber: string;
  Amount: number;
  ExtraLimit: number;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: string;
  Id: number;
};
