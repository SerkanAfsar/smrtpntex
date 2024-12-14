import { PageIndexType } from "./Common.Types";

export type BpOrderListType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};

export type BpOrderType = {
  OrderCode: string;
  CompanyName: string;
  StationCode: string;
  StationName: string;
  StockCode: string;
  Quantity: number;
  OrderDate: string;
  StateNumber: number;
  StateMessage: string;
  WayBillCode: string;
  WayBillDate: string;
  WayBillQuantity: number;
  InvoiceCode: string;
  InvoiceDate: string;
  InvoiceQuantity: number;
  UnitPrice: number;
  VatIncludedPrice: number;
  VatExcludedPrice: number;
  LastModifiedDate: number;
  CreatedDate: string;
  Id: number;
};

export type AddBpOrderType = {
  stationCode: string;
  quantity: number;
  orderDate: string;
};

export type BpOrderStationType = {
  Code: string;
  AccountName: string;
  Address: string;
  CompanyName: string;
  CityName: string;
  DistrictName: string;
  CompanyTaxNumber: string;
  CompanyTaxOffice: string;
  IsActive: boolean;
  Territory: string;
  ISPNumber: string;
  ISPName: string;
  LastModifiedDate: string;
  CreatedDate: string;
  Id: number;
};
