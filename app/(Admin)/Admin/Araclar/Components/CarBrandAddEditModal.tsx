import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import {
  AddCarBrandTotalService,
  GetCarModelCategoryTypes,
} from "@/Services/CarService";
import {
  AddCarBrandType,
  CarBrandType,
  CarModelCategoryType,
} from "@/Types/Car.Types";

import {
  CustomOptionsType,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useEffect, useState } from "react";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
export default function CarBrandAddEditModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
  brandData,
  title,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
  brandData: CarBrandType | null;
  title: string;
}) {
  const [modelCats, setModelCats] = useState<CustomOptionsType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CarBrandType>({
    defaultValues: {
      models: brandData?.models,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "models",
  });

  useEffect(() => {
    const getCatModels = async () => {
      const result: ResponseResult<PaginationType<CarModelCategoryType>> =
        await GetCarModelCategoryTypes();
      if (result.IsSuccess) {
        const data = result.Data as PaginationType<CarModelCategoryType>;
        setModelCats(
          (data.records as CarModelCategoryType[]).map((item) => ({
            name: item.Title,
            value: item.Id,
          })),
        );
      }
    };
    getCatModels();
  }, []);

  // useEffect(() => {
  //   clearErrors();
  //   reset({ tanks: stationData?.tanks });
  //   if (stationData == null) {
  //     remove();
  //   }
  // }, [stationData, reset, clearErrors, remove]);

  const onSubmit: SubmitHandler<CarBrandType> = async (data) => {
    const newData: AddCarBrandType = {
      isActive: data.IsActive,
      title: data.Title,
      models:
        data.models?.map((item) => ({
          categoryId: item.CarCategoryId,
          title: item.Title,
          brandId: 0,
        })) || [],
    };
    await AddCarBrandTotalService({ data: newData });
  };

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 pt-0 shadow-2xl transition-all duration-700 ease-in-out",
        isOpenedModal ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="sticky inset-0 z-50 flex items-center justify-between rounded bg-white py-5 pt-4">
        <h1 className="text-lg font-medium">{title}</h1>
        <Image
          src={ExitIcon}
          alt="Exit"
          className="cursor-pointer"
          onClick={() => toggleOpened()}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-md border p-4">
          <h2 className="text-sm font-bold">Marka Bilgileri</h2>
          <CustomTextbox
            {...register("Title", {
              required: "Başlık Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Marka Adı"
            defaultValue={brandData?.Title}
            err={errors.Title?.message}
          />

          <CustomCheckbox
            title="Aktif mi?"
            {...register("IsActive")}
            name="IsActive"
            defaultChecked={brandData?.IsActive ?? false}
          />
        </div>
        {fields.length > 0 && <h2 className="text-md font-bold">Modeller</h2>}
        {fields.map((field, index) => (
          <div
            className="flex flex-col gap-4 rounded-md border p-4"
            key={field.id}
          >
            <h2 className="flex items-center justify-between text-sm font-bold">
              <span>{field.Id ? field.Title : `Model ${index + 1}`} </span>
              <button
                type="button"
                onClick={async () => {
                  if (field.Id) {
                    // const confirmMessage = confirm(
                    //   "Modeli Sistemden Silmek İstediğinizden Emin misiniz?",
                    // );
                    // if (confirmMessage) {
                    //   const result = await DeleteTankByIdService({
                    //     tankId: field.Id,
                    //   });
                    //   if (result.IsSuccess) {
                    //     toast.success("Tank Sistemden Silindi", {
                    //       position: "top-right",
                    //     });
                    //     remove(index);
                    //   }
                    // }
                  } else {
                    remove(index);
                  }
                }}
                className={cn(
                  "rounded-md px-3 py-2 text-white",
                  field.Id ? "bg-red-600" : "bg-red-500",
                )}
              >
                {field.Id ? "Tankı Sil" : "Kaldır"}
              </button>
            </h2>
            <CustomSelect
              {...register(`models.${index}.CarCategoryId`, {
                required: "Kategori Seçiniz",
                valueAsNumber: true,
              })}
              setFirst={false}
              options={modelCats}
              className="rounded-md border p-3"
              title="Kategori Seçiniz"
              err={errors.models?.[index]?.CarCategoryId?.message}
            />

            <CustomTextbox
              {...register(`models.${index}.Title`, {
                required: "Başlık Giriniz..",
              })}
              className="rounded-md border p-3 outline-none"
              title="Başlık"
              err={errors.models?.[index]?.Title?.message}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              CarBrandId: 0,
              CarCategoryId: 0,
              CreatedById: null,
              CreatedDate: "",
              DeletedById: null,
              DeletedDate: null,
              Id: 0,
              IsActive: false,
              IsDeleted: false,
              Title: "",
            })
          }
          className="self-end justify-self-end rounded-md bg-black px-3 py-2 text-white"
        >
          Model Ekle
        </button>

        <CustomButton
          type="submit"
          disabled={isSubmitting}
          className="text-md flex w-full items-center justify-center rounded-md bg-[#2970FF] p-2 text-white"
          title={isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        />
      </form>
    </div>
  );
}
