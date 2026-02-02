'use client';

import { useEffect, useRef, RefObject, useCallback, useState } from 'react';

export function useAutoScrollToEnd<T extends HTMLElement>(dependencies: unknown[], enabled: boolean, callback?: () => void): RefObject<T | null> {
  const ref = useRef<T>(null);
  const scrollRefToEnd = useCallback(() => {
    if (!ref.current) return;
    const container = ref.current;
    const targetScroll = container.scrollWidth - container.clientWidth;
    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;

    if (Math.abs(distance) < 1) return;
    const duration = 300;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);
      const newScroll = startScroll + distance * ease;
      container.scrollLeft = newScroll;
      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  }, [ref]);

  useEffect(() => {
    if (!enabled) return;
    scrollRefToEnd();
  }, [dependencies, scrollRefToEnd, enabled]);

  return ref;
}
