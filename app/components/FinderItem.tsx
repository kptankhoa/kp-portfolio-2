'use client';

import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  FolderIcon,
  FolderOpenIcon,
  InsertDriveFileIcon,
  AppsIcon,
  LinkIcon,
  ImageIcon,
  itemIconMap,
} from './icons';
import { PortfolioItem } from '../data';

interface FinderItemProps {
  item: PortfolioItem;
  isSelected: boolean;
  isOpen?: boolean;
  onClick: () => void;
}

export function FinderItem({ item, isSelected, isOpen = false, onClick }: FinderItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <button
      className={`finder-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="item-icon">
        {item.folderImage ? (
          <Image
            src={item.folderImage}
            alt={item.name}
            width={20}
            height={20}
            className="folder-image"
          />
        ) : (
          <ItemIcon
            type={item.type}
            customIcon={item.icon}
            isOpen={isOpen && item.type === 'folder'}
          />
        )}
      </span>
      <span className="item-titles">
        <span className="item-name">{item.name}</span>
        {item.subtitle && (
          <span
            className="item-subtitle"
            style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--text-secondary, #888)',
              marginTop: '2px',
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            {item.subtitle}
          </span>
        )}
      </span>
      {hasChildren && (
        <span className="item-arrow">
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        </span>
      )}

      <style jsx>{`
        .finder-item {
          display: flex;
          align-items: center;
          width: calc(100% - 16px);
          margin: 2px 8px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
        }

        .finder-item:hover {
          background: var(--bg-tertiary);
        }

        .finder-item.selected {
          background: var(--accent-dark);
          color: var(--accent-light);
        }

        .item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin-right: 12px;
          flex-shrink: 0;
        }

        :global(.folder-image) {
          border-radius: 4px;
          object-fit: contain;
        }

        .item-titles {
          flex: 1;
        }

        .item-name {
          display: block;
          white-space: nowrap;
        }

        .item-arrow {
          display: flex;
          align-items: center;
          opacity: 0.4;
          margin-left: 8px;
        }

        .finder-item.selected .item-arrow {
          opacity: 0.8;
        }
      `}</style>
    </button>
  );
}

interface ItemIconProps {
  type: PortfolioItem['type'];
  customIcon?: string;
  isOpen: boolean;
}

function ItemIcon({ type, customIcon, isOpen }: ItemIconProps) {
  const iconStyle = { fontSize: 20, color: 'inherit', opacity: 0.7 };
  const folderStyle = { ...iconStyle, color: 'var(--accent-light)' };

  // For folders: use custom icon if specified, otherwise folder icons
  if (type === 'folder') {
    if (customIcon && itemIconMap[customIcon]) {
      const CustomIcon = itemIconMap[customIcon];
      return <CustomIcon sx={folderStyle} />;
    }
    return isOpen
      ? <FolderOpenIcon sx={folderStyle} />
      : <FolderIcon sx={folderStyle} />;
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
