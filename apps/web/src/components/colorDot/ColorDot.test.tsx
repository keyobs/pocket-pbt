import { render, screen } from "@testing-library/react";
import { ColorDot } from "./ColorDot";
import { describe, it, expect } from "vitest";

describe("ColorDot", () => {
  it("renders with the correct ARIA role and label", () => {
    const testColor = "#ff0000";
    render(<ColorDot color={testColor} />);

    const colorDotElement = screen.getByRole("img", {
      name: `${testColor} color-dot`,
    });

    expect(colorDotElement).toHaveStyle(`background-color: ${testColor}`);
  });
});
