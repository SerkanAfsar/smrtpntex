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
  records: T[];
};

export type BaseFetchType = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any | null;
  url: string;
};

export type MenuLinkItemType = {
  icon: any;
  title: string;
  url: string;
  isOpenedForce?: boolean;
};

export type MenuLinkGroupType = {
  sectionName?: string;
  menus: MenuLinkItemType[];
};

export type CustomOptionsType = {
  name: string;
  value: string | number;
};
