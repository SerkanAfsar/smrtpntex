"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn, exportToExcel } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { useCallback, useMemo, useState } from "react";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";

import CustomDatatable from "@/Components/UI/CustomDataTable";
import {
  KullanicilarDataTableColumns,
  RollerDataTableColumns,
} from "@/Utils/KullanicilarUtils";
import {
  GetAllUsersService,
  GetUserByIdService,
  RemoveBanService,
} from "@/Services/UserService";
import { ResponseResult } from "@/Types/Common.Types";
import { toast } from "react-toastify";
import UserDetailModal from "../Components/UserDetailModal";
import { useUserModal } from "@/store/useUserModal";

import { useShallow } from "zustand/shallow";
import { UserType } from "@/Types/User.Types";
import UserRoleCustomSearch from "../Components/UsersCustomSearch";
import { useRoleModal } from "@/store/useRoleModal";
import RoleDetailModal from "../Components/RoleDetailModal";
import { RoleType } from "@/Types/Role.Types";
import { GetRoleByIdService } from "@/Services/RoleService";
import { useExcel } from "@/store/useExcel";
import { ExcelKullanicilarDataType } from "@/Types/Excel.Types";

export default function UsersContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [
    toggleOpened,
    isOpenedModal,
    setUpdated,
    selectedUserId,
    setSelectedUser,
    updated,
  ] = useUserModal(
    useShallow((state) => [
      state.toggleOpened,
      state.isOpened,
      state.setUpdated,
      state.selectedId,
      state.setSelectedUser,
      state.updated,
    ]),
  );

  const [
    toggleOpenedRole,
    isOpenedModalRole,
    setUpdatedRole,
    selectedIdRole,
    setSelectedRole,
    updatedRole,
  ] = useRoleModal(
    useShallow((state) => [
      state.toggleOpened,
      state.isOpened,
      state.setUpdated,
      state.selectedId,
      state.setSelectedRole,
      state.updated,
    ]),
  );
  console.log("rendered");

  const [keywords, setKeywords] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Kullanıcılar");
  const [userData, setUserData] = useState<UserType | null>();
  const [roleData, setRoleData] = useState<RoleType | null>(null);
  const getData = useExcel((state) => state.data);

  const UnBanFunc = useCallback(async ({ id }: { id: number }) => {
    const result: ResponseResult<any> = await RemoveBanService({ id });
    if (result.IsSuccess) {
      return toast.success("Ceza Kaldırıldı...", {
        position: "top-right",
      });
    } else {
      return toast.error(result.Message, { position: "top-right" });
    }
  }, []);

  const getUserDetailsFunc = useCallback(
    async ({ id }: { id: number }) => {
      const result: ResponseResult<UserType> = await GetUserByIdService({
        id,
      });
      if (result.IsSuccess) {
        setUserData(result.Data as UserType);
        setSelectedUser(id);
        toggleOpened();
      } else {
        return toast.error(result.Message || "Hata", { position: "top-right" });
      }
    },
    [toggleOpened, setSelectedUser],
  );

  const getRoleDetailFunc = useCallback(
    async ({ id }: { id: number }) => {
      const result: ResponseResult<RoleType> = await GetRoleByIdService({
        id,
      });
      if (result.IsSuccess) {
        setRoleData(result.Data as RoleType);
        setSelectedRole(id);
        toggleOpenedRole();
      } else {
        return toast.error(result.Message || "Hata", { position: "top-right" });
      }
    },
    [toggleOpenedRole, setSelectedRole],
  );

  const types = useMemo<MenuType>(() => {
    return {
      Kullanıcılar: {
        searchItems: ["aranacak"],
        apiUrl: "/api/users/userlist",
        columns: KullanicilarDataTableColumns(
          async ({ id }: { id: number }) => UnBanFunc({ id }),
          async ({ id }: { id: number }) => await getUserDetailsFunc({ id }),
        ),
        addButton: (
          <CustomButton
            className="P-2 bg-blue-100 text-blue-500"
            onClick={() => {
              setSelectedUser(undefined);
              setUserData(null);
              toggleOpened();
            }}
            icon={PlusSmall}
            title={"Kullanıcı Ekle"}
          />
        ),
      },
      Roller: {
        searchItems: ["aranacak"],
        apiUrl: "/api/users/rolelist",
        columns: RollerDataTableColumns(
          async ({ id }: { id: number }) => await getRoleDetailFunc({ id }),
        ),
        addButton: (
          <CustomButton
            className="P-2 bg-blue-100 text-blue-500"
            onClick={() => {
              setSelectedRole(undefined);
              setRoleData(null);
              toggleOpenedRole();
            }}
            icon={PlusSmall}
            title={"Rol Ekle"}
          />
        ),
      },
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex flex-1 flex-col bg-adminBgColor transition-all",
          isOpened ? "ml-[244px]" : "ml-[62px]",
        )}
      >
        <AdminTopSection className="border-b">
          <div className="flex items-center gap-3">
            {Object.keys(types).map((key: string, index: number) => (
              <CustomButton
                key={index}
                className={cn(
                  "gap-1 rounded-md border p-2 px-3",
                  activeMenu == key
                    ? "border-black bg-gray-900 text-white"
                    : "bg-white text-black",
                )}
                onClick={() => setActiveMenu(key)}
                title={key}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            {types[activeMenu].addButton}
            {activeMenu == "Kullanıcılar" && (
              <CustomButton
                className="gap-1 bg-green-100 p-2 text-green-600"
                icon={ExportCsvIcon}
                title="Dışa Aktar"
                onClick={async () => {
                  const result: UserType[] = await getData(GetAllUsersService);
                  const resultData: ExcelKullanicilarDataType[] = result.map(
                    (item: UserType) => ({
                      "E-Posta": item.Email,
                      "Kullanıcı Adı": item.UserName,
                      Ad: item.FullName,
                      "Rol İsmi": item.RoleName,
                      Aktif: item.IsActive ? "Aktif" : "Pasif",
                    }),
                  );
                  exportToExcel(resultData, "Kullanıcılar");
                }}
              />
            )}
          </div>
        </AdminTopSection>
        <UserRoleCustomSearch
          activeMenu={activeMenu}
          setKeywords={setKeywords}
          types={types}
        />
        <CustomDatatable
          columns={types[activeMenu].columns}
          apiUrl={types[activeMenu].apiUrl}
          keywords={keywords}
          updated={updated || updatedRole}
        />
      </div>
      <UserDetailModal
        isOpenedModal={isOpenedModal}
        setUpdated={setUpdated}
        toggleOpened={toggleOpened}
        userData={userData ?? null}
        title={selectedUserId ? "Kullanıcı Güncelle" : "Kullanıcı Ekle"}
      />
      <RoleDetailModal
        isOpenedModal={isOpenedModalRole}
        setUpdated={setUpdatedRole}
        toggleOpened={toggleOpenedRole}
        roleData={roleData ?? null}
        title={selectedIdRole ? "Rol Güncelle" : "Rol Ekle"}
      />
    </>
  );
}
