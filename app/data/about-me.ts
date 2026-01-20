import { PortfolioItem } from './types';
import { summaryData } from './summary';

export const aboutMeFolder: PortfolioItem = {
  id: 'about-me',
  name: 'about me',
  type: 'folder',
  children: [
    {
      id: 'bio',
      name: 'bio.txt',
      type: 'file',
      icon: 'person',
      content: {
        title: `Hello, I'm ${summaryData.firstName} ${summaryData.lastName}`,
        subtitle: summaryData.label,
        description: summaryData.description,
      },
    },
    {
      id: 'skills',
      name: 'skills.txt',
      type: 'file',
      icon: 'code',
      content: {
        title: 'Technical Skills',
        tags: [
          'TypeScript', 'Java', 'React', 'Next.js', 'Node.js',
          'PostgreSQL', 'MongoDB',
          'AWS', 'Docker', 'Git', 'GraphQL',
        ],
      },
    },
    {
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
    },
  ],
};
