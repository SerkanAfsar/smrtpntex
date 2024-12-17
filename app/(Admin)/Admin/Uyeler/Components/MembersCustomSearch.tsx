"use client";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { useEffect, useState } from "react";
import { PetronetItemsType } from "../../Petronet/Containers/PetronetContainer";
import CustomSelect from "@/Components/UI/CustomSelect";

export default function MembersCustomSearch({
  setKeywords,
  activeMenu,
  types,
  setIsActive,
}: {
  types: Record<string, PetronetItemsType>;
  activeMenu: string;
  setKeywords: React.Dispatch<string>;
  setIsActive: React.Dispatch<boolean | undefined>;
}) {
  const [keyValue, setKeyValue] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(keyValue ?? "");
    }, 1000);
    return () => clearTimeout(timer);
  }, [keyValue, setKeywords]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border-b border-t bg-adminBgColor px-3 py-4">
      {types[activeMenu].searchItems.includes("gsm") && (
        <CustomTextbox
          placeholder="Gsm"
          isFull={false}
          value={keyValue as string}
          onChange={(e) => setKeyValue(e.target.value)}
          className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
        />
      )}
      {types[activeMenu].searchItems.includes("status") && (
        <CustomSelect
          onChange={(e) => {
            if (e.currentTarget.value == "true") {
              setIsActive(true);
            } else if (e.currentTarget.value == "false") {
              setIsActive(false);
            } else {
              setIsActive(undefined);
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
