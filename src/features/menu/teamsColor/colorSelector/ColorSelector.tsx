import "./colorSelector.less";
import ColorPicker from "../colorPicker/ColorPicker";
import { useColorSelector } from "./useColorSelector";
import ColorButton from "@components/buttons/colorButton/ColorButton";
import { Button } from "@components/buttons/Button";
import { useTeamsColorContextDispatch } from "../context";
import { AlertTriangle } from "react-feather";

interface ITeamColors {
  title: string | null;
  team: number;
  settingsMode: boolean;
}

const ColorsSelector = ({ settingsMode, team, title }: ITeamColors) => {
  const { colorsSet, handleColorChange, isColorSelected, selectedColorIndex } =
    useColorSelector(settingsMode, team);

  const { resetSetColorsToDefault } = useTeamsColorContextDispatch();

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

      {settingsMode && (
        <div style={{ width: "100%" }}>
          <Button
            size="fit"
            onClick={resetSetColorsToDefault}
            customStyle={{ marginTop: 35 }}
          >
            <AlertTriangle />
            <span style={{ marginLeft: 10 }}>reset all colors</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ColorsSelector;
