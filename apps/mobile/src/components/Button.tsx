import { Pressable, StyleSheet, Text } from "react-native";

interface IButton {
  onPress: () => void;
  active?: boolean;
  disabled?: boolean;
  paused?: boolean;
  style?: "default" | "primary" | "secondary" | "go";
  children: string;
}

export const Button = ({
  onPress,
  active = false,
  disabled = false,
  paused = false,
  style = "default",
  children,
}: IButton) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        styles[style],
        active && styles.active,
        paused && styles.paused,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "600",
  },
  default: {
    backgroundColor: "#3a3a3a",
  },
  primary: {
    backgroundColor: "#2a86fb",
  },
  secondary: {
    backgroundColor: "#5a5a5a",
  },
  go: {
    backgroundColor: "#2ecc71",
  },
  active: {
    opacity: 0.85,
  },
  paused: {
    backgroundColor: "#ff7a00",
  },
  disabled: {
    opacity: 0.4,
  },
});
