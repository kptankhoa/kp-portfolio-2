export interface PortfolioItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'app' | 'image' | 'link';
  icon?: string;
  children?: PortfolioItem[];
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    links?: { label: string; url: string; icon?: string }[];
    tags?: string[];
    image?: string;
    embed?: string; // URL for embedded content (e.g., PDF)
  };
}
