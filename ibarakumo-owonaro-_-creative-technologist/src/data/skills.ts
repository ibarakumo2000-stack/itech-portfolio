import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    badge: 'Interface & Web',
    description: 'Engineering responsive, accessible, and fast client-side applications with modern frameworks and robust component architectures.',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Responsive Design',
      'State Management',
      'Web Performance'
    ]
  },
  {
    id: 'programming',
    name: 'Programming & Logic',
    badge: 'Core Software',
    description: 'Writing clean, maintainable code, implementing algorithms, designing backend endpoints, and automating data processes.',
    skills: [
      'Python',
      'JavaScript',
      'TypeScript',
      'REST APIs',
      'Automation Scripting',
      'Data Structures',
      'Git & Version Control',
      'Modular Architecture'
    ]
  },
  {
    id: 'design',
    name: 'Design & Visual Identity',
    badge: 'Creative Arts',
    description: 'Crafting intentional visual systems, digital brand identities, user interfaces, and compelling digital graphics.',
    skills: [
      'Graphic Design',
      'UI Design',
      'Branding & Identity',
      'Visual Communication',
      'Typography & Grids',
      'Design Systems',
      'Layout Composition',
      'Digital Assets'
    ]
  },
  {
    id: 'ai',
    name: 'AI & Intelligent Systems',
    badge: 'Next-Gen Tech',
    description: 'Integrating modern AI models, building automated assistant workflows, and implementing prompt engineering strategies.',
    skills: [
      'AI Development',
      'AI API Integration',
      'Automation Pipelines',
      'Prompt Engineering',
      'Conversational Workflows',
      'Intelligent Tooling'
    ]
  },
  {
    id: 'music',
    name: 'Musicology & Education',
    badge: 'Sonic Craft',
    description: 'Applying deep harmonic theory, structural analysis, vocal/instrumental coaching, and creative pedagogical frameworks.',
    skills: [
      'Musicology',
      'Music Coaching',
      'Music Theory',
      'Harmonic Analysis',
      'Musical Development',
      'Creative Education',
      'Sonic Architecture',
      'Ear Training'
    ]
  }
];
