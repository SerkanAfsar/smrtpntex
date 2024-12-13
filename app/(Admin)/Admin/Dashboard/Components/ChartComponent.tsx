import Image from "next/image";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ elem }: { elem: any }) => {
  const { type, data, svg, options, title, todayCount } = elem;

  return (
    <div className="w-full flex flex-col bg-white shadow-md rounded-md p-4 gap-4">
      <div className="flex gap-2 items-center justify-start">
        <Image src={svg} width={24} height={24} alt={title} />
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs">Bugün</span>
        <span className="text-xl font-bold">{todayCount}</span>
      </div>
      <div className="!h-32 relative">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChartComponent;
