import {
  CalendarClock,
  CircleCheckBig,
  FileCode,
  FileCode2,
  TimerIcon,
} from "lucide-react";
import StatsCard from "../../../components/stats-card";
import { SheetData, JiraEpicColumn } from "../../../utils/enums/columns.enum";
import {
  isCodeReviewTicket,
  redirectUser,
  safeParseNumber,
} from "../../../utils/utility/sharedUtils";

type SprintStatsProps = {
  sprintData: SheetData[];
};

const calculateSprintStats = (data: SheetData[]) => {
  const sprintStats = {
    estimatedHours: 0,
    actualHours: 0,
    totalEstimatedReviewHours: 0,
    totalActualReviewHours: 0,
    totalReviewedTickets: 0,
    totalTickets: new Set(),
  };
  data.forEach((ticket) => {
    if (ticket) {
      sprintStats.totalTickets.add(ticket[JiraEpicColumn.JIRA]);
      if (isCodeReviewTicket(ticket)) {
        sprintStats.totalReviewedTickets += 1;
        sprintStats.totalEstimatedReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.EFFORT_ESTIMATION]
        );
        sprintStats.totalActualReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
        );
      } else {
        sprintStats.estimatedHours += safeParseNumber(
          ticket[JiraEpicColumn.EFFORT_ESTIMATION]
        );
        sprintStats.actualHours += safeParseNumber(
          ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
        );
      }
    }
  });

  return sprintStats;
};

const SprintStats: React.FC<SprintStatsProps> = ({ sprintData }) => {
  const stats = calculateSprintStats(sprintData);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <StatsCard
        label="Total Tickets"
        value={stats.totalTickets.size.toString()}
        variant="green"
        icon={<CircleCheckBig />}
        onClick={() => {
          redirectUser(stats.totalTickets);
        }}
      />
      <StatsCard
        label="Estimated Work Hours"
        value={stats.estimatedHours.toString()}
        variant="purple"
        icon={<TimerIcon />}
      />
      <StatsCard
        label="Actual Work Hours"
        value={stats.actualHours.toString()}
        variant="blue"
        icon={<CalendarClock />}
      />
      <StatsCard
        label="Estimated Review Hours"
        value={stats.totalEstimatedReviewHours.toString()}
        variant="fuchsia"
        icon={<FileCode />}
      />
      <StatsCard
        label="Actual Review Hours"
        value={stats.totalActualReviewHours.toString()}
        variant="orange"
        icon={<FileCode2 />}
      />
    </div>
  );
};

export default SprintStats;
