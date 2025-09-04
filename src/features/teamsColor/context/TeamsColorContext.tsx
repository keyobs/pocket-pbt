import { createContext } from "react";
import { TTeamColor } from "../../../constants/teamColors";
import { useContext } from "react";

type TTeamColorContext = {
  team1Color: TTeamColor;
  team2Color: TTeamColor;
  onChangeTeam1Color: (color: TTeamColor) => void;
  onChangeTeam2Color: (color: TTeamColor) => void;
};

export const TeamColorContext = createContext<TTeamColorContext | null>(null);

export function useTeamsColorContext() {
  const context = useContext(TeamColorContext);
  if (!context) {
    throw new Error(
      "useTeamsColorContext must be used within a TeamsColorProvider"
    );
  }
  return context;
}

export function useTeamsColorContextState() {
  const { team1Color, team2Color } = useTeamsColorContext();
  return { team1Color, team2Color };
}

export function useTeamsColorContextDispatch() {
  const { onChangeTeam1Color, onChangeTeam2Color } = useTeamsColorContext();
  return { onChangeTeam1Color, onChangeTeam2Color };
}
