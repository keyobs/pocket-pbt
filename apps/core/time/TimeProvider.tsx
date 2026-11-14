import { useState } from "react";
import { TimeContext } from "./TimeContext";

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [isTimePaused, setIsTimePaused] = useState<boolean | null>(null);

  const onPauseTime = () => setIsTimePaused((prev) => !prev);

  return (
    <TimeContext.Provider value={{ isTimePaused, onPauseTime }}>
      {children}
    </TimeContext.Provider>
  );
}
