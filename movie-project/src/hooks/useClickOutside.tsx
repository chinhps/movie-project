import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = (handler: () => void, enable: boolean) => {
  const domNodeRef = useRef<any>(null);
  const domButtonNodeRef = useRef<any>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        enable &&
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node) &&
        domButtonNodeRef.current &&
        !domButtonNodeRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    },
    [enable, domNodeRef, domButtonNodeRef, handler]
  );

  useEffect(() => {
    if (enable) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [enable, handleOutsideClick]);

  return { domNodeRef, domButtonNodeRef };
};
