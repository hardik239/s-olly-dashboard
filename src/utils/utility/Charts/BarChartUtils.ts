import { customChartColorPalette } from "../colors";

type YAxisConfig = {
  label: string;
  key: string;
  backgroundColor: string;
  barThickness?: number;
  borderRadius?: number;
  borderColor?: string;
};

export type BarChartAxesType = {
  xKey: string;
  yKeys: YAxisConfig[];
};

export const hoursVsSprintAxes: BarChartAxesType = {
  xKey: "sprint",
  yKeys: [
    {
      label: "Actual Hours Spent",
      key: "noOfHours",
      backgroundColor: customChartColorPalette[2],
    },
    {
      label: "Estimated Hours",
      key: "estimatedHours",
      backgroundColor: customChartColorPalette[3],
    },
  ],
};

export const hoursVsEpicAxes: BarChartAxesType = {
  xKey: "epic",
  yKeys: [
    {
      label: "Actual Hours Spent",
      key: "epicActualHours",
      backgroundColor: "hsl(208, 96%, 80%)",
    },
    {
      label: "Estimated Hours",
      key: "epicEstimatedHours",
      backgroundColor: "hsl(323, 66%, 80%)",
    },
  ],
};

export const sprintVsStoryPoints: BarChartAxesType = {
  xKey: "sprint",
  yKeys: [
    {
      label: "Story Points",
      key: "noOfSP",
      backgroundColor: customChartColorPalette[3],
    },
  ],
};
