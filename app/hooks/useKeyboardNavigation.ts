'use client';

import { useEffect } from 'react';

interface UseKeyboardNavigationOptions {
  onEscape: () => void;
}

export function useKeyboardNavigation({ onEscape }: UseKeyboardNavigationOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEscape]);
}
