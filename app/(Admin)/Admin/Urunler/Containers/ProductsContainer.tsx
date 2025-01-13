"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import { GenericType2 } from "@/Types/Common.Types";
import { useShallow } from "zustand/shallow";
import NotSelected from "@/Components/Admin/NotSelected";
import ProductsSubLeftSection from "../Components/ProductsSubLeftSection";
import { CategoryType } from "@/Types/Category.Types";
import ProductCustomSearch from "../Components/ProductCustomSearch";
import AddEditProductModal from "../Components/AddEditProductModal";
import { useProductModal } from "@/store/useProductModal";

export default function ProductsContainer({
  dataResult,
}: {
  dataResult: GenericType2<CategoryType>;
}) {
  const [keywords, setKeywords] = useState<string>();
  const data = dataResult.Result as CategoryType[];

  const [
    toggleOpened,
    selectedProduct,
    selectAction,
    isOpened,
    isUpdated,
    setIsUpdated,
  ] = useProductModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedProduct,
      state.setSelectedProduct,
      state.isOpened,
      state.isUpdated,
      state.setIsUpdated,
    ]),
  );

  return (
    <>
      <ProductsSubLeftSection
        actionOne={() => {
          alert("test");
        }}
        addAction={async () => {
          toggleOpened(false);
          await selectAction(undefined);
          toggleOpened(true);
        }}
        addTitle="Ürün Ekle"
        placeholder="Ürün Ara"
        title="Ürünler"
        variables={data.map((item: CategoryType) => ({
          name: item.Name,
          value: item.Id.toString(),
          active: item.IsActive,
        }))}
        selectAction={selectAction}
        setIsUpdated={setIsUpdated}
        isUpdated={isUpdated}
        toggleOpened={toggleOpened}
      />
      <ContentWithInfoSection>
        {selectedProduct?.Id ? (
          <>
            <AdminTopSection className="border-b">
              <h3>Müşteriler</h3>
              <div className="flex items-center justify-between gap-3">
                <CustomButton
                  className="gap-1 bg-green-100 p-1.5 text-sm text-green-600"
                  icon={ExportCsvIcon}
                />
                <CustomButton
                  title="Müşteri Ekle"
                  className="bg-adminDarkBlueBg px-3 text-adminDarkBlue"
                  icon={PlusSmall}
                />
              </div>
            </AdminTopSection>
            <ProductCustomSearch setKeywords={setKeywords} />
          </>
        ) : (
          <NotSelected
            title="Ürün"
            action={() => toggleOpened(true)}
            buttonTitle="Ürün Ekle"
          />
        )}
      </ContentWithInfoSection>

      <AddEditProductModal
        categoryList={data.map((category) => ({
          name: category.Name,
          value: category.Id,
        }))}
        editData={{
          amount: selectedProduct?.Amount ?? null,
          categoryId: selectedProduct?.CategoryId ?? null,
          description: selectedProduct?.Description ?? "",
          isActive: selectedProduct?.IsActive ?? null,
          name: selectedProduct?.Name ?? null,
          sku: selectedProduct?.Sku ?? null,
          sort: selectedProduct?.Sort ?? null,
          unitId: selectedProduct?.UnitId ?? null,
          Id: selectedProduct?.Id ?? undefined,
        }}
        setIsUpdated={setIsUpdated}
        toggleOpened={toggleOpened}
        isOpened={isOpened}
      />
    </>
  );
}
