import { PageIndexType } from "./Common.Types";

export type DistrubitorListType = PageIndexType & {
  status?: string;
  keywords?: string;
};

export type DistrubitorCompanyListType = PageIndexType & {
  companyName?: string;
  status?: boolean;
};

export type DistrubitorSaleListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type DistrubitorCarsListType = PageIndexType & {
  keywords?: string;
};

export type DistrubitorUsersListType = PageIndexType & {
  keywords?: string;
};

export type DistrubitorCurrentAccountsListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type DistrubitorType = {
  DistributorGuid: string;
  PaymentMethodId: number;
  Title: string;
  TaxNumber: string;
  TaxOffice: string;
  PurchasePrice: number;
  IsLimited: boolean;
  AlertLimit: number;
  RiskLimit: number;
  IsActive: boolean;
  IsDeleted: boolean;
  Id: number;
  CreatedDate: string;
};

export type AddDistributerType = {
  id: number;
  paymentMethodId: number;
  title: string;
  taxNumber: string;
  taxOffice: string;
  limitId: number;
  purchasePrice: number;
  alertLimit: number;
  riskLimit: number;
  isActive: boolean;
};

export type PaymentMethodType = {
  PaymentMethodId: number;
  LanguageId: number;
  Name: string;
  Id: number;
};

export type DistributorSaleType = {
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
  ProvisionId: number;
  PlateNumber: string;
  UnitPrice: number;
  DistributorPrice: string | number | null;
  Liter: number;
  NewAmount: number;
  DiscountRatio: number;
  Total: number;
  SaleDate: string;
  CreatedDate: string;
  Id: number;
};

export type DistributorCompanyType = {
  CompanyGuid: string;
  DistributorId: number;
  PaymentMethodId: number;
  Title: string;
  TaxNumber: string;
  TaxOffice: string;
  AlertLimit: number;
  RiskLimit: number;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};

export type DistributorCarType = {
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

export type DistributorUserType = {
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

export type DistributorCurrentAccountType = {
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
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};
