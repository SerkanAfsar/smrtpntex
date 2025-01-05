import { PaginationType } from "@/Types/Common.Types";
import CompaniesContainer from "./Containers/CompanyContainer";
import { CompanyType } from "@/Types/Company.Types";
import { GetAllCompanies } from "@/Services/CompanyService";
import { Metadata } from "next";
import { GetPaymentMethodTypes } from "@/Services/DistrubitorsService";
import { PaymentMethodType } from "@/Types/Distrubitor.Types";

export const metadata: Metadata = {
  title: "Firmalar",
};

export default async function Page() {
  const [resultCompanies, resultPaymentMethods] = await Promise.all([
    GetAllCompanies({
      searchType: {
        pageIndex: 1,
        pageSize: 10000,
      },
    }),
    GetPaymentMethodTypes(),
  ]);

  if (!resultCompanies.IsSuccess) {
    throw new Error(resultCompanies.Message || "Hata");
  }
  if (!resultPaymentMethods.IsSuccess) {
    throw new Error(
      resultPaymentMethods.Message || "paymentMethodResult Error",
    );
  }

  const dataResultPayment = resultPaymentMethods.Data as PaymentMethodType[];
  const paymentMethods = dataResultPayment.map((item) => ({
    name: item.Name,
    value: item.PaymentMethodId,
  }));

  return (
    <CompaniesContainer
      dataResult={resultCompanies.Data as PaginationType<CompanyType>}
      paymentMethods={paymentMethods}
    />
  );
}
