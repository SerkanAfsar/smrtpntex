"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useEffect, useState } from "react";
import PetronetCustomSearch from "../Components/PetronetCustomSearch";
import { ExportCsvIcon } from "@/Utils/IconList";
import { cn } from "@/Utils";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import {
  PetronetDealerColumns,
  PetronetDealerSalesColumns,
  PetronetTankSimulesColumns,
  PetronetTankStatusHeaders,
  PetronetTransactionsColumns,
} from "@/Utils/Variables";
import {
  ExcelPetronetBayilerList,
  ExcelPetronetSatislarList,
  ExcelPetronetTankDolulukOranlariList,
  ExcelPetronetTankDurumlariList,
  ExcelPetronetTankHareketleriList,
} from "@/Services/Excel.Service";

export type PetronetItemsType = {
  apiUrl: string;
  searchItems: string[];
  columns?: any;
  addButton?: any;
  excelCommand?: any;
};

export type MenuType = Record<string, PetronetItemsType>;

const types: MenuType = {
  Bayiler: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/petronet/dealers",
    columns: PetronetDealerColumns,
    excelCommand: ExcelPetronetBayilerList,
  },
  Satışlar: {
    apiUrl: "/api/petronet/dealer-sales",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: PetronetDealerSalesColumns,
    excelCommand: ExcelPetronetSatislarList,
  },
  "Tank Durumları": {
    apiUrl: "/api/petronet/tank-status",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: PetronetTankStatusHeaders,
    excelCommand: ExcelPetronetTankDurumlariList,
  },
  "Tank Hareketleri": {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/petronet/transactions",
    columns: PetronetTransactionsColumns,
    excelCommand: ExcelPetronetTankHareketleriList,
  },
  "Tank Doluluk Oranları": {
    apiUrl: "/api/petronet/tank-simules",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: PetronetTankSimulesColumns,
    excelCommand: ExcelPetronetTankDolulukOranlariList,
  },
};

export default function PetronetContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Bayiler");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  useEffect(() => {
    setKeywords("");
    setStartDate("");
    setEndDate("");
    setIsActive(undefined);
  }, [activeMenu]);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-b">
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
        <div>
          {types[activeMenu].excelCommand && (
            <CustomButton
              className="gap-1 bg-green-100 p-2 text-green-600"
              icon={ExportCsvIcon}
              disabled={excelLoading}
              title={!excelLoading ? "Dışa Aktar" : "Excel Çıktısı Alınıyor"}
              onClick={async () => {
                setExcelLoading(true);
                await types[activeMenu].excelCommand({
                  keywords,
                  status: isActive != undefined ? isActive : undefined,
                  startDate,
                  endDate,
                });
                setExcelLoading(false);
              }}
            />
          )}
        </div>
      </AdminTopSection>
      <PetronetCustomSearch
        types={types}
        activeMenu={activeMenu}
        setKeywords={setKeywords}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIsActive={setIsActive}
        startDate={startDate}
        endDate={endDate}
      />
      <CustomDatatable
        apiUrl={types[activeMenu].apiUrl}
        columns={types[activeMenu].columns}
        startDate={startDate}
        endDate={endDate}
        keywords={keywords}
        isActive={isActive}
      />
    </div>
  );
}
