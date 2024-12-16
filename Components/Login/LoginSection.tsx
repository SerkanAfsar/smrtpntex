"use client";

import { LoginType } from "@/Types/Auth.Types";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomTextbox } from "../UI/CustomTextbox";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { ResponseResult } from "@/Types/Common.Types";

export default function LoginSection({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<number>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const [message, setMessage] = useState<string | null>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    const result: ResponseResult<LoginType> = await response.json();
    setLoading(false);
    if (result.IsSuccess) {
      setActiveStep(1);
    } else {
      setMessage(result.Message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start justify-start gap-3 text-[#635C5C]"
    >
      <h2></h2>
      <CustomTextbox
        {...register("userName", { required: "Kullanıcı Adı Boş Bırakılamaz" })}
        className="block w-full rounded-md border border-[#887E7E] p-3 text-sm text-[#635C5C] placeholder:text-sm placeholder:text-[#635C5C]"
        placeholder="Kullanıcı Adınız"
        err={errors.userName?.message}
      />
      <CustomTextbox
        {...register("password", { required: "Şifre Boş Bırakılamaz" })}
        className="block w-full rounded-md border border-[#887E7E] p-3 text-sm text-[#635C5C] placeholder:text-sm placeholder:text-[#635C5C]"
        placeholder="Şifreniz"
        type="password"
        err={errors.password?.message}
      />
      <Link href={"/Login"} className="self-end text-sm underline">
        Şifremi Unuttum
      </Link>
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
