import {
  GetAllDistrubitors,
  GetPaymentMethodTypes,
} from "@/Services/DistrubitorsService";
import DistrubutorContainer from "./Containers/DistrubutorContainer";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";
import { DistrubitorType, PaymentMethodType } from "@/Types/Distrubitor.Types";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Distribütörler",
};

export default async function Page() {
  const [resultDistributors, resultPaymentMethods] = await Promise.all([
    GetAllDistrubitors({
      searchType: {
        pageIndex: 1,
        pageSize: 10000,
      },
    }),
    GetPaymentMethodTypes(),
  ]);

  if (!resultDistributors.IsSuccess) {
    throw new Error(resultDistributors.Message || "Distributor Hata");
  }
  if (!resultPaymentMethods.IsSuccess) {
    throw new Error(resultPaymentMethods.Message || "Payment Method Hata");
  }

  const paymentMethodList = resultPaymentMethods.Data as PaymentMethodType[];
  const paymetOptionsData: CustomOptionsType[] = paymentMethodList.map(
    (item) => ({
      name: item.Name,
      value: item.Id,
    }),
  );

  return (
    <DistrubutorContainer
      dataResult={resultDistributors.Data as PaginationType<DistrubitorType>}
      paymentMethods={paymetOptionsData}
    />
  );
}
