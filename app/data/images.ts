import { PortfolioItem } from './types';
import { summaryData } from './summary';

const avatarImage: PortfolioItem = {
  id: 'avatar',
  name: 'avatar.jpg',
  type: 'image',
  content: {
    title: 'Profile Photo',
    previewImage: summaryData.img,
  },
};

const vinbrainImage: PortfolioItem = {
  id: 'vinbrain-logo',
  name: 'vinbrain.png',
  type: 'image',
  content: {
    title: 'VinBrain Logo',
    previewImage: '/vinbrain.png',
  },
};

const codelinkImage: PortfolioItem = {
  id: 'codelink-logo',
  name: 'codelink.png',
  type: 'image',
  content: {
    title: 'CodeLink Logo',
    previewImage: '/codelink.png',
  },
};

export const imagesFolder: PortfolioItem = {
  id: 'images',
  name: 'images',
  type: 'folder',
  children: [avatarImage, vinbrainImage, codelinkImage],
};
