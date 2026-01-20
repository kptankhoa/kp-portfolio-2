'use client';

import { FolderOpenIcon } from '../icons';

export function PreviewEmpty() {
  return (
    <div className="preview-pane empty">
      <div className="empty-state">
        <FolderOpenIcon sx={{ fontSize: 80, opacity: 0.15 }} />
        <p>Select an item to preview</p>
      </div>

      <style jsx>{`
        .preview-pane {
          flex: 1;
          min-width: 300px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .preview-pane.empty {
          justify-content: center;
          align-items: center;
        }

        .empty-state {
          text-align: center;
          color: var(--text-muted);
        }

        .empty-state p {
          margin: 16px 0 0;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .preview-pane {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
