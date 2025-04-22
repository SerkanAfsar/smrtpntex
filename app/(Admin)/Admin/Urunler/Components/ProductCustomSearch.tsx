"use client";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import React, { useEffect, useState } from "react";

export default function ProductCustomSearch({
  setKeywords,
  setStatus,
}: {
  setKeywords: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [productName, setProductName] = useState<string | undefined>(undefined);
  const [innerStatus, setInnerStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(productName);
    }, 1000);
    return () => clearTimeout(timer);
  }, [productName, setKeywords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(innerStatus as string);
    }, 1000);
    return () => clearTimeout(timer);
  }, [innerStatus, setStatus]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border border-b bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Ürün Adı"
        isFull={false}
        onChange={(e) => setProductName(e.target.value)}
        className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
      />
      <CustomSelect
        options={[
          { name: "Durum", value: "undefined" },
          { name: "Aktif", value: "true" },
          { name: "Pasif", value: "false" },
        ]}
        className="rounded-md border p-2"
        onChange={(e) => setInnerStatus(e.target.value)}
      />
    </section>
  );
}
