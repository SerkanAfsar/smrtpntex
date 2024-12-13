"use client";

import { AuthValidType } from "@/Types/Auth.Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextbox } from "../UI/CustomTextbox";
import React, { useEffect, useState } from "react";
import { LoginValidSectionAction } from "@/app/actions/Auth.Actions";
import { useRouter } from "next/navigation";

export default function ValidSection() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidType>();
  const [message, setMessage] = useState<string | null>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const onSubmit: SubmitHandler<AuthValidType> = async (data) => {
    const result = await LoginValidSectionAction({ data });
    if (result.IsSuccess) {
      return router.push("/Admin/Dashboard");
    } else {
      setMessage(result.Message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex text-[#635C5C] justify-start items-start w-full flex-col gap-3"
    >
      <CustomTextbox
        {...register("userName", { required: "Kullanıcı Adı Boş Bırakılamaz" })}
        className="border w-full text-sm text-[#635C5C] placeholder:text-[#635C5C] placeholder:text-sm border-[#887E7E] rounded-md block p-3"
        placeholder="Kullanıcı Adınız"
        err={errors.userName?.message}
      />
      <CustomTextbox
        {...register("validCode", {
          required: "Doğrulama Kodu Boş Bırakılamaz",
        })}
        className="border w-full text-sm text-[#635C5C] placeholder:text-[#635C5C] placeholder:text-sm border-[#887E7E] rounded-md block p-3"
        placeholder="Doğrulama Kodu"
        type="text"
        err={errors.validCode?.message}
      />

      {message && (
        <span className="text-red-700 block w-full text-center text-sm">
          {message}
        </span>
      )}
      <button
        type="submit"
        className="p-3 rounded-md w-full my-4  bg-loginBlue text-lg text-white flex items-center justify-center"
      >
        GİRİŞ
      </button>
    </form>
  );
}
