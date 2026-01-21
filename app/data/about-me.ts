import { PortfolioItem } from './types';
import { summaryData } from './summary';

const bioFile: PortfolioItem = {
  id: 'bio',
  name: 'bio.txt',
  type: 'file',
  icon: 'person',
  content: {
    title: `Hello, I'm ${summaryData.firstName} ${summaryData.lastName}`,
    subtitle: summaryData.label,
    description: summaryData.description,
  },
};

const skillsFile: PortfolioItem = {
  id: 'skills',
  name: 'skills.txt',
  type: 'file',
  icon: 'code',
  content: {
    title: 'Technical Skills',
    tagSections: [
      {
        title: 'Languages',
        tags: ['JavaScript', 'TypeScript', 'Java', 'SQL'],
      },
      {
        title: 'Frontend',
        tags: ['React', 'Next.js', 'HTML/CSS', 'Tailwind', 'shadcn/ui'],
      },
      {
        title: 'Backend',
        tags: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs'],
      },
      {
        title: 'Databases',
        tags: ['PostgreSQL', 'MongoDB'],
      },
      {
        title: 'DevOps & Tools',
        tags: ['AWS', 'Docker', 'Git', 'CI/CD', 'Linux'],
      },
    ],
  },
};

const resumeFile: PortfolioItem = {
  id: 'resume',
  name: 'resume.pdf',
  type: 'file',
  icon: 'pdf',
  content: {
    title: 'Resume',
    embed: summaryData.resumeFileUrl,
    links: [
      { label: 'Download PDF', url: summaryData.resumeFileUrl },
    ],
  },
};

const linksFile: PortfolioItem = {
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

export const aboutMeFolder: PortfolioItem = {
  id: 'about-me',
  name: 'about me',
  type: 'folder',
  children: [bioFile, skillsFile, resumeFile, linksFile],
};
