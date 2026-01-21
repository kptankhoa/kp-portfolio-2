'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PortfolioItem } from '../../data';
import { PreviewEmpty } from './PreviewEmpty';
import { PreviewEmbed } from './PreviewEmbed';
import { PreviewContent } from './PreviewContent';

interface PreviewPaneProps {
  item: PortfolioItem | null;
  isMobileFullscreen?: boolean;
  onMobileBack?: () => void;
}

export function PreviewPane({ item, isMobileFullscreen, onMobileBack }: PreviewPaneProps) {
  if (!item || !item.content) {
    return <PreviewEmpty />;
  }

  const { content } = item;
  const isEmbed = !!content.embed;

  return (
    <div className={`preview-pane ${isMobileFullscreen ? 'mobile-fullscreen' : ''}`}>
      {isMobileFullscreen && (
        <div className="mobile-header">
          <button className="back-button" onClick={onMobileBack}>
            <ArrowBackIcon sx={{ fontSize: 20 }} />
            <span>Back</span>
          </button>
        </div>
      )}

      <div className="preview-scroll-wrapper">
        {isEmbed ? (
          <PreviewEmbed item={item} />
        ) : (
          <PreviewContent item={item} />
        )}
      </div>

      <style jsx>{`
        .preview-pane {
          flex: 1 0 400px;
          min-width: 400px;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          padding: 16px;
          padding-right: 0;
        }

        .preview-scroll-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          border-radius: 8px;
          min-height: 0;
        }

        .mobile-header {
          display: none;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: var(--accent-light);
          font-family: inherit;
          font-size: 16px;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .back-button:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .preview-pane {
            display: none;
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 8px;
            width: 100%;
            min-width: unset;
            flex: unset;
          }

          .preview-pane.mobile-fullscreen {
            display: flex;
          }

          .preview-scroll-wrapper {
            border-radius: 4px;
            align-items: center;
          }

          .mobile-header {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            background: var(--bg-secondary);
          }
        }
      `}</style>
    </div>
  );
}
