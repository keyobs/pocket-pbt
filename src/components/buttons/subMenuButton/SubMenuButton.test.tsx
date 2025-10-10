import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SubMenuButton from "./SubMenuButton";

describe("SubMenuButton", () => {
  it("renders the button with the given text", () => {
    render(<SubMenuButton text="Settings" handleOnClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls handleOnClick when clicked", () => {
    const handleClick = vi.fn();
    render(<SubMenuButton text="Click me" handleOnClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct class", () => {
    render(<SubMenuButton text="Menu" handleOnClick={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("sub-menu-button");
  });

  it("contains a <span> wrapping the text", () => {
    render(<SubMenuButton text="Profile" handleOnClick={() => {}} />);
    const span = screen.getByText("Profile");
    expect(span.tagName.toLowerCase()).toBe("span");
  });

  it("matches the expected DOM structure", () => {
    const { container } = render(
      <SubMenuButton text="Snapshot" handleOnClick={() => {}} />
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <button
        class="sub-menu-button"
      >
        <span>
          Snapshot
        </span>
      </button>
    `);
  });
});
