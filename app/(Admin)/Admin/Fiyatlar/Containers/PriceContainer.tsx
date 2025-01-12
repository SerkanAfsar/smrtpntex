"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { useCallback, useMemo, useState } from "react";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import CustomDatatable from "@/Components/UI/CustomDataTable";

import { PriceHeaderColumns } from "@/Utils/PriceUtils";

import CustomPriceSearch from "../Components/CustomPriceSearch";
import {
  DeletePriceService,
  ExportPriceList,
  GetPriceByIdService,
} from "@/Services/PriceService";
import { usePriceModal } from "@/store/usePriceModal";
import { useShallow } from "zustand/shallow";
import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import AddEditPriceModal from "../Components/AddEditPriceModal";
import { PriceType } from "@/Types/Price.Types";
import { toast } from "react-toastify";

export default function PriceContainer({
  companyList,
  stationList,
  productList,
  memberList,
}: {
  companyList: CustomOptionsType[];
  stationList: CustomOptionsType[];
  productList: CustomOptionsType[];
  memberList: CustomOptionsType[];
}) {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [
    toggleOpened,
    isOpenedModal,
    setUpdated,
    selectedPrice,
    setSelectedPrice,
    updated,
  ] = usePriceModal(
    useShallow((state) => [
      state.toggleOpened,
      state.isOpened,
      state.setisUpdated,
      state.selectedPrice,
      state.setSelectedPrice,
      state.isUpdated,
    ]),
  );

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

  const deletePriceFunc = useCallback(
    async ({ id }: { id: number }) => {
      const confirmMessage = confirm(
        "Bu Veriyi Kaldırmak İstediğinizden Emin misiniz?",
      );
      if (confirmMessage) {
        const result: ResponseResult<PriceType> = await DeletePriceService({
          id,
        });
        if (result.IsSuccess) {
          setUpdated();
          return toast.success("Fiyat Kaldırıldı", { position: "top-right" });
        } else {
          return toast.error(result.Message || "User Remove Err", {
            position: "top-right",
          });
        }
      }
    },
    [setUpdated],
  );

  const getPriceDetailFunc = useCallback(
    async ({ id }: { id: number }) => {
      await setSelectedPrice(id);
      toggleOpened(true);
    },
    [setSelectedPrice, toggleOpened],
  );

  const types = useMemo<MenuType>(() => {
    return {
      "Fiyat Listesi": {
        searchItems: ["aranacak"],
        apiUrl: "/api/prices",
        columns: PriceHeaderColumns(
          async ({ id }: { id: number }) => await getPriceDetailFunc({ id }),
          async ({ id }: { id: number }) => await deletePriceFunc({ id }),
        ),
        // addButton: (
        //   <CustomButton
        //     className="P-2 bg-blue-100 text-blue-500"
        //     onClick={async () => {
        //       await setSelectedPrice(undefined);
        //       toggleOpened(true);
        //     }}
        //     icon={PlusSmall}
        //     title={"Kullanıcı Ekle"}
        //   />
        // ),
      },
    };
  }, [deletePriceFunc, getPriceDetailFunc]);

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
                await setSelectedPrice(undefined);
                toggleOpened(true);
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
          updated={updated}
        />
      </div>
      <AddEditPriceModal
        companyList={companyList}
        editData={{
          Id: selectedPrice?.Id ?? undefined,
          companyId: selectedPrice?.CompanyId ?? null,
          discountRatio: selectedPrice?.DiscountRatio ?? 0,
          endDate: selectedPrice?.FinishDate ?? "",
          memberId: selectedPrice?.MemberId ?? null,
          newAmount: selectedPrice?.NewAmount ?? 0,
          productId: selectedPrice?.ProductId ?? null,
          startDate: selectedPrice?.StartDate ?? "",
          stationId: selectedPrice?.StationId ?? null,
        }}
        isOpenedModal={isOpenedModal}
        memberList={memberList}
        productList={productList}
        stationList={stationList}
        toggleOpenedModal={toggleOpened}
        setUpdated={setUpdated}
      />
    </>
  );
}
