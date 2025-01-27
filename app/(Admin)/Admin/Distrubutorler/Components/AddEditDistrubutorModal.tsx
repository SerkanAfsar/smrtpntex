import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import {
  AddDistributorService,
  GetPaymentMethodTypes,
  UpdateDistributorService,
} from "@/Services/DistrubitorsService";
import { useDistrubutorModal } from "@/store/useDistrubutorModal";
import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import {
  AddDistributerType,
  PaymentMethodType,
} from "@/Types/Distrubitor.Types";
import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

export default function AddEditDistrubutorModal({
  dataModel,
}: {
  dataModel: AddDistributerType;
}) {
  const router = useRouter();
  const [isOpened, toggleOpened] = useDistrubutorModal(
    useShallow((state) => [state.isOpened, state.toggleOpened]),
  );

  const [paymentMethods, setPaymentMethods] = useState<CustomOptionsType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AddDistributerType>({
    mode: "onChange",
    defaultValues: dataModel,
  });

  useEffect(() => {
    const process = async () => {
      const result: ResponseResult<PaymentMethodType> =
        await GetPaymentMethodTypes();
      if (result.IsSuccess) {
        const data = result.Data as PaymentMethodType[];
        const paymetOptionsData: CustomOptionsType[] = data.map((item) => ({
          name: item.Name,
          value: item.Id,
        }));
        setPaymentMethods(paymetOptionsData);
      } else {
        setPaymentMethods([]);
      }
    };
    process();
  }, []);

  useEffect(() => {
    reset(dataModel);
  }, [reset, dataModel]);

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      if (
        value.alertLimit &&
        value.riskLimit &&
        value.alertLimit > value.riskLimit
      ) {
        setError("alertLimit", {
          type: "value",
          message: "Uyarı Limiti Risk Limitinden Fazla Olamaz",
        });
      } else {
        clearErrors("alertLimit");
      }
    });
    return () => unsubscribe();
  }, [watch, setError, clearErrors]);

  const onSubmit: SubmitHandler<AddDistributerType> = async (data) => {
    const result =
      dataModel.id != 0
        ? await UpdateDistributorService({ id: dataModel.id, data })
        : await AddDistributorService({ data });
    if (result.IsSuccess) {
      if (dataModel.id != 0) {
        toast.warning("Distribütör Güncellendi", {
          position: "top-right",
        });
      } else {
        toast.success("Distribütör Eklendi", {
          position: "top-right",
        });
      }

      reset();
      toggleOpened(false);
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
        isOpened ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Distribütör Ekle</h1>
        <Image
          src={ExitIcon}
          alt="Exit"
          className="cursor-pointer"
          onClick={() => toggleOpened(false)}
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-4"
      >
        <CustomSelect
          {...register("paymentMethodId", {
            required: "Ödeme Tipi Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={paymentMethods}
          className="rounded-md border p-3"
          title="Ödeme Tipi Seçiniz"
          err={errors.paymentMethodId?.message}
        />
        <CustomTextbox
          {...register("title", { required: "Ünvan Giriniz.." })}
          className="rounded-md border p-3 outline-none"
          title="Ünvan"
          err={errors.title?.message}
        />
        <CustomTextbox
          {...register("taxNumber", { required: "Vergi Numarası Giriniz.." })}
          title="Vergi Numarası"
          className="rounded-md border p-3 outline-none"
          err={errors.taxNumber?.message}
        />
        <CustomTextbox
          {...register("taxOffice", { required: "Vergi Dairesi Giriniz.." })}
          title="Vergi Dairesi"
          className="rounded-md border p-3 outline-none"
          err={errors.taxOffice?.message}
        />
        <CustomTextbox
          {...register("purchasePrice", {
            required: "Alış Fiyatı Giriniz..",
            valueAsNumber: true,
          })}
          type="number"
          title="Alış Fiyatı"
          className="rounded-md border p-3 outline-none"
          err={errors.purchasePrice?.message}
        />
        <CustomTextbox
          {...register("alertLimit", {
            required: "Uyarı Limiti (TL) Giriniz..",
            valueAsNumber: true,
          })}
          type="number"
          title="Uyarı Limiti (TL)"
          className="rounded-md border p-3 outline-none"
          err={errors.alertLimit?.message}
          onKeyDown={(e) => {
            if (e.currentTarget.value.length > 7) {
              e.currentTarget.value = e.currentTarget.value.substring(0, 7);
            }
          }}
        />
        <CustomTextbox
          {...register("riskLimit", {
            required: "Risk Limiti (TL) Giriniz..",
            valueAsNumber: true,
          })}
          type="number"
          title="Risk Limiti (TL)"
          className="rounded-md border p-3 outline-none"
          err={errors.riskLimit?.message}
          onKeyDown={(e) => {
            if (e.currentTarget.value.length > 7) {
              e.currentTarget.value = e.currentTarget.value.substring(0, 7);
            }
          }}
        />
        <CustomSelect
          setFirst={true}
          {...register("limitId", {
            required: "Ödeme Tipi Seçiniz",
            valueAsNumber: true,
          })}
          options={[
            { name: "Tahsilatı peşin al", value: 0 },
            { name: "Tahsilatı alımlara göre yap", value: 1 },
          ]}
          className="rounded-md border p-3"
          title="Limit Tipi Seçiniz"
          err={errors.limitId?.message}
        />
        <CustomCheckbox
          title="Distribütör aktifleştirilsin mi?"
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
