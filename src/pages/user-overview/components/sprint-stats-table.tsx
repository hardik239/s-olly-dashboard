import React from "react";
import Link from "../../../components/ui/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { formatter } from "../../../utils/utility/formatters";
import { getJiraLink } from "../../../utils/utility/sharedUtils";
import { UserStats } from "../../user-details";

interface Props {
  username: string;
  userStats: Record<string, UserStats>;
}

const SprintUserStatsTable: React.FC<Props> = ({ username, userStats }) => {
  const sprintStats = userStats[username || ""].sprintStats;

  return (
    <div className="bg-white pt-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Sprint
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Total Tickets
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Estimated Work Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Actual Work Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Estimated Review Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Actual Review Hours
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(sprintStats).map((sprintName) => {
            return (
              <TableRow
                key={`${sprintName}`}
                className="text-center text-xs lg:text-sm"
              >
                <TableCell className="border">
                  <span className="text-xs lg:text-sm">
                    {formatter("sprint", sprintName)}
                  </span>
                </TableCell>
                <TableCell className="text-xs lg:text-sm font-normal border">
                  {sprintStats[sprintName].totalTickets.size > 0 ? (
                    <Link
                      href={getJiraLink(sprintStats[sprintName].totalTickets)}
                    >
                      {sprintStats[sprintName].totalTickets.size}
                    </Link>
                  ) : (
                    sprintStats[sprintName].totalTickets.size
                  )}
                </TableCell>
                <TableCell className="text-xs lg:text-sm font-normal border">
                  {sprintStats[sprintName].estimatedHours
                    ? sprintStats[sprintName].estimatedHours
                    : 0}
                </TableCell>
                <TableCell className="text-xs lg:text-sm font-normal border">
                  {sprintStats[sprintName].actualHours
                    ? sprintStats[sprintName].actualHours
                    : 0}
                </TableCell>
                <TableCell className="text-xs lg:text-sm font-normal border">
                  {sprintStats[sprintName].totalReviewedTickets.size > 0 ? (
                    <Link
                      href={getJiraLink(
                        sprintStats[sprintName].totalReviewedTickets
                      )}
                    >
                      {sprintStats[sprintName].totalEstimatedReviewHours}
                    </Link>
                  ) : (
                    sprintStats[sprintName].totalEstimatedReviewHours
                  )}
                </TableCell>
                <TableCell className="text-xs lg:text-sm font-normal border">
                  {sprintStats[sprintName].totalReviewedTickets.size > 0 ? (
                    <Link
                      href={getJiraLink(
                        sprintStats[sprintName].totalReviewedTickets
                      )}
                    >
                      {sprintStats[sprintName].totalActualReviewHours}
                    </Link>
                  ) : (
                    sprintStats[sprintName].totalActualReviewHours
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SprintUserStatsTable;
