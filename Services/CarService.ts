import { CarListType, CarType } from "@/Types/Car.Types";
import BaseFetch from "./BaseService";
import { ResponseResult } from "@/Types/Common.Types";

export async function GetCarList({ searchType }: { searchType: CarListType }) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Car/List",
    body: searchType,
  })) as ResponseResult<CarType>;
}
