import { Metadata } from "next";
import MembersContainer from "./Containers/MembersContainer";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { MemberTypeType } from "@/Types/Member.Types";
import { GetMemberTypesService } from "@/Services/MemberService";
import { GetAllCompanies } from "@/Services/CompanyService";
import { CompanyType } from "@/Types/Company.Types";
import { GetAllStationsService } from "@/Services/StationService";
import { StationType } from "@/Types/Station.Types";
import { GetPaymentMethodTypes } from "@/Services/DistrubitorsService";
import { PaymentMethodType } from "@/Types/Distrubitor.Types";

export const metadata: Metadata = {
  title: "Üyeler",
};

export default async function Page() {
  const [
    memberTypeResult,
    companyTypeResult,
    stationResult,
    paymentMethodResult,
  ] = await Promise.all<any>([
    GetMemberTypesService(),
    GetAllCompanies({
      searchType: {
        pageIndex: 1,
        pageSize: 999999,
      },
    }),
    GetAllStationsService({
      searchType: {
        pageIndex: 1,
        pageSize: 999999,
      },
    }),
    GetPaymentMethodTypes(),
  ]);

  let memberTypes: CustomOptionsType[] = [];
  if (memberTypeResult.IsSuccess) {
    const dataResult = memberTypeResult.Data as PaginationType<MemberTypeType>;
    memberTypes = (dataResult.records as MemberTypeType[]).map((item) => ({
      name: item.Description,
      value: item.Id,
    }));
  } else {
    throw new Error(memberTypeResult.Message || "Member Type Error");
  }

  let companies: CustomOptionsType[] = [];

  if (companyTypeResult.IsSuccess) {
    const dataResult = companyTypeResult.Data as PaginationType<CompanyType>;
    companies = (dataResult.records as CompanyType[]).map((item) => ({
      name: item.Title,
      value: item.Id,
    }));
  } else {
    throw new Error(companyTypeResult.Message || "Company Type Error");
  }

  let stations: CustomOptionsType[] = [];

  if (stationResult.IsSuccess) {
    const dataResult = stationResult.Data as PaginationType<StationType>;
    stations = (dataResult.records as StationType[]).map((item) => ({
      name: item.Title,
      value: item.Id,
    }));
  } else {
    throw new Error(stationResult.Message || "Station Type Error");
  }
  let paymentMethods: CustomOptionsType[] = [];
  if (paymentMethodResult.IsSuccess) {
    const dataResult = paymentMethodResult.Data as PaymentMethodType[];
    paymentMethods = dataResult.map((item) => ({
      name: item.Name,
      value: item.PaymentMethodId,
    }));
  } else {
    throw new Error(paymentMethodResult.Message || "Payment Method Type Error");
  }

  return (
    <MembersContainer
      memberTypes={memberTypes}
      companies={companies}
      stations={stations}
      paymentMethods={paymentMethods}
    />
  );
}
