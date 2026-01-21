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
  name: 'Telegram Chatbot (2023)',
  type: 'app',
  icon: 'telegram',
  content: {
    title: 'Telegram Chatbot',
    subtitle: 'A Telegram chatbot using ChatGPT to generate responses',
    description: `A Telegram chatbot powered by ChatGPT with multiple customizable characters stored in Firestore, chat history, remote configuration via Firebase, image generation with Bing Image Creator, article summarization, weather forecasts, and context dictionary features. Designed the code structure, data architecture, and prompts.`,
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
    description: `A frontend React application that integrates with Spotify API to fetch and display users' playlist data and song playback information.`,
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

export const projectsFolder: PortfolioItem = {
  id: 'projects',
  name: 'projects',
  type: 'folder',
  children: [
    telegramChatbotProject,
    jobProject,
    chatProject,
    kpotifyProject,
  ],
};
