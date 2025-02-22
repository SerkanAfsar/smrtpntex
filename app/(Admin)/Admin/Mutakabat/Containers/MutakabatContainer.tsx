"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useEffect, useState } from "react";

import { cn } from "@/Utils";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import CustomDatatable from "@/Components/UI/CustomDataTable";

import MutakabatCustomSearch from "../Components/MutakabatCustomSearch";
import { ReconciliationColumns } from "@/Utils/ReconciliationUtils";

export type MenuType = Record<string, any>;

const types: MenuType = {
  İstasyonlar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/reconciliation/station",
    columns: ReconciliationColumns(null, null),
  },
  Firmalar: {
    apiUrl: "/api/reconciliation/company",
    searchItems: ["aranacak", "baslangic", "bitis"],
    columns: ReconciliationColumns(null, null),
  },
};

export default function MutakabatContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("İstasyonlar");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    setKeywords("");
    setStartDate("");
    setEndDate("");
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
      </AdminTopSection>
      <MutakabatCustomSearch
        activeMenu={activeMenu}
        setKeywords={setKeywords}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <CustomDatatable
        apiUrl={types[activeMenu]?.apiUrl}
        columns={types[activeMenu]?.columns}
        startDate={startDate}
        endDate={endDate}
        keywords={keywords}
      />
    </div>
  );
}
