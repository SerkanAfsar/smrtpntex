"use client";
import CustomButton from "@/Components/UI/CustomButton";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { useEffect, useState } from "react";

export default function CompaniesCustomSearch({
  setKeywords,
}: {
  setKeywords: React.Dispatch<string | undefined>;
}) {
  const [keyValue, setKeyValue] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(keyValue);
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyValue, setKeywords]);

  return (
    <section className="flex w-full items-center justify-start gap-3 bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Arama Yapın"
        isFull={false}
        onChange={(e) => setKeyValue(e.target.value)}
        className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Başlangıç Tarihi"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Bitiş Tarihi"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      <CustomButton
        title="Statüs"
        className="bg-gray-900 p-2 px-3 text-white"
      />
    </section>
  );
}
