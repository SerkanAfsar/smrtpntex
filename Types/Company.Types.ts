import { PageIndexType } from "./Common.Types";
import { DistrubitorType } from "./Distrubitor.Types";

export type CompanyType = Omit<DistrubitorType, "DistributorGuid"> & {
  CompanyGuid: string;
  DistributorId: number;
};

export type CompanyListType = PageIndexType & {
  status?: string;
  keywords?: string;
};

export type CompanySalesListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type CompanyUserListType = PageIndexType & {
  keywords?: string;
};

export type CompanyCarListType = PageIndexType & {
  keywords?: string;
};

export type CurrentAccountListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type OtorizationsListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type AddCompanyType = {
  paymentMethodId: number;
  title: string;
  taxNumber: string;
  taxOffice: string;
  alertLimit: number;
  riskLimit: number;
  isActive: boolean;
};

export type CompanySalesType = {
  UserName: string;
  DisplayName: string;
  CompanyName: string;
  StationName: string;
  TankName: string;
  DistributorId: number | null;
  MemberId: number;
  StationId: number;
  TankId: number;
  UniqueId: number;
  ProductId: number;
  PaymentMethodId: number;
  PlateNumber: string;
  UnitPrice: number;
  DistributorPrice: number | null;
  Liter: number;
  NewAmount: number;
  DiscountRatio: number;
  Total: number;
  SaleDate: string;
  CreatedDate: string;
  Id: number;
};

export type CompanyUserType = {
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

export type CurrentAccountType = {
  PaymentMethodName: string;
  MemberName: string;
  CompanyName: string;
  UserName: string;
  PaymentMethodId: number;
  DistributorId: number;
  CompanyId: number;
  MemberId: number;
  Revenue: number;
  Expense: number;
  Description: string;
  IsDeleted: boolean;
  DeletedById: string | number;
  DeletedDate: string | number;
  CreatedById: string | number;
  CreatedDate: string;
  Id: number;
};

export type OtorizationType = {
  CreditCardId: number;
  OrderId: number;
  ActionName: string;
  Amount: number;
  Alias: string;
  RefNo: string;
  ReturnCode: string;
  ReturnMessage: string;
  StatusText: string;
  ResponseText: string;
  CreatedDate: string;
  CardMask: string;
  OrderNumber: string;
  UserName: string;
  CompanyName: string;
};

export type CompanyCarType = {
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
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};
