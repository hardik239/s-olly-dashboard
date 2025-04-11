import React from "react";
import { SheetData } from "../../../utils/enums/columns.enum";
import OverallStats from "./overall-stats";
import Charts from "./charts";
import SprintCollapsibleSection from "./sprint-collapsible";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type Props = {
  data: SheetData[];
};

const TabContent: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6">
      <OverallStats sheetData={data} />
      <Charts data={data} />
      {data.length > 0 && (
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sprint-Wise Pivot</CardTitle>
          </CardHeader>
          <CardContent className="h-full pl-4 pr-4">
            <SprintCollapsibleSection data={data} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TabContent;
