import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import {
  AddBpOrderService,
  GetBpOrderStationList,
} from "@/Services/BpOrderService";

import { useBpOrderModal } from "@/store/useBpOderModal";

import {
  AddBpOrderType,
  BpOrderListType,
  BpOrderStationType,
} from "@/Types/BpOrder.Types";
import {
  CustomOptionsType,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

export default function BpOrderEditModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
}) {
  const router = useRouter();

  const [stationList, setStationList] = useState<CustomOptionsType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBpOrderType>({
    mode: "onChange",
  });

  useEffect(() => {
    const process = async () => {
      const result: ResponseResult<PaginationType<BpOrderStationType>> =
        await GetBpOrderStationList();
      if (result.IsSuccess) {
        const data = result.Data as PaginationType<BpOrderStationType>;
        const paymetOptionsData: CustomOptionsType[] = (
          data.records as BpOrderStationType[]
        ).map((item) => ({
          name: item.AccountName,
          value: item.Code,
        }));
        setStationList(paymetOptionsData);
      } else {
        setStationList([]);
      }
    };
    process();
  }, []);

  const onSubmit: SubmitHandler<AddBpOrderType> = async (data) => {
    const result = await AddBpOrderService({ data });
    if (result.IsSuccess) {
      toast.success("Sipariş Eklendi", {
        position: "top-right",
      });
      reset();
      toggleOpened();
      setUpdated();
      return router.refresh();
    } else {
      return toast.error(result.Message || "Hata", {
        position: "top-right",
      });
    }
  };

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 shadow-2xl transition-all duration-700 ease-in-out",
        isOpenedModal ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Sipariş Ekle</h1>
        <Image
          src={ExitIcon}
          alt="Exit"
          className="cursor-pointer"
          onClick={() => toggleOpened()}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-4"
      >
        <CustomSelect
          {...register("stationCode", {
            required: "İstasyon Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={stationList}
          className="rounded-md border p-3"
          title="İstasyon Seçiniz"
          err={errors.stationCode?.message}
        />

        <CustomTextbox
          {...register("quantity", {
            required: "Adet Giriniz..",
            valueAsNumber: true,
          })}
          className="rounded-md border p-3 outline-none"
          title="Adet"
          err={errors.quantity?.message}
        />
        <CustomTextbox
          type="date"
          title="Tarih Seçiniz"
          className="rounded-md border p-3 outline-none"
          {...register("orderDate", { required: "Tarih Seçiniz" })}
          err={errors.orderDate?.message}
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
