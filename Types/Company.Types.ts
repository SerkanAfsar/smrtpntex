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

export type AddCompanyType = {
  paymentMethodId: number;
  title: string;
  taxNumber: string;
  taxOffice: string;
  alertLimit: number;
  riskLimit: number;
  isActive: boolean;
};
