import { JiraEpicColumn, SheetData } from "../../../utils/enums/columns.enum";
import { IProcessedSheetRow } from "../../../utils/types/ProcessSheetRow.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  getJiraLink,
  getUniqueValues,
  processSheetData,
  toCapitalCase,
} from "../../../utils/utility/sharedUtils";
import Link from "../../../components/ui/link";

interface Props {
  sprint: string;
  data: SheetData[];
}

type Data = {
  owner: string;
  totalTickets: Set<string>;
  estimatedHours: number;
  actualHours: number;
  estimatedReviewHoursByUser: number;
  actualReviewHoursByUser: number;
};

const transformSprintWiseData = (data: SheetData[], sprint: string) => {
  const sprintData = processSheetData(data).find(
    (d) => d.sprint === sprint
  ) as IProcessedSheetRow;
  const users = getUniqueValues(data, JiraEpicColumn.OWNER);

  return users.map((user) => {
    const obj = {} as Data;
    obj.owner = user;
    obj.totalTickets = sprintData.userTickets[user];
    obj.estimatedHours = sprintData.estimatedUserEfforts[user] ?? 0;
    obj.actualHours = sprintData.userEfforts[user] ?? 0;
    obj.estimatedReviewHoursByUser =
      sprintData.estimatedReviewHoursByUser[user] ?? 0;
    obj.actualReviewHoursByUser = sprintData.actualReviewHoursByUser[user] ?? 0;
    return obj;
  });
};

export const DashboardSprintTable: React.FC<Props> = ({ data, sprint }) => {
  const formattedData = transformSprintWiseData(data, sprint);

  return (
    <div className="bg-white">
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow className="border-none shadow-sm">
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border">
              Owner
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border text-center">
              No of Tickets
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border text-center">
              Estimated Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border text-center">
              Actual Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border text-center">
              Estimated Review Hours
            </TableHead>
            <TableHead className="text-gray-500 p-2 text-xs lg:text-sm border text-center">
              Actual Review Hours
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedData.map((row) => {
            return (
              <TableRow key={row.owner} className="text-center lg:text-sm">
                <TableCell className="text-left border">
                  {toCapitalCase(row.owner)}
                </TableCell>
                <TableCell className="border">
                  {row.totalTickets.size > 0 ? (
                    <Link href={getJiraLink(row.totalTickets)}>
                      {row.totalTickets.size}
                    </Link>
                  ) : (
                    row.totalTickets.size
                  )}
                </TableCell>
                <TableCell className="border">{row.estimatedHours}</TableCell>
                <TableCell className="border">{row.actualHours}</TableCell>
                <TableCell className="border">
                  {row.estimatedReviewHoursByUser}
                </TableCell>
                <TableCell className="border">
                  {row.actualReviewHoursByUser}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
