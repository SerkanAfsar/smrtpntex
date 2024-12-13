"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";

import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import { AraclarDatatableProps } from "@/Utils/Variables";
import { returnCarItem } from "@/Utils/ConvertTableItems";
import DistributorsCustomSearch from "../Components/DistributorsCustomSearch";
import { useState } from "react";

import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import ContentSubLeftSearch from "@/Components/Admin/ContentSubLeftSearch";
import { PaginationType } from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { useDistrubutorModal } from "@/store/useDistrubutorModal";

import { useShallow } from "zustand/shallow";
import AddEditDistrubutorModal from "../Components/AddEditDistrubutorModal";
import NotSelected from "@/Components/Admin/NotSelected";

export default function DistrubutorContainer({
  dataResult,
}: {
  dataResult: PaginationType<DistrubitorType>;
}) {
  const [keywords, setKeywords] = useState<string>();
  const [toggleOpened, selectedId, selectAction] = useDistrubutorModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedId,
      state.setSelectedDistributor,
    ]),
  );
  return (
    <>
      <ContentSubLeftSearch
        actionOne={() => {
          alert("test");
        }}
        addAction={() => {
          toggleOpened();
        }}
        addTitle="Distribütör Ekle"
        placeholder="Distribütör Ara"
        title="Distribütörler"
        variables={dataResult.records.map((item: DistrubitorType) => ({
          name: item.Title,
          value: item.Id.toString(),
          active: item.IsActive,
        }))}
        selectAction={selectAction}
      />
      <ContentWithInfoSection>
        {selectedId ? (
          <>
            <AdminTopSection className="border-b">
              <CustomButton
                className="gap-1 bg-gray-900 p-2 text-white"
                title="Tüm Satışlar"
              />
              <CustomButton
                className="gap-1 bg-green-100 p-2 text-green-600"
                icon={ExportCsvIcon}
                title="Dışa Aktar"
              />
            </AdminTopSection>
            <DistributorsCustomSearch setKeywords={setKeywords} />
            <CustomGrid
              search={false}
              columns={AraclarDatatableProps.columns}
              pagination={true}
              sort={true}
              convertAction={returnCarItem}
              apiUrl="/api/cars/getlist"
            />
          </>
        ) : (
          <NotSelected
            title="Distribütör"
            action={() => toggleOpened()}
            buttonTitle="Distribütör Ekle"
          />
        )}
      </ContentWithInfoSection>
      <AddEditDistrubutorModal />
    </>
  );
}
