import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MenuButton from "./MenuButton";

describe("MenuButton", () => {
  it("renders correctly with children", () => {
    const handleClick = vi.fn();
    render(<MenuButton onClick={handleClick}>Click Me</MenuButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<MenuButton onClick={handleClick}>Test Button</MenuButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
