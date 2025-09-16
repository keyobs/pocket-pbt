import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the app container", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
