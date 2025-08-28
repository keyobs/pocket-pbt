import "./counter.less";
import { Button } from "../buttons/Button";
import { useTimeContext } from "../allCountersActions/useTimeContext";
import useCounter from "./useCounter";

interface ICounter {
  type: "jammer" | "blocker";
}

const Counter = ({ type }: ICounter) => {
  const { count, isCounterPaused, onReset, onAddTime, onStartButtonClick } =
    useCounter();
  const { isTimePaused } = useTimeContext();

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
          onClick={() => onStartButtonClick()}
        >
          {startButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default Counter;
