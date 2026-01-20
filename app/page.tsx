'use client';

import { Header, FinderColumn, PreviewPane } from './components';
import { portfolioData, summaryData } from './data';
import { useFinderNavigation, useKeyboardNavigation, useAutoScroll } from './hooks';

export default function Home() {
  const {
    selections,
    columns,
    openIds,
    previewItem,
    mobilePreviewOpen,
    handleSelect,
    handleBreadcrumbClick,
    handleGoBack,
    handleMobileBack,
  } = useFinderNavigation({ data: portfolioData, defaultPath: 'about-me' });

  useKeyboardNavigation({ onEscape: handleGoBack });

  const lastColumnRef = useAutoScroll<HTMLDivElement>(selections);

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
