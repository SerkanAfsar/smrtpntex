import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { GetAllCategories } from "@/Services/CategoryService";
import { AddProductService } from "@/Services/ProductService";
import { useProductModal } from "@/store/useProductModal";
import { CategoryType } from "@/Types/Category.Types";
import {
  CustomOptionsType,
  GenericType2,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";

import { AddProductType } from "@/Types/Product.Types";
import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

export default function AddEditProductModal({
  setIsUpdated,
}: {
  setIsUpdated: any;
}) {
  const router = useRouter();
  const [isOpened, toggleOpened] = useProductModal(
    useShallow((state) => [state.isOpened, state.toggleOpened]),
  );
  const [categoryList, setCategoryList] = useState<CustomOptionsType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductType>({
    mode: "onChange",
  });

  useEffect(() => {
    const process = async () => {
      const result: ResponseResult<PaginationType<CategoryType>> =
        await GetAllCategories({
          searchType: {
            pageIndex: 1,
            pageSize: 1000,
          },
        });
      if (result.IsSuccess) {
        const data = result.Data as PaginationType<CategoryType>;
        const resultData = data.records as GenericType2<CategoryType>;
        const categoryData: CustomOptionsType[] = resultData.Result.map(
          (item) => ({
            name: item.Name,
            value: item.Id,
          }),
        );
        setCategoryList(categoryData);
      } else {
        setCategoryList([]);
      }
    };
    process();
  }, []);

  const onSubmit: SubmitHandler<AddProductType> = async (data) => {
    const result = await AddProductService({ data });
    if (result.IsSuccess) {
      toast.success("Ürün Eklendi", {
        position: "top-right",
      });
      setIsUpdated();
      reset();
      toggleOpened();
    } else {
      return toast.error(result.Message || "Hata", {
        position: "top-right",
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 pt-0 shadow-2xl transition-all duration-700 ease-in-out",
        isOpened ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="sticky inset-0 z-50 flex items-center justify-between bg-white pt-4">
        <h1 className="text-lg font-medium">Ürün Ekle</h1>
        <Image
          src={ExitIcon}
          alt="Exit"
          className="cursor-pointer"
          onClick={() => toggleOpened()}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <CustomTextbox
          {...register("name", { required: "Ürün Adı Giriniz.." })}
          className="rounded-md border p-3 outline-none"
          title="Ürün Adı"
          err={errors.name?.message}
        />
        <CustomTextbox
          {...register("description", { required: "Ürün Açıklama Giriniz.." })}
          className="rounded-md border p-3 outline-none"
          title="Ürün Açıklama"
          err={errors.description?.message}
        />
        <CustomSelect
          {...register("categoryId", {
            required: "Kategori Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={categoryList}
          className="rounded-md border p-3"
          title="Kategori Seçiniz"
          err={errors.categoryId?.message}
        />
        <CustomSelect
          {...register("unitId", {
            required: "Birim Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={[
            { name: "Adet", value: 1 },
            { name: "Kg", value: 2 },
            { name: "Litre", value: 3 },
          ]}
          className="rounded-md border p-3"
          title="Birim Seçiniz"
          err={errors.unitId?.message}
        />

        <CustomTextbox
          {...register("sku", { required: "Sku Giriniz.." })}
          title="SKU"
          className="rounded-md border p-3 outline-none"
          err={errors.sku?.message}
        />
        <CustomTextbox
          {...register("amount", {
            required: "Tutar Giriniz..",
            valueAsNumber: true,
          })}
          type="number"
          title="Tutar"
          className="rounded-md border p-3 outline-none"
          err={errors.amount?.message}
        />
        <CustomTextbox
          {...register("sort", {
            valueAsNumber: true,
          })}
          title="Sıra"
          className="rounded-md border p-3 outline-none"
          err={errors.sort?.message}
        />

        <CustomCheckbox
          title="Ürün aktifleştirilsin mi?"
          {...register("isActive")}
          name="isActive"
        />

        <CustomButton
          type="submit"
          className="text-md flex w-full items-center justify-center rounded-md bg-[#2970FF] p-2 text-white"
          title="Kaydet"
        />
      </form>
    </div>
  );
}
