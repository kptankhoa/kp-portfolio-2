export type { PortfolioItem } from './types';
export { summaryData } from './summary';

import { PortfolioItem } from './types';
import { projectsFolder } from './projects';
import { aboutMeFolder } from './about-me';
import { experienceFolder } from './experience';
import { contactFile } from './contact';

const terminalApp: PortfolioItem = {
  id: 'terminal',
  name: 'terminal.app',
  type: 'app',
  icon: 'terminal',
};

export const portfolioData: PortfolioItem[] = [
  aboutMeFolder,
  experienceFolder,
  projectsFolder,
  contactFile,
  terminalApp,
];
