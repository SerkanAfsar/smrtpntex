import { PageIndexType } from "./Common.Types";

export type ProductType = {
  Locales: any[];
  Name: string;
  CategoryPath: string;
  CategoryId: number;
  SerialNumberTypeId: number;
  SerialCode: string | null;
  Sku: string;
  UnitId: number;
  Quantity: number;
  Point: number;
  IsApprovalShopping: boolean | null;
  IsAutoCode: boolean | null;
  CodeLength: number | null;
  CodePrefix: string | null;
  ImageUrl: string;
  Sort: number;
  IsActive: boolean;
  AvailableCategories: any[];
  AvailableNumberTypes: any[];
  AvailableUnits: any;
  ProductPictureSearchModel: { [key: string]: any };
  AddPictureModel: { [key: string]: any };
  Id: number;
  CustomProperties: { [key: string]: any };
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
