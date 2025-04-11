import { SheetData } from "../../../utils/enums/columns.enum";
import { IProcessedSheetRow } from "../../../utils/types/ProcessSheetRow.type";
import { hoursVsEpicAxes } from "../../../utils/utility/Charts/BarChartUtils";
import { processSheetData } from "../../../utils/utility/sharedUtils";
import BarChart from "../../../components/charts/bar-chart";

interface Props {
  sprint: string;
  data: SheetData[];
}

const SprintChart: React.FC<Props> = ({ data, sprint }) => {
  const updatedTableData = processSheetData(data);
  const sprintData = updatedTableData.find(
    (d) => d.sprint === sprint
  ) as IProcessedSheetRow;

  const getBarChartData = () => {
    const barChartDataForSprintHours = {
      labels: Object.keys(sprintData.epicActualHours),
      datasets: hoursVsEpicAxes.yKeys.map((yKey) => ({
        label: yKey.label,
        data: Object.values((sprintData as any)[yKey.key]) as number[],
        backgroundColor: yKey.backgroundColor,
        barThickness: yKey?.barThickness ?? 40,
        borderRadius: yKey?.borderRadius ?? 4,
        borderWidth: 5,
        borderColor: yKey?.borderColor ?? "transparent",
      })),
    };
    return barChartDataForSprintHours;
  };

  return (
    <div className="h-[400px] pt-4 row-span-2">
      <BarChart
        title="Epic Actual vs Estimated Hours"
        chartConfig={getBarChartData()}
      />
    </div>
  );
};

export default SprintChart;
