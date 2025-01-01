"use client";

import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { useEffect } from "react";

export default function DistributorsCustomSearch({
  setKeywords,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  activeMenu,
  keywords,
}: {
  setKeywords: React.Dispatch<string>;
  setStartDate: React.Dispatch<string>;
  setEndDate: React.Dispatch<string>;
  startDate?: string;
  endDate?: string;
  activeMenu: string;
  keywords: string;
}) {
  // const [keyValue, setKeyValue] = useState<string>();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setKeywords(keyValue);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [keyValue, setKeywords]);

  useEffect(() => {
    setKeywords("");
    setStartDate("");
    setEndDate("");
  }, [activeMenu, setKeywords, setStartDate, setEndDate]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border-b bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Arama Yapın"
        isFull={false}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Başlangıç Tarihi"
        value={startDate as string}
        onChange={(e) => setStartDate(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        value={endDate as string}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="Bitiş Tarihi"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
    </section>
  );
}
