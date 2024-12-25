import {
  EditIcon,
  ExportCsvIcon,
  PlusSmall,
  SearchIcon,
} from "@/Utils/IconList";
import CustomButton from "../UI/CustomButton";
import { CustomTextbox } from "../UI/CustomTextbox";
import CustomSelect from "../UI/CustomSelect";
import Image from "next/image";
import { useMemo, useState } from "react";
import { cn } from "@/Utils";

export type VariablesType = {
  name: string;
  value: string;
  active: boolean;
};

export type ContentSubLeftSearchType = {
  title: string;
  addTitle: string;
  actionOne: () => void;
  addAction: () => void;
  placeholder: string;
  variables: VariablesType[];
  selectAction: (id?: number) => void;
  selectedId: number | undefined;
};
export type SelectTypes = "all" | "true" | "false";
export default function ContentSubLeftSearch({
  actionOne,
  addAction,
  addTitle,
  placeholder,
  title,
  variables,
  selectAction,
  selectedId,
}: ContentSubLeftSearchType) {
  const [searchKey, setSearchKey] = useState<string>();
  const [selectedType, setSelectedType] = useState<SelectTypes>("all");

  const tempDataResult = useMemo(() => {
    let tempData = variables;
    if (searchKey) {
      tempData = tempData.filter(
        (a) =>
          a.name.toLocaleLowerCase().indexOf(searchKey.toLocaleLowerCase()) >
          -1,
      );
    }

    return selectedType == "all"
      ? tempData
      : tempData.filter(
          (a) => a.active == Boolean(selectedType == "true" ? true : false),
        );
  }, [searchKey, selectedType, variables]);

  return (
    <section className="ml-[62px] flex w-[320px] flex-col border-r border-t bg-white">
      <div className="flex w-full flex-col gap-3 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3>{title}</h3>
          <div className="flex items-center gap-3">
            <CustomButton
              className="bg-green-100 p-2 text-sm text-green-600"
              onClick={() => actionOne()}
              iconWidth={16}
              iconHeight={16}
              icon={ExportCsvIcon}
            />
            <CustomButton
              className="P-2 bg-blue-100 text-blue-500"
              onClick={() => addAction()}
              icon={PlusSmall}
              title={addTitle}
            />
          </div>
        </div>
        <CustomTextbox
          icon={SearchIcon}
          className="rounded-md border border-gray-300 bg-gray-50 p-2 py-2.5 pl-9 text-sm text-black outline-none placeholder:text-xs placeholder:text-gray-500"
          isFull={true}
          placeholder={placeholder}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <CustomSelect
          onChange={(e) =>
            setSelectedType(e.currentTarget.value as SelectTypes)
          }
          className="relative rounded-md border border-dashed border-gray-400 px-2 py-3 text-xs leading-tight outline-none"
          options={[
            {
              value: "all",
              name: "Tümü",
            },
            {
              value: "true",
              name: "Aktif",
            },
            {
              value: "false",
              name: "Pasif",
            },
          ]}
        />
      </div>
      <hr />
      <div className="w-full flex-1 flex-col gap-3 overflow-auto overscroll-contain p-4">
        {tempDataResult.map((item, index) => (
          <div
            className={cn(
              "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-md p-3 text-sm transition-all hover:bg-blue-100",
              selectedId && selectedId == Number(item.value) && "bg-blue-100",
            )}
            key={index}
            onClick={() => selectAction(Number(item.value))}
          >
            {item.name}
            <Image
              src={EditIcon}
              width={20}
              height={20}
              alt={item.name}
              className="opacity-0 transition-all delay-[25] group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
