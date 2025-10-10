import { describe, it, expect, vi, beforeEach } from "vitest";
import { getColorNameFromApi } from "./getColorNameFromAPI";

describe("getColorNameFromApi", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("calls the correct API URL and returns color name", async () => {
    const mockResponse = {
      colors: [{ name: "Sky Blue" }],
    };

    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const result = await getColorNameFromApi("#87ceeb");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.color.pizza/v1/?values=87ceeb"
    );
    expect(result).toBe("Sky Blue");
  });

  it("works even if hex has no # prefix", async () => {
    const mockResponse = {
      colors: [{ name: "Bright Red" }],
    };

    mockFetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const result = await getColorNameFromApi("ff0000");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.color.pizza/v1/?values=ff0000"
    );
    expect(result).toBe("Bright Red");
  });

  it("throws if API fails or response malformed", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({}), // no colors property
    });

    await expect(getColorNameFromApi("#000000")).rejects.toThrow();
  });

  it("throws if fetch rejects", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(getColorNameFromApi("#123456")).rejects.toThrow(
      "Network error"
    );
  });
});
