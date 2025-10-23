import { useCallback, useState } from "react";
import { TeamColorContext } from "./index";
import {
  defaultTeamColor,
  defaultColorsSet,
  TDefaultTeamColor,
  TTeamColor,
} from "@core/constants/defaultColorsSet";
import { useLocalStorage } from "@core/hooks/useLocalStorage";

const localStorageColorSetKey = "custom-set-colors";

export function TeamColorProvider({ children }: { children: React.ReactNode }) {
  const { storedData, updateStoredData, removeStoredData } = useLocalStorage(
    localStorageColorSetKey,
    [...defaultColorsSet]
  );
  const initialColorsSet = storedData ? [...storedData] : [...defaultColorsSet];

  const [colorsSet, setColorsSet] = useState<TTeamColor[]>(initialColorsSet);

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

        updateStoredData(nextColors);
        return nextColors;
      });
    },
    [updateStoredData]
  );

  const resetSetColorsToDefault = useCallback(() => {
    removeStoredData();

    const defaultSet = [...defaultColorsSet];
    setColorsSet(defaultSet);

    const getDefaultColor = (team: keyof TDefaultTeamColor) => {
      const colorName = defaultTeamColor[team];
      return (
        defaultSet.find((color) => color.name === colorName) || defaultSet[0]
      );
    };

    setTeam1Color(getDefaultColor("team1"));
    setTeam2Color(getDefaultColor("team2"));
  }, [removeStoredData]);

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
