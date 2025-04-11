import { FC } from "react";
import { toCapitalCase } from "../../../utils/utility/sharedUtils";
import SprintStatsTable from "./sprint-stats-table";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { UserStats } from "../../user-details";

type Props = {
  userStats: Record<string, UserStats>;
};

const CollapsibleTable: FC<Props> = ({ userStats }) => {
  const users = Object.keys(userStats);

  if (!users || users.length === 0) {
    return <></>;
  }

  return (
    <Accordion type="single" collapsible defaultValue={users[0]}>
      {users.map((user) => {
        return (
          <AccordionItem value={user} key={user} className="pb-2 border-none">
            <AccordionTrigger className="bg-slate-100 p-2 rounded justify-start gap-4 ml-3 text-xs lg:text-sm">
              {toCapitalCase(user)}
            </AccordionTrigger>
            <AccordionContent className="pl-6">
              <SprintStatsTable username={user} userStats={userStats} />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CollapsibleTable;
