import { Metadata } from "next";
import BpContainer from "./Containers/BpContainer";
import { GetBpOrderStateService } from "@/Services/BpOrderService";
import { BpOrderStateType } from "@/Types/BpOrder.Types";
import { CustomOptionsType } from "@/Types/Common.Types";
export const metadata: Metadata = {
  title: "Bp Siparişleri",
};

export default async function Dashboard() {
  const bpOrderStateResult = await GetBpOrderStateService();
  if (!bpOrderStateResult.IsSuccess) {
    throw new Error(bpOrderStateResult.Message || "Order State Error");
  }
  const OrderStateData: CustomOptionsType[] = (
    bpOrderStateResult.Data as BpOrderStateType[]
  ).map((item) => ({
    name: item.Name,
    value: item.Id,
  }));
  return <BpContainer OrderStateData={OrderStateData} />;
}
