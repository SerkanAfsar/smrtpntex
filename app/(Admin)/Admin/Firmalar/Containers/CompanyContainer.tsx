"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { cn } from "@/Utils";
import {
  CompanyCarListTypeHeaders,
  CompanyCurrentAccountListColumns,
  CompanyOtorizationsListColumns,
  CompanySalesColumns,
  CompanyUserListColumns,
} from "@/Utils/Variables";
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
  Araçlar: {
    searchItems: ["aranacak"],
    apiUrl: "/api/Company/cars",
    columns: CompanyCarListTypeHeaders(null, null),
  },
  Satışlar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/companysales",
    columns: CompanySalesColumns,
    excelCommand: ExcelFirmalarSatisResult,
  },
  Kullanıcılar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/userlist",
    columns: CompanyUserListColumns,
  },
  Finans: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/currentaccount",
    columns: CompanyCurrentAccountListColumns,
  },
  Otorizasyonlar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/otorizations",
    columns: CompanyOtorizationsListColumns,
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
  const [keywords, setKeywords] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [excelLoading, setExcelLoading] = useState<boolean>(false);

  const [activeMenu, setActiveMenu] = useState<string>("Araçlar");
  const [toggleOpened, selectedCompany, setSelectedCompany] = useCompanyModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedCompany,
      state.setSelectedCompany,
    ]),
  );
  useEffect(() => {
    setSelectedCompany(undefined);
  }, [setSelectedCompany]);

  return (
    <>
      <ContentSubLeftSearch
        actionOne={() => {
          alert("test");
        }}
        addAction={() => {
          toggleOpened(false);
          setSelectedCompany(undefined);
          toggleOpened(true);
        }}
        addTitle="Firma Ekle"
        placeholder="Firma Ara"
        title="Firmalar"
        variables={(dataResult.records as any[]).map((item: CompanyType) => ({
          name: item.Title,
          value: item.Id.toString(),
          active: item.IsActive,
        }))}
        toggleOpened={toggleOpened}
        selectAction={setSelectedCompany}
        selectedId={selectedCompany?.Id ?? undefined}
      />
      <ContentWithInfoSection>
        {selectedCompany?.Id ? (
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
                      id: selectedCompany?.Id,
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
              startDate={startDate}
              endDate={endDate}
            />
            {types[activeMenu].columns && (
              <CustomDatatable
                apiUrl={types[activeMenu].apiUrl}
                columns={types[activeMenu].columns}
                id={selectedCompany?.Id}
                startDate={startDate}
                endDate={endDate}
                keywords={keywords}
              />
            )}
          </>
        ) : (
          <NotSelected
            title="Firma"
            action={() => toggleOpened(true)}
            buttonTitle="Firma Ekle"
          />
        )}
      </ContentWithInfoSection>
      <AddEditCompanyModal
        editData={{
          alertLimit: selectedCompany?.AlertLimit ?? 0,
          isActive: selectedCompany?.IsActive ?? false,
          paymentMethodId: selectedCompany?.PaymentMethodId ?? 0,
          riskLimit: selectedCompany?.RiskLimit ?? 0,
          taxNumber: selectedCompany?.TaxNumber ?? "",
          taxOffice: selectedCompany?.TaxOffice ?? "",
          title: selectedCompany?.Title ?? "",
        }}
      />
    </>
  );
}
