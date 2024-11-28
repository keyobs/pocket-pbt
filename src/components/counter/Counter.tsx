import { useEffect, useState } from "react";
import "./counter.less";
import { useTimeContext } from "../allCountersActions/useTimeContext";
import { Button } from "../buttons/Button";

const Counter = () => {
  const [wasCountStarted, setWasCountStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [isCounterPaused, setIsCounterPaused] = useState(false);

  const { isTimePaused } = useTimeContext();

  useEffect(() => {
    if (count > 0 && !isCounterPaused && !isTimePaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isCounterPaused, isTimePaused]);

  useEffect(() => {
    if (wasCountStarted) setIsCounterPaused(isTimePaused ?? false);

    if (count > 0) {
      if (!wasCountStarted) setWasCountStarted(true);
    } else if (count === 0 && wasCountStarted) {
      setWasCountStarted(false);
    }
  }, [count, wasCountStarted, isTimePaused]);

  const onReset = () => {
    setCount(0);
    setIsCounterPaused(false);
  };

  const onAddTime = () => {
    setCount(count + 30);
  };

  const startButtonLabel = wasCountStarted
    ? isTimePaused
      ? "..."
      : isCounterPaused
      ? "resume"
      : "pause"
    : "start";

  const onStartButtonClick = () =>
    wasCountStarted ? setIsCounterPaused(!isCounterPaused) : setCount(30);

  return (
    <div className="counter">
      <div className="time">{count}</div>
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
