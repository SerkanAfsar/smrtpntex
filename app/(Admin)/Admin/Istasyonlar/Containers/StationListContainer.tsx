"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";

import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn, exportToExcel } from "@/Utils";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";

import { useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { StationListHeaderColumns } from "@/Utils/StationUtis";
import StationCustomSearch from "../Components/StationCustomSearch";
import { useStationModal } from "@/store/useStationModal";
import { useShallow } from "zustand/shallow";
import StationDetailModal from "../Components/StationDetailModal";
import { useExcel } from "@/store/useExcel";
import { GetAllStationsService } from "@/Services/StationService";
import { ExcelIstasyonlarDataType } from "@/Types/Excel.Types";
import { ExcelIstasyonlarList } from "@/Services/Excel.Service";

export default function StationListContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [
    setSelectedStation,
    selectedStation,
    isOpenedStation,
    toggleOpenedStation,
    updatedStation,
    setStationUpdate,
  ] = useStationModal(
    useShallow((state) => [
      state.setSelectedStation,
      state.selectedStation,
      state.isOpened,
      state.toggleOpened,
      state.updated,
      state.setUpdated,
    ]),
  );
  const getDAta = useExcel((state) => state.data);

  return (
    <>
      <div
        className={cn(
          "flex flex-1 flex-col bg-adminBgColor transition-all",
          isOpened ? "ml-[244px]" : "ml-[62px]",
        )}
      >
        <AdminTopSection>
          <h2>İstasyonlar</h2>
          <div className="flex items-center gap-3">
            <CustomButton
              className="P-2 bg-blue-100 text-blue-500"
              onClick={() => {
                setSelectedStation();
                toggleOpenedStation();
              }}
              icon={PlusSmall}
              title={"İstasyon Ekle"}
            />
            <CustomButton
              className="gap-1 bg-green-100 p-2 text-green-600"
              icon={ExportCsvIcon}
              title="Dışa Aktar"
              onClick={async () => {
                await ExcelIstasyonlarList({
                  stationName: keywords ?? "",
                  status: isActive ?? undefined,
                });
              }}
            />
          </div>
        </AdminTopSection>

        <StationCustomSearch
          setIsActive={setIsActive}
          setKeywords={setKeywords}
        />
        <CustomDatatable
          columns={StationListHeaderColumns(async ({ id }: { id: number }) => {
            await setSelectedStation(id);
            toggleOpenedStation();
          })}
          apiUrl="/api/stations/stationlist"
          keywords={keywords}
          isActive={isActive}
          updated={updatedStation}
        />
      </div>
      <StationDetailModal
        stationData={selectedStation ?? null}
        isOpenedModal={isOpenedStation}
        toggleOpened={toggleOpenedStation}
        setUpdated={setStationUpdate}
        title={selectedStation ? "İstasyon Güncelle" : "İstasyon Ekle"}
      />
    </>
  );
}
