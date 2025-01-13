import { AddAddressType } from "./Address.Types";
import { PageIndexType } from "./Common.Types";

export type MemberTypeType = {
  Id: number;
  Description: string;
};

export type MemberListType = PageIndexType & {
  gsm?: string;
  status?: boolean;
};

export type MemberType = {
  // Id: number;
  // MemberTypeName: string;
  // UserName: string;
  // CompanyName: string;
  // Email: string;
  // Gsm: string;
  // DisplayName: string;
  // IsActive: boolean;
  // CreatedDate: string;

  RoleName: string;
  MemberGuid: string;
  MemberTypeId: number;
  MemberTypeName: string | null;
  DistributorId: number | string | null;
  CompanyId: number | string | null;
  StationId: number | string | null;
  PaymentMethodId: number | string | null;
  FirstName: string;
  LastName: string;
  DisplayName: string;
  UserName: string;
  UserName2: string | null;
  Gsm: string;
  Email: string;
  Gender: any;
  AffiliateCode: string;
  CompanyName: string;
  TaxNumber: string;
  TaxOffice: string;
  ProfilePictureFileDataId: number | string | null;
  ProfilePictureUrl: string | null;
  Password: string;
  PasswordSalt: string;
  Password2: string;
  FailedLoginAttempts: number;
  CannotLoginUntilDate: number | string | null;
  LastActivityDate: number | string | null;
  IsDemo: boolean;
  ApprovalStatusId: number;
  ApprovedById: number | string | null;
  ApprovedDate: string;
  IsActive: boolean;
  ActivatedDate: string;
  IsDeleted: boolean;
  DeletedById: number | string | null;
  DeletedDate: number | string | null;
  CreatedById: number | string | null;
  CreatedDate: string;
  Id: number;
};

export type AddMemberType = {
  Id?: number | null;
  memberTypeId: number;
  paymentMethodId: number;
  companyId: number;
  stationId: number;
  gsm: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  taxNumber: string;
  taxOffice: string;
  isActive: boolean;
  addresses?: AddAddressType[];
};
