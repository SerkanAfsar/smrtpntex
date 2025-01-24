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
      console.log("element is ", element);
      const modelResult = await AddCarBrandModelService({
        data: {
          brandId: resultData.Id as number,
          categoryId: element.categoryId,
          title: element.title,
        },
      });
      if (!modelResult.IsSuccess) {
        const resultData = modelResult.Data as CarBrandType;
        await CarBrandDeleteService({ id: resultData.Id as number });
        return modelResult;
      }
    }
  }
  return result;
}

export async function GetCarBrandByIdService({ id }: { id: number }) {
  const result = (await BaseFetch({
    method: "GET",
    url: `adminApi/Car/brand-getbyid/${id}`,
  })) as ResponseResult<CarBrandType>;
  if (result.IsSuccess) {
    const resultData = result.Data as CarBrandType;
    const brandsResult = await GetCarModelsByBrandIdService({
      brandId: resultData.Id as number,
    });

    if (brandsResult.IsSuccess) {
      const brandsResultData =
        brandsResult.Data as PaginationType<CarBrandModelType>;
      resultData.models = brandsResultData.records as CarBrandModelType[];
      const newResponseResult: ResponseResult<CarBrandType> = {
        Code: 200,
        IsSuccess: true,
        Data: resultData,
      };
      return newResponseResult;
    }
    return result;
  }
  return result;
}

export async function CarBrandDeleteService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Car/brand-delete/${id}`,
  })) as ResponseResult<CarBrandType>;
}

export async function GetCarModelsByBrandIdService({
  brandId,
}: {
  brandId: number;
}) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Car/models/${brandId}`,
    body: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })) as ResponseResult<CarBrandType>;
}

export async function DeleteCarModelByIdService({ id }: { id: number }) {
  return (await BaseFetch({
    method: "POST",
    url: `adminApi/Car/model-delete/${id}`,
  })) as ResponseResult<CarBrandModelType>;
}
