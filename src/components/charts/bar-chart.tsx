import React from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { customChartColorPalette } from "../../utils/utility/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    barThickness?: number;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
  }[];
}
interface ChartProps {
  title: string;
  chartConfig: BarChartData;
}

const defaultDatasetProps = {
  barThickness: 30,
  borderRadius: 8,
  borderWidth: 5,
  borderColor: "transparent",
};

const BarChart: React.FC<ChartProps> = ({ title, chartConfig }) => {
  const datasetsWithDefaults = chartConfig.datasets.map((dataset) => ({
    ...defaultDatasetProps,
    ...dataset,
  }));

  const updatedChartConfig = {
    ...chartConfig,
    datasets: datasetsWithDefaults,
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: customChartColorPalette[5],
          font: {
            family: "Inter",
            size: 12,
            weight: 500,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: customChartColorPalette[5],
          font: {
            family: "Inter",
            size: 12,
            weight: 500,
          },
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: customChartColorPalette[5],
        anchor: "end",
        clamp: true,
        align: "end",
        font: {
          family: "Inter",
          size: 12,
          weight: 600,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            family: "Inter",
            weight: "bold",
          },
        },
        align: "center",
      },
      title: {
        display: true,
        text: title,
        align: "start",
        padding: {
          bottom: 40,
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

  return <Bar data={updatedChartConfig} options={options} />;
};

export default BarChart;
