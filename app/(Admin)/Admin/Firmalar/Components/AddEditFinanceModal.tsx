import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { AddCompanyCurrentAccounsService } from "@/Services/CompanyService";

import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import {
  AddCompanyType,
  AddEditCompanyCurrentAccounts,
  CompanyType,
} from "@/Types/Company.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddEditFinanceModal({
  editData,
  paymentMethods,
  toggleOpenedModal,
  isOpenedModal,
  companyId,
  setUpdated,
}: {
  editData?: AddEditCompanyCurrentAccounts;
  paymentMethods: CustomOptionsType[];
  toggleOpenedModal: any;
  isOpenedModal: boolean;
  companyId: number;
  setUpdated: any;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEditCompanyCurrentAccounts>({
    mode: "onChange",
  });

  useEffect(() => {
    reset(editData);
  }, [reset, editData]);
  // const inputRef = useMask({
  //   mask: "+1 (___) ___-__-__",
  //   replacement: { _: /\d/ },
  // });

  //   useEffect(() => {
  //     const { unsubscribe } = watch((value) => {
  //       if (
  //         value.alertLimit &&
  //         value.riskLimit &&
  //         value.alertLimit > value.riskLimit
  //       ) {
  //         setError("alertLimit", {
  //           type: "value",
  //           message: "Uyarı Limiti Risk Limitinden Fazla Olamaz",
  //         });
  //       } else {
  //         clearErrors("alertLimit");
  //       }
  //     });
  //     return () => unsubscribe();
  //   }, [watch, setError, clearErrors]);

  const onSubmit: SubmitHandler<AddEditCompanyCurrentAccounts> = async (
    data,
  ) => {
    const result = await AddCompanyCurrentAccounsService({
      id: companyId,
      data,
    });

    if (result.IsSuccess) {
      toast.success(result.Message || "Başarılı", {
        position: "top-right",
      });
      reset();
      toggleOpenedModal(false);
      setUpdated((prev: boolean) => !prev);
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
        <h1 className="text-lg font-medium">Finans Ekle</h1>
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
          {...register("revenue", {
            required: "Gelir Giriniz..",
            valueAsNumber: true,
          })}
          className="rounded-md border p-3 outline-none"
          title="Gelir (TL)"
          err={errors.revenue?.message}
        />
        <CustomTextbox
          {...register("expense", {
            required: "Gider Giriniz..",
            valueAsNumber: true,
          })}
          className="rounded-md border p-3 outline-none"
          title="Gider (TL)"
          err={errors.expense?.message}
        />
        <CustomTextbox
          {...register("description", {
            required: "Açıklama Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Açıklama"
          err={errors.description?.message}
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
