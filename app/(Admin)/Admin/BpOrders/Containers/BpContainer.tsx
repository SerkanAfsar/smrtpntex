"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { CheckIcon, PlusSmall } from "@/Utils/IconList";

import BpCustomSearch from "../Components/BpCustomSearch";
import { BpDatatableProps } from "@/Utils/Variables";
import { returnBpOrderItem } from "@/Utils/ConvertTableItems";
import { useState } from "react";
import { useBpOrderModal } from "@/store/useBpOderModal";
import BpOrderEditModal from "../Components/BpOrderEditModal";
import { useShallow } from "zustand/shallow";

export default function BpContainer() {
  const { isOpened } = useLeftMenuStore();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [toggleOpened] = useBpOrderModal(
    useShallow((state) => [state.toggleOpened]),
  );

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
            className="cursor-pointer bg-adminDarkBlueBg p-2 text-adminDarkBlue"
            icon={PlusSmall}
            onClick={() => toggleOpened()}
          />
          <CustomButton
            title="Sipariş Onayla"
            className="cursor-pointer bg-green-100 p-2 text-green-600"
            icon={CheckIcon}
          />
        </div>
      </AdminTopSection>
      <BpCustomSearch setStartDate={setStartDate} setEndDate={setEndDate} />
      <CustomGrid
        search={false}
        columns={BpDatatableProps.columns}
        data={BpDatatableProps.data}
        pagination={true}
        sort={true}
        isCheckbox={true}
        apiUrl="/api/bporder/getlist"
        startDate={startDate}
        endDate={endDate}
        convertAction={returnBpOrderItem}
      />
      <BpOrderEditModal />
    </div>
  );
}
