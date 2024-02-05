import { useEffect, useRef } from "react";

export function useElementScroll<T extends HTMLElement>(callback: Function) {
  const ref = useRef<T>(null);

  const handler = (event: Event) => callback(event);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    current.addEventListener("scroll", handler);

    return () => {
      if (!current) return;

      current.removeEventListener("scroll", handler);
    };
  });

  return ref;
}
