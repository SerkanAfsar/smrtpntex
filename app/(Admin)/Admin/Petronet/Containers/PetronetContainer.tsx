"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import PetronetCustomSearch from "../Components/PetronetCustomSearch";
import { ExportCsvIcon } from "@/Utils/IconList";
import { cn } from "@/Utils";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";

export default function PetronetContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>();

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-b">
        <div className="flex items-center justify-center">
          <div className="mr-3 flex items-center justify-between gap-3 border-r pr-3">
            <CustomButton
              className="gap-1 bg-gray-900 p-2 px-3 text-white"
              title="Bayiler"
            />
            <CustomButton
              className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
              title="Satışlar"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <CustomButton
              className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
              title="Tank Durumları"
            />
            <CustomButton
              className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
              title="Tank Hareketleri"
            />
            <CustomButton
              className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
              title="Tank Doluluk Oranları"
            />
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
      <PetronetCustomSearch setKeywords={setKeywords} />
      {/* <CustomGrid
              search={false}
              columns={AraclarDatatableProps.columns}
              pagination={true}
              sort={true}
              convertAction={returnCarItem}
              apiUrl="/api/cars/getlist"
            /> */}
      <div>
        Buraya firmalara ait satışlar tablosu gelicek ama nerden çekicek belli
        değil
      </div>
    </div>
  );
}
