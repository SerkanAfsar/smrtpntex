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
