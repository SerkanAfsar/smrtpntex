import CustomButton from "@/Components/UI/CustomButton";
import CustomCheckbox from "@/Components/UI/CustomCheckbox";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { GetAllDistrubitors } from "@/Services/DistrubitorsService";
import { GetAllRolesService } from "@/Services/RoleService";
import { AddUserService, UpdateUserService } from "@/Services/UserService";
import {
  CustomOptionsType,
  PaginationType,
  ResponseResult,
} from "@/Types/Common.Types";
import { DistrubitorType } from "@/Types/Distrubitor.Types";
import { RoleType } from "@/Types/Role.Types";
import { AddUserType, UserType } from "@/Types/User.Types";

import { cn } from "@/Utils";
import { ExitIcon } from "@/Utils/IconList";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserDetailModal({
  toggleOpened,
  isOpenedModal,
  setUpdated,
  userData,
  title,
}: {
  toggleOpened: any;
  isOpenedModal: boolean;
  setUpdated: any;
  userData: UserType | null;
  title: string;
}) {
  const router = useRouter();
  const [roleList, setRoleList] = useState<CustomOptionsType[]>([]);
  const [distributorList, setDistributorList] = useState<CustomOptionsType[]>(
    [],
  );
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<UserType>();

  useEffect(() => {
    clearErrors();
    reset();
  }, [userData, reset, clearErrors]);

  const setRolesFunc = useCallback(async () => {
    const result: ResponseResult<PaginationType<RoleType>> =
      await GetAllRolesService({
        searchType: {
          pageIndex: 1,
          pageSize: 1000,
        },
      });
    if (result.IsSuccess) {
      const data = result.Data as PaginationType<RoleType>;
      const roleListData: CustomOptionsType[] = (
        data.records as RoleType[]
      ).map((item) => ({
        name: item.Name,
        value: item.Id,
      }));
      setRoleList(roleListData);
    } else {
      setRoleList([]);
    }
  }, [setRoleList]);

  const setDistributorsFunc = useCallback(async () => {
    const result: ResponseResult<PaginationType<DistrubitorType>> =
      await GetAllDistrubitors({
        searchType: {
          pageIndex: 1,
          pageSize: 1000,
        },
      });
    if (result.IsSuccess) {
      const data = result.Data as PaginationType<DistrubitorType>;
      const distributorListData: CustomOptionsType[] = (
        data.records as DistrubitorType[]
      ).map((item) => ({
        name: item.Title,
        value: item.Id,
      }));
      setDistributorList(distributorListData);
    } else {
      setDistributorList([]);
    }
  }, [setDistributorList]);

  useEffect(() => {
    setRolesFunc();
    setDistributorsFunc();
  }, [setRolesFunc, setDistributorsFunc]);

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    const addUserData: AddUserType = {
      distributorId: data.DistributorId,
      email: data.Email,
      firstName: data.FirstName,
      gsm: data.Gsm,
      isActive: data.IsActive,
      lastName: data.LastName,
      password: data.Password,
      roleId: data.RoleId,
      username: data.UserName,
    };
    if (userData == null) {
      const result = await AddUserService({ data: addUserData });
      if (result.IsSuccess) {
        toast.success("Kullanıcı Eklendi", {
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
    } else {
      const result = await UpdateUserService({
        id: userData.Id,
        data: addUserData,
      });
      if (result.IsSuccess) {
        toast.warn("Kullanıcı Güncellendi", {
          position: "top-right",
        });
        reset();
        clearErrors();
        toggleOpened();
        setUpdated();
      } else {
        alert("deneme");
        return toast.error(result.Message || "Hata", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed -right-[100%] z-50 h-screen w-[340px] overflow-auto overscroll-contain border-l bg-white p-4 pt-0 shadow-2xl transition-all duration-700 ease-in-out",
        isOpenedModal ? "right-0" : "-right-[100%]",
      )}
    >
      <div className="sticky inset-0 z-50 flex items-center justify-between bg-white pt-4">
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
        <CustomSelect
          {...register("RoleId", {
            required: "Rol Seçiniz",
            valueAsNumber: true,
            value: (userData?.RoleId as number) ?? undefined,
          })}
          setFirst={true}
          options={roleList}
          className="rounded-md border p-3"
          title="Rol Seçiniz"
          err={errors.RoleId?.message}
        />
        <CustomSelect
          {...register("DistributorId", {
            required: "Distribütör Seçiniz",
            valueAsNumber: true,
            value: (userData?.DistributorId as number) ?? undefined,
          })}
          defaultValue={(userData?.DistributorId as number) ?? undefined}
          setFirst={true}
          options={distributorList}
          className="rounded-md border p-3"
          title="Distribütör Seçiniz"
          err={errors.DistributorId?.message}
        />

        <CustomTextbox
          {...register("UserName", {
            required: "Kullanıcı Adı Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Kullanıcı Adı"
          defaultValue={userData?.UserName}
          err={errors.UserName?.message}
        />
        <CustomTextbox
          {...register("Gsm", {
            required: "Gsm Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Gsm"
          defaultValue={userData?.Gsm ?? undefined}
          err={errors.Gsm?.message}
        />
        <CustomTextbox
          {...register("Email", {
            required: "Email Giriniz..",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "E-Posta Format Hatası",
            },
          })}
          defaultValue={userData?.Email ?? undefined}
          type="email"
          className="rounded-md border p-3 outline-none"
          title="E-Mail"
          err={errors.Email?.message}
        />
        <CustomTextbox
          {...register("Password", {
            required: !userData ? "Şifre Giriniz" : false,
          })}
          className="rounded-md border p-3 outline-none"
          title="Şifre"
          err={errors.Password?.message}
        />
        <CustomTextbox
          {...register("FirstName", {
            required: "Adınızı Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Adınız"
          err={errors.FirstName?.message}
          defaultValue={userData?.FirstName ?? undefined}
        />
        <CustomTextbox
          {...register("LastName", {
            required: "Soyadınızı Giriniz..",
          })}
          className="rounded-md border p-3 outline-none"
          title="Soyadınız"
          err={errors.LastName?.message}
          defaultValue={userData?.LastName ?? undefined}
        />

        <CustomCheckbox
          title="Aktif mi?"
          {...register("IsActive")}
          name="IsActive"
          defaultChecked={userData?.IsActive ?? false}
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
