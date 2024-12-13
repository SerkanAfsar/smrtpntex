import { PaginationType } from "@/Types/Common.Types";
import CompaniesContainer from "./Containers/CompanyContainer";
import { CompanyType } from "@/Types/Company.Types";
import { GetAllCompanies } from "@/Services/CompanyService";

export default async function Page() {
  const result = await GetAllCompanies({
    searchType: {
      pageIndex: 1,
      pageSize: 10000,
    },
  });
  if (!result.IsSuccess) {
    throw new Error(result.Message || "Hata");
  }

  return (
    <CompaniesContainer
      dataResult={result.Data as PaginationType<CompanyType>}
    />
  );
}
