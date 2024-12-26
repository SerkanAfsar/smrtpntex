export type PermissionPageType = {
  Id: number;
  PageId: number;
  PageName: string;
  Childrens?: PermissionPageType[];
};
