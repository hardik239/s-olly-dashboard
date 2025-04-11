import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { UserStats } from "../../user-details";
import { getJiraLink, toTitleCase } from "../../../utils/utility/sharedUtils";
import { renderBadge } from "../../../utils/utility/formatters";
import { getChipData } from "../utils";
import Link from "../../../components/ui/link";

type UserStatsKeys = Omit<UserStats, "sprintStats">;

interface UserStatsTableProps {
  usernames: string[];
  userStats: Record<string, UserStats>;
}

const stats = [
  { label: "Total Tickets", key: "totalTickets" },
  { label: "Total Reviewed Tickets", key: "totalReviewedTickets" },
  { label: "Total Estimated Hours", key: "totalEstimatedHours" },
  { label: "Total Actual Hours", key: "totalActualHours" },
  {
    label: "Average Effort Estimation Accuracy",
    key: "averageEffortEstimationAccuracy",
  },
  { label: "Estimated Review Hours", key: "estimatedReviewHours" },
  { label: "Actual Review Hours", key: "actualReviewHours" },
  { label: "Components Worked on", key: "components" },
  { label: "Epics Worked on", key: "epics" },
];

const UserStatsTable: React.FC<UserStatsTableProps> = ({
  usernames,
  userStats,
}) => {
  const renderCellContent = (username: string, key: string) => {
    const value = userStats[username]?.[key as keyof UserStatsKeys];

    if (value instanceof Set) {
      return value.size > 0 ? (
        <Link href={getJiraLink(value)}>{value.size}</Link>
      ) : (
        value.size
      );
    }

    if (typeof value === "number") {
      return Math.round(value);
    }

    if (value === undefined) {
      return "-";
    }

    if (Array.isArray(value)) {
      const chipsData = getChipData(value);
      return (
        <div className="flex flex-wrap gap-2 text-xs p-1">
          {renderBadge(chipsData)}
        </div>
      );
    }

    return value;
  };

  return (
    <div className="border bg-white shadow">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 text-xs lg:text-sm">
            <TableHead className="text-gray-500 p-2" />
            {usernames.map((username) => (
              <TableHead
                key={username}
                className="text-gray-500 p-2 text-center border border-t-0"
              >
                {toTitleCase(username)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((stat) => {
            return (
              <TableRow key={`${stat.label}`}>
                <TableCell className="text-xs lg:text-sm font-medium">
                  {stat.label}
                </TableCell>
                {usernames.map((username) => (
                  <TableCell
                    key={username}
                    className="text-xs lg:text-sm font-normal text-center border"
                  >
                    {renderCellContent(username, stat.key)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserStatsTable;
