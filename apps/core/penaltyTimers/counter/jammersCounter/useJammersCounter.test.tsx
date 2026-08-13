import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { TimeProvider } from "../../../time";
import useJammersCounter from "./useJammersCounter";
import { PENALTY_TIME } from "../../../constants/penalties";

const wrapper = ({ children }: { children: ReactNode }) => (
  <TimeProvider>{children}</TimeProvider>
);

describe("useJammersCounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts both jammers at rest", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    expect(result.current.jammers.jammer1).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
    expect(result.current.jammers.jammer2).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
  });

  it("starts a jammer's countdown from PENALTY_TIME", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });

    expect(result.current.jammers.jammer1.count).toBe(PENALTY_TIME);
    expect(result.current.jammers.jammer1.isDone).toBe(false);
  });

  it("counts down every second and resets to rest at zero", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.jammers.jammer1.count).toBe(PENALTY_TIME - 1);

    act(() => {
      vi.advanceTimersByTime((PENALTY_TIME - 1) * 1000);
    });
    expect(result.current.jammers.jammer1).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
  });

  it("pauses the countdown and does not tick further", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });
    act(() => {
      result.current.onPauseTime("jammer1");
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.jammers.jammer1.count).toBe(PENALTY_TIME);
    expect(result.current.jammers.jammer1.isPaused).toBe(true);
  });

  it("resets a jammer back to its initial state", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });
    act(() => {
      result.current.onReset("jammer1");
    });

    expect(result.current.jammers.jammer1).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
  });

  it("adds PENALTY_TIME to the running count", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });
    act(() => {
      result.current.onAddTime("jammer1");
    });

    expect(result.current.jammers.jammer1.count).toBe(PENALTY_TIME * 2);
  });

  it("swaps penalties: releases the new jammer immediately when the running one still owes more than PENALTY_TIME", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });
    act(() => {
      result.current.onAddTime("jammer1"); // jammer1 now owes 2 * PENALTY_TIME
    });

    act(() => {
      result.current.onStartTime("jammer2");
    });

    expect(result.current.jammers.jammer1.count).toBe(PENALTY_TIME);
    expect(result.current.jammers.jammer2).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
  });

  it("swaps penalties: transfers the remaining time to the new jammer, then releases the original after 3s", () => {
    const { result } = renderHook(() => useJammersCounter(), { wrapper });

    act(() => {
      result.current.onStartTime("jammer1");
    });
    act(() => {
      vi.advanceTimersByTime(10_000); // jammer1 now has PENALTY_TIME - 10 left
    });

    act(() => {
      result.current.onStartTime("jammer2");
    });

    expect(result.current.jammers.jammer1.isPaused).toBe(true);
    expect(result.current.jammers.jammer1.isDone).toBe(true);
    expect(result.current.jammers.jammer2.count).toBe(10);
    expect(result.current.jammers.jammer2.position).toBe(2);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.jammers.jammer1).toEqual({
      count: 0,
      position: 0,
      isPaused: false,
      isDone: true,
    });
  });
});
