import { useContext } from "react";
import { JammersCounterContext } from "./JammersCounterContext";

export function useJammersCounterContext() {
  const context = useContext(JammersCounterContext);
  if (!context) {
    throw new Error(
      "useJammersCounterContext must be used inside JammersCounterProvider"
    );
  }
  return context;
}
