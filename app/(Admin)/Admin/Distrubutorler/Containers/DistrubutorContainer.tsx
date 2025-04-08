"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";

import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";

import DistributorsCustomSearch from "../Components/DistributorsCustomSearch";
import { useEffect, useState } from "react";

import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import ContentSubLeftSearch from "@/Components/Admin/ContentSubLeftSearch";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { useDistrubutorModal } from "@/store/useDistrubutorModal";

import { useShallow } from "zustand/shallow";
import AddEditDistrubutorModal from "../Components/AddEditDistrubutorModal";
import NotSelected from "@/Components/Admin/NotSelected";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";
import {
  CompanyInvoiceHeaderColumns,
  CreditCardHeaderColumns,
  DistributorCarsTypeHeaders,
  DistributorCurrentAccountsTypeHeaders,
  DistributorSatisColumnHeaders,
  DistributorUserTypeHeaders,
} from "@/Utils/Variables";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { cn } from "@/Utils";
import DistributorCompanies from "../Components/DistributorCompanies";
import { useCompanyModal } from "@/store/useCompanyModal";
import AddEditFinanceModal from "../../Firmalar/Components/AddEditFinanceModal";

const types: MenuType = {
  Satışlar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/sales",
    columns: DistributorSatisColumnHeaders,
  },
  // Firmalar: {
  //   searchItems: ["aranacak", "status"],
  //   apiUrl: "/api/distributors/companies",
  //   columns: DistributorCompaniesTypeHeaders,
  // },
  Araçlar: {
    searchItems: ["aranacak"],
    apiUrl: "/api/Company/cars",
    columns: DistributorCarsTypeHeaders,
  },
  Finans: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/current-account",
    columns: DistributorCurrentAccountsTypeHeaders,
  },
  Faturalar: {
    searchItems: ["aranacak", "baslangic", "bitis"],
    apiUrl: "/api/Company/invoices",
    columns: CompanyInvoiceHeaderColumns,
  },
  Kullanıcılar: {
    searchItems: ["aranacak"],
    apiUrl: "/api/Company/userlist",
    columns: DistributorUserTypeHeaders,
  },
  "Kredi Kartları": {
    searchItems: ["aranacak"],
    apiUrl: "/api/Company/credit-cards",
    columns: CreditCardHeaderColumns,
  },
  Otozirasyonlar: {
    searchItems: ["aranacak"],
    apiUrl: "/api/Company/credit-cards",
    columns: CreditCardHeaderColumns,
  },
};

export default function DistrubutorContainer({
  dataResult,
  paymentMethods,
}: {
  dataResult: PaginationType<DistrubitorType>;
  paymentMethods?: CustomOptionsType[];
}) {
  const [keywords, setKeywords] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Satışlar");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openFinanceModal, setOpenFinansModal] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const [selectedCompany, setSelectedCompany] = useCompanyModal(
    useShallow((state) => [state.selectedCompany, state.setSelectedCompany]),
  );

  const [toggleOpened, selectedDistributor, setSelectedDistributor] =
    useDistrubutorModal(
      useShallow((state) => [
        state.toggleOpened,
        state.selectedDistributor,
        state.setSelectedDistributor,
      ]),
    );
  useEffect(() => {
    setSelectedDistributor(undefined);
  }, [setSelectedDistributor]);

  return (
    <>
      {selectedDistributor?.Id ? (
        <DistributorCompanies
          selectedDistributor={selectedDistributor}
          setSelectedDistributor={setSelectedDistributor}
          toggleOpened={toggleOpened}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      ) : (
        <ContentSubLeftSearch
          actionOne={() => {
            alert("test");
          }}
          addAction={() => {
            setOpenFinansModal(false);
            toggleOpened(false);
            setSelectedDistributor(undefined);
            toggleOpened(true);
          }}
          addTitle="Distribütör Ekle"
          placeholder="Distribütör Ara"
          title="Distribütörler"
          variables={(dataResult.records as DistrubitorType[]).map(
            (item: DistrubitorType) => ({
              name: item.Title,
              value: item.Id.toString(),
              active: item.IsActive,
            }),
          )}
          selectAction={setSelectedDistributor}
          selectedId={selectedDistributor?.Id ?? undefined}
          toggleOpened={toggleOpened}
          type="DIST"
        />
      )}

      <ContentWithInfoSection>
        {selectedDistributor?.Id ? (
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
              <div className="flex items-center justify-center gap-3">
                {activeMenu == "Finans" && (
                  <CustomButton
                    className="P-2 bg-blue-100 text-blue-500"
                    onClick={async () => {
                      if (selectedCompany?.Id) {
                        setOpenFinansModal(true);
                      } else {
                        alert("Firma Seçiniz");
                      }
                    }}
                    icon={PlusSmall}
                    title={"Finans Ekle"}
                  />
                )}
                <CustomButton
                  className="gap-1 bg-green-100 p-2 text-green-600"
                  icon={ExportCsvIcon}
                  title="Dışa Aktar"
                />
              </div>
            </AdminTopSection>
            <DistributorsCustomSearch
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setKeywords={setKeywords}
              activeMenu={activeMenu}
              keywords={keywords}
            />
            {/* {types[activeMenu].excelCommand && (
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
            )} */}

            {types[activeMenu].columns &&
              selectedCompany &&
              selectedCompany?.Id != 0 && (
                <CustomDatatable
                  apiUrl={types[activeMenu].apiUrl}
                  columns={types[activeMenu].columns}
                  id={selectedCompany?.Id}
                  startDate={startDate}
                  endDate={endDate}
                  keywords={keywords}
                  updated={isUpdated}
                />
              )}
          </>
        ) : (
          <NotSelected
            title="Distribütör"
            action={() => toggleOpened(true)}
            buttonTitle="Distribütör Ekle"
          />
        )}
      </ContentWithInfoSection>
      <AddEditDistrubutorModal
        dataModel={{
          id: selectedDistributor?.Id ?? 0,
          alertLimit: selectedDistributor?.AlertLimit ?? 0,
          isActive: selectedDistributor?.IsActive ?? false,
          purchasePrice: selectedDistributor?.PurchasePrice ?? 0,
          taxOffice: selectedDistributor?.TaxOffice ?? "",
          title: selectedDistributor?.Title ?? "",
          riskLimit: selectedDistributor?.RiskLimit ?? 0,
          taxNumber: selectedDistributor?.TaxNumber ?? "",
          paymentMethodId: selectedDistributor?.PaymentMethodId ?? 0,
          limitId: selectedDistributor?.AlertLimit ?? 0,
        }}
      />
      <AddEditFinanceModal
        companyId={selectedCompany?.Id as number}
        isOpenedModal={openFinanceModal}
        paymentMethods={paymentMethods!}
        setUpdated={setIsUpdated}
        toggleOpenedModal={setOpenFinansModal}
        editData={{
          description: "",
          expense: 0,
          paymentMethodId: "",
          revenue: 0,
        }}
      />
    </>
  );
}
