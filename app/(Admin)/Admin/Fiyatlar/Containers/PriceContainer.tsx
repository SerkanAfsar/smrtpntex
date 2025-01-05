"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { useMemo, useState } from "react";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import CustomDatatable from "@/Components/UI/CustomDataTable";

import { PriceHeaderColumns } from "@/Utils/PriceUtils";

import CustomPriceSearch from "../Components/CustomPriceSearch";
import { ExportPriceList } from "@/Services/PriceService";

export default function PriceContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  //   const [
  //     toggleOpened,
  //     isOpenedModal,
  //     setUpdated,
  //     selectedUserId,
  //     setSelectedUser,
  //     updated,
  //   ] = useUserModal(
  //     useShallow((state) => [
  //       state.toggleOpened,
  //       state.isOpened,
  //       state.setUpdated,
  //       state.selectedId,
  //       state.setSelectedUser,
  //       state.updated,
  //     ]),
  //   );

  const [keywords, setKeywords] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Fiyat Listesi");
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  //   const getUserDetailsFunc = useCallback(
  //     async ({ id }: { id: number }) => {
  //       const result: ResponseResult<UserType> = await GetUserByIdService({
  //         id,
  //       });
  //       if (result.IsSuccess) {
  //         setUserData(result.Data as UserType);
  //         setSelectedUser(id);
  //         toggleOpened();
  //       } else {
  //         return toast.error(result.Message || "Hata", { position: "top-right" });
  //       }
  //     },
  //     [toggleOpened, setSelectedUser],
  //   );

  //   const deleteUserFunc = useCallback(
  //     async ({ id }: { id: number }) => {
  //       const confirmMessage = confirm(
  //         "Bu Üyeyi Kaldırmak İstediğinizden Emin misiniz?",
  //       );
  //       if (confirmMessage) {
  //         const result: ResponseResult<UserType> = await DeleteUserService({
  //           id,
  //         });
  //         if (result.IsSuccess) {
  //           setUpdated();
  //           return toast.success("Üye Kaldırıldı", { position: "top-right" });
  //         } else {
  //           return toast.error(result.Message || "User Remove Err", {
  //             position: "top-right",
  //           });
  //         }
  //       }
  //     },
  //     [setUpdated],
  //   );

  //   const getRoleDetailFunc = useCallback(
  //     async ({ id }: { id: number }) => {
  //       const result: ResponseResult<RoleType> = await GetRoleByIdService({
  //         id,
  //       });
  //       if (result.IsSuccess) {
  //         setRoleData(result.Data as RoleType);
  //         setSelectedRole(id);
  //         toggleOpenedRole();
  //       } else {
  //         return toast.error(result.Message || "Hata", { position: "top-right" });
  //       }
  //     },
  //     [toggleOpenedRole, setSelectedRole],
  //   );

  const types = useMemo<MenuType>(() => {
    return {
      "Fiyat Listesi": {
        searchItems: ["aranacak"],
        apiUrl: "/api/prices",
        columns: PriceHeaderColumns(
          //   async ({ id }: { id: number }) => await getUserDetailsFunc({ id }),
          //   async ({ id }: { id: number }) => await deleteUserFunc({ id }),
          ({ id }: { id: number }) => {
            alert(id);
          },
          ({ id }: { id: number }) => {
            alert(id);
          },
        ),
        addButton: (
          <CustomButton
            className="P-2 bg-blue-100 text-blue-500"
            onClick={() => {
              //   setSelectedUser(undefined);
              //   setUserData(null);
              //   toggleOpened();
            }}
            icon={PlusSmall}
            title={"Kullanıcı Ekle"}
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
            <CustomButton
              className="bg-blue-100 p-2 text-blue-500"
              onClick={async () => {
                // await setSelectedMember();
                // toggleOpenedModal(true);
              }}
              icon={PlusSmall}
              title={"Fiyat Ekle"}
            />
            <CustomButton
              className="gap-1 bg-green-100 p-2 text-green-600"
              icon={ExportCsvIcon}
              title={excelLoading ? "Excel Çıktısı Alınıyor" : "Dışa Aktar"}
              disabled={excelLoading}
              onClick={async () => {
                setExcelLoading(true);
                await ExportPriceList({ keywords: keywords });
                setExcelLoading(false);
              }}
            />
          </div>
        </AdminTopSection>
        <CustomPriceSearch
          activeMenu={activeMenu}
          setKeywords={setKeywords}
          types={types}
        />
        <CustomDatatable
          columns={types[activeMenu].columns}
          apiUrl={types[activeMenu].apiUrl}
          keywords={keywords}
          //   updated={updated || updatedRole}
        />
      </div>
    </>
  );
}
