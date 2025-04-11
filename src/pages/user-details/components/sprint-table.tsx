import { SprintStats } from "..";
import Link from "../../../components/ui/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { getJiraLink } from "../../../utils/utility/sharedUtils";

interface Props {
  stats: SprintStats;
}

const SprintTable: React.FC<Props> = ({ stats }) => {
  return (
    <div className="border">
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
              Estimated Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-center text-xs lg:text-sm border">
              Actual Hours
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
          {Object.keys(stats).map((sprint, index) => (
            <TableRow key={index} className="text-center">
              <TableCell className="text-xs lg:text-sm font-normal border">
                {sprint}
              </TableCell>
              <TableCell className="text-xs lg:text-sm font-normal border">
                {stats[sprint].totalTickets.size > 0 ? (
                  <Link href={getJiraLink(stats[sprint].totalTickets)}>
                    {stats[sprint].totalTickets.size}
                  </Link>
                ) : (
                  stats[sprint].totalTickets.size
                )}
              </TableCell>
              <TableCell className="text-xs lg:text-sm font-normal border">
                {stats[sprint].estimatedHours}
              </TableCell>
              <TableCell className="text-xs lg:text-sm font-normal border">
                {stats[sprint].actualHours}
              </TableCell>
              <TableCell className="text-xs lg:text-sm font-normal border">
                {stats[sprint].totalReviewedTickets.size > 0 ? (
                  <Link href={getJiraLink(stats[sprint].totalReviewedTickets)}>
                    {stats[sprint].totalEstimatedReviewHours}
                  </Link>
                ) : (
                  stats[sprint].totalEstimatedReviewHours
                )}
              </TableCell>
              <TableCell className="text-xs lg:text-sm font-normal border">
                {stats[sprint].totalReviewedTickets.size > 0 ? (
                  <Link href={getJiraLink(stats[sprint].totalReviewedTickets)}>
                    {stats[sprint].totalActualReviewHours}
                  </Link>
                ) : (
                  stats[sprint].totalActualReviewHours
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SprintTable;
