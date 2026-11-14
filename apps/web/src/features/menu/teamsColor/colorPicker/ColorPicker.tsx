import "./colorPicker.less";
import useColorPicker from "@core/teamsColor/colorPicker/useColorPicker";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ index }: { index: number }) => {
  const { color, handleSetColorAndUpdate } = useColorPicker(index);

  return (
    <div className="color-picker">
      <HexColorPicker color={color} onChange={handleSetColorAndUpdate} />
      <p>Selected: {color}</p>
    </div>
  );
};

export default ColorPicker;
