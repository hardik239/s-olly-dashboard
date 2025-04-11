import { FC } from "react";
import BarChart from "../../../components/charts/bar-chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { SheetData } from "../../../utils/enums/columns.enum";
import {
  customChartColorPalette,
  getRandomVariant,
} from "../../../utils/utility/colors";
import { toTitleCase } from "../../../utils/utility/sharedUtils";
import { getChartData, getUserStats } from "../utils";
import CollapsibleTable from "./collapsible-table";
import OverviewCard from "./overview-card";
import StatsTable from "./stats-table";

type Props = {
  data: SheetData[];
};

const TabContent: FC<Props> = ({ data }) => {
  const userStats = getUserStats(data);
  const usernames = Object.keys(userStats);
  const {
    actualHours,
    actualReviewHours,
    estimatedHours,
    reviewedTickets,
    totalTickets,
  } = getChartData(userStats, usernames);

  const getChartConfigForUserTickets = () => {
    const chartData = {
      labels: usernames.map((username) => toTitleCase(username)),
      datasets: [
        {
          label: "Total Tickets By User",
          data: totalTickets,
          barThickness: 40,
          backgroundColor: customChartColorPalette[3],
        },
      ],
    };
    return chartData;
  };

  const geChartConfigForEstimation = () => {
    const chartData = {
      labels: usernames.map((username) => toTitleCase(username)),
      datasets: [
        {
          label: "Estimated Hours",
          data: estimatedHours,
          borderWidth: 5,
          barThickness: 40,
          backgroundColor: customChartColorPalette[3],
        },
        {
          label: "Actual Hours",
          data: actualHours,
          backgroundColor: customChartColorPalette[0],
          borderWidth: 5,
          barThickness: 40,
        },
      ],
    };

    return chartData;
  };

  const getChartConfigForReviews = () => {
    const chartData = {
      labels: usernames.map((username) => toTitleCase(username)),
      datasets: [
        {
          label: "Total Reviewed Tickets",
          data: reviewedTickets,
          borderWidth: 5,
          barThickness: 40,
          backgroundColor: customChartColorPalette[4],
        },
        {
          label: "Total Review Hours",
          data: actualReviewHours,
          backgroundColor: customChartColorPalette[3],
          borderWidth: 5,
          barThickness: 40,
        },
      ],
    };

    return chartData;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-5">
        {Object.keys(userStats).map((key, index) => {
          const color = getRandomVariant(index);
          const stats = userStats[key];

          return (
            <OverviewCard
              key={index}
              username={key}
              stats={stats}
              variant={color}
            />
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 mb-5">
        <Card className="col-span-4 h-[400px]">
          <CardContent className="h-full pl-4 pr-4 pt-8 pb-8">
            <BarChart
              title="Actual vs Estimated Hours"
              chartConfig={geChartConfigForEstimation()}
            />
          </CardContent>
        </Card>
        <Card className="col-span-4 h-[400px]">
          <CardContent className="h-full pl-4 pr-4 pt-8 pb-8">
            <BarChart
              title="Tickets By User"
              chartConfig={getChartConfigForUserTickets()}
            />
          </CardContent>
        </Card>
        <Card className="col-span-4 h-[400px]">
          <CardContent className="h-full pl-4 pr-4 pt-8 pb-8">
            <BarChart
              title="Review Efforts"
              chartConfig={getChartConfigForReviews()}
            />
          </CardContent>
        </Card>
      </div>
      {Object.keys(userStats).length > 0 && (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User-Wise Sprint Statistics</CardTitle>
          </CardHeader>
          <CardContent className="h-full pl-4 pr-4">
            <CollapsibleTable userStats={userStats} />
          </CardContent>
        </Card>
      )}
      {usernames.length > 0 && (
        <StatsTable
          usernames={usernames}
          userStats={userStats}
        />
      )}
    </div>
  );
};

export default TabContent;
