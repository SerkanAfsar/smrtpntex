import { PageIndexType } from "./Common.Types";

export type StatusType = "Waiting" | "Confirmed" | "Rejected";
export type ReconciliationType = {
  DistributorName: string;
  BrandName: string;
  StationName: string;
  RemarketingRatio: number;
  DistributorId: number;
  StationId: number;
  TotalLiter: number;
  TotalAmount: number;
  StatusText: StatusType;
  StartDate: string;
  EndDate: string;
  ProcessDate: string | null;
  CreatedDate: string;
  TotalWithTax: number;
  Id: number;
};

export type ReconciliationSearchType = PageIndexType & {
  keywords?: string;
  startDate?: string;
  endDate?: string;
};
