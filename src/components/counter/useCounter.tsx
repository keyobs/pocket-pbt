import { useState, useEffect } from "react";
import { useTimeContext } from "../allCountersActions/useTimeContext";

export type TUseCounter = {
  count: number;
  isCounterPaused: boolean;
  onReset: () => void;
  onAddTime: () => void;
  onStartTime: () => void;
};

const useCounter = () => {
  const { isTimePaused } = useTimeContext();

  const wasCountStarted = () => count > 0;
  const [count, setCount] = useState(0);
  const [isCounterPaused, setIsCounterPaused] = useState(false);

  useEffect(() => {
    if (count > 0 && !isCounterPaused && !isTimePaused) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, isCounterPaused, isTimePaused]);

  useEffect(() => {}, [isTimePaused]);

  const onReset = () => {
    setCount(0);
    setIsCounterPaused(false);
  };

  const onAddTime = () => {
    setCount(count + 30);
  };

  const onStartTime = () =>
    wasCountStarted() ? setIsCounterPaused(!isCounterPaused) : setCount(30);

  return { count, isCounterPaused, onReset, onAddTime, onStartTime };
};

export default useCounter;
