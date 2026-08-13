import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { TeamColorContext } from "../context/TeamsColorContext";
import { defaultColorsSet } from "../../constants/defaultColorsSet";
import { useColorSelector } from "./useColorSelector";

const [team1Color, team2Color] = defaultColorsSet;

function makeWrapper(getOnChangeColor: ReturnType<typeof vi.fn>) {
  return ({ children }: { children: ReactNode }) => (
    <TeamColorContext.Provider
      value={{
        colorsSet: defaultColorsSet,
        team1Color,
        team2Color,
        onChangeTeam1Color: vi.fn(),
        onChangeTeam2Color: vi.fn(),
        getOnChangeColor,
        getOnChangeColorInColorsSet: vi.fn(),
        resetSetColorsToDefault: vi.fn(),
      }}
    >
      {children}
    </TeamColorContext.Provider>
  );
}

describe("useColorSelector", () => {
  it("selects the color matching the team's current color outside of settings mode", () => {
    const getOnChangeColor = vi.fn();
    const { result } = renderHook(() => useColorSelector(false, 1), {
      wrapper: makeWrapper(getOnChangeColor),
    });

    expect(result.current.isColorSelected(0, team1Color)).toBe(true);
    expect(result.current.isColorSelected(1, team2Color)).toBe(false);
  });

  it("checks against team2Color when selecting for team 2", () => {
    const getOnChangeColor = vi.fn();
    const { result } = renderHook(() => useColorSelector(false, 2), {
      wrapper: makeWrapper(getOnChangeColor),
    });

    expect(result.current.isColorSelected(1, team2Color)).toBe(true);
    expect(result.current.isColorSelected(0, team1Color)).toBe(false);
  });

  it("changes the team color immediately outside of settings mode", () => {
    const getOnChangeColor = vi.fn().mockReturnValue(vi.fn());
    const { result } = renderHook(() => useColorSelector(false, 1), {
      wrapper: makeWrapper(getOnChangeColor),
    });

    act(() => {
      result.current.handleColorChange(team2Color, 1);
    });

    expect(getOnChangeColor).toHaveBeenCalledWith(1);
  });

  it("in settings mode, selects a color spot instead of changing the team color", () => {
    const getOnChangeColor = vi.fn();
    const { result } = renderHook(() => useColorSelector(true, 1), {
      wrapper: makeWrapper(getOnChangeColor),
    });

    expect(result.current.selectedColorIndex).toBe(0); // team1Color is defaultColorsSet[0]

    act(() => {
      result.current.handleColorChange(team2Color, 3);
    });

    expect(getOnChangeColor).not.toHaveBeenCalled();
    expect(result.current.isColorSelected(3, team2Color)).toBe(true);
    expect(result.current.isColorSelected(0, team1Color)).toBe(false);
  });
});
