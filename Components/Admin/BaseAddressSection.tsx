import { cn } from "@/Utils";
import CustomSelect from "../UI/CustomSelect";
import { CustomTextbox } from "../UI/CustomTextbox";
import { useEffect, useState } from "react";
import {
  CountryType,
  DistrictsType,
  NeighbourType,
  ProvicesType,
} from "@/Types/Address.Types";
import {
  GetAllCountries,
  GetDisctrictsByProvinceId,
  GetNeighboursByDistrictId,
  GetProvicesByCountryId,
} from "@/Services/ProvinceService";
import { CustomOptionsType, PaginationType } from "@/Types/Common.Types";

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

function CustomAddress({
  register,
  index,
  errors,
  watch,
  setValue,
  clearErrors,
  getValues,
}: {
  register: any;
  index: number;
  errors: any;
  watch: any;
  setValue: any;
  clearErrors: any;
  getValues: any;
}) {
  const [selectedCountry, setSelectedCountry] = useState<number | undefined>(
    getValues(`addresses.${index}.countryId`) ?? undefined,
  );
  const [countryList, setCountryList] = useState<CustomOptionsType[]>([]);

  const [selectedCity, setSelectedCity] = useState<number | undefined>(
    getValues(`addresses.${index}.provinceId`) ?? undefined,
  );
  const [cityList, setCityList] = useState<CustomOptionsType[]>([]);

  const [selectedDistrict, setSelectedDistrict] = useState<number | undefined>(
    getValues(`addresses.${index}.districtId`) ?? undefined,
  );
  const [districtList, setDistrictList] = useState<CustomOptionsType[]>([]);

  const [selectedNeighbour, setSelectedNeighbour] = useState<
    number | undefined
  >(getValues(`addresses.${index}.neighborhoodId`) ?? undefined);
  const [neighbourList, setNeighbourList] = useState<CustomOptionsType[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      clearErrors(`addresses.${index}.countryId`);
    } else {
      setCityList([]);
      setDistrictList([]);
      setNeighbourList([]);
    }
    setValue(`addresses.${index}.countryId`, selectedCountry);
  }, [selectedCountry, setValue, index, clearErrors]);

  useEffect(() => {
    if (selectedCity) {
      clearErrors(`addresses.${index}.provinceId`);
    } else {
      setDistrictList([]);
      setNeighbourList([]);
    }
    setValue(`addresses.${index}.provinceId`, selectedCity);
  }, [selectedCity, setValue, index, clearErrors]);

  useEffect(() => {
    if (selectedDistrict) {
      clearErrors(`addresses.${index}.districtId`);
    } else {
      setNeighbourList([]);
    }
    setValue(`addresses.${index}.districtId`, selectedDistrict);
  }, [selectedDistrict, setValue, index, clearErrors]);

  useEffect(() => {
    if (selectedNeighbour) {
      clearErrors(`addresses.${index}.neighborhoodId`);
    }
    setValue(`addresses.${index}.neighborhoodId`, selectedNeighbour);
  }, [selectedNeighbour, setValue, index, clearErrors]);

  useEffect(() => {
    const process = async () => {
      const result = await GetAllCountries();
      if (result.IsSuccess) {
        const data = result.Data as PaginationType<CountryType>;
        const customList: CustomOptionsType[] = (
          data.records as CountryType[]
        ).map((item) => ({ name: item.Name, value: item.Id }));
        setCountryList(customList);
      }
    };
    process();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const process = async () => {
        const result = await GetProvicesByCountryId({
          countryId: selectedCountry!,
        });
        if (result.IsSuccess) {
          const data = result.Data as PaginationType<ProvicesType>;
          const customList: CustomOptionsType[] = (
            data.records as ProvicesType[]
          ).map((item) => ({ name: item.Name, value: item.Id }));
          setCityList(customList);
        }
      };
      process();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCity) {
      const process = async () => {
        const result = await GetDisctrictsByProvinceId({
          provinceId: selectedCity!,
        });
        if (result.IsSuccess) {
          const data = result.Data as PaginationType<DistrictsType>;
          const customList: CustomOptionsType[] = (
            data.records as DistrictsType[]
          ).map((item) => ({ name: item.Name, value: item.Id }));
          setDistrictList(customList);
        }
      };
      process();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const process = async () => {
        const result = await GetNeighboursByDistrictId({
          districtId: selectedDistrict!,
        });
        if (result.IsSuccess) {
          const data = result.Data as PaginationType<NeighbourType>;
          const customList: CustomOptionsType[] = (
            data.records as NeighbourType[]
          ).map((item) => ({ name: item.Name, value: item.Id }));
          setNeighbourList(customList);
        }
      };
      process();
    }
  }, [selectedDistrict]);
  return (
    <>
      <CustomSelect
        {...register(`addresses.${index}.countryId`, {
          required: "Ülke Seçiniz",
          valueAsNumber: true,
        })}
        setFirst={true}
        options={countryList}
        className="rounded-md border p-3"
        title="Ülke"
        value={selectedCountry}
        onChange={(e) =>
          setSelectedCountry(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        err={errors.addresses?.[index]?.countryId?.message}
      />
      <CustomSelect
        {...register(`addresses.${index}.provinceId`, {
          required: "İl Seçiniz",
          valueAsNumber: true,
        })}
        setFirst={true}
        options={cityList}
        value={selectedCity}
        onChange={(e) =>
          setSelectedCity(e.target.value ? Number(e.target.value) : undefined)
        }
        className="rounded-md border p-3"
        title="İl"
        err={errors.addresses?.[index]?.provinceId?.message}
      />
      <CustomSelect
        {...register(`addresses.${index}.districtId`, {
          required: "İlçe Seçiniz",
          valueAsNumber: true,
        })}
        setFirst={true}
        value={selectedDistrict}
        onChange={(e) =>
          setSelectedDistrict(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        options={districtList}
        className="rounded-md border p-3"
        title="İlçe"
        err={errors.addresses?.[index]?.districtId?.message}
      />
      <CustomSelect
        {...register(`addresses.${index}.neighborhoodId`, {
          required: "Semt Seçiniz",
          valueAsNumber: true,
        })}
        value={selectedNeighbour}
        onChange={(e) =>
          setSelectedNeighbour(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        setFirst={true}
        options={neighbourList}
        className="rounded-md border p-3"
        title="Semt"
        err={errors.addresses?.[index]?.neighborhoodId?.message}
      />
    </>
  );
}
