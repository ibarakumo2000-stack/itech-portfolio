import { ServiceItem, WhatIDoCard } from '../types';

export const whatIDoCards: WhatIDoCard[] = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Modern, fast, and accessible websites and web applications built with React, Next.js, and clean responsive CSS.',
    icon: 'Globe',
    tags: ['Next.js', 'React', 'Tailwind', 'TypeScript']
  },
  {
    number: '02',
    title: 'Programming',
    description: 'Custom software solutions, algorithms, modular architectures, and robust automation utilities built with engineering precision.',
    icon: 'Code',
    tags: ['Clean Code', 'Modular Design', 'APIs', 'Logic']
  },
  {
    number: '03',
    title: 'Graphic Design',
    description: 'Purposeful visual communication, memorable brand identities, digital assets, and high-impact digital graphics.',
    icon: 'Palette',
    tags: ['Branding', 'Typography', 'Visual Identity', 'Layout']
  },
  {
    number: '04',
    title: 'Python Development',
    description: 'Python tooling, workflow automation scripts, backend services, and structured data handling mechanisms.',
    icon: 'Terminal',
    tags: ['Python', 'Automation', 'Scripting', 'Workflows']
  },
  {
    number: '05',
    title: 'AI Development',
    description: 'AI-powered applications, intelligent assistant integrations, conversational interfaces, and smart workflow automations.',
    icon: 'Sparkles',
    tags: ['AI Integrations', 'Prompt Engineering', 'Intelligent UI']
  },
  {
    number: '06',
    title: 'Music',
    description: 'Musicology, structured music coaching, music theory analysis, vocal/instrumental guidance, and creative education.',
    icon: 'Music',
    tags: ['Musicology', 'Music Theory', 'Coaching', 'Education']
  }
];

export const services: ServiceItem[] = [
  {
    id: 'web-development',
    number: '01',
    title: 'Web Development',
    tagline: 'Modern, responsive, and performance-focused web platforms.',
    description: 'End-to-end frontend development creating lightning-fast, visually refined, and accessible web experiences tailored for clients, companies, and institutions.',
    deliverables: [
      'Custom React & Next.js web applications',
      'Fully responsive, mobile-first layouts',
      'SEO & accessibility optimization (WCAG AA compliant)',
      'API integrations & dynamic data binding',
      'Performant animations and micro-interactions'
    ],
    icon: 'Layout'
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: 'UI/UX Design',
    tagline: 'Human-centered interfaces crafted with mathematical precision.',
    description: 'Designing intuitive digital products with clean spatial hierarchy, purposeful typography, and seamless interaction flows that delight users.',
    deliverables: [
      'Wireframing & user flow mapping',
      'High-fidelity interactive prototypes',
      'Design systems & component libraries',
      'Dark mode and accessible color palettes',
      'Usability heuristics & responsive layouts'
    ],
    icon: 'Compass'
  },
  {
    id: 'graphic-design',
    number: '03',
    title: 'Graphic Design',
    tagline: 'Distinctive visual communication and brand presence.',
    description: 'Translating concepts into memorable visual identities, marketing assets, and digital graphics that elevate organizational communication.',
    deliverables: [
      'Brand identity & logo development',
      'Digital marketing & social graphics',
      'Print & publication design assets',
      'Typography pairing & color systems',
      'Vector illustration & visual assets'
    ],
    icon: 'PenTool'
  },
  {
    id: 'software-development',
    number: '04',
    title: 'Software Development',
    tagline: 'Reliable, modular codebases designed to scale.',
    description: 'Writing robust, maintainable, and strongly typed software with clean separation of concerns, strict testing practices, and clear documentation.',
    deliverables: [
      'Modular TypeScript/JavaScript software architectures',
      'REST API design & integration',
      'Algorithm implementation & optimization',
      'State management engines',
      'Version control and deployment workflows'
    ],
    icon: 'Cpu'
  },
  {
    id: 'python-development',
    number: '05',
    title: 'Python Development',
    tagline: 'Automated workflows, data processing, and custom scripts.',
    description: 'Harnessing the power of Python to automate repetitive processes, process structured data, and build dependable backend utilities.',
    deliverables: [
      'Custom automation scripts & tools',
      'Data parsing, transformation & cleaning',
      'API connectors & Web scraping utilities',
      'Backend logic & microservice scripts',
      'Command-line interfaces (CLI tools)'
    ],
    icon: 'Terminal'
  },
  {
    id: 'ai-development',
    number: '06',
    title: 'AI Development',
    tagline: 'Practical AI integration and intelligent workflow pipelines.',
    description: 'Implementing cutting-edge artificial intelligence models and automation tools into usable web applications and practical business tools.',
    deliverables: [
      'LLM & generative AI API integrations',
      'Custom prompt architecture & tuning',
      'Intelligent conversational interfaces',
      'Automated content & code pipelines',
      'AI-assisted productivity tooling'
    ],
    icon: 'Bot'
  },
  {
    id: 'music-coaching',
    number: '07',
    title: 'Music Coaching & Education',
    tagline: 'Theory-grounded musical training and creative mentorship.',
    description: 'Providing comprehensive music coaching, harmonic analysis, ear training, and music theory education for aspiring musicians and creative practitioners.',
    deliverables: [
      'Comprehensive music theory instruction',
      'One-on-one musical coaching sessions',
      'Harmonic analysis & structural composition guidance',
      'Ear training & vocal/instrumental development',
      'Curated educational curriculum & resources'
    ],
    icon: 'Mic2'
  }
];
