'use client';

import {
  FolderIcon,
  InsertDriveFileIcon,
  AppsIcon,
  LinkIcon,
  ImageIcon,
  itemIconMap,
} from '../icons';
import { PortfolioItem } from '../../data';

interface PreviewIconProps {
  type: PortfolioItem['type'];
  customIcon?: string;
}

export function PreviewIcon({ type, customIcon }: PreviewIconProps) {
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
