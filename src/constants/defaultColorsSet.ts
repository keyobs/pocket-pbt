export const defaultColorsSet = [
  { name: "white", code: "#FFFFFF" },
  { name: "black", code: "#000000" },
  { name: "blue", code: "#4836f9" },
  { name: "lagoon", code: "#33ffdd" },
  { name: "pink", code: "#ee33ff" },
];

export type TTeamColor = { name: string; code: string };
export type TTeamColorName = string;

export type TDefaultTeamColor = {
  team1: TTeamColorName;
  team2: TTeamColorName;
};
export const defaultTeamColor: TDefaultTeamColor = {
  team1: "white",
  team2: "black",
};
