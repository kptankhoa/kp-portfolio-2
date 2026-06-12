'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { portfolioData, PortfolioItem } from '../data';
import { useFinderNavigation } from '../hooks';

interface FinderContextValue {
  selections: (PortfolioItem | null)[];
  columns: { items: PortfolioItem[]; selectedId: string | null }[];
  openIds: string[];
  previewItem: PortfolioItem | null;
  mobilePreviewOpen: boolean;
  handleSelect: (item: PortfolioItem, level: number) => void;
  handleBreadcrumbClick: (index: number) => void;
  handleGoBack: () => void;
  navigateToPath: (path: string) => void;
  terminalOpen: boolean;
  openTerminal: () => void;
  closeTerminal: () => void;
}

const FinderContext = createContext<FinderContextValue | null>(null);

export function FinderProvider({ children }: { children: ReactNode }) {
  const nav = useFinderNavigation({ data: portfolioData, defaultPath: 'about-me' });
  const [terminalOpen, setTerminalOpen] = useState(false);

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  // terminal.app behaves like an app launch, not a selection
  const handleSelect = useCallback((item: PortfolioItem, level: number) => {
    if (item.id === 'terminal') {
      setTerminalOpen(true);

      return;
    }
    nav.handleSelect(item, level);
  }, [nav]);

  return (
    <FinderContext.Provider
      value={{
        selections: nav.selections,
        columns: nav.columns,
        openIds: nav.openIds,
        previewItem: nav.previewItem,
        mobilePreviewOpen: nav.mobilePreviewOpen,
        handleBreadcrumbClick: nav.handleBreadcrumbClick,
        handleGoBack: nav.handleGoBack,
        navigateToPath: nav.navigateToPath,
        handleSelect,
        terminalOpen,
        openTerminal,
        closeTerminal,
      }}
    >
      {children}
    </FinderContext.Provider>
  );
}

export function useFinder(): FinderContextValue {
  const ctx = useContext(FinderContext);
  if (!ctx) {
    throw new Error('useFinder must be used within FinderProvider');
  }

  return ctx;
}
