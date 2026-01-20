'use client';

import { forwardRef } from 'react';
import { PortfolioItem } from '../data';
import { FinderItem } from './FinderItem';

interface FinderColumnProps {
  items: PortfolioItem[];
  selectedId: string | null;
  openIds?: string[];
  onSelect: (item: PortfolioItem) => void;
}

export const FinderColumn = forwardRef<HTMLDivElement, FinderColumnProps>(
  function FinderColumn({ items, selectedId, openIds = [], onSelect }, ref) {
    return (
      <div className="finder-column" ref={ref}>
        <div className="column-content">
          {items.map((item) => (
            <FinderItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              isOpen={openIds.includes(item.id)}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>

        <style jsx>{`
          .finder-column {
            min-width: 280px;
            max-width: 320px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            background: var(--bg-secondary);
            border-right: 1px solid var(--border-color);
          }

          .column-content {
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
          }
        `}</style>
      </div>
    );
  }
);
