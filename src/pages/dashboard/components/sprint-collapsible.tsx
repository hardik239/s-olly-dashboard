import { JiraEpicColumn, SheetData } from "../../../utils/enums/columns.enum";
import { formatter } from "../../../utils/utility/formatters";
import { getUniqueValues } from "../../../utils/utility/sharedUtils";
import SprintChart from "./sprint-chart";
import { DashboardSprintTable } from "./sprint-table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { Card, CardContent } from "../../../components/ui/card";
import SprintsStats from "./sprint-stats";

const CollapsibleTable = ({ data }: { data: SheetData[] }) => {
  const sprints = getUniqueValues(data, JiraEpicColumn.SPRINT);

  if (!sprints || sprints.length === 0) {
    return <></>;
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={formatter("sprint", sprints[0])}
    >
      {sprints.map((sprint) => {
        return (
          <AccordionItem
            key={formatter("sprint", sprint)}
            value={formatter("sprint", sprint)}
            className="pb-2 border-none"
          >
            <AccordionTrigger className="bg-slate-100 p-2 rounded justify-start gap-4 ml-3 text-xs lg:text-sm">
              {formatter("sprint", sprint)}
            </AccordionTrigger>
            <AccordionContent className="lg:pl-6 pt-4 pb-2 grid lg:grid-cols-2 gap-4 lg:gap-8">
              <Card className="shadow-sm">
                <CardContent className="p-4 space-y-6">
                  <SprintsStats sprint={sprint} sheetData={data} />
                  <DashboardSprintTable sprint={sprint} data={data} />
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent>
                  <SprintChart sprint={sprint} data={data} />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CollapsibleTable;
