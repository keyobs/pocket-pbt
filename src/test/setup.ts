import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(global.navigator, "wakeLock", {
  value: {
    request: vi.fn(async () => ({
      release: vi.fn(() => Promise.resolve()),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      type: "screen",
      released: false,
    })),
    getLock: null,
  },
  writable: true,
});
