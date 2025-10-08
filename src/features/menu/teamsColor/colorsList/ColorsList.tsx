import "./colorsList.less";
import { useState } from "react";
import { TTeamColor } from "@constants/defaultColorsSet";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import {
  useTeamsColorContextDispatch,
  useTeamsColorContextState,
} from "../context";
import ColorPicker from "../colorPicker/ColorPicker";

interface ITeamColors {
  title: string | null;
  team: number;
  settingsMode: boolean;
}

const ColorsList = ({ settingsMode, team, title }: ITeamColors) => {
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

  return (
    <div className="colors-list">
      <div className="list">
        <h3>{title || "\u00a0"}</h3>
        {colorsSet.map((color, index) => (
          <Button
            disabled={isButtondisabled(index, color)}
            key={index}
            onClick={() => handleColorChange(color, index)}
            size="fit"
            align="start"
            disabledStyle={settingsMode ? "selectable" : "default"}
          >
            <ColorDot color={color.code} />
            <span style={{ marginLeft: "4px" }}>{color.name}</span>
          </Button>
        ))}
      </div>

      {settingsMode && <ColorPicker index={selectedColorIndex} />}
    </div>
  );
};

export default ColorsList;
