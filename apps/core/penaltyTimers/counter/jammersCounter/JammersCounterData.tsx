import { useJammersCounterContext } from "./jammersContext";
import { TJammerCounter } from "./useJammersCounter";

export const JammersCounterData = (jammerId: TJammerCounter) => {
  const data = useJammersCounterContext();

  return {
    count: data.jammers[jammerId].count,
    isCounterPaused: data.jammers[jammerId].isPaused,
    isJammerDone: data.jammers[jammerId].isDone,
    onStartTime: () => data.onStartTime(jammerId),
    onPauseTime: () => data.onPauseTime(jammerId),
    onReset: () => data.onReset(jammerId),
    onAddTime: () => data.onAddTime(jammerId),
  };
};
