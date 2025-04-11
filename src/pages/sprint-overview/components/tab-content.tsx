import { useState } from "react";
import { JiraEpicColumn, SheetData } from "../../../utils/enums/columns.enum";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import {
  getUniqueValues,
  isCodeReviewTicket,
  removeUndefinedColumns,
  removeUndefinedRows,
} from "../../../utils/utility/sharedUtils";
import SprintStats from "./sprint-stats";
import { DataTable } from "./data-table";
import { generateColumns } from "../utils";

type Props = {
  data: SheetData[];
};

const ANY = "Any";

const TabContent: React.FC<Props> = ({ data }) => {
  const [sprint, setSprint] = useState(ANY);
  const sprints = getUniqueValues(data, JiraEpicColumn.SPRINT);
  const sprintData = removeUndefinedRows(removeUndefinedColumns(data));
  const selectedSprintData = sprintData.filter(
    (row) => sprint === ANY || row.Sprint === sprint
  );
  const codeReviewTickets = [] as SheetData[];
  const withoutCodeReviewTickets = selectedSprintData.filter((row) => {
    if (isCodeReviewTicket(row)) {
      codeReviewTickets.push(row);
      return false;
    }
    return true;
  });
  const filteredData = [...withoutCodeReviewTickets, ...codeReviewTickets];
  const dynamicColumns = generateColumns(filteredData, {
    includeSprintColumn: sprint === ANY,
  });

  return (
    <div className="space-y-6 p-2">
      <div className="flex gap-4 items-center">
        {sprints.length > 0 && (
          <>
            <label
              htmlFor="sprint"
              className="text-sm lg:text-base text-gray-800 font-semibold"
            >
              Select a sprint:
            </label>
            <Select onValueChange={(value) => setSprint(value)}>
              <SelectTrigger id="sprint" className="bg-white min-w-56 w-fit">
                <SelectValue placeholder={sprint} defaultValue={sprint} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any</SelectItem>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint} value={sprint}>
                    {sprint}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
      <SprintStats sprintData={selectedSprintData} />
      {filteredData.length > 0 && dynamicColumns.length > 0 && (
        <DataTable data={filteredData} columns={dynamicColumns} />
      )}
    </div>
  );
};

export default TabContent;
