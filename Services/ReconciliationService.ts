import {
  ReconciliationSearchType,
  ReconciliationType,
} from "@/Types/Reconciliation.Types";
import BaseFetch from "./BaseService";
import { PaginationType, ResponseResult } from "@/Types/Common.Types";

export async function ReconciliationForStationService({
  searchType,
}: {
  searchType: ReconciliationSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Reconciliation/for-station",
    body: searchType,
  })) as ResponseResult<PaginationType<ReconciliationType>>;
}

export async function ReconciliationForCompanyService({
  searchType,
}: {
  searchType: ReconciliationSearchType;
}) {
  return (await BaseFetch({
    method: "POST",
    url: "adminApi/Reconciliation/for-company",
    body: searchType,
  })) as ResponseResult<PaginationType<ReconciliationType>>;
}
