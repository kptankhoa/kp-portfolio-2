import { ComponentType, CSSProperties } from 'react';
import { ICON_PATHS } from './icon-paths';

interface IconSx {
  fontSize?: number;
  color?: string;
  opacity?: number;
}

export interface IconProps {
  sx?: IconSx;
  className?: string;
}

function createIcon(paths: string[]) {
  return function Icon({ sx, className }: IconProps) {
    const { fontSize = 24, ...style } = sx ?? {};

    return (
      <svg
        viewBox="0 0 24 24"
        width={fontSize}
        height={fontSize}
        fill="currentColor"
        style={style as CSSProperties}
        className={className}
        aria-hidden="true"
      >
        {paths.map((d) => <path key={d} d={d} />)}
      </svg>
    );
  };
}

export const FolderIcon = createIcon(ICON_PATHS.Folder);
export const FolderOpenIcon = createIcon(ICON_PATHS.FolderOpen);
export const InsertDriveFileIcon = createIcon(ICON_PATHS.InsertDriveFile);
export const AppsIcon = createIcon(ICON_PATHS.Apps);
export const LinkIcon = createIcon(ICON_PATHS.Link);
export const ImageIcon = createIcon(ICON_PATHS.Image);
export const DescriptionIcon = createIcon(ICON_PATHS.Description);
export const PictureAsPdfIcon = createIcon(ICON_PATHS.PictureAsPdf);
export const CodeIcon = createIcon(ICON_PATHS.Code);
export const TerminalIcon = createIcon(ICON_PATHS.Terminal);
export const WorkIcon = createIcon(ICON_PATHS.Work);
export const PersonIcon = createIcon(ICON_PATHS.Person);
export const EmailIcon = createIcon(ICON_PATHS.Email);
export const GitHubIcon = createIcon(ICON_PATHS.GitHub);
export const LinkedInIcon = createIcon(ICON_PATHS.LinkedIn);
export const TelegramIcon = createIcon(ICON_PATHS.Telegram);
export const WhatsAppIcon = createIcon(ICON_PATHS.WhatsApp);
export const LanguageIcon = createIcon(ICON_PATHS.Language);
export const LibraryMusicIcon = createIcon(ICON_PATHS.LibraryMusic);
export const ForumIcon = createIcon(ICON_PATHS.Forum);
export const LocalHospitalIcon = createIcon(ICON_PATHS.LocalHospital);
export const RemoveRedEyeIcon = createIcon(ICON_PATHS.RemoveRedEye);
export const DryCleaningIcon = createIcon(ICON_PATHS.DryCleaning);
export const ForestIcon = createIcon(ICON_PATHS.Forest);
export const ChevronRightIcon = createIcon(ICON_PATHS.ChevronRight);
export const ArrowBackIcon = createIcon(ICON_PATHS.ArrowBack);
export const OpenInNewIcon = createIcon(ICON_PATHS.OpenInNew);

// Icon map for portfolio items (files, apps, etc.)
export const itemIconMap: Record<string, ComponentType<IconProps>> = {
  file: InsertDriveFileIcon,
  app: AppsIcon,
  link: LinkIcon,
  image: ImageIcon,
  description: DescriptionIcon,
  pdf: PictureAsPdfIcon,
  code: CodeIcon,
  terminal: TerminalIcon,
  work: WorkIcon,
  person: PersonIcon,
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  website: LanguageIcon,
  telegram: TelegramIcon,
  music: LibraryMusicIcon,
  forum: ForumIcon,
  health: LocalHospitalIcon,
  eye: RemoveRedEyeIcon,
  fashion: DryCleaningIcon,
  eco: ForestIcon,
};

// Icon map for link buttons (social links, etc.)
export const linkIconMap: Record<string, ComponentType<IconProps>> = {
  email: EmailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  website: LanguageIcon,
  link: LinkIcon,
};
