import { Metadata } from "next";
import UsersContainer from "./Containers/UsersContainer";
import { GetPermissionPagesService } from "@/Services/RoleService";
import { PermissionPageType } from "@/Types/Permission.Types";
export const metadata: Metadata = {
  title: "Kullanıcılar",
};

export type PermissionPageDataType = {
  Permissions: PermissionPageType[];
};

export default async function Page() {
  const result = await GetPermissionPagesService();
  const permissionPages: PermissionPageDataType = result.Data;

  return <UsersContainer permissionPages={permissionPages} />;
}
