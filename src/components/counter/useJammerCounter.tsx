import { useState, useEffect } from "react";
import { useTimeContext } from "../allCountersActions/useTimeContext";

export type TJammerCounter = "jammer1" | "jammer2";

const useJammerCounter = (jammerId: TJammerCounter) => {
  const { isTimePaused } = useTimeContext();
  const wasJammerCountStarted = () => jammersCounts[jammerId] > 0;

  const [isCounterPaused, setIsCounterPaused] = useState({
    jammer1: false,
    jammer2: false,
  });

  const [jammersCounts, setJammersCounts] = useState<{ [key: string]: number }>(
    {
      jammer1: 0,
      jammer2: 0,
    }
  );

  useEffect(() => {
    if (
      jammersCounts[jammerId] > 0 &&
      !isCounterPaused[jammerId] &&
      !isTimePaused
    ) {
      const timer = setTimeout(() => {
        setJammersCounts((prev) => ({
          ...prev,
          [jammerId]: prev[jammerId] - 1,
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [jammersCounts, jammerId, isCounterPaused, isTimePaused]);

  const onStartJammerTime = () => {
    return onStart();
  };

  const onStart = () => {
    return wasJammerCountStarted()
      ? setIsCounterPaused((prev) => ({
          ...prev,
          [jammerId]: false,
        }))
      : setJammersCounts((prev) => ({
          ...prev,
          [jammerId]: 30,
        }));
  };

  const onPauseJammerTime = () => {
    setIsCounterPaused((prev) => ({
      ...prev,
      [jammerId]: true,
    }));
  };

  const onReset = () => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: 0,
    }));
    setIsCounterPaused((prev) => ({
      ...prev,
      [jammerId]: false,
    }));
  };

  const onAddTime = () => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: prev[jammerId] + 30,
    }));
  };

  return {
    count: jammersCounts[jammerId],
    onStartJammerTime,
    isCounterPaused: isCounterPaused[jammerId],
    onReset,
    onAddTime,
    wasCountStarted: wasJammerCountStarted,
    onStartTime: onStartJammerTime,
    onPauseTime: onPauseJammerTime,
  };
};

export default useJammerCounter;
