import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  const KEY = "test-key";
  const DEFAULT_VALUE = { jam: "Alice" };

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns default value when nothing is in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));
    expect(result.current.storedData).toEqual(DEFAULT_VALUE);
  });

  it("reads and parses value from localStorage", () => {
    localStorage.setItem(KEY, JSON.stringify({ jam: "Start" }));

    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));
    expect(result.current.storedData).toEqual({ jam: "Start" });
  });

  it("updates storedData and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    act(() => {
      result.current.updateStoredData({ jam: "is on" });
    });

    expect(result.current.storedData).toEqual({ jam: "is on" });
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify({ jam: "is on" }));
  });

  it("removes data and resets to default", () => {
    localStorage.setItem(KEY, JSON.stringify({ jam: "call off" }));

    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    act(() => {
      result.current.removeStoredData();
    });

    expect(result.current.storedData).toEqual(DEFAULT_VALUE);
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it("handles invalid JSON gracefully", () => {
    localStorage.setItem(KEY, "{bad json}");

    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    expect(result.current.storedData).toEqual(DEFAULT_VALUE);
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(`Error reading localStorage "${KEY}"`),
      expect.any(Error)
    );
  });

  it("handles localStorage.setItem errors gracefully", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("write error");
      });

    act(() => {
      result.current.updateStoredData({ jam: "fail" });
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`Error setting localStorage "${KEY}"`),
      expect.any(Error)
    );

    spy.mockRestore();
  });

  it("handles localStorage.removeItem errors gracefully", () => {
    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    const spy = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementation(() => {
        throw new Error("remove error");
      });

    act(() => {
      result.current.removeStoredData();
    });

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(`Error removing localStorage "${KEY}"`),
      expect.any(Error)
    );

    spy.mockRestore();
  });
});
