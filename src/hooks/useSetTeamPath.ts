import { useNavigate, useParams } from "react-router-dom";
import { useDataSource } from "../context/useDataSource";
import { beautifySlug } from "../utils/utils";
import { useEffect } from "react";

export const useSetTeamPath = () => {
  const navigate = useNavigate();
  const {
    data: { teams },
  } = useDataSource();
  const { team = "" } = useParams<{ team: string }>();
  const actualTeamName =
    teams.find((teamName) => beautifySlug(teamName) === team) || "";
  const selectedTeam = teams[0] || "";

  useEffect(() => {
    if (actualTeamName) {
      return;
    }
    navigate(beautifySlug(selectedTeam), {
      replace: true,
    });
  }, [actualTeamName, selectedTeam, navigate]);

  return {
    actualTeamName,
    selectedTeam,
  };
};
