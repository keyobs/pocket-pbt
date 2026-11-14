import { createContext, useContext } from "react";

type TimeContextType = {
  isTimePaused: boolean | null;
  onPauseTime: () => void;
};

export const TimeContext = createContext<TimeContextType | null>(null);

export function useTimeContext() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTimeContext must be used within a TimeProvider");
  }
  return context;
}

export function useTimeState() {
  return useTimeContext().isTimePaused;
}

export function useTimeDispatch() {
  return useTimeContext().onPauseTime;
}
