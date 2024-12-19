import CustomButton from "@/Components/UI/CustomButton";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { GetAllProducts } from "@/Services/ProductService";
import { useProductModal } from "@/store/useProductModal";
import {
  GenericType2,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";
import { ProductListType, ProductType } from "@/Types/Product.Types";
import {
  EditIcon,
  ExportCsvIcon,
  PlusSmall,
  SearchIcon,
} from "@/Utils/IconList";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export type VariablesType = {
  name: string;
  value: string;
  active: boolean;
};

export type ContentSubLeftSearchType = {
  title: string;
  addTitle: string;
  actionOne: () => void;
  addAction: () => void;
  placeholder: string;
  variables: VariablesType[];
  selectAction: (id?: number) => void;
};
export type SelectTypes = "all" | "true" | "false";
export default function ProductsSubLeftSection({
  actionOne,
  addAction,
  addTitle,
  placeholder,
  title,
  variables,
  selectAction,
}: ContentSubLeftSearchType) {
  const [isOpened] = useProductModal(useShallow((state) => [state.isOpened]));
  const [searchKey, setSearchKey] = useState<string>();
  const [selectedType, setSelectedType] = useState<SelectTypes>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    const process = async () => {
      const searchType: ProductListType = {
        pageIndex: 1,
        pageSize: 1000,
      };
      if (selectedCategory) {
        searchType.categoryId = Number(selectedCategory);
      }
      if (selectedType != "all") {
        searchType.status = Boolean(selectedType == "true" ? true : false);
      }
      if (searchKey) {
        searchType.productName = searchKey;
      }

      const response: ResponseResult<PaginationType<ProductType>> =
        await GetAllProducts({
          searchType,
        });

      if (response.IsSuccess) {
        const data = response.Data as PaginationType<ProductType>;
        const data2 = data.records as GenericType2<ProductType>;
        setProductList(data2.Result as ProductType[]);
      } else {
        setProductList([]);
      }
    };
    if (!isOpened) {
      process();
    }
  }, [searchKey, selectedCategory, selectedType, isOpened]);

  return (
    <section className="ml-[62px] flex w-[320px] flex-col border-r bg-white">
      <div className="flex w-full flex-col gap-3 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3>Ürünler</h3>
          <div className="flex items-center gap-3">
            <CustomButton
              className="bg-green-100 p-2 px-2.5 text-sm text-green-600"
              onClick={() => actionOne()}
              iconWidth={16}
              iconHeight={16}
              icon={ExportCsvIcon}
            />
            <CustomButton
              className="P-2 bg-blue-100 px-2.5 text-blue-500"
              onClick={() => addAction()}
              icon={PlusSmall}
              title={addTitle}
            />
          </div>
        </div>
        <CustomTextbox
          icon={SearchIcon}
          className="rounded-md border border-gray-300 bg-gray-50 p-2 py-2.5 pl-9 text-sm text-black outline-none placeholder:text-xs placeholder:text-gray-500"
          isFull={true}
          placeholder={placeholder}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="flex items-center justify-between gap-3">
          <CustomSelect
            onChange={(e) =>
              setSelectedType(e.currentTarget.value as SelectTypes)
            }
            isFull={true}
            className="relative w-full rounded-md border border-dashed border-gray-400 px-2 py-3 text-xs leading-tight outline-none"
            options={[
              {
                value: "all",
                name: "Tümü",
              },
              {
                value: "true",
                name: "Aktif",
              },
              {
                value: "false",
                name: "Pasif",
              },
            ]}
          />
          <CustomSelect
            onChange={(e) =>
              setSelectedCategory(e.currentTarget.value as string)
            }
            setFirst={true}
            subTitle="Kategori"
            isFull={true}
            className="relative rounded-md border border-dashed border-gray-400 px-2 py-3 text-xs leading-tight outline-none"
            options={variables}
          />
        </div>
      </div>
      <hr />
      <div className="w-full flex-1 flex-col gap-6 overflow-auto overscroll-contain p-4">
        {productList.map((item: ProductType, index) => (
          <div
            className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md p-3 text-sm transition-all hover:bg-blue-100"
            key={index}
            onClick={() => selectAction(Number(item.Id))}
          >
            <div className="flex w-full items-center justify-between">
              <h4 className="text-[16px]">{item.Name}</h4>
              <div className="h-[30px]">
                <Image
                  src={EditIcon}
                  width={20}
                  height={20}
                  alt={item.Name}
                  className="hidden opacity-0 transition-all delay-[25] group-hover:block group-hover:opacity-100"
                />
                <div className="block rounded-md bg-[#2970ff] px-2 py-1 text-sm text-white opacity-100 group-hover:hidden group-hover:opacity-0">
                  {item.CategoryPath}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between text-gray-500">
              <span>{item.Point}</span>
              <span>{item.Sku}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
