import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { TeamColorContext } from "../context/TeamsColorContext";
import { defaultColorsSet } from "../../constants/defaultColorsSet";
import { useColorPicker } from "./useColorPicker";

const [team1Color] = defaultColorsSet;

function makeWrapper(getOnChangeColorInColorsSet: ReturnType<typeof vi.fn>) {
  return ({ children }: { children: ReactNode }) => (
    <TeamColorContext.Provider
      value={{
        colorsSet: defaultColorsSet,
        team1Color,
        team2Color: defaultColorsSet[1],
        onChangeTeam1Color: vi.fn(),
        onChangeTeam2Color: vi.fn(),
        getOnChangeColor: vi.fn(),
        getOnChangeColorInColorsSet,
        resetSetColorsToDefault: vi.fn(),
      }}
    >
      {children}
    </TeamColorContext.Provider>
  );
}

describe("useColorPicker", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("initializes with the colorsSet entry at the given index", () => {
    const { result } = renderHook(() => useColorPicker(0), {
      wrapper: makeWrapper(vi.fn()),
    });

    expect(result.current.color).toBe(team1Color.code);
  });

  it("falls back to a default color when index is null", () => {
    const { result } = renderHook(() => useColorPicker(null), {
      wrapper: makeWrapper(vi.fn()),
    });

    expect(result.current.color).toBe("#ff0000");
  });

  it("updates the local color immediately, then debounces the color-name lookup and commit", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ colors: [{ name: "Sky Blue" }] }),
    });
    const getOnChangeColorInColorsSet = vi.fn();

    const { result } = renderHook(() => useColorPicker(0), {
      wrapper: makeWrapper(getOnChangeColorInColorsSet),
    });

    act(() => {
      result.current.handleSetColorAndUpdate("#87ceeb");
    });

    // local color updates synchronously, before the debounce fires
    expect(result.current.color).toBe("#87ceeb");
    expect(getOnChangeColorInColorsSet).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.color.pizza/v1/?values=87ceeb"
    );
    expect(getOnChangeColorInColorsSet).toHaveBeenCalledWith(0, {
      name: "Sky Blue",
      code: "#87ceeb",
    });
  });

  it("only commits the last color when called several times within the debounce window", async () => {
    mockFetch.mockResolvedValue({
      json: async () => ({ colors: [{ name: "Bright Red" }] }),
    });
    const getOnChangeColorInColorsSet = vi.fn();

    const { result } = renderHook(() => useColorPicker(0), {
      wrapper: makeWrapper(getOnChangeColorInColorsSet),
    });

    act(() => {
      result.current.handleSetColorAndUpdate("#111111");
    });
    act(() => {
      result.current.handleSetColorAndUpdate("#ff0000");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.color.pizza/v1/?values=ff0000"
    );
  });

  it("still commits with a fallback name when the API returns a malformed response", async () => {
    mockFetch.mockResolvedValueOnce({ json: async () => ({}) });
    const getOnChangeColorInColorsSet = vi.fn();

    const { result } = renderHook(() => useColorPicker(0), {
      wrapper: makeWrapper(getOnChangeColorInColorsSet),
    });

    act(() => {
      result.current.handleSetColorAndUpdate("#000000");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
    });

    expect(getOnChangeColorInColorsSet).toHaveBeenCalledWith(0, {
      name: "color#000000",
      code: "#000000",
    });
  });

  it("does not commit a color change when the API lookup rejects", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network error"));
    const getOnChangeColorInColorsSet = vi.fn();

    const { result } = renderHook(() => useColorPicker(0), {
      wrapper: makeWrapper(getOnChangeColorInColorsSet),
    });

    act(() => {
      result.current.handleSetColorAndUpdate("#000000");
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(150);
    });

    expect(getOnChangeColorInColorsSet).not.toHaveBeenCalled();
  });
});
