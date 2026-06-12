'use client';

import { Suspense } from 'react';
import { Header, FinderColumn, PreviewPane, MenuBar } from './components';
import { summaryData } from './data';
import { FinderProvider, useFinder } from './context/FinderContext';
import { useKeyboardNavigation, useAutoScrollToEnd } from './hooks';

function Shell() {
  const {
    selections,
    columns,
    openIds,
    previewItem,
    mobilePreviewOpen,
    handleSelect,
    handleBreadcrumbClick,
    handleGoBack,
  } = useFinder();

  useKeyboardNavigation({ onEscape: handleGoBack });

  const contentContainerRef = useAutoScrollToEnd<HTMLDivElement>(selections, !!previewItem);
  const columnsContainerRef = useAutoScrollToEnd<HTMLDivElement>(selections, !previewItem);

  return (
    <div className="wrapper">
      <MenuBar firstName={summaryData.firstName} lastName={summaryData.lastName} />

      <div className="window-area">
        <main className="main">
          <Header
            selections={selections}
            onBreadcrumbClick={handleBreadcrumbClick}
          />

          <div className={`content ${mobilePreviewOpen ? 'preview-open' : ''}`} ref={contentContainerRef}>
            <div className="columns-container" ref={columnsContainerRef}>
              {columns.map((column, index) => (
                <FinderColumn
                  key={index}
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
              onMobileBack={handleGoBack}
            />
          </div>
        </main>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          background: var(--bg-primary);
        }

        .window-area {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px;
          min-height: 0;
        }

        .main {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          max-width: 1400px;
          max-height: 800px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
        }

        /* Tablet and below - full size window */
        @media (max-width: 1024px) {
          .window-area {
            padding: 0;
          }

          .main {
            max-height: none;
            max-width: none;
            border: none;
            border-radius: 0;
            box-shadow: none;
          }
        }
      `}</style>

      <style jsx global>{`
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

export default function Home() {
  return (
    <Suspense fallback={null}>
      <FinderProvider>
        <Shell />
      </FinderProvider>
    </Suspense>
  );
}
