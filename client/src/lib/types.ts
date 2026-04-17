// CraftCV — Core Data Types

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Contact {
  id: string;
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'website' | 'twitter' | 'other';
  label: string;
  value: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface CVData {
  personal: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  sectionOrder: SectionKey[];
}

export type SectionKey = 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';

export type TemplateId = 'classic' | 'modern' | 'creative' | 'executive' | 'minimal';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  accentColor: string;
  fontStyle: 'serif' | 'sans' | 'mixed';
  layout: 'single' | 'two-column' | 'sidebar';
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless single-column layout with elegant typography',
    preview: 'https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/template-preview-1-cHSCb4Ba9m7QSCpfnfzZgF.webp?Expires=1807956697&Signature=UzPiliK0tLntVtRYTCYzdH~Js683-SObrmAAbIff2fXqSOz2RF1w1SJYTMY4cFlNaUww3vkvUyucISFsxp-b0b8OJt4DK7~DGPQL4BNozGYtf-Nh-9wUU63J7YhWEzxvCWeHGrAdupMuUegrK7Q3Ci57IwdgIX9Fc6KwrK6K-2nmjdFkCyaF77jNMyZZFS7mbcn1Tn2zbPNcXwLGn9yBGNR-i1qn9upueOmtCEbTnNNPLneUh-kW6qltUhNdxIMGaGjrvRmZlX9MFTEX7gvWsoOgCJ4oaAnipmDrLh0Cp8c9h7r4wiTSFkafzgWFZbxD2QzN1qyyWiRamA4DBaDFoQ__&Key-Pair-Id=K1MP89RTKNH4J',
    accentColor: '#4F46E5',
    fontStyle: 'mixed',
    layout: 'single',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold two-column design with dark sidebar accent',
    preview: 'https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/template-preview-2-AU4EisXSvVXbExccCcRApF.webp?Expires=1807956698&Signature=axkV4SODZ2d4as07oRSHSkn3hVH8ejbpCnW0LSsjoMmU60rPg5CwrWTklE40dvYd8jBJoB7Unag7GTo~2yiwxEWslMHz6nlsH5aDJQHdDIrfpYPuS1Gx9Jli-N5Xh~lkL4lPoAu8TN7S0typiHkO4SLuWYWEt-oZd9ncTEMaN48g5NP93PN-4SD-jWX4Xe2vrIc-1DTX7BkH1vQrtgKA1HaSZ8EZcIlO76~oEPuRPa2tkJGlGjr9e5yEXj8KWIDaPHxo3b1gr1Axkh55fhTU~tCZeL~~0Kp3~LoQc~Yc4OwPAPBXj0RB7Kp9-cLT9EJJuZkwniYa5-Dj9gIhIjWY~A__&Key-Pair-Id=K1MP89RTKNH4J',
    accentColor: '#1E3A5F',
    fontStyle: 'sans',
    layout: 'two-column',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Contemporary layout with skill tags and timeline',
    preview: 'https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/template-preview-3-8JknJgTNnYzJC65tzyqv83.webp?Expires=1807956699&Signature=Lx4~C3lTpFZSFwrtl5GpwL46T9eA2ab46sG27NzzTXHEp8PChW~lOQ-fO80B4e8C5Uvk2~NIvg1w6ZH3wC5VFd5yxMMqg8bJTB5yU9oq5st0FiVRUQIGzqM07X-2TcWH6xQkJhtvceth2pP7Aj1l7QNdCZu-dxTWdvH3Nk6~A0D-zYH5XRbGRT7jWlycGY9CErTQvXA6l5KNN51AgJ4Owg2kREEI2z89lneKBoyznH2YG8yheQV26bDLK2staE80er52q0IKxDB~0-RufOHhmu4LACzrNbXt3ihrEiTnRadadMx2BplMrXYA7fvfm3VMB2NSA3WhnIw4126JT~2vNQ__&Key-Pair-Id=K1MP89RTKNH4J',
    accentColor: '#06B6D4',
    fontStyle: 'sans',
    layout: 'two-column',
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Premium serif typography for senior professionals',
    preview: 'https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/template-preview-1-cHSCb4Ba9m7QSCpfnfzZgF.webp?Expires=1807956697&Signature=UzPiliK0tLntVtRYTCYzdH~Js683-SObrmAAbIff2fXqSOz2RF1w1SJYTMY4cFlNaUww3vkvUyucISFsxp-b0b8OJt4DK7~DGPQL4BNozGYtf-Nh-9wUU63J7YhWEzxvCWeHGrAdupMuUegrK7Q3Ci57IwdgIX9Fc6KwrK6K-2nmjdFkCyaF77jNMyZZFS7mbcn1Tn2zbPNcXwLGn9yBGNR-i1qn9upueOmtCEbTnNNPLneUh-kW6qltUhNdxIMGaGjrvRmZlX9MFTEX7gvWsoOgCJ4oaAnipmDrLh0Cp8c9h7r4wiTSFkafzgWFZbxD2QzN1qyyWiRamA4DBaDFoQ__&Key-Pair-Id=K1MP89RTKNH4J',
    accentColor: '#7C3AED',
    fontStyle: 'serif',
    layout: 'single',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean whitespace-driven design',
    preview: 'https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/template-preview-3-8JknJgTNnYzJC65tzyqv83.webp?Expires=1807956699&Signature=Lx4~C3lTpFZSFwrtl5GpwL46T9eA2ab46sG27NzzTXHEp8PChW~lOQ-fO80B4e8C5Uvk2~NIvg1w6ZH3wC5VFd5yxMMqg8bJTB5yU9oq5st0FiVRUQIGzqM07X-2TcWH6xQkJhtvceth2pP7Aj1l7QNdCZu-dxTWdvH3Nk6~A0D-zYH5XRbGRT7jWlycGY9CErTQvXA6l5KNN51AgJ4Owg2kREEI2z89lneKBoyznH2YG8yheQV26bDLK2staE80er52q0IKxDB~0-RufOHhmu4LACzrNbXt3ihrEiTnRadadMx2BplMrXYA7fvfm3VMB2NSA3WhnIw4126JT~2vNQ__&Key-Pair-Id=K1MP89RTKNH4J',
    accentColor: '#374151',
    fontStyle: 'sans',
    layout: 'single',
  },
];

