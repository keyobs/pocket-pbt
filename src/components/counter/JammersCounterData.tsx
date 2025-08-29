import { useJammersCounterContext } from "../jammersCounter/jammersContext";
import { TJammerCounter } from "../jammersCounter/useJammersCounter";

export const JammersCounterData = (jammerId: TJammerCounter) => {
  const jammers = useJammersCounterContext();
  return {
    count: jammers.counts[jammerId],
    isCounterPaused: jammers.areCountersPaused[jammerId],
    onStartTime: () => jammers.onStartTime(jammerId),
    onPauseTime: () => jammers.onPauseTime(jammerId),
    onReset: () => jammers.onReset(jammerId),
    onAddTime: () => jammers.onAddTime(jammerId),
  };
};
