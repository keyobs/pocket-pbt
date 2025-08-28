import { useState, useEffect } from "react";
import { useTimeContext } from "../allCountersActions/useTimeContext";

export type TUseCounter = {
  count: number;
  isCounterPaused: boolean;
  onReset: () => void;
  onAddTime: () => void;
  onStartButtonClick: () => void;
};

const useCounter = () => {
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

  const onStartButtonClick = () =>
    wasCountStarted ? setIsCounterPaused(!isCounterPaused) : setCount(30);

  return { count, isCounterPaused, onReset, onAddTime, onStartButtonClick };
};

export default useCounter;
