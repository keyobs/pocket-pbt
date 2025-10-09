import "./colorsMenubutton.less";
import { CSSProperties } from "react";
import MenuButton from "@components/buttons/menuButton/MenuButton";
import { defaultColorsSet } from "@constants/defaultColorsSet";

type TColorsMenuButton = {
  onClick: () => void;
};

const ColorsMenuButton = ({ onClick }: TColorsMenuButton) => {
  const defaultColors = ["blue", "pink", "lagoon"];

  const defaultCodeColors = defaultColorsSet
    .filter((color) => defaultColors.includes(color.name))
    .map((color) => color.code);

  return (
    <MenuButton onClick={onClick}>
      <div
        className="dots-loader"
        style={
          {
            "--c1": defaultCodeColors[0],
            "--c2": defaultCodeColors[1],
            "--c3": defaultCodeColors[2],
          } as CSSProperties
        }
      />
    </MenuButton>
  );
};

export default ColorsMenuButton;
