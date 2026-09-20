import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'I-Tech',
    slug: 'i-tech',
    url: 'https://i-tech-ten.vercel.app',
    type: 'Customer Website',
    category: 'Web Development / Digital Product / UI/UX',
    tagline: 'Modern digital web experience crafted for client engagement and seamless customer journeys.',
    description: 'A customer-facing web platform built with a focus on responsive aesthetics, intuitive user navigation, and modern frontend architecture.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#38bdf8', // sky blue
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive UI'],
    features: [
      'Responsive multi-device layout architecture',
      'Interactive navigation with fluid transitions',
      'Customer-centric service and product presentations',
      'Optimized asset loading and accessibility compliance',
      'Direct call-to-action touchpoints'
    ],
    role: 'Lead Frontend Developer & UI Designer',
    overview: 'I-Tech was created as a modern customer website engineered to provide a crisp, trustworthy digital storefront and brand presence. The focus was on delivering high visual fidelity combined with fast load times and clean component modularity.',
    objective: 'Deliver a sleek, responsive customer web presence that communicates product offerings clearly and converts visitors effectively.',
    challenges: [
      'Balancing high-resolution visual assets with fast performance across mobile networks',
      'Crafting intuitive navigation hierarchy for distinct customer personas'
    ],
    solution: 'Designed and implemented a modular component system in Tailwind and React, ensuring lightweight bundle footprints and responsive breakpoints.',
    result: 'A production-ready website hosted on Vercel providing an effortless browsing experience and strong brand identity.',
    gallery: [
      { title: 'Homepage Architecture', caption: 'Clean visual hierarchy and hero engagement', tag: 'UI / UX' },
      { title: 'Interactive Service Grid', caption: 'Clear customer offerings with smooth hover states', tag: 'Frontend' },
      { title: 'Mobile Optimization', caption: 'Touch-friendly navigation and responsive typography', tag: 'Responsive' }
    ]
  },
  {
    id: 'project-02',
    title: 'StreamVault',
    slug: 'streamvault',
    url: 'https://sreamvault-ruby.vercel.app',
    type: 'YouTube-style Video Platform',
    category: 'Web Application / Streaming / Product Design',
    tagline: 'High-performance video streaming web application with media playback and catalog discovery.',
    description: 'A dedicated video streaming web application designed for smooth media playback, organized content discovery, and a focused dark-mode viewing experience.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f43f5e', // rose / crimson
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Media Streaming UI', 'Video Player API'],
    features: [
      'Immersive dark-themed video browsing and player layout',
      'Categorized feeds and channel/topic filtering',
      'Fluid custom player interface with responsive controls',
      'Dynamic video card grids with hover previews',
      'Mobile-ready streaming layout'
    ],
    role: 'Full-Stack UI Architect & Frontend Engineer',
    overview: 'StreamVault replicates the fluid discovery and consumption model of leading video platforms, focusing on minimal friction, responsive grid layouts, and zero-distraction playback aesthetics.',
    objective: 'Build an intuitive, high-performance web-based video platform interface capable of smooth catalog browsing and video playback.',
    challenges: [
      'Handling responsive video aspect ratios across variable viewport sizes',
      'Maintaining quick render cycles when loading dynamic content cards'
    ],
    solution: 'Engineered an optimized video grid component and modular media player wrapper that handles adaptive viewport changes gracefully.',
    result: 'A functional, stylish streaming interface deployed on Vercel with smooth video exploration.',
    gallery: [
      { title: 'Video Feed Grid', caption: 'Multi-column media feed with responsive breakpoints', tag: 'UI Design' },
      { title: 'Theater View', caption: 'Distraction-free player layout with related video recommendations', tag: 'Player' },
      { title: 'Category Navigation', caption: 'Quick topic filters for effortless content discovery', tag: 'Navigation' }
    ]
  },
  {
    id: 'project-03',
    title: 'Next Gen Tech',
    slug: 'next-gen-tech',
    url: 'https://next-gen-tech-one.vercel.app',
    type: 'Technology Project',
    category: 'Technology / Web Development / Digital Product',
    tagline: 'Forward-looking technology showcase exploring futuristic UI paradigms and modular engineering.',
    description: 'A technology project highlighting emerging digital solutions, modern tech architectures, and high-craft interactive interface patterns.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8b5cf6', // violet
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'],
    features: [
      'Futuristic aesthetic with precise geometric grid systems',
      'Interactive technology showcase with fluid animations',
      'Modular architecture for future expansion',
      'Dark-mode optimized typography and high contrast legibility',
      'Accessible interactive components'
    ],
    role: 'Creative Technologist & Frontend Engineer',
    overview: 'Next Gen Tech serves as an innovation laboratory and showcase for next-generation web technologies, highlighting progressive frontend techniques, dark-first interfaces, and modular software design.',
    objective: 'Create an engaging, forward-thinking digital product showcasing technical capabilities and contemporary interface design.',
    challenges: [
      'Developing a sophisticated futuristic visual style without sacrificing accessibility or readability',
      'Ensuring smooth animations that respect user motion preferences'
    ],
    solution: 'Combined clean mathematical spacing, deliberate typographic pairing, and hardware-accelerated motion reveals with reduced-motion fallbacks.',
    result: 'A standout technology platform deployed on Vercel that presents advanced digital concepts in an engaging interface.',
    gallery: [
      { title: 'Technology Showcase', caption: 'Interactive modules highlighting innovative systems', tag: 'Showcase' },
      { title: 'Component Grid', caption: 'Strict 8pt typographic and spatial grid system', tag: 'Design System' },
      { title: 'Interactive Elements', caption: 'Subtle motion states designed for user feedback', tag: 'Motion' }
    ]
  },
  {
    id: 'project-04',
    title: 'Jarvis AI',
    slug: 'jarvis-ai',
    url: 'https://jarvis-ai-lake-pi.vercel.app',
    type: 'AI / Programming Project',
    category: 'Artificial Intelligence / Programming / Automation',
    tagline: 'Intelligent assistant platform combining AI automation, smart conversational logic, and task workflows.',
    description: 'An AI and programming project demonstrating intelligent interface integration, natural prompt handling, and automated computational workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#10b981', // emerald
    technologies: ['Python', 'AI Integration', 'JavaScript', 'TypeScript', 'Prompt Engineering', 'Automation APIs'],
    features: [
      'Intelligent prompt and response processing pipeline',
      'Context-aware assistant interface with live response states',
      'Automation workflow connectors for programming tasks',
      'Sleek terminal-inspired and conversational UI layouts',
      'Clean error handling and response streaming architecture'
    ],
    role: 'AI Developer & Systems Integrator',
    overview: 'Jarvis AI explores the intersection of artificial intelligence, programming automation, and user-centric assistant interfaces. It brings intelligent capabilities to everyday workflows through structured prompts and streamlined execution.',
    objective: 'Build an accessible, responsive AI-driven tool that demonstrates practical automation and conversational intelligence.',
    challenges: [
      'Structuring clean prompt logic and response handling for consistent assistant behaviors',
      'Designing a fluid interface that clearly indicates AI processing states and actions'
    ],
    solution: 'Designed a lightweight frontend wrapper coupled with clean automation pipelines, structured state management, and clear visual feedback.',
    result: 'An interactive AI project hosted on Vercel showcasing practical artificial intelligence and automation in action.',
    gallery: [
      { title: 'Assistant Terminal', caption: 'Interactive command and conversational workspace', tag: 'AI Interface' },
      { title: 'Workflow Pipeline', caption: 'Automated task execution and response generation', tag: 'Automation' },
      { title: 'State Visualizer', caption: 'Live status indicators for computational processing', tag: 'Engineering' }
    ]
  },
  {
    id: 'project-05',
    title: 'I-Tech Ecommerce Website',
    slug: 'i-tech-ecommerce-website',
    url: 'https://i-tech-platform.vercel.app/',
    type: 'E-Commerce Platform',
    category: 'Web Development / E-Commerce / Full-Stack',
    tagline: 'High-performance e-commerce platform engineered for product discovery, checkout efficiency, and modern digital retail.',
    description: 'A full-featured modern e-commerce web platform designed for digital commerce, featuring dynamic catalog filtering, responsive cart flows, seamless checkout UX, and fast page loading.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0ea5e9',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'E-Commerce UI', 'Cart State Management', 'Payment Integration'],
    features: [
      'Dynamic product catalog with real-time filtering, search, and sorting',
      'Responsive shopping cart with reactive state persistence and checkout flows',
      'High-fidelity product cards with visual hover transitions and image previews',
      'Cross-device mobile-first commerce navigation and fast load speeds',
      'Production deployment on Vercel with high availability and CDN caching'
    ],
    role: 'Lead Frontend Developer & UI/UX Architect',
    overview: 'I-Tech Ecommerce Website was developed to deliver an effortless digital shopping experience. Combining clean visual commerce aesthetics with rapid frontend responsiveness, it allows customers to browse collections, inspect product details, and proceed to checkout with minimal friction.',
    objective: 'Build a production-grade e-commerce web platform that elevates digital retail through high-speed catalog discovery and an intuitive conversion funnel.',
    challenges: [
      'Optimizing asset-heavy product imagery for instantaneous mobile load speeds',
      'Structuring reliable reactive cart state across sessions and responsive viewports',
      'Ensuring checkout progression is clear, fast, and accessible across touch and pointer devices'
    ],
    solution: 'Engineered modular component architectures, fluid state management, and optimized image rendering with Tailwind and React.',
    result: 'A live e-commerce platform deployed on Vercel delivering an intuitive shopping experience with zero lag and sharp visual polish.',
    gallery: [
      { title: 'E-Commerce Storefront', caption: 'Clean visual hierarchy highlighting featured products and promotions', tag: 'UI / UX' },
      { title: 'Product Catalog & Filters', caption: 'Instant multi-category filtering and responsive grid layout', tag: 'Frontend' },
      { title: 'Cart & Checkout Funnel', caption: 'Frictionless checkout experience designed for conversions', tag: 'E-Commerce' }
    ]
  },
  {
    id: 'project-06',
    title: 'I-Tech Inventory App',
    slug: 'i-tech-inventory-app',
    url: 'https://simple-cafe-60247777.figma.site',
    type: 'Inventory Management App & UI System',
    category: 'Product Design / UI/UX / Web Application / Inventory Management',
    tagline: 'Precision inventory management system and interactive design prototype for tracking stock, orders, and operations.',
    description: 'A comprehensive inventory management application and interactive UI system built for accurate stock control, real-time inventory tracking, warehouse operations, and intuitive business reporting.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#f59e0b',
    technologies: ['Figma Design System', 'UI/UX Architecture', 'Inventory Systems', 'Interaction Design', 'Component Libraries', 'Data Visualization'],
    features: [
      'Stock tracking dashboard with real-time level indicators and critical threshold alerts',
      'Item catalog management with batch updates, SKU categorization, and status filters',
      'Order status tracking and warehouse movement visualization flows',
      'High-craft interactive design system with precision micro-interactions',
      'Live interactive prototype hosted on Figma Site for client demonstration and stakeholder review'
    ],
    role: 'Product Designer & UI Systems Architect',
    overview: 'I-Tech Inventory App was crafted to address the operational challenges of inventory tracking and resource coordination. The platform delivers structured tables, real-time status indicators, and streamlined workflows to reduce administrative overhead and prevent stock discrepancies.',
    objective: 'Design a clean, dependable inventory management experience that turns complex warehouse data into actionable, visual operational controls.',
    challenges: [
      'Balancing information density for operational staff with clean, readable visual hierarchy',
      'Designing rapid workflow patterns for logging stock receipts, transfers, and adjustments',
      'Standardizing reusable Figma components for scalable long-term product iterations'
    ],
    solution: 'Created an ergonomic component system with high-contrast data tables, status badges, and rapid search-filter interactions.',
    result: 'A complete inventory application and live interactive design deployed on Figma Site, demonstrating robust product design and UX architecture.',
    gallery: [
      { title: 'Inventory Dashboard', caption: 'High-level operational overview with stock status and metrics', tag: 'Dashboard' },
      { title: 'Stock Management Table', caption: 'High-density tabular view with sorting, filtering, and batch actions', tag: 'UI Architecture' },
      { title: 'Interactive Flow', caption: 'Streamlined modal workflows for stock adjustments and receipts', tag: 'Product Design' }
    ]
  }
];
