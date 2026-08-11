import { useState, useEffect } from "react";
import { breakpoints } from "@core/constants/deviceBreakpoints";

export const breakpointMobile = breakpoints.medium;

export function useMobileScreen() {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    getIsMobileScreen()
  );

  useEffect(() => {
    const handleWindowResize = () => {
      const next = getIsMobileScreen();
      if (next !== isMobileScreen) {
        setIsMobileScreen(next);
      }
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [isMobileScreen]);

  return isMobileScreen;
}

function getIsMobileScreen() {
  return window.innerWidth < breakpointMobile;
}
