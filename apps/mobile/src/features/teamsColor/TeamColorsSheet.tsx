import { Pressable, StyleSheet, Text, View } from "react-native";
import { TTeamColor } from "@pocket/core/constants/defaultColorsSet";
import { useColorSelector } from "@pocket/core/teamsColor/colorSelector/useColorSelector";

const TeamRow = ({ team, title }: { team: 1 | 2; title: string }) => {
  const { colorsSet, handleColorChange, isColorSelected } = useColorSelector(
    false,
    team
  );

  return (
    <View style={styles.teamRow}>
      <Text style={styles.teamTitle}>{title}</Text>
      <View style={styles.swatches}>
        {colorsSet.map((color: TTeamColor, index: number) => (
          <Pressable
            key={color.name}
            onPress={() => handleColorChange(color, index)}
            style={[
              styles.swatch,
              { backgroundColor: color.code },
              isColorSelected(index, color) && styles.selected,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export const TeamColorsSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams color</Text>
      <TeamRow team={1} title="Team 1" />
      <TeamRow team={2} title="Team 2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  teamRow: { gap: 8 },
  teamTitle: { fontSize: 14, opacity: 0.7 },
  swatches: { flexDirection: "row", gap: 10 },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    borderColor: "#2a86fb",
  },
});
