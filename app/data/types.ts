export interface TagSection {
  title: string;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  name: string;
  subtitle?: string;
  type: 'folder' | 'file' | 'app' | 'image';
  icon?: string;
  folderImage?: string; // Custom image for folder (e.g., company logo)
  children?: PortfolioItem[];
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    links?: { label: string; url: string; icon?: string }[];
    tagSections?: TagSection[]; // Categorized tags
    image?: string; // Header image (e.g., company logo)
    previewImage?: string; // Large preview image
    embed?: string; // URL for embedded content (e.g., PDF)
  };
}
