import { useState, useCallback } from "react";

type AsyncState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};

export function usePromise<Data, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<Data>
) {
  const [state, setState] = useState<AsyncState<Data>>({ loading: false });

  const run = useCallback(
    async (...args: Args): Promise<Data> => {
      setState({ loading: true });
      try {
        const data = await asyncFn(...args);
        setState({ loading: false, data });
        return data;
      } catch (err) {
        setState({ loading: false, error: err as Error });
        throw err;
      }
    },
    [asyncFn]
  );

  return { ...state, run };
}
