import {
  processSheetData,
  safeParseNumber,
  toCapitalCase,
} from "../../../utils/utility/sharedUtils";
import { IProcessedSheetRow } from "../../../utils/types/ProcessSheetRow.type";
import { SheetData } from "../../../utils/enums/columns.enum";
import {
  BarChartAxesType,
  hoursVsSprintAxes,
  sprintVsStoryPoints,
} from "../../../utils/utility/Charts/BarChartUtils";
import { customChartColorPalette } from "../../../utils/utility/colors";
import { formatter } from "../../../utils/utility/formatters";
import { Card, CardContent } from "../../../components/ui/card";
import BarChart from "../../../components/charts/bar-chart";
import PieChart from "../../../components/charts/pie-chart";

interface Props {
  data: SheetData[];
}

const Charts: React.FC<Props> = ({ data }) => {
  const updatedTableData: IProcessedSheetRow[] = processSheetData(data);
  const userStories: Record<string, number> = {};
  const ticketByCategory: Record<string, number> = {};

  updatedTableData.forEach((sprint) => {
    Object.entries(sprint.userTickets).forEach(([user, stories]) => {
      const userName = toCapitalCase(user);

      if (!userStories[userName]) {
        userStories[userName] = 0;
      }
      userStories[userName] += safeParseNumber(stories.size);
    });

    Object.entries(sprint.taskByCategory).forEach(([ticket, type]) => {
      if (!ticketByCategory[ticket]) {
        ticketByCategory[ticket] = 0;
      }
      ticketByCategory[ticket] += safeParseNumber(type);
    });
  });

  const userStoryChartData = {
    labels: Object.keys(userStories),
    datasets: [
      {
        label: "Number of Stories",
        data: Object.values(userStories),
        backgroundColor: customChartColorPalette,
      },
    ],
  };

  const ticketCategoryChartData = {
    labels: Object.keys(ticketByCategory),
    datasets: [
      {
        label: "Number of Stories",
        data: Object.values(ticketByCategory),
        backgroundColor: customChartColorPalette,
      },
    ],
  };

  const getBarChartDataForSprintHours = (axisConfig: BarChartAxesType) => {
    const barChartDataForSprintHours = {
      labels: updatedTableData.map((item: IProcessedSheetRow) =>
        formatter(
          "sprint",
          String(item[axisConfig.xKey as keyof IProcessedSheetRow])
        )
      ),
      datasets: axisConfig.yKeys.map((yKey) => ({
        label: yKey.label,
        data: updatedTableData.map((item) =>
          Number(item[yKey.key as keyof IProcessedSheetRow])
        ),
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
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 h-[800px] lg:h-[500px]">
        <Card className="col-span-4">
          <CardContent className="h-full p-8">
            <BarChart
              title="Actual vs Estimated Hours"
              chartConfig={getBarChartDataForSprintHours(hoursVsSprintAxes)}
            />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardContent className="h-full p-8 pt-4 pl-4">
            <PieChart
              title="Tickets By Users"
              data={userStoryChartData.datasets[0].data}
              labels={userStoryChartData.labels}
              backgroundColors={userStoryChartData.datasets[0].backgroundColor}
            />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 h-[800px] lg:h-[500px]">
        <Card className="col-span-4">
          <CardContent className="h-full p-8 pt-4 pl-4">
            <PieChart
              title="Type Of Tickets"
              data={ticketCategoryChartData.datasets[0].data}
              labels={ticketCategoryChartData.labels}
              backgroundColors={
                ticketCategoryChartData.datasets[0].backgroundColor
              }
            />
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardContent className="h-full p-8">
            <BarChart
              title="Sprint-Wise Story Points"
              chartConfig={getBarChartDataForSprintHours(sprintVsStoryPoints)}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Charts;
