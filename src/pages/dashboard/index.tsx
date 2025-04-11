import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useDataSource } from "../../context/useDataSource";
import { useSetTeamPath } from "../../hooks/useSetTeamPath";
import { beautifySlug } from "../../utils/utils";
import TabContent from "./components/tab-content";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    data: { teams, tickets },
  } = useDataSource();
  const { actualTeamName, selectedTeam } = useSetTeamPath();

  if (Object.values(tickets).length === 0) {
    return <></>;
  }

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
        Dashboard
      </h2>
      <Tabs
        className="space-y-4"
        onValueChange={(teamName) =>
          navigate(`/dashboard/${beautifySlug(teamName)}`)
        }
        defaultValue={selectedTeam}
        value={actualTeamName}
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
            <TabContent data={tickets[team] ?? []} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default Dashboard;
