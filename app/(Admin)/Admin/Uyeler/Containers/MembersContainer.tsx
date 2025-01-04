"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";

import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import {
  MemberColumnHeaders,
  MemberTypeColumnHeaders,
} from "@/Utils/Variables";

import { useCallback, useEffect, useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import MembersCustomSearch from "../Components/MembersCustomSearch";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import { useMemberModal } from "@/store/useMemberModal";
import { useShallow } from "zustand/shallow";
import AddEditMemberModal from "../Components/AddEditMemberModal";
import { MemberType } from "@/Types/Member.Types";
import { DeleteMemberService } from "@/Services/MemberService";
import { toast } from "react-toastify";

export default function MembersContainer({
  memberTypes,
  companies,
  stations,
  paymentMethods,
}: {
  memberTypes: CustomOptionsType[];
  companies: CustomOptionsType[];
  stations: CustomOptionsType[];
  paymentMethods: CustomOptionsType[];
}) {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [gsm, setGsm] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Üyeler");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [
    isOpenedModal,
    toggleOpenedModal,
    selectedMember,
    setSelectedMember,
    isUpdated,
    setIsUpdated,
  ] = useMemberModal(
    useShallow((state) => [
      state.isOpened,
      state.toggleOpened,
      state.selectedMember,
      state.setSelectedMember,
      state.isUpdated,
      state.setisUpdated,
    ]),
  );

  const editFunc = useCallback(
    async ({ id }: { id: number }) => {
      await setSelectedMember(id);
      toggleOpenedModal(true);
    },
    [setSelectedMember, toggleOpenedModal],
  );

  const deleteFunc = useCallback(
    async ({ id }: { id: number }) => {
      const confirmMessage = confirm(
        "Üyeyi Silmek İstediğinizden Emin misiniz?",
      );
      if (confirmMessage) {
        const result: ResponseResult<MemberType> = await DeleteMemberService({
          id,
        });
        if (result.IsSuccess) {
          toast.success("Üye Silindi", { position: "top-right" });
          setIsUpdated();
        } else {
          return toast.error(result.Message || "Member Delete Error", {
            position: "top-right",
          });
        }
      }
    },
    [setIsUpdated],
  );

  const types: MenuType = {
    Üyeler: {
      searchItems: ["gsm", "status"],
      apiUrl: "/api/member/members",
      columns: MemberColumnHeaders(editFunc, deleteFunc),
    },
    "Üye Tipleri": {
      apiUrl: "/api/member/membertypes",
      searchItems: [],
      columns: MemberTypeColumnHeaders,
    },
  };

  useEffect(() => {
    setGsm("");
    setIsActive(undefined);
  }, [activeMenu]);

  return (
    <>
      <div
        className={cn(
          "flex flex-1 flex-col bg-adminBgColor transition-all",
          isOpened ? "ml-[244px]" : "ml-[62px]",
        )}
      >
        <AdminTopSection className="border-b-0">
          <div className="flex items-center justify-center">
            <div className="mr-3 flex items-center justify-between gap-3">
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
          </div>
          <div className="flex items-center justify-between gap-3">
            {activeMenu == "Üyeler" && (
              <CustomButton
                className="bg-blue-100 p-2 text-blue-500"
                onClick={async () => {
                  await setSelectedMember();
                  toggleOpenedModal(true);
                }}
                icon={PlusSmall}
                title={"Üye Ekle"}
              />
            )}
            <CustomButton
              className="gap-1 bg-green-100 p-2 text-green-600"
              icon={ExportCsvIcon}
              title="Dışa Aktar"
            />
          </div>
        </AdminTopSection>

        <MembersCustomSearch
          setIsActive={setIsActive}
          activeMenu={activeMenu}
          types={types}
          setKeywords={setGsm}
        />
        <CustomDatatable
          columns={types[activeMenu].columns}
          apiUrl={types[activeMenu].apiUrl}
          gsm={gsm}
          isActive={isActive}
          updated={isUpdated}
        />
      </div>
      <AddEditMemberModal
        editData={{
          companyId: (selectedMember?.CompanyId as number) ?? "",
          companyName: (selectedMember?.CompanyName as string) ?? "",
          email: (selectedMember?.Email as string) ?? "",
          firstName: (selectedMember?.FirstName as string) ?? "",
          gsm: (selectedMember?.Gsm as string) ?? "",
          isActive: (selectedMember?.IsActive as boolean) ?? false,
          lastName: (selectedMember?.LastName as string) ?? "",
          memberTypeId: (selectedMember?.MemberTypeId as number) ?? "",
          paymentMethodId: (selectedMember?.PaymentMethodId as number) ?? "",
          stationId: (selectedMember?.StationId as number) ?? "",
          taxNumber: (selectedMember?.TaxOffice as string) ?? "",
          taxOffice: (selectedMember?.TaxOffice as string) ?? "",
          Id: (selectedMember?.Id as number) ?? null,
        }}
        isOpenedModal={isOpenedModal}
        toggleOpenedModal={toggleOpenedModal}
        memberTypes={memberTypes}
        companies={companies}
        stations={stations}
        paymentMethods={paymentMethods}
        setIsUpdated={setIsUpdated}
      />
    </>
  );
}
