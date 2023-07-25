import { useEffect, useRef } from "react";

export function useElementScroll<T extends HTMLElement>(callback: Function) {
  const ref = useRef<T>(null);

  const handler = (event: Event) => callback(event);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener("scroll", handler);

    return () => {
      if (!ref.current) return;

      ref.current.removeEventListener("scroll", handler);
    };
  });

  return ref;
}
