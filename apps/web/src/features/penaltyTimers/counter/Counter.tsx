import "./counter.less";
import { Button } from "@components/buttons/Button";
import { useTimeContext } from "@components/globalTimeAction/time";
import { PENALTY_TIME } from "@constants/penalties";
import { JammersCounterData } from "./jammersCounter/JammersCounterData";
import { BlockerCounterData } from "./blockerCounter/BlockerCounterData";
import Timer from "@components/timer/Timer";
import { useMobileScreen } from "@hooks/useMobileScreen";
import StarBadge from "@components/badge/StarBadge";
import { useCallback, useMemo } from "react";

export interface ICounter {
  type: "jammer" | "blocker";
  jammerId?: "jammer1" | "jammer2";
}

const Counter = ({ type, jammerId }: ICounter) => {
  const isMobileScreen = useMobileScreen();
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

  type startPauseButton = {
    style: "default" | "primary" | "secondary" | "go";
    label: string;
    onClick: () => void;
  };
  const startPauseButton: startPauseButton = useMemo(() => {
    if (data.count === 0) {
      return {
        style: "primary",
        label: "start",
        onClick: onClickStartPauseButton,
      };
    }
    if (data.isCounterPaused) {
      return isJammerToRelease
        ? { style: "go", label: "release", onClick: data.onReset }
        : {
            style: "primary",
            label: "resume",
            onClick: onClickStartPauseButton,
          };
    }
    return {
      style: "primary",
      label: "pause",
      onClick: onClickStartPauseButton,
    };
  }, [
    data.count,
    data.isCounterPaused,
    isJammerToRelease,
    onClickStartPauseButton,
    data.onReset,
  ]);

  const counterClassName =
    jammerId === "jammer1" ? `counter counter-${jammerId}` : "counter";

  return (
    <div className={counterClassName}>
      {!isMobileScreen && <span id="counter-type">{type}</span>}

      <div id="timer-wrapper" className="timer-wrapper">
        {jammerId && <StarBadge jammerId={jammerId} />}
        <Timer count={data.count} isPaused={isTimePaused === true} />
      </div>
      <div className="counter-actions">
        <Button
          size="full"
          disabled={data.count === 0 || data.isCounterPaused}
          onClick={() => data.onReset()}
        >
          reset
        </Button>
        <Button
          size="full"
          disabled={data.count === 0 && !isTimePaused}
          onClick={() => data.onAddTime()}
        >
          {`+${PENALTY_TIME}`}
        </Button>
        <Button
          style={startPauseButton.style}
          size="full"
          active={data.count !== 0 && !isTimePaused}
          paused={data.isCounterPaused && !isTimePaused}
          disabled={isTimePaused ?? false}
          onClick={startPauseButton.onClick}
        >
          {startPauseButton.label}
        </Button>
      </div>
    </div>
  );
};

export default Counter;
