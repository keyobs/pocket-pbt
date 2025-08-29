import { useState, useEffect } from "react";
import { useTimeContext } from "../allCountersActions/useTimeContext";

export type TUseCounter = {
  count: number;
  isCounterPaused: boolean;
  onReset: () => void;
  onAddTime: () => void;
  onStartTime: () => void;
  onPauseTime: () => void;
};

const useCounter = () => {
  const { isTimePaused } = useTimeContext();

  const wasCountStarted = () => count > 0;
  const [count, setCount] = useState(0);
  const [isCounterPaused, setIsCounterPaused] = useState<boolean>(false);

  useEffect(() => {
    if (count > 0 && !isCounterPaused && !isTimePaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isCounterPaused, isTimePaused]);

  useEffect(() => {
    if (wasCountStarted()) {
      if (count === 0) {
        setIsCounterPaused(false);
      }
    }
  }, [count]);

  useEffect(() => {}, [isTimePaused]);

  const onReset = () => {
    setCount(0);
    setIsCounterPaused(false);
  };

  const onStartTime = () =>
    wasCountStarted() ? setIsCounterPaused(false) : setCount(30);

  const onPauseTime = () => setIsCounterPaused(true);

  const onAddTime = () => {
    setCount(count + 30);
  };

  return {
    count,
    isCounterPaused,
    onReset,
    onAddTime,
    onStartTime,
    onPauseTime,
    wasCountStarted,
  };
};

export default useCounter;
