export type { PortfolioItem } from './types';
export { summaryData } from './summary';

import { PortfolioItem } from './types';
import { projectsFolder } from './projects';
import { aboutMeFolder } from './about-me';
import { experienceFolder } from './experience';
import { imagesFolder } from './images';
import { linksFile } from './links';

export { projectsFolder, aboutMeFolder, experienceFolder, imagesFolder, linksFile };

export const portfolioData: PortfolioItem[] = [
  aboutMeFolder,
  // experienceFolder,
  // projectsFolder,
  imagesFolder,
  linksFile,
];
