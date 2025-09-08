import { useState, useEffect, useCallback } from "react";
import { useTimeContext } from "@components/allCountersActions/time";
import { PENALTY_TIME } from "@constants/penalties";

export type TJammerCounter = "jammer1" | "jammer2";

type JammerState = {
  count: number;
  position: 0 | 1 | 2;
  isPaused: boolean;
  isDone: boolean;
};

type JammersTimeType = {
  [K in TJammerCounter]: JammerState;
};

const INITIAL_JAMMER_STATE: JammerState = {
  count: 0,
  position: 0,
  isPaused: false,
  isDone: true,
};

const useJammersCounter = () => {
  const { isTimePaused } = useTimeContext();

  const [jammers, setJammers] = useState<JammersTimeType>({
    jammer1: { ...INITIAL_JAMMER_STATE },
    jammer2: { ...INITIAL_JAMMER_STATE },
  });

  const wasJammerCountStarted = useCallback(
    (jammerId: TJammerCounter) => jammers[jammerId].count > 0,
    [jammers]
  );

  const onStart = useCallback(
    (jammerId: TJammerCounter) => {
      if (wasJammerCountStarted(jammerId)) {
        setJammers((prev) => ({
          ...prev,
          [jammerId]: { ...prev[jammerId], isPaused: false, isDone: false },
        }));
      } else {
        setJammers((prev) => ({
          ...prev,
          [jammerId]: {
            ...prev[jammerId],
            count: PENALTY_TIME,
            position: 1,
            isDone: false,
          },
        }));
      }
    },
    [wasJammerCountStarted]
  );

  const onPauseJammerTime = useCallback((jammerId: TJammerCounter) => {
    setJammers((prev) => ({
      ...prev,
      [jammerId]: {
        ...prev[jammerId],
        isPaused: true,
      },
    }));
  }, []);

  const onReset = useCallback((jammerId: TJammerCounter) => {
    setJammers((prev) => ({
      ...prev,
      [jammerId]: { ...INITIAL_JAMMER_STATE },
    }));
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    for (const jammerId of Object.keys(jammers) as TJammerCounter[]) {
      if (
        jammers[jammerId].count > 0 &&
        !jammers[jammerId].isPaused &&
        !isTimePaused
      ) {
        const counting = setTimeout(() => {
          setJammers((prev) => ({
            ...prev,
            [jammerId]: { ...prev[jammerId], count: prev[jammerId].count - 1 },
          }));
        }, 1000);
        timers.push(counting);
      }

      if (wasJammerCountStarted(jammerId) && jammers[jammerId].count === 0) {
        onReset(jammerId);
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [jammers, isTimePaused, wasJammerCountStarted, onReset]);

  const onStartWhenOtherJammerIsRunning = useCallback(
    (
      otherJammerId: TJammerCounter,
      otherJammerCount: number,
      penalizedJammerId: TJammerCounter
    ) => {
      if (otherJammerCount > PENALTY_TIME) {
        // penalized jammer is immediatly released, other jammer purges the second penalty
        setJammers((prev) => ({
          ...prev,
          [otherJammerId]: {
            ...prev[otherJammerId],
            count: PENALTY_TIME,
          },
          [penalizedJammerId]: {
            ...prev[penalizedJammerId],
            count: 0,
            isDone: true,
          },
        }));
      } else {
        // penalized jammer purges shorted penalty, other jammer is released
        onPauseJammerTime(otherJammerId);

        setJammers((prev) => ({
          ...prev,
          [otherJammerId]: {
            ...prev[otherJammerId],
            isDone: true,
          },
          [penalizedJammerId]: {
            ...prev[penalizedJammerId],
            count: PENALTY_TIME - otherJammerCount,
            position: 2,
          },
        }));

        const timer = setTimeout(() => onReset(otherJammerId), 4000);
        return () => clearTimeout(timer);
      }
    },
    [onPauseJammerTime, onReset]
  );

  const onStartJammerTime = useCallback(
    (jammerId: TJammerCounter) => {
      const otherJammerId: TJammerCounter =
        jammerId === "jammer1" ? "jammer2" : "jammer1";
      const otherJammerCount = jammers[otherJammerId].count;
      const newPenalizedJammerId = jammerId;

      setJammers((prev) => ({
        ...prev,
        [jammerId]: {
          ...prev[jammerId],
          isDone: true,
        },
      }));

      if (otherJammerCount > 0) {
        if (jammers[otherJammerId].position === 2) onStart(jammerId);
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
    [jammers, onStart, onStartWhenOtherJammerIsRunning]
  );

  const onAddTime = useCallback((jammerId: TJammerCounter) => {
    setJammers((prev) => ({
      ...prev,
      [jammerId]: {
        ...prev[jammerId],
        count: prev[jammerId].count + PENALTY_TIME,
        isDone: false,
      },
    }));
  }, []);

  return {
    jammers,
    onStartTime: onStartJammerTime,
    onPauseTime: onPauseJammerTime,
    onReset,
    onAddTime,
  };
};

export default useJammersCounter;
