"use client";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { CustomOptionsType } from "@/Types/Common.Types";
import React from "react";

type BpCustomSearchType = {
  setKeywords: React.Dispatch<string>;
  setStartDate: React.Dispatch<string>;
  setEndDate: React.Dispatch<string>;
  OrderStateData?: CustomOptionsType[];
  setOrderStateId?: React.Dispatch<number>;
  orderStateId?: number;
};
export default function BpCustomSearch({
  setKeywords,
  setStartDate,
  setEndDate,
  OrderStateData,
  setOrderStateId,
  orderStateId,
}: BpCustomSearchType) {
  return (
    <section className="flex w-full items-center justify-start gap-3 border-b bg-adminBgColor p-3">
      <CustomTextbox
        placeholder="Arama Yapın"
        isFull={false}
        onChange={(e) => setKeywords(e.target.value)}
        className="inline-block w-[290px] rounded-md border border-border-primary p-2 text-sm placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Başlangıç Tarihi"
        onChange={(e) => setStartDate(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      <CustomTextbox
        type="text"
        isFull={false}
        placeholder="Bitiş Tarihi"
        onChange={(e) => setEndDate(e.target.value)}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
      />
      {OrderStateData && (
        <CustomSelect
          options={OrderStateData}
          className="inline-block w-auto rounded-md border border-border-primary p-2.5 text-xs placeholder:text-xs"
          value={orderStateId}
          onChange={(e) =>
            setOrderStateId && setOrderStateId(Number(e.target.value))
          }
          setFirst={true}
        />
      )}
    </section>
  );
}
