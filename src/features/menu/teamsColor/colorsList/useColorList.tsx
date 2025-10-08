import { TTeamColor } from "@constants/defaultColorsSet";
import { useState } from "react";
import {
  useTeamsColorContextState,
  useTeamsColorContextDispatch,
} from "../context";

export const useColorsList = (settingsMode: boolean, team: number) => {
  const { team1Color, team2Color, colorsSet } = useTeamsColorContextState();
  const { getOnChangeColor } = useTeamsColorContextDispatch();

  function findTeam1Index() {
    return colorsSet.findIndex((color) => color === team1Color);
  }

  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(
    findTeam1Index()
  );

  const onSelectColorSpot = (index: number) => {
    if (settingsMode) {
      setSelectedColorIndex(index);
    }
  };

  const handleColorChange = (color: TTeamColor, index: number) => {
    if (settingsMode) onSelectColorSpot(index);
    else getOnChangeColor(team)(color);
  };

  const isButtondisabled = (index: number, color: TTeamColor) => {
    if (settingsMode) {
      return index === selectedColorIndex;
    } else {
      return color === (team === 1 ? team1Color : team2Color);
    }
  };

  return {
    colorsSet,
    handleColorChange,
    isButtondisabled,
    selectedColorIndex,
  };
};
