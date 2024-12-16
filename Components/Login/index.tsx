"use client";
import LoginImg from "../../public/images/login.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/Utils";

import LoginSection from "./LoginSection";
import { useState } from "react";
import ValidSection from "./ValidSection";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
export default function LoginBaseComponent() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const componentList = [
    <LoginSection setActiveStep={setActiveStep} key={0} />,
    <ValidSection key={1} />,
  ];

  return (
    <section
      className={cn(
        "mx-auto flex w-[370px] flex-col gap-6 bg-white p-6 shadow-md",
        poppins.className,
      )}
    >
      <Image
        src={LoginImg}
        width={400}
        height={300}
        style={{ height: "auto", width: "auto" }}
        alt="Login"
      />
      <h3 className="block text-center text-2xl font-normal text-black">
        Smartpoint {activeStep == 0 ? "Auth" : "Valid"}
      </h3>
      {componentList[activeStep]}
    </section>
  );
}
