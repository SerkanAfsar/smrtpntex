import { PageIndexType } from "./Common.Types";

export type RoleListType = PageIndexType & {
  keywords?: string;
};

export type AddRoleType = {
  name: string;
  description: string;
  isActive: boolean;
};

export type RoleType = {
  Name: string;
  Description: string;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: string;
  Id: number;
  permissionList?: number[];
};
