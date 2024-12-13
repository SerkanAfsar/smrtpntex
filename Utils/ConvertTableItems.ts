import { CarType } from "@/Types/Car.Types";

export const returnCarItem = (responseData: any[]) => {
  return responseData.map((item: CarType) => [
    item.PlateNumber,
    item.FirstName,
    item.Amount,
    new Date(item.CreatedDate).toLocaleDateString(),
  ]);
};
