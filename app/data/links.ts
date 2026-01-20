import { PortfolioItem } from './types';

export const linksFile: PortfolioItem = {
  id: 'links',
  name: 'links.txt',
  type: 'file',
  icon: 'link',
  content: {
    title: 'Connect with me',
    description: 'Find me on these platforms\nMy email: me@kptankhoa.dev',
    links: [
      { label: 'Email', url: 'mailto:me@kptankhoa.dev', icon: 'email' },
      { label: 'GitHub', url: 'https://github.com/kptankhoa', icon: 'github' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/kptankhoa', icon: 'linkedin' },
      { label: 'Telegram', url: 'https://t.me/kptankhoa', icon: 'telegram' },
      { label: 'WhatsApp', url: 'https://wa.link/1scboo', icon: 'whatsapp' },
    ],
  },
};
