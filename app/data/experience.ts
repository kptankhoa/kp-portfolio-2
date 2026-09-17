import { PortfolioItem } from './types';

// ============================================
// CodeLink (2024 - Present)
// ============================================

const codelinkAbout: PortfolioItem = {
  id: 'codelink-about',
  name: 'about.txt',
  type: 'file',
  icon: 'description',
  content: {
    title: 'CodeLink',
    subtitle: 'Software Development Company',
    image: '/codelink.png',
    description: `CodeLink is a software development company specializing in building innovative digital solutions.

    Working here since 2024.`,
    links: [
      { label: 'Website', url: 'https://codelink.io', icon: 'website' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/codelink.io', icon: 'linkedin' },
    ],
  },
};

const onpremProject: PortfolioItem = {
  id: 'onprem-project',
  name: 'OnPrem DAM',
  type: 'app',
  icon: 'fashion',
  content: {
    title: 'OnPrem DAM',
    subtitle: 'Digital Asset Management System for PVH Corp',
    description: `Maintaining a Digital Asset Management system built on Nuxeo for PVH Corp (Calvin Klein, Tommy Hilfiger).

Key responsibilities:
• Building listeners and automation for data handling, including custom image renditions via ImageMagick
• Diagnosed a stuck-batch failure that was silently blocking the automated processing pipeline, and shipped a retry-safe fix
• Building ad-hoc tooling to bulk resync data on client request
• Building custom workflows and metadata using Nuxeo Studio
• Keeping the system stable and fast for global marketing and e-commerce teams`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['Nuxeo', 'Java', 'Docker', 'Elasticsearch', 'React'],
      },
    ],
  },
};

const carmaProject: PortfolioItem = {
  id: 'carma-project',
  name: 'Carma',
  type: 'app',
  icon: 'eco',
  content: {
    title: 'Carma Earth',
    subtitle: 'Landing Page for Climate Action Platform',
    description: `Building a new landing page for Carma Earth, a B Corp certified sustainability platform that helps businesses offset their carbon footprint.

Carma enables companies to fund reforestation projects in the UK, Kenya, Brazil, and USA, as well as kelp restoration in Canada. They also support UK veterans through tree planting programs.

Key responsibilities:
• Independently built most of the new 10+ page site, including reusable components and GraphQL-backed content
• Implementing SEO metadata and structured tags per provided specs`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['Next.js', 'shadcn/ui', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      },
    ],
  },
};

const balProject: PortfolioItem = {
  id: 'bal-project',
  name: 'BAL',
  type: 'app',
  icon: 'work',
  content: {
    title: 'BAL Case Management',
    subtitle: 'Immigration Case Handling Platform',
    description: `Maintaining the UI for BAL's (Berry Appleman & Leiden) case management system, which handles immigration cases for corporate clients worldwide.

Key responsibilities:
• Shipping new case-handling flows, including a virtual credit card payment flow and a draft I-94 document flow
• Working across a legacy AngularJS and modern React frontend, integrated with .NET APIs on AWS
• As the sole offshore engineer on a 6-7 person team, routinely surfacing and triaging issues ahead of the US client's working day
• Onboarding newly joined in-house engineers on the codebase and debugging workflow`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['React', 'AngularJS', '.NET', 'AWS', 'Microsoft SQL Server'],
      },
    ],
  },
};

const codelinkCompany: PortfolioItem = {
  id: 'company-codelink',
  name: 'CodeLink (2024 - Present)',
  subtitle: 'Full Stack Developer',
  type: 'folder',
  folderImage: '/codelink.png',
  children: [codelinkAbout, balProject, carmaProject, onpremProject],
};

// ============================================
// VinBrain (2021 - 2024)
// ============================================

const vinbrainAbout: PortfolioItem = {
  id: 'vinbrain-about',
  name: 'about.txt',
  type: 'file',
  icon: 'description',
  content: {
    title: 'VinBrain',
    subtitle: 'AI Healthcare Company',
    image: '/vinbrain.png',
    description: `VinBrain was a subsidiary of Vingroup, focusing on AI-powered healthcare solutions.
    In December 2024, VinBrain was acquired by NVIDIA and now serves as the foundation for NVIDIA's AI research and development center in Vietnam.
    
    Worked here from 2021 to 2024.`,
    links: [
      { label: 'Website', url: 'https://vinbrain.net', icon: 'website' },
      { label: 'LinkedIn', url: 'https://linkedin.com/company/vinbrain', icon: 'linkedin' },
    ],
  },
};

const senmeProject: PortfolioItem = {
  id: 'senme-project',
  name: 'SenMe',
  type: 'app',
  icon: 'health',
  content: {
    title: 'SenMe',
    subtitle: 'AI-Powered Telehealth & Chatbot Platform',
    description: `SenMe (formerly AIviCare) is an AI-driven telehealth and chatbot platform designed to transform healthcare delivery.

Key features include:
• Analysis of laboratory test results, medical reports, and electronic health records for precision care insights
• AI chatbot integration to assist medical professionals and patients with digital healthcare management
• Support for hospital management and professional clinical activities

The platform was deployed at major institutions including the 108 Military Central Hospital in Vietnam, accelerating digital transformation in healthcare. Built using NVIDIA's accelerated computing resources and integrated into VinBrain's broader AI product ecosystem alongside DrAid.

My contributions:
• Identified that REST polling caused noticeable wait time in the chatbot's chat flow; proposed and built a WebSocket-based streaming solution, parsing incrementally-returned responses to render smooth real-time chat animations
• Built doctor-facing web features and backend services with Java Spring and PostgreSQL`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['ChatGPT', 'JavaSpring', 'PostgreSQL', 'Docker', 'React', 'Redux', 'Firebase'],
      },
    ],
  },
};

const draidProject: PortfolioItem = {
  id: 'draid-project',
  name: 'DrAid',
  type: 'app',
  icon: 'eye',
  content: {
    title: 'DrAid',
    subtitle: 'AI-Powered Medical Imaging Platform',
    description: `DrAid is an AI-powered platform that assists radiologists in diagnosing diseases from medical images including X-rays, CT scans, and MRIs. It became the first AI medical device from Southeast Asia to receive FDA 510(k) clearance.

Key products include:
• DrAid Chest XR: Screens for 52 chest abnormalities with 91% accuracy, providing automated triage and prioritization
• DrAid Liver Cancer CT: Oncology tool for segmentation and classification of liver lesions with LI-RADS classification
• DrAid AI PACS Cloud: Cloud-based storage and workflow solution for remote access to medical records

The platform is used by nearly 2,000 doctors across 100+ hospitals including facilities in the U.S., Vietnam, and Myanmar. Strategic partnerships with Stanford University, Microsoft Azure, and NVIDIA helped reduce image interpretation time by up to 30%.

My contribution: worked on the doctor-facing frontend alongside the wider DrAid team.`,
    tagSections: [
      {
        title: 'Technologies',
        tags: ['JavaSpring', 'PostgreSQL', 'Docker', 'React', 'Redux'],
      },
    ],
  },
};

const vinbrainCompany: PortfolioItem = {
  id: 'company-vinbrain',
  name: 'VinBrain (2021 - 2024)',
  subtitle: 'Software Engineer',
  type: 'folder',
  folderImage: '/vinbrain.png',
  children: [vinbrainAbout, senmeProject, draidProject],
};

// ============================================
// Experience Folder (exported)
// ============================================

export const experienceFolder: PortfolioItem = {
  id: 'experience',
  name: 'experience',
  type: 'folder',
  children: [codelinkCompany, vinbrainCompany],
};
