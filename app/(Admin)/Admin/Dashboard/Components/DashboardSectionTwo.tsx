import { ChartsData } from "@/Utils/Variables";
import GraphicChartComponent from "./GraphicChartComponent";

export default function DashboardSectionTwo() {
  return (
    <div className="grid grid-cols-2 w-full gap-6 h-auto relative">
      <GraphicChartComponent elem={ChartsData.chartTwo} />
      <GraphicChartComponent elem={{ title: "Üyeler" }} />
    </div>
  );
}
