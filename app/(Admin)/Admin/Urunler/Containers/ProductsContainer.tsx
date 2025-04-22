"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { useCallback, useState } from "react";
import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import { GenericType2, ResponseResult } from "@/Types/Common.Types";
import { useShallow } from "zustand/shallow";

import { CategoryType } from "@/Types/Category.Types";
import ProductCustomSearch from "../Components/ProductCustomSearch";
import AddEditProductModal from "../Components/AddEditProductModal";
import { useProductModal } from "@/store/useProductModal";
import { cn } from "@/Utils";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import { ProductHeaderColumns } from "@/Utils/Variables";
import { toast } from "react-toastify";
import { ProductType } from "@/Types/Product.Types";
import { DeleteProductService } from "@/Services/ProductService";

export default function ProductsContainer({
  dataResult,
}: {
  dataResult: GenericType2<CategoryType>;
}) {
  const isForceOpened = useLeftMenuStore((state) => state.isOpened);
  const [keywords, setKeywords] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>();
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

  const deleteProductFunc = useCallback(
    async ({ id }: { id: number }) => {
      const confirmMessage = confirm(
        "Ürünü Silmek İstediğinizden Emin misiniz?",
      );
      if (confirmMessage) {
        const result: ResponseResult<ProductType> = await DeleteProductService({
          id,
        });
        if (result.IsSuccess) {
          setIsUpdated();
          return toast.success("Ürün Silindi", { position: "top-right" });
        } else {
          return toast.error(result.Message ?? "Ürün Silme Hatası", {
            position: "top-right",
          });
        }
      }
    },
    [setIsUpdated],
  );

  return (
    <>
      {/* <ProductsSubLeftSection
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
      /> */}
      <div
        className={cn(
          "flex flex-1 flex-col bg-adminBgColor transition-all",
          isForceOpened ? "ml-[244px]" : "ml-[62px]",
        )}
      >
        <ContentWithInfoSection>
          <AdminTopSection className="border-b">
            <h3>Ürünler</h3>
            <div className="flex items-center justify-between gap-3">
              <CustomButton
                className="gap-1 bg-green-100 p-1.5 text-sm text-green-600"
                icon={ExportCsvIcon}
              />
              <CustomButton
                title="Ürün Ekle"
                onClick={async () => {
                  toggleOpened(false);
                  await selectAction(undefined);
                  toggleOpened(true);
                }}
                className="bg-adminDarkBlueBg px-3 text-adminDarkBlue"
                icon={PlusSmall}
              />
            </div>
          </AdminTopSection>
          <ProductCustomSearch
            setKeywords={setKeywords}
            setStatus={setStatus}
          />
          <CustomDatatable
            apiUrl={"/api/products/getlist"}
            columns={ProductHeaderColumns(
              async ({ id }: { id: number }) => {
                toggleOpened(false);
                await selectAction(id);
                toggleOpened(true);
              },
              async ({ id }: { id: number }) => {
                await deleteProductFunc({ id });
              },
            )}
            keywords={keywords}
            updated={isUpdated}
            statusId={status}
          />
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
      </div>
    </>
  );
}
