'use client';

import { ChevronRightIcon } from './icons';
import { PortfolioItem } from '../data';
import { useAutoScrollToEnd } from '../hooks';

interface HeaderProps {
  selections: (PortfolioItem | null)[];
  onBreadcrumbClick: (index: number) => void;
}

export function Header({ selections, onBreadcrumbClick }: HeaderProps) {
  const breadcrumbsRef = useAutoScrollToEnd<HTMLDivElement>(selections, true);

  // Build breadcrumb path
  const breadcrumbs = selections.filter(Boolean) as PortfolioItem[];

  return (
    <header className="header">
      <nav className="breadcrumbs" ref={breadcrumbsRef}>
        <button
          className="breadcrumb-item home"
          onClick={() => onBreadcrumbClick(-1)}
        >
          ~
        </button>

        {breadcrumbs.map((item, index) => (
          <div key={item.id} className="breadcrumb-segment">
            <ChevronRightIcon sx={{ fontSize: 14 }} className="breadcrumb-separator" />
            <button
              className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
              onClick={() => onBreadcrumbClick(index)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </nav>

      <style jsx>{`
        .header {
          padding: 10px 20px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .breadcrumbs::-webkit-scrollbar {
          display: none;
        }

        .breadcrumb-segment {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: transparent;
          border: none;
          border-radius: 4px;
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .breadcrumb-item:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .breadcrumb-item.home {
          color: var(--accent-light);
        }

        .breadcrumb-item.home:hover {
          color: var(--accent-light);
          background: var(--accent-dark);
        }

        .breadcrumb-item.active {
          color: var(--text-primary);
        }

        :global(.breadcrumb-separator) {
          color: var(--text-muted);
        }
      `}</style>
    </header>
  );
}
