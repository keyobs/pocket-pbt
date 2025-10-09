import { CSSProperties } from "react";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import { TTeamColor } from "@constants/defaultColorsSet";

type TColorButton = {
  color: TTeamColor;
  disabled: boolean;
  settingsMode: boolean;
  handleOnClick: () => void;
};
const ColorButton = ({
  color,
  settingsMode,
  disabled,
  handleOnClick,
}: TColorButton) => {
  const spanStyle: CSSProperties = {
    whiteSpace: "normal",
    textAlign: "left",
    maxWidth: 85,
  };
  return (
    <Button
      disabled={disabled}
      onClick={handleOnClick}
      size="fit"
      align="start"
      disabledStyle={settingsMode ? "selectable" : "default"}
    >
      <ColorDot color={color.code} />
      <span style={spanStyle}>{color.name}</span>
    </Button>
  );
};

export default ColorButton;
