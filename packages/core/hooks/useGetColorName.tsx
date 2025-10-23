import { usePromise } from "@hooks/usePromise";
import { getColorNameFromApi } from "@api/getColorNameFromAPI";

export function useColorName() {
  const { loading, data, error, run } = usePromise(getColorNameFromApi);

  const fetchColorName = async (hex: string): Promise<string> => {
    const name = await run(hex);
    return name;
  };

  return { loading, colorName: data, error, fetchColorName };
}
