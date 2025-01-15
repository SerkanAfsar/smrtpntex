import { GetAllCompanies } from "@/Services/CompanyService";
import PriceContainer from "./Containers/PriceContainer";
import { GetAllStationsService } from "@/Services/StationService";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { CompanyType } from "@/Types/Company.Types";
import { StationType } from "@/Types/Station.Types";
import { GetAllProducts } from "@/Services/ProductService";
import { ProductType } from "@/Types/Product.Types";
import { GetMemberListService } from "@/Services/MemberService";
import { MemberType } from "@/Types/Member.Types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiyatlar",
};

export default async function Page() {
  const [resultCompanies, resultStations, resultProducts, resultMembers] =
    await Promise.all([
      GetAllCompanies({
        searchType: {
          pageIndex: 1,
          pageSize: 9999,
        },
      }),
      GetAllStationsService({
        searchType: {
          pageIndex: 1,
          pageSize: 99999,
        },
      }),
      GetAllProducts({
        searchType: {
          pageIndex: 1,
          pageSize: 99999,
        },
      }),
      GetMemberListService({
        searchType: {
          pageIndex: 1,
          pageSize: 99999,
        },
      }),
    ]);
  if (
    !resultCompanies.IsSuccess ||
    !resultStations.IsSuccess ||
    !resultProducts.IsSuccess ||
    !resultMembers.IsSuccess
  ) {
    throw new Error(
      resultCompanies.Message ||
        resultStations.Message ||
        resultProducts.Message ||
        resultMembers.Message ||
        "Hata",
    );
  }

  const paginatedCompanies =
    resultCompanies.Data as PaginationType<CompanyType>;

  const companyList: CustomOptionsType[] =
    (paginatedCompanies.records as CompanyType[]).map(
      (company: CompanyType) => ({
        name: company.Title,
        value: company.Id,
      }),
    ) || [];

  const paginatedStations = resultStations.Data as PaginationType<StationType>;

  const stationList: CustomOptionsType[] =
    (paginatedStations.records as StationType[]).map(
      (company: StationType) => ({
        name: company.Title,
        value: company.Id,
      }),
    ) || [];

  const paginatedProducts = resultProducts.Data as PaginationType<ProductType>;

  const productList: CustomOptionsType[] =
    (paginatedProducts.records as ProductType[]).map(
      (product: ProductType) => ({
        name: product.Name,
        value: product.Id,
      }),
    ) || [];

  const paginatedMembers = resultMembers.Data as PaginationType<MemberType>;

  const memberList: CustomOptionsType[] =
    (paginatedMembers.records as MemberType[]).map((member: MemberType) => ({
      name: member.DisplayName,
      value: member.Id,
    })) || [];

  return (
    <PriceContainer
      companyList={companyList}
      productList={productList}
      stationList={stationList}
      memberList={memberList}
    />
  );
}
