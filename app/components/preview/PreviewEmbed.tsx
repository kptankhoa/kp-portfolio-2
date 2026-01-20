'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { linkIconMap } from '../icons';
import { PortfolioItem } from '../../data';

interface PreviewEmbedProps {
  item: PortfolioItem;
}

export function PreviewEmbed({ item }: PreviewEmbedProps) {
  const { content } = item;

  if (!content?.embed) return null;

  return (
    <div className="preview-embed">
      <div className="embed-header">
        <h1 className="embed-title">{content.title || item.name}</h1>
        {content.links && content.links.length > 0 && (
          <div className="embed-links">
            {content.links.map((link) => {
              const IconComponent = link.icon ? linkIconMap[link.icon] : null;

              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="link-button"
                >
                  {IconComponent && <IconComponent sx={{ fontSize: 18 }} />}
                  {link.label}
                  {!IconComponent && <OpenInNewIcon sx={{ fontSize: 14 }} />}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <object
        className="embed-object"
        data={content.embed}
        type="application/pdf"
      >
        <p>Unable to display PDF. <a href={content.embed} target="_blank" rel="noopener noreferrer nofollow">Download instead</a>.</p>
      </object>

      <style jsx>{`
        .preview-embed {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .embed-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
          flex-shrink: 0;
        }

        .embed-title {
          margin: 0;
          font-size: 18px;
          font-weight: 400;
          color: var(--text-primary);
        }

        .embed-links {
          display: flex;
          gap: 8px;
        }

        :global(.embed-object) {
          flex: 1;
          width: 100%;
          min-height: 0;
          border: none;
          background: var(--bg-tertiary);
        }

        .link-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--accent-dark);
          border: 1px solid var(--accent);
          border-radius: 6px;
          color: var(--accent-light);
          font-family: inherit;
          font-size: 13px;
          text-decoration: none;
          transition: all 0.15s;
        }

        .link-button:hover {
          background: var(--accent);
          color: white;
        }
      `}</style>
    </div>
  );
}
