"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";
import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import { AraclarDatatableProps } from "@/Utils/Variables";
import { returnCarItem } from "@/Utils/ConvertTableItems";
import { useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import ContentSubLeftSearch from "@/Components/Admin/ContentSubLeftSearch";
import { PaginationType } from "@/Types/Common.Types";
import { useShallow } from "zustand/shallow";
import CompaniesCustomSearch from "../Components/CompaniesCustomSearch";
import { CompanyType } from "@/Types/Company.Types";
import { useCompanyModal } from "@/store/useCompanyModal";
import AddEditCompanyModal from "../Components/AddEditCompanyModal";
import NotSelected from "@/Components/Admin/NotSelected";

export default function CompaniesContainer({
  dataResult,
}: {
  dataResult: PaginationType<CompanyType>;
}) {
  const [keywords, setKeywords] = useState<string>();
  const [toggleOpened, selectedId, selectAction] = useCompanyModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedId,
      state.setSelectedCompany,
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
        addTitle="Firma Ekle"
        placeholder="Firma Ara"
        title="Firmalar"
        variables={dataResult.records.map((item: CompanyType) => ({
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
            <CompaniesCustomSearch setKeywords={setKeywords} />
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
            title="Firma"
            action={() => toggleOpened()}
            buttonTitle="Firma Ekle"
          />
        )}
      </ContentWithInfoSection>
      <AddEditCompanyModal />
    </>
  );
}
