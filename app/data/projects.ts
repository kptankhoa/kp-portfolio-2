import { PortfolioItem } from './types';

export const projectsFolder: PortfolioItem = {
  id: 'projects',
  name: 'projects',
  type: 'folder',
  children: [
    {
      id: 'project-1',
      name: 'E-Commerce Platform',
      type: 'app',
      icon: 'website',
      content: {
        title: 'E-Commerce Platform',
        subtitle: 'Full-stack web application',
        description: `A modern e-commerce platform built with Next.js and Stripe.
Features include real-time inventory, user authentication,
and a seamless checkout experience.`,
        tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        links: [
          { label: 'View Live', url: 'https://example.com', icon: 'website' },
          { label: 'GitHub', url: 'https://github.com', icon: 'github' },
        ],
      },
    },
    {
      id: 'project-2',
      name: 'Task Management App',
      type: 'app',
      icon: 'app',
      content: {
        title: 'Task Management App',
        subtitle: 'Productivity tool',
        description: `A collaborative task management application with real-time
updates, drag-and-drop functionality, and team workspaces.`,
        tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        links: [
          { label: 'View Live', url: 'https://example.com', icon: 'website' },
          { label: 'GitHub', url: 'https://github.com', icon: 'github' },
        ],
      },
    },
    {
      id: 'project-3',
      name: 'AI Image Generator',
      type: 'app',
      icon: 'terminal',
      content: {
        title: 'AI Image Generator',
        subtitle: 'Machine learning project',
        description: `An AI-powered image generation tool using stable diffusion
models. Features custom model training and style transfer.`,
        tags: ['Python', 'PyTorch', 'FastAPI', 'React'],
        links: [
          { label: 'View Demo', url: 'https://example.com', icon: 'website' },
          { label: 'GitHub', url: 'https://github.com', icon: 'github' },
        ],
      },
    },
  ],
};
