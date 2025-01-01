import {
  AddCarBrandModelType,
  AddCarBrandType,
  CarBrandModelType,
  CarBrandSearchType,
  CarBrandType,
  CarListType,
  CarModelCategoryType,
  CarType,
} from "@/Types/Car.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";
import { toast } from "react-toastify";

export async function GetCarList({ searchType }: { searchType: CarListType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Car/List",
    body: searchType,
  })) as ResponseResult<PaginationType<CarType>>;
}

export async function GetCarBrandList({
  searchType,
}: {
  searchType: CarBrandSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Car/brands",
    body: searchType,
  })) as ResponseResult<PaginationType<CarBrandType>>;
}

// export async function GetCarBrandByIdService({
//   searchType,
// }: {
//   searchType: CarBrandSearchType;
// }) {
//   return (await BaseFetch({
//     method: "POST",
//     url: "adminApi/Car/brands",
//     body: searchType,
//   })) as ResponseResult<PaginationType<CarBrandType>>;
// }

export async function AddCarBrandService({ data }: { data: AddCarBrandType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Car/add-brand",
    body: data,
  })) as ResponseResult<CarBrandType>;
}

export async function AddCarBrandModelService({
  data,
}: {
  data: AddCarBrandModelType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminapi/Car/add-model",
    body: data,
  })) as ResponseResult<CarBrandModelType>;
}

export async function GetCarModelCategoryTypes() {
  return (await BaseFetch({
    method: "GET",
    url: "adminApi/Car/model-cats",
  })) as ResponseResult<PaginationType<CarModelCategoryType>>;
}

export async function AddCarBrandTotalService({
  data,
}: {
  data: AddCarBrandType;
}) {
  const result = await AddCarBrandService({ data });
  if (result.IsSuccess) {
    const resultData = result.Data as CarBrandType;
    const arr = data.models as AddCarBrandModelType[];

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      const modelResult = await AddCarBrandModelService({
        data: {
          brandId: resultData.Id,
          categoryId: element.categoryId,
          title: element.title,
        },
      });
      if (!modelResult.IsSuccess) {
        return toast.error(modelResult.Message || "Model Err", {
          position: "top-right",
        });
      }
    }
    return toast.success("Marka Eklendi", { position: "top-right" });
  } else {
    return toast.error(result.Message || "Marka Err", {
      position: "top-right",
    });
  }
}
