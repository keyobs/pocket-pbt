import { useState, useEffect } from "react";
import { useTimeContext } from "../../../../components/allCountersActions/useTimeContext";
import { PENALTY_TIME } from "../../../../constants/penalties";

export type TUseCounter = {
  count: number;
  isCounterPaused: boolean;
  onReset: () => void;
  onAddTime: () => void;
  onStartTime: () => void;
  onPauseTime: () => void;
};

const useBlockerCounter = () => {
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
    wasCountStarted() ? setIsCounterPaused(false) : setCount(PENALTY_TIME);

  const onPauseTime = () => setIsCounterPaused(true);

  const onAddTime = () => {
    setCount(count + PENALTY_TIME);
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

export default useBlockerCounter;
