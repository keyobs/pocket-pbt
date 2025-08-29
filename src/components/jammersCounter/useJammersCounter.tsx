import { useState, useEffect } from "react";
import { useTimeContext } from "../allCountersActions/useTimeContext";
import { PENALTY_TIME } from "../../constants/penalties";

export type TJammerCounter = "jammer1" | "jammer2";

const useJammersCounter = () => {
  const { isTimePaused } = useTimeContext();
  const wasJammerCountStarted = (jammerId: TJammerCounter) =>
    jammersCounts[jammerId] > 0;

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

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    (Object.keys(jammersCounts) as TJammerCounter[]).forEach((jammerId) => {
      if (
        jammersCounts[jammerId] > 0 &&
        !areCountersPaused[jammerId] &&
        !isTimePaused
      ) {
        const t = setTimeout(() => {
          setJammersCounts((prev) => ({
            ...prev,
            [jammerId]: prev[jammerId] - 1,
          }));
        }, 1000);
        timers.push(t);
      }
    });

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

  const onStartJammerTime = (jammerId: TJammerCounter) => {
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
  };

  const onStart = (jammerId: TJammerCounter) => {
    return wasJammerCountStarted(jammerId)
      ? setAreCountersPaused((prev) => ({
          ...prev,
          [jammerId]: false,
        }))
      : setJammersCounts((prev) => ({
          ...prev,
          [jammerId]: PENALTY_TIME,
        }));
  };

  const onStartWhenOtherJammerIsRunning = (
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
  };

  const onPauseJammerTime = (jammerId: TJammerCounter) => {
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: true,
    }));
  };

  const onReset = (jammerId: TJammerCounter) => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: 0,
    }));
    setAreCountersPaused((prev) => ({
      ...prev,
      [jammerId]: false,
    }));
  };

  const onAddTime = (jammerId: TJammerCounter) => {
    setJammersCounts((prev) => ({
      ...prev,
      [jammerId]: prev[jammerId] + PENALTY_TIME,
    }));
  };

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
