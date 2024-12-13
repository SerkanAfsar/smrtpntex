import { PageIndexType } from "./Common.Types";

export type DistrubitorListType = PageIndexType & {
  status?: string;
  keywords?: string;
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
  paymentMethodId: null;
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
