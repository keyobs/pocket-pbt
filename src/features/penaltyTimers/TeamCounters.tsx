import "./penaltyTimers.less";

import { TTeamColor } from "@constants/teamColors";
import { TAppSettings } from "@features/menu/SettingsConfig";
import Counter from "./counter/Counter";

type TTeamCounters = {
  teamId: 1 | 2;
  teamColor: TTeamColor;
  appSettings: TAppSettings;
};
export const TeamCounters = ({
  teamId,
  teamColor,
  appSettings,
}: TTeamCounters) => {
  const isJammerOnly = appSettings.jammerTimeOnly;
  const isBlockerOnly = appSettings.blockerTimeOnly;

  return (
    <div
      id={`team-wrapper-${teamId}`}
      className="team-wrapper"
      style={{ backgroundColor: teamColor.code }}
    >
      {!isBlockerOnly && <Counter type="jammer" jammerId={`jammer${teamId}`} />}
      {!isJammerOnly &&
        Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} type="blocker" />
        ))}
    </div>
  );
};
