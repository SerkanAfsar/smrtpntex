import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import {
  AddTotalTankService,
  GetStationBrandTypesService,
} from "@/Services/StationService";
import { DeleteTankByIdService } from "@/Services/TankService";
import { CustomOptionsType, ResponseResult } from "@/Types/Common.Types";

import {
  AddStationType,
  StationBrandType,
  StationType,
  TankType,
} from "@/Types/Station.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";

import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StationMaps from "./StationMaps";

export default function StationDetailModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
  stationData,
  title,
  distributorList,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
  stationData: StationType | null;
  title: string;
  distributorList: CustomOptionsType[];
}) {
  const [brandList, setBrandList] = useState<CustomOptionsType[]>([]);
  useEffect(() => {
    const process = async () => {
      const result = await GetStationBrandTypesService();
      if (result.IsSuccess) {
        const resultData = result.Data as StationBrandType[];
        setBrandList(
          resultData.map((item: StationBrandType) => ({
            name: item.Title,
            value: item.Id,
          })),
        );
      }
    };
    process();
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StationType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tanks",
  });

  useEffect(() => {
    clearErrors();
    if (stationData == null) {
      remove();
      reset(
        {
          Title: "",
          DistributorId: "",
          AffiliateCode: "",
          CreatedById: "",
          CreatedDate: "",
          DeletedById: "",
          DeletedDate: "",
          Id: 0,
          IsActive: false,
          IsDeleted: false,
          Latitude: "",
          Longitude: "",
          StationBrandId: "",
          StationGuid: "",
          StationIP: "",
          StationNumber: "",
          tanks: undefined,
          TaxNumber: "",
          TaxOffice: "",
          PriceCode: "",
          PurchasePrice: 0,
          RemarketingRatio: 0,
          SalePrice: 0,
        },
        { keepValues: false },
      );
    } else {
      reset({
        ...stationData,
        tanks: stationData?.tanks,
        DistributorId:
          stationData.DistributorId == 0 ? "" : stationData.DistributorId,
        AffiliateCode: stationData.AffiliateCode.trim(),
      });
    }
  }, [stationData, reset, clearErrors, remove]);

  const [Latitude, longitude] = watch(["Latitude", "Longitude"]);

  const onSubmit: SubmitHandler<StationType> = async (data) => {
    const newStationData: AddStationType = {
      affiliateCode: data.AffiliateCode,
      brandId: data.StationBrandId as number,
      isActive: data.IsActive,
      latitude: data.Latitude,
      longitude: data.Longitude,
      stationIP: data.StationIP,
      stationNumber: data.StationNumber,
      taxNumber: data.TaxNumber,
      taxOffice: data.TaxOffice,
      title: data.Title,
      id: stationData?.Id ?? null,
      distributorId: data.DistributorId as number,
      priceCode: data.PriceCode,
      purchasePrice: data.PurchasePrice,
      remarketingRatio: data.RemarketingRatio,
      salePrice: data.SalePrice,

      tanks: data.tanks?.map((item: TankType) => ({
        currentCapacity: item.CurrentCapacity,
        integratorId: item.IntegratorId,
        ePumpId: item.ePumpId,
        isActive: item.IsActive,
        stationId: item.StationId,
        tankNumber: item.TankNumber,
        title: item.Title,
        totalCapacity: item.TotalCapacity,
        id: item.Id,
      })),
    };

    const result: ResponseResult<StationType> | undefined | null =
      await AddTotalTankService({ data: newStationData });
    if (result && result.IsSuccess) {
      if (stationData) {
        toast.warn("İstasyon Bilgileri Güncellendi", {
          position: "top-right",
        });
      } else {
        toast.success("İstasyon Eklendi", {
          position: "top-right",
        });
      }
      reset();
      clearErrors();
      toggleOpened();
      setUpdated();
    } else {
      toast.error(result?.Message || "Hata", { position: "top-right" });
    }
  };

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[440px] overflow-auto overscroll-contain border-l bg-white p-4 pt-0 shadow-2xl transition-all duration-700 ease-in-out",
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
          <h2 className="text-sm font-bold">İstasyon Bilgileri</h2>
          <CustomSelect
            {...register("DistributorId", {
              required: "Distribütör Seçiniz",
              valueAsNumber: true,
            })}
            setFirst={true}
            options={distributorList}
            className="rounded-md border p-3"
            title="Distribütör Seçiniz"
            err={errors.DistributorId?.message}
          />
          <CustomTextbox
            {...register("Title", {
              required: "Ünvan Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Ünvan"
            err={errors.Title?.message}
          />
          <CustomSelect
            {...register(`StationBrandId`, {
              required: "Marka Seçiniz",
              valueAsNumber: true,
            })}
            setFirst={true}
            options={brandList}
            className="rounded-md border p-3"
            title="Marka"
            err={errors.StationBrandId?.message}
          />
          {/* <CustomTextbox
            {...register("BrandName", {
              required: "Marka Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Marka"
            defaultValue={stationData?.BrandName}
            err={errors.BrandName?.message}
          /> */}
          {/* <CustomTextbox
            {...register("ImageUrl", {
              required: "Marka Logo Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Marka Logo"
            defaultValue={stationData?.ImageUrl}
            err={errors.ImageUrl?.message}
          /> */}
          <div className="flex items-center justify-between gap-4">
            <CustomTextbox
              {...register("TaxNumber", {
                required: "Vergi Numarası Giriniz..",
              })}
              className="rounded-md border p-3 outline-none"
              title="Vergi Numarası"
              err={errors.TaxNumber?.message}
            />
            <CustomTextbox
              {...register("TaxOffice", {
                required: "Vergi Dairesi Giriniz..",
              })}
              className="rounded-md border p-3 outline-none"
              title="Vergi Dairesi"
              // defaultValue={stationData?.TaxOffice}
              err={errors.TaxOffice?.message}
            />
          </div>

          <CustomTextbox
            {...register("AffiliateCode", {
              required: "Müşteri Özel Kodu Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Müşteri Özel Kodu"
            // defaultValue={stationData?.AffiliateCode}
            err={errors.AffiliateCode?.message}
          />
          <CustomTextbox
            {...register("SalePrice", {
              required: "Satış Fiyatı Giriniz..",
              valueAsNumber: true,
            })}
            type="number"
            className="rounded-md border p-3 outline-none"
            title="Satış Fiyatı"
            // defaultValue={stationData?.AffiliateCode}
            err={errors.SalePrice?.message}
          />
          <div className="flex items-center justify-between gap-4">
            <CustomTextbox
              {...register("Latitude", {
                required: "Enlem Giriniz..",
              })}
              className="rounded-md border p-3 outline-none"
              title="Enlem"
              // defaultValue={stationData?.Latitude}
              err={errors.Latitude?.message}
            />
            <CustomTextbox
              {...register("Longitude", {
                required: "Boylam Giriniz..",
              })}
              className="rounded-md border p-3 outline-none"
              title="Boylam"
              // defaultValue={stationData?.Longitude}
              err={errors.Longitude?.message}
            />
          </div>
          {Latitude &&
            longitude &&
            !isNaN(Number(Latitude)) &&
            !isNaN(Number(longitude)) && (
              <div className="flex h-60 w-full items-center justify-center border-2 border-black">
                <StationMaps latitude={Latitude} longitude={longitude} />
              </div>
            )}
          <CustomTextbox
            {...register("StationNumber", {
              required: "İstasyon No Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="İstasyon No"
            // defaultValue={stationData?.StationNumber}
            err={errors.StationNumber?.message}
          />
          <div className="flex items-center justify-between gap-4">
            <CustomTextbox
              {...register("PurchasePrice", {
                required: "Alış Fiyatı Giriniz..",
                valueAsNumber: true,
              })}
              className="rounded-md border p-3 outline-none"
              title="Alış Fiyatı"
              type="number"
              // defaultValue={stationData?.Latitude}
              err={errors.PurchasePrice?.message}
            />
            <CustomTextbox
              {...register("RemarketingRatio", {
                required: "Yeniden Pazarlama Oranı Giriniz..",
                valueAsNumber: true,
              })}
              type="number"
              className="rounded-md border p-3 outline-none"
              title="Yeniden Pazarlama Oranı"
              // defaultValue={stationData?.Longitude}
              err={errors.RemarketingRatio?.message}
            />
          </div>
          <CustomTextbox
            {...register("PriceCode", {
              required: "Logo Fiyat Kodu Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="Logo Fiyat Kodu"
            // defaultValue={stationData?.StationIP}
            err={errors.PriceCode?.message}
          />

          <CustomTextbox
            {...register("StationIP", {
              required: "İstasyon IP Giriniz..",
            })}
            className="rounded-md border p-3 outline-none"
            title="İstasyon IP"
            // defaultValue={stationData?.StationIP}
            err={errors.StationIP?.message}
          />

          <CustomCheckbox
            title="Aktif mi?"
            {...register("IsActive")}
            name="IsActive"
            // defaultChecked={stationData?.IsActive ?? false}
          />
        </div>
        {fields.length > 0 && (
          <h2 className="text-md font-bold">Tank Bilgileri</h2>
        )}
        {fields.map((field: any, index: number) => (
          <div
            className="flex flex-col gap-4 rounded-md border p-4"
            key={field.id}
          >
            <h2 className="flex items-center justify-between text-sm font-bold">
              <span>{field.Id ? field.Title : `Tank ${index + 1}`} </span>
              <button
                type="button"
                onClick={async () => {
                  if (field.Id) {
                    const confirmMessage = confirm(
                      "Tankı Sistemden Silmek İstediğinizden Emin misiniz?",
                    );
                    if (confirmMessage) {
                      const result = await DeleteTankByIdService({
                        tankId: field.Id,
                      });
                      if (result.IsSuccess) {
                        toast.success("Tank Sistemden Silindi", {
                          position: "top-right",
                        });
                        remove(index);
                      }
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
            <TankDetailComponent
              errors={errors}
              index={index}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            {field.tankQrList && field.tankQrList?.length > 0 && (
              <div className="flex flex-wrap gap-3 rounded-md border p-3 outline-none">
                {/* <Image
   width={200}
   height={100}
   src={`https://smartpoint.tr${field.tankQrList[0].PictureUrl}`}
   alt="deneme"
 /> */}

                {field.tankQrList?.map((item: any, index: number) => (
                  <a
                    key={index}
                    href={`https://smartpoint.tr${item.PictureUrl}`}
                    target="_blank"
                  >
                    <img
                      src={`https://smartpoint.tr${item.PictureUrl}`}
                      alt={`${field.TankNumber.toString()}-${item.TankId.toString()}`}
                      className="h-[150px] w-[150px]"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              ePumpId: "",
              IntegratorId: 1,
              Title: "",
              TankNumber: "",
              CurrentCapacity: 0,
              TotalCapacity: 0,
              IsActive: false,
              StationId: 0,
              FuellNess: "",
              Id: 0,
              TankGuid: "",
            })
          }
          className="self-end justify-self-end rounded-md bg-black px-3 py-2 text-white"
        >
          Tank Ekle
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

function TankDetailComponent({
  index,
  register,
  errors,
  setValue,
  getValues,
}: {
  index: number;
  register: any;
  errors: any;
  setValue: any;
  getValues: any;
}) {
  const val = getValues(`tanks.${index}.IntegratorId`);
  const [selectedIntegrator, setSelectedIntegrator] = useState<
    number | undefined
  >(val);

  useEffect(() => {
    if (selectedIntegrator) {
      setValue(`tanks.${index}.IntegratorId`, selectedIntegrator);
    }
  }, [selectedIntegrator]);

  return (
    <>
      <CustomSelect
        {...register(`tanks.${index}.IntegratorId`, {
          required: "IntegratorId",
          valueAsNumber: true,
        })}
        setFirst={true}
        options={[
          { name: "Petronet", value: 1 },
          { name: "EPump", value: 2 },
        ]}
        value={selectedIntegrator}
        onChange={(e) =>
          setSelectedIntegrator(
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
        className="rounded-md border p-3"
        title="IntegratorId"
        err={errors.tanks?.[index]?.IntegratorId?.message}
      />
      {selectedIntegrator == 2 && (
        <CustomTextbox
          {...register(`tanks.${index}.ePumpId`, {
            required: "Mitra PompaId Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Mitra PompaId"
          err={errors.tanks?.[index]?.ePumpId?.message}
        />
      )}

      <div className="flex items-center justify-between gap-4">
        <CustomTextbox
          {...register(`tanks.${index}.Title`, {
            required: "Başlık Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Başlık"
          err={errors.tanks?.[index]?.Title?.message}
        />
        <CustomTextbox
          {...register(`tanks.${index}.TankNumber`, {
            required: "Tank No Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Tank No"
          err={errors.tanks?.[index]?.TankNumber?.message}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <CustomTextbox
          {...register(`tanks.${index}.CurrentCapacity`, {
            required: "Mevcut Kapasite Giriniz..",
            valueAsNumber: true,
          })}
          className="rounded-md border p-3 outline-none"
          title="Mevcut Kapasite"
          err={errors.tanks?.[index]?.CurrentCapacity?.message}
        />
        <CustomTextbox
          {...register(`tanks.${index}.TotalCapacity`, {
            required: "Toplam Kapasite Giriniz..",
            valueAsNumber: true,
          })}
          className="rounded-md border p-3 outline-none"
          title="Toplam Kapasite"
          err={errors.tanks?.[index]?.TotalCapacity?.message}
        />
      </div>
    </>
  );
}
