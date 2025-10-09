import { useEffect, useMemo, useState } from "react";
import { debounce } from "@utils/debounce";
import {
  useTeamsColorContextDispatch,
  useTeamsColorContextState,
} from "../context";
import { getColorNameFromApi } from "src/api/getColorNameFromAPI";

const COLOR_PICKER_DEBOUNCE_DELAY = 150;

const useColorPicker = (index: number | null) => {
  const { colorsSet } = useTeamsColorContextState();
  const { getOnChangeColorInColorsSet } = useTeamsColorContextDispatch();

  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    if (index === null) return;

    const currentColor = colorsSet[index]?.code;
    if (currentColor) setColor(currentColor);
  }, [colorsSet, index]);

  async function createNewColorObject(colorCode: string) {
    const colorName = await getColorNameFromApi(colorCode);
    if (colorName) {
      const newColor = { name: colorName, code: colorCode };
      return newColor;
    }
  }

  const debouncedSetColor = useMemo(
    () =>
      debounce(async (nextColor: string) => {
        if (index !== null) {
          const newColor = await createNewColorObject(nextColor);
          if (newColor) getOnChangeColorInColorsSet(index, newColor);
        }
      }, COLOR_PICKER_DEBOUNCE_DELAY),
    [index, getOnChangeColorInColorsSet]
  );

  const handleSetColorAndUpdate = (newColor: string) => {
    setColor(newColor);
    debouncedSetColor(newColor);
  };

  return { color, handleSetColorAndUpdate };
};

export default useColorPicker;
