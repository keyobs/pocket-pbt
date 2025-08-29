import { createContext, useContext } from "react";
import useJammersCounter from "./useJammersCounter";

type JammerContextType = ReturnType<typeof useJammersCounter>;

const JammersCounterContext = createContext<JammerContextType | null>(null);

export const JammersCounterProvider = ({ children }) => {
  const value = useJammersCounter();
  return (
    <JammersCounterContext.Provider value={value}>
      {children}
    </JammersCounterContext.Provider>
  );
};

export function useJammersCounterContext() {
  const context = useContext(JammersCounterContext);
  if (!context) {
    throw new Error(
      "useJammersCounterContext must be used inside JammerCountersProvider"
    );
  }
  return context;
}
