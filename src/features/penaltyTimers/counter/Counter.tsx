import "./counter.less";
import { Button } from "@components/buttons/Button";
import { useTimeContext } from "@components/globalTimeAction/time";
import { PENALTY_TIME } from "@constants/penalties";
import { JammersCounterData } from "./jammersCounter/JammersCounterData";
import { BlockerCounterData } from "./blockerCounter/BlockerCounterData";
import Timer from "@components/timer/Timer";
import { useMobileScreen } from "@utils/useMobileScreen";
import StarBadge from "@components/badge/StarBadge";

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

  const onClickStartPauseButton = () => {
    return data.count > 0
      ? data.isCounterPaused
        ? data.onStartTime()
        : data.onPauseTime()
      : data.onStartTime();
  };

  const getButtonLabel = () => {
    if (data.count === 0) return "start";
    if (data.isCounterPaused) {
      const isJammerToRelease =
        type === "jammer" &&
        jammerId &&
        (data as { isJammerDone?: boolean }).isJammerDone;

      return isJammerToRelease ? "release" : "resume";
    }
    return "pause";
  };

  const counterClassName =
    jammerId === "jammer1" ? `counter counter-${jammerId}` : "counter";

  return (
    <div className={counterClassName}>
      {!isMobileScreen && <span id="counter-type">{type}</span>}

      <div id="timer-wrapper" className="timer-wrapper">
        {jammerId && <StarBadge jammerId={jammerId} />}
        <Timer count={data.count} />
      </div>
      <div className="counter-actions">
        <Button
          disabled={data.count === 0 || data.isCounterPaused}
          onClick={() => data.onReset()}
        >
          reset
        </Button>
        <Button
          disabled={data.count === 0 && !isTimePaused}
          onClick={() => data.onAddTime()}
        >
          {`+${PENALTY_TIME}`}
        </Button>
        <Button
          style="primary"
          size="large"
          active={data.count !== 0 && !isTimePaused}
          paused={data.isCounterPaused && !isTimePaused}
          disabled={isTimePaused ?? false}
          onClick={() => onClickStartPauseButton()}
        >
          {getButtonLabel()}
        </Button>
      </div>
    </div>
  );
};

export default Counter;
