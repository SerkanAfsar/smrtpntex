import { PageIndexType } from "./Common.Types";

export type PriceSearchType = PageIndexType & {
  keywords?: string;
};

export type PriceType = {
  ProductName: string;
  CompanyName: string;
  StationName: string;
  CompanyTax: string;
  StationTax: string;
  MemberName: string;
  MemberUserName: string;
  ProductId: number;
  DistributorId: number;
  CompanyId: number;
  StationId: number;
  MemberId: number;
  NewAmount: number;
  DiscountRatio: number;
  StartDate: string;
  FinishDate: string;
  CreatedById: string | number | null;
  CreatedDate: string;
  Id: number;
};

export type AddPriceType = {
  Id?: number;
  productId: number | string | null;
  companyId: number | string | null;
  stationId: number | string | null;
  memberId: number | string | null;
  newAmount: number | null;
  discountRatio: number | null;
  startDate: string;
  endDate: string;
};

export type ExcelPriceType = {
  "Başlangıç Tarihi": string;
  "Bitiş Tarihi": string;
  "Firma Adı": string;
  "Üye Adı": string;
  "Yeni Fiyat": string;
  "İndirim Oranı": string;
  "Kayıt Tarihi": string;
};
