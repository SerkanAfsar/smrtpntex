"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import { AraclarDatatableProps } from "@/Utils/Variables";
import AraclarCustomSearch from "../Components/AraclarCustomSearch";
import { returnCarItem } from "@/Utils/ConvertTableItems";
import { useState } from "react";

export default function AraclarContainer() {
  const { isOpened } = useLeftMenuStore();
  const [keywords, setKeywords] = useState<string>();

  return (
    <div
      className={cn(
        "flex flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-none">
        <h2>Araçlara Gerçekleşen Satışlar</h2>
        <CustomButton
          className="gap-1 bg-green-100 p-2 text-green-600"
          icon={ExportCsvIcon}
          title="Dışa Aktar"
        />
      </AdminTopSection>
      <AraclarCustomSearch setKeywords={setKeywords} />
      <CustomGrid
        search={false}
        columns={AraclarDatatableProps.columns}
        pagination={true}
        sort={true}
        convertAction={returnCarItem}
        apiUrl="/api/cars/getlist"
        keywords={keywords}
      />
    </div>
  );
}
