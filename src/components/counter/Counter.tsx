import "./counter.less";
import { Button } from "../buttons/Button";
import { useTimeContext } from "../allCountersActions/useTimeContext";
import useCounter from "./useCounter";
import { TJammerCounter } from "../jammersCounter/useJammersCounter";
import { useJammersCounterContext } from "../jammersCounter/jammersContext";
export interface ICounter {
  type: "jammer" | "blocker";
  jammerId?: "jammer1" | "jammer2";
}

const JammersCounter = (jammerId: TJammerCounter) => {
  const jammers = useJammersCounterContext();
  return {
    count: jammers.counts[jammerId],
    isCounterPaused: jammers.areCountersPaused[jammerId],
    onStartTime: () => jammers.onStartTime(jammerId),
    onPauseTime: () => jammers.onPauseTime(jammerId),
    onReset: () => jammers.onReset(jammerId),
    onAddTime: () => jammers.onAddTime(jammerId),
  };
};

const BlockerCounter = () => {
  const data = useCounter();
  return data;
};

const Counter = (props: ICounter) => {
  const { type, jammerId } = props;
  const { isTimePaused } = useTimeContext();

  const data =
    type === "jammer" && jammerId ? JammersCounter(jammerId) : BlockerCounter();

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
    <div className="counter">
      <div className="timer-container">
        <span>{type}</span>
        <div className="timer">{data.count}</div>
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
          +30
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
