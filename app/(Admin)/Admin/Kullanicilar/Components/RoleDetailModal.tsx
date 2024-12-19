import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";

import { GetAllDistrubitors } from "@/Services/DistrubitorsService";
import { AddRoleService, GetAllRolesService } from "@/Services/RoleService";
import { AddUserService, UpdateUserService } from "@/Services/UserService";

import {
  CustomOptionsType,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { AddRoleType, RoleType } from "@/Types/Role.Types";
import { AddUserType, UserType } from "@/Types/User.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RoleDetailModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
  roleData,
  title,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
  roleData: RoleType | null;
  title: string;
}) {
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RoleType>();

  useEffect(() => {
    clearErrors();
    reset();
  }, [roleData, reset, clearErrors]);

  const onSubmit: SubmitHandler<RoleType> = async (data) => {
    const newRoleData: AddRoleType = {
      description: data.Description,
      isActive: data.IsActive,
      name: data.Name,
    };
    if (roleData == null) {
      const result: ResponseResult<AddRoleType> = await AddRoleService({
        data: newRoleData,
      });
      if (result.IsSuccess) {
        toast.success("Rol Eklendi", {
          position: "top-right",
        });
        reset();
        clearErrors();
        toggleOpened();
        setUpdated();
      } else {
        return toast.error(result.Message || "Hata", {
          position: "top-right",
        });
      }
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
        <h1 className="text-lg font-medium">{title}</h1>
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
        <CustomTextbox
          {...register("Name", {
            required: "Rol Adı Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Rol Adı"
          defaultValue={roleData?.Name}
          err={errors.Name?.message}
        />
        <CustomTextbox
          {...register("Description", {
            required: "Açıklama Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Açıklama"
          defaultValue={roleData?.Description ?? undefined}
          err={errors.Description?.message}
        />

        <CustomCheckbox
          title="Aktif mi?"
          {...register("IsActive")}
          name="IsActive"
          defaultChecked={roleData?.IsActive ?? false}
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
