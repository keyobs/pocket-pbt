import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for managing the Screen Wake Lock API.
 * Prevents the device screen from dimming or locking.
 */
export interface IWakeLockState {
  isSupported: boolean;
  isSupportedMessage: string;
  isActive: boolean;
  isActiveMessage: string;
}

export function useWakeLock(enabled: boolean = true) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [isSupported] = useState("wakeLock" in navigator);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled || !isSupported) return;

    let cancelled = false;

    const handleRelease = () => {
        if (!cancelled) {
            setIsActive(false);
            wakeLockRef.current = null;
        }
    };

    const requestWakeLock = async () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      
      try {
        const wakeLock = await navigator.wakeLock.request("screen");
        wakeLockRef.current = wakeLock;
        setIsActive(true);

        wakeLock.addEventListener("release", handleRelease);

      } catch (err) {
        console.error("Wake Lock error:", err);
        setIsActive(false);
      }
    };

    requestWakeLock();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true; 
      
      document.removeEventListener("visibilitychange", handleVisibility);

      if (wakeLockRef.current) {
          wakeLockRef.current.removeEventListener("release", handleRelease); 
          wakeLockRef.current.release().catch(() => {});
          wakeLockRef.current = null;
      }
      setIsActive(false);
    };
  }, [enabled, isSupported]);

  // Debug info (kept for convenience)
  const isSupportedMessage: string =  `Wake Lock supported: ${isSupported ? "✅ Yes" : "❌ No"}`;
  const isActiveMessage: string =  `Wake Lock active: ${isActive ? "✅ Yes" : "❌ No"}`

  return { isSupported, isSupportedMessage, isActive, isActiveMessage };
}