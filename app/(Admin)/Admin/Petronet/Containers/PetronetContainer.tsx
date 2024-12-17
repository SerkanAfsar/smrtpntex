"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import PetronetCustomSearch from "../Components/PetronetCustomSearch";
import { ExportCsvIcon } from "@/Utils/IconList";
import { cn } from "@/Utils";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { PetronetDealersType } from "@/Types/Petronet.Types";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import {
  PetronetDealerColumns,
  PetronetDealerSalesColumns,
  PetronetTankStatusHeaders,
  PetronetTransactionsColumns,
} from "@/Utils/Variables";

export type PetronetItemsType = {
  apiUrl: string;
  searchItems: string[];
  data?: PetronetDealersType[];
  columns?: any;
};

export type MenuType = Record<string, PetronetItemsType>;

const types: MenuType = {
  Bayiler: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/petronet/dealers",
    columns: PetronetDealerColumns,
  },
  Satışlar: {
    apiUrl: "/api/petronet/dealer-sales",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: PetronetDealerSalesColumns,
  },
  "Tank Durumları": {
    apiUrl: "/api/petronet/tank-status",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: PetronetTankStatusHeaders,
  },
  "Tank Hareketleri": {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/petronet/transactions",
    columns: PetronetTransactionsColumns,
  },
  "Tank Doluluk Oranları": {
    apiUrl: "deneme",
    searchItems: ["aranacak", "baslangic", "bitis"],
  },
};

export default function PetronetContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>();
  const [activeMenu, setActiveMenu] = useState<string>("Bayiler");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

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
          <CustomButton
            className="gap-1 bg-green-100 p-2 text-green-600"
            icon={ExportCsvIcon}
            title="Dışa Aktar"
          />
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
