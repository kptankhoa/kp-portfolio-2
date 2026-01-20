'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { linkIconMap } from '../icons';
import { PortfolioItem } from '../../data';
import { PreviewIcon } from './PreviewIcon';

interface PreviewContentProps {
  item: PortfolioItem;
}

export function PreviewContent({ item }: PreviewContentProps) {
  const { content } = item;

  if (!content) return null;

  return (
    <div className="preview-content">
      <div className="preview-header">
        <div className="preview-icon">
          {content.image ? (
            <img
              src={content.image}
              alt={content.title || item.name}
              className="header-image"
            />
          ) : (
            <PreviewIcon type={item.type} customIcon={item.icon} />
          )}
        </div>
        <div className="preview-titles">
          <h1 className="preview-title">{content.title || item.name}</h1>
          {content.subtitle && (
            <p className="preview-subtitle">{content.subtitle}</p>
          )}
        </div>
      </div>

      {content.previewImage && (
        <div className="preview-section image-section">
          <img
            src={content.previewImage}
            alt={content.title || item.name}
            className="preview-image"
          />
        </div>
      )}

      {content.description && (
        <div className="preview-section">
          <p className="preview-description">{content.description}</p>
        </div>
      )}

      {content.tags && content.tags.length > 0 && (
        <div className="preview-section">
          <h3 className="section-title">Technologies</h3>
          <div className="tags">
            {content.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {content.links && content.links.length > 0 && (
        <div className="preview-section">
          <div className="links">
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
        </div>
      )}

      <style jsx>{`
        .preview-content {
          padding: 24px;
          padding-right: 40px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .preview-icon {
          flex-shrink: 0;
          color: var(--accent-light);
        }

        :global(.header-image) {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 8px;
        }

        .preview-titles {
          flex: 1;
          min-width: 0;
        }

        .preview-title {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .preview-subtitle {
          margin: 0;
          font-size: 16px;
          color: var(--accent);
        }

        .preview-section {
          margin-bottom: 28px;
        }

        .image-section {
          display: flex;
          justify-content: center;
        }

        .preview-image {
          max-width: 100%;
          max-height: 400px;
          object-fit: contain;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .section-title {
          margin: 0 0 12px 0;
          font-size: 11px;
          font-weight: 400;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .preview-description {
          margin: 0;
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-secondary);
          white-space: pre-line;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          padding: 6px 14px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
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

        @media (max-width: 768px) {
          .preview-content {
            padding: 24px;
          }

          .preview-header {
            flex-direction: column;
            gap: 16px;
          }

          .preview-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
