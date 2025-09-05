import { useState } from "react";
import { TeamColorContext } from "./index";
import {
  defaultTeamColor,
  TDefaultTeamColor,
  teamColors,
  TTeamColor,
} from "@constants/teamColors";

export function TeamColorProvider({ children }: { children: React.ReactNode }) {
  function getDefaultTeamColor(team: keyof TDefaultTeamColor): TTeamColor {
    const colorName = defaultTeamColor[team];
    return teamColors.find((c) => c.color === colorName) || teamColors[0];
  }

  const [team1Color, setTeam1Color] = useState<TTeamColor>(
    getDefaultTeamColor("team1")
  );
  const [team2Color, setTeam2Color] = useState<TTeamColor>(
    getDefaultTeamColor("team2")
  );

  const onChangeTeam1Color = (color: TTeamColor) => {
    setTeam1Color(color);
  };

  const onChangeTeam2Color = (color: TTeamColor) => {
    setTeam2Color(color);
  };

  return (
    <TeamColorContext.Provider
      value={{ team1Color, team2Color, onChangeTeam1Color, onChangeTeam2Color }}
    >
      {children}
    </TeamColorContext.Provider>
  );
}
