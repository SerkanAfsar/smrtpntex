"use client";

import { AuthValidType } from "@/Types/Auth.Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextbox } from "../UI/CustomTextbox";
import React, { useEffect, useState } from "react";
import { LoginValidSectionAction } from "@/app/actions/Auth.Actions";
import { useRouter } from "next/navigation";

export default function ValidSection({ userName }: { userName: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthValidType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const onSubmit: SubmitHandler<AuthValidType> = async (data) => {
    setLoading(true);
    const result = await LoginValidSectionAction({
      data: { ...data, userName },
    });
    setLoading(false);
    if (result.IsSuccess) {
      return router.push("/Admin/Dashboard");
    } else {
      setMessage(result.Message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-start gap-3 text-[#635C5C]"
    >
      {/* <CustomTextbox
        {...register("userName", { required: "Kullanıcı Adı Boş Bırakılamaz" })}
        className="block w-full rounded-md border border-[#887E7E] p-3 text-sm text-[#635C5C] placeholder:text-sm placeholder:text-[#635C5C]"
        placeholder="Kullanıcı Adınız"
        err={errors.userName?.message}
      /> */}
      <h2 className="-mt-4 w-full text-center text-lg text-black">Admin</h2>
      <CustomTextbox
        {...register("validCode", {
          required: "Doğrulama Kodu Boş Bırakılamaz",
        })}
        className="block w-full rounded-md border border-[#887E7E] p-3 text-sm text-[#635C5C] placeholder:text-sm placeholder:text-[#635C5C]"
        placeholder="Doğrulama Kodu"
        type="text"
        err={errors.validCode?.message}
      />

      {message && (
        <span className="block w-full text-center text-sm text-red-700">
          {message}
        </span>
      )}
      <button
        type="submit"
        className="my-4 flex w-full items-center justify-center rounded-md bg-loginBlue p-3 text-lg text-white"
      >
        {loading ? "Yükleniyor..." : "GİRİŞ"}
      </button>
    </form>
  );
}
