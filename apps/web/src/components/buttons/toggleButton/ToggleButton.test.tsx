import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleButton from "./ToggleButton";

describe("ToggleButton", () => {
  it("should render the label when provided", () => {
    render(
      <ToggleButton label="Dark Mode" isToggled={false} onToggle={vi.fn()} />
    );

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });

  it("should have the checkbox checked when isToggled is true", () => {
    render(<ToggleButton label="Option" isToggled={true} onToggle={vi.fn()} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should not have the checkbox checked when isToggled is false", () => {
    render(
      <ToggleButton label="Option" isToggled={false} onToggle={vi.fn()} />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should call onToggle when the button is clicked", () => {
    const handleToggle = vi.fn();
    render(
      <ToggleButton label="Option" isToggled={false} onToggle={handleToggle} />
    );

    const toggleButton = screen.getByRole("checkbox");
    fireEvent.click(toggleButton);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it("should not render the label if it's not provided", () => {
    render(<ToggleButton label={null} isToggled={false} onToggle={vi.fn()} />);

    const labelElement = screen.queryByText("null");
    expect(labelElement).not.toBeInTheDocument();
  });
});