export const DEFAULT_CV_DATA: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
};

export const SAMPLE_CV_DATA: CVData = {
  personal: {
    fullName: 'Alexandra Chen',
    jobTitle: 'Senior Product Designer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'alexchen.design',
    linkedin: 'linkedin.com/in/alexchen',
    github: 'github.com/alexchen',
    summary: 'Creative and strategic product designer with 7+ years of experience crafting user-centered digital experiences. Passionate about bridging the gap between complex systems and intuitive interfaces.',
  },
  experience: [
    {
      id: '1',
      company: 'Figma',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Leading design for core collaboration features used by 4M+ designers worldwide.',
      achievements: [
        'Redesigned the component library system, reducing design inconsistencies by 60%',
        'Led cross-functional team of 8 to ship real-time collaboration features',
        'Increased user retention by 23% through improved onboarding flows',
      ],
    },
    {
      id: '2',
      company: 'Airbnb',
      position: 'Product Designer',
      location: 'San Francisco, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Designed end-to-end experiences for the host platform serving 4M+ hosts.',
      achievements: [
        'Shipped 12 major feature releases across web and mobile platforms',
        'Reduced host setup time by 40% through streamlined onboarding',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'Carnegie Mellon University',
      degree: 'Master of Design',
      field: 'Human-Computer Interaction',
      location: 'Pittsburgh, PA',
      startDate: '2016-08',
      endDate: '2018-05',
      current: false,
      gpa: '3.9',
    },
  ],
  skills: [
    { id: '1', name: 'Figma', level: 5, category: 'Design Tools' },
    { id: '2', name: 'Prototyping', level: 5, category: 'Design' },
    { id: '3', name: 'User Research', level: 4, category: 'Research' },
    { id: '4', name: 'React', level: 3, category: 'Development' },
    { id: '5', name: 'Design Systems', level: 5, category: 'Design' },
    { id: '6', name: 'TypeScript', level: 3, category: 'Development' },
  ],
  projects: [
    {
      id: '1',
      name: 'DesignOS',
      description: 'An open-source design system toolkit used by 500+ companies',
      technologies: ['Figma', 'React', 'TypeScript', 'Storybook'],
      url: 'designos.io',
      github: 'github.com/alexchen/designos',
      startDate: '2022-01',
      endDate: '2023-06',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      date: '2020-08',
      credentialId: 'GUX-2020-AC',
    },
  ],
  languages: [
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Mandarin', level: 'Fluent' },
    { id: '3', name: 'French', level: 'Intermediate' },
  ],
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
};
