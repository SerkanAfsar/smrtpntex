"use client";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { useEffect, useState } from "react";
import { PetronetItemsType } from "../../Petronet/Containers/PetronetContainer";

export default function AraclarCustomSearch({
  setKeywords,
  setPlateNumber,
  activeMenu,
  types,
  keywords,
  plateNumber,
}: {
  setKeywords: React.Dispatch<string>;
  setPlateNumber: React.Dispatch<string>;
  activeMenu: string;
  types: Record<string, PetronetItemsType>;
  keywords: string;
  plateNumber: string;
}) {
  useEffect(() => {
    setKeywords("");
    setPlateNumber("");
  }, [activeMenu]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border-b border-t bg-adminBgColor px-3 py-4">
      {types[activeMenu].searchItems.includes("aranacak") && (
        <CustomTextbox
          placeholder="Arama Yapın"
          isFull={false}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
        />
      )}
      {types[activeMenu].searchItems.includes("plateNumber") && (
        <CustomTextbox
          placeholder="Plaka Numarası"
          isFull={false}
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
        />
      )}
    </section>
  );
}
