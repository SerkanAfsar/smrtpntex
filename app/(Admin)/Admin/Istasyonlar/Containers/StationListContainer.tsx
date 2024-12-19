"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";

import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";

import { useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { StationListHeaderColumns } from "@/Utils/StationUtis";
import StationCustomSearch from "../Components/StationCustomSearch";

export default function StationListContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>();
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-none">
        <h2>İstasyonlar</h2>
        <CustomButton
          className="gap-1 bg-green-100 p-2 text-green-600"
          icon={ExportCsvIcon}
          title="Dışa Aktar"
        />
      </AdminTopSection>
      {/* <AraclarCustomSearch setKeywords={setKeywords} /> */}
      <StationCustomSearch
        setIsActive={setIsActive}
        setKeywords={setKeywords}
      />
      <CustomDatatable
        columns={StationListHeaderColumns(() => {
          alert("deneme");
        })}
        apiUrl="/api/stations/stationlist"
        keywords={keywords}
        isActive={isActive}
      />
    </div>
  );
}
