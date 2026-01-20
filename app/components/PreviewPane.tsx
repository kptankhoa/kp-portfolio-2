'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  FolderIcon,
  FolderOpenIcon,
  InsertDriveFileIcon,
  AppsIcon,
  LinkIcon,
  ImageIcon,
  itemIconMap,
  linkIconMap,
} from './icons';
import { PortfolioItem } from '../data';

interface PreviewPaneProps {
  item: PortfolioItem | null;
  isMobileFullscreen?: boolean;
  onMobileBack?: () => void;
}

export function PreviewPane({ item, isMobileFullscreen, onMobileBack }: PreviewPaneProps) {
  if (!item || !item.content) {
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
            font-size: 14px;
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

  const { content } = item;

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
        {content.embed ? (
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
          </div>
        ) : (
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
        </div>
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
          overflow-y: auto;
          border-radius: 8px;
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
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .back-button:hover {
          opacity: 0.8;
        }

        .preview-content {
          padding: 24px;
          padding-right: 40px;
        }

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
          font-size: 14px;
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
          font-size: 14px;
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

        /* Mobile fullscreen preview */
        @media (max-width: 768px) {
          .preview-pane {
            display: none;
            position: absolute;
            inset: 0;
            z-index: 10;
            padding: 8px;
          }

          .preview-pane.mobile-fullscreen {
            display: flex;
          }

          .preview-scroll-wrapper {
            border-radius: 4px;
          }

          .mobile-header {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            background: var(--bg-secondary);
          }

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

function PreviewIcon({ type, customIcon }: { type: PortfolioItem['type']; customIcon?: string }) {
  const iconStyle = { fontSize: 40 };

  // Folders always use folder icon
  if (type === 'folder') {
    return <FolderIcon sx={iconStyle} />;
  }

  // Use custom icon if specified
  if (customIcon && itemIconMap[customIcon]) {
    const CustomIcon = itemIconMap[customIcon];

    return <CustomIcon sx={iconStyle} />;
  }

  // Fall back to type-based icons
  switch (type) {
  case 'app':
    return <AppsIcon sx={iconStyle} />;
  case 'link':
    return <LinkIcon sx={iconStyle} />;
  case 'image':
    return <ImageIcon sx={iconStyle} />;
  default:
    return <InsertDriveFileIcon sx={iconStyle} />;
  }
}
