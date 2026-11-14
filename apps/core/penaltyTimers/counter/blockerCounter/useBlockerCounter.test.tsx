import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { TimeProvider, useTimeDispatch } from "../../../time";
import useBlockerCounter from "./useBlockerCounter";
import { PENALTY_TIME } from "../../../constants/penalties";

const wrapper = ({ children }: { children: ReactNode }) => (
  <TimeProvider>{children}</TimeProvider>
);

describe("useBlockerCounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts at rest", () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    expect(result.current.count).toBe(0);
    expect(result.current.isCounterPaused).toBe(false);
  });

  it("starts the countdown from PENALTY_TIME", () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    act(() => {
      result.current.onStartTime();
    });

    expect(result.current.count).toBe(PENALTY_TIME);
  });

  it("counts down every second down to zero", async () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    act(() => {
      result.current.onStartTime();
    });
    // recursive setTimeout: each tick reschedules the next one via a
    // re-render, so we step one second at a time to let React settle
    // in between rather than jumping the fake clock in one go.
    for (let i = 0; i < PENALTY_TIME; i += 1) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });
    }

    expect(result.current.count).toBe(0);
    expect(result.current.isCounterPaused).toBe(false);
  });

  it("pauses and resumes the countdown", () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    act(() => {
      result.current.onStartTime();
    });
    act(() => {
      result.current.onPauseTime();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.count).toBe(PENALTY_TIME);

    act(() => {
      result.current.onStartTime();
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.count).toBe(PENALTY_TIME - 1);
  });

  it("resets back to rest", () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    act(() => {
      result.current.onStartTime();
    });
    act(() => {
      result.current.onReset();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isCounterPaused).toBe(false);
  });

  it("adds PENALTY_TIME to the running count", () => {
    const { result } = renderHook(() => useBlockerCounter(), { wrapper });

    act(() => {
      result.current.onStartTime();
    });
    act(() => {
      result.current.onAddTime();
    });

    expect(result.current.count).toBe(PENALTY_TIME * 2);
  });

  it("stops counting down while the global time is paused", () => {
    const useCombined = () => ({
      onPauseAllTime: useTimeDispatch(),
      counter: useBlockerCounter(),
    });

    const { result } = renderHook(() => useCombined(), { wrapper });

    act(() => {
      result.current.counter.onStartTime();
    });
    act(() => {
      result.current.onPauseAllTime();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.counter.count).toBe(PENALTY_TIME);
  });
});
