import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { customChartColorPalette } from "../../utils/utility/colors";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  title: string;
  data: number[];
  labels: string[];
  backgroundColors: string[];
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  data,
  labels,
  backgroundColors,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 20,
        right: 50,
        top: 20,
        bottom: 20,
      },
    },
    animation: {
      duration: 100,
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: customChartColorPalette[5], // Change legend text color
          font: {
            size: 12, // Change legend font size
            weight: 600,
            family: "Inter",
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 14,
          weight: 600,
          family: "Inter",
        },
      },
      title: {
        display: true,
        text: title,
        align: "start",
        padding: {
          bottom: 10,
        },
        font: {
          family: "Inter",
          size: 14,
          weight: 600,
        },
        color: "DarkSlateGray",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default PieChart;
