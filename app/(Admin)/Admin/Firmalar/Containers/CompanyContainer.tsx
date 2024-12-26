"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { cn } from "@/Utils";
import { CompanySalesColumns } from "@/Utils/Variables";
import { useEffect, useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import ContentSubLeftSearch from "@/Components/Admin/ContentSubLeftSearch";
import { PaginationType } from "@/Types/Common.Types";
import { useShallow } from "zustand/shallow";
import { CompanyType } from "@/Types/Company.Types";
import { useCompanyModal } from "@/store/useCompanyModal";
import AddEditCompanyModal from "../Components/AddEditCompanyModal";
import NotSelected from "@/Components/Admin/NotSelected";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import PetronetCustomSearch from "../../Petronet/Components/PetronetCustomSearch";
import { ExportCsvIcon } from "@/Utils/IconList";
import { ExcelFirmalarSatisResult } from "@/Services/Excel.Service";

const types: MenuType = {
  // Şubeler: {
  //   searchItems: ["aranacak", "status"],
  //   apiUrl: "/api/companysales1",
  //   // columns: CompanySalesColumns,
  // },
  Satışlar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/companysales",
    columns: CompanySalesColumns,
    excelCommand: ExcelFirmalarSatisResult,
  },
  Kullanıcılar: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/companysales2",
    // columns: CompanySalesColumns,
  },
  Finans: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/companysale3",
    // columns: CompanySalesColumns,
  },
  Otorizasyonlar: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/companysale4",
    // columns: CompanySalesColumns,
  },
  "Kredi Kartları": {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/companysale5",
    // columns: CompanySalesColumns,
  },
  Faturalar: {
    searchItems: ["aranacak", "status"],
    apiUrl: "/api/companysales6",
    // columns: CompanySalesColumns,
  },
};

export default function CompaniesContainer({
  dataResult,
}: {
  dataResult: PaginationType<CompanyType>;
}) {
  const [keywords, setKeywords] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  const [activeMenu, setActiveMenu] = useState<string>("Satışlar");
  const [toggleOpened, selectedId, selectAction] = useCompanyModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedId,
      state.setSelectedCompany,
    ]),
  );
  useEffect(() => {
    selectAction(undefined);
  }, [selectAction]);

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
        variables={(dataResult.records as any[]).map((item: CompanyType) => ({
          name: item.Title,
          value: item.Id.toString(),
          active: item.IsActive,
        }))}
        selectAction={selectAction}
        selectedId={selectedId ?? undefined}
      />
      <ContentWithInfoSection>
        {selectedId ? (
          <>
            <AdminTopSection className="border-b">
              <div className="flex items-center justify-center">
                <div className="mr-3 flex items-center justify-between gap-3">
                  {Object.keys(types).map((key: string, index: number) => (
                    <CustomButton
                      key={index}
                      className={cn(
                        "gap-1 rounded-md border p-2 px-3",
                        activeMenu == key
                          ? "border-black bg-gray-900 text-white"
                          : "bg-white text-black",
                      )}
                      onClick={() => setActiveMenu(key)}
                      title={key}
                    />
                  ))}
                </div>
              </div>
              {types[activeMenu].excelCommand && (
                <CustomButton
                  className="gap-1 bg-green-100 p-2 text-green-600"
                  icon={ExportCsvIcon}
                  disabled={excelLoading}
                  title={excelLoading ? "Excel Çıktısı Alınıyor" : "Dışa Aktar"}
                  onClick={async () => {
                    setExcelLoading(true);
                    await types[activeMenu].excelCommand({
                      id: selectedId,
                      startDate: startDate ?? "",
                      endDate: endDate ?? "",
                      keywords: keywords ?? "",
                    });
                    setExcelLoading(false);
                  }}
                />
              )}
            </AdminTopSection>

            <PetronetCustomSearch
              types={types}
              activeMenu={activeMenu}
              setKeywords={setKeywords}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setIsActive={setIsActive}
              startDate={startDate}
              endDate={endDate}
            />
            {types[activeMenu].columns && (
              <CustomDatatable
                apiUrl={types[activeMenu].apiUrl}
                columns={types[activeMenu].columns}
                id={selectedId}
                startDate={startDate}
                endDate={endDate}
                keywords={keywords}
                isActive={isActive}
              />
            )}
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
