import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { AddCompanyService } from "@/Services/CompanyService";
import { GetPaymentMethodTypes } from "@/Services/DistrubitorsService";
import { useCompanyModal } from "@/store/useCompanyModal";
import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";
import { AddCompanyType } from "@/Types/Company.Types";
import { PaymentMethodType } from "@/Types/Distrubitor.Types";
import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddEditCompanyModal() {
  const router = useRouter();
  const { isOpened, toggleOpened } = useCompanyModal();
  const [paymentMethods, setPaymentMethods] = useState<CustomOptionsType[]>([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCompanyType>({
    mode: "onChange",
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

  const onSubmit: SubmitHandler<AddCompanyType> = async (data) => {
    const result = await AddCompanyService({ data });
    if (result.IsSuccess) {
      toast.success("Firma Eklendi", {
        position: "top-right",
      });
      reset();
      toggleOpened();
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
        <h1 className="text-lg font-medium">Firma Ekle</h1>
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
          {...register("title", { required: "Tam Ünvan Giriniz.." })}
          className="rounded-md border p-3 outline-none"
          title="Tam Ünvan"
          err={errors.title?.message}
        />
        <CustomTextbox
          {...register("taxNumber", {
            required: "Vergi Numarası Giriniz..",
            max: {
              value: 10,
              message: "Vergi Numarası 10 Haneden Oluşmalıdır.",
            },
            min: {
              value: 10,
              message: "Vergi Numarası 10 Haneden Oluşmalıdır.",
            },
          })}
          title="Vergi Numarası"
          className="rounded-md border p-3 outline-none"
          err={errors.taxNumber?.message}
          onChange={(e) => {
            if (e.target.value.length > 10) {
              return false;
            }
          }}
        />
        <CustomTextbox
          {...register("taxOffice", { required: "Vergi Dairesi Giriniz.." })}
          title="Vergi Dairesi"
          className="rounded-md border p-3 outline-none"
          err={errors.taxOffice?.message}
        />

        <CustomTextbox
          {...register("alertLimit", {
            required: "Uyarı Limiti ( TL )  Giriniz..",
            valueAsNumber: true,
          })}
          defaultValue={0}
          type="number"
          title="Uyarı Limiti ( TL ) "
          className="rounded-md border p-3 outline-none"
          err={errors.alertLimit?.message}
        />
        <CustomTextbox
          {...register("riskLimit", {
            required: "Toplam Risk Limiti ( TL ) Giriniz..",
            valueAsNumber: true,
          })}
          defaultValue={0}
          type="number"
          title="Toplam Risk Limiti ( TL )"
          className="rounded-md border p-3 outline-none"
          err={errors.riskLimit?.message}
        />

        <CustomCheckbox
          title="Firma aktifleştirilsin mi?"
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
