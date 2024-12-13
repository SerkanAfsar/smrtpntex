import { GetAllDistrubitors } from "@/Services/DistrubitorsService";
import DistrubutorContainer from "./Containers/DistrubutorContainer";
import { PaginationType } from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";

export default async function Page() {
  const result = await GetAllDistrubitors({
    searchType: {
      pageIndex: 1,
      pageSize: 10000,
    },
  });
  if (!result.IsSuccess) {
    throw new Error(result.Message || "Hata");
  }

  return (
    <DistrubutorContainer
      dataResult={result.Data as PaginationType<DistrubitorType>}
    />
  );
}
