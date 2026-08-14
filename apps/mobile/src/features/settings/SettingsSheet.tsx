import { StyleSheet, Switch, Text, View } from "react-native";
import {
  useSettingsState,
  useSettingsDispatch,
} from "@pocket/core/settings/context/SettingsMenuContext";
import { settingsConfig } from "@pocket/core/settings/SettingsConfig";

export const SettingsSheet = () => {
  const appSettings = useSettingsState();
  const handleToggle = useSettingsDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {settingsConfig.map((setting) => (
        <View key={setting.key} style={styles.row}>
          <Text style={styles.label}>{setting.label}</Text>
          <Switch
            value={appSettings[setting.key]}
            onValueChange={() => handleToggle(setting.key)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 16 },
});
