"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { CheckIcon, PlusSmall } from "@/Utils/IconList";

import BpCustomSearch from "../Components/BpCustomSearch";
import { BpDatatableProps } from "@/Utils/Variables";

export default function BpContainer() {
  const { isOpened } = useLeftMenuStore();

  return (
    <div
      className={cn(
        "flex flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection>
        <h2>BP Dökme Sipariş Listesi</h2>
        <div className="flex items-center gap-3">
          <CustomButton
            title="Sipariş Ekle"
            className="bg-adminDarkBlueBg p-2 text-adminDarkBlue"
            icon={PlusSmall}
          />
          <CustomButton
            title="Sipariş Onayla"
            className="bg-green-100 p-2 text-green-600"
            icon={CheckIcon}
          />
        </div>
      </AdminTopSection>
      <BpCustomSearch />
      <CustomGrid
        search={false}
        columns={BpDatatableProps.columns}
        data={BpDatatableProps.data}
        pagination={true}
        sort={true}
        isCheckbox={true}
      />
    </div>
  );
}
