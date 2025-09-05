import { ReactNode } from "react";
import { JammersCounterContext } from "./JammersCounterContext";
import useJammersCounter from "../useJammersCounter";

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
