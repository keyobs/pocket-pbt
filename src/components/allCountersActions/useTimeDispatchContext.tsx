import { createContext, useContext } from "react";

type TimeDispatchContextType = {
  onPauseTime: () => void;
};

export const TimeDispatchContext =
  createContext<TimeDispatchContextType | null>(null);

export function useTimeDispatchContext() {
  const context = useContext(TimeDispatchContext);
  if (!context) {
    throw new Error("can't find TimeDispatchProvider");
  }
  return context;
}
