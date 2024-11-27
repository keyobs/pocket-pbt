import { useEffect, useState } from "react";
import "./counter.less";
import { useTimeContext } from "../allCountersActions/useTimeContext";

const Counter = () => {
  const [wasCountStarted, setWasCountStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { isTimePaused } = useTimeContext();

  useEffect(() => {
    if (count > 0 && !isPaused && !isTimePaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isPaused, isTimePaused]);

  useEffect(() => {
    if (count > 0 && !wasCountStarted) setWasCountStarted(true);
    else if (count === 0 && wasCountStarted) setWasCountStarted(false);
  }, [count, wasCountStarted]);

  const onReset = () => {
    setCount(0);
    setIsPaused(false);
  };

  const onAddTime = () => {
    setCount(count + 30);
  };

  const startButtonLabel = wasCountStarted
    ? isPaused
      ? "resume"
      : "pause"
    : "start";

  const onStartButtonClick = () =>
    wasCountStarted ? setIsPaused(!isPaused) : setCount(30);

  return (
    <div className="counter">
      <div className="time">{count}</div>

      <button disabled={isTimePaused!} onClick={() => onStartButtonClick()}>
        {startButtonLabel}
      </button>
      <button disabled={count === 0 || !isPaused} onClick={() => onReset()}>
        reset
      </button>
      <button
        disabled={count === 0 && !isTimePaused}
        onClick={() => onAddTime()}
      >
        +30
      </button>
    </div>
  );
};

export default Counter;
