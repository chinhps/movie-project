import { useState, useEffect } from "react";

const mobileBreakpoint = 768;

function useDeviceCheck() {
  const [device, setDevice] = useState<"mobile" | "desktop" | undefined>(
    undefined
  );

  useEffect(() => {
    function checkSize() {
      const isMobile = window.innerWidth < mobileBreakpoint;
      setDevice(isMobile ? "mobile" : "desktop");
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return device;
}

export default useDeviceCheck;
