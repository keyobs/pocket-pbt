import { View, StyleSheet } from "react-native";
import { TTeamColor } from "@pocket/core/constants/defaultColorsSet";
import { TAppSettings } from "@pocket/core/settings/SettingsConfig";
import Counter from "./Counter";

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
    <View style={[styles.teamWrapper, { backgroundColor: teamColor.code }]}>
      {!isBlockerOnly && (
        <Counter type="jammer" jammerId={`jammer${teamId}`} />
      )}
      {!isJammerOnly &&
        Array.from({ length: 2 }).map((_, index) => (
          <Counter key={index} type="blocker" />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  teamWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 12,
    padding: 8,
  },
});
