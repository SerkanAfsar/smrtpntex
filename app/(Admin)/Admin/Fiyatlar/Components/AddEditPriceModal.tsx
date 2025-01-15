import CustomButton from "@/Components/UI/CustomButton";

import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";

import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AddPriceType, PriceType } from "@/Types/Price.Types";
import { AddPriceService, UpdatePriceService } from "@/Services/PriceService";
import { toast } from "react-toastify";
import CustomRadioButtonListGroup, {
  CustomRadioButtonInputRef,
} from "@/Components/UI/CustomRadioButtonList";

export default function AddEditPriceModal({
  editData,
  productList,
  companyList,
  stationList,
  memberList,
  isOpenedModal,
  toggleOpenedModal,
  setUpdated,
}: {
  editData: AddPriceType;
  productList: CustomOptionsType[];
  companyList: CustomOptionsType[];
  stationList: CustomOptionsType[];
  memberList: CustomOptionsType[];
  toggleOpenedModal: any;
  isOpenedModal: boolean;
  setUpdated: any;
}) {
  const types = [
    { title: "Firma", value: "Firma" },
    { title: "İstasyon", value: "İstasyon" },
    { title: "Üye", value: "Üye" },
  ];
  const router = useRouter();
  const typeRef = useRef<CustomRadioButtonInputRef>(null);
  const [selectedType, setSelectedType] = useState<
    "Firma" | "İstasyon" | "Üye"
  >("Firma");

  const {
    register,
    reset,
    handleSubmit,
    unregister,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPriceType>({
    mode: "onChange",
    defaultValues: editData,
  });

  useEffect(() => {
    reset(editData);
  }, [reset, editData]);

  const onSubmit: SubmitHandler<AddPriceType> = async (data) => {
    const newData: AddPriceType = data;
    if (selectedType == "Firma") {
      newData.stationId = null;
      newData.memberId = null;
    } else if (selectedType == "Üye") {
      newData.stationId = null;
      newData.companyId = null;
    } else {
      newData.memberId = null;
      newData.companyId = null;
    }

    const result: ResponseResult<PriceType> = !newData.Id
      ? await AddPriceService({
          data: newData,
        })
      : await UpdatePriceService({ id: newData.Id, data: newData });
    if (result.IsSuccess) {
      if (!newData.Id) {
        toast.success("Fiyat Eklendi", {
          position: "top-right",
        });
      } else {
        toast.warning("Fiyat Güncellendi", {
          position: "top-right",
        });
      }
      reset();
      toggleOpenedModal(false);
      setUpdated();
      return router.refresh();
    } else {
      return toast.error(result.Message || "Hata", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {}, [selectedType]);

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 shadow-2xl transition-all duration-700 ease-in-out",
        isOpenedModal ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">
          {editData.Id ? "Fiyat Güncelle" : "Fiyat Ekle"}
        </h1>
        <Image
          src={ExitIcon}
          alt="Exit"
          className="cursor-pointer"
          onClick={() => toggleOpenedModal(false)}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-4"
      >
        <CustomRadioButtonListGroup
          ref={typeRef}
          name="tip"
          selectedType={selectedType}
          options={types}
          setSelectedType={setSelectedType}
        />
        <CustomSelect
          {...register("productId", {
            required: "Ürün Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={productList}
          className="rounded-md border p-3"
          title="Ürün Seçiniz"
          err={errors.productId?.message}
        />
        <CustomSelect
          {...register("companyId", {
            valueAsNumber: true,
            validate: (val) => {
              return selectedType == "Firma" && !val ? "Firma Seçiniz" : true;
            },
          })}
          outerClass={cn(selectedType != "Firma" && "hidden")}
          setFirst={true}
          options={companyList}
          className={cn("rounded-md border p-3")}
          title="Firma Seçiniz"
          err={errors.companyId?.message}
        />
        <CustomSelect
          {...register("stationId", {
            valueAsNumber: true,
            validate: (val) => {
              return selectedType == "İstasyon" && !val
                ? "İstasyon Seçiniz"
                : true;
            },
          })}
          setFirst={true}
          options={stationList}
          className={cn("rounded-md border p-3")}
          outerClass={cn(selectedType != "İstasyon" && "hidden")}
          title="İstasyon Seçiniz"
          err={errors.stationId?.message}
        />
        <CustomSelect
          {...register("memberId", {
            valueAsNumber: true,
            validate: (val) => {
              return selectedType == "Üye" && !val ? "Üye Seçiniz" : true;
            },
          })}
          setFirst={true}
          options={memberList}
          outerClass={cn(selectedType != "Üye" && "hidden")}
          className={cn("rounded-md border p-3")}
          title="Üye Seçiniz"
          err={errors.memberId?.message}
        />

        <CustomTextbox
          {...register("newAmount", { required: "Yeni Fiyat Giriniz.." })}
          className="rounded-md border p-3 outline-none"
          title="Yeni Fiyat"
          type="number"
          err={errors.newAmount?.message}
        />
        <CustomTextbox
          {...register("discountRatio", {
            required: "İndirim Oranı Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="İndirim Oranı"
          type="number"
          err={errors.discountRatio?.message}
        />
        <CustomTextbox
          {...register("startDate", {
            required: "Başlangıç Tarihi Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Başlangıç Tarihi"
          type="date"
          err={errors.startDate?.message}
        />
        <CustomTextbox
          {...register("endDate", {
            required: "Bitiş Tarihi Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Bitiş Tarihi"
          type="date"
          err={errors.endDate?.message}
        />

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
