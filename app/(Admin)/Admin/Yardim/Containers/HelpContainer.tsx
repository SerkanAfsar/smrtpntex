"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";

import CustomDatatable from "@/Components/UI/CustomDataTable";
import { useState } from "react";
import HelpDescCustomSearch from "../Components/HelpDescCustomSearch";
import { CustomOptionsType } from "@/Types/Common.Types";
import { HelpHeaderColumns } from "@/Utils/Help.Utils";

export type ContainerListProps = Record<string, any>;

export default function HelpContainer({
  subjectList,
  statusList,
}: {
  subjectList: CustomOptionsType[];
  statusList: CustomOptionsType[];
}) {
  const isOpened = useLeftMenuStore((state) => state.isOpened);

  const [activeMenu, setActiveMenu] = useState<string>("Yardım");
  const [subjectId, setSubjectId] = useState<string>("");
  const [statusId, setStatusId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const types: ContainerListProps = {
    Yardım: (
      <>
        <HelpDescCustomSearch
          endDate={endDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          setStatusId={setStatusId}
          setSubjectId={setSubjectId}
          startDate={startDate}
          statusId={statusId}
          statusList={statusList}
          subjectId={subjectId}
          subjectList={subjectList}
        />
        <CustomDatatable
          columns={HelpHeaderColumns}
          startDate={startDate}
          endDate={endDate}
          apiUrl="/api/helpdesc"
          subjectId={subjectId}
          statusId={statusId}
        />
      </>
    ),
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-1 flex-col bg-adminBgColor transition-all",
          isOpened ? "ml-[244px]" : "ml-[62px]",
        )}
      >
        <AdminTopSection>
          <div className="flex w-full items-center justify-between">
            <div className="mr-3 flex items-center justify-between gap-3">
              {Object.keys(types).map((key: string, index: number) => (
                <CustomButton
                  key={index}
                  className={cn(
                    "gap-1 rounded-md border p-2 px-3",
                    activeMenu == key
                      ? "border-black bg-gray-900 text-white"
                      : "bg-white text-black",
                  )}
                  onClick={() => setActiveMenu(key)}
                  title={key}
                />
              ))}
            </div>
          </div>
        </AdminTopSection>
        {types[activeMenu]}
      </div>
    </>
  );
}
