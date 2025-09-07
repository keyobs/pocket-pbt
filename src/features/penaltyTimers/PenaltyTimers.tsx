import "./penaltyTimers.less";

import { useSettingsState } from "@features/menu/context/SettingsMenuContext";
import { useTeamsColorContextState } from "@features/teamsColor/context";
import { JammersCounterProvider } from "./counter/jammersCounter/jammersContext";
import { TeamCounters } from "./TeamCounters";

const PenaltyTimers = () => {
  const appSettings = useSettingsState();
  const { team1Color, team2Color } = useTeamsColorContextState();

  const isOneTeamOnly = appSettings.timeOnlyOneTeam;

  return (
    <JammersCounterProvider>
      <div className="penalty-timers">
        <TeamCounters
          teamId={1}
          teamColor={team1Color}
          appSettings={appSettings}
        />
        {!isOneTeamOnly && (
          <TeamCounters
            teamId={2}
            teamColor={team2Color}
            appSettings={appSettings}
          />
        )}
      </div>
    </JammersCounterProvider>
  );
};

export default PenaltyTimers;
