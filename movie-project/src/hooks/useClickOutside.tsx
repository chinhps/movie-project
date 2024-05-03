import { useEffect, useRef } from "react";

export const useClickOutside = (handler: () => void, enable: boolean) => {
  const domNodeRef = useRef<HTMLDivElement | null>(null);
  const domButtonNodeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        enable &&
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node) &&
        domButtonNodeRef.current &&
        !domButtonNodeRef.current.contains(event.target as Node)
      ) {
        // console.log(4343534534, event.target, domNodeRef, domButtonNodeRef);
        handler();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handler, enable]);

  return { domNodeRef, domButtonNodeRef };
};
