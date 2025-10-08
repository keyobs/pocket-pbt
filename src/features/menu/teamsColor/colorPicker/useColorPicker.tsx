import { useEffect, useMemo, useState } from "react";
import { debounce } from "@utils/debounce";
import {
  useTeamsColorContextDispatch,
  useTeamsColorContextState,
} from "../context";

const COLOR_PICKER_DEBOUNCE_DELAY = 150;

const useColorPicker = (index: number | null) => {
  const { colorsSet } = useTeamsColorContextState();
  const { getOnChangeColorInColorsSet } = useTeamsColorContextDispatch();
  const [color, setColor] = useState("hsl(0, 100%, 50%)");

  const debouncedSetColor = useMemo(
    () =>
      debounce((nextColor: string) => {
        if (index !== null) {
          getOnChangeColorInColorsSet(index, nextColor);
        }
      }, COLOR_PICKER_DEBOUNCE_DELAY),
    [index, getOnChangeColorInColorsSet]
  );

  const handleSetColorAndUpdate = (newColor: string) => {
    setColor(newColor);
    debouncedSetColor(newColor);
  };

  useEffect(() => {
    if (index === null) {
      return;
    }

    const currentColor = colorsSet[index]?.code;
    if (currentColor) {
      setColor(currentColor);
    }
  }, [colorsSet, index]);

  return { color, handleSetColorAndUpdate };
};

export default useColorPicker;
