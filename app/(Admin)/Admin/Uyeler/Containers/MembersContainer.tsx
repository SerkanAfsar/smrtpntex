"use client";
import AdminTopSection from "@/Components/Admin/TopSection";
import CustomButton from "@/Components/UI/CustomButton";

import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";
import { ExportCsvIcon } from "@/Utils/IconList";
import {
  AraclarDatatableProps,
  MemberColumnHeaders,
  MemberTypeColumnHeaders,
} from "@/Utils/Variables";

import { useEffect, useState } from "react";
import CustomDatatable from "@/Components/UI/CustomDataTable";
import MembersCustomSearch from "../Components/MembersCustomSearch";
import { MenuType } from "../../Petronet/Containers/PetronetContainer";

const types: MenuType = {
  Üyeler: {
    searchItems: ["gsm", "status"],
    apiUrl: "/api/member/members",
    columns: MemberColumnHeaders,
  },
  "Üye Tipleri": {
    apiUrl: "/api/member/membertypes",
    searchItems: [],
    columns: MemberTypeColumnHeaders,
  },
};

export default function MembersContainer() {
  const isOpened = useLeftMenuStore((state) => state.isOpened);
  const [gsm, setGsm] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<string>("Üyeler");
  const [isActive, setIsActive] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setGsm("");
    setIsActive(undefined);
  }, [activeMenu]);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection className="border-none">
        <div className="flex items-center justify-center">
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
        <CustomButton
          className="gap-1 bg-green-100 p-2 text-green-600"
          icon={ExportCsvIcon}
          title="Dışa Aktar"
        />
      </AdminTopSection>

      <MembersCustomSearch
        setIsActive={setIsActive}
        activeMenu={activeMenu}
        types={types}
        setKeywords={setGsm}
      />
      <CustomDatatable
        columns={types[activeMenu].columns}
        apiUrl={types[activeMenu].apiUrl}
        gsm={gsm}
        isActive={isActive}
      />
    </div>
  );
}
