"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe mobile detection via matchMedia. Returns false on the first
 * render (server + hydration), then syncs on mount. Consumers that
 * care about the initial value should assume "desktop" (the richer
 * code path) and degrade gracefully once `isMobile` flips.
 *
 * We subscribe to the MediaQueryList, so rotating or resizing the
 * window updates the flag without a full reload.
 */
export function useIsMobile(maxWidth = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();

    // Safari < 14 only exposes the deprecated addListener API
    if (mq.addEventListener) {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, [maxWidth]);

  return isMobile;
}
