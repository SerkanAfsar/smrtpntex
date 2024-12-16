import { PageIndexType } from "./Common.Types";

export type ProductType = {
  name: string;
  CategoryId: number;
  SerialNumberTypeId: number;
  SerialCode: string;
  Sku: string;
  UnitId: number;
  Quantity: number;
  Point: number;
  IsApprovalShopping: boolean;
  IsAutoCode: boolean;
  CodeLength: number;
  CodePrefix: string;
  Review: number;
  Sort: number;
  IsActive: boolean;
  CreatedDate: string;
  ProductPictureId: number;
  FileDataId: number;
  FileName: string;
  Extension: string;
  ProductName: string;
  Description: string;
  FileGuid: string;
  Id: number;
};

export type ProductListType = PageIndexType & {
  categoryId?: number;
  productName?: string;
  status?: boolean;
};

export type AddProductType = {
  name: string;
  description: string;
  categoryId: number;
  sku: string;
  unitId: number;
  amount: number;
  sort: number;
  isActive: boolean;
};
