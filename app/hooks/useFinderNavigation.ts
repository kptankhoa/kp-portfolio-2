'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PortfolioItem } from '../data';

// Helper: Build selections from path string
function selectionsFromPath(path: string, data: PortfolioItem[]): (PortfolioItem | null)[] {
  if (!path) return [null];

  const ids = path.split('/').filter(Boolean);
  const selections: (PortfolioItem | null)[] = [];
  let currentItems = data;

  for (const id of ids) {
    const item = currentItems.find((i) => i.id === id);
    if (!item) break;
    selections.push(item);
    currentItems = item.children || [];
  }

  return selections.length > 0 ? selections : [null];
}

// Helper: Build path string from selections
function pathFromSelections(selections: (PortfolioItem | null)[]): string {
  return selections
    .filter((s): s is PortfolioItem => s !== null)
    .map((s) => s.id)
    .join('/');
}

interface UseFinderNavigationOptions {
  data: PortfolioItem[];
  defaultPath?: string; // Default path to open on mount if no URL path
}

export function useFinderNavigation({ data, defaultPath }: UseFinderNavigationOptions) {
  const searchParams = useSearchParams();

  const [selections, setSelections] = useState<(PortfolioItem | null)[]>([null]);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize selections from URL on mount (or default path)
  useEffect(() => {
    const pathParam = searchParams.get('path');
    if (pathParam) {
      const restored = selectionsFromPath(pathParam, data);
      setSelections(restored);
    } else if (defaultPath) {
      const restored = selectionsFromPath(defaultPath, data);
      setSelections(restored);
    }
    setIsInitialized(true);
  }, []);

  // Update URL when selections change (after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const path = pathFromSelections(selections);
    const newUrl = path ? `?path=${path}` : '/';
    window.history.replaceState(null, '', newUrl);
  }, [selections, isInitialized]);

  // Select an item at a specific level
  const handleSelect = useCallback((item: PortfolioItem, level: number) => {
    setSelections((prev) => {
      const newSelections = prev.slice(0, level);
      newSelections[level] = item;

      // Auto-select "about.txt" when clicking a company folder
      if (item.id.startsWith('company-') && item.children?.length) {
        const aboutFile = item.children.find((child) => child.name === 'about.txt');
        if (aboutFile) {
          newSelections[level + 1] = aboutFile;
        }
      }

      return newSelections;
    });

    // On mobile, open preview fullscreen when selecting a file with content
    if (item.content && typeof window !== 'undefined' && window.innerWidth <= 768) {
      setMobilePreviewOpen(true);
    }
  }, []);

  // Navigate via breadcrumb
  const handleBreadcrumbClick = useCallback((index: number) => {
    if (index === -1) {
      setSelections([null]);
    } else {
      setSelections((prev) => prev.slice(0, index + 1));
    }
    setMobilePreviewOpen(false);
  }, []);

  // Go back one level
  const handleGoBack = useCallback(() => {
    if (mobilePreviewOpen) {
      setMobilePreviewOpen(false);
      return;
    }

    setSelections((prev) => {
      if (prev.length <= 1) {
        return [null];
      }
      return prev.slice(0, -1);
    });
  }, [mobilePreviewOpen]);

  // Close mobile preview
  const handleMobileBack = useCallback(() => {
    setMobilePreviewOpen(false);
  }, []);

  // Build columns based on selections
  const columns: { items: PortfolioItem[]; selectedId: string | null }[] = [
    { items: data, selectedId: selections[0]?.id || null },
  ];

  selections.forEach((selection, index) => {
    if (selection?.children && selection.children.length > 0) {
      columns.push({
        items: selection.children,
        selectedId: selections[index + 1]?.id || null,
      });
    }
  });

  // Get all open folder IDs
  const openIds = selections
    .filter((s): s is PortfolioItem => s !== null && s.type === 'folder' && !!s.children?.length)
    .map((s) => s.id);

  // Get the deepest selected item for preview
  const previewItem = [...selections].reverse().find(
    (item) => item && item.content
  ) || null;

  return {
    selections,
    columns,
    openIds,
    previewItem,
    mobilePreviewOpen,
    handleSelect,
    handleBreadcrumbClick,
    handleGoBack,
    handleMobileBack,
  };
}
