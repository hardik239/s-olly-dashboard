import FancyStatsCard from "../../../components/fancy-stats-card";
import { SheetData } from "../../../utils/enums/columns.enum";
import { IProcessedSheetRow } from "../../../utils/types/ProcessSheetRow.type";
import { processSheetData } from "../../../utils/utility/sharedUtils";

type DashboardStatsProps = {
  sprint: string;
  sheetData: SheetData[];
};

const DashboardStats: React.FC<DashboardStatsProps> = ({
  sheetData,
  sprint,
}) => {
  const sprintData = processSheetData(sheetData).find(
    (data) => data.sprint === sprint
  ) as IProcessedSheetRow;

  return (
    <div className="flex items-center gap-4">
      <FancyStatsCard
        label="No of Story Points"
        value={sprintData.noOfSP.toFixed()}
        variant="orange"
      />
      <FancyStatsCard
        label="Estimated Work Hours"
        value={sprintData.estimatedHours.toString()}
        variant="green"
      />
      <FancyStatsCard
        label="Actual Work Hours"
        value={sprintData.noOfHours.toString()}
        variant="blue"
      />
      <FancyStatsCard
        label="Estimated Review Hours"
        value={sprintData.estimatedReviewHoursByUser["total"].toString()}
        variant="pink"
      />
      <FancyStatsCard
        label="Actual Review Hours"
        value={sprintData.actualReviewHoursByUser["total"].toString()}
        variant="slate"
      />
    </div>
  );
};

export default DashboardStats;
