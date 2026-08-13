import { createContext } from "react";
import useJammersCounter from "../useJammersCounter";

export type JammerContextType = ReturnType<typeof useJammersCounter>;

export const JammersCounterContext = createContext<JammerContextType | null>(
  null
);
