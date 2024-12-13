"use client";

import ContentSection from "@/Components/Admin/ContentSection";
import AdminTopSection from "@/Components/Admin/TopSection";
import { useLeftMenuStore } from "@/store/useLeftMenuStore";
import { cn } from "@/Utils";

import DashboardSectionOne from "../Components/DashboardSectionOne";
import DashboardSectionTwo from "../Components/DashboardSectionTwo";
import DashboardSectionThree from "../Components/DashboardSectionThree";

export default function DashboardContainer() {
  const { isOpened } = useLeftMenuStore();

  return (
    <div
      className={cn(
        "flex flex-col bg-adminBgColor transition-all",
        isOpened ? "ml-[244px]" : "ml-[62px]",
      )}
    >
      <AdminTopSection>
        <h2>Gösterge Paneli</h2>
      </AdminTopSection>
      <ContentSection className="flex flex-col gap-6 p-6">
        <DashboardSectionOne />
        <DashboardSectionTwo />
        <DashboardSectionThree />
      </ContentSection>
    </div>
  );
}
