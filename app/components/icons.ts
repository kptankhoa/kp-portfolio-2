import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AppsIcon from '@mui/icons-material/Apps';
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';

// Icon map for portfolio items (files, apps, etc.)
export const itemIconMap: Record<string, React.ComponentType<{ sx?: object }>> = {
  file: InsertDriveFileIcon,
  app: AppsIcon,
  link: LinkIcon,
  image: ImageIcon,
  description: DescriptionIcon,
  pdf: PictureAsPdfIcon,
  code: CodeIcon,
  terminal: TerminalIcon,
  work: WorkIcon,
  business: BusinessIcon,
  school: SchoolIcon,
  person: PersonIcon,
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  website: LanguageIcon,
  settings: SettingsIcon,
  build: BuildIcon,
  storage: StorageIcon,
  cloud: CloudIcon,
};

// Icon map for link buttons (social links, etc.)
export const linkIconMap: Record<string, React.ComponentType<{ sx?: object }>> = {
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  twitter: TwitterIcon,
  website: LanguageIcon,
  link: LinkIcon,
};

// Export commonly used icons for direct use
export {
  FolderIcon,
  FolderOpenIcon,
  InsertDriveFileIcon,
  AppsIcon,
  LinkIcon,
  ImageIcon,
};
