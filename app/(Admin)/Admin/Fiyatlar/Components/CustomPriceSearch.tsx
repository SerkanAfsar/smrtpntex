"use client";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import React, { useEffect, useState } from "react";
import { PetronetItemsType } from "../../Petronet/Containers/PetronetContainer";

type UsersCustomSearchType = {
  types: Record<string, PetronetItemsType>;
  activeMenu: string;
  setKeywords: React.Dispatch<string>;
};
export default function CustomPriceSearch({
  types,
  activeMenu,
  setKeywords,
}: UsersCustomSearchType) {
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
          placeholder="Arama"
          isFull={false}
          value={keyValue as string}
          onChange={(e) => setKeyValue(e.target.value)}
          className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
        />
      )}
    </section>
  );
}
