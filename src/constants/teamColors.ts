export const teamColors = [
  { color: "white", code: "#FFFFFF" },
  { color: "black", code: "#000000" },
  { color: "blue", code: "#0a0161ff" },
  { color: "lagoon", code: "#33ffddff" },
  { color: "pink", code: "#ee33ffff" },
] as const;

export type TTeamColor = (typeof teamColors)[number];
export type TTeamColorName = (typeof teamColors)[number]["color"];

export type TDefaultTeamColor = {
  team1: TTeamColorName;
  team2: TTeamColorName;
};
export const defaultTeamColor: TDefaultTeamColor = {
  team1: "white",
  team2: "black",
};
