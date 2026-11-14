import { useCallback, useEffect, useState, ReactNode } from "react";
import {
  defaultTeamColor,
  defaultColorsSet,
  TDefaultTeamColor,
  TTeamColor,
} from "@pocket/core/constants/defaultColorsSet";
import { TeamColorContext } from "@pocket/core/teamsColor/context/TeamsColorContext";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";

const colorSetStorageKey = "custom-set-colors";

function getDefaultTeamColor(
  colorsSet: TTeamColor[],
  team: keyof TDefaultTeamColor
): TTeamColor {
  const colorName = defaultTeamColor[team];
  return colorsSet.find((c) => c.name === colorName) || colorsSet[0];
}

export function TeamColorProvider({ children }: { children: ReactNode }) {
  const { storedData, updateStoredData, removeStoredData, hasHydrated } =
    useAsyncStorage(colorSetStorageKey, [...defaultColorsSet]);

  const [colorsSet, setColorsSet] = useState<TTeamColor[]>([
    ...defaultColorsSet,
  ]);
  const [team1Color, setTeam1Color] = useState<TTeamColor>(
    getDefaultTeamColor(defaultColorsSet, "team1")
  );
  const [team2Color, setTeam2Color] = useState<TTeamColor>(
    getDefaultTeamColor(defaultColorsSet, "team2")
  );

  // AsyncStorage resolves after mount, unlike web's synchronous localStorage.
  // Apply the persisted set once, right when it finishes loading.
  useEffect(() => {
    if (!hasHydrated) return;
    setColorsSet(storedData);
    setTeam1Color(getDefaultTeamColor(storedData, "team1"));
    setTeam2Color(getDefaultTeamColor(storedData, "team2"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

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

    setTeam1Color(getDefaultTeamColor(defaultSet, "team1"));
    setTeam2Color(getDefaultTeamColor(defaultSet, "team2"));
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
