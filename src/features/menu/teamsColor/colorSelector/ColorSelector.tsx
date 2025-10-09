import "./colorSelector.less";
import ColorPicker from "../colorPicker/ColorPicker";
import { useColorSelector } from "./useColorSelector";
import ColorButton from "@components/buttons/colorButton/ColorButton";

interface ITeamColors {
  title: string | null;
  team: number;
  settingsMode: boolean;
}

const ColorsSelector = ({ settingsMode, team, title }: ITeamColors) => {
  const { colorsSet, handleColorChange, isColorSelected, selectedColorIndex } =
    useColorSelector(settingsMode, team);

  return (
    <div className="color-selector">
      <div className="list">
        <h3>{title || "\u00a0"}</h3>
        {colorsSet.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            active={isColorSelected(index, color)}
            handleOnClick={() => handleColorChange(color, index)}
            settingsMode={settingsMode}
          />
        ))}
      </div>

      {settingsMode && <ColorPicker index={selectedColorIndex} />}
    </div>
  );
};

export default ColorsSelector;
