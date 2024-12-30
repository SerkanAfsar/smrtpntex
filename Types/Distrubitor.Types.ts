import { PageIndexType } from "./Common.Types";

export type DistrubitorListType = PageIndexType & {
  status?: string;
  keywords?: string;
};

export type DistrubitorSaleListType = PageIndexType & {
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
