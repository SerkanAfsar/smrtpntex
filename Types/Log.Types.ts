export type SystemLogType = {
  LogLevelId: number;
  ShortMessage: string;
  FullMessage: string;
  IpAddress: string;
  MemberId: string | number | null;
  PageUrl: string;
  ReferrerUrl: string;
  CreatedDate: string;
  LogLevel: number;
  Member: any;
  Id: number;
};

export type UserLogType = {
  AdminUserActivityLogTypeId: number;
  AdminUserId: number;
  Comment: string;
  AdminUserName: string;
  IpAddress: string;
  EntityName: string;
  EntityId: any;
  CreatedDate: string;
  Id: number;
};
