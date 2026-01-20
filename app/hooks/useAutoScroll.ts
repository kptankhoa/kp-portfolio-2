'use client';

import { useEffect, useRef, RefObject } from 'react';

export function useAutoScroll<T extends HTMLElement>(dependency: unknown): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end',
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [dependency]);

  return ref;
}
