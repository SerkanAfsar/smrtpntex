import {
  PetronetDealersType,
  PetronetSearchType,
  PetronetTankSimulesType,
  PetronetTankStatusType,
  PetronetTankTransactionsType,
} from "@/Types/Petronet.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function GetPetronetDealersService({
  searchType,
}: {
  searchType: PetronetSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Petronet/dealers",
    body: searchType,
  })) as ResponseResult<PaginationType<PetronetDealersType>>;
}

export async function GetPetronetDealerSalesService({
  searchType,
}: {
  searchType: PetronetSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Petronet/dealer-sales",
    body: searchType,
  })) as ResponseResult<PaginationType<PetronetDealersType>>;
}

export async function GetPetronetTankStatusService({
  searchType,
}: {
  searchType: PetronetSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Petronet/tank-status",
    body: searchType,
  })) as ResponseResult<PaginationType<PetronetTankStatusType>>;
}

export async function GetPetronetTransactionsService({
  searchType,
}: {
  searchType: PetronetSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Petronet/tank-transactions",
    body: searchType,
  })) as ResponseResult<PaginationType<PetronetTankTransactionsType>>;
}

export async function GetPetronetSimulesService({
  searchType,
}: {
  searchType: PetronetSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Petronet/tank-simules",
    body: searchType,
  })) as ResponseResult<PaginationType<PetronetTankSimulesType>>;
}
