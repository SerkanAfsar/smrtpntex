import { PageIndexType } from "./Common.Types";

export type HelpDescCommonType = {
  Result: {
    Id: number;
    Title: string;
  };
  Id: number;
  Exception: any | null;
  Status: number;
  IsCanceled: boolean;
  IsCompleted: boolean;
  IsCompletedSuccessfully: boolean;
  CreationOptions: number;
  AsyncState: any | null;
  IsFaulted: boolean;
};

export type HelpDescItemType = {
  MemberId: number;
  SubjectId: number;
  Comment: string;
  StatusId: number;
  UpdatedDate: any | null;
  UpdatedById: any | null;
  CreatedDate: string;
  Id: number;
};

export type HelpDescSearchType = PageIndexType & {
  subjectId?: number;
  statusId?: number;
  startDate?: string;
  endDate?: string;
};
