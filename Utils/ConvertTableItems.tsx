import { BpOrderType } from "@/Types/BpOrder.Types";
import { CarType } from "@/Types/Car.Types";
import { _ } from "gridjs-react";

export const returnCarItem = (responseData: any[]) => {
  return responseData.map((item: CarType) => [
    item.PlateNumber,
    item.FirstName,
    item.Amount,
    new Date(item.CreatedDate).toLocaleDateString(),
  ]);
};

export const returnBpOrderItem = (responseData: any[]) => {
  return responseData.map((item: BpOrderType) => [
    item.OrderCode,
    item.StationName,
    null,
    item.StateMessage,
    new Date(item.OrderDate).toLocaleDateString(),
    new Date(item.CreatedDate).toLocaleDateString(),
  ]);
};
