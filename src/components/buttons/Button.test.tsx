import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  const handleClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(<Button onClick={handleClick}>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled class and attribute when disabled", () => {
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("pbt-button", "default", "medium", "disabled");
    expect(button).toBeDisabled();
  });

  it("applies 'active' and 'activeStyle' classes when active", () => {
    render(
      <Button onClick={handleClick} active activeStyle="selected">
        Active
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("active", "selected");
  });

  it("applies 'paused' class when paused", () => {
    render(
      <Button onClick={handleClick} paused>
        Paused
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("paused");
  });

  it("applies custom style and size props correctly", () => {
    render(
      <Button onClick={handleClick} style="primary" size="large">
        Styled
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("pbt-button", "primary", "large");
  });

  it("applies custom inline styles", () => {
    const customStyle = { backgroundColor: "#FF0000", padding: "10px" };
    render(
      <Button onClick={() => {}} customStyle={customStyle}>
        Custom
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color: #FF0000; padding: 10px;");
  });

  it("applies text alignment class to inner span", () => {
    render(
      <Button onClick={handleClick} align="start">
        Align
      </Button>
    );
    const textSpan = screen.getByText("Align");
    expect(textSpan).toHaveClass("start");
  });

  it("renders correctly with all default props", () => {
    render(<Button onClick={handleClick}>Default</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("pbt-button", "default", "medium");
  });

  it("has correct accessibility role", () => {
    render(<Button onClick={handleClick}>A11y</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toBe("button");
  });

  it("matches class combination snapshot", () => {
    render(
      <Button
        onClick={handleClick}
        active
        paused
        disabled
        style="secondary"
        size="fit"
        activeStyle="active"
      >
        Snapshot
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button.className).toMatchInlineSnapshot(
      `"pbt-button secondary fit paused active active disabled"`
    );
  });
});
