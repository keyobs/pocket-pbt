import { ReactNode, useState } from "react";
import { TimeContext } from "./useTimeContext";
import { TimeDispatchContext } from "./useTimeDispatchContext";

const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [isTimePaused, setisTimePaused] = useState<boolean | null>(false);

  const onPauseTime = (): void => {
    setisTimePaused(!isTimePaused);
  };

  return (
    <TimeContext.Provider value={{ isTimePaused }}>
      <TimeDispatchContext.Provider value={{ onPauseTime }}>
        {children}
      </TimeDispatchContext.Provider>
    </TimeContext.Provider>
  );
};

export default TimeProvider;
