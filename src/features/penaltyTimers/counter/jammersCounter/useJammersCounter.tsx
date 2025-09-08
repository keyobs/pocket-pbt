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

  type JammersTimeType = {
    [K in TJammerCounter]: { count: number; round: number };
  };

  const [jammersTime, setJammersTime] = useState<JammersTimeType>({
    jammer1: {
      count: 0,
      round: 0,
    },
    jammer2: {
      count: 0,
      round: 0,
    },
  });

  const wasJammerCountStarted = useCallback(
    (jammerId: TJammerCounter) => jammersTime[jammerId].count > 0,
    [jammersTime]
  );

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
        setAreCountersPaused((prev) => ({
          ...prev,
          [jammerId]: false,
        }));
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [jammersTime, areCountersPaused, isTimePaused, wasJammerCountStarted]);

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
            round: prev[jammerId].round + 1,
          },
        }));
      }
    },
    [wasJammerCountStarted]
  );

  const onStartWhenOtherJammerIsRunning = useCallback(
    (
      otherJammerId: TJammerCounter,
      otherJammerCount: number,
      penalizedJammerId: TJammerCounter
    ) => {
      if (otherJammerCount > PENALTY_TIME) {
        setJammersTime((prev) => ({
          ...prev,
          [penalizedJammerId]: { ...prev[penalizedJammerId], count: 0 },
          [otherJammerId]: { ...prev[otherJammerId], count: PENALTY_TIME },
        }));
      } else {
        setJammersTime((prev) => ({
          ...prev,
          [penalizedJammerId]: {
            ...prev[penalizedJammerId],
            count: PENALTY_TIME - otherJammerCount,
          },
          [otherJammerId]: { ...prev[otherJammerId], count: 0 },
        }));
      }
    },
    []
  );

  const onStartJammerTime = useCallback(
    (jammerId: TJammerCounter) => {
      const otherJammerId: TJammerCounter =
        jammerId === "jammer1" ? "jammer2" : "jammer1";
      const otherJammerCount = jammersTime[otherJammerId].count;
      const newPenalizedJammerId = jammerId;

      if (otherJammerCount > 0) {
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

  const onPauseJammerTime = useCallback((jammerId: TJammerCounter) => {
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: true,
    }));
  }, []);

  const onReset = useCallback((jammerId: TJammerCounter) => {
    setJammersTime((prev) => ({
      ...prev,
      [jammerId]: { count: 0, round: 0 },
    }));
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: false,
    }));
  }, []);

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
    onReset,
    onAddTime,
    wasCountStarted: wasJammerCountStarted,
    onStartTime: onStartJammerTime,
    onPauseTime: onPauseJammerTime,
  };
};

export default useJammersCounter;
