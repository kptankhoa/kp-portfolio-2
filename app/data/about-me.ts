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
    description: `My email: ${summaryData.email}\nFind me on these platforms:`,
    links: [
      { label: 'Email', url: `mailto:${summaryData.email}`, icon: 'email' },
      { label: 'GitHub', url: summaryData.socialLinks.github, icon: 'github' },
      { label: 'LinkedIn', url: summaryData.socialLinks.linkedin, icon: 'linkedin' },
      { label: 'Telegram', url: summaryData.socialLinks.telegram, icon: 'telegram' },
      { label: 'WhatsApp', url: summaryData.socialLinks.whatsapp, icon: 'whatsapp' },
    ],
  },
};

export const aboutMeFolder: PortfolioItem = {
  id: 'about-me',
  name: 'about me',
  type: 'folder',
  children: [bioFile, skillsFile, resumeFile, linksFile],
};
