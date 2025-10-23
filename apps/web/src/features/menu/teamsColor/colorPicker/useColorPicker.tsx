import { useEffect, useMemo, useState } from "react";
import { debounce } from "@core/utils/debounce";
import {
  useTeamsColorContextDispatch,
  useTeamsColorContextState,
} from "../context";
import { useColorName } from "@core/hooks/useGetColorName";

const COLOR_PICKER_DEBOUNCE_DELAY = 150;

export function useColorPicker(index: number | null) {
  const { colorsSet } = useTeamsColorContextState();
  const { getOnChangeColorInColorsSet } = useTeamsColorContextDispatch();

  const [color, setColor] = useState("#ff0000");

  const { fetchColorName, loading, error } = useColorName();

  useEffect(() => {
    if (index === null) return;
    const currentColor = colorsSet[index]?.code;
    if (currentColor) setColor(currentColor);
  }, [colorsSet, index]);

  async function createNewColorObject(colorCode: string) {
    try {
      const colorName = await fetchColorName(colorCode);
      if (!colorName) return null;
      return { name: colorName, code: colorCode };
    } catch {
      return null;
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

  return {
    color,
    handleSetColorAndUpdate,
    loading,
    error,
  };
}

export default useColorPicker;
