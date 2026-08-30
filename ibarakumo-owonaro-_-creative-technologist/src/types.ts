export interface Project {
  id: string;
  title: string;
  slug: string;
  url: string;
  type: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  technologies: string[];
  features: string[];
  role: string;
  overview: string;
  objective: string;
  challenges: string[];
  solution: string;
  result: string;
  gallery: { title: string; caption: string; tag: string }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  badge: string;
  description: string;
  skills: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface WhatIDoCard {
  number: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface JourneyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyInsights: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  platform: string;
  url: string;
  handle: string;
  icon: string;
}
