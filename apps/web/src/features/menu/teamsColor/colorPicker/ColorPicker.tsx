import "./colorPicker.less";
import { HexColorPicker } from "react-colorful";
import useColorPicker from "./useColorPicker";

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
