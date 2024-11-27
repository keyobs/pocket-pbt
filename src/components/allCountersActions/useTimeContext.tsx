import { createContext, useContext } from "react";

type TimeContextType = {
  isTimePaused: boolean | null;
};
export const TimeContext = createContext<TimeContextType | null>(null);

export function useTimeContext() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("can't find TimeProvider");
  }
  return context;
}
