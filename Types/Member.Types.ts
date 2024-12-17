import { PageIndexType } from "./Common.Types";

export type MemberTypeType = {
  Id: number;
  Description: string;
};

export type MemberListType = PageIndexType & {
  gsm?: string;
  status?: boolean;
};

export type MemberType = {
  Id: number;
  MemberTypeName: string;
  UserName: string;
  CompanyName: string;
  Email: string;
  Gsm: string;
  DisplayName: string;
  IsActive: boolean;
  CreatedDate: string;
};
