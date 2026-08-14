import { useCallback, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTimeContext } from "@pocket/core/time";
import { PENALTY_TIME } from "@pocket/core/constants/penalties";
import { JammersCounterData } from "@pocket/core/penaltyTimers/counter/jammersCounter/JammersCounterData";
import { BlockerCounterData } from "@pocket/core/penaltyTimers/counter/blockerCounter/BlockerCounterData";
import { Button } from "../../components/Button";
import Timer from "../../components/Timer";
import StarBadge from "../../components/StarBadge";

export interface ICounter {
  type: "jammer" | "blocker";
  jammerId?: "jammer1" | "jammer2";
}

const Counter = ({ type, jammerId }: ICounter) => {
  const { isTimePaused } = useTimeContext();

  const data =
    type === "jammer" && jammerId
      ? JammersCounterData(jammerId)
      : BlockerCounterData();

  const onClickStartPauseButton = useCallback(() => {
    return data.count > 0
      ? data.isCounterPaused
        ? data.onStartTime()
        : data.onPauseTime()
      : data.onStartTime();
  }, [data]);

  const isJammerToRelease =
    type === "jammer"
      ? jammerId && (data as { isJammerDone?: boolean }).isJammerDone
      : null;

  type TStartPauseButton = {
    style: "default" | "primary" | "secondary" | "go";
    label: string;
    onPress: () => void;
  };
  const startPauseButton: TStartPauseButton = useMemo(() => {
    if (data.count === 0) {
      return {
        style: "primary",
        label: "start",
        onPress: onClickStartPauseButton,
      };
    }
    if (data.isCounterPaused) {
      return isJammerToRelease
        ? { style: "go", label: "release", onPress: data.onReset }
        : {
            style: "primary",
            label: "resume",
            onPress: onClickStartPauseButton,
          };
    }
    return {
      style: "primary",
      label: "pause",
      onPress: onClickStartPauseButton,
    };
  }, [
    data.count,
    data.isCounterPaused,
    isJammerToRelease,
    onClickStartPauseButton,
    data.onReset,
  ]);

  return (
    <View style={styles.counter}>
      <Text style={styles.type}>{type}</Text>
      <View style={styles.timerWrapper}>
        {jammerId && <StarBadge jammerId={jammerId} />}
        <Timer count={data.count} isPaused={isTimePaused === true} />
      </View>
      <View style={styles.actions}>
        <Button
          disabled={data.count === 0 || data.isCounterPaused}
          onPress={() => data.onReset()}
        >
          reset
        </Button>
        <Button
          disabled={data.count === 0 && !isTimePaused}
          onPress={() => data.onAddTime()}
        >
          {`+${PENALTY_TIME}`}
        </Button>
        <Button
          style={startPauseButton.style}
          active={data.count !== 0 && !isTimePaused}
          paused={data.isCounterPaused && !isTimePaused}
          disabled={isTimePaused ?? false}
          onPress={startPauseButton.onPress}
        >
          {startPauseButton.label}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  type: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 12,
    opacity: 0.7,
  },
  timerWrapper: {
    position: "relative",
  },
  actions: {
    flexDirection: "row",
    gap: 6,
  },
});

export default Counter;
