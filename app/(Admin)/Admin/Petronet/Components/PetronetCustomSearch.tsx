"use client";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import React, { useEffect, useState } from "react";
import { PetronetItemsType } from "../Containers/PetronetContainer";

export default function PetronetCustomSearch({
  setKeywords,
  activeMenu,
  types,
  setStartDate,
  setEndDate,
  setIsActive,
  startDate,
  endDate,
}: {
  activeMenu: string;
  types: Record<string, PetronetItemsType>;
  setKeywords: React.Dispatch<string>;
  setStartDate: React.Dispatch<string>;
  setEndDate: React.Dispatch<string>;
  setIsActive?: React.Dispatch<boolean | undefined>;
  startDate?: string | null;
  endDate?: string | null;
}) {
  const [keyValue, setKeyValue] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(keyValue ?? "");
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyValue, setKeywords]);

  useEffect(() => {
    setKeyValue("");
  }, [activeMenu]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border-b bg-adminBgColor p-3">
      {types[activeMenu].searchItems.includes("aranacak") && (
        <CustomTextbox
          placeholder="Arama Yapın"
          isFull={false}
          value={keyValue as string}
          onChange={(e) => setKeyValue(e.target.value)}
          className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
        />
      )}

      {types[activeMenu].searchItems.includes("baslangic") && (
        <CustomTextbox
          type="text"
          isFull={false}
          value={startDate as string}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Başlangıç Tarihi"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
        />
      )}
      {types[activeMenu].searchItems.includes("bitis") && (
        <CustomTextbox
          type="text"
          isFull={false}
          value={endDate as string}
          placeholder="Bitiş Tarihi"
          onChange={(e) => setEndDate(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
        />
      )}
      {types[activeMenu].searchItems.includes("status") && (
        <CustomSelect
          onChange={(e) => {
            if (setIsActive) {
              if (e.currentTarget.value == "true") {
                setIsActive(true);
              } else if (e.currentTarget.value == "false") {
                setIsActive(false);
              } else {
                setIsActive(undefined);
              }
            }
          }}
          className="rounded-md border px-3 py-2"
          options={[
            { name: "Hepsi", value: "all" },
            { name: "Aktif", value: "true" },
            { name: "Pasif", value: "false" },
          ]}
        />
      )}
    </section>
  );
}
