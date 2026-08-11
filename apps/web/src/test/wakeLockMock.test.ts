import { beforeEach, describe, it, expect, vi, Mock } from "vitest";
import { renderHook, act, RenderHookResult } from "@testing-library/react";
import { useWakeLock } from "@hooks/useWakeLock";

interface MockWakeLockSentinel {
  release: Mock<() => Promise<void>>;
  addEventListener: Mock<(type: string, handler: () => void) => void>;
  removeEventListener: Mock<(type: string, handler: () => void) => void>;
  type: string;
  released: boolean;
}

interface MockWakeLock {
  request: Mock<(type: string) => Promise<MockWakeLockSentinel>>;
  getLock: null;
}

// --------------------
// Mock Setup
// --------------------
const mockedWakeLock = navigator.wakeLock as unknown as MockWakeLock;

const spyAddEventListener = vi.spyOn(document, "addEventListener");
const spyRemoveEventListener = vi.spyOn(document, "removeEventListener");

const triggerMockRelease = async (mockRequestCallIndex = 0): Promise<void> => {
  const mockLock: MockWakeLockSentinel = await mockedWakeLock.request.mock
    .results[mockRequestCallIndex].value;

  const releaseHandler = mockLock.addEventListener.mock.calls.find(
    (call: [string, () => void]) => call[0] === "release"
  )?.[1];

  if (releaseHandler) {
    await act(async () => {
      releaseHandler();
    });
  }
};

const simulateVisibilityChange = async (
  state: "visible" | "hidden"
): Promise<void> => {
  Object.defineProperty(document, "visibilityState", {
    value: state,
    writable: true,
  });
  await act(async () => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
};

// --------------------
// Tests
// --------------------
describe("useWakeLock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ✅ Test 1 — Mount + Unmount behavior
  it("should request lock on mount and release on unmount", async () => {
    let result: RenderHookResult<
      typeof useWakeLock extends () => infer R ? R : never,
      void
    >;
    let unmount: () => void;

    await act(async () => {
      const hook = renderHook(() => useWakeLock(true));
      result = hook;
      unmount = hook.unmount;
    });

    await vi.waitFor(() => {
      expect(mockedWakeLock.request).toHaveBeenCalledTimes(1);
      expect(result!.result.current.isActive).toBe(true);
      expect(spyAddEventListener).toHaveBeenCalledWith(
        "visibilitychange",
        expect.any(Function)
      );
    });

    const currentMockLock = await mockedWakeLock.request.mock.results[0].value;

    await act(async () => {
      unmount();
    });

    await vi.waitFor(() => {
      expect(currentMockLock.release).toHaveBeenCalledTimes(1);
      expect(currentMockLock.removeEventListener).toHaveBeenCalledWith(
        "release",
        expect.any(Function)
      );
      expect(spyRemoveEventListener).toHaveBeenCalledWith(
        "visibilitychange",
        expect.any(Function)
      );
    });
  });

  // ✅ Test 2 — Reacquire on visibility change
  it('should re-acquire lock when visibility changes to "visible"', async () => {
    let result: RenderHookResult<
      typeof useWakeLock extends () => infer R ? R : never,
      void
    >;
    let unmount: () => void;

    await act(async () => {
      const hook = renderHook(() => useWakeLock(true));
      result = hook;
      unmount = hook.unmount;
    });

    // Wait for first lock
    await vi.waitFor(() =>
      expect(mockedWakeLock.request).toHaveBeenCalledTimes(1)
    );

    // Simulate release + hidden
    await triggerMockRelease(0);
    await simulateVisibilityChange("hidden");

    expect(result!.result.current.isActive).toBe(false);

    // Simulate tab visible -> should re-request
    await simulateVisibilityChange("visible");

    await vi.waitFor(() => {
      expect(mockedWakeLock.request).toHaveBeenCalledTimes(2);
      expect(result!.result.current.isActive).toBe(true);
    });

    const newLock = await mockedWakeLock.request.mock.results[1].value;

    expect(newLock.addEventListener).toHaveBeenCalledWith(
      "release",
      expect.any(Function)
    );

    await act(async () => {
      unmount();
    });

    expect(newLock.release).toHaveBeenCalledTimes(1);
  });

  // ✅ Test 3 — Disabled mode
  it('should NOT run any logic if "enabled" is false', async () => {
    await act(async () => {
      renderHook(() => useWakeLock(false));
    });

    expect(mockedWakeLock.request).not.toHaveBeenCalled();
    expect(spyAddEventListener).not.toHaveBeenCalled();
  });
});
