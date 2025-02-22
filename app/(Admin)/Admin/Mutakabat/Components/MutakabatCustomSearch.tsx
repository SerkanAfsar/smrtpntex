"use client";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import React, { useEffect, useState } from "react";

type MutakabatCustomSearchType = {
  activeMenu: string;
  setKeywords: React.Dispatch<string>;
  setStartDate: React.Dispatch<string>;
  setEndDate: React.Dispatch<string>;
};
export default function MutakabatCustomSearch({
  activeMenu,
  setKeywords,
  setStartDate,
  setEndDate,
}: MutakabatCustomSearchType) {
  const [innerKeywords, setInnerKeywords] = useState<string>("");
  const [innerStartDate, setInnerStartDate] = useState<string>("");
  const [innerEndDate, setInnerEndDate] = useState<string>("");

  useEffect(() => {
    setInnerKeywords("");
    setInnerStartDate("");
    setInnerEndDate("");
  }, [activeMenu]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeywords(innerKeywords);
    }, 500);
    return () => clearTimeout(timer);
  }, [innerKeywords, setKeywords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartDate(innerStartDate);
    }, 500);
    return () => clearTimeout(timer);
  }, [innerStartDate, setStartDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEndDate(innerEndDate);
    }, 500);
    return () => clearTimeout(timer);
  }, [innerEndDate, setEndDate]);

  return (
    <section className="flex w-full items-center justify-start gap-3 border-b bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Arama Yapın"
        isFull={false}
        value={innerKeywords}
        onChange={(e) => setInnerKeywords(e.target.value)}
        className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Başlangıç Tarihi"
        value={innerStartDate}
        onChange={(e) => setInnerStartDate(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Bitiş Tarihi"
        value={innerEndDate}
        onChange={(e) => setInnerEndDate(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
    </section>
  );
}
