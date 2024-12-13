import { ChartDataColors, ChartsData } from "@/Utils/Variables";
import ChartComponent from "./ChartComponent";
import {
  BekleyenIcon,
  SatisIcon1,
  YeniBekleyenMusteri,
  YeniMusteriIcon,
} from "@/Utils/IconList";

export default function DashboardSectionOne() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <ChartComponent
        elem={ChartsData.chartOne(
          ChartDataColors.reportChart1,
          "Satışlar",
          48,
          SatisIcon1
        )}
      />
      <ChartComponent
        elem={ChartsData.chartOne(
          ChartDataColors.reportChart2,
          "Bekleyen",
          16,
          BekleyenIcon
        )}
      />
      <ChartComponent
        elem={ChartsData.chartOne(
          ChartDataColors.reportChart3,
          "Yeni Müşteriler",
          32,
          YeniMusteriIcon
        )}
      />
      <ChartComponent
        elem={ChartsData.chartOne(
          ChartDataColors.reportChart4,
          "Satışlar",
          4,
          YeniBekleyenMusteri
        )}
      />
    </div>
  );
}
