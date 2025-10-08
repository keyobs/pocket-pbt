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
    (index: number, newColorCode: string) => {
      setColorsSet((prevColors) => {
        if (index < 0 || index >= prevColors.length) {
          return prevColors;
        }

        const previousColor = prevColors[index];
        const updatedColor: TTeamColor = {
          // TODO : api or library to generate color names
          name: `color-${index + 1}`,
          code: newColorCode,
        };

        const nextColors = [...prevColors];
        nextColors[index] = updatedColor;

        setTeam1Color((prevTeam1) =>
          prevTeam1 === previousColor ? updatedColor : prevTeam1
        );
        setTeam2Color((prevTeam2) =>
          prevTeam2 === previousColor ? updatedColor : prevTeam2
        );

        return nextColors;
      });
    },
    []
  );

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
      }}
    >
      {children}
    </TeamColorContext.Provider>
  );
}
