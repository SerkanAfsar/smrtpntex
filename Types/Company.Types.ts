import { AddAddressType, AddressType } from "./Address.Types";
import { PageIndexType } from "./Common.Types";
import { DistrubitorType } from "./Distrubitor.Types";

export type CompanyType = Omit<DistrubitorType, "DistributorGuid"> & {
  CompanyGuid: string;
  DistributorId: number;
  addresses?: AddressType[];
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

export type CompanyCreditCartListType = PageIndexType & {
  keywords?: string;
};

export type CurrentAccountListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type CompanyInvoiceListType = PageIndexType & {
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
  Id?: number | null;
  paymentMethodId: number | string;
  title: string;
  taxNumber: string;
  taxOffice: string;
  alertLimit: number;
  riskLimit: number;
  isActive: boolean;
  addresses?: AddAddressType[];
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

export type CreditCartType = {
  FirstName: string;
  LastName: string;
  CompanyName: string;
  UserName: string;
  Title: string;
  MemberId: number;
  CardToken: string;
  CardMask: string;
  BinNumber: string;
  BankIssuer: string;
  BrandName: string;
  ProgramName: string;
  BankCode: string;
  IsDefault: boolean;
  IsActive: boolean;
  IsDeleted: boolean;
  DeletedById: string | number | null;
  DeletedDate: string | number | null;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};

export type CompanyInvoiceType = {
  CompanyId: string | number | null;
  MemberId: string | number | null;
  Title: string;
  Vkn: string;
  TaxOffice: string | number | null;
  Email: string | number | null;
  Gsm: string | number | null;
  BillingAddress: string | null;
  BillingCity: string | null;
  BillingTown: string | null;
  LineName: string;
  TaxRatio: number;
  Total: number;
  TrackingNumber: string;
  InvoiceType: string | number | null;
  InvoiceDate: string;
  InvoiceNumber: string;
  Ettn: string;
  ResultCode: string | number | null;
  ResultMessage: string;
  IsSuccess: boolean;
  SendTries: number;
  SendStatus: number;
  ScheduledSendingDate: string;
  SendingDate: string | null;
  CreatedDate: string;
  Id: number;
};
