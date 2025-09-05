export const teamColors = [
  { name: "white", code: "#FFFFFF" },
  { name: "black", code: "#000000" },
  { name: "blue", code: "#0a0161ff" },
  { name: "lagoon", code: "#33ffdd" },
  { name: "pink", code: "#ee33ff" },
] as const;

export type TTeamColor = (typeof teamColors)[number];
export type TTeamColorName = (typeof teamColors)[number]["name"];

export type TDefaultTeamColor = {
  team1: TTeamColorName;
  team2: TTeamColorName;
};
export const defaultTeamColor: TDefaultTeamColor = {
  team1: "white",
  team2: "black",
};
