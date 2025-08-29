import { createContext, useContext } from "react";
import useJammersCounter from "./useJammersCounter";

type JammerContextType = ReturnType<typeof useJammersCounter>;

const JammerCountersContext = createContext<JammerContextType | null>(null);

export const JammerCountersProvider = ({ children }) => {
  const value = useJammersCounter();
  return (
    <JammerCountersContext.Provider value={value}>
      {children}
    </JammerCountersContext.Provider>
  );
};

export function useJammerCountersContext() {
  const context = useContext(JammerCountersContext);
  if (!context) {
    throw new Error(
      "useJammerCountersContext must be used inside JammerCountersProvider"
    );
  }
  return context;
}
