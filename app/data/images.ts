import { PortfolioItem } from './types';
import { summaryData } from './summary';

export const imagesFolder: PortfolioItem = {
  id: 'images',
  name: 'images',
  type: 'folder',
  children: [
    {
      id: 'avatar',
      name: 'avatar.jpg',
      type: 'image',
      content: {
        title: 'Profile Photo',
        image: summaryData.img,
      },
    },
  ],
};
