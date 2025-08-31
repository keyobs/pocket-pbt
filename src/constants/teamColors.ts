export const teamColors = [
  { color: "white", code: "#FFFFFF" },
  { color: "black", code: "#000000" },
  { color: "green", code: "#33FF57" },
  { color: "red", code: "#FF5733" },
  { color: "blue", code: "#33C1FF" },
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
