import { cn } from "@/Utils";
import { CustomTextbox } from "../UI/CustomTextbox";

import CustomAddress from "./CustomAddress";

export default function BaseAddressSection({
  fields,
  append,
  remove,
  register,
  errors,
  watch,
  setValue,
  clearErrors,
  getValues,
}: {
  fields: any;
  append: any;
  remove: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  clearErrors: any;
  getValues: any;
}) {
  return (
    <>
      {fields.map((field: any, index: number) => (
        <div
          className="flex flex-col gap-4 rounded-md border p-4"
          key={field.id}
        >
          <h2 className="flex items-center justify-between text-sm font-bold">
            <span>{field.Id ? field.title : `Adres ${index + 1}`} </span>
            <button
              type="button"
              onClick={async () => {
                if (field.Id) {
                  const confirmMessage = confirm(
                    "Adresi Sistemden Silmek İstediğinizden Emin misiniz?",
                  );
                  if (confirmMessage) {
                    // const result = await DeleteTankByIdService({
                    //   tankId: field.Id,
                    // });
                    // if (result.IsSuccess) {
                    //   toast.success("Tank Sistemden Silindi", {
                    //     position: "top-right",
                    //   });
                    //   remove(index);
                    // }
                  }
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
          <CustomTextbox
            {...register(`addresses.${index}.title`, {
              required: "Başlık Giriniz..",
            })}
            title="Başlık"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.title?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.company`, {
              required: "Şirket İsmi Giriniz..",
            })}
            title="Şirket"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.company?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.firstName`, {
              required: "İsim Giriniz..",
            })}
            title="İsim"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.firstName?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.lastName`, {
              required: "Soyisim Giriniz..",
            })}
            title="Soyisim"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.lastName?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.email`, {
              required: "EMail Giriniz..",
            })}
            title="EMail"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.email?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.phoneNumber`, {
              required: "Telefon Numarası Giriniz..",
            })}
            title="Telefon No"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.phoneNumber?.message}
          />
          <CustomAddress
            errors={errors}
            index={index}
            register={register}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            getValues={getValues}
          />

          <CustomTextbox
            {...register(`addresses.${index}.addressLine`, {
              required: "Açık Adres Giriniz..",
            })}
            title="Açık Adres"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.addressLine?.message}
          />
          <CustomTextbox
            {...register(`addresses.${index}.zipPostalCode`, {
              required: "Posta Numarası Giriniz..",
            })}
            title="Posta Numarası"
            className="rounded-md border p-3 outline-none"
            err={errors.addresses?.[index]?.zipPostalCode?.message}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            title: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            company: "",
            countryId: "",
            provinceId: "",
            districtId: "",
            neighborhoodId: "",
            addressLine: undefined,
            zipPostalCode: undefined,
          })
        }
        className="self-end justify-self-end rounded-md bg-black px-3 py-2 text-white"
      >
        Adres Ekle
      </button>
    </>
  );
}
