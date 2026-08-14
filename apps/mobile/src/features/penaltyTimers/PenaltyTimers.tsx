import { View, StyleSheet } from "react-native";
import { useSettingsState } from "@pocket/core/settings/context/SettingsMenuContext";
import { useTeamsColorContextState } from "@pocket/core/teamsColor/context/TeamsColorContext";
import { JammersCounterProvider } from "@pocket/core/penaltyTimers/counter/jammersCounter/jammersContext";
import { TeamCounters } from "./TeamCounters";

export const PenaltyTimers = () => {
  const appSettings = useSettingsState();
  const { team1Color, team2Color } = useTeamsColorContextState();

  const isOneTeamOnly = appSettings.timeOnlyOneTeam;

  return (
    <JammersCounterProvider>
      <View style={styles.penaltyTimers}>
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
      </View>
    </JammersCounterProvider>
  );
};

const styles = StyleSheet.create({
  penaltyTimers: {
    flex: 1,
    gap: 8,
    padding: 8,
  },
});
