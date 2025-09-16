import { render, screen } from "@testing-library/react";
import StarBadge from "./StarBadge";
import { describe, it, expect } from "vitest";

describe("StarBadge", () => {
  it("renders a star icon badge for jammer1 with the correct id", () => {
    render(<StarBadge jammerId="jammer1" />);

    const badgeElement = screen.getByTestId("badge-jammer1");
    expect(badgeElement).toBeInTheDocument();

    const starIcon = screen.getByRole("img", { name: /star/i });
    expect(starIcon).toBeInTheDocument();
  });

  it("renders a star icon badge for jammer2 with the correct id", () => {
    render(<StarBadge jammerId="jammer2" />);

    const badgeElement = screen.getByTestId("badge-jammer2");
    expect(badgeElement).toBeInTheDocument();

    const starIcon = screen.getByRole("img", { name: /star/i });
    expect(starIcon).toBeInTheDocument();
  });
});
