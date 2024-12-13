"use client";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";

export default function BpCustomSearch() {
  return (
    <section className="flex w-full items-center justify-start gap-3 bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Arama Yapın"
        isFull={false}
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
    </section>
  );
}
