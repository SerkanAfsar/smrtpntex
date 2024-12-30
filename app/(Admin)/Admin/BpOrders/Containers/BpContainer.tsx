"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { CheckIcon, ExportCsvIcon, PlusSmall } from "@/Utils/IconList";

import BpCustomSearch from "../Components/BpCustomSearch";
import { BpDatatableProps } from "@/Utils/Variables";
import { useCallback, useState } from "react";
import { useBpOrderModal } from "@/store/useBpOderModal";
import BpOrderEditModal from "../Components/BpOrderEditModal";
import { useShallow } from "zustand/shallow";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { ExcelBPList } from "@/Services/Excel.Service";
import { DeleteBpOrderService } from "@/Services/BpOrderService";
import { toast } from "react-toastify";

export default function BpContainer() {
  const { isOpened } = useLeftMenuStore();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [excelLoading, setExcelLoading] = useState<boolean>(false);
  const [toggleOpened, updated, setUpdated, isOpenedModal] = useBpOrderModal(
    useShallow((state) => [
      state.toggleOpened,
      state.updated,
      state.setUpdated,
      state.isOpened,
    ]),
  );

  const deleteFunc = useCallback(async ({ id }: { id: number }) => {
    const confirmMessage = confirm(
      "Bu Kaydı Silmek İstediğinizden Emin misiniz?",
    );
    if (confirmMessage) {
      const result = await DeleteBpOrderService({ id });
      if (result.IsSuccess) {
        setUpdated();
        return toast.success("Veri Silindi!", { position: "top-right" });
      } else {
        return toast.error(result.Message || "Hata", {
          position: "top-right",
        });
      }
    }
  }, []);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
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
          <CustomButton
            className="gap-1 bg-green-100 p-2 text-green-600"
            icon={ExportCsvIcon}
            disabled={excelLoading}
            title={!excelLoading ? "Dışa Aktar" : "Excel Çıktısı Alınıyor"}
            onClick={async () => {
              setExcelLoading(true);
              await ExcelBPList({
                keywords: "",
                startDate,
                endDate,
              });
              setExcelLoading(false);
            }}
          />
        </div>
      </AdminTopSection>
      <BpCustomSearch setStartDate={setStartDate} setEndDate={setEndDate} />
      <CustomDatatable
        columns={BpDatatableProps(null, deleteFunc)}
        apiUrl="/api/bporder/getlist"
        updated={updated}
      />
      <BpOrderEditModal
        isOpenedModal={isOpenedModal}
        toggleOpened={toggleOpened}
        setUpdated={setUpdated}
      />
    </div>
  );
}
