import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";

import {
  AddRoleService,
  GetRolePermissionsByRoleId,
  UpdateRoleService,
} from "@/Services/RoleService";

import { ResponseResult } from "@/Types/Common.Types";
import { AddRoleType, RoleType } from "@/Types/Role.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PermissionPageDataType } from "../page";
import CustomRoleDetailBox from "./CustomRoleDetailBox";
import { PermissionPageType } from "@/Types/Permission.Types";

export default function RoleDetailModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
  roleData,
  title,
  permissionPages,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
  roleData: RoleType | null;
  title: string;
  permissionPages: PermissionPageDataType;
}) {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rolePermissionList, setRolePermissionList] = useState<
    PermissionPageType[]
  >([]);
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

    const result: ResponseResult<RoleType> =
      roleData == null
        ? await AddRoleService({
            data: newRoleData,
          })
        : await UpdateRoleService({ id: roleData.Id, data: newRoleData });
    if (result.IsSuccess) {
      if (roleData) {
        toast.warn("Rol Bilgileri Güncellendi", {
          position: "top-right",
        });
      } else {
        toast.success("Rol Eklendi", {
          position: "top-right",
        });
      }
      reset();
      clearErrors();
      toggleOpened();
      setUpdated();
    }
  };

  // const recursiveFunc = (permissions: PermissionPageType[]): number[] => {
  //   return permissions.reduce((acc: number[], next) => {
  //     acc.push(next.PageId);
  //     if (next.Childrens && next.Childrens.length) {
  //       return [...acc, ...recursiveFunc(next.Childrens)];
  //     }
  //     return acc;
  //   }, []);
  // };

  const getRoleClaimsByRoleId = async ({ id }: { id: number }) => {
    setIsLoading(true);
    const result = await GetRolePermissionsByRoleId({ roleId: id });
    if (result.IsSuccess) {
      const responseData = result.Data as PermissionPageDataType;
      setRolePermissionList(responseData.Permissions);
    } else {
      return toast.error(result.Message || "Hata", { position: "top-right" });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (roleData) {
      getRoleClaimsByRoleId({ id: roleData.Id });
    }
  }, [roleData, isUpdated]);

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 shadow-2xl transition-all duration-700 ease-in-out",
        isOpenedModal ? "right-0" : "-right-[100%]",
        isLoading ? "bg-slate-400" : "bg-white",
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
        {roleData &&
          permissionPages.Permissions.map((item, index) => (
            <CustomRoleDetailBox
              rolePermissionList={rolePermissionList}
              item={item}
              key={index}
              roleItem={roleData ?? null}
              setIsUpdated={setIsUpdated}
            />
          ))}

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
