import { Metadata } from "next";
import StationListContainer from "./Containers/StationListContainer";
import { GetAllDistrubitors } from "@/Services/DistrubitorsService";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
export const metadata: Metadata = {
  title: "İstasyonlar",
};

export default async function Page() {
  const distributorList = await GetAllDistrubitors({
    searchType: {
      pageIndex: 1,
      pageSize: 9999,
    },
  });
  if (!distributorList.IsSuccess) {
    throw new Error(distributorList.Message || "Distribütör Çekme Hatası");
  }
  const disributorListData =
    distributorList.Data as PaginationType<DistrubitorType>;

  const distributorListData: CustomOptionsType[] =
    (disributorListData.records as DistrubitorType[]).map((item) => ({
      name: item.Title,
      value: item.Id,
    })) || [];
  return <StationListContainer distributorList={distributorListData} />;
}
