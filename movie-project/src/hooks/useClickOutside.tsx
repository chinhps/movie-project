import { useEffect, useRef } from "react";

export const useClickOutside = (handler: () => void) => {
  const domNodeRef = useRef<HTMLDivElement | null>(null);
  const domButtonNodeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        domNodeRef.current &&
        !domNodeRef.current.contains(event.target as Node) &&
        domButtonNodeRef.current &&
        !domButtonNodeRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handler]);

  return { domNodeRef, domButtonNodeRef };
};
