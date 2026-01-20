import { PortfolioItem } from './types';

// ============================================
// Tech Corp - Projects
// ============================================

const techCorpAbout: PortfolioItem = {
  id: 'tech-corp-about',
  name: 'about.txt',
  type: 'file',
  icon: 'description',
  content: {
    title: 'Tech Corp',
    subtitle: 'Enterprise Software Company',
    description: `A leading provider of enterprise SaaS solutions, helping businesses streamline their operations with cutting-edge technology.

Worked here from 2021 to present, progressing from DevOps Engineer to Senior Developer.`,
    links: [
      { label: 'Website', url: 'https://techcorp.example.com', icon: 'website' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/techcorp', icon: 'linkedin' },
    ],
  },
};

const techCorpSaasPlatform: PortfolioItem = {
  id: 'tech-corp-saas-platform',
  name: 'Enterprise SaaS Platform',
  type: 'file',
  icon: 'app',
  content: {
    title: 'Enterprise SaaS Platform',
    subtitle: 'Senior Developer • 2022 - Present',
    description: `Leading frontend development for enterprise SaaS products.
Architecting scalable React applications and mentoring junior developers.
Implemented CI/CD pipelines reducing deployment time by 60%.`,
    tags: ['React', 'TypeScript', 'AWS', 'Leadership'],
  },
};

const techCorpInfra: PortfolioItem = {
  id: 'tech-corp-infra',
  name: 'Cloud Infrastructure',
  type: 'file',
  icon: 'cloud',
  content: {
    title: 'Cloud Infrastructure',
    subtitle: 'DevOps Engineer • 2021 - 2022',
    description: `Set up and maintained CI/CD infrastructure.
Migrated legacy systems to containerized architecture.
Reduced infrastructure costs by 40% through optimization.`,
    tags: ['Docker', 'Kubernetes', 'Terraform', 'AWS'],
  },
};

const techCorpCompany: PortfolioItem = {
  id: 'company-tech-corp',
  name: 'Tech Corp (2021 - Present)',
  type: 'folder',
  icon: 'business',
  children: [techCorpAbout, techCorpSaasPlatform, techCorpInfra],
};

// ============================================
// Startup Inc - Projects
// ============================================

const startupAbout: PortfolioItem = {
  id: 'startup-about',
  name: 'about.txt',
  type: 'file',
  icon: 'description',
  content: {
    title: 'Startup Inc',
    subtitle: 'Innovative Tech Startup',
    description: `A fast-growing startup focused on building innovative digital products. 

Joined as an early team member and contributed to building the core platform from the ground up.`,
    links: [
      { label: 'Website', url: 'https://startupinc.example.com', icon: 'website' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/startupinc', icon: 'linkedin' },
    ],
  },
};

const startupCorePlatform: PortfolioItem = {
  id: 'startup-core-platform',
  name: 'Core Platform',
  type: 'file',
  icon: 'code',
  content: {
    title: 'Core Platform',
    subtitle: 'Full Stack Developer • 2020 - 2021',
    description: `Built core platform features from ground up.
Developed RESTful APIs serving 100k+ daily requests.
Collaborated with design team to implement pixel-perfect UIs.`,
    tags: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
  },
};

const startupCompany: PortfolioItem = {
  id: 'company-startup-inc',
  name: 'Startup Inc (2020 - 2021)',
  type: 'folder',
  icon: 'business',
  children: [startupAbout, startupCorePlatform],
};

// ============================================
// Experience Folder (exported)
// ============================================

export const experienceFolder: PortfolioItem = {
  id: 'experience',
  name: 'experience',
  type: 'folder',
  children: [techCorpCompany, startupCompany],
};
