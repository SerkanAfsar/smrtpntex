"use client";
import LoginImg from "../../public/images/login.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/Utils";

import LoginSection from "./LoginSection";
import { useState } from "react";
import ValidSection from "./ValidSection";
import { SmartPoint2Logo, SmartPoint3Logo } from "@/Utils/IconList";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
export default function LoginBaseComponent() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  const componentList = [
    <LoginSection
      setActiveStep={setActiveStep}
      setUserName={setUserName}
      key={0}
    />,
    <ValidSection userName={userName} key={1} />,
  ];

  return (
    <section
      className={cn(
        "mx-auto flex w-[370px] flex-col items-center gap-6 bg-white p-6 shadow-md",
        poppins.className,
      )}
    >
      <Image
        src={SmartPoint3Logo}
        width={100}
        height={100}
        style={{ width: "auto", height: "100px" }}
        alt="Login"
      />
      <Image src={SmartPoint2Logo} width={100} height={300} alt="Login" />
      {/* <h3 className="block text-center text-2xl font-normal text-black">
        Smartpoint {activeStep == 0 ? "Auth" : "Valid"}
      </h3> */}
      {componentList[activeStep]}
    </section>
  );
}
