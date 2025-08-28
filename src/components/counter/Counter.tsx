import "./counter.less";
import { Button } from "../buttons/Button";
import { useTimeContext } from "../allCountersActions/useTimeContext";
import useCounter from "./useCounter";

export interface ICounter {
  type: "jammer" | "blocker";
  jammerId?: "jammer1" | "jammer2";
}

const Counter = ({ type }: ICounter) => {
  const { isTimePaused } = useTimeContext();

  const { count, isCounterPaused, onReset, onAddTime, onStartTime } =
    useCounter();

  const startButtonLabel =
    count === 0 ? "start" : isCounterPaused ? "resume" : "pause";

  return (
    <div className="counter">
      <div className="timer-container">
        <span>{type}</span>
        <div className="timer">{count}</div>
      </div>
      <div className="counter-actions">
        <Button
          disabled={count === 0 || !isCounterPaused}
          onClick={() => onReset()}
        >
          reset
        </Button>
        <Button
          disabled={count === 0 && !isTimePaused}
          onClick={() => onAddTime()}
        >
          +30
        </Button>
        <Button
          style="primary"
          size="large"
          active={count !== 0 && !isTimePaused}
          paused={isCounterPaused && !isTimePaused}
          disabled={isTimePaused ?? false}
          onClick={() => onStartTime()}
        >
          {startButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Counter;
