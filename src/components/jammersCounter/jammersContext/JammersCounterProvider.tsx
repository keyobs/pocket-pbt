import { ReactNode } from "react";
import useJammersCounter from "../useJammersCounter";
import { JammersCounterContext } from "./JammersCounterContext";

interface IJammersCounterProvider {
  children: ReactNode;
}

export const JammersCounterProvider = ({
  children,
}: IJammersCounterProvider) => {
  const value = useJammersCounter();
  return (
    <JammersCounterContext.Provider value={value}>
      {children}
    </JammersCounterContext.Provider>
  );
};
