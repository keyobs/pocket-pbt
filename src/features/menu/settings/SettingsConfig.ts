export type TAppSettings = {
  jammerTimeOnly: boolean;
  blockerTimeOnly: boolean;
  timeOnlyOneTeam: boolean;
};

export const settingsConfig: { key: keyof TAppSettings; label: string }[] = [
  {
    key: "jammerTimeOnly",
    label: "Jammer time only",
  },
  {
    key: "blockerTimeOnly",
    label: "Blocker time only",
  },
  {
    key: "timeOnlyOneTeam",
    label: "Time only one team",
  },
];
