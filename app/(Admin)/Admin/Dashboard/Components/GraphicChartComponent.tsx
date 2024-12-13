import Image from "next/image";
import { Bar, Line } from "react-chartjs-2";
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

const GraphicChartComponent = ({ elem }: { elem?: any }) => {
  const { data, options, title } = elem || {};

  return (
    <div className="w-full flex flex-col bg-white shadow-md rounded-md p-4 gap-6">
      <h4 className="w-full text-left border-b pb-4">{title || "Deneme"}</h4>
      <div className="relative h-60">
        {data && options && <Line data={data} options={options} />}
      </div>
    </div>
  );
};

export default GraphicChartComponent;
