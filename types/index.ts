import { FC } from 'react';

export interface SocialItem {
  label: string;
  url: string;
  icon: string;
}

export interface WorkContent {
  iconImage: string;
  from: string;
  to: string;
  jobtitle: string;
  company: string;
  highlights: string[];
  tecnologies: string[];
}

export interface TechStack {
  labels: string[];
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  testing: string[];
  ai: string[];
  tools: string[];
  softskills: string[];
  languagesSpoken: string[];
}

export interface WorkHeads {
  from: string;
  to: string;
  position: string;
  company: string;
  highlights: string;
  technologies: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface TextContent {
  greeting: string;
  about: string;
  skills: string;
  workExperienceTitle: string;
  workLabels: WorkHeads;
  workExperience: WorkContent[];
  stack: TechStack;
  projectsTitle: string;
  projects: Project[];
  socialTitle: string;
  social: SocialItem[];
  contactTitle: string;
  contactForm: {
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
    invalidFormat: string;
    disposableEmail: string;
    errorName: string;
    errorEmail: string;
    errorMessage: string;
  };
}

export type IconMap = Record<string, FC<{ theme: 'light' | 'dark'; size?: number }>>;
