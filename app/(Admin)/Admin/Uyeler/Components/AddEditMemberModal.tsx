import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddMemberType, MemberType } from "@/Types/Member.Types";

import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import {
  AddMemberService,
  UpdateMemberService,
} from "@/Services/MemberService";
import { toast } from "react-toastify";

export default function AddEditMemberModal({
  editData,
  isOpenedModal,
  toggleOpenedModal,
  memberTypes,
  companies,
  stations,
  paymentMethods,
  setIsUpdated,
}: {
  editData: AddMemberType;
  isOpenedModal: boolean;
  toggleOpenedModal: any;
  memberTypes: CustomOptionsType[];
  companies: CustomOptionsType[];
  stations: CustomOptionsType[];
  paymentMethods: CustomOptionsType[];
  setIsUpdated: any;
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMemberType>({
    mode: "onChange",
  });

  useEffect(() => {
    reset(editData);
  }, [reset, editData]);

  const onSubmit: SubmitHandler<AddMemberType> = async (data) => {
    const result: ResponseResult<MemberType> = data.Id
      ? await UpdateMemberService({ id: data.Id as number, data })
      : await AddMemberService({ data });

    if (result.IsSuccess) {
      toast.success("Kullanıcı Eklendi", {
        position: "top-right",
      });
      reset();
      setIsUpdated();
      toggleOpenedModal(false);
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
        <h1 className="text-lg font-medium">Firma Ekle</h1>
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
          {...register("memberTypeId", {
            required: "Üye Tipi Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={memberTypes}
          className="rounded-md border p-3"
          title="Üye Tipi Seçiniz"
          err={errors.memberTypeId?.message}
        />
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
        <CustomSelect
          {...register("companyId", {
            required: "Firma Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={companies}
          className="rounded-md border p-3"
          title="Firma Seçiniz"
          err={errors.companyId?.message}
        />
        <CustomSelect
          {...register("stationId", {
            required: "İstasyon Seçiniz",
            valueAsNumber: true,
          })}
          setFirst={true}
          options={stations}
          className="rounded-md border p-3"
          title="İstasyon Seçiniz"
          err={errors.stationId?.message}
        />
        <CustomTextbox
          {...register("firstName", { required: "İsim Giriniz.." })}
          title="İsim"
          className="rounded-md border p-3 outline-none"
          err={errors.firstName?.message}
        />
        <CustomTextbox
          {...register("lastName", { required: "Soyisim Giriniz.." })}
          title="Soyisim"
          className="rounded-md border p-3 outline-none"
          err={errors.lastName?.message}
        />
        <CustomTextbox
          {...register("email", {
            required: "EMail Giriniz..",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-Mail Formatı Yanlış",
            },
          })}
          title="E-Mail"
          type="email"
          className="rounded-md border p-3 outline-none"
          err={errors.email?.message}
        />
        <CustomTextbox
          {...register("gsm", { required: "Gsm Giriniz.." })}
          title="Gsm"
          className="rounded-md border p-3 outline-none"
          err={errors.gsm?.message}
        />
        <CustomTextbox
          {...register("companyName", { required: "Firma Adı Giriniz.." })}
          title="Firma Adı"
          className="rounded-md border p-3 outline-none"
          err={errors.companyName?.message}
        />
        <CustomTextbox
          {...register("taxNumber", { required: "Vergi Numarası Giriniz.." })}
          title="Vergi Numarası"
          className="rounded-md border p-3 outline-none"
          err={errors.taxNumber?.message}
        />
        <CustomTextbox
          {...register("taxOffice", { required: "Vergi Ofisi Giriniz.." })}
          title="Vergi Ofisi"
          className="rounded-md border p-3 outline-none"
          err={errors.taxOffice?.message}
        />
        <CustomCheckbox
          title="Üye aktifleştirilsin mi?"
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
