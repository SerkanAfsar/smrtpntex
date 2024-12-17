import { GetAllCategories } from "@/Services/CategoryService";
import ProductsContainer from "./Containers/ProductsContainer";
import { GenericType2, PaginationType } from "@/Types/Common.Types";
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
  const data = result.Data as PaginationType<CategoryType>;

  return (
    <ProductsContainer
      dataResult={data.records as GenericType2<CategoryType>}
    />
  );
}
