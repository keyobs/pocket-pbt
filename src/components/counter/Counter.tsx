import { useEffect, useState } from "react";
import "./counter.less";
import { useTimeContext } from "../allCountersActions/useTimeContext";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { isTimePaused } = useTimeContext();

  useEffect(() => {
    if (count > 0 && !isPaused && !isTimePaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isPaused, isTimePaused]);

  const onReset = () => {
    setCount(0);
    setIsPaused(false);
  };

  return (
    <div className="counter">
      <div className="time">{count}</div>

      <button disabled={count !== 0} onClick={() => setCount(30)}>
        start
      </button>
      <button disabled={count === 0} onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? "resume" : "pause"}
      </button>
      <button disabled={count === 0} onClick={() => onReset()}>
        reset
      </button>
    </div>
  );
};

export default Counter;
