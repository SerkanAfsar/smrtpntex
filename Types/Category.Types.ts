import { PageIndexType } from "./Common.Types";

export type CategoryType = {
  Locales: any[];
  Name: string;
  Path: string;
  ParentCategoryId: number;
  Sort: number;
  IsActive: boolean;
  AvailableCategories: any[];
  Id: number;
  CustomProperties: { [key: string]: any };
};

export type AddCategoryType = {
  parentId: number;
  name: string;
  description: string;
  sort: number;
  isActive: boolean;
};

export type GetCategoryType = {
  ParentCategoryId: number | null;
  Sort: number;
  IsActive: boolean;
  CreatedDate: string;
  Id: number;
};

export type CategoryListType = PageIndexType & {};
