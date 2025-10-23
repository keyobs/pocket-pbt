import { CSSProperties } from "react";
import { Button } from "@components/buttons/Button";
import ColorDot from "@components/colorDot/ColorDot";
import { TTeamColor } from "@constants/defaultColorsSet";

type TColorButton = {
  color: TTeamColor;
  disabled?: boolean;
  active?: boolean;
  settingsMode: boolean;
  handleOnClick: () => void;
};
const ColorButton = ({
  color,
  settingsMode,
  disabled,
  active,
  handleOnClick,
}: TColorButton) => {
  const spanStyle: CSSProperties = {
    whiteSpace: "normal",
    textAlign: "left",
    minWidth: 53,
    maxWidth: 75,
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleOnClick}
      size="fit"
      align="start"
      style="selection"
      active={active}
      activeStyle={settingsMode ? "selected" : "active"}
    >
      <ColorDot color={color.code} />
      <span style={spanStyle}>{color.name}</span>
    </Button>
  );
};

export default ColorButton;
