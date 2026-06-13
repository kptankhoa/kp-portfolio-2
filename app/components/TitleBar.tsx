'use client';

import { useRef, useState } from 'react';
import { PortfolioItem } from '../data';

interface TitleBarProps {
  selections: (PortfolioItem | null)[];
  onFullscreen: () => void;
  onMinimize: () => void;
  draggable?: boolean;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: (e: React.PointerEvent) => void;
}

export function TitleBar({
  selections,
  onFullscreen,
  onMinimize,
  draggable = false,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: TitleBarProps) {
  const [showNiceTry, setShowNiceTry] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const path = selections
    .filter((s): s is PortfolioItem => s !== null)
    .map((s) => s.id)
    .join('/');

  const handleClose = () => {
    setShowNiceTry(true);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => setShowNiceTry(false), 1600);
  };

  return (
    <div
      className={`title-bar ${draggable ? 'draggable' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div className="traffic-lights" onPointerDown={(e) => e.stopPropagation()}>
        <button className="light red" onClick={handleClose} aria-label="Close window" />
        <button className="light yellow" onClick={onMinimize} aria-label="Minimize window" />
        <button className="light green" onClick={onFullscreen} aria-label="Toggle fullscreen" />
        {showNiceTry && <span className="nice-try">nice try :)</span>}
      </div>
      <span className="window-title">
        KhoaPhan — ~{path ? `/${path}` : ''}
      </span>
      <span className="title-spacer" />

      <style jsx>{`
        .title-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-color);
          flex-shrink: 0;
          user-select: none;
        }

        .title-bar.draggable {
          cursor: url('/cursors/grab.svg') 13 15, grab;
          touch-action: none;
        }

        .title-bar.draggable:active {
          cursor: url('/cursors/grabbing.svg') 13 15, grabbing;
        }

        .traffic-lights {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .light {
          width: 12px;
          height: 12px;
          padding: 0;
          border: none;
          border-radius: 50%;
          cursor: pointer;
        }

        .light.red {
          background: var(--gruvbox-red);
        }

        .light.yellow {
          background: var(--gruvbox-yellow);
        }

        .light.green {
          background: var(--gruvbox-green);
        }

        .light:hover {
          filter: brightness(1.2);
        }

        .nice-try {
          position: absolute;
          left: 0;
          top: 22px;
          padding: 4px 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--gruvbox-yellow);
          font-size: 12px;
          white-space: nowrap;
          z-index: 20;
        }

        .window-title {
          flex: 1;
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title-spacer {
          width: 52px;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .title-bar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
