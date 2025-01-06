import { PageIndexType } from "./Common.Types";

export type UserType = {
  RoleId: number;
  UserGuid: string;
  DistributorId?: number;
  RoleName: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  FullName: string;
  Email: string;
  Gsm: string;
  IsLoginEmailVerification: boolean;
  IsLoginSmsVerification: boolean;
  Password: string;
  PasswordSalt: string;
  FailedLoginAttempts: number;
  CannotLoginUntilDate: string | null;
  ActivatedDate: string | null;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedDate: string;
  Id: number;
  stationBrandId?: number;
  stationId?: number;
};

export type UserListType = PageIndexType & {
  keywords?: string;
};

export type AddUserType = {
  roleId: number;
  distributorId?: number;
  username: string;
  gsm: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stationBrandId?: number;
  stationId?: number;
};

export type UserChangePasswordType = {
  userName: string;
  password: string;
};
