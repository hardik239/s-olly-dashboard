import React from "react";
import CapacityTable from "./components/capacity-table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useDataSource } from "../../context/useDataSource";
import { useNavigate } from "react-router-dom";
import { useSetTeamPath } from "../../hooks/useSetTeamPath";
import { beautifySlug } from "../../utils/utils";

const CapacityPlanning: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: { teams, tickets, capacity },
  } = useDataSource();
  const { actualTeamName, selectedTeam } = useSetTeamPath();

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
        Capacity Planning
      </h2>
      <Tabs
        onValueChange={(teamName) =>
          navigate(`/dashboard/capacity-planning/${beautifySlug(teamName)}`)
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
            <CapacityTable
              team={team}
              data={tickets[team]}
              epicsTemplate={capacity[team]}
            />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default CapacityPlanning;
