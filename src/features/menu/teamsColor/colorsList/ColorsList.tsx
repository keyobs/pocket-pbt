import "./colorsList.less";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import ColorPicker from "../colorPicker/ColorPicker";
import { useColorsList } from "./useColorList";

interface ITeamColors {
  title: string | null;
  team: number;
  settingsMode: boolean;
}

const ColorsList = ({ settingsMode, team, title }: ITeamColors) => {
  const { colorsSet, handleColorChange, isButtondisabled, selectedColorIndex } =
    useColorsList(settingsMode, team);

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
