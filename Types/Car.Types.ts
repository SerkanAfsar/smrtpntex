import { PageIndexType } from "./Common.Types";

export type CarListType = PageIndexType & {
  plateNumber?: string;
  keywords?: string;
};

export type CarBrandSearchType = PageIndexType & {
  keywords?: string;
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

export type CarBrandType = {
  Title: string;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id?: number;
  models?: CarBrandModelType[];
};

export type AddCarBrandType = {
  title: string;
  isActive: boolean;
  models?: AddCarBrandModelType[];
};

export type CarBrandModelType = {
  CarCategoryId: number | string;
  CarBrandId: number;
  Title: string;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};

export type AddCarBrandModelType = {
  brandId: number;
  categoryId: number;
  title: string;
};

export type CarModelCategoryType = {
  Id: number;
  Title: string;
  ClassName: string;
  Liter: number;
  CreatedDate: string;
};
