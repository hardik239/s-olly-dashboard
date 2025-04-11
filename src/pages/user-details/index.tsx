import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FancyStatsCard from "../../components/fancy-stats-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import SprintTable from "./components/sprint-table";
import { renderBadge } from "../../utils/utility/formatters";
import {
  calculateUserStats,
  redirectUser,
  toTitleCase,
} from "../../utils/utility/sharedUtils";
import { beautifySlug, decodeSlug } from "../../utils/utils";
import { useDataSource } from "../../context/useDataSource";

export interface SprintStats {
  [sprint: string]: {
    estimatedHours: number;
    actualHours: number;
    totalReviewedTickets: Set<string>;
    totalEstimatedReviewHours: number;
    totalActualReviewHours: number;
    totalTickets: Set<string>;
  };
}

export interface UserStats {
  totalTickets: Set<string>;
  totalEstimatedHours: number;
  totalActualHours: number;
  sprintStats: SprintStats;
  averageEffortEstimationAccuracy: number;
  components: string[];
  epics: string[];
  totalReviewedTickets: Set<string>;
  estimatedReviewHours: number;
  actualReviewHours: number;
  totalStories?: Set<string>;
  totalTasks?: Set<string>;
  totalBugs?: Set<string>;
}

const UserDetails: FC = () => {
  const {
    data: { teams, tickets },
  } = useDataSource();
  const { team = "", username = "" } = useParams<{
    team: string;
    username: string;
  }>();
  const actualTeamName =
    teams.find((teamName) => beautifySlug(teamName) === team) || "";
  const userData = tickets[actualTeamName] ?? [];
  const name = decodeSlug(username);
  const stats = calculateUserStats(userData, name);
  const navigate = useNavigate();

  if (Object.keys(tickets).length === 0) {
    return <></>;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                navigate(`/dashboard/user-overview/${team}`);
              }}
              className="hover:cursor-pointer"
            >
              User Overview
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{toTitleCase(name)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
        {toTitleCase(name)}
      </h2>
      <div className="space-y-6">
        <div className="flex mb-5 flex-wrap flex-shrink-0 gap-4">
          <FancyStatsCard
            label="Total Stories"
            value={stats.totalStories?.size.toString() || "0"}
            isLargeCard
            variant="green"
            onClick={() => {
              redirectUser(stats.totalStories!);
            }}
          />
          <FancyStatsCard
            label="Total Tasks"
            value={stats.totalTasks?.size.toString() || "0"}
            isLargeCard
            variant="blue"
            onClick={() => {
              redirectUser(stats.totalTasks!);
            }}
          />
          <FancyStatsCard
            label="Total Bugs"
            value={stats.totalBugs?.size.toString() || "0"}
            isLargeCard
            variant="pink"
            onClick={() => {
              redirectUser(stats.totalBugs!);
            }}
          />
          <FancyStatsCard
            label="Tickets Reviewed"
            value={stats.totalReviewedTickets.size.toString()}
            isLargeCard
            variant="purple"
            onClick={() => {
              redirectUser(stats.totalReviewedTickets);
            }}
          />
          <FancyStatsCard
            label="Estimated Hours"
            value={stats.totalEstimatedHours.toString()}
            isLargeCard
            variant="yellow"
          />
          <FancyStatsCard
            label="Actual Work Hours"
            value={stats.totalActualHours.toString()}
            isLargeCard
            variant="blue"
          />
          <FancyStatsCard
            label="Estimated Review Hours"
            value={stats.estimatedReviewHours.toString()}
            isLargeCard
            variant="purple"
          />
          <FancyStatsCard
            label="Actual Review Hours"
            value={stats.actualReviewHours.toString()}
            isLargeCard
            variant="teal"
          />
          <FancyStatsCard
            label="Average Effort Estimation Accuracy"
            value={`${stats.averageEffortEstimationAccuracy.toFixed(2)}%`}
            isLargeCard
            variant="slate"
          />
        </div>
        <div className="lg:grid lg:gap-4 lg:grid-cols-8 lg:spce-y-0">
          <div className="lg:col-span-2 flex lg:flex-col gap-4 justify-between">
            <Card className="flex-1">
              <CardHeader className="flex flex-row items-center space-y-0 p-4">
                <CardTitle className="text-sm text-center font-medium">
                  Contributed on epics
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="mt-5">
                <div className="flex flex-wrap gap-4 text-sm">
                  {renderBadge(stats.epics.map((epic) => epic))}
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="flex flex-row items-center space-y-0 p-4">
                <CardTitle className="text-sm text-center font-medium">
                  Components worked on
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="mt-5">
                <div className="flex flex-wrap gap-4 text-sm">
                  {renderBadge(
                    stats.components.map((component) =>
                      component === "-" ? "" : component
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="lg:col-span-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-md text-center font-medium">
                Sprint-wise Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SprintTable stats={stats.sprintStats} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
