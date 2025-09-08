import { useState, useEffect, useCallback } from "react";
import { useTimeContext } from "@components/allCountersActions/time";
import { PENALTY_TIME } from "@constants/penalties";

export type TJammerCounter = "jammer1" | "jammer2";

const useJammersCounter = () => {
  const { isTimePaused } = useTimeContext();

  const [areCountersPaused, setAreCountersPaused] = useState({
    jammer1: false,
    jammer2: false,
  });

  const [isJammerDone, setIsJammerDone] = useState({
    jammer1: true,
    jammer2: true,
  });

  type JammersTimeType = {
    [K in TJammerCounter]: { count: number; position: number };
  };

  const [jammersTime, setJammersTime] = useState<JammersTimeType>({
    jammer1: {
      count: 0,
      position: 0,
    },
    jammer2: {
      count: 0,
      position: 0,
    },
  });

  const wasJammerCountStarted = useCallback(
    (jammerId: TJammerCounter) => jammersTime[jammerId].count > 0,
    [jammersTime]
  );

  const onStart = useCallback(
    (jammerId: TJammerCounter) => {
      if (wasJammerCountStarted(jammerId)) {
        setAreCountersPaused((prev) => ({
          ...prev,
          [jammerId]: false,
        }));
      } else {
        setJammersTime((prev) => ({
          ...prev,
          [jammerId]: {
            ...prev[jammerId],
            count: PENALTY_TIME,
            position: 1,
          },
        }));
      }
    },
    [wasJammerCountStarted]
  );

  const onPauseJammerTime = useCallback((jammerId: TJammerCounter) => {
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: true,
    }));
  }, []);

  const onReset = useCallback((jammerId: TJammerCounter) => {
    setJammersTime((prev) => ({
      ...prev,
      [jammerId]: { count: 0, position: 0 },
    }));
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: false,
    }));
    setIsJammerDone((prev) => ({ ...prev, [jammerId]: false }));
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (const jammerId of Object.keys(jammersTime) as TJammerCounter[]) {
      if (
        jammersTime[jammerId].count > 0 &&
        !areCountersPaused[jammerId] &&
        !isTimePaused
      ) {
        const counting = setTimeout(() => {
          setJammersTime((prev) => ({
            ...prev,
            [jammerId]: { ...prev[jammerId], count: prev[jammerId].count - 1 },
          }));
        }, 1000);
        timers.push(counting);
      }

      if (
        wasJammerCountStarted(jammerId) &&
        jammersTime[jammerId].count === 0
      ) {
        onReset(jammerId);
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [
    jammersTime,
    areCountersPaused,
    isTimePaused,
    wasJammerCountStarted,
    onReset,
  ]);

  const onStartWhenOtherJammerIsRunning = useCallback(
    (
      otherJammerId: TJammerCounter,
      otherJammerCount: number,
      penalizedJammerId: TJammerCounter
    ) => {
      if (otherJammerCount > PENALTY_TIME) {
        // penalized jammer is immediatly released, other jammer purges the second penalty
        setIsJammerDone((prev) => ({ ...prev, [penalizedJammerId]: true }));
        setJammersTime((prev) => ({
          ...prev,
          [penalizedJammerId]: { ...prev[penalizedJammerId], count: 0 },
          [otherJammerId]: { ...prev[otherJammerId], count: PENALTY_TIME },
        }));
      } else {
        // penalized jammer purges shorted penalty, other jammer is released
        onPauseJammerTime(otherJammerId);
        setIsJammerDone((prev) => ({ ...prev, [otherJammerId]: true }));
        const timer = setTimeout(() => onReset(otherJammerId), 4000);
        setJammersTime((prev) => ({
          ...prev,
          [penalizedJammerId]: {
            ...prev[penalizedJammerId],
            count: PENALTY_TIME - otherJammerCount,
            position: 2,
          },
        }));

        return () => clearTimeout(timer);
      }
    },
    [onPauseJammerTime, onReset]
  );

  const onStartJammerTime = useCallback(
    (jammerId: TJammerCounter) => {
      const otherJammerId: TJammerCounter =
        jammerId === "jammer1" ? "jammer2" : "jammer1";
      const otherJammerCount = jammersTime[otherJammerId].count;
      const newPenalizedJammerId = jammerId;
      setIsJammerDone((prev) => ({ ...prev, [jammerId]: false }));

      if (otherJammerCount > 0) {
        if (jammersTime[otherJammerId].position === 2) onStart(jammerId);
        else
          onStartWhenOtherJammerIsRunning(
            otherJammerId,
            otherJammerCount,
            newPenalizedJammerId
          );
      } else {
        onStart(jammerId);
      }
    },
    [jammersTime, onStart, onStartWhenOtherJammerIsRunning]
  );

  const onAddTime = useCallback((jammerId: TJammerCounter) => {
    setJammersTime((prev) => ({
      ...prev,
      [jammerId]: {
        ...prev[jammerId],
        count: prev[jammerId].count + PENALTY_TIME,
      },
    }));
  }, []);

  return {
    counts: jammersTime,
    areCountersPaused: areCountersPaused,
    isJammerDone: isJammerDone,
    onStartTime: onStartJammerTime,
    onPauseTime: onPauseJammerTime,
    onReset,
    onAddTime,
  };
};

export default useJammersCounter;
