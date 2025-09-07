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

  const [jammersCounts, setJammersCounts] = useState<{ [key: string]: number }>(
    {
      jammer1: 0,
      jammer2: 0,
    }
  );

  const wasJammerCountStarted = useCallback(
    (jammerId: TJammerCounter) => jammersCounts[jammerId] > 0,
    [jammersCounts]
  );

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (const jammerId of Object.keys(jammersCounts) as TJammerCounter[]) {
      if (
        jammersCounts[jammerId] > 0 &&
        !areCountersPaused[jammerId] &&
        !isTimePaused
      ) {
        const counting = setTimeout(() => {
          setJammersCounts((prev) => ({
            ...prev,
            [jammerId]: prev[jammerId] - 1,
          }));
        }, 1000);
        timers.push(counting);
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [jammersCounts, areCountersPaused, isTimePaused]);

  useEffect(() => {
    (Object.keys(jammersCounts) as TJammerCounter[]).forEach((jammerId) => {
      if (wasJammerCountStarted(jammerId) && jammersCounts[jammerId] === 0) {
        setAreCountersPaused((prev) => ({
          ...prev,
          [jammerId]: false,
        }));
      }
    });
  }, [jammersCounts]);

  const onStart = useCallback(
    (jammerId: TJammerCounter) => {
      return wasJammerCountStarted(jammerId)
        ? setAreCountersPaused((prev) => ({
            ...prev,
            [jammerId]: false,
          }))
        : setJammersCounts((prev) => ({
            ...prev,
            [jammerId]: PENALTY_TIME,
          }));
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
        return setJammersCounts((prev) => ({
          ...prev,
          [penalizedJammerId]: 0,
          [otherJammerId]: PENALTY_TIME,
        }));
      } else {
        setJammersCounts((prev) => ({
          ...prev,
          [penalizedJammerId]: PENALTY_TIME - otherJammerCount,
          [otherJammerId]: 0,
        }));
      }
    },
    []
  );

  const onStartJammerTime = useCallback(
    (jammerId: TJammerCounter) => {
      const otherJammerId: TJammerCounter =
        jammerId === "jammer1" ? "jammer2" : "jammer1";
      const otherJammerCount = jammersCounts[otherJammerId];
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
    [jammersCounts, onStart, onStartWhenOtherJammerIsRunning]
  );

  const onPauseJammerTime = useCallback((jammerId: TJammerCounter) => {
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: true,
    }));
  }, []);

  const onReset = useCallback((jammerId: TJammerCounter) => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: 0,
    }));
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: false,
    }));
  }, []);

  const onAddTime = useCallback((jammerId: TJammerCounter) => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: prev[jammerId] + PENALTY_TIME,
    }));
  }, []);

  return {
    counts: jammersCounts,
    areCountersPaused: areCountersPaused,
    onReset,
    onAddTime,
    wasCountStarted: wasJammerCountStarted,
    onStartTime: onStartJammerTime,
    onPauseTime: onPauseJammerTime,
  };
};

export default useJammersCounter;
