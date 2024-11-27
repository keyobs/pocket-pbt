import { useEffect, useState } from "react";
import "./counter.less";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (count > 0 && !isPaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isPaused]);

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
