"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn, exportToExcel } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import { AraclarDatatableProps } from "@/Utils/Variables";
import AraclarCustomSearch from "../Components/AraclarCustomSearch";

import { useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { useExcel } from "@/store/useExcel";
import { GetCarList } from "@/Services/CarService";
import { ExcelAraclarDataType } from "@/Types/Excel.Types";
import { ExcelAraclarResult } from "@/Services/Excel.Service";

export default function AraclarContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>();
  const getData = useExcel((state) => state.data);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-b-0">
        <h2>Araçlara Gerçekleşen Satışlar</h2>
        <CustomButton
          className="gap-1 bg-green-100 p-2 text-green-600"
          icon={ExportCsvIcon}
          title="Dışa Aktar"
          onClick={async () => {
            const result = await ExcelAraclarResult({
              startDate: "",
              endDate: "",
              keywords: keywords ?? "",
              plateNumber: "",
            });
          }}
        />
      </AdminTopSection>
      <AraclarCustomSearch setKeywords={setKeywords} />
      <CustomDatatable
        columns={AraclarDatatableProps.columns}
        apiUrl="/api/cars/getlist"
        keywords={keywords}
      />
    </div>
  );
}
