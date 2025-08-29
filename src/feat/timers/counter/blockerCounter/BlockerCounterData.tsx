import useCounter from "./useBlockerCounter";

export const BlockerCounterData = () => {
  const data = useCounter();
  return data;
};
