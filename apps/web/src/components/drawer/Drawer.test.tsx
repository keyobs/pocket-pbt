import { render, screen, fireEvent } from "@testing-library/react";
import Drawer from "./Drawer";
import { vi } from "vitest";

describe("Drawer", () => {
  it("has the 'open' class when isOpen is true", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()}>
        Content
      </Drawer>
    );

    const drawerElement = screen.getByRole("complementary", {
      name: /drawer/i,
    });
    expect(drawerElement).toHaveClass("open");
  });

  it("has the 'closed' class when isOpen is false", () => {
    render(
      <Drawer isOpen={false} onClose={vi.fn()}>
        Content
      </Drawer>
    );

    const drawerElement = screen.getByRole("complementary", {
      name: /drawer/i,
    });
    expect(drawerElement).toHaveClass("closed");
  });

  it("renders the children content", () => {
    render(
      <Drawer isOpen={true} onClose={vi.fn()}>
        Drawer Content
      </Drawer>
    );

    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("calls onClose when the button is clicked", () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose}>
        Content
      </Drawer>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
