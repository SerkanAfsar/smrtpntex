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
              <div className="flex items-center justify-center">
                <div className="mr-3 flex items-center justify-between gap-3 border-r pr-3">
                  <CustomButton
                    className="gap-1 bg-gray-900 p-2 px-3 text-white"
                    title="Şubeler"
                  />
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Satışlar"
                  />
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Kullanıcılar"
                  />

                  {/* <CustomButton
                  className="gap-1 bg-green-100 p-2 text-green-600"
                  icon={ExportCsvIcon}
                  title="Dışa Aktar"
                /> */}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Finans"
                  />
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Otorizasyonlar"
                  />
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Kredi Kartları"
                  />
                  <CustomButton
                    className="gap-1 rounded-md border bg-white p-2 px-3 text-black"
                    title="Faturalar"
                  />
                </div>
              </div>
            </AdminTopSection>
            <CompaniesCustomSearch setKeywords={setKeywords} />
            {/* <CustomGrid
              search={false}
              columns={AraclarDatatableProps.columns}
              pagination={true}
              sort={true}
              convertAction={returnCarItem}
              apiUrl="/api/cars/getlist"
            /> */}
            <div>
              Buraya firmalara ait satışlar tablosu gelicek ama nerden çekicek
              belli değil
            </div>
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
