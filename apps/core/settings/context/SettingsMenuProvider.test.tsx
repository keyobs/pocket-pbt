import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import { SettingsMenuProvider } from "./SettingsMenuProvider";
import { useSettingsMenuContext } from "./SettingsMenuContext";

const wrapper = ({ children }: { children: ReactNode }) => (
  <SettingsMenuProvider>{children}</SettingsMenuProvider>
);

describe("SettingsMenuProvider", () => {
  it("starts with every setting off", () => {
    const { result } = renderHook(() => useSettingsMenuContext(), {
      wrapper,
    });

    expect(result.current.appSettings).toEqual({
      jammerTimeOnly: false,
      blockerTimeOnly: false,
      timeOnlyOneTeam: false,
    });
  });

  it("toggles a setting on and off", () => {
    const { result } = renderHook(() => useSettingsMenuContext(), {
      wrapper,
    });

    act(() => {
      result.current.handleToggle("timeOnlyOneTeam");
    });
    expect(result.current.appSettings.timeOnlyOneTeam).toBe(true);

    act(() => {
      result.current.handleToggle("timeOnlyOneTeam");
    });
    expect(result.current.appSettings.timeOnlyOneTeam).toBe(false);
  });

  it("turning on jammerTimeOnly turns off blockerTimeOnly", () => {
    const { result } = renderHook(() => useSettingsMenuContext(), {
      wrapper,
    });

    act(() => {
      result.current.handleToggle("blockerTimeOnly");
    });
    expect(result.current.appSettings.blockerTimeOnly).toBe(true);

    act(() => {
      result.current.handleToggle("jammerTimeOnly");
    });
    expect(result.current.appSettings.jammerTimeOnly).toBe(true);
    expect(result.current.appSettings.blockerTimeOnly).toBe(false);
  });

  it("turning on blockerTimeOnly turns off jammerTimeOnly", () => {
    const { result } = renderHook(() => useSettingsMenuContext(), {
      wrapper,
    });

    act(() => {
      result.current.handleToggle("jammerTimeOnly");
    });
    act(() => {
      result.current.handleToggle("blockerTimeOnly");
    });

    expect(result.current.appSettings.blockerTimeOnly).toBe(true);
    expect(result.current.appSettings.jammerTimeOnly).toBe(false);
  });

  it("timeOnlyOneTeam has no exclusivity rule with the others", () => {
    const { result } = renderHook(() => useSettingsMenuContext(), {
      wrapper,
    });

    act(() => {
      result.current.handleToggle("jammerTimeOnly");
    });
    act(() => {
      result.current.handleToggle("timeOnlyOneTeam");
    });

    expect(result.current.appSettings).toEqual({
      jammerTimeOnly: true,
      blockerTimeOnly: false,
      timeOnlyOneTeam: true,
    });
  });

  it("throws when used outside of a SettingsMenuProvider", () => {
    expect(() => renderHook(() => useSettingsMenuContext())).toThrow(
      "useSettingsMenuContext must be used within a SettingsMenuProvider"
    );
  });
});
