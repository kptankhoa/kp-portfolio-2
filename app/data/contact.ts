import { PortfolioItem } from './types';
import { summaryData } from './summary';

export const contactFile: PortfolioItem = {
  id: 'contact',
  name: 'contact.txt',
  type: 'file',
  icon: 'link',
  content: {
    title: 'Connect with me',
    description: `My email: ${summaryData.email}\nFind me on these platforms:`,
    links: [
      { label: 'Email', url: `mailto:${summaryData.email}`, icon: 'email' },
      { label: 'GitHub', url: summaryData.socialLinks.github, icon: 'github' },
      { label: 'LinkedIn', url: summaryData.socialLinks.linkedin, icon: 'linkedin' },
      { label: 'Telegram', url: summaryData.socialLinks.telegram, icon: 'telegram' },
    ],
  },
};
