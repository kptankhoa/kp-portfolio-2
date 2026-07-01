import { PortfolioItem } from './types';

const chatProject: PortfolioItem = {
  id: 'chat-project',
  name: 'Chat App (2021)',
  type: 'app',
  icon: 'forum',
  content: {
    title: 'Chat App',
    subtitle: 'Chat application with React and JavaScript',
    description: `A chat application built with React and JavaScript.
Features include real-time messaging, user authentication, and a seamless chat experience.`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['React', 'JavaScript', 'Firebase', 'Firestore'],
      },
    ],
    links: [
      { label: 'View Live', url: 'https://some-chat-app-c9d35.web.app/', icon: 'website' },
      { label: 'GitHub', url: 'https://github.com/kptankhoa/some-chat-app', icon: 'github' },
    ],
  },
};

const jobProject: PortfolioItem = {
  id: 'job-project',
  name: 'Job App (2023)',
  type: 'app',
  icon: 'work',
  content: {
    title: 'Job Service',
    subtitle: 'Job application with React and Typescript on Frontend and Typescript on Backend',
    description: `A job application built with React and Typescript on Frontend and Typescript on Backend.
PostgreSQL for database and Knex as ORM. OpenAPI for endpoint documentation.`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['React', 'Typescript', 'Knex', 'PostgreSQL', 'OpenAPI'],
      },
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/kptankhoa/job_service', icon: 'github' },
      { label: 'Frontend', url: 'https://github.com/kptankhoa/job_web', icon: 'github' },
    ],
  },
};

const telegramChatbotProject: PortfolioItem = {
  id: 'telegram-chatbot',
  name: 'ChatGPT Telegram Bot (2023)',
  type: 'app',
  icon: 'telegram',
  content: {
    title: 'ChatGPT Telegram Chatbot',
    subtitle: 'A Telegram chatbot using ChatGPT to generate responses',
    description: 'A Telegram chatbot powered by ChatGPT with multiple customizable characters stored in Firestore, chat history, remote configuration via Firebase, image generation with Bing Image Creator, article summarization, weather forecasts, and context dictionary features. Designed the code structure, data architecture, and prompts.',
    tagSections: [
      {
        title: 'Technologies',
        tags: ['ChatGPT', 'Telegram Bot API', 'Firestore'],
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/kptankhoa/pengy_bot', icon: 'github' },
    ],
  },
};

const kpotifyProject: PortfolioItem = {
  id: 'kpotify',
  name: 'Kpotify (2021)',
  type: 'app',
  icon: 'music',
  content: {
    title: 'Kpotify',
    subtitle: 'Spotify playlist and playback viewer built with React',
    description: 'A frontend React application that integrates with Spotify API to fetch and display users\' playlist data and song playback information.',
    tagSections: [
      {
        title: 'Technologies',
        tags: ['React', 'Spotify API', 'Node.js', 'Express.js'],
      },
    ],
    links: [
      { label: 'Auth service', url: 'https://github.com/kptankhoa/kpotify-server', icon: 'github' },
      { label: 'Web client', url: 'https://github.com/kptankhoa/kpotify-client', icon: 'github' },
    ],
  },
};

const unniqloDiscountDetectBotProject: PortfolioItem = {
  id: 'unniqlo-discount-detect-bot',
  name: 'Uniqlo Discount Detect Bot (2026)',
  type: 'app',
  icon: 'fashion',
  content: {
    title: 'Uniqlo Discount Detect Bot',
    subtitle: 'Telegram chatbot to track discounts on Uniqlo products',
    description: 'A Telegram chatbot to track discounts on Uniqlo products, or when out-of-stock products are restocked.',
    tagSections: [
      {
        title: 'Technologies',
        tags: ['Go', 'Telegram Bot API', 'Firestore'],
      },
    ],
    links: [
      { label: 'Telegram Bot', url: 'https://t.me/discount_detect_bot', icon: 'telegram' },
      { label: 'GitHub', url: 'https://github.com/kptankhoa/discount-detect', icon: 'github' },
    ],
  },
};

const trainingLogProject: PortfolioItem = {
  id: 'training-log',
  name: 'Training Log (2026)',
  type: 'app',
  icon: 'health',
  content: {
    title: 'Training Log',
    subtitle: 'Personal fitness tracker with calendar view and training notes',
    description: 'A mobile-friendly web app to track daily training sessions. Features a monthly calendar with color-coded training tags, a day log for notes and PRs, multi-note notepad with markdown support, and tag management. Built with SvelteKit and Firebase.',
    tagSections: [
      {
        title: 'Technologies',
        tags: ['SvelteKit', 'TypeScript', 'Firebase', 'Firestore', 'Tailwind CSS', 'Cloudflare Pages'],
      },
    ],
    links: [
      { label: 'View Live', url: 'https://training-log.pages.dev/', icon: 'website' },
      { label: 'GitHub', url: 'https://github.com/kptankhoa/training-log', icon: 'github' },
    ],
  },
};

export const projectsFolder: PortfolioItem = {
  id: 'projects',
  name: 'projects',
  type: 'folder',
  children: [
    trainingLogProject,
    unniqloDiscountDetectBotProject,
    telegramChatbotProject,
    jobProject,
    chatProject,
    kpotifyProject,
  ],
};
