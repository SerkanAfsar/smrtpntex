"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import CustomGrid from "@/Components/UI/CustomGrid";

import { ExportCsvIcon, PlusSmall } from "@/Utils/IconList";
import { AraclarDatatableProps } from "@/Utils/Variables";
import { returnCarItem } from "@/Utils/ConvertTableItems";

import { useState } from "react";

import ContentWithInfoSection from "@/Components/Admin/ContentWithInfoSection";
import ContentSubLeftSearch from "@/Components/Admin/ContentSubLeftSearch";
import { PaginationType } from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { useDistrubutorModal } from "@/store/useDistrubutorModal";

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
  dataResult: PaginationType<CategoryType>;
}) {
  const [keywords, setKeywords] = useState<string>();

  const [toggleOpened, selectedId, selectAction] = useProductModal(
    useShallow((state) => [
      state.toggleOpened,
      state.selectedId,
      state.setSelectedProduct,
      state,
    ]),
  );
  return (
    <>
      <ProductsSubLeftSection
        actionOne={() => {
          alert("test");
        }}
        addAction={() => {
          toggleOpened();
        }}
        addTitle="Ürün Ekle"
        placeholder="Ürün Ara"
        title="Ürümnler"
        variables={dataResult.records.map((item: CategoryType) => ({
          name: item.name,
          value: item.Id.toString(),
          active: item.IsActive,
        }))}
        selectAction={selectAction}
      />
      <ContentWithInfoSection>
        {selectedId ? (
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
            {/* <CustomGrid
              search={false}
              columns={AraclarDatatableProps.columns}
              pagination={true}
              sort={true}
              convertAction={returnCarItem}
              apiUrl="/api/cars/getlist"
            /> */}
            <div>Müşteriler Tablosu Gelicek</div>
          </>
        ) : (
          <NotSelected
            title="Ürün"
            action={() => toggleOpened()}
            buttonTitle="Ürün Ekle"
          />
        )}
      </ContentWithInfoSection>
      {/* <AddEditDistrubutorModal /> */}
      <AddEditProductModal />
    </>
  );
}
