import { StyleSheet, Text, View } from "react-native";

interface ITimer {
  count: number;
  isPaused: boolean;
}

// Simplified vs. web's animated SVG progress ring: a plain border whose
// color signals urgency (orange under 10s), dimmed while paused.
const Timer = ({ count, isPaused }: ITimer) => {
  const borderColor = count <= 10 ? "#ff7a00" : "#2a86fb";

  return (
    <View
      style={[
        styles.timer,
        { borderColor: count !== 0 ? borderColor : "transparent" },
        isPaused && styles.paused,
      ]}
    >
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    width: 84,
    height: 84,
    borderRadius: 12,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  paused: {
    opacity: 0.5,
  },
  count: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
});

export default Timer;
