"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import {
  ActivityLogsHeaderColumns,
  SystemLogsHeaderColumns,
} from "@/Utils/Variables";

import { useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { ExcelAraclarResult } from "@/Services/Excel.Service";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import LogsCustomSearchComponent from "../Components/LogSearchComponent";

const types: MenuType = {
  "Aktivite Loglari": {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/logs/user-logs",
    columns: ActivityLogsHeaderColumns,
  },
  "Sistem Logları": {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/logs/system-logs",
    columns: SystemLogsHeaderColumns,
  },
};

export default function LogsContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>("");
  const [excelLoading, setExcelLoading] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>("Aktivite Loglari");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

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
        <LogsCustomSearchComponent
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setKeywords={setKeywords}
          activeMenu={activeMenu}
          keywords={keywords}
        />

        {types[activeMenu].columns && (
          <CustomDatatable
            apiUrl={types[activeMenu].apiUrl}
            columns={types[activeMenu].columns}
            keywords={keywords}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </>
  );
}
