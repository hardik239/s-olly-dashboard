import { FC } from "react";
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

const UserOverview: FC = () => {
  const navigate = useNavigate();
  const { actualTeamName, selectedTeam } = useSetTeamPath();
  const {
    data: { teams, tickets },
  } = useDataSource();

  return (
    <>
      <Tabs
        className="space-y-4"
        onValueChange={(teamName) =>
          navigate(`/dashboard/user-overview/${beautifySlug(teamName)}`)
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
            <TabContent data={tickets[actualTeamName]} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

const UserOverviewContainer: FC = () => {
  const {
    data: { tickets },
  } = useDataSource();

  if (Object.keys(tickets).length === 0) {
    return <></>;
  }

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
        User Overview
      </h2>
      <UserOverview />
    </>
  );
};

export default UserOverviewContainer;
