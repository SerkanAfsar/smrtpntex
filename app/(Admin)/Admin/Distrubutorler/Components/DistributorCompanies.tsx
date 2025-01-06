import CustomButton from "@/Components/UI/CustomButton";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { DistributorCompanyType } from "@/Types/Distrubitor.Types";
import { ExportCsvIcon, PlusSmall, SearchIcon } from "@/Utils/IconList";
import { useEffect, useState } from "react";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { GetDistributorCompaniesListService } from "@/Services/DistrubitorsService";

import { cn } from "@/Utils";
import { SelectTypes } from "@/Components/Admin/ContentSubLeftSearch";
import { CompanyType } from "@/Types/Company.Types";

export default function DistributorCompanies({
  selectedDistributor,
  setSelectedDistributor,
  toggleOpened,
  selectedCompany,
  setSelectedCompany,
}: {
  selectedDistributor: DistrubitorType;
  setSelectedDistributor: any;
  toggleOpened: any;
  selectedCompany: CompanyType | null;
  setSelectedCompany: any;
}) {
  const [companies, setCompanies] = useState<Partial<DistributorCompanyType>[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<SelectTypes>("all");

  const companyList =
    selectedType == "all"
      ? companies
      : selectedType == "false"
        ? companies.filter((a) => a.IsActive == false)
        : companies.filter((a) => a.IsActive == true);

  useEffect(() => {
    const process = async () => {
      setIsLoading(true);
      const result: ResponseResult<PaginationType<DistributorCompanyType>> =
        await GetDistributorCompaniesListService({
          distributorId: selectedDistributor.Id,
          searchType: {
            pageIndex: 1,
            pageSize: 99999,
          },
        });

      if (result.IsSuccess) {
        const resultData =
          result.Data as PaginationType<DistributorCompanyType>;
        setCompanies(
          (resultData.records as DistributorCompanyType[]).map((item) => ({
            Id: item.Id,
            Title: item.Title,
            IsActive: item.IsActive,
          })),
        );
      }
      setIsLoading(false);
    };
    process();
  }, [selectedDistributor.Id]);

  useEffect(() => {}, []);
  return (
    <section className="ml-[62px] flex w-[320px] flex-col border-r border-t bg-white">
      <div className="flex w-full flex-col items-start justify-start gap-4 border-b bg-adminBgColor p-4 text-sm">
        <span
          onClick={() => {
            toggleOpened(false);
            setSelectedDistributor();
            setSelectedCompany();
          }}
          className="cursor-pointer font-bold text-blue-400"
        >
          Distribütörlere Geri Dön
        </span>
        <h3 className="font-bold">{selectedDistributor.Title}</h3>
      </div>
      <div className="flex w-full flex-col gap-3 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-md">Firmalar</h3>
          <div className="flex items-center gap-3">
            <CustomButton
              className="bg-green-100 p-2 text-sm text-green-600"
              onClick={() => {
                alert("test");
              }}
              iconWidth={16}
              iconHeight={16}
              icon={ExportCsvIcon}
            />
            <CustomButton
              className="P-2 bg-blue-100 text-blue-500"
              onClick={() => {
                alert("Firma Eklenicek");
              }}
              icon={PlusSmall}
              title={"Firma Ekle"}
            />
          </div>
        </div>
        <CustomTextbox
          icon={SearchIcon}
          className="rounded-md border border-gray-300 bg-gray-50 p-2 py-2.5 pl-9 text-sm text-black outline-none placeholder:text-xs placeholder:text-gray-500"
          isFull={true}
          placeholder={"Firma Ara"}
          //   onChange={(e) => setSearchKey(e.target.value)}
        />
        <CustomSelect
          onChange={(e) =>
            setSelectedType(e.currentTarget.value as SelectTypes)
          }
          className="relative rounded-md border border-dashed border-gray-400 px-2 py-3 text-xs leading-tight outline-none"
          options={[
            {
              value: "all",
              name: "Tümü",
            },
            {
              value: "true",
              name: "Aktif",
            },
            {
              value: "false",
              name: "Pasif",
            },
          ]}
        />
      </div>
      <hr />

      <div className="w-full flex-1 flex-col gap-3 overflow-auto overscroll-contain p-4">
        {!isLoading ? (
          companyList.map((item, index) => (
            <div
              className={cn(
                "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-md p-3 text-sm transition-all hover:bg-blue-100",
                selectedCompany &&
                  selectedCompany.Id == Number(item.Id) &&
                  "bg-blue-100",
              )}
              key={index}
              onClick={async () => {
                // toggleOpened(false);
                // await selectAction(Number(item.value));
                await setSelectedCompany(Number(item.Id));
                // toggleOpened(true);
              }}
            >
              {item.Title}
              {/* <Image
              src={EditIcon}
              width={20}
              height={20}
              alt={item.name}
              className="opacity-0 transition-all delay-[25] group-hover:opacity-100"
            /> */}
            </div>
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            Yükleniyor...
          </div>
        )}
      </div>
    </section>
  );
}
