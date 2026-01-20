'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Header, FinderColumn, PreviewPane } from './components';
import { portfolioData, summaryData, PortfolioItem } from './data';

export default function Home() {
  // Track selection at each column level
  const [selections, setSelections] = useState<(PortfolioItem | null)[]>([null]);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const lastColumnRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((item: PortfolioItem, level: number) => {
    setSelections((prev) => {
      // Keep selections up to and including this level
      const newSelections = prev.slice(0, level);
      newSelections[level] = item;

      return newSelections;
    });

    // On mobile, open preview fullscreen when selecting a file with content
    if (item.content && window.innerWidth <= 768) {
      setMobilePreviewOpen(true);
    }
  }, []);

  const handleBreadcrumbClick = useCallback((index: number) => {
    if (index === -1) {
      // Home clicked - reset to root
      setSelections([null]);
    } else {
      // Keep selections up to and including this index
      setSelections((prev) => prev.slice(0, index + 1));
    }
    setMobilePreviewOpen(false);
  }, []);

  const handleMobileBack = useCallback(() => {
    setMobilePreviewOpen(false);
  }, []);

  // Handle going back one level
  const handleGoBack = useCallback(() => {
    if (mobilePreviewOpen) {
      setMobilePreviewOpen(false);
      return;
    }

    // Remove the last selection to go back one level
    setSelections((prev) => {
      if (prev.length <= 1) {
        return [null]; // Reset to root
      }
      return prev.slice(0, -1);
    });
  }, [mobilePreviewOpen]);

  // Listen for Escape key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGoBack]);

  // Build columns based on selections
  const columns: { items: PortfolioItem[]; selectedId: string | null }[] = [
    { items: portfolioData, selectedId: selections[0]?.id || null },
  ];

  // Get all open folder IDs (selected folders that have children)
  const openIds = selections
    .filter((s): s is PortfolioItem => s !== null && s.type === 'folder' && !!s.children?.length)
    .map(s => s.id);

  // Add additional columns for nested selections
  selections.forEach((selection, index) => {
    if (selection?.children && selection.children.length > 0) {
      columns.push({
        items: selection.children,
        selectedId: selections[index + 1]?.id || null,
      });
    }
  });

  // Scroll to show the last column when selections change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (lastColumnRef.current) {
        lastColumnRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'end',
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [selections]);

  // Get the deepest selected item for preview
  const previewItem = [...selections].reverse().find(
    (item) => item && item.content
  ) || null;

  return (
    <div className="wrapper">
      <main className="main">
        <Header
          firstName={summaryData.firstName}
          lastName={summaryData.lastName}
          selections={selections}
          onBreadcrumbClick={handleBreadcrumbClick}
        />

        <div className={`content ${mobilePreviewOpen ? 'preview-open' : ''}`}>
          <div className="columns-container">
            {columns.map((column, index) => (
              <FinderColumn
                key={index}
                ref={index === columns.length - 1 ? lastColumnRef : null}
                items={column.items}
                selectedId={column.selectedId}
                openIds={openIds}
                onSelect={(item) => handleSelect(item, index)}
              />
            ))}
          </div>
          <PreviewPane
            item={previewItem}
            isMobileFullscreen={mobilePreviewOpen}
            onMobileBack={handleMobileBack}
          />
        </div>
      </main>

      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 40px;
          background: var(--bg-primary);
        }

        .main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: calc(100vh - 80px);
          max-width: 1400px;
          max-height: 800px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
        }

        .content {
          flex: 1;
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          position: relative;
          scroll-behavior: smooth;
        }

        .columns-container {
          display: flex;
          flex-shrink: 0;
          scroll-behavior: smooth;
        }

        /* Tablet and below - full height */
        @media (max-width: 1024px) {
          .wrapper {
            padding: 0;
          }

          .main {
            height: 100vh;
            max-height: none;
            max-width: none;
            border-radius: 0;
            border: none;
          }
        }

        /* Mobile - hide preview by default, show columns */
        @media (max-width: 768px) {
          .content {
            overflow-x: hidden;
          }

          .columns-container {
            flex: 1;
            min-width: 100%;
            overflow-x: auto;
          }

          .content.preview-open .columns-container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
