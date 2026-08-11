// Get color name from hex using Color.pizza API (no auth)

export async function getColorNameFromApi(hex: string): Promise<string> {
  const cleanHex = hex.replace("#", "");
  const url = "https://api.color.pizza/v1";

  const response = await fetch(`${url}/?values=${cleanHex}`);
  const data = await response.json();

  const name = data?.colors?.[0]?.name;

  if (typeof name === "string" && name.trim() !== "") {
    return name;
  }

  // If no network or response malformed, use fallback
  return `color#${cleanHex}`;
}
