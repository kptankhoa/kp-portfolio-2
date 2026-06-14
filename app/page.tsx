'use client';

import { Suspense, useRef, useState } from 'react';
import { Header, FinderColumn, PreviewPane, MenuBar, TitleBar, TerminalWindow } from './components';
import { summaryData } from './data';
import { FinderProvider, useFinder } from './context/FinderContext';
import { useKeyboardNavigation, useAutoScrollToEnd, useIsMobile } from './hooks';

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

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // The window can only be moved/resized when it's floating — not when it fills
  // the viewport (fullscreen) or on compact screens where it's edge-to-edge.
  const isCompact = useIsMobile(1024);
  const floating = !isFullscreen && !isCompact;
  const mainRef = useRef<HTMLElement>(null);
  const drag = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const resize = useRef<{
    startX: number;
    startY: number;
    baseW: number;
    baseH: number;
    basePosX: number;
    basePosY: number;
  } | null>(null);

  const onWindowPointerDown = (e: React.PointerEvent) => {
    if (!floating) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y };
  };

  const onWindowPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) {
      return;
    }
    setPos({
      x: drag.current.baseX + e.clientX - drag.current.startX,
      y: drag.current.baseY + e.clientY - drag.current.startY,
    });
  };

  const onWindowPointerUp = () => {
    drag.current = null;
  };

  const onResizePointerDown = (e: React.PointerEvent) => {
    if (!floating) {
      return;
    }
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = mainRef.current?.getBoundingClientRect();
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseW: size?.w ?? rect?.width ?? 0,
      baseH: size?.h ?? rect?.height ?? 0,
      basePosX: pos.x,
      basePosY: pos.y,
    };
  };

  const onResizePointerMove = (e: React.PointerEvent) => {
    if (!resize.current) {
      return;
    }
    const w = Math.max(360, Math.min(window.innerWidth - 16, resize.current.baseW + e.clientX - resize.current.startX));
    const h = Math.max(280, Math.min(window.innerHeight - 32, resize.current.baseH + e.clientY - resize.current.startY));
    setSize({ w, h });
    // Window is centered, so growing by Δ moves its top-left by -Δ/2; shift the
    // position by +Δ/2 to keep the top-left anchored and the corner under the cursor.
    setPos({
      x: resize.current.basePosX + (w - resize.current.baseW) / 2,
      y: resize.current.basePosY + (h - resize.current.baseH) / 2,
    });
  };

  const onResizePointerUp = () => {
    resize.current = null;
  };

  const toggleFullscreen = () => {
    setIsFullscreen((f) => !f);
    setPos({ x: 0, y: 0 });
  };

  const mainStyle: React.CSSProperties = {};
  if (floating) {
    mainStyle.transform = `translate(${pos.x}px, ${pos.y}px)`;
    if (size) {
      mainStyle.width = size.w;
      mainStyle.height = size.h;
      mainStyle.maxWidth = 'none';
      mainStyle.maxHeight = 'none';
    }
  }

  return (
    <div className={`wrapper ${isFullscreen ? 'fullscreen' : ''}`}>
      <MenuBar firstName={summaryData.firstName} lastName={summaryData.lastName} />

      <div className="window-area">
        <main
          ref={mainRef}
          className={`main ${wiggle ? 'wiggle' : ''}`}
          style={mainStyle}
          onAnimationEnd={(e) => e.target === e.currentTarget && setWiggle(false)}
        >
          <TitleBar
            selections={selections}
            onFullscreen={toggleFullscreen}
            onMinimize={() => setWiggle(true)}
            draggable={floating}
            onPointerDown={onWindowPointerDown}
            onPointerMove={onWindowPointerMove}
            onPointerUp={onWindowPointerUp}
            onDoubleClick={toggleFullscreen}
          />
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

          {floating && (
            <div
              className="resize-handle"
              onPointerDown={onResizePointerDown}
              onPointerMove={onResizePointerMove}
              onPointerUp={onResizePointerUp}
              aria-hidden="true"
            />
          )}
        </main>
      </div>

      <TerminalWindow />

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
          transition: max-width 0.25s ease, max-height 0.25s ease, border-radius 0.25s ease;
        }

        .wrapper.fullscreen .window-area {
          padding: 0;
        }

        .wrapper.fullscreen .main {
          max-width: none;
          max-height: none;
          border-radius: 0;
        }

        .main.wiggle {
          animation: window-wiggle 0.4s ease;
        }

        .resize-handle {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 18px;
          height: 18px;
          z-index: 5;
          cursor: url('/cursors/resize.svg') 12 12, nwse-resize;
          touch-action: none;
        }

        .resize-handle::after {
          content: '';
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 7px;
          height: 7px;
          border-right: 2px solid var(--text-muted);
          border-bottom: 2px solid var(--text-muted);
          opacity: 0.5;
        }

        @keyframes window-wiggle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          30% {
            transform: translateY(10px) scale(0.98);
          }
          65% {
            transform: translateY(4px) scale(0.995);
          }
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
