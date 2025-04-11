import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import TabContent from "./components/tab-content";
import { useDataSource } from "../../context/useDataSource";
import { useNavigate } from "react-router-dom";
import { useSetTeamPath } from "../../hooks/useSetTeamPath";
import { beautifySlug } from "../../utils/utils";

const SprintOverview = () => {
  const navigate = useNavigate();
  const {
    data: { teams, tickets },
  } = useDataSource();
  const { actualTeamName, selectedTeam } = useSetTeamPath();

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
        Sprint Overview
      </h2>
      <Tabs
        onValueChange={(teamName) =>
          navigate(`/dashboard/sprint-overview/${beautifySlug(teamName)}`)
        }
        defaultValue={selectedTeam}
        value={actualTeamName}
        className="space-y-4"
      >
        <TabsList>
          {teams.map((team) => (
            <TabsTrigger key={`${team}_tab`} value={team} className="text-xs">
              {team}
            </TabsTrigger>
          ))}
        </TabsList>
        {teams.map((team) => (
          <TabsContent
            key={`${team}_content`}
            value={team}
            className="space-y-8"
          >
            <TabContent data={tickets[team]} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default SprintOverview;
