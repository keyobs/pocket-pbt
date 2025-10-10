import { useCallback, useState } from "react";
import { TeamColorContext } from "./index";
import {
  defaultTeamColor,
  TDefaultTeamColor,
  defaultColorsSet,
  TTeamColor,
} from "@constants/defaultColorsSet";

export function TeamColorProvider({ children }: { children: React.ReactNode }) {
  const [colorsSet, setColorsSet] = useState<TTeamColor[]>([
    ...defaultColorsSet,
  ]);

  function getDefaultTeamColor(team: keyof TDefaultTeamColor): TTeamColor {
    const colorName = defaultTeamColor[team];
    return colorsSet.find((c) => c.name === colorName) || colorsSet[0];
  }

  const [team1Color, setTeam1Color] = useState<TTeamColor>(
    getDefaultTeamColor("team1")
  );
  const [team2Color, setTeam2Color] = useState<TTeamColor>(
    getDefaultTeamColor("team2")
  );

  const onChangeTeam1Color = useCallback((color: TTeamColor) => {
    setTeam1Color(color);
  }, []);

  const onChangeTeam2Color = useCallback((color: TTeamColor) => {
    setTeam2Color(color);
  }, []);

  const getOnChangeColor = useCallback(
    (team: number) => (team === 1 ? onChangeTeam1Color : onChangeTeam2Color),
    [onChangeTeam1Color, onChangeTeam2Color]
  );

  const getOnChangeColorInColorsSet = useCallback(
    (index: number, newColor: TTeamColor) => {
      setColorsSet((prevColors) => {
        if (index < 0 || index >= prevColors.length) return prevColors;

        const previousColor = prevColors[index];

        const nextColors = [...prevColors];
        nextColors[index] = newColor;

        setTeam1Color((prevTeam1) =>
          prevTeam1 === previousColor ? newColor : prevTeam1
        );
        setTeam2Color((prevTeam2) =>
          prevTeam2 === previousColor ? newColor : prevTeam2
        );

        return nextColors;
      });
    },
    []
  );

  const resetSetColorsToDefault = useCallback(() => {
    setColorsSet([...defaultColorsSet]);
  }, []);

  return (
    <TeamColorContext.Provider
      value={{
        colorsSet,
        team1Color,
        team2Color,
        onChangeTeam1Color,
        onChangeTeam2Color,
        getOnChangeColor,
        getOnChangeColorInColorsSet,
        resetSetColorsToDefault,
      }}
    >
      {children}
    </TeamColorContext.Provider>
  );
}
