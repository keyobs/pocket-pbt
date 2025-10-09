import "./colorsList.less";
import ColorPicker from "../colorPicker/ColorPicker";
import { useColorsList } from "./useColorList";
import ColorButton from "@components/buttons/colorButton/ColorButton";

interface ITeamColors {
  title: string | null;
  team: number;
  settingsMode: boolean;
}

const ColorsList = ({ settingsMode, team, title }: ITeamColors) => {
  const { colorsSet, handleColorChange, isButtonDisabled, selectedColorIndex } =
    useColorsList(settingsMode, team);

  return (
    <div className="colors-list">
      <div className="list">
        <h3>{title || "\u00a0"}</h3>
        {colorsSet.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            disabled={isButtonDisabled(index, color)}
            handleOnClick={() => handleColorChange(color, index)}
            settingsMode={settingsMode}
          />
        ))}
      </div>

      {settingsMode && <ColorPicker index={selectedColorIndex} />}
    </div>
  );
};

export default ColorsList;
