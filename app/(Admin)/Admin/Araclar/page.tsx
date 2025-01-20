import { Metadata } from "next";
import AraclarContainer from "./Containers/AraclarContainer";
import { GetCarModelCategoryTypes } from "@/Services/CarService";
import { PaginationType } from "@/Types/Common.Types";
import { CarModelCategoryType } from "@/Types/Car.Types";

export const metadata: Metadata = {
  title: "Araçlar",
};
export default async function Page() {
  const carModelCategoryResult = await GetCarModelCategoryTypes();
  if (!carModelCategoryResult.IsSuccess) {
    throw new Error(carModelCategoryResult.Message || "Cat Error");
  }
  const data =
    carModelCategoryResult.Data as PaginationType<CarModelCategoryType>;
  const catData = (data.records as CarModelCategoryType[]).map((item) => ({
    name: item.Title,
    value: item.Id,
  }));
  // setModelCats(
  //   (data.records as CarModelCategoryType[]).map((item) => ({
  //     name: item.Title,
  //     value: item.Id,
  //   })),
  // );

  return <AraclarContainer catData={catData} />;
}
