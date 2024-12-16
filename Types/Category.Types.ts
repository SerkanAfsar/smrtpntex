import { PageIndexType } from "./Common.Types";

export type CategoryType = {
  parentId: number;
  name: string;
  description: string;
  sort: number;
  Id: number;
  IsActive: boolean;
};

export type CategoryListType = PageIndexType & {

};
