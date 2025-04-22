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
  Description: string;
  Amount: string;
};

export type ProductListType = PageIndexType & {
  categoryId?: number;
  productName?: string;
  status?: boolean;
};

export type AddProductType = {
  Id?: number;
  name: string | null;
  description: string | null;
  categoryId: number | null;
  sku: string | null;
  unitId: number | null;
  amount: number | null;
  sort: number | null;
  isActive: boolean | null;

  Name?: string;
  Description?: string;
  ImageUrl?: string;
  CategoryPath?: string;
  CategoryId?: number;
  UnitId?: number;
  Amount?: number;
  Sku?: string;
  IsActive?: boolean;
  Sort?: number;
};
