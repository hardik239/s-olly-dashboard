import {
  Bookmark,
  Bug,
  FileCode,
  FileCode2,
  Hash,
  SquareCheck,
} from "lucide-react";
import { SheetData, JiraEpicColumn } from "../../../utils/enums/columns.enum";
import { MRType, TicketTypeEnum } from "../../../utils/enums/ticket.enum";
import StatsCard from "../../../components/stats-card";
import {
  isCodeReviewTicket,
  redirectUser,
  safeParseNumber,
} from "../../../utils/utility/sharedUtils";

type Props = {
  sheetData: SheetData[];
};

const calculateTotalStats = (tickets: SheetData[]) => {
  const totalStats = {
    totalEstimatedHours: 0,
    totalActualHours: 0,
    totalReviewedTickets: 0,
    totalEstimatedReviewHours: 0,
    totalActualReviewHours: 0,
    totalStoriesResolved: new Set(),
    totalTasksResolved: new Set(),
    totalBugsResolved: new Set(),
    totalStoryPointsDelivered: 0,
  };

  tickets.forEach((ticket) => {
    if (ticket) {
      totalStats.totalEstimatedHours += safeParseNumber(
        ticket[JiraEpicColumn.EFFORT_ESTIMATION]
      );
      totalStats.totalActualHours += safeParseNumber(
        ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
      );

      if (isCodeReviewTicket(ticket)) {
        totalStats.totalReviewedTickets += 1;
        totalStats.totalEstimatedReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.EFFORT_ESTIMATION]
        );
        totalStats.totalActualReviewHours += safeParseNumber(
          ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]
        );
      }

      if (
        (ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.STORY &&
          ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED) ||
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.SPIKE_STORY
      ) {
        totalStats.totalStoriesResolved.add(ticket[JiraEpicColumn.JIRA]);
        totalStats.totalStoryPointsDelivered +=
          safeParseNumber(ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]) / 8;
      }

      if (
        (ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.TASK &&
          ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED) ||
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.SPIKE_TASK
      ) {
        totalStats.totalTasksResolved.add(ticket[JiraEpicColumn.JIRA]);
        totalStats.totalStoryPointsDelivered +=
          safeParseNumber(ticket[JiraEpicColumn.ACTUAL_EFFORT_ESTIMATION]) / 8;
      }

      if (
        ticket[JiraEpicColumn.TYPE] === TicketTypeEnum.BUG &&
        ticket[JiraEpicColumn.PR_STATUS] === MRType.MERGED
      ) {
        totalStats.totalBugsResolved.add(ticket[JiraEpicColumn.JIRA]);
      }
    }
  });

  return totalStats;
};

const OverallStats: React.FC<Props> = ({ sheetData }) => {
  const stats = calculateTotalStats(sheetData);

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <StatsCard
        label="Stories Resolved"
        value={stats.totalStoriesResolved.size.toString()}
        variant="green"
        icon={<Bookmark />}
        onClick={() => {
          redirectUser(stats.totalStoriesResolved);
        }}
      />
      <StatsCard
        label="Tasks Resolved"
        value={stats.totalTasksResolved.size.toString()}
        variant="blue"
        icon={<SquareCheck />}
        onClick={() => {
          redirectUser(stats.totalTasksResolved);
        }}
      />
      <StatsCard
        label="Bugs Resolved"
        value={stats.totalBugsResolved.size.toString()}
        variant="red"
        icon={<Bug />}
        onClick={() => {
          redirectUser(stats.totalBugsResolved);
        }}
      />
      <StatsCard
        label="Estimated Review Hours"
        value={stats.totalEstimatedReviewHours.toString()}
        variant="orange"
        icon={<FileCode />}
      />
      <StatsCard
        label="Actual Review Hours"
        value={stats.totalActualReviewHours.toString()}
        variant="fuchsia"
        icon={<FileCode2 />}
      />
      <StatsCard
        label="Story Points"
        value={stats.totalStoryPointsDelivered.toFixed()}
        variant="purple"
        icon={<Hash />}
      />
    </div>
  );
};

export default OverallStats;
