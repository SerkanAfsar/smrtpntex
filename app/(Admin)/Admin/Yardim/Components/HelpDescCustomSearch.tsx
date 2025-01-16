"use client";
import CustomSelect from "@/Components/UI/CustomSelect";
import { CustomTextbox } from "@/Components/UI/CustomTextbox";
import { CustomOptionsType } from "@/Types/Common.Types";
import React from "react";

export default function HelpDescCustomSearch({
  statusList,
  statusId,
  setStatusId,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  subjectId,
  setSubjectId,
  subjectList,
}: {
  statusList: CustomOptionsType[];
  statusId: string;
  setStatusId: React.Dispatch<string>;
  startDate: string;
  setStartDate: any;
  endDate: string;
  setEndDate: any;
  subjectId: string;
  setSubjectId: React.Dispatch<string>;
  subjectList: CustomOptionsType[];
}) {
  return (
    <section className="flex w-full items-center justify-start gap-3 border-b bg-adminBgColor p-3">
      <CustomSelect
        value={statusId}
        setFirst={true}
        onChange={(e) => setStatusId(e.target.value)}
        className="rounded-md border px-3 py-2"
        options={statusList}
      />
      <CustomSelect
        setFirst={true}
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="rounded-md border px-3 py-2"
        options={subjectList}
      />
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
    </section>
  );
}
