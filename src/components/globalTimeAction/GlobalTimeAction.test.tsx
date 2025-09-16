// GlobalTimeAction.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import GlobalTimeAction from "./GlobalTimeAction";
import { useTimeContext, useTimeDispatch } from "./time";
import { describe, it, expect, vi } from "vitest";

// Mock the entire time module at the file level
vi.mock("./time", () => {
  const useTimeContext = vi.fn();
  const useTimeDispatch = vi.fn();
  return { useTimeContext, useTimeDispatch };
});

describe("GlobalTimeAction", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useTimeDispatch).mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'pause all' button when time is not paused", () => {
    vi.mocked(useTimeContext).mockReturnValue({
      isTimePaused: false,
      onPauseTime: mockDispatch,
    });
    render(<GlobalTimeAction />);

    expect(
      screen.getByRole("button", { name: "pause all" })
    ).toBeInTheDocument();
  });

  it("renders 'resume all' button when time is paused", () => {
    vi.mocked(useTimeContext).mockReturnValue({
      isTimePaused: true,
      onPauseTime: mockDispatch,
    });
    render(<GlobalTimeAction />);

    expect(
      screen.getByRole("button", { name: "resume all" })
    ).toBeInTheDocument();
  });

  it("calls onPauseTime when the button is clicked", () => {
    vi.mocked(useTimeContext).mockReturnValue({
      isTimePaused: false,
      onPauseTime: mockDispatch,
    });
    render(<GlobalTimeAction />);

    const button = screen.getByRole("button", { name: "pause all" });
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
