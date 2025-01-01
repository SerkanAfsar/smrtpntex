"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import {
  CarBrandHeaderColumns,
  CompanyCarListTypeHeaders,
} from "@/Utils/Variables";
import AraclarCustomSearch from "../Components/AraclarCustomSearch";

import { useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";

import { ExcelAraclarResult } from "@/Services/Excel.Service";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import { useCarBrandModal } from "@/store/useCarBrandModal";
import { useShallow } from "zustand/shallow";
import CarBrandAddEditModal from "../Components/CarBrandAddEditModal";

const types: MenuType = {
  Araçlar: {
    searchItems: ["aranacak", "plateNumber"],
    apiUrl: "/api/cars/getlist",
    columns: CompanyCarListTypeHeaders(null, null),
  },
  Markalar: {
    searchItems: ["aranacak"],
    apiUrl: "/api/cars/carbrand",
    columns: CarBrandHeaderColumns(null, null),
  },
};

export default function AraclarContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [excelLoading, setExcelLoading] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("Araçlar");

  const [isOpenedModal, selectedBrand, setSelectedBrand, toggleOpened] =
    useCarBrandModal(
      useShallow((state) => [
        state.isOpened,
        state.selectedBrand,
        state.setSelectedBrand,
        state.toggleOpened,
      ]),
    );

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
          <div className="flex items-center justify-center gap-2">
            {activeMenu == "Markalar" && (
              <CustomButton
                className="P-2 bg-blue-100 text-blue-500"
                onClick={() => {
                  setSelectedBrand();
                  toggleOpened(true);
                }}
                icon={PlusSmall}
                title={"Marka Ekle"}
              />
            )}

            <CustomButton
              className="gap-1 bg-green-100 p-2 text-green-600"
              icon={ExportCsvIcon}
              disabled={excelLoading}
              title={excelLoading ? "Excel Çıktısı Alınıyor" : "Dışa Aktar"}
              onClick={async () => {
                setExcelLoading(true);
                await ExcelAraclarResult({
                  startDate: "",
                  endDate: "",
                  keywords: keywords ?? "",
                  plateNumber: "",
                });
                setExcelLoading(false);
              }}
            />
          </div>
        </AdminTopSection>
        <AraclarCustomSearch
          setKeywords={setKeywords}
          setPlateNumber={setPlateNumber}
          activeMenu={activeMenu}
          types={types}
          keywords={keywords}
          plateNumber={plateNumber}
        />

        {types[activeMenu].columns && (
          <CustomDatatable
            apiUrl={types[activeMenu].apiUrl}
            columns={types[activeMenu].columns}
            keywords={keywords}
            plateNumber={plateNumber}
          />
        )}
      </div>
      <CarBrandAddEditModal
        brandData={null}
        isOpenedModal={isOpenedModal}
        title="Marka Ekle"
        toggleOpened={toggleOpened}
        setUpdated={null}
      />
    </>
  );
}
