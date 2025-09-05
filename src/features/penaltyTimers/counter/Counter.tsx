import "./counter.less";
import { Button } from "@components/buttons/Button";
import { useTimeContext } from "@components/allCountersActions/time";
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

  const startPauseButtonLabel =
    data.count === 0 ? "start" : data.isCounterPaused ? "resume" : "pause";

  return (
    <div className="counter" id={`counter-${jammerId}`}>
      {!isMobileScreen && <span id="counter-type">{type}</span>}

      <div id="timer-wrapper" className="timer-wrapper">
        {jammerId && isMobileScreen && <StarBadge jammerId={jammerId} />}
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
          {startPauseButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Counter;
