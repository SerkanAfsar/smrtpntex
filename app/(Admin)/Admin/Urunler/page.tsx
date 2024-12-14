import { GetAllCategories } from "@/Services/CategoryService";
import ProductsContainer from "./Containers/ProductsContainer";
import { PaginationType } from "@/Types/Common.Types";
import { CategoryType } from "@/Types/Category.Types";

export default async function Page() {
  const result = await GetAllCategories({
    searchType: {
      pageIndex: 1,
      pageSize: 10000,
    },
  });
  if (!result.IsSuccess) {
    throw new Error(result.Message || "Hata");
  }
  return (
    <ProductsContainer
      dataResult={result.Data as PaginationType<CategoryType>}
    />
  );
}
