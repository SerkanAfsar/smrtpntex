export type ResponseResult<T> = {
  Code?: number;
  Message?: string;
  IsSuccess?: boolean;
  Data?: T | T[] | null | PaginationType<T>;
  ErrorList?: string[] | null;
};

export type PageIndexType = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationType<T> = {
  totalPages: number;
  totalCount: number;
  records: T[] | GenericType2<T>;
};

export type GenericType2<T> = {
  IsCompleted: boolean;
  IsCompletedSuccessfully: boolean;
  IsFaulted: boolean;
  IsCanceled: boolean;
  Result: T[];
};

export type BaseFetchType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any | null;
  url: string;
  isFile?: boolean;
};

export type MenuLinkItemType = {
  icon: any;
  title: string;
  url: string;
  isOpenedForce?: boolean;
  clickFunc?: () => Promise<void>;
};

export type MenuLinkGroupType = {
  sectionName?: string;
  menus: MenuLinkItemType[];
};

export type CustomOptionsType = {
  name: string;
  value: string | number;
};

export type Nullable<T> = { [K in keyof T]: T[K] | null };
